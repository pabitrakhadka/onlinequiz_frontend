import ButtonComp from '@/Components/ButtonComp';
import Layout from '@/Components/Layout';
import OptionComp from '@/Components/OptionComp';
import Question from '@/Components/Question';
import { getQuiz } from '@/functions/quiz';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Quiz = () => {
    const router = useRouter();
    const { topic } = router.query;
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const optionLabel = ['A).', 'B).', 'C).', 'D).'];

    useEffect(() => {
        if (topic) {
            loadQuestion();
        }
    }, [topic]);

    const loadQuestion = async () => {
        try {
            const questions = await getQuiz(`category=${topic}`);
            if (questions.status === 200) {
                setQuestions(questions.data.data);
            }
        } catch (error) {
            console.log(error);
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
                <div className=' max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-6  m-auto'>
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
                </div>
                <div className='flex justify-around'>
                    <ButtonComp name='Previous' />
                    <ButtonComp name='Next' />

                </div>
            </div>
        </Layout>
    );
};

export default Quiz;
