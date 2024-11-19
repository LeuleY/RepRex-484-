import '../ComponentCSS/VideoCard.css'
function VideoCard({ title = "null", channelName = "null", viewCount = "0", imgSrc = "null", videoLink = "null" }) {

    return (
        <>
            <div className="videoCardContain">
                <a href={videoLink}>
                    <img src={imgSrc} alt="video image" />
                    <h4>{title}</h4>
                    <p>{channelName}</p>
                    <h4>{viewCount}</h4>
                </a>
            </div>

        </>
    )
}
export default VideoCard; 