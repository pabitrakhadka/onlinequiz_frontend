import Layout from '@/Components/Layout';
import { getPdfQuestions } from '@/functions/subjective';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';

const SubjectiveQuestion = () => {

    const [sets, setSets] = useState([]);
    const loadSubjectQuestionSet = async () => {
        try {
            const res = await getPdfQuestions("data=getCategoryId");
            if (res.status === 200) {
                console.log(res.data.data);
                setSets(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const items = Array.from({ length: 10 }, (_, index) => index + 1);
    const router = useRouter();
    const handleNavigation = (id) => {
        router.push({
            pathname: '/subjectiveQuestion/', // Target page
            query: {
                title: id,
            },
        });
    };

    useEffect(() => {

        loadSubjectQuestionSet();

    }, [])

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 p-8 lg:p-16">
                <h1 className="text-4xl font-bold text-blue-800 text-center mb-10">Subjective Questions</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {sets && sets.length > 0 ? <>
                        {sets.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleNavigation(item.id)}
                                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
                            >
                                <div className="image mb-4">
                                    <img src="./set.png" alt="Set Thumbnail" className="w-full h-32 object-cover rounded-md" />
                                </div>
                                <div className="heading">
                                    <h1 className="text-center text-2xl font-semibold text-gray-700">{item?.category?.categoryName}</h1>
                                </div>
                            </div>
                        ))}
                    </> : <></>}
                </div>
            </div>
        </Layout>
    );
};

export default SubjectiveQuestion;
