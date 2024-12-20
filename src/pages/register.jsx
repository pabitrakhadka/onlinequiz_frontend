import ButtonComp from '@/Components/ButtonComp';
import InputComp from '@/Components/InputComp';
import Layout from '@/Components/Layout';
import { postUser } from '@/functions/user';
import { registerSchema } from '@/validate';

import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
    confirm_password: ""
};

const Register = () => {
    const router = useRouter();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: registerSchema,  // Correct this to validationSchema
        onSubmit: async (values) => {
            try {
                console.log(values);
                const res = await postUser(values);
                if (res.status === 201) {
                    alert(res.data.message);
                    router.push("/login");
                } else {
                    alert(res.data.message);
                    router.push("/login");
                }
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 409) {
                    alert(res.data.message);
                } else {
                    alert(res.data.message);
                }
            }
        }


    });

    return (
        <Layout>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="colored"

            />
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
                        <div className='flex gap-2'>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">Password</label>
                                <InputComp
                                    type="text"
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}  // Correct this from handleBlur
                                    value={values.password}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md  "
                                />
                                {errors.password && touched.password ? (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                ) : null}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">confirm_password</label>
                                <InputComp
                                    type="text"
                                    name="confirm_password"
                                    id="confirm_password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}  // Correct this from handleBlur
                                    value={values.confirm_password}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md  "
                                />
                                {errors.confirm_password && touched.confirm_password ? (
                                    <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
                                ) : null}
                            </div>
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
