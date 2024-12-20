import ButtonComp from '@/Components/ButtonComp';
import DashLayout from '@/Components/DashLayout';
import InputComp from '@/Components/InputComp';
import Modal from '@/Components/Model';
import TextAreaComp from '@/Components/TextAreaComp';
import { newsSchema } from '@/validate';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import CardNews from "@/Components/CardNews";

import { toast } from 'react-toastify';
import { DeleteNews, getNews, postNews, updateNews } from '@/functions/news';

const initialValues = {
    heading: "",
    description: "",
    image: null,
};

import dynamic from 'next/dynamic';
import FileInputComp from '@/Components/FileInputComp';
import Pagination from '@/Components/Pagination';
const Loders = dynamic(() => import("@/Components/Loders"), { ssr: false });
const News = () => {

    const [isNewsId, setNewsId] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null); // Stores the selected file
    const [loading, setLoading] = useState(true);

    //pagination
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    //handlleNextPage
    const handleNextPage = (page) => {
        console.log(page);
        setCurrentPage(page);
    }

    const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: newsSchema,
        onSubmit: async (values) => {
            try {
                if (!imageFile) {
                    toast.error("Image is required.");
                    return;
                }

                const formData = new FormData();
                formData.append("heading", values.heading);
                formData.append("description", values.description);
                formData.append("image", imageFile);

                // Determine whether to update or create new news
                const res = isUpdate
                    ? await updateNews(`id=${isNewsId}`, formData)
                    : await postNews(formData);

                if (res.status === 200) {
                    console.log("Response data:", res.data[0]);
                    toast.success(res.data.message);

                    // setNewsdata((pre) => [pre, res.data]);
                    // Reset form and clear image
                    resetForm();
                    setImageFile(null);

                    // Close modal
                    setModalOpen(false);
                } else {
                    toast.error(res.data.message || "An error occurred.");
                }
            } catch (error) {
                console.error("Form submission error:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        },
    });


    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        values.description = "";
        values.heading = "";
        values.image = "";
    }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file); // Store the actual file for submission
            setFieldValue("image", file); // Update formik's image field
        }
    };

    useEffect(() => {
        loadNews();
    }, [])

    const [newsData, setNewsdata] = useState([]);
    const loadNews = async () => {
        try {
            const res = await getNews();
            if (res.status === 200) {
                console.log(res.data);

                setNewsdata(res.data.data);
                setTotalPage(res.data.totalPage);
                setLoading(false);
            } else {
                console.log("error");
            }
        } catch (error) {

        }
    }


    //this is DeleteNews Function
    const handleDelete = async (id) => {
        try {

            const res = await DeleteNews(`id=${id}`);
            if (res.status === 200) {
                toast.success(`${res.data.message}`);
                setNewsdata(newsData.filter((item) => item.id !== id));
            } else {
                toast.error(`${res.data.message}`)
            }

        } catch (error) {
            console.log("error", error);
        }
    }
    //handleEdit 
    const handleEdit = async (id) => {
        try {
            setIsUpdate(true);
            const res = await getNews(`id=${id}`);
            if (res.status === 200) {
                console.log(res.data);
                openModal(true);
                setNewsId(id);
                values.description = res.data.description;
                values.heading = res.data.heading;
                values.image = res.data.image;
                const url = `${process.env.NEXT_PUBLIC_API_URL}/upload/images`;
                // setImageFile();


            } else {
                toast.error(`${res.data.message}`)
            }

        } catch (error) {
            console.log("error", error);
        }
    }
    return (
        <DashLayout>
            {loading ? <>

                <div>
                    <Loders />
                </div>

            </> : <>

                <div>
                    <div className="">
                        <ButtonComp onClick={openModal} name="Add News" />
                    </div>
                    <div>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            {newsData && newsData.length > 0 ?
                                newsData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="max-w-sm w-full sm:w-[calc(50%-1rem)] md:w-[calc(33%-1rem)] bg-white rounded-lg shadow-md overflow-hidden"
                                    >
                                        <CardNews

                                            image={item.image}
                                            cardTitle={item.heading}
                                            isNews={true}
                                            description={item.description}
                                        />
                                        <div className="mt-4 flex space-x-2 p-4">
                                            <ButtonComp isPositive={false} className="m-1" name="Edit" onClick={() => handleEdit(item.id)} />
                                            <ButtonComp className="m-1" name="Delete" onClick={() => handleDelete(item.id)} />
                                        </div>
                                    </div>
                                )) : (

                                    <p>No News Found!</p>
                                )}

                        </div>
                        <div><Pagination currentPage={currentPage} onPageChange={handleNextPage} totalPages={totalPage} /></div>
                    </div>


                    <div className="flex flex-col items-center justify-center min-h-screen ">
                        <Modal isOpen={isModalOpen} onClose={closeModal} title="Add News">
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="image mb-4">
                                        <FileInputComp name={'image'} onChange={onImageChange} accept={'.jpg,.jpeg,.png'} />
                                        {imageFile && <img className='w-full h-48 object-contain p-2' alt="Preview" height={100} width={100} src={URL.createObjectURL(imageFile)} />}
                                        {errors.image && touched.image && (
                                            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                                        )}
                                    </div>
                                    <div>
                                        <InputComp
                                            label="Heading"
                                            type="text"
                                            name="heading"
                                            value={values.heading}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.heading && touched.heading && (
                                            <p className="text-red-500 text-sm mt-1">{errors.heading}</p>
                                        )}
                                    </div>
                                    <div>
                                        <TextAreaComp
                                            label="Description"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter description here..."
                                        />
                                        {errors.description && touched.description && (
                                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                        )}
                                    </div>
                                    <div className="flex justify-around mt-4">
                                        <ButtonComp isPositive={false} onClick={closeModal} name="Close" />
                                        <ButtonComp name={isUpdate ? "Update" : "Submit"} type="submit" />
                                    </div>
                                </form>
                            </div>
                        </Modal>
                    </div>
                </div>
            </>}
        </DashLayout>
    );
};

export default News;
