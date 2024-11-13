import React from "react";
import Link from "next/link";
const DashLayout = ({ children }) => {

    const dashMenu = [
        { name: "Home", to: "/admin/Dash" },
        { name: "Quiz", to: "/admin/quiz" },
        { name: "News", to: "/admin/news" },


        { name: "Profile", to: "/admin/profile" },
        { name: "Home", to: "/admin/Dash" },
        { name: "Home", to: "/admin/Dash" },
        { name: "Home", to: "/admin/Dash" },

    ]
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Left Sidebar */}
            <aside className="w-64 bg-blue-800 text-white hidden md:flex flex-col p-4">
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <ul className="space-y-4">
                    {dashMenu.map((menu, index) => (
                        <li key={index}><Link href={menu.to} className="hover:bg-blue-700 p-2 rounded">{menu.name}</Link></li>
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
