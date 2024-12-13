import ButtonComp from '@/Components/ButtonComp'
import CardCom from '@/Components/CardCom';
import DashLayout from '@/Components/DashLayout'
import InputComp from '@/Components/InputComp';
import Modal, { PdfViewModal } from '@/Components/Model'
import SelectOption from '@/Components/SelectOption';
import { getCategories } from '@/functions/category';
import { deletePdfQuestion, getPdfQuestions, postPdfQuestion } from '@/functions/subjective';
import { newsSchema, pdfValidationSchema } from '@/validate';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';



const initialValues = {
    pdfFile: "",
    categoryId: ""
};

const sebjective = () => {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const isOpen = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const [pdfFile, setPdfFile] = useState(null);
    const onFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (file.type === "application/pdf") {
                setPdfFile(file);
                setFieldValue("pdfFile", file); // Ensure Formik field updates
            } else {
                alert("Please select a valid PDF file.");
            }
        }
    };

    const [openModal, setModal] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const handleDelete = async (id) => {

        try {
            console.log("id=", id);
            const deleteFile = await deletePdfQuestion(`id=${id}`);
            if (deleteFile.status === 200) {
                toast.success(`${deleteFile.data.message}`);

                setPdfFiles(pdfFiles.filter((item) => item.id !== id));
            } else {
                toast.error(`${deleteFile.data.message}`);
            }

        } catch (error) {
            console.log(error);
        }
    }
    // loadCatetgory
    const [categoryData, setCategoryData] = useState([]);
    const loadCategory = async () => {
        try {
            console.log("test");
            const res = await getCategories("");
            if (res.status === 200) {
                console.log(res.data.data);
                setCategoryData(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //const load pdf files

    const loadFiles = async () => {
        try {
            console.log("test");
            const res = await getPdfQuestions("category=all");
            if (res.status === 200) {
                console.log(res.data);
                setPdfFiles(res.data.data);
            }
        } catch (error) {

        }
    }


    useEffect(() => {
        console.log("TEST");
        loadFiles();
        loadCategory();
    }, [])


    const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: pdfValidationSchema,
        onSubmit: async (values) => {
            try {
                console.log(values);
                const formData = new FormData();
                formData.append("pdfFile", pdfFile); // Use state to get the file
                formData.append("categoryId", values.categoryId); // Ensure categoryId is used correctly

                const res = await postPdfQuestion(formData);

                if (res.status === 200) {
                    console.log("Success:", res.data);
                    // Reset form values and state after successful submission
                    resetForm();
                    setPdfFile(null);
                    closeModal();
                    loadFiles(); // Refresh file list
                } else {
                    console.error("Error during submission:", res);
                }
            } catch (error) {
                console.error("Form submission error:", error);
            }
        }
    });


    //function to handle the view button click
    const handleView = (id) => {
        console.log("id=", id);
        const pdfToView = pdfFiles.find((item) => item.id === id);
        setSelectedPdf(pdfToView);
        setModal(true);
    }
    // Function to handle modal close
    const handleCloseModal = () => {
        setModal(false);
        setSelectedPdf(null);
    };
    return (
        <DashLayout>
            <div>
                <ButtonComp onClick={isOpen} name='Add Subjective PDF' />
                <Modal isOpen={isModalOpen} onClose={closeModal} title={"Add PDF Subjective Question"}>

                    <div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">

                            {isModalOpen ? <>
                                <div className="file-upload mb-4">
                                    <input type="file" name="pdfFile" accept=".pdf" onChange={onFileChange} />
                                    {pdfFile && (
                                        <div className="pdf-preview mt-4">
                                            <p>Preview:</p>
                                            <iframe
                                                src={URL.createObjectURL(pdfFile)}
                                                title="PDF Preview"
                                                width="100%"
                                                height="300px"
                                            ></iframe>
                                            <a
                                                href={URL.createObjectURL(pdfFile)}
                                                download={pdfFile.name}
                                                className="download-link text-blue-500"
                                            >
                                                Download {pdfFile.name}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </> : null}
                            <div>
                                {/* <InputComp name={'category'} onBlur={handleBlur} onChange={handleChange} value={values.category} type={'text'} label={"Category"} />
                                {errors.category && touched.category && (
                                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                )} */}

                                <SelectOption
                                    label={"Category"}
                                    name="categoryId"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setFieldValue("categoryId", e.target.value);
                                    }}
                                    value={values.categoryId}
                                    options={categoryData}
                                />

                                {errors.categoryId && touched.categoryId && (
                                    <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
                                )}
                            </div>
                            <div className='flex justify-around'>
                                <ButtonComp onClick={closeModal} name='Close' type={'submit'} className='bg-red-500' />
                                <ButtonComp name='Submit' type={'submit'} />
                            </div>
                        </form>
                    </div>
                </Modal>

                <div className="view_pdf_files grid grid-cols-4 gap-4 "  >

                    {/* <div>
                        <img src="https://media.istockphoto.com/id/1356214382/vector/pdf-file-icon-format-pdf-download-document-image-button-vector-doc-icon.jpg?s=612x612&w=0&k=20&c=Pp0h1HBQynL2JOVu9rMVlcX711XvjXR3UujOuPLck9M=" alt="" />

                        <div>

                        </div>
                    </div> */}
                    {
                        pdfFiles && pdfFiles.length > 0 ? (
                            pdfFiles.map((item) => (
                                <CardCom key={item.id} className="m-4 p-4">
                                    {/* Image for the PDF file */}
                                    <img
                                        className="m-auto"
                                        height={100}
                                        width={100}
                                        src="https://media.istockphoto.com/id/1356214382/vector/pdf-file-icon-format-pdf-download-document-image-button-vector-doc-icon.jpg?s=612x612&w=0&k=20&c=Pp0h1HBQynL2JOVu9rMVlcX711XvjXR3UujOuPLck9M="
                                        alt="PDF Icon"
                                    />

                                    {/* Dynamic PDF title */}
                                    <h1 className="p-2 text-center text-lg font-bold">{`${item.category?.categoryName}`}</h1>

                                    {/* Action buttons */}
                                    <div className="flex justify-center mt-4">
                                        <ButtonComp name="Delete" onClick={() => handleDelete(item.id)} />
                                        <ButtonComp name="View" onClick={() => handleView(item.id)} />
                                    </div>
                                </CardCom>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No PDF files to display.</p>
                        )
                    }
                    {/* modal for pdf view */}
                    {
                        openModal && selectedPdf && (
                            <div>
                                <PdfViewModal
                                    isOpen={openModal}
                                    title={`Viewing: ${selectedPdf.category || `Set ${selectedPdf.id}`}`}
                                    onClose={handleCloseModal}
                                    fileUrl={selectedPdf.fileName}
                                >
                                    <p>{selectedPdf.fileName}</p>
                                    {/* <div className="flex justify-center items-center">
                                        <iframe
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/upload/pdf/${selectedPdf.fileName}`}
                                            title={"test"}
                                            className="w-full h-[80vh] border rounded-md"
                                            style={{
                                                maxWidth: '100%',
                                            }}
                                        />
                                    </div> */}
                                </PdfViewModal>
                            </div>
                        )
                    }





                </div>
            </div >
        </DashLayout >
    )
}

export default sebjective