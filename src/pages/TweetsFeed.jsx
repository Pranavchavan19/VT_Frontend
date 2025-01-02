// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllTweets } from "../Store/Slices/tweetSlice";
// import { timeAgo } from "../helpers/timeAgo.js"; // Assuming this is defined
// import { Like, DeleteConfirmation, Edit } from "../components/index.js";
// import { HiOutlineDotsVertical } from "../components/icons.js";











import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeAgo } from "../helpers/timeAgo.js";
import { Like, DeleteConfirmation, Edit } from "../components/index.js";
import { FaTwitter } from "../components/icons.js";
import { getAllTweets, deleteTweet, editTweet } from "../Store/Slices/tweetSlice";

function TweetsFeed() {
    const avatar2 = useSelector((state) => state.user?.profileData?.avatar?.url);
    const authUsername = useSelector((state) => state.auth?.userData?.username);
    const tweets = useSelector((state) => state.tweet?.tweets); // Fetch tweets from state
    const dispatch = useDispatch();

    // State for handling tweet editing and deleting
    const [editState, setEditState] = useState({
        editing: false,
        editedContent: "",
        isOpen: false,
        delete: false,
        tweetId: null, // Track which tweet is clicked
    });

    // Fetch tweets when component mounts
    useEffect(() => {
        dispatch(getAllTweets());
    }, [dispatch]);

    const handleEditTweet = (tweetId, editedContent) => {
        dispatch(editTweet({ tweetId, content: editedContent }));
        setEditState((prevState) => ({
            ...prevState,
            editing: false,
            editedContent,
            isOpen: false,
            delete: false,
            tweetId: null, // Reset tweetId after editing
        }));
    };

    const handleDeleteTweet = (tweetId) => {
        dispatch(deleteTweet(tweetId));
        setEditState((prevState) => ({
            ...prevState,
            editing: false,
            isOpen: false,
            delete: false,
            tweetId: null, // Reset tweetId after deleting
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
                        <img
                            src={tweet.owner?.avatar || avatar2}  // Ensure avatar is being used here
                            className="w-8 h-8 object-cover rounded-full"
                            alt="Avatar"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-1 relative">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs">{tweet.owner?.username}</h2>  {/* Make sure username is visible */}
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
                        {authUsername === tweet.owner?.username && (
                            <>
                                <div
                                    className="w-5 h-5 absolute right-0 cursor-pointer"
                                    onClick={() =>
                                        setEditState((prevState) => ({
                                            ...prevState,
                                            isOpen: !prevState.isOpen,
                                            tweetId: tweet._id, // Set the clicked tweetId
                                            editedContent: tweet.content, // Set content for editing
                                        }))
                                    }
                                >
                                    <FaTwitter />
                                </div>

                                {editState.isOpen && editState.tweetId === tweet._id && (
                                    <div className="border bg-[#222222] text-lg border-slate-600 absolute text-center right-5 rounded-xl">
                                        <ul>
                                            <li
                                                className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-600"
                                                onClick={() =>
                                                    setEditState((prevState) => ({
                                                        ...prevState,
                                                        editing: !prevState.editing,
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
            ))}
        </div>
    );
}

export default TweetsFeed;
