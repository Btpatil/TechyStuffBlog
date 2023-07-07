import Image from "next/image"

export const Thumbnail = ({info}) => {
    return (
        <div className="aspect-none">
            <Image 
            src={info.src} 
            alt="..." 
            className={`w-full h-full object-center object-cover lg:w-full lg:h-full rounded-t-3xl`}
            width={200}
            height={100}
            />
        </div>
    )
}
