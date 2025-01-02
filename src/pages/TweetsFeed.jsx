

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeAgo } from "../helpers/timeAgo";  // Helper for time formatting
import { Like, DeleteConfirmation, Edit } from "../components/index";
import { HiOutlineDotsVertical } from "../components/icons";
import { getAllTweets, deleteTweet, editTweet } from "../Store/Slices/tweetSlice";

function TweetsFeed({
    tweetId,
    avatar,
    username,
    createdAt,
    content,
    likesCount = 0,
    isLiked,
})  {
    const avatar2 = useSelector((state) => state.user?.profileData?.avatar.url);
    const authUsername = useSelector((state) => state.auth?.userData?.username);
    const dispatch = useDispatch();
    
    const tweets = useSelector((state) => state.tweet?.tweets); // Fetch tweets from state
    const isLoading = useSelector((state) => state.tweet?.isLoading); // Track loading state

    const [editState, setEditState] = useState({
        editing: false,
        editedContent: "",  // Default to an empty string
        isOpen: false,
        delete: false,
        tweetId: null,  // Add tweetId to identify which tweet to edit/delete
    });

    // Fetch tweets when component mounts
    useEffect(() => {
        dispatch(getAllTweets());  // Dispatch action to get all tweets
    }, [dispatch]);

    // Handle edit and delete actions
    const handleEditTweet = (tweetId, editedContent) => {
        dispatch(editTweet({ tweetId, content: editedContent }));
        setEditState((prevState) => ({
            ...prevState,
            editing: false,
            editedContent,
            isOpen: false,
            delete: false,
            tweetId: null,  // Reset tweetId after saving
        }));
    };

    const handleDeleteTweet = (tweetId) => {
        dispatch(deleteTweet(tweetId));
        setEditState((prevState) => ({
            ...prevState,
            editing: false,
            isOpen: false,
            delete: false,
            tweetId: null,  // Reset tweetId after deleting
        }));
    };

    // Loading state UI
    if (isLoading) {
        return <div className="text-white text-center">Loading tweets...</div>;
    }

    return (
        <div className="text-white w-full flex flex-col gap-3">
            {tweets && tweets.length > 0 ? (
                tweets.map((tweet) => (
                    <div key={tweet._id} className="w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5">
                        <div className="w-10">
                            <img
                                src={tweet.owner?.avatar?.url || avatar2}  // Fallback to default avatar
                                className="w-8 h-8 object-cover rounded-full"
                                alt="Avatar"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1 relative">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xs">{tweet.owner?.username}</h2>
                                <span className="text-xs text-slate-400">
                                    {timeAgo(tweet.createdAt)}
                                </span>
                            </div>

                            {/* Display tweet content or edit form */}
                            {editState.editing && editState.tweetId === tweet._id ? (
                                <Edit
                                    initialContent={editState.editedContent}
                                    onCancel={() =>
                                        setEditState((prevState) => ({
                                            ...prevState,
                                            editing: false,
                                            isOpen: false,
                                            tweetId: null,
                                        }))
                                    }
                                    onSave={(editedContent) => handleEditTweet(tweet._id, editedContent)}
                                />
                            ) : (
                                <p>{tweet.content}</p>
                            )}

                            {/* Like the tweet */}
                            <Like
                                isLiked={tweet.isLiked}
                                likesCount={tweet.likesCount}
                                tweetId={tweet._id}
                                size={20}
                            />

                            {/* Edit/Delete Options */}
                            {authUsername === tweet.owner?.username && (
                                <>
                                    <div
                                        className="w-5 h-5 absolute right-0 cursor-pointer"
                                        onClick={() =>
                                            setEditState((prevState) => ({
                                                ...prevState,
                                                isOpen: !prevState.isOpen,
                                                tweetId: tweet._id,  // Set tweetId when opening options
                                                editedContent: tweet.content,  // Prepopulate content for editing
                                            }))
                                        }
                                    >
                                        <HiOutlineDotsVertical />
                                    </div>

                                    {editState.isOpen && editState.tweetId === tweet._id && (
                                        <div className="border bg-[#222222] text-lg border-slate-600 absolute text-center right-5 rounded-xl">
                                            <ul>
                                                <li
                                                    className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-600"
                                                    onClick={() =>
                                                        setEditState((prevState) => ({
                                                            ...prevState,
                                                            editing: true,
                                                            isOpen: false,
                                                        }))
                                                    }
                                                >
                                                    Edit
                                                </li>
                                                <li
                                                    className="px-5 hover:opacity-50 cursor-pointer"
                                                    onClick={() =>
                                                        setEditState((prevState) => ({
                                                            ...prevState,
                                                            delete: true,
                                                            isOpen: false,
                                                        }))
                                                    }
                                                >
                                                    Delete
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Delete Confirmation */}
                            {editState.delete && editState.tweetId === tweet._id && (
                                <DeleteConfirmation
                                    tweet={true}
                                    onCancel={() =>
                                        setEditState((prevState) => ({
                                            ...prevState,
                                            delete: false,
                                        }))
                                    }
                                    onDelete={() => handleDeleteTweet(tweet._id)}
                                />
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-white text-center">No tweets available.</div>
            )}
        </div>
    );
}

export default TweetsFeed;






// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { timeAgo } from "../helpers/timeAgo";
// import { Like, DeleteConfirmation, Edit } from "../components/index";
// import { HiOutlineDotsVertical } from "../components/icons";
// import { getAllTweets, deleteTweet, editTweet, likeTweet } from "../Store/Slices/tweetSlice";

// function TweetsFeed() {
//     const avatar2 = useSelector((state) => state.user?.profileData?.avatar.url);
//     const authUsername = useSelector((state) => state.auth?.userData?.username);
//     const tweets = useSelector((state) => state.tweet?.tweets);
//     const isLoading = useSelector((state) => state.tweet?.isLoading);
//     const dispatch = useDispatch();

//     const [editState, setEditState] = useState({
//         editing: false,
//         editedContent: "",
//         isOpen: false,
//         delete: false,
//         tweetId: null,
//     });

//     useEffect(() => {
//         dispatch(getAllTweets());
//     }, [dispatch]);

//     const handleEditTweet = (tweetId, editedContent) => {
//         dispatch(editTweet({ tweetId, content: editedContent }));
//         setEditState({ editing: false, isOpen: false, delete: false, tweetId: null });
//     };

//     const handleDeleteTweet = (tweetId) => {
//         dispatch(deleteTweet(tweetId));
//         setEditState({ editing: false, isOpen: false, delete: false, tweetId: null });
//     };

//     const handleLikeTweet = (tweetId) => {
//         dispatch(likeTweet(tweetId));
//     };

//     if (isLoading) {
//         return <div className="text-white text-center">Loading tweets...</div>;
//     }

//     return (
//         <div className="text-white w-full flex flex-col gap-3">
//             {tweets && tweets.length > 0 ? (
//                 tweets.map((tweet) => (
//                     <div key={tweet._id} className="w-full flex sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5">
//                         <div className="w-10">
//                             <img
//                                 src={tweet.owner?.avatar?.url || avatar2}
//                                 className="w-8 h-8 object-cover rounded-full"
//                                 alt="Avatar"
//                             />
//                         </div>
//                         <div className="w-full flex flex-col gap-1 relative">
//                             <div className="flex items-center gap-2">
//                                 <h2 className="text-xs">{tweet.owner?.username}</h2>
//                                 <span className="text-xs text-slate-400">{timeAgo(tweet.createdAt)}</span>
//                             </div>

//                             {editState.editing && editState.tweetId === tweet._id ? (
//                                 <Edit
//                                     initialContent={editState.editedContent}
//                                     onCancel={() => setEditState({ editing: false, isOpen: false, tweetId: null })}
//                                     onSave={(editedContent) => handleEditTweet(tweet._id, editedContent)}
//                                 />
//                             ) : (
//                                 <p>{tweet.content}</p>
//                             )}

//                             <Like
//                                 isLiked={tweet.isLiked}
//                                 likesCount={tweet.likesCount}
//                                 tweetId={tweet._id}
//                                 size={20}
//                                 onLike={() => handleLikeTweet(tweet._id)}
//                             />

//                             {authUsername === tweet.owner?.username && (
//                                 <>
//                                     <div
//                                         className="w-5 h-5 absolute right-0 cursor-pointer"
//                                         onClick={() =>
//                                             setEditState({ isOpen: !editState.isOpen, tweetId: tweet._id, editedContent: tweet.content })
//                                         }
//                                     >
//                                         <HiOutlineDotsVertical />
//                                     </div>
//                                     {editState.isOpen && editState.tweetId === tweet._id && (
//                                         <div className="border bg-[#222222] text-lg border-slate-600 absolute right-5 rounded-xl">
//                                             <ul>
//                                                 <li
//                                                     className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-600"
//                                                     onClick={() => setEditState({ editing: true, isOpen: false })}
//                                                 >
//                                                     Edit
//                                                 </li>
//                                                 <li
//                                                     className="px-5 hover:opacity-50 cursor-pointer"
//                                                     onClick={() => setEditState({ delete: true, isOpen: false })}
//                                                 >
//                                                     Delete
//                                                 </li>
//                                             </ul>
//                                         </div>
//                                     )}
//                                 </>
//                             )}

//                             {editState.delete && editState.tweetId === tweet._id && (
//                                 <DeleteConfirmation
//                                     tweet={true}
//                                     onCancel={() => setEditState({ delete: false })}
//                                     onDelete={() => handleDeleteTweet(tweet._id)}
//                                 />
//                             )}
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <div className="text-white text-center">No tweets available.</div>
//             )}
//         </div>
//     );
// }

// export default TweetsFeed;



