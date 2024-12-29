// import React from "react";
// import {Outlet} from "react-router-dom"
// import Navbar from  "./components/Header/Navbar.jsx"
// import Sidebar from "./components/Header/Sidebar.jsx";

// function Layout (){

//     return (
//              <>
//                   <Navbar />
//                       <div className="sm:flex flex-none">
//                       <div className="">
//                            <Sidebar />
//                       </div>
//                            <div className="sm:flex-1">
//                                <Outlet />
//                            </div>
//                      </div>
//              </>
//     )
// }

// export default Layout ;


import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Header/Navbar.jsx";
import Sidebar from "./components/Header/Sidebar.jsx";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Sidebar - visible on larger screens */}
        <div className="hidden sm:block sm:w-64">
          <Sidebar />
        </div>

        {/* Main content - takes remaining space */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
