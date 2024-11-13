import Layout from '@/Components/Layout'
import { useRouter } from 'next/navigation';
import React from 'react'

const Sets = () => {
    const router = useRouter();
    const items = Array.from({ length: 10 }, (_, index) => index + 1);
    const clicked = (setNumber) => {
        console.log(`Set ${setNumber} clicked`);
        router.push(`/test_quiz/Set ${setNumber}`);
    };

    return (
        <Layout>

            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sets</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {items.map((set) => (
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

        </Layout>
    )
}

export default Sets