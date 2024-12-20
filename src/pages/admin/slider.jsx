import ButtonComp from '@/Components/ButtonComp'
import CardCom from '@/Components/CardCom'
import DashLayout from '@/Components/DashLayout'
import ErrorText from '@/Components/ErrorText'
import FileInputComp from '@/Components/FileInputComp'
import InputComp from '@/Components/InputComp'
import Modal from '@/Components/Model'
import { deleteSliderImage, getSliderImage, postSliderImage, putSliderImage } from '@/functions/slider'
import { deleteSlug, getSlugs, postSlug, putSlug } from '@/functions/slug'
import { slugSchema } from '@/validate'
import { useFormik } from 'formik'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import dynamic from 'next/dynamic'
const Loders = dynamic(() => import("@/Components/Loders"), { ssr: false });
const initialValues = {
    title: "",
    description: ""
}
const slider = () => {
    const [loading, setLoading] = useState({
        image: true,
        slug: true
    });
    const [IsEdit, setIsEdit] = useState(false);
    const [EditId, setEditId] = useState(null);
    // const []
    const [images, setImages] = useState([]);
    const [slugs, setSlugs] = useState([]);
    const [IsModalOpen, setIsModalOpen] = useState(false);
    // const [IsModalClose, setIsModalClose] = useState(false);

    const isOpen = (isTrue) => {

        if (isTrue) {
            setIsModalOpen(true);
            setIsImageModal(true);
        } else {
            setIsImageModal(false);
            setIsModalOpen(true);
        }
    }
    const isClose = (isTrue) => {
        if (isTrue) {

            setImage("");
        } else {
            values.title = "";
            values.description = "";
        }
        setIsModalOpen(false);



    }
    const [image, setImage] = useState('');
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file); // Store the actual file for submission

        }
    };

    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: slugSchema,
        onSubmit: async (values) => {

            try {
                const res = EditId ? await putSlug(EditId, values) : await postSlug(values);

                if (res.status === 200) {

                    alert(res.data.message);
                    isClose();
                } else {
                    alert(res.data.message);
                }
            } catch (error) {
                console.log("err", error);

            }
        }
    })
    const [showImage, setShowImage] = useState();

    const handleSubmits = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("image", image);


            const res = IsEdit ? await putSliderImage(EditId, formData) : await postSliderImage(formData);
            if (res.status === 200) {
                alert(res.data.message);
                isClose();
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            alert(error);
            console.log("errr", error);
        }
    }
    const loadImages = async () => {
        try {
            const res = await getSliderImage("");
            if (res.status === 200) {
                console.log("res image data=", res.data);
                setImages(res.data);
                loading.image = false;

            }
        } catch (error) {
            console.log(error);
        }
    }
    const loadSlugs = async () => {
        try {
            const res = await getSlugs('');
            if (res.status === 200) {
                console.log("res image data=", res.data);
                setSlugs(res.data);
                loading.slug = false;
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadImages();
        loadSlugs();
    }, [])

    const [isImageModal, setIsImageModal] = useState(false);
    //edit Image
    const editImage = (id) => {
        setIsEdit(true);
        setEditId(id);
        setIsModalOpen(true);

    }
    //delete DeletImage
    const delteImage = async (id) => {
        try {
            const res = await deleteSliderImage(id);
            if (res.status === 200) {
                alert(res.data.message);
                setImages((item) => item.filter((imageId) => imageId.id != id));
            }
        } catch (error) {
            alert(error);
        }
    }

    //edit Image
    const EdiSlugButton = async (id) => {

        try {
            const res = await getSlugs(id);
            if (res.status === 200) {
                console.log('res slug id=', res.data);
                values.title = res.data.title;
                values.description = res.data.description;
                setIsEdit(true);
                setEditId(id);
                setIsModalOpen(true);
                setIsImageModal(false);
            }
        } catch (error) {
            alert(res.data.message);
        }

    }
    //delete DeletImage
    const delteSlugButton = async (id) => {
        try {
            const res = await deleteSlug(id);
            if (res.status === 200) {
                alert(res.data.message);
                setSlugs((item) => item.filter((imageId) => imageId.id != id));
            }
        } catch (error) {
            alert(error);
        }
    }
    return (
        <DashLayout>
            <div className='flex gap-4'>
                <div className=' flex-1 border-r-4 h-screen' >
                    <div>
                        <ButtonComp onClick={() => isOpen(true)} name={'Upload Image'} />
                    </div>
                    <div>
                        <Modal isOpen={IsModalOpen} title={"Upload Slider Image"} onClose={isClose}>
                            <div>
                                <form onSubmit={isImageModal ? handleSubmits : handleSubmit}>
                                    {isImageModal ? <>
                                        <div>
                                            {image ? <></> : <><FileInputComp name={"image"} onChange={onImageChange} accept={".jpg,.jpeg,.png"} /></>}
                                            {image && <img className='w-full h-48 object-contain p-2' alt="Preview" height={100} width={100} src={URL.createObjectURL(image)} />}
                                        </div>
                                    </> : <>
                                        <div>
                                            <InputComp name={'title'} onBlur={handleBlur} onChange={handleChange} label={"Title"} value={values.title} />
                                            {errors.title && touched.title && (
                                                <ErrorText text={errors.title} />
                                            )}
                                        </div>
                                        <div>
                                            <InputComp name={'description'} onBlur={handleBlur} onChange={handleChange} label={"Description"} value={values.description} />
                                            {errors.description && touched.description && (
                                                <ErrorText text={errors.description} />
                                            )}
                                        </div>
                                    </>}
                                    <div>
                                        <ButtonComp onClick={isClose} name={"Close"} isPositive={false} />
                                        {isImageModal ? <>
                                            {image ? <>    <ButtonComp type={'submit'} name={"Submit"} /></> : <></>}
                                        </> : <>

                                            <ButtonComp type={'submit'} name={"Submit"} />
                                        </>}


                                    </div>
                                </form>
                            </div>
                        </Modal>
                    </div>

                    <div>
                        <h1>Show Imagez</h1>

                        <div className='grid grid-cols-4 gap-5' >
                            {
                                loading.image ? <>

                                    <Loders />
                                </> : <>{images && images.length > 0 ? <>
                                    {images.map((item) => (
                                        <CardCom key={item.id}>
                                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.fileName}`} alt="Slider" />

                                            <div>
                                                <ButtonComp name={"Edit"} onClick={() => editImage(item.id)} />
                                                <ButtonComp name={"Delete"} isPositive={false} onClick={() => delteImage(item.id)} />

                                            </div>
                                        </CardCom>
                                    ))}
                                </> : <>
                                    <p>No Image Found</p>
                                </>}</>
                            }
                        </div>
                    </div>
                </div>
                <div className='flex-1'>
                    <div>
                        <ButtonComp onClick={() => isOpen(false)} name={"Add Slug"} />
                    </div>

                    <div>
                        <h1>Slog</h1>

                        <div className='grid grid-rows-4-3 gap-4'>
                            {loading.slug ? <>
                                <Loders />
                            </> : <>{slugs && slugs.length > 0 ? <>

                                {
                                    slugs.map((item) => (
                                        <CardCom key={item.id} className={'p-5'} >

                                            <h1 className='font-bold '>{item.title}</h1>
                                            <p>{item.description}</p>

                                            <div>
                                                <ButtonComp name={"Edit"} onClick={() => EdiSlugButton(item.id)} />
                                                <ButtonComp name={"Delete"} isPositive={false} onClick={() => delteSlugButton(item.id)} />

                                            </div>
                                        </CardCom>
                                    ))
                                }
                            </> : <></>}</>}
                        </div>
                    </div>
                </div>
            </div>
        </DashLayout>
    )
}

export default slider