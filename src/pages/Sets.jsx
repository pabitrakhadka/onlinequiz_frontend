import Layout from '@/Components/Layout'
import McqCard from '@/Components/McqCard';
import { getCategories } from '@/functions/category';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
const Loders = dynamic(() => import("@/Components/Loders"), { ssr: false });
const Sets = () => {
    const router = useRouter();
    const items = Array.from({ length: 10 }, (_, index) => index + 1);
    const clicked = (setNumber) => {

        router.push(`/test_quiz/Set ${setNumber}`);
    };
    const [categorySet, setCategorySet] = useState([]);
    const loadCategorySet = async () => {

        try {
            const res = await getCategories('category=select_set');
            if (res.status === 200) {
                setCategorySet(res.data.data);
            } else {

            }

        } catch (error) {

        }
    }

    useEffect(() => {

        loadCategorySet();

    }, [])

    return (
        <Layout>

            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sets</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {items.map((set, index) => (
                    <McqCard key={index} buttonClick={() => clicked(set)} number={set} />
                ))}
            </div>

        </Layout>
    )
}

export default Sets