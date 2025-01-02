import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../Store/Slices/tweetSlice";
import { timeAgo } from "../helpers/timeAgo.js";  // Assuming this is defined
import { Like, DeleteConfirmation, Edit } from "../components/index.js";
import { HiOutlineDotsVertical } from "../components/icons.js";

const TweetsFeed = () => {
    const dispatch = useDispatch();
    const { tweets, loading } = useSelector((state) => state.tweet);
    const avatar2 = useSelector((state) => state.user?.profileData?.avatar.url);  // Fallback avatar from user profile
    const [editState, setEditState] = useState({
        editing: false,
        editedContent: "",
        isOpen: false,
        delete: false,
    });

    useEffect(() => {
        dispatch(getAllTweets());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>; // Simple loading state

    return (
        <div style={{ padding: '16px' }}>
            {tweets.map((tweet) => (
                <div key={tweet.tweetId} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px', 
                    borderBottom: '1px solid #333', 
                    padding: '16px' 
                }}>
                    {/* Avatar */}
                    <div style={{ width: '40px' }}>
                        <img
                            src={tweet.avatar || avatar2}  // Use tweet avatar or fallback to avatar2
                            alt="Avatar"
                            style={{
                                width: '32px',
                                height: '32px',
                                objectFit: 'cover',
                                borderRadius: '50%'
                            }}
                        />
                    </div>

                    {/* Tweet Content */}
                    <div style={{ flex: 1, position: 'relative' }}>
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h2 style={{ fontSize: '14px' }}>{tweet.username}</h2>
                            <span style={{ fontSize: '12px', color: '#888' }}>
                                {timeAgo(tweet.createdAt)}
                            </span>
                        </div>

                        {/* Display tweet content */}
                        <p>{tweet.content}</p>

                        {/* Like the tweet */}
                        <Like
                            isLiked={tweet.isLiked}
                            likesCount={tweet.likesCount}
                            tweetId={tweet.tweetId}
                            size={20}
                        />

                        {/* Edit/Delete Options */}
                        {tweet.username === avatar2 && (
                            <div style={{ position: 'absolute', right: '0', top: '0' }}>
                                <div
                                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                    onClick={() =>
                                        setEditState((prevState) => ({
                                            ...prevState,
                                            isOpen: !prevState.isOpen,
                                        }))
                                    }
                                >
                                    <HiOutlineDotsVertical />
                                </div>

                                {/* Edit/Delete Menu */}
                                {editState.isOpen && (
                                    <div 
                                        style={{
                                            backgroundColor: '#222',
                                            color: 'white',
                                            borderRadius: '8px',
                                            position: 'absolute',
                                            right: '5px',
                                            top: '30px',
                                            width: '120px',
                                            padding: '10px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            <li 
                                                style={{ padding: '8px', cursor: 'pointer' }}
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
                                                style={{ padding: '8px', cursor: 'pointer' }}
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
                            </div>
                        )}

                        {/* Delete Confirmation */}
                        {editState.delete && (
                            <DeleteConfirmation
                                tweet={true}
                                onCancel={() =>
                                    setEditState((prevState) => ({
                                        ...prevState,
                                        delete: false,
                                    }))
                                }
                                onDelete={() => {/* handle delete tweet */}}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TweetsFeed;
