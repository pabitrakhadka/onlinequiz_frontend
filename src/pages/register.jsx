import ButtonComp from '@/Components/ButtonComp';
import InputComp from '@/Components/InputComp';
import Layout from '@/Components/Layout';
import { registerSchema } from '@/validate';

import { useFormik } from 'formik';
import React from 'react';

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: ""
};

const Register = () => {

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: registerSchema,  // Correct this to validationSchema
        onSubmit: async (values) => {
            try {
                // Handle form submission
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    });

    return (
        <Layout>
            <div className='flex justify-center items-center w-full h-screen bg-gradient-to-r from-blue-500 to-teal-400'>
                <div className="w-96 p-8 rounded-lg bg-white shadow-lg">
                    <h1 className='text-center text-2xl font-bold mb-6 text-gray-700'>Register</h1>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className="flex gap-2">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="firstName">First Name</label>
                                <InputComp
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}  // Correct this from handleBlur
                                    value={values.firstName}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                                />
                                {errors.firstName && touched.firstName ? (
                                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                ) : null}
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2 " htmlFor="lastName">Last Name</label>
                                <InputComp
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}  // Correct this from handleBlur
                                    value={values.lastName}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                                />
                                {errors.lastName && touched.lastName ? (
                                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                ) : null}
                            </div>

                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">Email</label>
                            <InputComp
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                onBlur={handleBlur}  // Correct this from handleBlur
                                value={values.email}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
                            />
                            {errors.email && touched.email ? (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            ) : null}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">Address</label>
                            <InputComp
                                type="text"
                                name="address"
                                id="address"
                                onChange={handleChange}
                                onBlur={handleBlur}  // Correct this from handleBlur
                                value={values.address}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md  "
                            />
                            {errors.address && touched.address ? (
                                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                            ) : null}
                        </div>

                        <div className='flex justify-center mt-6'>
                            <ButtonComp
                                type="submit"
                                name='Register'
                                className=""
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
};

export default Register;
