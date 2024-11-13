import React from "react";
import Layout from "@/Components/Layout";
import Head from "next/head";
import ButtonComp from "@/Components/ButtonComp";
import { FaAngleLeft } from "react-icons/fa6";
import RadioComp from "@/Components/RadioComp";
import { useState } from "react";
import Link from "next/link";

export default function Home() {

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },

  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <Head>
        <title>Restaurant</title>
        <meta name="description" content="Welcome to our restaurant!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>

        <div className="home_screen  h-screen flex flex-col lg:flex-row items-center lg:items-start justify-between bg-blue-50 p-8 lg:p-16 space-y-6 lg:space-y-0 lg:space-x-10">
          <div className="text-center lg:text-left max-w-xl space-y-4">
            <h1 className="text-3xl lg:text-5xl font-bold text-blue-800">
              Master Computer Skills with Our Online Computer Operator Quiz!
            </h1>

            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
              Ready to level up your computer skills? Our Computer Operator Online Quiz is designed to help you assess and enhance your knowledge in essential computer operations. Dive into a variety of topics, from basic software applications to advanced IT concepts, and track your progress with each quiz attempt. Whether you're preparing for a job, an exam, or simply looking to improve your computer expertise, this interactive quiz offers a fun and effective way to learn. Start today and unlock the skills you need to succeed in the digital world!
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link href={"/test"} className="text-white bg-blue-600 hover:bg-blue-700 text-2xl font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                Start Quiz
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img src="./computeroperator.png" alt="Computer Operator" className="w-full max-w-sm rounded-lg shadow-lg border border-gray-200" />
          </div>
        </div>
        <div>
          <h1>Recents</h1>
          <div className="flex justify-around ">
            <div className="">
              <h1>Sets</h1>
            </div>
            <div>
              <h1>Subjective Questions</h1>
            </div>
            <div>
              <h1>Past Question</h1>
            </div>
          </div>
        </div>



      </Layout>
    </>
  );
}
