import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
import { ThemeProvider } from "@emotion/react";
import LoginIcon from '@mui/icons-material/Login';
import { TextField, Typography, Button, Box } from "@mui/material";
// MUI import

const LoginPage = (props: {}) => {
  useEffect(() => {
    console.log('');
    store.dispatch({ type: 'changepage', page: 'Login' })
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = (email, password) => {
    const asyncFun = async () => {
      const Loginsuccess = await axios.post(SAPIBase + '/user/Login', {
        email: email, password: password
      });
      if (Loginsuccess.data.Loginsuccess) {
        navigate('/');
        store.dispatch({ type: 'changeauth', auth: Loginsuccess.data.Loginsuccess })
      }
      else {
        window.alert("이메일과 비밀번호를 확인해주세요!")
      }
    }
    asyncFun().catch(e => window.alert(`Login Error! ${e}`));
  }

  const navigate = useNavigate();

  return (
    <Box className="container">

      {/* 로그인 상자 */}
      <Box // 로그인 상자
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: '20px',
          margin: '0 auto',
          marginTop: '50px',
          width: '26vw',
          height: '65vh',
          // boxShadow: 3
        }}>

        {/* 로그인 헤더 */}
        <Box // 로그인 헤더
          sx={{
            display: 'flex', alignItems: 'center'
          }}>
          <LoginIcon // 로그인 아이콘
            fontSize="large" sx={{
              margin: '50px 5px 0px 0px',
              color: 'primary.light'
            }} />
          <Typography // 로그인 라벨
            sx={{
              margin: '50px 0px 0px 5px',
              fontSize: '30px',
              color: 'primary.light',
              fontWeight: 'bold'
            }}>로그인</Typography>
        </Box>

        {/* 로그인 입력 */}
        <Box // 로그인 입력칸 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '80px 0px 0px 0px'
          }}>

          {/* 입력 칸 */}
          <Box // 이메일, 비밀번호 입력칸
            sx={{
              width: '300px',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <TextField // 이메일 입력칸
              size="small" sx={{
                fontSize: '100px',
                margin: '10px 0px 10px 0px',
                fontWeight: 'bold'
              }} label="이메일" variant="standard" onChange={(e) => { setEmail(e.target.value) }} />
            <TextField // 비밀번호 입력칸
              size="small" sx={{
                margin: '10px 0px 0px 0px'
              }} label="비밀번호" variant="standard" type="password"
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </Box>

          {/* 버튼 칸 */}
          <Box // 버튼 입력 칸
            sx={{
              display: 'flex', justifyContent: 'space-evenly',
              margin: '50px 0px 0px 0px'
            }}>
            <Button variant="contained" size="large"
              type="submit" onClick={(e) => { isLogin(email, password) }}>
              <Typography fontSize={"22px"}>
                로그인
              </Typography>
            </Button>
            <Button variant="outlined" size='large' onClick={(e) => { navigate('/register') }}>
              <Typography fontSize={"22px"}>
                회원가입
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default LoginPage;
