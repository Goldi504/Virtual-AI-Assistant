// import React, { useRef, useState } from 'react';
// import Cards from '../components/Card';
// import image1 from "../assets/image1.png";
// import image2 from "../assets/image2.jpg";
// import image3 from "../assets/authBg.png";
// import image4 from "../assets/image4.png";
// import image5 from "../assets/image5.png";
// import image6 from "../assets/image6.jpeg";
// import image7 from "../assets/image7.jpeg";
// import { RiImageAddLine } from "react-icons/ri";

// function Customize() {
//   const [frontendfrontendImage , setFrontendFrontendImage] =useState(null)
//   const [backendImage , setBackendImage] =useState(null)
//   const inputImage = useRef()

//   const handleImage=(e)=>{
//     const file = e.target.files[0]
//     setBackendImage(file)
//     setFrontendFrontendImage(URL.createObjectURL(file))


//   }
//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353d0] flex justify-center items-center flex-col p-[20px] '>
//       <h1 className='text-white mb-[40px] text-[30px] text-center'>Select your <span className='text-blue-200'>Assistant Image</span></h1>
//       <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-8'>
//         <Cards image={image1} />
//         <Cards image={image2} />
//         <Cards image={image3} />
//         <Cards image={image4} />
//         <Cards image={image5} />
//         <Cards image={image6} />
//         <Cards image={image7} />
//         <div className='w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff65]
//          rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 
//          cursor-pointer hover:border-white flex items-center justify-center ' onClick={()=>inputImage.current.click()}>
//            {!frontendfrontendImage && <RiImageAddLine  className=' text-white w-[25px] h-[25px] '/>}
//             {!frontendfrontendImage && <img src={frontendfrontendImage} className='h-full object-cover'/>}
         

//        </div>
//        <input type="file" accept='image/*'  ref={inputImage} hidden  onChange={handleImage}/>
       
//         </div>
//         <button className='min-w-[80px] h-[50px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px] '>Next 

//        </button>
//     </div>
//   );
// }

// export default Customize;

import React, { useContext, useRef, useState } from 'react';
import Cards from '../components/Card';
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

function Customize() {

  const { serverUrl,
    userData,
    setUserData,
    frontendfrontendImage, setFrontendFrontendImage,
    backendImage, setBackendImage,selectedImage ,setselectedImage} = useContext(userDataContext)
const navigate = useNavigate()
  
   const inputImage = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendFrontendImage(URL.createObjectURL(file));
  };

  return (
  <div 
    className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353d0] flex justify-center items-center flex-col p-[20px] '>
      <h1 className='text-white mb-[40px] text-[30px] text-center'>
        <IoMdArrowRoundBack  className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' 
        onClick={()=>navigate("/customize")}/>
        Select your <span className='text-blue-200'>Assistant Image</span>
      </h1>

      <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-8'>
        <Cards image={image1} />
        <Cards image={image2} />
        <Cards image={image3} />
        <Cards image={image4} />
        <Cards image={image5} />
        <Cards image={image6} />
        <Cards image={image7} />

        {/* Upload Image Card */}
        <div
  className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff65]
  rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 
  cursor-pointer hover:border-white flex items-center justify-center 
  ${selectedImage == "input " ? "border-4 border-white shadow-2xl shadow-blue-950" : null}`}
  onClick={() => {
    inputImage.current.click();
    setselectedImage("input");
  }}
>
  {!frontendfrontendImage && (
    <RiImageAddLine className='text-white w-[25px] h-[25px]' />
  )}

  {frontendfrontendImage && (
    <img
      src={frontendfrontendImage}
      alt="preview"
      className='w-full h-full object-cover'
    />
  )}
</div>


        <input
          type="file"
          accept='image/*'
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>
      {selectedImage  && <button className='min-w-[80px] h-[50px] mt-[30px]
       text-black font-semibold cursor-pointer bg-white rounded-full text-[19px]' onClick={()=>navigate ("/customize2")}>
        Next
      </button>
}


      
    </div>
  );

}
export default Customize;
