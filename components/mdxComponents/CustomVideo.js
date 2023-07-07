export const CustomVideo = ({ link }) => {
    return (
        <div className=' aspect-w-16 aspect-h-9'>
            <iframe src={link} 
            width="800" 
            height="600" 
            allowfullscreen 
            allowtransparency 
            allow="autoplay" 
            frameborder="0">
            </iframe>
        </div>
    )
}
