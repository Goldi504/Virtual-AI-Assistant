// import React, { useContext } from 'react'
// import {userDataContext} from '../context/userContext'

// function Home () {
//   const {userData} = useContext(userDataContext)
  
  
//   return (
//     <div
//       className='w-full h-[100vh] bg-gradient-to-t from-[black]
//        to-[#030353d0] flex justify-center items-center flex-col'
//     >
//       <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
//         <img src={userData ?.assistantImage}    className='h-full object-cover'/>

//       </div>
      
//     </div>
//   )
// }

// export default Home

// import React, { useContext } from 'react'
// import { userDataContext } from '../context/userContext'

// function Home() {
//   const { userData } = useContext(userDataContext)

//   return (
//     <div
//       className='w-full h-[100vh] bg-gradient-to-t from-[black]
//        to-[#030353d0] flex justify-center items-center flex-col gap-[15px]'
//     >
//       <div className='w-[300px] h-[400px] flex justify-center 
//       items-center overflow-hidden rounded-4xl shadow-lg'>
//         <img
//           src={userData?.assistantImage}
//           className='h-full object-cover'
//           alt="assistant"
//         />
//       </div>
//       <h1 className='text-white'>I'm {userData.assistantImage}</h1>
//     </div>
//   )
// }

// export default Home

import React, { useContext } from 'react'
import { userDataContext } from '../context/userContext'
import { Navigate } from "react-router-dom";

function Home() {
  const { userData } = useContext(userDataContext)

  // 🔥 prevent null error
  if (!userData) {
    return <Navigate to="/signin" />
  }

  return (
    <div
      className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353d0]
      flex justify-center items-center flex-col gap-[15px]'
    >
      <div className='w-[300px] h-[400px] flex justify-center items-center 
      overflow-hidden rounded-4xl shadow-lg'>
        <img
          src={userData.assistantImage}
          className='h-full object-cover'
          alt="assistant"
        />
      </div>

      <h1 className='text-white text-[28px] font-semibold'>
        I'm {userData.assistantName}
      </h1>
    </div>
  )
}

export default Home
