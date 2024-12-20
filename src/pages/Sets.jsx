import Layout from '@/Components/Layout'
import McqCard from '@/Components/McqCard';
import { getCategories } from '@/functions/category';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Pagination from '@/Components/Pagination';
const Loders = dynamic(() => import("@/Components/Loders"), { ssr: false });
const Sets = () => {
    const router = useRouter();
    // const items = Array.from({ length: 10 }, (_, index) => index + 1);
    const [isLoading, setLoading] = useState(true);

    //Paginatino
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const handleNextPage = (page) => {
        setCurrentPage(page);
    }
    // const [sets, setSets] = useState([]);
    const clicked = (categoryId) => {

        console.log("set number", categoryId);
        router.push(`/test_quiz/${categoryId}`);
    };

    const [categorySet, setCategorySet] = useState([]);
    const loadCategorySet = async () => {

        try {
            const res = await getCategories('category=select_set');
            if (res.status === 200) {
                setCategorySet(res.data.data);
                console.log("res.data lot categoryset.", res.data);
                setTotalPage(res.data.totalSet);
                setLoading(false);
            } else {

            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        loadCategorySet();

    }, [currentPage])

    return (
        <Layout>

            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sets</h1>
            {isLoading ? <>
                <div>
                    <Loders />
                </div>
            </> : <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {categorySet.map((set, index) => (
                        <McqCard key={index} onClick={() => clicked(set.id)} number={set.categoryName} />
                    ))}
                </div>

            </>}

            <div>
                <Pagination currentPage={currentPage} onPageChange={handleNextPage} totalPages={totalPage} />
            </div>
        </Layout>
    )
}

export default Sets