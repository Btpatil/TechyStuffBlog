import { Posts } from "@components/Posts";
// import { getPosts } from "@lib/getPosts"

export default function Home() {
  // const posts = await getPosts()
  // console.log('line 6', posts)
  return (
    <>
      <div className="introsection h-full max-w-screen-lg w-full mx-auto lg:w-full">
        <div className="w-[80%] mt-20 text-center mx-auto">
          <h2 className="text-5xl font-bold font-inter">Welcome To <br />
            <span className="head_text pink_gradient font-satoshi">TechyStuff Blogs</span></h2>
        </div>
        <div className="mt-5 w-[60%] mx-auto">
          <p className="desc text-center"> Our blog is your go-to resource for all things tech, whether you&apos;re a tech enthusiast, a professional in the industry, or simply curious about the latest gadgets and advancements.</p>
        </div>
        <div className="flex w-full justify-center gap-6 mt-4">
          <button className="signup">Sign Up</button>
          <button className="signup">Sign In</button>
        </div>
      </div>

      <div className="separator">
      </div>

      <div className="latest max-w-screen-lg lg:w-full w-[90%] mx-auto h-[700px]">
        <div className="title">
          Latest Posts
        </div>

        <Posts />
      </div>
    </>
  )
}
