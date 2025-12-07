// import React, { createContext, useEffect, useState } from 'react'
// import axios from 'axios'

// export const userDataContext = createContext()

// function UserContext ({children})  {
//     const serverUrl ="http://localhost:8000"
//     const [userData , setUserData] =useState(null)

//     const handleCurrentUser =async ()=>{
//       try {
//          const result = await axios.get(`${serverUrl}/api/user/current` , {withCredentials:true})
//          setUserData(result.data)
//          console.log(result.data)
//       } catch (error) {
//         console.log(error)
        
//       }
//     }
//     useEffect(()=>{
//       handleCurrentUser()
//     },[])

//     const value={
//         serverUrl,userData , setUserData


//     }
//   return (
//     <div>
//         <userDataContext.Provider value={value}>
//         {children}
//         </userDataContext.Provider>
//     </div>
    
//   )
// }

// export default UserContext


import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = useState(null);
  const [frontendfrontendImage, setFrontendFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [selectedImage ,setselectedImage] = useState(null)

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/current`,
        { withCredentials: true }
      );
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    frontendfrontendImage, setFrontendFrontendImage,
    backendImage, setBackendImage,selectedImage ,setselectedImage

  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
