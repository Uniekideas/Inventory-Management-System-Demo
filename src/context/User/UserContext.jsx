import { React, createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();
export default UserContext;

export const UsersProvider = ({ children }) => {
  const [getUsersData, setGetUsersData] = useState(null);
  const [getUsersError, setGetUsersError] = useState(null);
  const [getUsersIsLoading, setGetUsersIsLoading] = useState(true);

  const [getSingleUserData, setGetSingleUserData] = useState(null);
  const [getSingleUserError, setSingleUserError] = useState(null);
  const [getSingleUserIsLoading, setSingleUserIsLoading] = useState(true);

  const [addUserError, setAddUserError] = useState(null);
  const [addUserIsLoading, setAddUserIsLoading] = useState(true);
  const [addUserResponse, setAddUserResponse] = useState(null);

  const [userStatusResponse, setUserStatusResponse] = useState(null);
  const [userStatusError, setUserStatusError] = useState(null);
  const [userStatusIsLoading, setUserStatusIsLoading] = useState(true);

  const [editUserResponse, seteditUserResponse] = useState(null);
  const [editUserError, seteditUserError] = useState(null);
  const [editUserIsLoading, seteditUserIsLoading] = useState(true);
  const [editedFormData, seteditedFormData] = useState({
    name: "",
    username: "",
    oracle_id: "",
    email: "",
    phone_number: "",
    level: "",
    image: "",
    role: "",
    department: "",
  });

  const getUsers = async () => {
    setGetUsersIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/user`);
      setGetUsersData(response.data.users);
    } catch (error) {
      setGetUsersError(error);
    } finally {
      setGetUsersIsLoading(false);
    }
  };

  const getSingleUser = async (pk) => {
    setSingleUserIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/user/${pk}`);
      setGetSingleUserData(response.data.user);
      seteditedFormData({
        name: response.data.user.name || "",
        username: response.data.user.username || "",
        oracle_id: response.data.user.oracle_id || "",
        email: response.data.user.email || "",
        phone_number: response.data.user.phone_number || "",
        level: response.data.user.level || "",
        image: response.data.user.image || "",
        role: response.data.user.role_id || "",
        department: response.data.user.department || "",
      });
    } catch (error) {
      setSingleUserError(error);
    } finally {
      setSingleUserIsLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    setAddUserIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      username: e.target.username.value,
      oracle_id: e.target.oracle_id.value,
      email: e.target.email.value,
      phone_number: e.target.phone_number.value,
      level: e.target.level.value,
      role: e.target.role.value,
      department: e.target.department.value,
      image: e.target.image.value,
    };
    try {
      const result = await axios.post(`${baseUrl}/api/user`, formData);
      setAddUserResponse(result.data);
    } catch (error) {
      setAddUserError(error.response.data.message);
      console.log(error);
    } finally {
      setAddUserIsLoading(false);
    }
  };

  const handleEditUser = async (e, pk) => {
    seteditUserIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    e.preventDefault();
    const updatedData = {
      name: editedFormData.name,
      username: editedFormData.username,
      oracle_id: editedFormData.oracle_id,
      email: editedFormData.email,
      phone_number: editedFormData.phone_number,
      level: editedFormData.level,
      role:
        editedFormData.role === 1
          ? "qa"
          : editedFormData.role === 2
          ? "admin"
          : editedFormData.role === 3
          ? "warehouse-staff"
          : editedFormData.role === 4
          ? "head-teacher"
          : editedFormData.role,
      department: editedFormData.department,
      image: editedFormData.image,
    };
    try {
      const result = await axios.patch(
        `${baseUrl}/api/user/${pk}`,
        updatedData
      );
      seteditUserResponse(result.data.message);
    } catch (error) {
      seteditUserError(error.response.data.message);
    } finally {
      seteditUserIsLoading(false);
    }
  };

  const handleUserStatus = async (pk) => {
    setUserStatusIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const result = await axios.patch(`${baseUrl}/api/user/update-status/${pk}`);
      setUserStatusResponse(result.data.message);
      console.log(result);
    } catch (error) {
      setUserStatusError(error.response.data.message);
      console.log(error);
    } finally {
      setUserStatusIsLoading(false);
    }
  };

  let contextData = {
    getUsers: getUsers,
    getSingleUser: getSingleUser,
    handleAddUser: handleAddUser,
    setAddUserResponse: setAddUserResponse,
    setAddUserError: setAddUserError,
    seteditedFormData: seteditedFormData,
    handleEditUser: handleEditUser,
    seteditUserResponse: seteditUserResponse,
    seteditUserError: seteditUserError,
    handleUserStatus: handleUserStatus,
    getUsersIsLoading: getUsersIsLoading,
    getUsersError: getUsersError,
    getUsersData: getUsersData,
    getSingleUserIsLoading: getSingleUserIsLoading,
    getSingleUserError: getSingleUserError,
    getSingleUserData: getSingleUserData,
    addUserResponse: addUserResponse,
    addUserIsLoading: addUserIsLoading,
    addUserError: addUserError,
    editedFormData: editedFormData,
    editUserIsLoading: editUserIsLoading,
    editUserError: editUserError,
    editUserResponse: editUserResponse,
    userStatusIsLoading: userStatusIsLoading,
    userStatusError: userStatusError,
    userStatusResponse: userStatusResponse,
  };
  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
