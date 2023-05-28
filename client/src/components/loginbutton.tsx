import React from "react";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import { changePage, changeAuth } from "./dispatch";

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={(e) => { navigate("/login") }}>로그인</Button>
      <Button variant="outlined" onClick={(e) => { navigate("/register") }}>회원가입</Button>
    </Stack>

  );
}
export default LoginButton;