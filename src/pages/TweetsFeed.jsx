


// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { timeAgo } from "../helpers/timeAgo";  // Helper for time formatting
// import { Like, DeleteConfirmation, Edit } from "../components/index";
// import { FaTwitter } from "../components/icons";
// import { getAllTweets, deleteTweet, editTweet } from "../Store/Slices/tweetSlice";

// function TweetsFeed() {
//     const avatar2 = useSelector((state) => state.user?.profileData?.avatar?.url); // Default avatar
//     const authUsername = useSelector((state) => state.auth?.userData?.username); // Current user’s username
//     const tweets = useSelector((state) => state.tweet?.tweets); // Fetch tweets from state
//     const dispatch = useDispatch();

//     // Track which tweet is being edited or deleted
//     const [editState, setEditState] = useState({
//         editingTweetId: null, // Track tweet being edited
//         editedContent: "",     // Edited tweet content
//         deleteTweetId: null,   // Track tweet being deleted
//         isOpen: false,         // Flag for showing options
//     });

//     // Fetch all tweets when the component mounts
//     useEffect(() => {
//         dispatch(getAllTweets());  // Fetch tweets from the store
//     }, [dispatch]);

//     const handleEditTweet = (tweetId, editedContent) => {
//         // Dispatch edit action to the store
//         dispatch(editTweet({ tweetId, content: editedContent }));
//         setEditState({
//             ...editState,
//             editingTweetId: null,
//             editedContent: "",
//             isOpen: false,
//         });
//     };

//     const handleDeleteTweet = (tweetId) => {
//         // Dispatch delete action to the store
//         dispatch(deleteTweet(tweetId));
//         setEditState({
//             ...editState,
//             deleteTweetId: null,
//             isOpen: false,
//         });
//     };

//     // Function to handle opening edit/delete options
//     const handleTweetOptions = (tweetId, content) => {
//         setEditState({
//             ...editState,
//             isOpen: !editState.isOpen,
//             editingTweetId: tweetId, // Set the tweet being edited
//             editedContent: content,  // Prepopulate content for editing
//         });
//     };

//     return (
//         <div className="text-white w-full flex flex-col gap-3">
//             {tweets.map((tweet) => (
//                 <div key={tweet._id} className="w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5">
//                     <div className="w-10">
//                         <img
//                             src={tweet.owner?.avatar?.url || avatar2}  // Use tweet owner’s avatar or fallback to default
//                             className="w-8 h-8 object-cover rounded-full"
//                             alt="Avatar"
//                         />
//                     </div>
//                     <div className="w-full flex flex-col gap-1 relative">
//                         <div className="flex items-center gap-2">
//                             <h2 className="text-xs">{tweet.owner?.username || "Anonymous"}</h2> {/* Display username or anonymous */}
//                             <span className="text-xs text-slate-400">
//                                 {timeAgo(tweet.createdAt)} {/* Display tweet creation time */}
//                             </span>
//                         </div>

//                         {/* Display tweet content or edit form
//                         {editState.editingTweetId === tweet._id ? (
//                             <Edit
//                                 initialContent={editState.editedContent}
//                                 onCancel={() =>
//                                     setEditState({ ...editState, editingTweetId: null, isOpen: false })
//                                 }
//                                 onSave={(editedContent) => handleEditTweet(tweet._id, editedContent)}
//                             />
//                         ) : (
//                             <p>{tweet.content}</p>
//                         )} */}

//                          {editState.editing ? (
//                            <Edit
//                                  initialContent={editState.editedContent}
//                                  onCancel={() =>
//                                  setEditState((prevState) => ({
//                                  ...prevState,
//                                  editing: false,
//                                  isOpen: false,
//                                  }))
//                                  }
//                                   onSave={handleEditTweet}
//                             />
//                             ) : (
//                             <p>{editState.editedContent}</p>
//                             )}

//                         {/* Like the tweet */}
//                         <Like
//                             isLiked={tweet.isLiked}
//                             likesCount={tweet.likesCount}
//                             tweetId={tweet._id}
//                             size={20}
//                         />

//                         {/* Edit/Delete Options (only show if the tweet belongs to the logged-in user) */}
//                         {authUsername === tweet.owner?.username && (
//                             <>
//                                 <div
//                                     className="w-5 h-5 absolute right-0 cursor-pointer"
//                                     onClick={() => handleTweetOptions(tweet._id, tweet.content)}
//                                 >
//                                     <FaTwitter />
//                                 </div>

//                                 {editState.isOpen && editState.editingTweetId === tweet._id && (
//                                     <div className="border bg-[#222222] text-lg border-slate-600 absolute text-center right-5 rounded-xl">
//                                         <ul>
//                                             <li
//                                                 className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-600"
//                                                 onClick={() =>
//                                                     setEditState({
//                                                         ...editState,
//                                                         editingTweetId: tweet._id,
//                                                         isOpen: false,
//                                                     })
//                                                 }
//                                             >
//                                                 Edit
//                                             </li>
//                                             <li
//                                                 className="px-5 hover:opacity-50 cursor-pointer"
//                                                 onClick={() =>
//                                                     setEditState({
//                                                         ...editState,
//                                                         deleteTweetId: tweet._id,
//                                                         isOpen: false,
//                                                     })
//                                                 }
//                                             >
//                                                 Delete
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 )}
//                             </>
//                         )}

//                         {/* Delete Confirmation */}
//                         {editState.deleteTweetId === tweet._id && (
//                             <DeleteConfirmation
//                                 tweet={true}
//                                 onCancel={() =>
//                                     setEditState({ ...editState, deleteTweetId: null })
//                                 }
//                                 onDelete={() => handleDeleteTweet(tweet._id)}
//                             />
//                         )}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default TweetsFeed;









import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeAgo } from "../helpers/timeAgo";  // Helper for time formatting
import { Like, DeleteConfirmation, Edit } from "../components/index";
import { FaTwitter } from "../components/icons";
import { getAllTweets, deleteTweet, editTweet } from "../Store/Slices/tweetSlice";

function TweetsFeed() {
    const avatar2 = useSelector((state) => state.user?.profileData?.avatar?.url); // Default avatar
    const authUsername = useSelector((state) => state.auth?.userData?.username); // Current user’s username
    const tweets = useSelector((state) => state.tweet?.tweets); // Fetch tweets from state
    const dispatch = useDispatch();

    // Track which tweet is being edited or deleted
    const [editState, setEditState] = useState({
        editingTweetId: null, // Track tweet being edited
        editedContent: "",     // Edited tweet content
        deleteTweetId: null,   // Track tweet being deleted
        isOpen: false,         // Flag for showing options
    });

    // Fetch all tweets when the component mounts
    useEffect(() => {
        dispatch(getAllTweets());  // Fetch tweets from the store
    }, [dispatch]);

    const handleEditTweet = (tweetId, editedContent) => {
        // Dispatch edit action to the store
        dispatch(editTweet({ tweetId, content: editedContent }));
        setEditState({
            ...editState,
            editingTweetId: null,  // Exit editing mode
            editedContent: "",     // Clear the edited content
            isOpen: false,         // Close options menu
        });
    };

    const handleDeleteTweet = (tweetId) => {
        // Dispatch delete action to the store
        dispatch(deleteTweet(tweetId));
        setEditState({
            ...editState,
            deleteTweetId: null,   // Exit delete mode
            isOpen: false,         // Close options menu
        });
    };

    // Function to handle opening edit/delete options
    const handleTweetOptions = (tweetId, content) => {
        setEditState({
            ...editState,
            isOpen: !editState.isOpen,
            editingTweetId: tweetId, // Set the tweet being edited
            editedContent: content,  // Prepopulate content for editing
        });
    };

    return (
        <div className="text-white w-full flex flex-col gap-3">
            {tweets.map((tweet) => (
                <div key={tweet._id} className="w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5">
                    <div className="w-10">
                        <img
                            src={tweet.owner?.avatar?.url || avatar2}  // Use tweet owner’s avatar or fallback to default
                            className="w-8 h-8 object-cover rounded-full"
                            alt="Avatar"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-1 relative">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs">{tweet.owner?.username || "Anonymous"}</h2> {/* Display username or anonymous */}
                            <span className="text-xs text-slate-400">
                                {timeAgo(tweet.createdAt)} {/* Display tweet creation time */}
                            </span>
                        </div>

                        {/* Display tweet content or edit form */}
                        {editState.editingTweetId === tweet._id ? (
                            <Edit
                                initialContent={editState.editedContent}
                                onCancel={() =>
                                    setEditState({ ...editState, editingTweetId: null, isOpen: false })
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

                        {/* Edit/Delete Options (only show if the tweet belongs to the logged-in user) */}
                        {authUsername === tweet.owner?.username && (
                            <>
                                <div
                                    className="w-5 h-5 absolute right-0 cursor-pointer"
                                    onClick={() => handleTweetOptions(tweet._id, tweet.content)}
                                >
                                    <FaTwitter />
                                </div>

                                {editState.isOpen && editState.editingTweetId === tweet._id && (
                                    <div className="border bg-[#222222] text-lg border-slate-600 absolute text-center right-5 rounded-xl">
                                        <ul>
                                            <li
                                                className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-600"
                                                onClick={() =>
                                                    setEditState({
                                                        ...editState,
                                                        editingTweetId: tweet._id,
                                                        isOpen: false,
                                                    })
                                                }
                                            >
                                                Edit
                                            </li>
                                            <li
                                                className="px-5 hover:opacity-50 cursor-pointer"
                                                onClick={() =>
                                                    setEditState({
                                                        ...editState,
                                                        deleteTweetId: tweet._id,
                                                        isOpen: false,
                                                    })
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
                        {editState.deleteTweetId === tweet._id && (
                            <DeleteConfirmation
                                tweet={true}
                                onCancel={() =>
                                    setEditState({ ...editState, deleteTweetId: null })
                                }
                                onDelete={() => handleDeleteTweet(tweet._id)}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TweetsFeed;
