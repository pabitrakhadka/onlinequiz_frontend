import React from 'react'

const QuizComp = () => {
    return (

        <>
            {/* this is question  */}
            <div className="text-2xl font-semibold text-gray-800">{currentQuestion.question}</div>
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
        </>
    )
}

export default QuizComp