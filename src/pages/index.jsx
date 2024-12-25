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
import { getSliderImage } from "@/functions/slider";
import { getSlugs } from "@/functions/slug";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Reviews from "@/Components/User/Reviews";
import ReviewsProfileCard from "@/Components/User/ReviewsProfileCard";
import Modal from "@/Components/Model";
import MyProfile from "@/Components/MyProfile";
import Rating from "@/Components/Rating";
import TextAreaComp from "@/Components/TextAreaComp";
import { getReviews, postReviews } from "@/functions/reviews";
import StatusMessage from "@/Components/StatusMessage";
import { useContext } from "react";
import UserAuthContext from "@/Context/context";
const Loader = dynamic(() => import("@/Components/Loders"), { ssr: false });
export default function Home() {

  const { user, loading } = useContext(UserAuthContext);
  if (loading) {
    return <>loading..</>
  }
  if (!user) {
    return <p>Please log in to access this page.</p>;
  }

  const [statusCode, setStatusCode] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => { setOpen(false); };
  const [slugImage, setSlugImage] = useState({
    slug: "",
    header: "",
    image: "",
    slugLoading: true,
    imageLoading: true,
  });

  const router = useRouter();
  const items = Array.from({ length: 4 }, (_, index) => index + 1);
  const clicked = (setNumber) => {

    router.push(`/test_quiz/Set ${setNumber}`);
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // handle rating changes
  useEffect(() => {

    if (user) {
      console.log(user);
    }
  }, [user])


  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const handleRatingMessage = (event) => {
    setMessage(event.target.value);
  }
  const handleRatingChange = (newRating) => {
    console.log('New Rating:', newRating);
    setRating(newRating);
  };

  //For revies Section
  const [IsModalOpen, setIsModalOpen] = useState(false);


  //hanlde Open Modal

  const OpenModal = () => {
    setIsModalOpen(true);
  }

  // hanlde reviews submit
  const handleReviewsSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(user);
      const data = {
        userId: user?.id,
        content: message,
        rating: rating
      };
      console.log(data);
      const res = await postReviews(data);
      if (res.status == 200) {
        setStatusCode(res.status);
        console.log(res.data);

        CloseModal();
      } else {
        setStatusCode(error.res ? error.res.status : 500);
        console.log("error");
      }

    } catch (error) {
      setStatusCode(error.response ? error.response.status : 500);
      console.log(error)
    }
  }

  //Handle Cloase Modal
  const CloseModal = () => {
    setIsModalOpen(false);
    setMessage("");
  }

  const loadOneImage = async () => {
    try {
      const res = await getSliderImage("data=one"); // Ensure this function is defined
      if (res.status === 200) {
        const data = res.data.data;
        setSlugImage((prev) => ({
          ...prev,
          image: data.fileName,
          imageLoading: false,
        }));
        // console.log("Image data fetched:", data);
      }
    } catch (error) {
      console.error("Error fetching image data:", error);
      setSlugImage((prev) => ({ ...prev, imageLoading: false }));
    }
  };

  // Function to load slug data
  const loadOneSlug = async () => {
    try {
      const res = await getSlugs("data=one"); // Ensure this function is defined
      if (res.status === 200) {
        const data = res.data.data;
        setSlugImage((prev) => ({
          ...prev,
          header: data.title,
          slug: data.description,
          slugLoading: false,
        }));
        // console.log("Slug data fetched:", data);
      }
    } catch (error) {
      console.error("Error fetching slug data:", error);
      setSlugImage((prev) => ({ ...prev, slugLoading: false }));
    }
  };

  // Use `useEffect` to call the functions on mount
  useEffect(() => {
    loadOneImage();
    loadOneSlug();
  }, []);

  return (
    <>
      <Head>
        <title>Online Quiz</title>
        <meta name="description" content="Welcome to our Online Quiz!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>

        <div className="home_screen  h-screen flex flex-col lg:flex-row items-center lg:items-start justify-between bg-blue-50 p-8 lg:p-16 space-y-6 lg:space-y-0 lg:space-x-10">
          {
            slugImage.slugLoading ? <>
              <Loader />

            </> : <>
              <div className="text-center lg:text-left max-w-xl space-y-4">
                <h1 className="text-3xl lg:text-5xl font-bold text-blue-800">
                  {slugImage.header}
                </h1>

                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                  {slugImage.slug}
                </p>
                <div className="flex justify-center lg:justify-start">
                  <Link href={"/test"} className="text-white bg-blue-600 hover:bg-blue-700 text-2xl font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    Start Quiz
                  </Link>
                </div>
              </div>
            </>
          }
          <div className="flex-shrink-0">
            {slugImage.imageLoading ? <>
              <Loader />
            </> : <>  <img src={`http://localhost:3001/upload/images/${slugImage.image}`} alt="Computer Operator" className="w-full max-w-sm rounded-lg shadow-lg border border-gray-200" /></>}
          </div>
        </div>

        <div className="min-h-screen p-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Sets</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((set, index) => (
              <McqCard key={index} buttonClick={() => clicked(set)} number={set} />
            ))}
          </div>
        </div>


        {/* leaboard */}

        <div className="min-h-screen w-full bg-indigo-500 p-4">
          <h1 className="p-3 font-bold text-center text-white text-2xl sm:text-3xl md:text-4xl">Set Wise Leaderboard</h1>

          <div className="flex flex-col sm:flex-row items-center justify-around">
            <Leaderboard userName={"Pabitra Khadka"} rank={1} />
            <Leaderboard userName={"Ram Khadka"} rank={2} />
            <Leaderboard userName={"Shyam Khadka"} rank={3} />
          </div>

          <div className="p-5 m-3">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white hover:bg-gray-50">
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Ram Sharma</td>
                  <td className="px-6 py-4 text-sm text-gray-500">2</td>
                  <td className="px-6 py-4 text-sm text-gray-500">100</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Shyam Thapa</td>
                  <td className="px-6 py-4 text-sm text-gray-500">3</td>
                  <td className="px-6 py-4 text-sm text-gray-500">90</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Sita Rai</td>
                  <td className="px-6 py-4 text-sm text-gray-500">1</td>
                  <td className="px-6 py-4 text-sm text-gray-500">110</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


        {/* reviews section */}
        <div className="min-h-screen p-4">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-black text-center w-full sm:w-auto  ">
              Reviews Section
            </h1>
            <ButtonComp onClick={OpenModal} className="ml-auto mt-2 sm:mt-0" name={'Write Reviews'} />
          </div>
          <Modal isOpen={IsModalOpen} title={"Write Reviews"} onClose={CloseModal}>
            <div>
              <MyProfile />
              <Rating size={25} initialRating={0} onChange={handleRatingChange} />
              <form onSubmit={handleReviewsSubmit}>
                <input className="hidden" name="id" value={user?.id} />
                <TextAreaComp name={'content'} cols={5} rows={5} onChange={handleRatingMessage} value={message} />
                <ButtonComp type={'submit'} name={"Submit"} />
              </form>
            </div>
          </Modal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Reviews />
            <Reviews />
            <Reviews />
          </div>
        </div>




        <StatusMessage statusCode={statusCode} open={open} onClose={handleClose} />
      </Layout>
    </>
  );
}
