import ButtonComp from '@/Components/ButtonComp';
import Layout from '@/Components/Layout';
import TimerQuestion from '@/Components/User/TimerQuestion';
import { getQuiz } from '@/functions/quiz';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Set = () => {
    const router = useRouter();
    const { set } = router.query;

    const [fatechedQuestin, setFetchedQuestion] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [allQuestions, setAllQuestions] = useState([]);  // Total question data (not visible)
    const [visibleQuestions, setVisibleQuestions] = useState([]); // Questions to be displayed
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const questionBatchSize = 10;
    const loadThreshold = 8; // Load more questions when reaching this index in the current batch
    const questionDuration = 54; // seconds

    const optionLabel = ['A).', 'B).', 'C).', 'D).'];

    const [fetchedQuestions, setFetchedQuestions] = useState([]);

    const loadQuizQuestions = async (setId, offset = 0, limit = questionBatchSize) => {


        try {
            // Prepare the list of previously fetched quiz IDs
            const previousFetchedIds = fetchedQuestions.map(q => q.id); // Assuming `id` is the quiz identifier

            const query = `categoryId=${setId}&offset=${offset}&limit=${limit}&previousFetchedIds=${previousFetchedIds.join(",")}`;

            const res = await getQuiz(query);

            console.log('Fetching questions from offset:', offset); // Debug log

            if (res.status === 200) {
                console.log('Fetched questions:', res.data); // Debug log

                // Update state with new quiz questions
                const newFetchedQuestions = res.data.data;

                // Update the list of all fetched questions by appending new ones
                setFetchedQuestions(prevState => [
                    ...prevState,
                    ...newFetchedQuestions
                ]);

                // Track the total number of questions
                setAllQuestions(res.data.totalQuestion); // Store total questions for tracking

                return newFetchedQuestions; // Return visible questions for the current batch
            } else {
                console.error('Error fetching quiz data:', res);
                return [];
            }
        } catch (error) {
            console.error('Error loading questions:', error);
            return [];
        }
    };





    const loadMoreQuestions = async () => {
        const offset = visibleQuestions.length;

        // Prevent loading more questions if already loading
        if (isLoadingMore) return;

        setIsLoadingMore(true); // Start loading state

        const additionalQuestions = await loadQuizQuestions(set, offset);

        // Check if new questions are fetched
        if (additionalQuestions && additionalQuestions.length > 0) {
            setVisibleQuestions((prev) => [...prev, ...additionalQuestions]);

        } else {
            console.log('No more questions to load');
        }

        setIsLoadingMore(false); // End loading state
    };


    useEffect(() => {
        loadInitialQuestions();
    }, [set]);

    const loadInitialQuestions = async () => {
        if (set) {
            const initialQuestions = await loadQuizQuestions(set);

            if (initialQuestions && initialQuestions.length > 0) {
                setAllQuestions(initialQuestions);  // Store total questions
                setVisibleQuestions(initialQuestions.slice(0, questionBatchSize)); // Load initial batch of questions
            } else {
                setVisibleQuestions([]);
            }
        }
    };

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    const handleNextQuestion = async () => {
        const currentQuestion = visibleQuestions[currentQuestionIndex];
        const correctAnswer = currentQuestion.answer;

        // Save user answer
        setUserAnswers((prevAnswers) => [
            ...prevAnswers,
            {
                question: currentQuestion.id,
                ques: currentQuestion,
                selected: selectedOption,
                correct: correctAnswer,
                isCorrect: selectedOption === correctAnswer,
                timeSpent: elapsedTime,
            },
        ]);

        setSelectedOption('');
        setElapsedTime(0);

        // Check if the quiz is complete
        if (currentQuestionIndex === visibleQuestions.length - 1) {
            setIsQuizComplete(true);
            return;
        }

        // If nearing the end of the current batch of questions, load more if available
        if (currentQuestionIndex >= visibleQuestions.length - loadThreshold) {
            await loadMoreQuestions(); // Load more questions when threshold is reached
        }

        // Move to the next question
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    if (visibleQuestions.length === 0) {
        return <div className="text-center mt-10 text-lg">Loading questions...</div>;
    }

    const currentQuestion = visibleQuestions[currentQuestionIndex];

    if (isQuizComplete) {
        const totalQuestions = allQuestions.length;
        const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length;
        const incorrectAnswers = userAnswers.length - correctAnswers;
        const timeTaken = userAnswers.reduce((total, answer) => total + answer.timeSpent, 0);
        const incorrectPenalty = incorrectAnswers * 0.4;
        const baseScore = correctAnswers * 2 - incorrectPenalty;
        const timeEfficiency = (45 * 60) / timeTaken;
        const bonusPercent = (timeEfficiency - 1) * 10;
        const bonusMarks = (baseScore * bonusPercent) / 100;
        const finalScore = parseFloat((baseScore + bonusMarks).toFixed(2));

        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center bg-gray-50 p-8">
                    <h2 className="text-4xl font-bold text-blue-800 mb-6">Quiz Complete!</h2>
                    <p className="text-lg mb-4">Total Questions: {totalQuestions}</p>
                    <p className="text-lg mb-4">Correct Answers: {correctAnswers}</p>
                    <p className="text-lg mb-4">Incorrect Answers: {incorrectAnswers}</p>
                    <p className="text-lg mb-4">Final Score: {finalScore}</p>
                    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 space-y-4">
                        {userAnswers.map((answer, index) => (
                            <div key={index} className="p-4 border-b border-gray-200">
                                <p className="font-semibold text-gray-800">Question {index + 1}: {answer.ques}</p>
                                <div className="mt-2 space-y-2">
                                    {/* Ensure currentQuestion is correctly referenced here */}
                                    {visibleQuestions[index]?.options?.map((option, optIndex) => (
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

    {
        isLoadingMore && (
            <div className="text-center text-lg">Loading more questions...</div>
        )
    }



    return (
        <Layout>
            <div className="min-h-screen flex flex-col items-center bg-gray-50 p-8">
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-6">
                    <div className="text-center">
                        <TimerQuestion
                            key={currentQuestionIndex}
                            duration={questionDuration}
                            onTimeEnd={handleNextQuestion}
                            onTimeChange={setElapsedTime}
                        />
                    </div>
                    <div className="text-lg text-blue-800 font-semibold flex justify-between">
                        <p>Question {currentQuestionIndex + 1} / {visibleQuestions.length}</p>
                        <p>Progress: {Math.round(((currentQuestionIndex + 1) / visibleQuestions.length) * 100)}%</p>
                    </div>
                    {currentQuestion ? (
                        <>
                            <div className="text-2xl font-semibold text-gray-800">{currentQuestion.question}</div>
                            <div className="space-y-4">
                                {currentQuestion.options.map((option, index) => (
                                    <label
                                        key={index}
                                        className="block bg-gray-100 p-4 rounded-md cursor-pointer hover:bg-blue-100 transition"
                                    >
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
                                <ButtonComp
                                    onClick={handleNextQuestion}
                                    name={currentQuestionIndex < visibleQuestions.length - 1 ? 'Next' : 'Finish'}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="text-center mt-10 text-lg">
                            Loading question...
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Set;
