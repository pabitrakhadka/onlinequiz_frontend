

import ButtonComp from '@/Components/ButtonComp';
import CardCom from '@/Components/CardCom';
import DashLayout from '@/Components/DashLayout'
import FileInputComp from '@/Components/FileInputComp';
import InputComp from '@/Components/InputComp';
import Modal from '@/Components/Model';
import SelectOption from '@/Components/SelectOption';
import { Table, Tbody, Td, Th, Thead, Tr } from '@/Components/TableComp';
import TextAreaComp from '@/Components/TextAreaComp';
import { getCategories } from '@/functions/category';
import { getAPI_Subjective, getChapterWiseSubjectiveQuestion, PostSubjectiveQuestion } from '@/functions/subjective';
import { subjectiveQuestionSchema } from '@/validate';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

const initialValues = {
    question: "",
    categoryId: "",
    category: ""
}
const subjective = () => {

    //user formik use
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: subjectiveQuestionSchema,
        onSubmit: async (values) => {
            try {
                console.log(values);
                const res = await PostSubjectiveQuestion(values);
                if (res.status === 200) {
                    console.log("successful ");
                    toast.success(`${res.data.message}`);
                    closeModal();
                } else {
                    console.log("error ");
                    toast.success(`${res.data.message}`);

                }

            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
    })


    const handleUpdate = (id) => {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    const handleBulkData = async (e) => {
        e.preventDefault();

        try {


            const formattedData = jsondData.map((data) => ({
                question: data.question,
                category: data.category,
                category1: data.category1,
            }));



            const res = await PostSubjectiveQuestion(formattedData);
            if (res.status === 200) {
                console.log("successful ");
                toast.success(`${res.data.message}`);
                closeModal();
            } else {
                console.log("error ");
                toast.success(`${res.data.message}`);

            }

        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    const category2 = [
        { id: "1", categoryName: "Short" },
        { id: "2", categoryName: "Long" }

    ]
    const [categoryData, setCategoryData] = useState([]);
    const [category, setcategory] = useState(5);
    const [questionData, setQuestion] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isBulk, setBulk] = useState(false);
    const [bulkData, setBulkData] = useState('');
    const [jsondData, setJsonData] = useState(null);
    const openModal = () => setModalOpen(true);

    const closeModal = () => {
        values.categoryId = null;
        values.category = null;
        values.question = null;
        setJsonData(null);
        setModalOpen(false);
    }
    const toggleBulk = () => setBulk(!isBulk);

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

    const loadCategoryQuestion = async (params) => {
        try {

            const res = await getChapterWiseSubjectiveQuestion(`categoryId=${category}`);
            if (res.status === 200) {
                console.log(res.data.data);
                setQuestion(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loadCategory = async () => {
        try {

            const res = await getCategories();
            if (res.status === 200) {
                console.log(res.data.data);
                setCategoryData(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        loadCategory();


    }, [])
    useEffect(() => {

        if (category) {
            console.log(category);
            loadCategoryQuestion();
        }

    }, [category])

    return (
        <DashLayout>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <ButtonComp onClick={openModal} name='Add Subjective Question' />

                <Modal isOpen={isModalOpen} onClose={closeModal} title={"Add Pdf file for Subjective Question"}>

                    <div>
                        <div>
                            <ButtonComp className={isBulk ? "bg-red-500 hover:bg-blue-500" : "bg-green-700"} onClick={toggleBulk} name={isBulk ? "Bul Mode On" : "Bul Mode Off"} />
                        </div>
                        {isBulk ? <>

                            <div>
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

                                <div className='flex justify-around'>
                                    <ButtonComp type={"button"} onClick={closeModal} className='bg-red-400' name={"Close"} />
                                    <ButtonComp onClick={handleBulkData} type={"submit"} name={"Submit"} />
                                </div>
                            </div>
                        </> : <>

                            <form onSubmit={handleSubmit} >

                                <div><InputComp name={'question'} label={"Question"} onBlur={handleBlur} onChange={handleChange} value={values.question} />
                                    {errors.question && touched.question ? (
                                        <p className="text-red-500 text-sm mt-1">{errors.question}</p>
                                    ) : null}
                                </div>
                                <div>
                                    <div>
                                        <SelectOption label={"Select an Option"} onBlur={handleBlur} onChange={handleChange} options={categoryData} value={values.categoryId} name={'categoryId'} />
                                        {errors.categoryId && touched.categoryId ? (
                                            <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
                                        ) : null}</div>
                                    <div>
                                        <SelectOption label={"Select an Option"} onBlur={handleBlur} onChange={handleChange} options={category2} value={values.category} name={'category'} />
                                        {errors.category && touched.category ? (
                                            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='flex justify-around'>
                                    <ButtonComp type={"button"} onClick={closeModal} className='bg-red-400' name={"Close"} />
                                    <ButtonComp type={"submit"} name={"Submit"} />
                                </div>
                            </form>
                        </>}

                    </div>
                </Modal>

                <Table>
                    <Thead>
                        <Tr>
                            <Th scope="col" className="px-6 py-3">
                                S.N
                            </Th>
                            <Th scope="col" className="px-6 py-3">
                                Question
                            </Th>
                            <Th scope="col" className="px-6 py-3">


                                <SelectOption name={'category'} onChange={(event) => setcategory(event.target.value)} options={categoryData} />


                            </Th>
                            <Th >
                                Action
                            </Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            questionData && questionData.length > 0 ? questionData.map((question, index) => (
                                <Tr key={index}  >
                                    <Td>
                                        {index + 1}
                                    </Td>
                                    <Td  >
                                        {question.question}
                                    </Td>
                                    <Td  >
                                        {question.category}
                                    </Td>

                                    <Td colspan={2}>
                                        <ButtonComp name='Edit' />

                                        <ButtonComp name='Delete' className='bg-red-400' />

                                    </Td>
                                </Tr>
                            )) : (
                                <Tr>
                                    <Td>no question found</Td>
                                </Tr>
                            )
                        }

                    </Tbody>
                </Table>
            </div>
        </DashLayout >
    )
}

export default subjective