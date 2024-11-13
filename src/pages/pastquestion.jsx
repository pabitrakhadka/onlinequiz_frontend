import Layout from '@/Components/Layout';
import { useRouter } from 'next/navigation';

import React from 'react';

const PastQuestion = () => {
    const questionSets = [1, 2, 3, 4, 5, 6, 7, 8]; // Example data for question 
    const router = useRouter();
    const clicked = (setNumber) => {
        console.log(`Set ${setNumber} clicked`);
        router.push(`/test_quiz/PastQuestion_set${setNumber}`);
    };


    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 p-8 lg:p-16">
                <h1 className="text-4xl font-bold text-blue-800 text-center mb-10">Past Question Sets</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {questionSets.map((set) => (
                        <div onClick={() => clicked(set)}
                            key={set}
                            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
                        >
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Set {set}</h2>
                                <p className="text-gray-600 mb-6">Multiple Choice Questions</p>
                                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                    Start Quiz
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default PastQuestion;
