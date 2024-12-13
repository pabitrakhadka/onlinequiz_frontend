import ButtonComp from '@/Components/ButtonComp'
import DashLayout from '@/Components/DashLayout'
import InputComp from '@/Components/InputComp'
import Modal from '@/Components/Model'
import { deleteCategory, getCategories, postCategory, putCategory } from '@/functions/category'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Table, Tbody, Td, Th, Thead, Tr } from '@/Components/TableComp'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { categorySchema } from '@/validate'
import ErrorText from '@/Components/ErrorText'
import { AiOutlineClose } from 'react-icons/ai'
import IconComp from '@/Components/IconComp'
const Loders = dynamic(() => import('@/Components/Loders'), { ssr: false });
const initialValues = {
    categoryName: ""
};
const category = () => {
    const [isModelOpen, setModelOpen] = useState(false);
    const closeModel = () => setModelOpen(false);
    const openModel = () => setModelOpen(true);
    const [categoryData, setCategoryData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isEdit, setEdit] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    const toggleEdit = (id, currentName) => {
        setEditingCategoryId((prevId) => (prevId === id ? null : id)); // Toggle edit mode for specific category
        setEditedCategoryName(currentName);
    };
    const [editedCategoryName, setEditedCategoryName] = useState('');

    const handleChangeInput = (e) => {
        setEditedCategoryName(e.target.value); // Update the category name as the user types
    };


    const handleUpdate = async (id) => {
        try {
            const res = await putCategory({ id: id, categoryName: editedCategoryName });
            if (res.status === 200) {
                // Handle success (e.g., show success toast and reset editing state)
                toast.success('Category updated successfully');
                setEditingCategoryId(null); // Exit edit mode
            }
        } catch (error) {
            console.log(error);
        }
    };


    const loadCategory = async () => {
        try {
            const res = await getCategories("");
            if (res.status === 200) {
                console.log(res.data.data);
                setCategoryData(res.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadCategory();
    }, [])
    //Category Delete
    const deleteCategoryButton = async (id) => {
        try {
            const res = await deleteCategory(id);
            if (res.status === 200) {
                toast.success(`${res.data.message}`);
                setCategoryData((prevCategoryData) =>
                    prevCategoryData.filter((item) => item.id !== id)
                );
            }
        } catch (error) {
            console.log(error);
        }
    }
    //
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik(({
        initialValues: initialValues,
        validationSchema: categorySchema,
        onSubmit: async (values) => {
            try {


                const res = await postCategory(values);
                if (res.status === 200) {
                    // Handle success (e.g., show success toast and reset editing state)
                    toast.success('Category updated successfully');
                    values.categoryName = "";
                    closeModel();
                } else {
                    toast.warn(`${res.data.message}`);
                    closeModel();
                }
            } catch (error) {
                console.log(error);
                closeModel();
            }
        }
    }))
    return (
        <DashLayout>
            <div>
                <ButtonComp onClick={openModel} name={"Add Category"} />
                <div>
                    <h1>Category</h1>
                    {isLoading ? <>
                        <Loders />
                    </> : <>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>S.N</Th>
                                    <Th>ID</Th>
                                    <Th>Category name</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {categoryData && categoryData.map((item, index) => (
                                    <Tr key={item.id}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item.id}</Td>
                                        <Td>
                                            {editingCategoryId === item.id ? (
                                                // Show input field when editing
                                                <InputComp
                                                    value={editedCategoryName}
                                                    onChange={handleChangeInput} // Update state on input change
                                                />
                                            ) : (
                                                // Show category name when not editing
                                                <>{item.categoryName}</>
                                            )}
                                        </Td>
                                        <Td>
                                            {editingCategoryId === item.id ? (
                                                // Show "Update" button when in edit mode

                                                <>
                                                    <ButtonComp
                                                        name={"Update"}
                                                        onClick={() => handleUpdate(item.id)} // Update the category
                                                    />
                                                    <IconComp icon={<AiOutlineClose size={18} />}
                                                        name={"Cancel"}
                                                        onClick={() => setEditingCategoryId(null)} // Update the category
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    {/* Show "Edit" and "Delete" buttons when not in edit mode */}
                                                    <ButtonComp onClick={() => toggleEdit(item.id, item.categoryName)} name={"Edit"} />
                                                    <ButtonComp onClick={() => deleteCategoryButton(item.id)} className='bg-red-500' name={'Delete'} />
                                                </>
                                            )}
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>

                        </Table>
                    </>}
                </div>
            </div>
            <div>
                <Modal isOpen={isModelOpen} onClose={closeModel} title={"Add Category"}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <InputComp name={'categoryName'} onBlur={handleBlur} onChange={handleChange} label={"Category Name"} value={values.categoryName} />
                                {errors.categoryName && touched.categoryName ? <>
                                    <ErrorText text={errors.categoryName} />
                                </> : <></>}
                            </div>
                            <div>
                                <ButtonComp name={"Close"} onClick={closeModel} type={'button'} className='bg-red-400' />
                                <ButtonComp name={"Submit"} type={"submit"} />
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </DashLayout>
    )
}

export default category