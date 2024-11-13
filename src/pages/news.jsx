import Layout from '@/Components/Layout';
import React from 'react';

const news = () => {
    const articles = [
        {
            title: "Latest in Tech",
            excerpt: "Discover the latest trends in technology, from AI advancements to new gadgets.",
            date: "November 5, 2024",
            image: "/tech.jpg",
        },
        {
            title: "Health and Wellness",
            excerpt: "Learn about the best practices for maintaining a healthy lifestyle.",
            date: "October 29, 2024",
            image: "/health.jpg",
        },
        {
            title: "Travel Tips for 2024",
            excerpt: "Your guide to safe and exciting travel experiences this year.",
            date: "October 15, 2024",
            image: "/travel.jpg",
        },
    ];

    return (

        <Layout>
            <div className="bg-gray-100 min-h-screen p-6">
                {/* Hero Section */}
                <div className="bg-blue-600 text-white rounded-lg p-8 text-center mb-10 shadow-lg">
                    <h1 className="text-4xl font-bold mb-4">Latest News & Updates</h1>
                    <p className="text-lg">Stay updated with the latest news, tips, and stories from around the world.</p>
                </div>

                {/* Articles Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {articles.map((article, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{article.title}</h2>
                                <p className="text-gray-600 text-sm mb-4">{article.date}</p>
                                <p className="text-gray-700 mb-4">{article.excerpt}</p>
                                <button className="text-blue-600 font-semibold hover:underline">Read More →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default news;
