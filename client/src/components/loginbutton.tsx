import React from "react";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import { changePage, changeAuth } from "./dispatch";
import { useDispatch } from "react-redux";

const LoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changePage = (page) => {
    dispatch({ type: 'changepage', page: page })
  }
  const changeAuth = (auth) => {
    dispatch({ type: 'changeauth',auth : auth })
  }
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={(e) => { navigate("/login"); changePage("Login") }}>로그인</Button>
      <Button variant="outlined" onClick={(e) => { navigate("/register"); changePage("Register") ; changeAuth(true) }}>회원가입</Button>
    </Stack>

  );
}
export default LoginButton;