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
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Store/store.js"; // Import your store and persistor
import App from "./App.jsx"; // Import your App component
import "./index.css"; // Import global styles (if any)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> {/* Provides the Redux store */}
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}> {/* Wait for persisted state */}
        <BrowserRouter> {/* Enables React Router for navigation */}
          <App /> {/* Your main App component */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

