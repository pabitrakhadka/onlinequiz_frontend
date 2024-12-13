import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import React from 'react';
// import { PDFReader } from 'reactjs-pdf-reader';
// import PDFViewer from 'pdf-viewer-reactjs';
// 
// import { PDFReader } from "reactjs-pdf-reader";
const PdfViewer = ({ fileUrl }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
            {/* <PdfViewer fileUrl={fileUrl} /> */}

            {/* <PDFReader /> */}
        </div>
    );
};

export default PdfViewer;
