import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { FaUserEdit } from "react-icons/fa";
import ChangeUserRole from "../components/changeUserRole.jsx";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    role: "",
    name: "",
    userName: "",
    _id: "",
    address: "",
  });

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUsers.url, {
        method: SummaryApi.allUsers.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
        toast.success(dataResponse.data);
      }

      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
      console.log(dataResponse);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="pb-4 bg-green-300">
      <table className="w-full userTable">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>UserID</th>
            <th>Name</th>
            {/* <th>User Name</th>
            <th>Email</th> */}
            <th>Shop Address</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className=" pb-4 bg-green-200">
          {allUsers.map((el, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{el._id}</td>
                <td>{el.name}</td>
                {/* <td>{el.userName}</td>
                <td>{el.email}</td> */}
                <td>{el.address}</td>
                <td>{el.role}</td>
                <td>{moment(el.CreatedAt).format("ll")}</td>
                <td>
                  <button
                    className="rounded-xl cursor-pointer hover:bg-blue-100"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <FaUserEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="bg-red-800">
        {openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            userName={updateUserDetails.userName}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userID={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )}
      </div>
    </div>
  );
};

export default AllUsers;

