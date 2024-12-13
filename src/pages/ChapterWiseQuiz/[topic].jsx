import ButtonComp from '@/Components/ButtonComp';
import Layout from '@/Components/Layout';
// import Loders from '@/Components/Loders';
import OptionComp from '@/Components/OptionComp';
import Question from '@/Components/Question';
import { getQuiz } from '@/functions/quiz';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Spinner from '@/Components/Spinner';
const Loders = dynamic(() => import('@/Components/Loders'), { ssr: false });
const Quiz = () => {
    const router = useRouter();
    const { topic } = router.query;
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const optionLabel = ['A).', 'B).', 'C).', 'D).'];
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 5;

    const [loading, setLoading] = useState(false);
    const changePage = () => {

    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        if (topic) {
            loadQuestion(currentPage);
        }
    }, [topic, currentPage]);

    const loadQuestion = async (page) => {
        try {
            const questions = await getQuiz(`page=${page}&limit=${pageSize}&category=${topic}`);
            if (questions.status === 200) {
                setQuestions(questions.data.data);
                setTotalPages(questions.data.totalPages)
                setLoading(true);
            }
        } catch (error) {
            console.log("Error fetching question", error);

        }
    };

    const handleOptionChange = (value, answer, questionIndex) => {
        const isCorrect = value === answer;
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [questionIndex]: { selected: value, isCorrect }
        }));
    };

    return (
        <Layout>
            <div className='min-h-screen bg-gray-50 p-4 lg:p-5'>
                <h1 className='text-4xl font-bold text-blue-800 text-center mb-2'>{topic ? `Quiz for ${topic}` : 'Loading...'}</h1>
                {loading ? <><div className=' max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-6  m-auto'>
                    <div>
                        {questions.map((question, questionIndex) => (
                            <div key={questionIndex}>
                                <Question question={`${questionIndex + 1}. ${question.question}`} />

                                {question.options.map((option, index) => {
                                    const selectedOption = selectedOptions[questionIndex];
                                    const isSelected = selectedOption?.selected === option.text;
                                    const isCorrect = isSelected && selectedOption?.isCorrect;

                                    return (
                                        <OptionComp
                                            key={index}
                                            keyProp={index}
                                            value={option.text}
                                            checked={isSelected}
                                            isCorrect={isCorrect}
                                            onChange={() => handleOptionChange(option.text, question.answer, questionIndex)}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div></> : <>
                    <div className='text-center'>

                        <Loders />
                    </div>
                </>}
                <Pagination currentPage={1} onPageChange={handlePageChange} totalPages={5} />

            </div>
        </Layout>
    );
};
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="pagination flex justify-center space-x-2 mt-4">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={page === currentPage}
                    className={`p-2 w-10 h-10 rounded-full text-white ${page === currentPage
                        ? 'bg-blue-600 cursor-default'
                        : 'bg-blue-500 hover:bg-blue-700'
                        } transition duration-200 ease-in-out ${page === currentPage ? 'opacity-75' : ''
                        }`}
                >
                    {page}
                </button>
            ))}
        </div>

    );
}
export default Quiz;
