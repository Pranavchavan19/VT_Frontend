
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




import React, { useState, useEffect, useCallback, useRef } from "react";
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
    const [videoLoading, setVideoLoading] = useState({});  // Track loading state for each video

    // Use refs to track the video elements
    const videoRefs = useRef({});

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

    // Handle video load
    const handleVideoLoad = (videoId) => {
        setVideoLoading((prev) => ({
            ...prev,
            [videoId]: false,  // Mark this video as loaded
        }));
    };

    const handleVideoStart = (videoId) => {
        setVideoLoading((prev) => ({
            ...prev,
            [videoId]: true,  // Mark this video as loading
        }));
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
                            />

                            {/* Video Element */}
                            <video
                                ref={(el) => videoRefs.current[video._id] = el}
                                width="600"
                                controls
                                preload="auto"
                                style={{
                                    display: videoLoading[video._id] ? 'none' : 'block', // Hide until it's ready
                                    visibility: videoLoading[video._id] ? 'hidden' : 'visible', // Ensure visibility control
                                }}
                                onCanPlay={() => handleVideoLoad(video._id)} // Mark as ready to play
                                onPlay={() => handleVideoStart(video._id)} // Start loading the video
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
