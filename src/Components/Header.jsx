import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // for the menu icon
import HoverDropdown from "./HoverDropdown";
import ButtonComp from "./ButtonComp";
import CardCom from "./CardCom";
import UserIconLogo from "./UserIconLogo";
import { getCategories } from "@/functions/category";
import { useEffect } from "react";
import ProfileCard from "./User/ProfileCard";

const Header = () => {

    const [categoryData, setCategoryData] = useState([]);
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

    const LoadCategoryData = async () => {
        try {
            const res = await getCategories(`category=notset`);
            if (res.status === 200) {
                console.log(res.data.data);
                setCategoryData(res.data.data);
            } else {

            }

        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        LoadCategoryData();
    }, [])

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
            <div className={`    ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                <ul className="flex flex-col md:flex-row md:justify-start space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0 justify-center items-center">
                    <li
                        className="px-4 py-2 rounded-md hover:bg-blue-100"
                        onMouseEnter={() => setHoveredItem('home')}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <Link className="text-gray-800 hover:text-blue-600" href="/">Home</Link>
                    </li>
                    <li className="px-4 py-2 rounded-md hover:bg-blue-100">
                        <Link className="text-gray-800 hover:text-blue-600" href="/about">About Us</Link>
                    </li>
                    <li className="px-4 py-2 rounded-md hover:bg-blue-100">
                        <Link className="text-gray-800 hover:text-blue-600" href="/contact">Contact</Link>
                    </li>
                    <li className="  relative text-blue-700  ">
                        <Link className="text-gray-800 hover:text-blue-600" href="/Sets">Sets</Link>
                    </li>
                    <li className="  relative text-slate-900 ">
                        <Link className="text-gray-800 hover:text-blue-600" href="/pastquestion">Past Question Paper</Link>
                    </li>
                    <li className="  relative text-slate-900 ">
                        <HoverDropdown className="" onclick={() => handleCLickButton()} isMcq={"true"} isShow={isShow} label={" MCQ"} items={categoryData} />
                        {/* <Link class href="/notes">Mcq/Chapter Wise</Link> */}
                    </li>
                    <li className="  relative text-slate-900 ">
                        <Link className="text-gray-800 hover:text-blue-600" href="/subjective_question">Subjective Question</Link>
                    </li>
                    <li className="  relative text-slate-900 ">
                        <HoverDropdown className="" onclick={() => handleSubjective()} isShow={isOpernSubjective} label={" Subjective"} items={categoryData} />
                        {/* <Link class href="/notes">Mcq/Chapter Wise</Link> */}
                    </li>
                    <li className="px-4 py-2 rounded-md hover:bg-blue-100">
                        <Link className="text-gray-800 hover:text-blue-600" ass href="/news">News/Blog</Link>
                    </li>
                    <li className="px-4 py-2 rounded-md hover:bg-blue-100">
                        <Link className="text-gray-800 hover:text-blue-600" href="/login">Login</Link>
                    </li>
                    {/* <li className="px-4 py-2 rounded-md hover:bg-blue-100">
                        <Link className="text-gray-800 hover:text-blue-600" href="/logout">Logout</Link>
                    </li> */}
                    <li className="relative text-slate-900  ">

                    </li>
                    <div className="relative text-slate-900">
                        {/* Button */}
                        <ButtonComp onClick={togglePopover} name={"User Profile"} />

                        {showPopover ? <>
                            <div className=" ">

                                <ProfileCard />

                            </div>
                        </> : null}

                        {/* Popover */}

                    </div>
                </ul>
            </div>
        </header>
    );
};

export default Header;
