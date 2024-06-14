import React, { useState } from "react";
import ROLE from "../common/role";
import { AiOutlineCloseCircle } from "react-icons/ai";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, userID, email, role, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: userRole,
        userID: userID,
      }),
    });

    const responseData = await fetchResponse.json();
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
    console.log("RoleUpdated            ,", responseData);
  };

  return (
    <div className=" fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-blue-300 bg-opacity-70">
      <div className=" mx-auto bg-white shadow p-4 w-full max-w-sm rounded-lg">
        <button className=" block ml-auto" onClick={onClose}>
          <AiOutlineCloseCircle />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name: {name} </p>
        <p>Email: {email}</p>

        <div className=" flex items-center justify-between my-4 ">
          <p>Role</p>

          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="w-fit mx-auto block border py-1 px-3 rounded-full bg-blue-600 text-white hover:bg-blue-500"
          onClick={updateUserRole}
        >
          Change User
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;

// import React from 'react'

// const changeUserRole = () => {
//   return (
//     <div className=' bg-purple-300 fixed top-0 bottom-0 left-0 right-0 w-full h-full  z-10 flex justify-center items-center'>
//           <div className=' '>
//             <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
//             <p>Name: PathumLakruwan </p>
//             <p>Email: Pathum@gmail.com</p>
//           </div>

//           <select className='border px-4 '>
//             {
//               Object.values(ROLE).map(el =>{
//                 return(
//                   <option value={el} key={el}>{el}</option>
//                 )
//               })
//             }
//           </select>
//     </div>
//   )
// }

// export default changeUserRole

// import React from 'react'

// export default function changeUserRole() {
//   return (
//     <div className='absolute w-full h-full z-10 flex justify-center items-center'>
//       <h1>Change User Role</h1>
//     </div>
//   )
// }
