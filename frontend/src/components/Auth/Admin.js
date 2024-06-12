import React, { useEffect } from 'react'
import AuthForm from './AuthForm';
import { sendAdminAuthRequest } from '../../api/api-helpers';
import { useDispatch } from "react-redux";
import { adminActions } from "../../store";
import { useNavigate } from 'react-router-dom';

const Admin = () => {

  useEffect(() => {
    document.title = "Admin Authentication";
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data?.token);
    navigate("/")
  }

  const getData = (data) => {
    // console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((error) => console.log(error))
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  )
}

export default Admin
