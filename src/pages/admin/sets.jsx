import ButtonComp from '@/Components/ButtonComp';
import CardCom from '@/Components/CardCom';
import DashLayout from '@/Components/DashLayout'
import McqCard from '@/Components/McqCard';
import { useRouter } from 'next/router';
import React from 'react'

const sets = () => {
    const router = useRouter();
    const length = 10;
    const items = Array.from({ length: 10 }, (_, index) => index + 1);


    const handleCardClick = (id) => {
        router.push(`/admin/viewsets?categoryId=${id}`);
    }
    const handleCardDelete = (id) => {
        try {

            console.log("id is delete ", id);
        } catch (error) {

        }
    }
    return (
        <DashLayout>
            <div>
                <h1 className='font-bold text-4xl text-blue-600'>Sets Question</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {items.map((item, index) => (
                        <div key={index}>
                            <McqCard>
                                <div>
                                    <ButtonComp name={'View'} className='' onClick={() => handleCardClick(index + 1)} />
                                    <ButtonComp name={'Delete'} className='bg-red-400' onClick={() => handleCardDelete(index + 1)} />

                                </div>
                            </McqCard>
                        </div>
                    ))}
                </div>
            </div>
        </DashLayout>
    )
}

export default sets