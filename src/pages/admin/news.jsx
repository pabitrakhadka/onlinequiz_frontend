import ButtonComp from '@/Components/ButtonComp';
import DashLayout from '@/Components/DashLayout'
import InputComp from '@/Components/InputComp';
import Modal from '@/Components/Model';
import TextAreaComp from '@/Components/TextAreaComp';
import { newsSchema } from '@/validate';
import { useFormik } from 'formik';
import ImageC from '../../../public/computeroperator.png';
import React, { useState } from 'react'
import CardComp from '@/Components/CardComp';

const initialValues = {
    heading: "",
    description: ""
};
const news = () => {

    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: newsSchema,
        onSubmit: async (values) => {
            try {

            } catch (error) {

            }

        }
    })


    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [image, setImage] = useState('');
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]))
        }
    }
    // const toggleBulk = () => setBulk(!isBulk);
    return (
        <DashLayout>
            <div>
                <div className="">
                    <ButtonComp onClick={openModal} name='Add News' />
                </div>
                <div className='flex'>
                    <CardComp cardTitle={"This is Card Title"} isNews="true" descriptin={"This is Description hare.."} />
                    <CardComp cardTitle={"This is Card Title"} isNews="true" descriptin={"This is Description hare.."} />

                    {/* <div className="new_col">
                        <div className="flex items-center">
                            <div>
                                <img className='' src="https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg" height={200} width={200} alt="" />
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold '>Heading</h2>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="flex flex-col items-center justify-center min-h-screen ">

                    {/* <button
                            onClick={openModal}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                        >
                            Open Modal
                        </button> */}

                    <Modal isOpen={isModalOpen} onClose={closeModal} title="Add News">
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="image ">
                                    <input type="file" onChange={onImageChange} />
                                    {image ? <>    <img alt='preview Image' height={100} width={100} src={image}></img></> : null}
                                </div>
                                <div>
                                    <InputComp label={"Heading"} type={"text"} name={"heading"} value={values.heading} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.heading && touched.heading ? <><p className='text-red-500 text-sm mt-1'>{errors.heading}</p></> : null}
                                </div>
                                <div>
                                    <TextAreaComp label={"Description"} name={"description"} value={values.description} onChange={handleChange} onBlur={handleBlur} placeholder={'Emter Description hare..'} />
                                    {/* <InputComp label={"Description"} type={"text"} name={"description"} value={values.description} onChange={handleChange} onBlur={handleBlur} /> */}
                                    {errors.description && touched.description ? <><p className='text-red-500 text-sm mt-1'>{errors.description}</p></> : null}
                                </div>
                                <div className='flex justify-around'>
                                    <ButtonComp onClick={closeModal} name='Close' />
                                    <ButtonComp name='Submit' type={"submit"} />
                                </div>
                            </form>


                        </div>

                    </Modal>
                </div>

            </div>
        </DashLayout>
    )
}

export default news