import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'

function Cards ({image})  {
  const { serverUrl,
      userData,
      setUserData,
      frontendfrontendImage, setFrontendFrontendImage,
      backendImage, setBackendImage,selectedImage ,setselectedImage} = useContext(userDataContext)
  
  return (
  <div
    className={`w-[80px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff65]
    rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer
    hover:border-white ${selectedImage === image ? "border-4 border-white shadow-2xl shadow-blue-950" : null}`}
    onClick={() => {
      setselectedImage(image)
      setBackendImage(null)
      setFrontendFrontendImage(null)
    }}

  >
    <img src={image} className='h-full object-cover' />
  </div>
)

}

export default Cards
