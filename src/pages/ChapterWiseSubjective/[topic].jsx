
import Layout from '@/Components/Layout';

import { getChapterWiseSubjectiveQuestion } from '@/functions/subjective';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Loders = dynamic(() => import('@/Components/Loders'), { ssr: false });

const topic = () => {

    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { topic } = router.query;
    const [questionData, setQuestiondata] = useState([]);

    useEffect(() => {
        if (topic) {

            loadSubectiveQuestion(topic);
        }
    }, [topic]);

    const loadSubectiveQuestion = async (topic) => {
        try {
            const res = await getChapterWiseSubjectiveQuestion(`category=${topic}`);
            if (res.status === 200) {
                console.log(res.data.data);
                setQuestiondata(res.data.data);
                setLoading(false)
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log("loadSubectiveQuestion error=", error);
        }
    }

    return (
        <Layout>
            <div className='min-h-screen bg-gray-50 p-4 lg:p-5'>
                <h1 className='text-4xl font-bold text-blue-800 text-center mb-8'>
                    {topic ? `Subjective Question for ${topic}` : 'Loading...'}
                </h1>
                {loading ? <>
                    <div>
                        <Loders />
                    </div>
                </> : <><div className='bg-custom-gray w-full max-w-5xl mx-auto p-6 rounded-lg shadow-lg'>
                    <h1 className='text-4xl font-bold text-gray-50 text-center'>Short Question</h1>
                    {questionData.length > 0 ? (
                        questionData.filter((question => question.category1 === "short"))
                            .map((question, index) => (
                                <div className='mb-6 flex' key={index}>
                                    <p className='text-custom-white text-2xl font-semibold leading-relaxed'>
                                        <span className='font-bold text-lg'>{index + 1}. </span>
                                        {question.question}
                                    </p>
                                    <span className='text-custom-white text-2xl font-semibold leading-relaxed ml-4'>5 marks</span>
                                </div>
                            ))
                    ) : (
                        <p className='text-custom-white text-center'>No questions available</p>
                    )}
                    <h1 className='text-4xl font-bold text-blue-800 text-center'>Long Question</h1>
                    {questionData.length > 0 ? (
                        questionData.filter((question => question.category1 === "long"))
                            .map((question, index) => (
                                <div className='mb-6 flex' key={index}>
                                    <p className='text-custom-white text-2xl font-semibold leading-relaxed'>
                                        <span className='font-bold text-lg'>{index + 1}. </span>
                                        {question.question}
                                    </p>
                                    <span className='text-custom-white text-2xl font-semibold leading-relaxed ml-4'>10 marks</span>
                                </div>
                            ))
                    ) : (
                        <p className='text-custom-white text-center'>No questions available</p>
                    )}
                </div></>}
            </div>

        </Layout>
    );
}

export default topic;