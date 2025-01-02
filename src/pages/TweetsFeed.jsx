import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeAgo } from "../helpers/timeAgo";
import { Like, DeleteConfirmation, Edit } from "../components/index";
import { FaTwitter } from "../components/icons";
import { getAllTweets, deleteTweet, editTweet } from "../Store/Slices/tweetSlice";

function TweetsFeed() {
    const avatar2 = useSelector((state) => state.user?.profileData?.avatar?.url);
    const authUsername = useSelector((state) => state.auth?.userData?.username);
    const tweets = useSelector((state) => state.tweet?.tweets); // Fetch tweets from state
    const dispatch = useDispatch();

    // Track which tweet is being edited/deleted
    const [editState, setEditState] = useState({
        editingTweetId: null, // track the tweet being edited
        editedContent: "",
        deleteTweetId: null, // track tweet to be deleted
        isOpen: false, // for showing options
    });

    // Fetch all tweets when the component mounts
    useEffect(() => {
        dispatch(getAllTweets());
    }, [dispatch]);

    const handleEditTweet = (tweetId, editedContent) => {
        dispatch(editTweet({ tweetId, content: editedContent }));
        setEditState((prevState) => ({
            ...prevState,
            editingTweetId: null, // Reset editing state
            editedContent: "",
            isOpen: false,
        }));
    };

    const handleDeleteTweet = (tweetId) => {
        dispatch(deleteTweet(tweetId));
        setEditState((prevState) => ({
            ...prevState,
            deleteTweetId: null, // Reset delete state
            isOpen: false,
        }));
    };

    // Function to handle opening the edit/delete options
    const handleTweetOptions = (tweetId, content) => {
        setEditState((prevState) => ({
            ...prevState,
            isOpen: !prevState.isOpen,
            editingTweetId: tweetId, // Set the tweet being edited
            editedContent: content,
        }));
    };

    return (
        <div className="text-white w-full flex flex-col gap-3">
            {tweets.map((tweet) => (
                <div
                    key={tweet._id}
                    className="w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5"
                >
                    <div className="w-10">
                        {/* Debugging log to ensure the avatar is being fetched correctly */}
                        {console.log('User avatar:', tweet.userId?.avatar || avatar2)}
                        <img
                            src={tweet.userId?.avatar || avatar2}
                            className="w-8 h-8 object-cover rounded-full"
                            alt="Avatar"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-1 relative">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs">{tweet.userId?.username || "Anonymous"}</h2>
                            <span className="text-xs text-slate-400">
                                {timeAgo(tweet.createdAt)}
                            </span>
                        </div>

                        {/* Display tweet content or edit form */}
                        {editState.editingTweetId === tweet._id ? (
                            <Edit
                                initialContent={editState.editedContent}
                                onCancel={() =>
                                    setEditState((prevState) => ({
                                        ...prevState,
                                        editingTweetId: null,
                                        isOpen: false,
                                    }))
                                }
                                onSave={(editedContent) =>
                                    handleEditTweet(tweet._id, editedContent)
                                }
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
                        {authUsername === tweet.userId?.username && (
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
                                                    setEditState((prevState) => ({
                                                        ...prevState,
                                                        editingTweetId: tweet._id,
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
                                                        deleteTweetId: tweet._id,
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
                        {editState.deleteTweetId === tweet._id && (
                            <DeleteConfirmation
                                tweet={true}
                                onCancel={() =>
                                    setEditState((prevState) => ({
                                        ...prevState,
                                        deleteTweetId: null,
                                    }))
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
