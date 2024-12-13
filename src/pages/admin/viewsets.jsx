import DashLayout from '@/Components/DashLayout';
import InputComp from '@/Components/InputComp';
import { Table, Tbody, Td, Th, Thead, Tr } from '@/Components/TableComp';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ButtonComp from '@/Components/ButtonComp';
import { getQuiz } from '@/functions/quiz';

const Loading = dynamic(() => import('@/Components/Loders'), { ssr: false });

const ViewSets = () => {
    const router = useRouter();
    const { categoryId } = router.query;

    const [quizData, setQuizData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadQuiz = async () => {
        try {
            const res = await getQuiz(`categoryId=${categoryId}`);
            if (res.status === 200) {

                setQuizData(res.data.data);
                console.log(res.data.data);
                setLoading(false);
            } else {
                console.error('Failed to fetch quiz data.');
            }
        } catch (error) {
            console.error('Error loading quiz data:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteButtonClick = (id) => {
        alert(`Delete item with ID: ${id}`);
    };

    const updateButtonClick = (id) => {
        alert(`Update item with ID: ${id}`);
    };

    const handleChangeInput = (index, field, value) => {
        setQuizData((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    useEffect(() => {
        if (categoryId) {
            loadQuiz();
            console.log(categoryId);
        } else {
            router.push("/admin/set");
            setLoading(false);
        }
    }, [categoryId]);

    return (
        <DashLayout>
            <div>
                <h1>Set 1 Questions</h1>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Table className="overflow-x-auto border border-gray-300 rounded-md shadow-md">
                        <Thead className="bg-gray-200">
                            <Tr>
                                <Th className="px-4 py-2">S.N</Th>
                                <Th className="px-4 py-2">Question</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {quizData.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    <Tr className="hover:bg-gray-100">
                                        <Td className="border px-4 py-2">{index + 1}</Td>
                                        <Td className="border px-4 py-2">{item.question}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="border px-4 py-2">
                                            <InputComp
                                                onChange={(e) =>
                                                    handleChangeInput(index, 'options[0].text', e.target.value)
                                                }
                                                value={item?.options?.[0]?.text || ''}
                                                label="Option 1"
                                                className="w-full"
                                            />
                                        </Td>
                                        <Td className="border px-4 py-2">
                                            <InputComp
                                                onChange={(e) =>
                                                    handleChangeInput(index, 'options[1].text', e.target.value)
                                                }
                                                value={item?.options?.[1]?.text || ''}
                                                label="Option 2"
                                                className="w-full"
                                            />
                                        </Td>
                                        <Td className="border px-4 py-2">
                                            <InputComp
                                                onChange={(e) =>
                                                    handleChangeInput(index, 'options[2].text', e.target.value)
                                                }
                                                value={item?.options?.[2]?.text || ''}
                                                label="Option 3"
                                                className="w-full"
                                            />
                                        </Td>
                                        <Td className="border px-4 py-2">
                                            <InputComp
                                                onChange={(e) =>
                                                    handleChangeInput(index, 'options[3].text', e.target.value)
                                                }
                                                value={item?.options?.[3]?.text || ''}
                                                label="Option 4"
                                                className="w-full"
                                            />
                                        </Td>
                                        <Td className="border px-4 py-2">
                                            <InputComp
                                                onChange={(e) =>
                                                    handleChangeInput(index, 'answer', e.target.value)
                                                }
                                                value={item.answer || ''}
                                                label="Answer"
                                                className="w-full"
                                            />
                                        </Td>
                                        <Td className="border px-4 py-2">
                                            <ButtonComp
                                                onClick={() => deleteButtonClick(item.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                                name="Delete"
                                            />
                                        </Td>
                                        <Td className="border px-4 py-2">
                                            <ButtonComp
                                                onClick={() => updateButtonClick(item.id)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                                name="Update"
                                            />
                                        </Td>
                                    </Tr>
                                </React.Fragment>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </div>
        </DashLayout>
    );
};

export default ViewSets;
