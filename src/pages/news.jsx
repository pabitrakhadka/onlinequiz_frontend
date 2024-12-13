import ButtonComp from '@/Components/ButtonComp';
import Layout from '@/Components/Layout';

import { getNews } from '@/functions/news';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Loders = dynamic(() => import('@/Components/Loders'), { ssr: false })
const news = () => {
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const [articles, setarticles] = useState([]);
    useEffect(() => {

        loadNews();

    }, [])

    const loadNews = async () => {
        try {
            const res = await getNews("");
            if (res.status === 200) {
                setarticles(res.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleButtonClick = (id) => {
        router.push(`/Views/${id}`);
    }
    return (

        <Layout>
            <div className="bg-gray-100 min-h-screen p-6">
                {/* Hero Section */}
                <div className="bg-blue-600 text-white rounded-lg p-8 text-center mb-10 shadow-lg">
                    <h1 className="text-4xl font-bold mb-4">Latest News & Updates</h1>
                    <p className="text-lg">Stay updated with the latest news, tips, and stories from around the world.</p>
                </div>

                {loading ? <>
                    <Loders />
                </> : <>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {articles.map((article, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}/upload/images/${article.image}`} alt={""} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{article.heading}</h2>
                                    <p className="text-gray-600 text-sm mb-4">{article.date}</p>
                                    <p className="text-gray-700 mb-4">
                                        {article.description.split(" ").slice(0, 10).join(" ")}...
                                    </p>
                                    <ButtonComp onClick={() => handleButtonClick(article.id)} name='Read More →' className="text-blue-600 font-semibold hover:underline"></ButtonComp>
                                </div>
                            </div>
                        ))}
                    </div></>}

            </div>
        </Layout>
    );
};

export default news;
