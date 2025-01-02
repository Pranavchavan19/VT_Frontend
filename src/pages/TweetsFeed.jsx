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
import { HiOutlineDotsVertical } from "../components/icons.js";
import { getAllTweets, deleteTweet, editTweet } from "../Store/Slices/tweetSlice";

function TweetsFeed() {
    const avatar2 = useSelector((state) => state.user?.profileData?.avatar?.url);
    const authUsername = useSelector((state) => state.auth?.userData?.username);
    const tweets = useSelector((state) => state.tweet?.tweets); // Fetch tweets from state
    const dispatch = useDispatch();

    const [activeTweet, setActiveTweet] = useState(null); // Store active tweet's ID for editing/deleting

    useEffect(() => {
        dispatch(getAllTweets());
    }, [dispatch]);

    const handleEditTweet = (tweetId, editedContent) => {
        dispatch(editTweet({ tweetId, content: editedContent }));
        setActiveTweet(null); // Close the edit mode
    };

    const handleDeleteTweet = (tweetId) => {
        dispatch(deleteTweet(tweetId));
        setActiveTweet(null); // Close the delete confirmation
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
                            src={tweet.avatar || avatar2}
                            className="w-8 h-8 object-cover rounded-full"
                            alt="Avatar"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-1 relative">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs">{tweet.username}</h2>
                            <span className="text-xs text-slate-400">
                                {timeAgo(tweet.createdAt)}
                            </span>
                        </div>

                        {/* Display tweet content or edit form */}
                        {activeTweet === tweet.tweetId ? (
                            <Edit
                                initialContent={tweet.content}
                                onCancel={() => setActiveTweet(null)}
                                onSave={(editedContent) =>
                                    handleEditTweet(tweet.tweetId, editedContent)
                                }
                            />
                        ) : (
                            <p>{tweet.content}</p>
                        )}

                        {/* Like the tweet */}
                        <Like
                            isLiked={tweet.isLiked}
                            likesCount={tweet.likesCount}
                            tweetId={tweet.tweetId}
                            size={20}
                        />

                        {/* Edit/Delete Options */}
                        {authUsername === tweet.username && (
                            <>
                                <div
                                    className="w-5 h-5 absolute right-0 cursor-pointer"
                                    onClick={() =>
                                        setActiveTweet(
                                            activeTweet === tweet.tweetId
                                                ? null
                                                : tweet.tweetId
                                        )
                                    }
                                >
                                    <HiOutlineDotsVertical />
                                </div>

                                {activeTweet === tweet.tweetId && (
                                    <div className="border bg-[#222222] text-lg border-slate-600 absolute text-center right-5 rounded-xl">
                                        <ul>
                                            <li
                                                className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-600"
                                                onClick={() =>
                                                    setActiveTweet(tweet.tweetId)
                                                }
                                            >
                                                Edit
                                            </li>
                                            <li
                                                className="px-5 hover:opacity-50 cursor-pointer"
                                                onClick={() =>
                                                    setActiveTweet({
                                                        tweetId,
                                                        delete: true,
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
                        {activeTweet?.tweetId === tweet.tweetId &&
                            activeTweet.delete && (
                                <DeleteConfirmation
                                    tweet={true}
                                    onCancel={() => setActiveTweet(null)}
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
