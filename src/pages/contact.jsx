import ButtonComp from '@/Components/ButtonComp'
import InputComp from '@/Components/InputComp'
import Layout from '@/Components/Layout'
import TextAreaComp from '@/Components/TextAreaComp'
import { postContactData } from '@/functions/contact'
import { contactSchema } from '@/validate'
import { useFormik } from 'formik'
import React from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    message: ""
}

const contact = () => {

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: contactSchema,
        onSubmit: async (values) => {
            try {
                const res = await postContactData(values);
                if (res.status === 200) {

                    toast.success(`${res.data.message}`, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",

                    });
                    values.firstName = "",
                        values.lastName = "",
                        values.email = "",
                        values.message = "";
                } else {
                    toast.error(`${res.data.message}`);
                }
            } catch (error) {
                toast.error(`${error}`);
                console.log(error);
            }
        }
    })
    return (
        <Layout>
            <div className='w-full min-h-screen bg-blue-500 flex items-center justify-center'>
                <div className="flex flex-col lg:flex-row justify-evenly items-center p-6 space-y-4 lg:space-y-0 lg:space-x-4 w-full max-w-5xl">
                    <div className="text-center lg:text-left bg-gray-100 p-5 w-full lg:w-1/2 rounded-sm">
                        <h1 className='text-center font-bold text-2xl sm:text-3xl md:text-4xl mb-4'>Contact Us</h1>
                        <form onSubmit={handleSubmit}> <div className='flex flex-col sm:flex-row justify-around'>
                            <div className='w-full sm:w-1/2 p-2'>
                                <InputComp name={'firstName'} onBlur={handleBlur} onChange={handleChange} value={values.firstName} label={"First Name"} />
                                {errors.firstName && touched.firstName ?
                                    (<p className="text-red-500 text-sm mt-1">{errors.firstName}</p>) : null}
                            </div>
                            <div className='w-full sm:w-1/2 p-2'> <InputComp name={'lastName'} label={"Last Name"} onBlur={handleBlur} onChange={handleChange} value={values.lastName} />
                                {errors.lastName && touched.lastName ? (<p className="text-red-500 text-sm mt-1">{errors.lastName}</p>) : null}
                            </div>
                        </div>
                            <div className='p-2'> <InputComp name={'email'} label={"Email"} onBlur={handleBlur} onChange={handleChange} value={values.email} /> {errors.email && touched.email ? (<p className="text-red-500 text-sm mt-1">{errors.email}</p>) : null}
                            </div>
                            <div className='p-2'> <TextAreaComp name="message" label="Message" onBlur={handleBlur} onChange={handleChange} value={values.message} /> {errors.message && touched.message && (<p className="text-red-500 text-sm mt-1">{errors.message}</p>)} </div> <div className='text-center p-2'> <ButtonComp name='Submit' type={'submit'} />
                            </div>
                        </form> </div> <div className='w-full lg:w-1/2 flex justify-center'> <img className="w-full h-auto max-w-md rounded-md" src="./quizbanner.png" alt="Quiz Banner" />
                    </div>
                </div>
            </div> </Layout>
    )
}

export default contact