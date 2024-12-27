import React, {useEffect} from "react";
import { useSelector , useDispatch} from "react-redux"
import {getUserTweets} from "../../Store/Slices/tweetSlice"
import  TweetsList  from "../../components/TweetsList.jsx";
import TweetAndComment from "../../components/TweetAndComment"


function ChannelTweets(){
    const dispatch = useDispatch();
    const authId = useSelector( (state) => state.auth?.userData?._id);
    const userId = useSelector( (state) => state.user?.profileData?._id);
    const tweets = useSelector(  (state) => state.tweet?.tweets);

    useEffect( () => {
        if(userId) dispatch(getUserTweets(userId));
    },[dispatch , userId])

    return(
        <>
            {authId === userId && <TweetAndComment tweet={true}/>}
            {tweets?.map((tweet) => (
                <TweetsList
                    key={tweet?._id}
                    avatar={tweet?.ownerDetails?.avatar.url}
                    content={tweet?.content}
                    createdAt={tweet?.createdAt}
                    likesCount={tweet?.likesCount}
                    tweetId={tweet?._id}
                    username={tweet?.ownerDetails?.username}
                    isLiked={tweet?.isLiked}
                />
            ))}
        </>
    );
}
export default ChannelTweets;


