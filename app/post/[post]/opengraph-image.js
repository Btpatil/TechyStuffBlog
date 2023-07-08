import { ImageResponse } from 'next/server'
export const runtime = 'edge'

// Image metadata
export const alt = 'TechyStuff Blog'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'



// Image generation
export default async function og({ params }) {
    const dir = params.post.split('=')[0]
    const res = await fetch(`https://raw.githubusercontent.com/Btpatil/mdx-blogs-store/main/${dir}/thumbnail.png`)
    const result = await res.blob()
    let img = undefined
    if (res.ok) {
        img = 'https://raw.githubusercontent.com/Btpatil/mdx-blogs-store/main/${dir}/thumbnail.png'
    }

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div tw='flex'>
                <div tw='flex w-full h-full bg-[#e6fffd]' style={{
                    
                }}>
                    {img ?
                        <img src={`https://raw.githubusercontent.com/Btpatil/mdx-blogs-store/main/${dir}/thumbnail.png`} alt="TechyStuff Blogs" />
                        :
                        <img src={`https://raw.githubusercontent.com/Btpatil/TechyStuffBlog/main/app/opengraph-image.png`} alt="TechyStuff Blogs" />
                    }
                </div>
            </div>
        ),
        size
    )
}