// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllTweets } from "../Store/Slices/tweetSlice";
// import { timeAgo } from "../helpers/timeAgo.js"; // Assuming this is defined
// import { Like, DeleteConfirmation, Edit } from "../components/index.js";
// import { HiOutlineDotsVertical } from "../components/icons.js";



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

    // Manage state for edit and delete
    const [editState, setEditState] = useState({
        editing: false,
        editedContent: "",
        isOpen: false,
        delete: false,
        tweetId: null, // Track which tweet is selected for edit/delete options
    });

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
            tweetId: null,
        }));
    };

    const handleDeleteTweet = (tweetId) => {
        dispatch(deleteTweet(tweetId));
        setEditState((prevState) => ({
            ...prevState,
            editing: false,
            isOpen: false,
            delete: false,
            tweetId: null,
        }));
    };

    return (
        <div className="text-white w-full flex flex-col gap-3">
            {tweets.map((tweet) => (
                <div
                    key={tweet.tweetId}
                    className="w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5"
                >
                    <div className="w-10">
                        <img
                            src={tweet.userId?.avatar || avatar2}
                            className="w-8 h-8 object-cover rounded-full"
                            alt="Avatar"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-1 relative">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs">{tweet.userId?.username}</h2>
                            <span className="text-xs text-slate-400">
                                {timeAgo(tweet.createdAt)}
                            </span>
                        </div>

                        {/* Display tweet content or edit form */}
                        {editState.editing && editState.tweetId === tweet.tweetId ? (
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
                                    handleEditTweet(tweet.tweetId, editedContent)
                                }
                            />
                        ) : (
                            <p>{tweet.content}</p> // Ensure this field exists in the tweets array
                        )}

                        {/* Like the tweet */}
                        <Like
                            isLiked={tweet.isLiked}
                            likesCount={tweet.likesCount}
                            tweetId={tweet.tweetId}
                            size={20}
                        />

                        {/* Edit/Delete Options */}
                        {authUsername === tweet.userId?.username && (
                            <>
                                <div
                                    className="w-5 h-5 absolute right-0 cursor-pointer"
                                    onClick={() =>
                                        setEditState((prevState) => ({
                                            ...prevState,
                                            isOpen: !prevState.isOpen,
                                            editedContent: tweet.content,
                                            tweetId: tweet.tweetId, // Store the selected tweetId
                                        }))
                                    }
                                >
                                    <FaTwitter />
                                </div>

                                {editState.isOpen && editState.tweetId === tweet.tweetId && (
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
                        {editState.delete && editState.tweetId === tweet.tweetId && (
                            <DeleteConfirmation
                                tweet={true}
                                onCancel={() =>
                                    setEditState((prevState) => ({
                                        ...prevState,
                                        delete: false,
                                    }))
                                }
                                onDelete={() => handleDeleteTweet(tweet.tweetId)}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TweetsFeed;
