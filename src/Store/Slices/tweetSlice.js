

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../helpers/axiosInstance";
// import toast from "react-hot-toast";

// const initialState = {
//     loading: false,
//     tweets: [],
// };

// export const createTweet = createAsyncThunk("createTweet", async (content) => {
//     try {
//         const response = await axiosInstance.post("/tweet", content);
//         toast.success(response.data?.message);
//         return response.data.data;
//     } catch (error) {
//         toast.error(error?.response?.data?.error);
//         throw error;
//     }
// });

// export const editTweet = createAsyncThunk(
//     "editTweet",
//     async ({ tweetId, content }) => {
//         try {
//             const response = await axiosInstance.patch(
//                 `/tweet/${tweetId}`,
//                 {content}
//             );
//             toast.success(response.data.message);
//             return response.data.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.error);
//             throw error;
//         }
//     }
// );

// export const deleteTweet = createAsyncThunk("deleteTweet", async (tweetId) => {
//     try {
//         const response = await axiosInstance.delete(`/tweet/${tweetId}`);
//         toast.success(response.data.message);
//         return response.data.data.tweetId;
//     } catch (error) {
//         toast.error(error?.response?.data?.error);
//         throw error;
//     }
// });

// export const getUserTweets = createAsyncThunk( "getUserTweets", async (userId) => {
//         try {
//             const response = await axiosInstance.get(`/tweet/user/${userId}`);
//             return response.data.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.error);
//             throw error;
//         }
//     }
// );

// export const getAllTweets = createAsyncThunk("getAllTweets", async () => {
//     try {
//         const response = await axiosInstance.get("/tweet"); // Public API endpoint
//         return response.data.data;
//     } catch (error) {
//         toast.error(error?.response?.data?.error);
//         throw error;
//     }
// });


// const tweetSlice = createSlice({
//     name: "tweet",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase( getUserTweets.pending, (state) => {
//             state.loading = true;
//         }
//         );
//         builder.addCase(getUserTweets.fulfilled, (state, action) => {
//             state.loading = false;
//             state.tweets = action.payload;
//         });
//         builder.addCase(createTweet.fulfilled, (state, action) => {
//             state.tweets.unshift(action.payload);
//         })
//         builder.addCase(deleteTweet.fulfilled, (state, action) => {
//             state.tweets = state.tweets.filter((tweet) => tweet._id !== action.payload);
//         })

//         builder.addCase(getAllTweets.pending, (state) => {
//             state.loading = true;
//         });
//         builder.addCase(getAllTweets.fulfilled, (state, action) => {
//             state.loading = false;
//             state.tweets = action.payload;
//         });
        
//     },
// });

// export const {addTweet} = tweetSlice.actions;

// export default tweetSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    tweets: [],
};

// Async Thunks
export const createTweet = createAsyncThunk("createTweet", async (content) => {
    try {
        const response = await axiosInstance.post("/tweet", content);
        toast.success(response.data?.message);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const editTweet = createAsyncThunk("editTweet", async ({ tweetId, content }) => {
    try {
        const response = await axiosInstance.patch(`/tweet/${tweetId}`, { content });
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const deleteTweet = createAsyncThunk("deleteTweet", async (tweetId) => {
    try {
        const response = await axiosInstance.delete(`/tweet/${tweetId}`);
        toast.success(response.data.message);
        return tweetId;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const getUserTweets = createAsyncThunk("getUserTweets", async (userId) => {
    try {
        const response = await axiosInstance.get(`/tweet/user/${userId}`);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const getAllTweets = createAsyncThunk("getAllTweets", async () => {
    try {
        const response = await axiosInstance.get("/tweet");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const likeTweet = createAsyncThunk("likeTweet", async (tweetId) => {
    try {
        const response = await axiosInstance.post(`/tweet/${tweetId}/like`);
        return { tweetId, likesCount: response.data.likesCount, isLiked: response.data.isLiked };
    } catch (error) {
        toast.error(error.response?.data?.error || "Failed to like tweet");
        throw error;
    }
});

// Slice
const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserTweets.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserTweets.fulfilled, (state, action) => {
            state.loading = false;
            state.tweets = action.payload;
        });

        builder.addCase(createTweet.fulfilled, (state, action) => {
            state.tweets.unshift(action.payload);
        });

        builder.addCase(editTweet.fulfilled, (state, action) => {
            const updatedTweet = action.payload;
            const index = state.tweets.findIndex((tweet) => tweet._id === updatedTweet._id);
            if (index !== -1) {
                state.tweets[index] = updatedTweet;
            }
        });

        builder.addCase(deleteTweet.fulfilled, (state, action) => {
            state.tweets = state.tweets.filter((tweet) => tweet._id !== action.payload);
        });

        builder.addCase(getAllTweets.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllTweets.fulfilled, (state, action) => {
            state.loading = false;
            state.tweets = action.payload;
        });

        builder.addCase(likeTweet.fulfilled, (state, action) => {
            const { tweetId, likesCount, isLiked } = action.payload;
            const tweet = state.tweets.find((t) => t._id === tweetId);
            if (tweet) {
                tweet.likesCount = likesCount;
                tweet.isLiked = isLiked;
            }
        });
    },
});

export default tweetSlice.reducer;
