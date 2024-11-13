import React, { useEffect, useState } from 'react';
import axios from 'axios';

const test1 = () => {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 5; // Adjust based on the desired number of questions per page

    useEffect(() => {
        fetchQuestions(currentPage);
    }, [currentPage]);

    const fetchQuestions = async (page) => {
        try {
            const response = await axios.get(`/api/questions?page=${page}&limit=${pageSize}`);
            setQuestions(response.data.questions);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h1>Quiz</h1>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>
                        <h3>{question.text}</h3>
                        <ul>
                            {question.options.map((option, i) => (
                                <li key={i}>{option}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="pagination">
            {pages.map((page) => (
                <button
                    key={page}
                    disabled={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default test1;
