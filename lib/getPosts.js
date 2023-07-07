import { compileMDX } from "next-mdx-remote/rsc"
import Image from 'next/image';
import { Thumbnail } from '@components/mdxComponents/Thumbnail';
import { CustomVideo } from '@components/mdxComponents/CustomVideo';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib'
import rehypeHighlight from 'rehype-highlight/lib'
import rehypeSlug from 'rehype-slug'

export async function gotPostByName(filename){
    const res = await fetch(`https://raw.githubusercontent.com/Btpatil/mdx-blogs-store/main/${filename}`, {
        next: { revalidate: 10 } ,
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version':`2022-11-28`
        }
    })

    if (!res.ok) return undefined

    const rawMDX = await res.text()

    if(rawMDX === '404: Not Found') return undefined

    const {frontmatter , content} = await compileMDX({
        source: rawMDX,
        components:{
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

    const id = filename.replace(/.mdx$/, '')

    const BlogPostObj = {
        meta:{
            id,
            title: frontmatter.title,
            date: frontmatter.date,
            thumbnail: frontmatter.thumbnail,
            description: frontmatter.description,
            tags: frontmatter.tags
        },
        content
    } 

    return BlogPostObj
}

export async function getPosts(){
    try {
        const res = await fetch(`https://api.github.com/repos/Btpatil/mdx-blogs-store/git/trees/main?recursive=1`, {
            next: { revalidate: 10 } ,
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                'X-GitHub-Api-Version':`2022-11-28`
            }
        })
    
        // console.log(res)
    
        if (!res.ok) return undefined
    
        const repoFileTree = await res.json()
    
        const fileArray = repoFileTree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))
    
        // console.log(fileArray)
        
        const posts = []
        
        for(const file of fileArray){
            let post = await gotPostByName(file)
            if (post) {
                post.meta['id'] = post.meta.id.replace('/', '=')
                // console.log(post)
                const {meta} = post
                posts.push(meta)
            }
        }
    
        return posts.sort((a, b) => a.date < b.date ? 1 : -1)
    } catch (error) {
        console.log('line 67',error.message)
    }
}