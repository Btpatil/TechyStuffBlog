import Link from "next/link"
import Image from "next/image"

export const Footer = () => {
    return (
        <div className="flex self-start justify-between w-full items-center sm:px-16 px-6 pt-8 pb-4 bg-red-200">
            <div className="font-satoshi font-light">
                <Link href={'/'} className="flex gap-2 flex-center items-center">
                    <Image
                        src={'/assets/icons/favicon.ico'}
                        width={30}
                        height={30}
                        className="object-contain"
                        alt="logo"
                    />
                    <p className="font-satoshi font-semibold tracking-wide pink_gradient">TechyStuff</p>
                </Link>
            </div>
            <div className="flex gap-2">
                <p className="font-satoshi font-semibold tracking-wide pink_gradient">Follow us at : </p>
                <Link href={'https://www.youtube.com/channel/UCpV1XbKMc1askvo59meUNmA'}>
                    <Image src={'https://www.logo.wine/a/logo/YouTube/YouTube-Icon-Full-Color-Logo.wine.svg'} width={40} height={40} />
                </Link>
            </div>
        </div>
    )
}
