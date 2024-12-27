
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannelSubscribers, toggleSubscription } from "../../Store/Slices/subscriptionSlice";
import { Avatar, Button } from "../../components";
import { Link } from "react-router-dom";

function ChannelSubscribers() {
    const dispatch = useDispatch();
    const channelId = useSelector((state) => state.user.profileData?._id);
    const subscribers = useSelector((state) => state.subscription.channelSubscribers);

    useEffect(() => {
        if (channelId) {
            dispatch(getUserChannelSubscribers(channelId));
        }
    }, [dispatch, channelId]);

    // Deduplicate subscribers using Map to ensure unique entries
    const uniqueSubscribers = Array.from(
        new Map(
            (subscribers || []).map((subscriber) => [
                subscriber?.subscriber?._id, // Using the subscriber's unique ID as the key
                subscriber,
            ])
        ).values()
    );

    const handleSubscriptionToggle = (subscriberId) => {
        // Dispatch action to toggle subscription for the specific subscriber
        dispatch(toggleSubscription(subscriberId));
    };

    return (
        <>
            {uniqueSubscribers?.map((subscriber) => (
                <Link
                    key={subscriber?.subscriber?._id}
                    className="flex border-b border-slate-500 px-3 py-1 justify-between items-center text-white"
                >
                    <div className="flex gap-3 items-center">
                        <Avatar
                            src={subscriber?.subscriber?.avatar?.url}
                            channelName={subscriber?.subscriber?.username}
                        />
                        <div>
                            <h5 className="text-sm">
                                {subscriber?.subscriber?.username}
                            </h5>
                            <span className="text-xs text-slate-400">
                                {subscriber?.subscriber?.subscribersCount} Subscribers
                            </span>
                        </div>
                    </div>
                    <div>
                        <Button
                            className={`${
                                subscriber?.subscriber?.subscribedToSubscriber
                                    ? "bg-gray-500 text-white"
                                    : "bg-purple-500 text-black"
                            } text-xs py-1 px-2`}
                            onClick={() =>
                                handleSubscriptionToggle(subscriber?.subscriber?._id)
                            }
                        >
                            {subscriber?.subscriber?.subscribedToSubscriber
                                ? "Subscribed"
                                : "Subscribe"}
                        </Button>
                    </div>
                </Link>
            ))}
        </>
    );
}

export default ChannelSubscribers;
