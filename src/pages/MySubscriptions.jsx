// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getSubscribedChannels } from "../Store/Slices/subscriptionSlice";
// import { Link } from "react-router-dom";
// import { VideoList, Avatar } from "../components";

// function MySubscriptions() {
//     const dispatch = useDispatch();
//     const subscriptions = useSelector(
//         (state) => state.subscription?.mySubscriptions
//     );
//     const subscriberId = useSelector((state) => state.auth?.userData?._id);
//     useEffect(() => {
//         if (subscriptions) {
//             dispatch(getSubscribedChannels(subscriberId));
//         }
//     }, [dispatch, subscriberId]);

//     // Deduplicate subscriptions by `subscribedChannel._id`
//     const uniqueSubscriptions = Array.from(
//         new Map(
//             (subscriptions || []).map((sub) => [
//                 sub?.subscribedChannel?._id,
//                 sub,
//             ])
//         ).values()
//     );
//     window.scrollTo(0, 0);
    
//     return (
//         <>
//             <div className="flex gap-2 p-2 text-white items-center bg-[#222222]">
//                 {subscriptions?.map((subscription) => (
//                     <div
//                         key={subscription?.subscribedChannel?._id}
//                         className="flex flex-col items-center overflow-x-scroll"
//                     >
//                         <Avatar
//                             src={subscription?.subscribedChannel?.avatar.url}
//                             channelName={
//                                 subscription?.subscribedChannel?.username
//                             }
//                         />
//                         <h5 className="text-xs">
//                             {subscription?.subscribedChannel?.username}
//                         </h5>
//                     </div>
//                 ))}
//             </div>

//             <div className="text-white mb-20 sm:mb-0 w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll">
//                 {subscriptions?.map((subscription) => (
//                     <Link
//                         to={`/watch/${subscription?.subscribedChannel?.latestVideo?._id}`}
//                         key={subscription?.subscribedChannel?._id}
//                     >
//                         {subscription?.subscribedChannel?.latestVideo && (
//                             <VideoList
//                                 key={subscription?.subscribedChannel?._id}
//                                 avatar={
//                                     subscription?.subscribedChannel?.avatar.url
//                                 }
//                                 duration={
//                                     subscription?.subscribedChannel?.latestVideo
//                                         ?.duration
//                                 }
//                                 title={
//                                     subscription?.subscribedChannel?.latestVideo
//                                         ?.title
//                                 }
//                                 thumbnail={
//                                     subscription?.subscribedChannel?.latestVideo
//                                         ?.thumbnail?.url
//                                 }
//                                 createdAt={
//                                     subscription?.subscribedChannel?.latestVideo
//                                         ?.createdAt
//                                 }
//                                 views={
//                                     subscription?.subscribedChannel?.latestVideo
//                                         ?.views
//                                 }
//                                 channelName={
//                                     subscription?.subscribedChannel?.username
//                                 }
//                                 videoId={
//                                     subscription?.subscribedChannel?.latestVideo
//                                         ?._id
//                                 }
//                             />
//                         )}
//                     </Link>
//                 ))}
//             </div>
//         </>
//     );
// }

// export default MySubscriptions;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getSubscribedChannels } from "../Store/Slices/subscriptionSlice";
// import { Link } from "react-router-dom";
// import { VideoList, Avatar } from "../components";

// function MySubscriptions() {
//     const dispatch = useDispatch();
//     const subscriptions = useSelector(
//         (state) => state.subscription?.mySubscriptions
//     );
//     const subscriberId = useSelector((state) => state.auth?.userData?._id);

//     useEffect(() => {
//         if (subscriberId) {
//             dispatch(getSubscribedChannels(subscriberId));
//         }
//     }, [dispatch, subscriberId]);

//     // Deduplicate subscriptions by `subscribedChannel._id`
//     const uniqueSubscriptions = Array.from(
//         new Map(
//             (subscriptions || [])
//                 .filter((sub) => sub?.subscribedChannel?._id) // Ensure valid data
//                 .map((sub) => [
//                     sub?.subscribedChannel?._id,
//                     sub,
//                 ])
//         ).values()
//     );

//     window.scrollTo(0, 0);

//     return (
//         <>
//             {/* Channel List */}
//             <div className="flex gap-2 p-2 text-white items-center bg-[#222222]">
//                 {uniqueSubscriptions?.map((subscription) => (
//                     <div
//                         key={subscription?.subscribedChannel?._id} // Use unique key
//                         className="flex flex-col items-center overflow-x-scroll"
//                     >
//                         <Avatar
//                             src={subscription?.subscribedChannel?.avatar.url}
//                             channelName={subscription?.subscribedChannel?.username}
//                         />
//                         <h5 className="text-xs">
//                             {subscription?.subscribedChannel?.username}
//                         </h5>
//                     </div>
//                 ))}
//             </div>

//             {/* Video List */}
//             <div className="text-white mb-20 sm:mb-0 w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll">
//                 {uniqueSubscriptions?.map((subscription) => (
//                     <Link
//                         to={`/watch/${subscription?.subscribedChannel?.latestVideo?._id}`}
//                         key={subscription?.subscribedChannel?._id} // Use unique key
//                     >
//                         {subscription?.subscribedChannel?.latestVideo && (
//                             <VideoList
//                                 avatar={subscription?.subscribedChannel?.avatar.url}
//                                 duration={subscription?.subscribedChannel?.latestVideo?.duration}
//                                 title={subscription?.subscribedChannel?.latestVideo?.title}
//                                 thumbnail={subscription?.subscribedChannel?.latestVideo?.thumbnail?.url}
//                                 createdAt={subscription?.subscribedChannel?.latestVideo?.createdAt}
//                                 views={subscription?.subscribedChannel?.latestVideo?.views}
//                                 channelName={subscription?.subscribedChannel?.username}
//                                 videoId={subscription?.subscribedChannel?.latestVideo?._id}
//                             />
//                         )}
//                     </Link>
//                 ))}
//             </div>
//         </>
//     );
// }

// export default MySubscriptions;









import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannels } from "../Store/Slices/subscriptionSlice";
import { Link } from "react-router-dom";
import { VideoList, Avatar } from "../components";

function MySubscriptions() {
    const dispatch = useDispatch();
    const subscriptions = useSelector(
        (state) => state.subscription?.mySubscriptions
    );
    const subscriberId = useSelector((state) => state.auth?.userData?._id);

    useEffect(() => {
        if (subscriberId) {
            dispatch(getSubscribedChannels(subscriberId));
        }
    }, [dispatch, subscriberId]);

    // Deduplicate subscriptions by `subscribedChannel._id`
    const uniqueSubscriptions = Array.from(
        new Map(
            (subscriptions || [])
                .filter((sub) => sub?.subscribedChannel?._id) // Ensure valid data
                .map((sub) => [
                    sub?.subscribedChannel?._id,
                    sub,
                ])
        ).values()
    );

    window.scrollTo(0, 0);

    return (
        <>
            {/* Channel List */}
            <div className="flex gap-2 p-2 text-white items-center bg-[#222222]">
                {uniqueSubscriptions?.map((subscription) => (
                    <div
                        key={subscription?.subscribedChannel?._id} // Use unique key
                        className="flex flex-col items-center overflow-x-scroll"
                    >
                        <Avatar
                            src={subscription?.subscribedChannel?.avatar.url}
                            channelName={subscription?.subscribedChannel?.username}
                        />
                        <h5 className="text-xs">
                            {subscription?.subscribedChannel?.username}
                        </h5>
                        <span className="text-xs text-slate-400">
                            {subscription?.subscribedChannel?.subscribersCount}{" "}
                            Subscribers
                        </span>
                    </div>
                ))}
            </div>

            {/* Video List */}
            <div className="text-white mb-20 sm:mb-0 w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll">
                {uniqueSubscriptions?.map((subscription) => (
                    <Link
                        to={`/watch/${subscription?.subscribedChannel?.latestVideo?._id}`}
                        key={subscription?.subscribedChannel?._id} // Use unique key
                    >
                        {subscription?.subscribedChannel?.latestVideo && (
                            <VideoList
                                avatar={subscription?.subscribedChannel?.avatar.url}
                                duration={subscription?.subscribedChannel?.latestVideo?.duration}
                                title={subscription?.subscribedChannel?.latestVideo?.title}
                                thumbnail={subscription?.subscribedChannel?.latestVideo?.thumbnail?.url}
                                createdAt={subscription?.subscribedChannel?.latestVideo?.createdAt}
                                views={subscription?.subscribedChannel?.latestVideo?.views}
                                channelName={subscription?.subscribedChannel?.username}
                                videoId={subscription?.subscribedChannel?.latestVideo?._id}
                            />
                        )}
                    </Link>
                ))}
            </div>
        </>
    );
}

export default MySubscriptions;
