// import { configureStore } from "@reduxjs/toolkit";
// import authSliceReducer from "./Slices/authSlice.js"
// import userSliceReducer from "./Slices/userSlice.js";
// import videoSliceReducer from "./Slices/videoSlice.js"
// import subscriptionSlice from "./Slices/subscriptionSlice.js"
// import likeSlice from "./Slices/likeSlice.js"
// import tweetSlice from "./Slices/tweetSlice.js"
// import commentSlice from "./Slices/commentSlice.js"
// import dashboardSlice from "./Slices/dashboard.js"
// import playlistSlice from "./Slices/playlistSlice.js"

// const store  = configureStore({
//     reducer: {
//         auth: authSliceReducer,
//         user: userSliceReducer,
//         video: videoSliceReducer,
//         subscription: subscriptionSlice,
//         like: likeSlice,
//         tweet: tweetSlice,
//         comment: commentSlice,
//         dashboard: dashboardSlice,
//         playlist: playlistSlice
//     }
// });
// export default store;





import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Use localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
// import authReducer from './slices/authSlice';

// Import your slices
import authSliceReducer from "./Slices/authSlice.js";
import userSliceReducer from "./Slices/userSlice.js";
import videoSliceReducer from "./Slices/videoSlice.js";
import subscriptionSlice from "./Slices/subscriptionSlice.js";
import likeSlice from "./Slices/likeSlice.js";
import tweetSlice from "./Slices/tweetSlice.js";
import commentSlice from "./Slices/commentSlice.js";
import dashboardSlice from "./Slices/dashboard.js";
import playlistSlice from "./Slices/playlistSlice.js";

// Combine reducers
const rootReducer = combineReducers({
    auth: authSliceReducer,
    user: userSliceReducer,
    video: videoSliceReducer,
    subscription: subscriptionSlice,
    like: likeSlice,
    tweet: tweetSlice,
    comment: commentSlice,
    dashboard: dashboardSlice,
    playlist: playlistSlice,
});

// Create persist config
const persistConfig = {
    key: "root",
    storage,
};

// Apply persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    // reducer: {
    //     auth: authReducer,
    // },
});

export const persistor = persistStore(store);
export default store;
