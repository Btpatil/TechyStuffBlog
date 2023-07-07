import { ImageResponse } from 'next/server'
import Image from 'next/image'
// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'



// Image generation
export default async function og({ params }) {
    const dir = params.post.split('=')[0]

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div tw='flex linear-gradient(to right, rgb(255, 228, 230), rgb(204, 251, 241))'>
                <Image src={`https://raw.githubusercontent.com/Btpatil/mdx-blogs-store/main/${dir}/thumbnail.png`} width={100} height={100} alt="TechyStuff Blogs" />
                TechyStuff Blogs
            </div>
        ),
        size
    )
}