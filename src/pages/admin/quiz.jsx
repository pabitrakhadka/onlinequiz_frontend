import ButtonComp from '@/Components/ButtonComp'
import DashLayout from '@/Components/DashLayout'
import InputComp from '@/Components/InputComp';
import Modal from '@/Components/Model';
import TextAreaComp from '@/Components/TextAreaComp';
import { quizSchema } from '@/validate';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import Toast from '@/Components/Toast';
import { toast } from 'react-toastify';
import SearchComp from '@/Components/SearchComp';
import * as XLSX from 'xlsx';
import FileInputComp from '@/Components/FileInputComp';
import { getCategories } from '@/functions/category';
import SelectOption from '@/Components/SelectOption';
import { DeleteQuiz, getQuiz, postQuiz, UpdateQuiz } from '@/functions/quiz';
import Pagination from '@/Components/Pagination';
import Papa from "papaparse";
const initialValues = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    categoryId: "",
    answer: "",
    description: ""
}
const quiz = () => {

    const [isEdit, setEdit] = useState(false);
    const [editId, setEditID] = useState(null);


    //this edit quiz quesion and delete quesion 
    const editQuestion = async (id) => {
        try {
            console.log("id=", id);
            setEditID(id);
            setEdit(true);

            const res = await getQuiz(`quizId=${id}`);


            if (res.status === 200) {
                console.log("Edit id=", res.data);
                const data = res.data.data;
                values.question = data.question;
                values.description = data.description;
                values.answer = data.answer;
                values.categoryId = data.categoryId;
                values.option1 = data?.options[0]?.text;
                values.option2 = data?.options[1]?.text;
                values.option3 = data?.options[2]?.text;
                values.option4 = data?.options[3]?.text;
                openModal();


            } else {
                toast.error(`${res.data.message}`);
            }
        } catch (error) {
            toast.error(`${error}`);
            console.log(error);
        }
    }

    const HandeldeleteQuiz = async (id) => {
        try {
            const res = await DeleteQuiz(`id=${id}`);

            setQuestion(questionData.filter((item) => item.id !== id));
            if (res.status === 200) {
                toast.success(`${res.data.message}`);

            } else {
                toast.error(`${res.data.message}`);
            }
        } catch (error) {
            toast.error(`${error}`);
            console.log(error);
        }
    }
    const [categoryData, setCategoryData] = useState([]);
    const [category, setcategory] = useState(1);
    const [questionData, setQuestion] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isBulk, setBulk] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setJsonData(null);
    }
    const toggleBulk = () => setBulk(!isBulk);

    const [bulkData, setBulkData] = useState(""); // Initialize as an empty string

    // Handle the change in the textarea
    // const handleChangeBulk = (e) => {
    //     setBulkData(e.target.value); // Update the bulkData with the new value
    // };

    const submitBulkData = async (e) => {
        e.preventDefault();
        try {
            console.log("fiel=", jsondData);
            const formattedData = jsondData.map((data) => ({
                question: data.question,
                options: [
                    data.option1,
                    data.option2,
                    data.option3,
                    data.option4,
                ],
                categoryId: data.categoryId,
                answer: data.answer,
                description: data.description
            }));

            setBulkData(formattedData);
            console.log("formattedData=", formattedData);


            const response = await postQuiz(formattedData);
            if (response.status === 200) {
                toast.success("Data uploaded successfully!");
                closeModal();
            } else {
                toast.error("Failed to upload data.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while submitting data.");
        }
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: quizSchema,  // Correct this to validationSchema
        onSubmit: async (values) => {
            try {
                console.log(values);
                const data =
                {

                    question: values.question,
                    description: values.description,
                    categoryId: values.categoryId,
                    options: [
                        values.option1,
                        values.option2,
                        values.option3,
                        values.option4,

                    ],
                    answer: values.answer
                }

                console.log(data);


                const res = isEdit ? await UpdateQuiz(`id=${editId}`, data) : await postQuiz(data);
                console.log(data);
                if (res.status === 200) {


                    toast.success(res.data.message);
                    closeModal();

                } else {
                    toast.success(res.data.message);
                    closeModal();
                }


            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    });
    //pagination Locin
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1)

    //Handle Page Change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    //load question
    const loadQuestion = async (category) => {
        try {
            console.log("totalPages=", totalPages);
            console.log("currentPage=", currentPage);
            console.log("category=", category);
            const res = await getQuiz(`page=${currentPage}&categoryId=${category}`);
            if (res.status === 200) {

                setQuestion(res.data.data);
                setTotalPages(res.data.totalPages);
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

            const res = await getCategories();
            if (res.status === 200) {
                console.log("res=", res.data.data);
                setCategoryData(res.data.data);
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (category) {

            loadQuestion(category);
        }

    }, [category, currentPage])
    useEffect(() => {
        loadCategory();
    }, [])

    const [jsondData, setJsonData] = useState(null);

    const excelFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {
            alert("Please select a file.");
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const data = event.target.result;
                // Parse the Excel file
                const workbook = XLSX.read(data, { type: 'binary' });
                // Get the first sheet name
                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];
                // Convert worksheet to JSON
                const json = XLSX.utils.sheet_to_json(worksheet);
                console.log(json); // For debugging
                setJsonData(json); // Replace with your state update logic
            } catch (error) {
                console.error("Error parsing file:", error);
            }
        };

        reader.onerror = (error) => {
            console.error("File reading error:", error);
        };

        reader.readAsBinaryString(file);
    };


    return (
        <DashLayout>
            <div className="">
                <div>
                    <div className='flex justify-around items-center'>
                        <div className="">
                            <ButtonComp onClick={openModal} name='Add Quiz' />
                        </div>
                        <div className="">
                            <SearchComp />
                        </div>
                    </div>


                    <div className="relative overflow-scroll ">
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


                                        <SelectOption value={categoryData.id} onChange={(event) => setcategory(event.target.value)} options={categoryData} />


                                    </th>
                                    <th scope="col" colSpan={3} className="px-6 py-3">
                                        Action
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    questionData && questionData.length > 0 ? questionData.map((question, index) => (
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
                                                <div className=' m-1'><ButtonComp onClick={() => editQuestion(question.id)} name='Edit' />
                                                </div>
                                                <div className='m-1'>
                                                    <ButtonComp className='bg-red-500' onClick={() => HandeldeleteQuiz(question.id)} name='Delete' />
                                                </div>
                                                {/* <ButtonComp name='Edit' / */}

                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">
                                                No Questions Found for This Category.
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                        <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
                    </div>



                    <div className="">
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
                                <form onSubmit={isBulk ? submitBulkData : handleSubmit} action="">
                                    <div>
                                        {isBulk ? <>

                                            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                                                <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Excel File and Convert To JSON</h2>
                                                <FileInputComp onChange={excelFileUpload} />
                                                {jsondData && (
                                                    <div className="mt-6">
                                                        <TextAreaComp
                                                            name="questions"
                                                            value={JSON.stringify(jsondData, null, 2)} // Controlled value
                                                            id="bulkText"
                                                            label="Bulk Questions"
                                                            placeholder="JSON Data will appear here..."
                                                            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                {/* Pass the necessary props to the TextAreaComp */}

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
                                                    {/* <InputComp
                                                        type="text"
                                                        name="category"
                                                        id="category"

                                                        onChange={handleChange}
                                                        value={values.category}
                                                        onBlur={handleBlur}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                                                    /> */}
                                                    <SelectOption
                                                        name={'category'}
                                                        options={categoryData}
                                                        onChange={handleChange}
                                                        value={values.categoryId}
                                                        onBlur={handleBlur}
                                                    />

                                                    {errors.categoryId && touched.categoryId ? (
                                                        <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="question">Descripton</label>
                                                <InputComp
                                                    type="text"
                                                    name="description"
                                                    id="question"

                                                    onChange={handleChange}
                                                    value={values.description}
                                                    onBlur={handleBlur}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                                                />
                                                {errors.description && touched.descriptionq ? (
                                                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                                ) : null}
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
                                            {isEdit ? "Update" : "Submit"}
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </Modal>
                    </div>
                </div>

            </div >


        </DashLayout >
    )
}

export default quiz