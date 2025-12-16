
// import React, { useContext } from "react";
// import { userDataContext } from "../context/userContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Home() {
//   const { userData , serverUrl, setUserData} = useContext(userDataContext);
//   const navigate = useNavigate();
//   const handleLogOut =async()=>{
//     try {
//       const result = await axios.get(`${serverUrl}/api/auth/logout` ,{withCredentials:true})
//       setUserData(null)
//       navigate("/signin")
      
//     } catch (error) {
//       console.log(error)
//       setUserData(null)
      
//     }

//   }

//   return (
//     <div
//       className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353d0]
//       flex justify-center items-center flex-col gap-[15px]"
//     >
//       <button
//         className="min-w-[150px] h-[45px] mt-[50px] bg-white text-black absolute top-[20px] right-[20px] font-semibold rounded-full text-[20px]"
//       onClick={handleLogOut}>
//         Log Out
//       </button>

//       <button
//         className="min-w-[150px] h-[45px] mt-[50px] bg-white text-black absolute top-[80px] right-[10px] font-semibold rounded-full text-[20px] px-[20px] py-[10px]"
//         onClick={() => navigate("/customize")}
//       >
//         Customize your Assistance
//       </button>

//       <div
//         className="w-[300px] h-[400px] flex justify-center items-center 
//         overflow-hidden rounded-4xl shadow-lg"
//       >
//         <img
//           src={userData?.assistantImage}
//           className="h-full object-cover"
//           alt="assistant"
//         />
//       </div>

//       <h1 className="text-white text-[28px] font-semibold">
//         I'm {userData?.assistantName}
//       </h1>
//     </div>
//   );
// }

// export default Home;

import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//import { getGeminiResponse } from "../gemini/gemini";

function Home() {
  const { userData, serverUrl, setUserData , getGeminiResponse} = useContext(userDataContext);
  const navigate = useNavigate();
  console.log(`user data`, userData);
  
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setUserData(null);
      navigate("/signup");
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    const query = encodeURIComponent(userInput);

    if (type === "google-search")
      window.open(`https://www.google.com/search?q=${query}`, "_blank");

    if (type === "calculator-open")
      window.open(`https://www.google.com/search?q=calculator`, "_blank");

    if (type === "instagram-open")
      window.open("https://www.instagram.com/", "_blank");

    if (type === "facebook-open")
      window.open("https://www.facebook.com/", "_blank");

    if (type === "weather-show")
      window.open(`https://www.google.com/search?q=weather`, "_blank");

    if (type === "youtube-search" || type === "youtube-play")
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
  };

  useEffect(() => {
    if (!userData?.assistantName) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognitionRef.current=recognition

    const isRecognizingRef={current:false}
    const safeRecognition=()=>{
      if(!isRecognizingRef && !isRecognizingRef){
       try {
         recognition.start()
         console.log("Recognition requested to start");
       } catch (error) {
        if(error.name !== " InvalidStateError"){
          console.error("Start error:" ,err);
        }
       }
      }
    }

    recognition.onresult = async (e) => {
      const transcript =
        e.results[e.results.length - 1][0].transcript.trim();

      console.log("Heard:", transcript);

      if (
        transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
      ) {
        const data = await getGeminiResponse(transcript);
        handleCommand(data);
      }
    };

    

    return () => recognition.stop();
  }, [userData]);

  return (
    <div
      className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353d0]
      flex justify-center items-center flex-col gap-[15px]"
    >
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
          src={userData?.assistantImage??'falback.jpg'}
          className="h-full object-cover"
          alt="assistant"
        />
      </div>

      <h1 className="text-white text-[28px] font-semibold">
        I'm {userData?.assistantName}
      </h1>
    </div>
  );
}

export default Home;
