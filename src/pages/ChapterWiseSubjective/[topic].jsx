
import Layout from '@/Components/Layout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
const topic = () => {

    const router = useRouter();
    const { topic } = router.query;

    useEffect(() => {
        if (topic) {
            console.log("topic =", topic);
        }
    }, [topic]);

    return (
        <Layout>
            <div className='min-h-screen bg-gray-50 p-4 lg:p-5'>
                <h1 className='text-4xl font-bold text-blue-800 text-center mb-2'>{topic ? `Subjective Question for ${topic}` : 'Loading...'}</h1>
            </div>
        </Layout>
    );
}

export default topic;