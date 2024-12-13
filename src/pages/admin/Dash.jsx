import AdminCard from '@/Components/AdminCard'
import CardCom from '@/Components/CardCom'
import DashLayout from '@/Components/DashLayout'
import Leaderboard from '@/Components/Leaderboard'
import React from 'react'

const Dash = () => {
    return (
        <DashLayout>
            <div>
                <div className='flex '>
                    <AdminCard title={"Total Users"} value={"50"} />
                    <AdminCard title={"Register Users"} value={"10"} />
                    <AdminCard title={"Total MCQ"} value={"1000K"} />
                </div>
                <div className=' bg-indigo-500 p-5 m-3'>
                    <h1 className='font-bold text-center text-white p-2 text-4xl mb-2'>Leaboard</h1>
                    <div className="flex justify-around">
                        <Leaderboard userName={"Pabitra Khadka"} rank={1} />
                        <Leaderboard userName={"Ram Khadka"} rank={2} />
                        <Leaderboard userName={"Shyam Khadka"} rank={3} />
                    </div>
                </div>
                <div className=' bg-indigo-500 p-5 m-3'>
                    <h1 className='font-bold text-center text-white p-2 text-4xl mb-2'>Chart || Graph</h1>

                </div>
            </div>
        </DashLayout>
    )
}

export default Dash