import getPostsByTag from "@lib/getPostsByTag"
import { Post } from "./Post"
import { Posts } from "./Posts"

export default async function RelatedPosts({ currentpost }) {
  const posts = await getPostsByTag(currentpost)
  // console.log(posts)

  return (
    <div className="my-4">
      {posts ?
        <>
          <div className="title">
            Related Posts
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 w-full mt-4">
            {posts.map(post =>
              <Post key={post.id} post={post} />
            )}
          </div>
        </>
        :
        <>
          <div className="title">
            Other Posts
          </div>
          <Posts />
        </>
      }
    </div>
  )
}
