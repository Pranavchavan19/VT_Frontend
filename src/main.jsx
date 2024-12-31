// import App from "./App.jsx";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from 'react-redux';
// import store from "./Store/store.js";

// ReactDOM.createRoot(document.getElementById("root")).render(
 
//     <Provider store={store}>
//         <BrowserRouter>
//             <App />
            
//         </BrowserRouter>
//     </Provider>
// );




// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import store, { persistor } from "./Store/store.js";
// import App from "./App.jsx";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//     <Provider store={store}>
//         <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
//             <BrowserRouter>
//                 <App />
//             </BrowserRouter>
//         </PersistGate>
//     </Provider>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./Store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);