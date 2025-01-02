import React, { useState } from "react";
import { useSelector } from "react-redux";
import { timeAgo } from "../helpers/timeAgo";
import { useDispatch } from "react-redux";
import { Like, DeleteConfirmation, Edit } from "./index";
import { HiOutlineDotsVertical } from "./icons";
import { deleteTweet, editTweet } from "../Store/Slices/tweetSlice";

function TweetsList({
    tweetId,
    avatar,
    username,
    createdAt,
    content,
    likesCount = 0,
    isLiked,
}) {
    const avatar2 = useSelector((state) => state.user?.profileData?.avatar.url);
    const authUsername = useSelector((state) => state.auth?.userData?.username);
    const dispatch = useDispatch();

    const [editState, setEditState] = useState({
        editing: false,
        editedContent: content,
        isOpen: false,
        delete: false,
    });

    const handleEditTweet = (editedContent) => {
        dispatch(editTweet({ tweetId, content: editedContent }));
        setEditState((prevState) => ({
            ...prevState,
            editing: false,
            editedContent,
            isOpen: false,
            delete: false,
        }));
    };

    const handleDeleteTweet = () => {
        dispatch(deleteTweet(tweetId));
        setEditState((prevState) => ({
            ...prevState,
            editing: false,
            isOpen: false,
            delete: false,
        }));
    };

    return (
        <div className="text-white w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5">
            <div className="w-10">
                <img
                    src={avatar || avatar2}
                    className="w-8 h-8 object-cover rounded-full"
                    alt="Avatar"
                />
            </div>
            <div className="w-full flex flex-col gap-1 relative">
                <div className="flex items-center gap-2">
                    <h2 className="text-xs">{username}</h2>
                    <span className="text-xs text-slate-400">
                        {timeAgo(createdAt)}
                    </span>
                </div>

                {/* Display tweet content or edit form */}
                {editState.editing ? (
                    <Edit
                        initialContent={editState.editedContent}
                        onCancel={() =>
                            setEditState((prevState) => ({
                                ...prevState,
                                editing: false,
                                isOpen: false,
                            }))
                        }
                        onSave={handleEditTweet}
                    />
                ) : (
                    <p>{editState.editedContent}</p>
                )}

                {/* Like the tweet */}
                <Like
                    isLiked={isLiked}
                    likesCount={likesCount}
                    tweetId={tweetId}
                    size={20}
                />

                {/* Edit/Delete Options */}
                {authUsername === username && (
                    <>
                        <div
                            className="w-5 h-5 absolute right-0 cursor-pointer"
                            onClick={() =>
                                setEditState((prevState) => ({
                                    ...prevState,
                                    isOpen: !prevState.isOpen,
                                }))
                            }
                        >
                            <HiOutlineDotsVertical />
                        </div>

                        {editState.isOpen && (
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
                {editState.delete && (
                    <DeleteConfirmation
                        tweet={true}
                        onCancel={() =>
                            setEditState((prevState) => ({
                                ...prevState,
                                delete: false,
                            }))
                        }
                        onDelete={handleDeleteTweet}
                    />
                )}
            </div>
        </div>
    );
}

export default TweetsList;
