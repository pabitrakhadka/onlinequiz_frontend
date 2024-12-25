import ButtonComp from '@/Components/ButtonComp';
import CardCom from '@/Components/CardCom';
import DashLayout from '@/Components/DashLayout'
import McqCard from '@/Components/McqCard';
import { deleteCategory, getCategories } from '@/functions/category';
import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const Loader = dynamic(() => import("@/Components/Loders"), { ssr: false });
const sets = () => {
    const router = useRouter();
    const length = 10;
    const items = Array.from({ length: 10 }, (_, index) => index + 1);
    const [sets, setSets] = useState([]);

    const handleCardClick = (id) => {
        // console.log("id=", id);
        router.push(`/admin/viewsets?categoryId=${id}`);
    }
    const [isloading, setLoading] = useState(true);
    const loadSetId = async () => {
        try {
            const res = await getCategories(`category=select_set`);
            if (res.status === 200) {
                setSets(res.data.data);
                console.log(res.data);

                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleCardDelete = async (id) => {
        try {

            console.log("id is delete ", id);
            const res = await deleteCategory(id);
            if (res.status === 200) {
                alert("This Set is delete !");
            }
            setSets((pre) => pre.filter((setid) => setid !== id));

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadSetId();
    }, [])

    return (
        <DashLayout>
            <div>
                <h1 className='font-bold text-4xl text-blue-600'>Sets Question</h1>
                {isloading ? <>
                    <div>
                        <Loader />
                    </div>
                </> : <>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                        {sets.map((item, index) => (
                            <div key={index}>
                                <McqCard number={item.categoryName} >
                                    <div>
                                        <ButtonComp name={'View'} className='' onClick={() => handleCardClick(item.id)} />
                                        <ButtonComp name={'Delete'} className='bg-red-400' onClick={() => handleCardDelete(item.id)} />

                                    </div>
                                </McqCard>
                            </div>
                        ))}
                    </div>
                </>}
            </div>
        </DashLayout>
    )
}

export default sets