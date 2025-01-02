import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../Store/Slices/tweetSlice";

const TweetsFeed = () => {
    const dispatch = useDispatch();
    const { tweets, loading } = useSelector((state) => state.tweet);

    useEffect(() => {
        dispatch(getAllTweets());
    }, [dispatch]);

    return (
        <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            {loading ? (
                <div style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
                    Loading...
                </div>
            ) : tweets.length > 0 ? (
                tweets.map((tweet) => (
                    <div
                        key={tweet._id}
                        style={{
                            backgroundColor: "#1e1e2e",
                            border: "1px solid #333",
                            borderRadius: "8px",
                            padding: "15px",
                            marginBottom: "15px",
                            color: "#fff",
                        }}
                    >
                        <h4 style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "5px" }}>
                            {tweet.username}
                        </h4>
                        <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                            {tweet.content}
                        </p>
                        <small style={{ fontSize: "12px", color: "#888" }}>
                            {new Date(tweet.createdAt).toLocaleString()}
                        </small>
                    </div>
                ))
            ) : (
                <div style={{ textAlign: "center", fontSize: "16px", color: "#666" }}>
                    No tweets to display.
                </div>
            )}
        </div>
    );
};

export default TweetsFeed;
