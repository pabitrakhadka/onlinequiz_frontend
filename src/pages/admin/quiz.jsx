import ButtonComp from '@/Components/ButtonComp'
import DashLayout from '@/Components/DashLayout'
import InputComp from '@/Components/InputComp';
import Modal from '@/Components/Model';
import TextAreaComp from '@/Components/TextAreaComp';
import { quizSchema } from '@/validate';
import { getQuestion, getQuiz } from '@/functions/adminapi/quiz';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
const initialValues = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    category: "",
    answer: "",
    quizs: ""
}

const quiz = () => {


    const [categoryData, setCategoryData] = useState([]);
    const [category, setcategory] = useState("test");
    const [questionData, setQuestion] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isBulk, setBulk] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const toggleBulk = () => setBulk(!isBulk);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: quizSchema,  // Correct this to validationSchema
        onSubmit: async (values) => {
            try {
                // Handle form submission
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    });

    //load question
    const loadQuestion = async (category) => {
        try {

            const res = await getQuestion(`category=${category}`);
            if (res.status === 200) {
                console.log("res=", res.data);
                setQuestion(res.data);
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    //load question Category
    const loadCategory = async () => {
        try {

            const res = await getQuestion(`categoryData=${category}`);
            if (res.status === 200) {
                console.log("res=", res.data.data);
                setCategoryData(res.data);
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (category) {
            // console.log("Category=", category);
            loadQuestion();
        }
        loadQuestion(category);
    }, [category])
    useEffect(() => {
        loadCategory();
    }, [])
    return (
        <DashLayout>
            <div className="">
                <div>
                    <div className="">
                        <ButtonComp onClick={openModal} name='Add Quiz' />
                    </div>


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        S.N
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Question
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                        <select
                                            onChange={(event) => setcategory(event.target.value)}
                                            id="countries"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            {categoryData.map((cat, index) => (
                                                <option key={index} value={cat.category}>{cat.category}</option>
                                            ))}
                                        </select>


                                    </th>
                                    <th scope="col" colSpan={3} className="px-6 py-3">
                                        Action
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td className="px-6 py-4">
                                        Silver
                                    </td>

                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr> */}

                                {
                                    questionData.map((question, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">
                                                {index + 1}
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {question.question}
                                            </th>
                                            <td className="px-6 py-4">
                                                {question.category}
                                            </td>

                                            <td className="px-6 py-4 flex">
                                                <div className=' m-1'><ButtonComp name='Edit' />
                                                </div>
                                                <div className='m-1'>
                                                    <ButtonComp name='Delete' />
                                                </div>
                                                {/* <ButtonComp name='Edit' / */}

                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>



                    <div className="flex flex-col items-center justify-center min-h-screen ">
                        {/* <button
                            onClick={openModal}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                        >
                            Open Modal
                        </button> */}

                        <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Question">
                            <div>
                                <div className='flex justify-end'>
                                    <button
                                        onClick={toggleBulk}
                                        className={`px-6 py-3 rounded font-semibold text-white transition ${isBulk ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                                            }`}
                                    >
                                        {isBulk ? "Bulk Mode On" : "Bulk Mode Off"}
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} action="">
                                    <div>
                                        {isBulk ? <>

                                            <div>
                                                <TextAreaComp id={"bulkText"} label={"Bulk Question hare."} placeholder={"Support only JSON file.."} />
                                            </div>
                                        </> : <>
                                            <div>
                                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="question">Question</label>
                                                <InputComp
                                                    type="text"
                                                    name="question"
                                                    id="question"

                                                    onChange={handleChange}
                                                    value={values.question}
                                                    onBlur={handleBlur}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                                                />
                                                {errors.question && touched.questionq ? (
                                                    <p className="text-red-500 text-sm mt-1">{errors.question}</p>
                                                ) : null}
                                            </div>
                                            <div className='grid grid-cols-2 gap-3'>
                                                <div>
                                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="option1">Option1</label>
                                                    <InputComp
                                                        type="text"
                                                        name="option1"
                                                        id="option1"

                                                        onChange={handleChange}
                                                        value={values.option1}
                                                        onBlur={handleBlur}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                                                    />
                                                    {errors.option1 && touched.option1 ? (
                                                        <p className="text-red-500 text-sm mt-1">{errors.option1}</p>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="question">Option2</label>
                                                    <InputComp
                                                        type="text"
                                                        name="option2"
                                                        id="option2"

                                                        onChange={handleChange}
                                                        value={values.option2}
                                                        onBlur={handleBlur}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                                                    />
                                                    {errors.option2 && touched.option2 ? (
                                                        <p className="text-red-500 text-sm mt-1">{errors.option2}</p>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="option3">Option3</label>
                                                    <InputComp
                                                        type="text"
                                                        name="option3"
                                                        id="option3"

                                                        onChange={handleChange}
                                                        value={values.option3}
                                                        onBlur={handleBlur}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                                                    />
                                                    {errors.option3 && touched.option3 ? (
                                                        <p className="text-red-500 text-sm mt-1">{errors.option3}</p>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="option4">Option4</label>
                                                    <InputComp
                                                        type="text"
                                                        name="option4"
                                                        id="option4"

                                                        onChange={handleChange}
                                                        value={values.option4}
                                                        onBlur={handleBlur}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                                                    />
                                                    {errors.option4 && touched.option4 ? (
                                                        <p className="text-red-500 text-sm mt-1">{errors.option4}</p>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className='flex gap-3'>
                                                <div>
                                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="answer">Answer</label>
                                                    <InputComp
                                                        type="text"
                                                        name="answer"
                                                        id="option4"

                                                        onChange={handleChange}
                                                        value={values.answer}
                                                        onBlur={handleBlur}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                                                    />
                                                    {errors.answer && touched.answer ? (
                                                        <p className="text-red-500 text-sm mt-1">{errors.answer}</p>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">Category</label>
                                                    <InputComp
                                                        type="text"
                                                        name="category"
                                                        id="category"

                                                        onChange={handleChange}
                                                        value={values.category}
                                                        onBlur={handleBlur}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                                                    />
                                                    {errors.category && touched.category ? (
                                                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                                    ) : null}
                                                </div>
                                            </div>

                                        </>}
                                    </div>
                                    <div className='flex justify-around'>
                                        <button type='button'
                                            onClick={closeModal}
                                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Close
                                        </button>
                                        <button type='submit'

                                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </Modal>
                    </div>
                </div>

            </div>


        </DashLayout>
    )
}

export default quiz