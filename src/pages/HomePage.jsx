
// import React, { useCallback, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllVideos, makeVideosNull } from "../Store/Slices/videoSlice.js"
// import VideoList from "../components/VideoList.jsx";
// import Container from "../components/Container.jsx"
// import HomeSkeleton from "../skeleton/HomeSkeleton.jsx";
// import InfiniteScroll from 'react-infinite-scroll-component';

// function HomePage() {
//     const dispatch = useDispatch();
//     const videos = useSelector((state) => state.video?.videos?.docs);
//     const loading = useSelector((state) => state.video?.loading);
//     const hasNextPage = useSelector(
//         (state) => state.video?.videos?.hasNextPage
//     );
//     const [page, setPage] = useState(1);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         dispatch(getAllVideos({ page: 1, limit: 10 }));

//         return () => dispatch(makeVideosNull());
//     }, [dispatch]);

//     useEffect(() => {
//         if (loading) {
//             setIsLoading(true);
//         } else {
//             setIsLoading(false);
//         }
//     }, [loading]);

//     const fetchMoreVideos = useCallback(() => {
//         if (hasNextPage) {
//             dispatch(getAllVideos({ page: page + 1, limit: 10 }))
//                 .then(() => {
//                     setPage((prev) => prev + 1);
//                 })
//                 .catch((error) => {
//                     console.error("Error loading more videos:", error);
//                     setIsLoading(false);
//                 });
//         }
//     }, [page, hasNextPage, dispatch]);

//     return (
//         <Container>
//             <InfiniteScroll
//                 dataLength={videos?.length || 0}
//                 next={fetchMoreVideos}
//                 hasMore={hasNextPage}
//                 loader={isLoading && <HomeSkeleton />}
//                 scrollableTarget="scrollable-container"
//             >
//                 <div
//                     className="text-white  bg-black mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll"
//                     id="scrollable-container"
//                 >
//                     {videos?.map((video) => (
//                         <VideoList
//                             key={video._id}
//                             avatar={video.ownerDetails?.avatar.url}
//                             duration={video.duration}
//                             title={video.title}
//                             thumbnail={video.thumbnail?.url}
//                             createdAt={video.createdAt}
//                             views={video.views}
//                             channelName={video.ownerDetails.username}
//                             videoId={video._id}
//                         />
//                     ))}
//                 </div>
//             </InfiniteScroll>
//         </Container>
//     );
// }

// export default HomePage;






import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../Store/Slices/videoSlice.js";
import VideoList from "../components/VideoList.jsx";
import Container from "../components/Container.jsx";
import HomeSkeleton from "../skeleton/HomeSkeleton.jsx";
import InfiniteScroll from 'react-infinite-scroll-component';

function HomePage() {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.video?.videos?.docs);
    const loading = useSelector((state) => state.video?.loading);
    const hasNextPage = useSelector((state) => state.video?.videos?.hasNextPage);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Track currently playing video and preloading state
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    useEffect(() => {
        dispatch(getAllVideos({ page: 1, limit: 10 }));
        return () => dispatch(makeVideosNull());
    }, [dispatch]);

    useEffect(() => {
        if (loading) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [loading]);

    const fetchMoreVideos = useCallback(() => {
        if (hasNextPage) {
            dispatch(getAllVideos({ page: page + 1, limit: 10 }))
                .then(() => {
                    setPage((prev) => prev + 1);
                })
                .catch((error) => {
                    console.error("Error loading more videos:", error);
                    setIsLoading(false);
                });
        }
    }, [page, hasNextPage, dispatch]);

    const handleVideoClick = (videoId) => {
        setCurrentVideo(videoId);  // Mark the clicked video to load
        setIsVideoLoading(true);  // Indicate that video is loading
    };

    const handleCanPlay = () => {
        setIsVideoLoading(false);  // Video is ready to be played
    };

    return (
        <Container>
            <InfiniteScroll
                dataLength={videos?.length || 0}
                next={fetchMoreVideos}
                hasMore={hasNextPage}
                loader={isLoading && <HomeSkeleton />}
                scrollableTarget="scrollable-container"
            >
                <div
                    className="text-white bg-black mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll"
                    id="scrollable-container"
                >
                    {videos?.map((video) => (
                        <div key={video._id} className="video-container">
                            {/* Video List Component */}
                            <VideoList
                                avatar={video.ownerDetails?.avatar.url}
                                duration={video.duration}
                                title={video.title}
                                thumbnail={video.thumbnail?.url}
                                createdAt={video.createdAt}
                                views={video.views}
                                channelName={video.ownerDetails.username}
                                videoId={video._id}
                                onClick={() => handleVideoClick(video._id)}
                            />

                            {/* Placeholder until the video is loaded */}
                            <div
                                className="video-placeholder"
                                style={{
                                    display: currentVideo === video._id && isVideoLoading ? "block" : "none",
                                }}
                            >
                                <p>Loading...</p>
                            </div>

                            {/* Video Element */}
                            <video
                                width="600"
                                controls
                                style={{
                                    display: currentVideo === video._id && !isVideoLoading ? "block" : "none", // Show only if video is ready
                                    opacity: isVideoLoading ? 0 : 1, // Fade in video after it's ready
                                    transition: "opacity 0.5s ease",
                                }}
                                onCanPlay={handleCanPlay} // Video is ready to be played
                            >
                                <source src={video.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </Container>
    );
}

export default HomePage;
