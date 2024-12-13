import React from "react";
import Layout from "@/Components/Layout";
import Head from "next/head";
import ButtonComp from "@/Components/ButtonComp";
import { FaAngleLeft } from "react-icons/fa6";
import RadioComp from "@/Components/RadioComp";
import { useState } from "react";
import Link from "next/link";
import Leaderboard from "@/Components/Leaderboard";
import McqCard from "@/Components/McqCard";
import { useRouter } from "next/router";
import UserIconLogo from "@/Components/userIconLogo";

export default function Home() {


  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },

  ];
  const router = useRouter();
  const items = Array.from({ length: 4 }, (_, index) => index + 1);
  const clicked = (setNumber) => {

    router.push(`/test_quiz/Set ${setNumber}`);
  };
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
          <div className="flex justify-around w-full h-screen">

            <div className="">

              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sets</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {items.map((set, index) => (
                    <McqCard key={index} buttonClick={() => clicked(set)} number={set} />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* leaboard */}
          <div className="leadboard h-screen w-full bg-indigo-500 ">
            <h1 className="p-3 font-bold text-center text-white font-bold text-4xl">Leaderboard </h1>

            <div className="flex justify-around">
              <Leaderboard userName={"Pabitra Khadka"} rank={1} />
              <Leaderboard userName={"Ram Khadka"} rank={2} />
              <Leaderboard userName={"Shyam Khadka"} rank={3} />
            </div>
            <div className="p-5 m-3">
              {/* <UserIconLogo name="Ram" /> */}
              <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white hover:bg-gray-50">
                    <td scope="col" className="px-6 py-4"></td>
                    <td scope="col" className="px-6 py-4 text-sm font-medium text-gray-900">Ram Sharma</td>
                    <td scope="col" className="px-6 py-4 text-sm text-gray-500">2</td>
                    <td scope="col" className="px-6 py-4 text-sm text-gray-500">100</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td scope="col" className="px-6 py-4"></td>
                    <td scope="col" className="px-6 py-4 text-sm font-medium text-gray-900">Shyam Thapa</td>
                    <td scope="col" className="px-6 py-4 text-sm text-gray-500">3</td>
                    <td scope="col" className="px-6 py-4 text-sm text-gray-500">90</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td scope="col" className="px-6 py-4"></td>
                    <td scope="col" className="px-6 py-4 text-sm font-medium text-gray-900">Sita Rai</td>
                    <td scope="col" className="px-6 py-4 text-sm text-gray-500">1</td>
                    <td scope="col" className="px-6 py-4 text-sm text-gray-500">110</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>



      </Layout>
    </>
  );
}
