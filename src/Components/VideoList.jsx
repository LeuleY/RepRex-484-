import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import '../ComponentCSS/VideoList.css'

function VideoList({ searchedVideo = "null" }) {
    const apikey = "bd1b98da96mshf8f4d3147be8342p1f1da5jsn254a93a42e42";
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        // Only fetch if searchedVideo is not "null"
        if (searchedVideo !== "null") {
            const getExerciseVideoData = async () => {
                try {
                    const url = "https://youtube-search-and-download.p.rapidapi.com/search?query=" + searchedVideo+"exercise";
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'x-rapidapi-key': apikey,
                            'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com',
                        }
                    });

                    if (!response.ok) {
                        throw new Error('API response issues detected');
                    }

                    const data = await response.json();
                    setVideoList(data.contents.slice(0, 4).map(item => item.video));

                } catch (error) {
                    console.log("Error fetching data:", error.message);
                    setVideoList([]); // Clear the list if there's an error
                }
            };

            getExerciseVideoData();
        } else {
            setVideoList([]); // Clear the list if searchedVideo is "null"
        }
    }, [searchedVideo]); // Add searchedVideo to dependency array

    return (
        <div className="video-grid">
            {videoList.length > 0 ? (
                videoList.map((video) => (
                    <VideoCard
                        key={video.videoId} // Added key prop
                        title={video.title}
                        channelName={video.channelName}
                        viewCount={video.viewCountText}
                        imgSrc={video.thumbnails[0].url}
                        videoLink={`https:www.youtube.com/watch?v=${video.videoId}`}
                    />
                ))
            ) : searchedVideo === "null" ? (
                <div className="no-search">Please search for a video</div>
            ) : (
                <div className="loading">Loading videos...</div>
            )}
        </div>
    )
}

export default VideoList;