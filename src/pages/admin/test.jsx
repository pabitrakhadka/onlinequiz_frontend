import React from 'react'
import Papa from 'papaparse'
import DashLayout from '@/Components/DashLayout'
import FileInputComp from '@/Components/FileInputComp'
import { useState } from 'react'
import ButtonComp from '@/Components/ButtonComp'

const test = () => {

    const [fileData, setFileData] = useState("");
    const [jsonData, setJsonData] = useState([]);


    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (!file || file.type !== "text/csv") {
            console.log("Please upload a valid CSV file.");
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target.result;
            console.log("File Content:", text); // Log raw text for debugging
            setFileData(text);
            parseCsvToJson(text);
        };

        reader.readAsText(file, "UTF-8"); // Ensure UTF-8 encoding
    };

    const parseCsvToJson = (text) => {
        const result = Papa.parse(text, {
            header: false, // Adjust based on CSV structure
            skipEmptyLines: true, // Skip empty lines
        }).data;

        const jsonData = result.map((row, index) => {
            // Validate row length and fields
            if (row.length < 6) {
                console.log(`Row ${index + 1} is invalid: ${row}`);
                return null; // Skip invalid rows
            }

            const [question, optionA, optionB, optionC, optionD, category] = row.map((cell) =>
                cell.trim() // Trim whitespace from all cells
            );

            return {
                question: question || "N/A", // Fallback if empty
                options: [
                    optionA || "N/A",
                    optionB || "N/A",
                    optionC || "N/A",
                    optionD || "N/A",
                ],
                answer: "", // Default answer is blank
                category: category || "Uncategorized", // Default category
                description: "", // Default description
            };
        }).filter(Boolean); // Remove `null` rows from the array

        setJsonData(jsonData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Parsed JSON Data:", jsonData);
        // Add logic to send JSON data to an API or process it further
    };

    return (
        <DashLayout>
            <div>
                {jsonData && (
                    <div>
                        <h2>Converted JSON:</h2>
                        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                    </div>
                )}
                <form action="">
                    <div>
                        <FileInputComp name={'file'} onChange={handleFileUpload} accept={'text/csv'} />
                        <ButtonComp name={"Submit"} onClick={handleSubmit}></ButtonComp>
                    </div>
                </form>
            </div>
        </DashLayout>
    )
}

export default test