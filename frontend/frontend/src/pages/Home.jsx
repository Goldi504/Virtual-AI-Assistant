"use client";
import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const { userData, serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  console.log(`user data`, userData);

  const handleLogOut = async () => {
    try {
      await axios.get(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setUserData(null);
      navigate("/signup");
    }
  };

  return (
    <div
      className="w-full h-screen bg-linear-to-t from-[black] to-[#030353d0]
      flex justify-center items-center flex-col gap-[15px]"
    >
      {userData ? (
        <>
          <button
            className="min-w-[150px] h-[45px] mt-[50px] bg-white text-black absolute top-[20px] right-[20px] font-semibold  cursor-pointer rounded-full text-[20px]"
            onClick={handleLogOut}
          >
            Log Out
          </button>
          <button
            className="min-w-[150px] h-[45px] mt-[50px] bg-white text-black absolute top-[80px] right-[10px] curson-pointer font-semibold rounded-full text-[20px] px-[20px] py-[10px]"
            onClick={() => navigate("/customize")}
          >
            Customize your Assistance
          </button>

          <div
            className="w-[300px] h-[400px] flex justify-center items-center 
        overflow-hidden rounded-4xl shadow-lg"
          >
            <img
              src={userData?.assistantImage ?? "falback.jpg"}
              className="h-full object-cover"
              alt="assistant"
            />
          </div>

          <h1 className="text-white text-[28px] font-semibold">
            I'm {userData?.assistantName}
          </h1>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl font-bold">
            Welcome to Your Personalized Virtual Assistant
          </h1>
          <Link
            to={"/signin"}
            className="bg-cyan-500 p-2 rounded-full my-4 font-semibold text-xl hover:bg-cyan-600 transition-all ease-in-out duration-500"
          >
            Login Now!
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
