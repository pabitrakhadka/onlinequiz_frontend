import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // for the menu icon
import HoverDropdown from "./HoverDropdown";

const Header = () => {
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
                <ul className="flex flex-col md:flex-row md:justify-start space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                    <li
                        className="p-2 relative text-slate-900 hover:bg-slate-200"
                        onMouseEnter={() => setHoveredItem('home')}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <Link href="/">Home</Link>
                    </li>
                    <li className="p-2 relative text-slate-900 hover:bg-slate-200">
                        <Link href="/about">About Us</Link>
                    </li>
                    <li className="p-2 relative text-slate-900 hover:bg-slate-200">
                        <Link href="/contact">Contact</Link>
                    </li>
                    <li className="p-2 relative text-blue-700 hover:bg-blue-200">
                        <Link href="/Sets">Sets</Link>
                    </li>
                    <li className="p-2 relative text-slate-900 hover:bg-slate-200">
                        <Link href="/pastquestion">Past Question Paper</Link>
                    </li>
                    <li className="p-2 relative text-slate-900 hover:bg-slate-200">
                        <HoverDropdown onclick={() => handleCLickButton()} isMcq={"true"} isShow={isShow} label={" MCQ/Chapter Wise"} items={chapterWiseMcq} />
                        {/* <Link href="/notes">Mcq/Chapter Wise</Link> */}
                    </li>
                    <li className="p-2 relative text-slate-900 hover:bg-slate-200">
                        <Link href="/subjective_question">Subjective Question</Link>
                    </li>
                    <li className="p-2 relative text-slate-900 hover:bg-slate-200">
                        <HoverDropdown onclick={() => handleSubjective()} isShow={isOpernSubjective} label={" Subjective/Chapter Wise"} items={chapterWiseMcq} />
                        {/* <Link href="/notes">Mcq/Chapter Wise</Link> */}
                    </li>
                    <li className="p-2 relative text-slate-900 hover:bg-slate-200">
                        <Link href="/news">News/Blog</Link>
                    </li>
                    <li className="p-2 relative text-slate-900 hover:bg-slate-200">
                        <Link href="/login">Login</Link>
                    </li>
                    <li className="p-2 relative text-slate-900 hover:bg-slate-200">
                        <Link href="/logout">Logout</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
