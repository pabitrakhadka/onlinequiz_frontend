import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // for the menu icon
import HoverDropdown from "./HoverDropdown";
import ButtonComp from "./ButtonComp";

const Header = () => {
    const [showPopover, setShowPopover] = useState(false);

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [isShow, isClose] = useState(!true);

    const handleCLickButton = () => {
        isClose(pre => !pre)
        console.log("value=", isShow);
    }
    const [isOpernSubjective, isCloseSubjective] = useState(!true);
    const handleSubjective = () => {
        isCloseSubjective(pre => !pre);
        console.log(isOpernSubjective);
    }
    const chapterWiseMcq = [
        {
            main: "Computer Fundamentals",
        },
        {
            main: "Operating System",
        },
        {
            main: "Word Processing",
        },
        {
            main: "Electronic Spreadsheet",
        },
        {
            main: "Database System",
        },
        {
            main: "Presentation System",
        },
        {
            main: "Web Designing and Social Media",
        },
        {
            main: "Computer Network",
        },
        {
            main: "Cyber Security",
        },
        {
            main: "Hardware Maintenance and Troubleshooting",
        },
        {
            main: "Relevant Legislations and Institutions",
        }
    ];


    return (
        <header className="flex items-center justify-between p-4 shadow bg-slate-100">
            <div className="flex items-center">
                <div className="logo">
                    <Link href="/">
                        <img src="./logo.png" height={50} width={50} alt="Logo" />
                    </Link>
                </div>
            </div>

            {/* Menu button for mobile view */}
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-slate-900 focus:outline-none">
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Navigation links */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                <ul className="flex flex-col md:flex-row md:justify-start space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0 justify-center items-center">
                    <li
                        className=" relative text-slate-900 "
                        onMouseEnter={() => setHoveredItem('home')}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <Link className="hover:bg-slate-200 p-2" href="/">Home</Link>
                    </li>
                    <li className="relative text-slate-900 ">
                        <Link className="hover:bg-slate-200 p-2" href="/about">About Us</Link>
                    </li>
                    <li className="  relative text-slate-900  ">
                        <Link className="hover:bg-slate-200 p-2" href="/contact">Contact</Link>
                    </li>
                    <li className="  relative text-blue-700  ">
                        <Link className="hover:bg-slate-200 p-2" href="/Sets">Sets</Link>
                    </li>
                    <li className="  relative text-slate-900 ">
                        <Link className="hover:bg-slate-200 p-2" href="/pastquestion">Past Question Paper</Link>
                    </li>
                    <li className="  relative text-slate-900 ">
                        <HoverDropdown onclick={() => handleCLickButton()} isMcq={"true"} isShow={isShow} label={" MCQ/Chapter Wise"} items={chapterWiseMcq} />
                        {/* <Link class href="/notes">Mcq/Chapter Wise</Link> */}
                    </li>
                    <li className="  relative text-slate-900 ">
                        <Link className="hover:bg-slate-200 p-2" href="/subjective_question">Subjective Question</Link>
                    </li>
                    <li className="  relative text-slate-900 ">
                        <HoverDropdown onclick={() => handleSubjective()} isShow={isOpernSubjective} label={" Subjective/Chapter Wise"} items={chapterWiseMcq} />
                        {/* <Link class href="/notes">Mcq/Chapter Wise</Link> */}
                    </li>
                    <li className="  relative text-slate-900  ">
                        <Link clclassName="hover:bg-slate-200 p-2" ass href="/news">News/Blog</Link>
                    </li>
                    <li className="  relative text-slate-900  ">
                        <Link className="hover:bg-slate-200 p-2" href="/login">Login</Link>
                    </li>
                    {/* <li className="  relative text-slate-900  ">
                        <Link className="hover:bg-slate-200 p-2" href="/logout">Logout</Link>
                    </li> */}
                    <li className="  relative text-slate-900  ">

                    </li>
                    <div className="relative text-slate-900">
                        {/* Button */}
                        <button
                            type="button"
                            onClick={togglePopover}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            User profile
                        </button>

                        {/* Popover */}
                        {showPopover && (
                            <div
                                id="popover-user-profile"
                                role="tooltip"
                                className="absolute z-10   text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
                                style={{ top: "3rem" }} // Adjust position if needed
                            >
                                <div className="p-3">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-2">
                                        <a href="#">
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src="/docs/images/people/profile-picture-1.jpg"
                                                alt="Jese Leos"
                                            />
                                        </a>
                                        <button
                                            type="button"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        >
                                            Follow
                                        </button>
                                    </div>

                                    {/* User Info */}
                                    <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                                        <a href="#">Jese Leos</a>
                                    </p>
                                    <p className="mb-3 text-sm font-normal">
                                        <a href="#" className="hover:underline">@jeseleos</a>
                                    </p>
                                    <p className="mb-4 text-sm">
                                        Open-source contributor. Building{" "}
                                        <a
                                            href="#"
                                            className="text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            flowbite.com
                                        </a>
                                        .
                                    </p>

                                    {/* Stats */}
                                    <ul className="flex text-sm">
                                        <li className="me-2">
                                            <a href="#" className="hover:underline">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    799
                                                </span>
                                                <span> Following</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="hover:underline">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    3,758
                                                </span>
                                                <span> Followers</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Arrow */}
                                <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-t border-l dark:bg-gray-800 dark:border-gray-600 rotate-45"></div>
                            </div>
                        )}
                    </div>
                </ul>
            </div>
        </header>
    );
};

export default Header;
