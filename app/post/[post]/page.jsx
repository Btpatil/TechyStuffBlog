import Image from 'next/image'
import { getPostByName } from '@lib/GetPostByName'
import { Suspense } from 'react'
import RelatedPosts from '@components/RelatedPosts'
// import { notFound } from 'next/navigation'

// export const revalidate = 0

// export const generateStaticParams = async ({params}) => {
//     console.log(params.post)
//     const post1 = await getPostByName(`${params.post}`)
//     if (!post1) return {props: 'not found'}
//     // const { meta, content } = post

//     return {
//         props: {
//             post1
//         }
//     }
// }

// export async function generateMetadata({params:{post}}){
//     const post1 = await getPostByName(`${post}`)

//     if (!post1) {
//         return {
//             title: 'Post Not Found'
//         }
//     }

//     return {
//         title: post1.meta.title
//     }
// }

// export function Loading() {
//     return <p>Loading feed...</p>
// }

const getPageContent = async (slug) => {
    const { meta, content } = await getPostByName(slug)
    return { meta, content }
}

export async function generateMetadata({ params }) {
    const { meta } = await getPageContent(params.post)
    return { 
        title: meta.title,
        description: meta.description,
        alternates: {
            canonical: `/post/${params.post}`
        }
     }
}

export default async function page({ params }) {
    const { meta, content }  = await getPageContent(params.post)
    // console.log(meta)

    return (
        <div className='flex flex-col justify-center items-center'>
            {meta ?
                <>
                    <div className="text-center w-[95%] md:w-7/12 m-auto">
                        <p className="text-sm md:text-base font-light text-gray-500 w- m-auto my-5">
                            {meta.date}
                        </p>
                        <h1 className='font-bold text-3xl font-cal md:text-5xl mb-10 text-gray-800'>
                            {meta.title}
                        </h1>

                        <div className="my-8">
                            <div className="relative w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden inline-block align-middle">
                                <Image
                                    src='/assets/icons/favicon.ico'
                                    width={80}
                                    height={80}
                                    className='duration-700 ease-in-out grayscale-0 blur-0 scale-100'
                                    alt='author logo'
                                />
                            </div>
                            <div className="inline-block text-md md:text-lg align-middle ml-3">
                                By&nbsp;
                                <span className="font-semibold">TechyStuff</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-[90%] mx-auto max-w-screen-lg md:w-7/12 mb-10 md:mb-20 prose">
                        {content}
                    </div>

                    <div className="w-full h-1 bg-slate-200">
                    </div>

                    <div className="w-[90%] mx-auto max-w-screen-xl ">
                        <RelatedPosts currentpost={meta} />
                    </div>
                </>
                :
                <h1>Post Not found</h1>
            }
        </div>
    )
}
