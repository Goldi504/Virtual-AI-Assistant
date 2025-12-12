"use client";
import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.png";

function Customize2() {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useContext(userDataContext);

  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleUpdateAssistant = async (e) => {
    e.preventDefault();
    console.log(`Personalizing assistaant...`);

    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else if (selectedImage) {
        formData.append("imageUrl", selectedImage);
        setLoading(false);
      } else {
        formData.append("imageUrl", image1);
      }
      formData.forEach((key, vlaue) => {
        console.log(key, " : ", vlaue);
      });

      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true }
      );

      console.log(result.data);
      setUserData(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
       w-full h-screen bg-linear-to-t
     from-[black] to-[#030353d0]
      flex justify-center items-center flex-col p-5
     `}
    >
      <IoMdArrowRoundBack
        className="absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer"
        onClick={() => navigate("/customize")}
      />
      <h1 className="text-white mb-10 text-[30px] text-center">
        Enter Your <span className="text-blue-200">Assistant Name</span>
      </h1>

      <input
        type="text"
        placeholder="eg.shifra"
        className="w-full max-w-[600px] h-[60px] outline-none border-2
           border-white bg-transparent text-white
           placeholder-gray-300 px-[100px] py-5 rounded-full"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />
      {assistantName && (
        <button
          className="min-w-[300px] h-[60px] mt-[30px]
              text-black font-semibold cursor-pointer bg-white rounded-full text-[19px] disabled:cursor-not-allowed"
          disabled={loading}
          onClick={handleUpdateAssistant}
        >
          {!loading ? "Finally Create Your Assistant" : "Loading..."}
        </button>
      )}
    </div>
  );
}

export default Customize2;
