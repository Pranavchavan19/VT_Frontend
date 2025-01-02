// import React, { useState } from "react";
// import { Search, Button, Logo, SearchForSmallScreen } from "../index.js";
// import { Link } from "react-router-dom";
// import {
//     IoCloseCircleOutline,
//     BiLike,
//     CiSearch,
//     HiOutlineVideoCamera,
//     SlMenu,
// } from "../icons.js";
// import { useSelector, useDispatch } from "react-redux";
// import { NavLink, useNavigate } from "react-router-dom";
// import { IoMdLogOut } from "react-icons/io";
// import { userLogout } from "../../Store/Slices/authSlice.js";
// import {IoMdSettings} from "react-icons/io"
// const goToSettingPage = () => {
//     navigate("/settings");  // Navigate to the settings page
// };


// function Navbar() {
//     const [toggleMenu, setToggleMenu] = useState(false);
//     const [openSearch, setOpenSearch] = useState(false);
//     const authStatus = useSelector((state) => state.auth.status);
//     const username = useSelector((state) => state.auth?.userData?.username);
//     const profileImg = useSelector((state) => state.auth.userData?.avatar.url);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [clicked, setClicked] = useState(false);

//     const logout = async () => {
//         await dispatch(userLogout());
//         navigate("/");
//     };
//     const profileloginToCurrentUser = () => {
        
//         navigate("/Mycontent");  // Navigate to the settings page
//         setClicked(true);
       
//     };

//     const sidePanelItems = [
//         {
//             icon: <BiLike size={25} />,
//             title: "Liked Videos",
//             url: "/liked-videos",
//         },
//         {
//             icon: <HiOutlineVideoCamera size={25} />,
//             title: "My Content",
//             url: `/channel/${username}`,
//         },
//     ];

//     return (
//         <>
//             <nav className="w-full bg-[#0E0F0F] flex justify-between items-center p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50">
//                 <div className="flex items-center justify-center gap-2 cursor-pointer">
//                     <Logo />
//                 </div>

//                 {/* search for large screens */}
//                 <div className="w-full sm:w-1/3 hidden sm:block">
//                     <Search />
//                 </div>

//                 {/* search for small screens */}
//                 <div className="text-white w-full inline-flex justify-end sm:hidden pr-4">
//                     <CiSearch
//                         size={30}
//                         fontWeight={"bold"}
//                         onClick={() => setOpenSearch((prev) => !prev)}
//                     />
//                     {openSearch && (
//                         <SearchForSmallScreen
//                             open={openSearch}
//                             setOpenSearch={setOpenSearch}
//                         />
//                     )}
//                 </div>

//                 {/* login and signup butons for larger screens */}
//                 {authStatus ? (
//                     <div className="rounded-full sm:block hidden">
//                         <img
//                             src={profileImg }
//                             onClick={profileloginToCurrentUser} 
//                             alt="profileImg"
//                             // className="rounded-full w-10 h-10 object-cover cursor-pointer"
//                             className={`rounded-full w-10 h-10 object-cover cursor-pointer ${clicked ? 'hover:opacity-80' : ''}`} 
//                         />
//                     </div>
//                 ) : (
//                     <div className="space-x-2 sm:block hidden">
//                         <Link to={"/login"}>
//                             <Button className="bg-[#222222] border hover:bg-black border-slate-500 sm:px-4 sm:py-2 p-2">
//                                 Login
//                             </Button>
//                         </Link>
//                         <Link to={"/signup"}>
//                             <Button className="font-semibold border hover:bg-[#222222] border-slate-500 sm:px-4 sm:py-2 ">
//                                 Sign up
//                             </Button>
//                         </Link>
//                     </div>
//                 )}

//                 {/* hamburger for smaller screens */}
//                 <div className="sm:hidden block">
//                     <div className="text-white ">
//                         <SlMenu
//                             size={24}
//                             onClick={() => setToggleMenu((prev) => !prev)}
//                         />
//                     </div>
//                 </div>

//                 {/* Side bar for smaller screens */}
//                 {toggleMenu && (
//                     <div className="fixed right-0 top-0 text-white flex flex-col border-l h-screen w-[70%] bg-[#0F0F0F] sm:hidden rounded-lg outline-none">
//                         <div className="w-full border-b h-20 flex items-center mb-2 justify-between px-3">
//                             <div className="flex items-center gap-2">
//                                 <Logo />
//                             </div>
//                             <IoCloseCircleOutline
//                                 size={35}
//                                 onClick={() => setToggleMenu((prev) => !prev)}
//                             />
//                         </div>

//                         <div className="flex flex-col justify-between h-full py-5 px-3 j">
//                             <div className="flex flex-col gap-5">
//                                 {sidePanelItems.map((item) => (
//                                     <NavLink
//                                         to={item.url}
//                                         key={item.title}
//                                         onClick={() =>
//                                             setToggleMenu((prev) => !prev)
//                                         }
//                                         className={({ isActive }) =>
//                                             isActive ? "bg-purple-500" : ""
//                                         }
//                                     >
//                                         <div className="flex items-center border border-slate-500 gap-5 px-3 py-1 hover:bg-purple-500">
//                                             <div>{item.icon}</div>
//                                             <span className="text-lg">
//                                                 {item.title}
//                                             </span>
//                                         </div>
//                                     </NavLink>
//                                 ))}
//                             </div>

//                             {!authStatus ? ( <>
//                                 <div className="flex flex-col space-y-5 mb-3">
//                                     <Link to={"/login"}>
//                                         <Button className="w-full bg-[#222222] border hover:bg-white hover:text-black border-slate-500 py-1 px-3">
//                                             Login
//                                         </Button>
//                                     </Link>
//                                     <Link to={"/signup"}>
//                                         <Button className=" w-full font-semibold border border-slate-500 hover:bg-white hover:text-black py-1 px-3">
//                                             Sign up
//                                         </Button>
//                                     </Link>
//                                     <Link to={"/settings"}>
//                                         <Button className=" w-full font-semibold border border-slate-500 hover:bg-white hover:text-black py-1 px-3">
//                                             Setting
//                                         </Button>
//                                     </Link>
                                    
//                                 </div>
                                
//                                 </>
//                             ) : (
//                                 <>
                               
//                                     <div className="flex flex-col gap-2 pb-4">
//                                     <div
//                                        className="flex gap-2 justify-start items-start cursor-pointer py-1 px-2 border border-slate-600"
//                                         onClick={() => logout()}
//                                         >
//                                         <IoMdLogOut size={25} />
//                                          <span className="text-base">Logout</span>
//                                      </div>

//                                      <div
//                                        className="flex gap-2 justify-start items-start cursor-pointer py-1 px-2 border border-slate-600"
//                                         >
//                                             <IoMdSettings size={25} />
                                        
//                                          <span className="text-base">
//                                          <Link to={"/settings"}>
//                                         <Button  >
//                                             Setting
//                                         </Button>
//                                          </Link>
//                                          </span>
//                                      </div>
//                                     </div>
//                                 </>
                                
                                
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </nav>
//         </>
//     );
// }

// export default Navbar;
















import React, { useState } from "react";
import { Search, Button, Logo, SearchForSmallScreen } from "../index.js";
import { Link } from "react-router-dom";
import {
    IoCloseCircleOutline,
    BiLike,
    CiSearch,
    HiOutlineVideoCamera,
    SlMenu,
    IoFolderOutline,
    RiHome6Line,
    TbUserCheck,
    BiHistory,
    FaTwitter
    
} from "../icons.js";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { userLogout } from "../../Store/Slices/authSlice.js";
import { IoMdSettings } from "react-icons/io";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const username = useSelector((state) => state.auth?.userData?.username);
    const profileImg = useSelector((state) => state.auth.userData?.avatar?.url);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);

    const logout = async () => {
        await dispatch(userLogout());
        navigate("/");
    };

    const profileloginToCurrentUser = () => {
        if (!username) {
            console.error("Username is undefined");
            return; // Exit early if username is undefined
        }
        navigate(`/channel/${username}`); // Navigate to the user's channel page
        setClicked(true);
    };

    const sidePanelItems = [
        {
            icon: <RiHome6Line size={25} />,
            title: "Home",
            url: "/",
        },
        {
            icon: <HiOutlineVideoCamera size={25} />,
            title: "My Content",
            url: `/channel/${username}`,
        },
        {
            icon: <BiLike size={25} />,
            title: "Liked Videos",
            url: "/liked-videos",
        },

        {
            icon: <BiHistory size={25} />,
            title: "History",
            url: "/history",
        },
        {
            icon: <IoFolderOutline size={25} />,
            title: "Collections",
            url: "/collections",
        },
        {
            icon: <TbUserCheck size={25} />,
            title: "Subscriptions",
            url: "/subscriptions",
        },
        {
            icon: <IoMdSettings size={25} />,
            title: "Settings",
            url: `/settings`,
        },
        {
            icon: <FaTwitter size={25} />,
            title: "Tweet",
            url: "/tweets",
        },
    ];

    return (
        <nav className="w-full bg-[#0E0F0F] flex justify-between items-center p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50">
            <div className="flex items-center justify-center gap-2 cursor-pointer">
                <Logo />
            </div>

            {/* search for large screens */}
            <div className="w-full sm:w-1/3 hidden sm:block">
                <Search />
            </div>

            {/* search for small screens */}
            <div className="text-white w-full inline-flex justify-end sm:hidden pr-4">
                <CiSearch
                    size={30}
                    fontWeight={"bold"}
                    onClick={() => setOpenSearch((prev) => !prev)}
                />
                {openSearch && (
                    <SearchForSmallScreen
                        open={openSearch}
                        setOpenSearch={setOpenSearch}
                    />
                )}
            </div>

            {/* login and signup buttons for larger screens */}
            {authStatus ? (
                <div className="rounded-full sm:block hidden">
                    <img
                        src={profileImg}
                        onClick={profileloginToCurrentUser}
                        alt="profileImg"
                        className={`rounded-full w-10 h-10 object-cover cursor-pointer ${clicked ? 'hover:opacity-80' : ''}`}
                    />
                </div>
            ) : (
                <div className="space-x-2 sm:block hidden">
                    <Link to={"/login"}>
                        <Button className="bg-[#222222] border hover:bg-black border-slate-500 sm:px-4 sm:py-2 p-2">
                            Login
                        </Button>
                    </Link>
                    <Link to={"/signup"}>
                        <Button className="font-semibold border hover:bg-[#222222] border-slate-500 sm:px-4 sm:py-2 ">
                            Sign up
                        </Button>
                    </Link>
                </div>
            )}

            {/* hamburger for smaller screens */}
            <div className="sm:hidden block">
                <div className="text-white ">
                    <SlMenu
                        size={24}
                        onClick={() => setToggleMenu((prev) => !prev)}
                    />
                </div>
            </div>

            {/* Side bar for smaller screens */}
            {toggleMenu && (
                <div className="fixed right-0 top-0 text-white flex flex-col border-l h-screen w-[70%] bg-[#0F0F0F] sm:hidden rounded-lg outline-none">
                    <div className="w-full border-b h-20 flex items-center mb-2 justify-between px-3">
                        <div className="flex items-center gap-2">
                            <Logo />
                        </div>
                        <IoCloseCircleOutline
                            size={35}
                            onClick={() => setToggleMenu((prev) => !prev)}
                        />
                    </div>

                    <div className="flex flex-col justify-between h-full py-5 px-3 j">
                        <div className="flex flex-col gap-5">
                            {sidePanelItems.map((item) => (
                                <NavLink
                                    to={item.url}
                                    key={item.title}
                                    onClick={() =>
                                        setToggleMenu((prev) => !prev)
                                    }
                                    className={({ isActive }) =>
                                        isActive ? "bg-purple-500" : ""
                                    }
                                >
                                    <div className="flex items-center border border-slate-500 gap-5 px-3 py-1 hover:bg-purple-500">
                                        <div>{item.icon}</div>
                                        <span className="text-lg">
                                            {item.title}
                                        </span>
                                    </div>
                                </NavLink>
                            ))}
                        </div>

                        {!authStatus ? (
                            <>
                                <div className="flex flex-col space-y-5 mb-3">
                                    <Link to={"/login"}>
                                        <Button className="w-full bg-[#222222] border hover:bg-white hover:text-black border-slate-500 py-1 px-3">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to={"/signup"}>
                                        <Button className=" w-full font-semibold border border-slate-500 hover:bg-white hover:text-black py-1 px-3">
                                            Sign up
                                        </Button>
                                    </Link>
                                    {/* <Link to={"/settings"}>
                                        <Button className=" w-full font-semibold border border-slate-500 hover:bg-white hover:text-black py-1 px-3">
                                            Setting
                                        </Button>
                                    </Link> */}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col gap-2 pb-4">
                                    <div
                                        className="flex gap-2 justify-start items-start cursor-pointer py-1 px-2 border border-slate-600"
                                        onClick={() => logout()}
                                    >
                                        <IoMdLogOut size={25} />
                                        <span className="text-base">Logout</span>
                                    </div>

                                    {/* <div
                                        className="flex gap-2 justify-start items-start cursor-pointer py-1 px-2 border border-slate-600"
                                    >
                                        <IoMdSettings size={25} />
                                        <span className="text-base">
                                            <Link to={"/settings"}>
                                                <Button>
                                                    Setting
                                                </Button>
                                            </Link>
                                        </span>
                                    </div> */}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
