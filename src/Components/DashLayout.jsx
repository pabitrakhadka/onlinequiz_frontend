import React from "react";
import Link from "next/link";
import Toast from "./Toast";
import { Book, Home, MessageCircle } from 'iconsax-react';
import { FaFilePdf, FaNewspaper } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";

const DashLayout = ({ children }) => {

    const dashMenu = [
        { name: "Home", to: "/admin/Dash", icon: <Home size="24" /> },
        { name: "Quiz", to: "/admin/quiz", icon: <Book size="24" /> },
        { name: "Sets", to: "/admin/sets", icon: <Book size="24" /> },
        { name: "News", to: "/admin/news", icon: <FaNewspaper size="24" /> },
        { name: "Subjective", to: "/admin/subjective", icon: <FiFileText size="24" /> },
        { name: "Subjective PDF", to: "/admin/sebjectivepdf", icon: <FaFilePdf size="24" /> },
        { name: "Messages", to: "/admin/message", icon: <MessageCircle size="24" /> },
        { name: "User Score", to: "/admin/userScrore", icon: <MessageCircle size="24" /> },
        { name: "Category", to: "/admin/category", icon: <MessageCircle size="24" /> },
        { name: "Logout", to: "/admin/category", icon: <MessageCircle size="24" /> },


    ];
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Toast />
            {/* Left Sidebar */}
            <aside className="w-64 bg-blue-800 text-white hidden md:flex flex-col p-4 min-h-screen">
                <h2 className="text-2xl font-bold mb-6 border-b border-blue-700 pb-2">Dashboard</h2>
                <ul className="space-y-4">
                    {dashMenu.map((menu, index) => (
                        <li key={index}>
                            <Link
                                href={menu.to}
                                className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded transition duration-300 ease-in-out"
                            >
                                {menu.icon && <span className="text-xl">{menu.icon}</span>}
                                <span>{menu.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>


            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-blue-700 text-white p-4 md:hidden">
                    <h2 className="text-xl font-bold">Dashboard</h2>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-4 bg-gray-100">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-gray-200 text-gray-700 p-4 text-center">
                    © 2023 Your Company
                </footer>
            </div>
        </div>
    );
};

export default DashLayout;
