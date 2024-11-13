// pages/[set].js
import ButtonComp from '@/Components/ButtonComp';
import Layout from '@/Components/Layout';
import { getQuestion, getQuestionSets, getQuiz } from '@/functions/adminapi/quiz';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Set = () => {
    const router = useRouter();


    const loadQuizQuestion = async (data) => {
        try {

            const res = await getQuestionSets(`category=set 2`);
            if (res.status === 200) {
                console.log(res.data);
                setQuestions(res.data);
            }
            else {
                console.log("error")
            }
        } catch (error) {
            console.log(error);
        }
    }
    const { set } = router.query; // Access the dynamic route parameter 'set'
    useEffect(() => {
        if (set) {
            loadQuizQuestion(set);

        }
    }, [set]);

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [userAnswers, setUserAnswers] = useState([]);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [score, setScore] = useState(100);
    const optionLabel = ['A).', 'B).', 'C).', 'D).'];


    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    const handleClick = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswer = currentQuestion.answer;

        if (selectedOption) {
            const isCorrect = selectedOption === correctAnswer;
            setUserAnswers((prevAnswers) => [
                ...prevAnswers,
                {
                    question: currentQuestion.question,
                    selected: selectedOption,
                    correct: correctAnswer,
                    isCorrect,
                },
            ]);

            if (!isCorrect) {
                setScore((prevScore) => prevScore - 20);
            }
        } else {
            setUserAnswers((prevAnswers) => [
                ...prevAnswers,
                {
                    question: currentQuestion.question,
                    selected: null,
                    correct: correctAnswer,
                    isCorrect: null,
                },
            ]);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption("");
        } else {
            setIsQuizComplete(true);
        }
    };

    if (questions.length === 0) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    if (isQuizComplete) {
        const totalQuestions = questions.length;
        const correctAnswers = userAnswers.filter((answer) => answer.isCorrect === true).length;
        const incorrectAnswers = userAnswers.filter((answer) => answer.isCorrect === false).length;
        const finalPercentage = (score / totalQuestions) * 100;

        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center bg-gray-50 p-8">
                    <h2 className="text-4xl font-bold text-blue-800 mb-6">Quiz Complete!</h2>
                    <p className="text-lg mb-4">Total Questions: {totalQuestions}</p>
                    <p className="text-lg mb-4">Correct Answers: {correctAnswers}</p>
                    <p className="text-lg mb-4">Incorrect Answers: {incorrectAnswers}</p>
                    <p className="text-lg mb-4">Your Score: {score} (Raw Score)</p>
                    <p className="text-xl font-semibold text-blue-600 mb-10">Final Score: {finalPercentage.toFixed(2)}%</p>

                    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 space-y-4">
                        {userAnswers.map((answer, index) => (
                            <div key={index} className="p-4 border-b border-gray-200">
                                <p className="font-semibold text-gray-800">Question {index + 1}: {answer.question}</p>
                                <div className="mt-2 space-y-2">
                                    {questions[index].options.map((option, optIndex) => (
                                        <div
                                            key={optIndex}
                                            className={`p-2 rounded-md ${option.text === answer.correct ? 'bg-green-100' : ''} ${option.text === answer.selected && option.text !== answer.correct ? 'bg-red-100' : ''}`}
                                        >
                                            {optionLabel[optIndex]} {option.text}
                                        </div>
                                    ))}
                                    {answer.selected === null && (
                                        <p className="text-gray-500">Unanswered</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Layout>
            <div className="min-h-screen flex flex-col items-center bg-gray-50 p-8">
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-6">
                    <div className="text-lg text-blue-800 font-semibold flex justify-between">
                        <p>Question {currentQuestionIndex + 1} / {questions.length}</p>
                        <p>Progress: {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</p>
                    </div>

                    <div className="text-2xl font-semibold text-gray-800">{currentQuestion.question}</div>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option, index) => (
                            <label key={index} className="block bg-gray-100 p-4 rounded-md cursor-pointer hover:bg-blue-100 transition">
                                <input
                                    type="radio"
                                    value={option.text}
                                    checked={selectedOption === option.text}
                                    onChange={() => handleOptionChange(option.text)}
                                    className="mr-2"
                                />
                                <span className="font-semibold">{optionLabel[index]}</span> {option.text}
                            </label>
                        ))}
                    </div>

                    <ButtonComp
                        onClick={handleClick}
                        name={currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
                    />
                </div>
            </div>
        </Layout>
    );
};


export default Set;
