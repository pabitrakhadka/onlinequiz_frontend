import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/Components/Layout';
import { getPdfQuestions } from '@/functions/subjective';
import PdfViewer from '@/Components/PdfViewer';
import { PdfViewModal } from '@/Components/Model';

const SubjectiveQuestion = () => {
    const router = useRouter();
    const { title } = router.query;

    const [pdfFile, setPdfFile] = useState(null);

    const loadPdfFile = async () => {
        try {

            const res = await getPdfQuestions(`category=${title}`);
            if (res.status === 200 && res.data?.data?.fileName) {
                const fileUrl = res.data.data.fileName;
                console.log('Loaded PDF URL:', fileUrl);
                setPdfFile(fileUrl);

            } else {
                console.error('PDF file not found in response.');
            }
        } catch (error) {
            console.error('Error loading PDF file:', error);
        }
    };

    useEffect(() => {
        if (title) {
            console.log('Category title:', title);
            loadPdfFile();
        }
    }, [title]);
    const [openModal, setModal] = useState(true);

    const handleCloseModal = () => {
        setModal(false);
        router.push('/subjective_question');
        // setSelectedPdf(null);
    };
    return (
        <Layout>
            <h1 className="text-4xl font-bold text-blue-800 text-center mb-10">Subjective Question{title}</h1>
            <div className="pdf-reader">
                {pdfFile ? (

                    <PdfViewModal isOpen={openModal} onClose={handleCloseModal} title={title} fileUrl={pdfFile}>

                    </PdfViewModal>
                    // <PdfViewer fileUrl="https://www.orimi.com/pdf-test.pdf" />
                    // <PdfViewer fileUrl={`${process.env.NEXT_PUBLIC_API_URL}/upload/pdf/${pdfFile}`} />
                ) : (
                    <p>Loading PDF...</p>
                )}
            </div>
        </Layout>
    );
};

export default SubjectiveQuestion;
