import Layout from '@/Components/Layout'
import React from 'react'

const about = () => {
    return (
        <Layout>
            <div className='w-full h-screen bg-blue-500'>
                <div className=" h-screen flex flex-col lg:flex-row justify-evenly items-center p-6 space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className="text-center lg:text-left bg-gray-100 p-5 w-1/2 rounded-sm">
                        <h1 className="text-center text-4xl font-bold  text-black-700">Revolutionizing Computer Operator Training and Excellence </h1>

                        <p className="text-gray-600 ">
                            Our mission is to provide high-quality quizzes and resources to help aspiring computer operators excel. We are dedicated to fostering learning and growth in the digital world.
                            We are dedicated to transforming aspiring computer operators into proficient professionals. Our platform offers meticulously crafted quizzes and resources to enhance your knowledge and skills in the ever-evolving digital landscape.
                        </p>
                    </div>
                    <div className=''>
                        <img className="w-full h-auto max-w-md rounded-md" src="./quizbanner.png" alt="Quiz Banner" />
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default about