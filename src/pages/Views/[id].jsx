import Layout from '@/Components/Layout';
import Loders from '@/Components/Loders';

import { getNews } from '@/functions/news';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const NewsDetail = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    const [newsData, setNewsData] = useState(null); // Initialize state as null to handle loading state

    useEffect(() => {
        if (id) {
            loadNews(id);
        }
    }, [id]);

    const loadNews = async (id) => {
        try {
            const params = `?id=${id}`;
            const res = await getNews(params);
            if (res.status === 200) {
                setNewsData(res.data);
                setLoading(false)
            }
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen p-5">
                {loading ? <>
                    <Loders />
                </> : <>
                    {newsData ? (
                        <>
                            <div>
                                <img
                                    className="object-fill h-40 w-40"
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/upload/images/${newsData.image}`}
                                    alt={newsData.title || "News Image"}
                                />
                            </div>
                            <h1 className="text-xl font-bold p-2">{newsData.heading}</h1>
                            <p className="text-gray-700 mb-4">{newsData.description}</p>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </>}
            </div>
        </Layout>
    );
};

export default NewsDetail;
