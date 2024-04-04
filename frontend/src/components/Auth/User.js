import React, { useEffect } from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api/api-helpers';
import { useDispatch } from "react-redux";
import { userActions } from "../../store";
import { useNavigate } from 'react-router-dom';

const Auth = () => {

  useEffect(() => {
    document.title = "User Authentication";
  }, []);
  const dispatch = useDispatch();
	const navigate = useNavigate();

  const onResReceived = (data) => {
    console.log(data);
    localStorage.setItem("userId", data.id);
    dispatch(userActions.login());
    navigate("/");
  }

  const getData = (data) => {
    console.log("Auth", data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((error) => console.log(error))
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  )
}

export default Auth

