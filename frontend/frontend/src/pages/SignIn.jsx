// import React, { useContext } from 'react'
// import bg from '../assets/authBg.png'
// import { IoEye } from "react-icons/io5";
// import { useState } from 'react';
// import { IoEyeOff } from "react-icons/io5";
// import {useNavigate} from 'react-router-dom';
// import { userDataContext } from '../context/userContext';
// import axios from "axios"

// const SignIn = () => {
//     const[showPassword , setShowPassword] =useState(false)
// const {serverUrl} = useContext(userDataContext)
//     const navigate = useNavigate()
//     const[email ,setEmail] = useState("")
//     const [password,setPassword] = useState("")
//     const [err , setErr]= useState("")


//     const handleSignIn = async (e)=>{
//       e.preventDefault()
//       setErr("")
//       setLoading(true)
      
//       try{
//         let result = await axios.post(`${serverUrl}/api/auth/signin` ,
//           {email,password},
//           {withCredentials:true}
//         );
//         console.log(result)
//         setLoading(false)

//      }
//      catch(error){
//         console.log(error)
//         setErr(error.response.data.message)
//         setLoading(false)
//       }
   
// }
 
//  return (
//     <div className='w-full h-[100vh] bg-cover flex justify-center items-center' 
//     style={{backgroundImage:`url(${bg})`}} >
//         <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000069] backdrop-blur shadow-lg shadow-black  flex flex-col items-center justify-center gap-[20px] px-[20px]'  onSubmit={handleSignIn}>

//             <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Sign In to <span className='text-blue-400'>Virtual Assistant</span></h1>

//             <input type='email ' placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[100px] py-[20px] rounded-full' required onChange={(e)=> setEmail(e.target.value)} value={email}>
//             </input>

//             <div className='w-[full] h-[60px] outline-none border-2 border-white bg-transparent  text-white rounded-full text-[15px]'>

//                 <input type={showPassword?"text":'password'} placeholder='Password'className='w-full h-full  outline-none bg -transparent  placeholder-gray-300 px-[140px] py-[20px] rounded-full'required onChange={(e)=> setPassword(e.target.value)} value={password} />

//                 {!showPassword && <IoEye  className='absolute top-[18px] right-[20px] w-[25px] text-[white] h-[25px] text-[white] cursor-pointer' onClick={()=>setShowPassword(true)}/> }

//                     {showPassword && <IoEyeOff  className='absolute top-[18px] right-[20px] w-[25px] text-[white] h-[25px] text-[white] cursor-pointer' onClick={()=>setShowPassword(false)}/> }
                
                

//             </div>
//               {err.length >0 && <p className='text-red-500 text-[17px]'>
//               *{err}
//               </p>}  


//             <button className='min-w-[150px] h-[45px] mt-[50px] bg-white text-black font-semibold rounded-full text-[20px]'disabled={loading} >{loading? "Loading..." : "Sign In"}</button>

//             <p className='text-[white] text-[18px] cursor-pointer' onClick={()=>navigate("/signup")}>Want to create a new account ? <span className='text-blue-500'>Sign Up</span></p>

//         </form>

      
//     </div>
//   )
// }

// export default SignIn



import React, { useContext, useState } from 'react';
import bg from '../assets/authBg.png';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import axios from "axios";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl,useData , setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

     setUserData(result.data)
      setLoading(false);

      // redirect after successful login
      navigate("/");
    } catch (error) {
      console.log(error);
      setUserData(null)
      setLoading(false);

      if (error.response?.data?.message) {
        setErr(error.response.data.message);
      } else {
        setErr("Something went wrong. Please try again!");
      }
    }
  };

  return (
    <div
      className='w-full h-[100vh] bg-cover flex justify-center items-center'
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className='w-[90%] h-[600px] max-w-[500px] bg-[#00000069] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]'
        onSubmit={handleSignIn}
      >
        <h1 className='text-white text-[30px] font-semibold mb-[30px]'>
          Sign In to <span className='text-blue-400'>Virtual Assistant</span>
        </h1>

        <input
          type="email"
          placeholder='Email'
          className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[100px] py-[20px] rounded-full'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className='relative w-full h-[60px] outline-none border-2 border-white bg-transparent text-white rounded-full text-[15px]'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            className='w-full h-full outline-none bg-transparent placeholder-gray-300 px-[100px] py-[20px] rounded-full'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!showPassword && (
            <IoEye
              className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer'
              onClick={() => setShowPassword(true)}
            />
          )}

          {showPassword && (
            <IoEyeOff
              className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer'
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        {err.length > 0 && (
          <p className='text-red-500 text-[17px]'>*{err}</p>
        )}

        <button
          className='min-w-[150px] h-[45px] mt-[50px] bg-white text-black font-semibold rounded-full text-[20px]'
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <p
          className='text-white text-[18px] cursor-pointer'
          onClick={() => navigate("/signup")}
        >
          Want to create a new account ? <span className='text-blue-500'>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
