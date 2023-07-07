import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib'
import rehypeHighlight from 'rehype-highlight/lib'
import rehypeSlug from 'rehype-slug'
import Image from 'next/image';
import { Thumbnail } from '@components/mdxComponents/Thumbnail';
import { CustomVideo } from '@components/mdxComponents/CustomVideo';

export async function getPostByName(filename) {
    filename = filename.replace('%3D', '/')
    // console.log(filename)
    try {

        const res = await fetch(`https://raw.githubusercontent.com/Btpatil/mdx-blogs-store/main/${filename}.mdx`, {
            next: { revalidate: 10 },
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': `2022-11-28`,
            }
        })

        if (!res.ok) return undefined

        const rawMDX = await res.text()

        if (rawMDX === '404: Not Found') return undefined

        const { content, frontmatter } = await compileMDX({
            source: rawMDX,
            components: {
                Thumbnail,
                CustomVideo,
                Image
            },
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    rehypePlugins: [
                        rehypeHighlight,
                        rehypeSlug,
                        [rehypeAutolinkHeadings, {
                            behaviour: 'wrap'
                        }]
                    ]
                }
            }
        })

        // const id = filename.replace(/.mdx$/, '')

        const BlogPostObj = {
            meta: {
                id: filename,
                title: frontmatter.title,
                date: frontmatter.date,
                thumbnail: frontmatter.thumbnail,
                description: frontmatter.description,
                tags: frontmatter.tags
            },
            content
        }

        // console.log(BlogPostObj)
        return BlogPostObj
        // return new Response(JSON.stringify(BlogPostObj))
    } catch (error) {
        console.log(error)
    }
}