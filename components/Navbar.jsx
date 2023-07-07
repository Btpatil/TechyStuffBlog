import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
    return (
        <nav className="flex self-start flex-between w-full items-center sm:px-16 px-6 glassmorphism sticky top-0 z-10">
            <Link href={'/'} className="flex gap-2 flex-center items-center">
                <Image 
                src={'/assets/images/logo.svg'}
                width={30}
                height={30}
                className="object-contain"
                alt="logo"
                />
                <p className="font-satoshi font-semibold tracking-wide pink_gradient">TechyStuff</p>
            </Link>
        </nav>
    )
}

export default Navbar
