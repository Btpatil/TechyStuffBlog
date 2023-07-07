import Image from "next/image"
import Link from "next/link"

export const Post = ({post}) => {
    // console.log(post)
    return (
        <Link href={`/post/${post.id}`}>
            <div className="rounded-2xl border-2 border-gray-100 overflow-hidden shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition-all ease duration-200">
                <Image
                    src={post.thumbnail}
                    className="w-full h-64 object-cover duration-700 ease-in-out grayscale-0 blur-0 scale-100"
                    width={100}
                    height={100}
                    alt={post.title}
                />
                <div className="py-8 px-5 border-t border-gray-200 limit_4">
                    <h3 className="font-satoshi font-semibold text-xl tracking-wide h-[calc(2*1.25*20px)] overflow-hidden">{post.title}</h3>
                    <p className="text-md italic text-gray-600 my-2 limit_3">
                        {post.description ? (post.description) : <>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius adipisci tenetur tempore excepturi quas reiciendis?</>}
                    </p>
                </div>
            </div>
        </Link>
    )
}
