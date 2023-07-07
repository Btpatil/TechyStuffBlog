import { gotPostByName } from "./getPosts"

export default async function getPostsByTag(currpost) {
    try {
        const res = await fetch(`https://api.github.com/repos/Btpatil/mdx-blogs-store/git/trees/main?recursive=1`, {
            next: { revalidate: 10 },
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': `2022-11-28`
            }
        })

        // console.log(res)

        if (!res.ok) return undefined

        const repoFileTree = await res.json()

        const fileArray = repoFileTree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))

        const posts = []

        for (const file of fileArray) {
            let post = await gotPostByName(file)
            if (post.meta.id !== currpost.id) {
                const otherPostTags = post.meta.tags || 0;
                const commonTags = calculateSimilarityScore(currpost.tags, otherPostTags);
                post.meta['id'] = post.meta.id.replace('/', '=')
                // console.log(post)
                const {meta} = post
                posts.push({ ...meta, commonTags })
            }

            // const post = await gotPostByName(file)
            // console.log(post, currpost)
            // if (post.meta.id !== currpost.id) {
            //     // Get the other post's tags
            //     const otherPostTags = post.meta.tags || 0;
            //     console.log(otherPostTags)

            //     const commonTags = calculateSimilarityScore(currpost.tags, otherPostTags);
            //     const { meta } = post
            //     posts.push({ ...meta, commonTags })
            // }
        }

        // console.log(posts)

        return posts.sort((a, b) => a.commonTags < b.commonTags ? 1 : -1)
    } catch (error) {
        console.log('line 67', error.message)
    }
}

function calculateSimilarityScore(currentPostTags, otherPostTags) {
    const commonTags = currentPostTags.filter(tag => otherPostTags.includes(tag));

    // const similarityScore = commonTags.length / Math.max(currentPostTags.length, otherPostTags.length);

    return commonTags.length;
}