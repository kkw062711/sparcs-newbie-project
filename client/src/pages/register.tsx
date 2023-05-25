import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { TextField, Typography, Button, Box, Paper, Theme, FormControlLabel, Switch, Slide } from "@mui/material";
// MUI import

const RegisterEmail = () => {
  return (
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
        }} label="이메일" variant="standard" onChange={(e) => { }} />
      <TextField // 비밀번호 입력칸
        size="small" sx={{
          margin: '10px 0px 0px 0px'
        }} label="비밀번호" variant="standard" type="password"
        onChange={(e) => { }}
      />
    </Box>
  );
}




const RegisterPage = (props: {}) => {
  useEffect(() => {
    console.log('');
    store.dispatch({ type: 'changepage', page: 'Register' })
  }, []);
  const navigate = useNavigate();
  const page = "Register"
  const auth = true

  const boxref = useRef()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1)
  const [checked, setChecked] = useState(false);


  return (
    <Box className="container">

      {/* 회원가입 상자 */}
      <Box // 회원가입 상자
        ref={boxref}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyItems: 'flex-end',
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: '20px',
          margin: '0 auto',
          marginTop: '50px',
          width: '400px',
          height: '500px',
        }}>

        {/* 회원가입 헤더 */}
        <Box // 회원가입 헤더
          sx={{
            display: 'flex', alignItems: 'center'
          }}>
          <WavingHandIcon // 회원가입 아이콘
            fontSize="large" sx={{
              margin: '50px 5px 0px 0px',
              color: 'primary.light'
            }} />
          <Typography // 회원가입 라벨
            sx={{
              margin: '50px 0px 0px 5px',
              fontSize: '30px',
              color: 'primary.light',
              fontWeight: 'bold'
            }}>회원가입</Typography>
        </Box>

        {/* 회원가입 입력 */}
        <Box // 회원가입 입력칸 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '80px 0px 0px 0px'
          }}
        >

          {/* 입력 칸 (이메일, 인증) */}
          <Slide direction="left" in={level == 1} container={boxref.current} mountOnEnter unmountOnExit>
            <Box>
              <Box // 이메일 입력, 인증칸
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
                  }} label="이메일" variant="standard" onChange={(e) => { }} />
                <Box // 인증 칸
                  sx={{
                    display: 'flex',
                    margin: '30px 0px 0px 0px',
                    alignContent: 'center'
                  }}>
                  <Button variant="contained" size="small" color='secondary'
                    type="submit" onClick={(e) => { /* 이메일 인증 */ }}>
                    <Typography fontSize={"22px"} sx={{ margin: '0px 10px 0px 10px' }}>
                      인증하기
                    </Typography>
                  </Button>
                  <Typography sx={{ alignSelf: 'center', fontSize: '27px', margin: '0px 0px 0px 20px' }}>인증됨 ●</Typography>
                </Box>
              </Box>
              <Box // 버튼 입력 칸
                sx={{
                  display: 'flex', justifyContent: 'space-evenly',
                  margin: '50px 0px 0px 0px'
                }}>
                <Button variant="contained" size="large"
                  type="submit" onClick={(e) => { setLevel(level + 1) }}>
                  <Typography fontSize={"22px"} sx={{ margin: '0px 50px 0px 50px' }}>
                    다음
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Slide>

          {/* 입력 칸 (이름, 전화번호) */}
          <Slide direction="left" in={level == 2} container={boxref.current} mountOnEnter unmountOnExit>
            <Box>
              <Box // 전화번호, 이름 입력
                sx={{
                  width: '300px',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Box // 전화번호, 이메일 입력칸
                  sx={{
                    width: '300px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  <TextField // 전화번호 입력칸
                    size="small" sx={{
                      fontSize: '100px',
                      margin: '10px 0px 10px 0px',
                      fontWeight: 'bold'
                    }} label="전화번호" variant="standard" onChange={(e) => { setPhone(e.target.value) }} />
                  <TextField // 이름 입력칸
                    size="small" sx={{
                      margin: '10px 0px 0px 0px'
                    }} label="이름" variant="standard"
                    onChange={(e) => { setName(e.target.value) }}
                  />
                </Box>
              </Box>
              <Box // 버튼 입력 칸
                sx={{
                  display: 'flex', justifyContent: 'space-evenly',
                  margin: '50px 0px 0px 0px'
                }}>
                <Button variant="contained" size="large"
                  type="submit" onClick={(e) => { setLevel(level + 1) }}>
                  <Typography fontSize={"22px"} sx={{ margin: '0px 50px 0px 50px' }}>
                    다음
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Slide>

          {/* 입력칸 (은행, 계좌번호) */}
          <Slide direction="left" in={level == 3} container={boxref.current} mountOnEnter unmountOnExit>
            <Box>
              <Box // 은행, 계좌 입력
                sx={{
                  width: '300px',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <TextField // 은행 입력칸
                    size="small" sx={{
                      fontSize: '100px',
                      margin: '10px 0px 10px 0px',
                      fontWeight: 'bold'
                    }} label="은행" variant="standard" onChange={(e) => { setBank(e.target.value) }} />
                  <TextField // 계좌 입력칸
                    size="small" sx={{
                      margin: '10px 0px 0px 0px'
                    }} label="계좌번호" variant="standard"
                    onChange={(e) => { setAccount(e.target.value) }}
                  />
              </Box>
              <Box // 버튼 입력 칸
                sx={{
                  display: 'flex', justifyContent: 'space-evenly',
                  margin: '50px 0px 0px 0px'
                }}>
                <Button variant="contained" size="large"
                  type="submit" onClick={(e) => { navigate('/')}}>
                  <Typography fontSize={"22px"} sx={{ margin: '0px 50px 0px 50px' }}>
                    가입하기
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Slide>
        </Box>
      </Box>
    </Box>
    // <Box sx={{display:'flex', flexDirection:'column', 
    // justifyContent:'center'
    // }}>
    //     <Typography>
    //         환영합니다!
    //     </Typography>

    // </Box>
  )
};


/*
import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Theme } from '@mui/material/styles';

const icon = (
  <Paper sx={{ m: 1 }} elevation={4}>
    <Box component="svg" sx={{ width: 100, height: 100 }}>
      <Box
        component="polygon"
        sx={{
          fill: (theme: Theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
        points="0,100 50,00, 100,100"
      />
    </Box>
  </Paper>
);

export default function SimpleSlide() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 180 }}>
      <Box sx={{ width: `calc(100px + 16px)` }}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          {icon}
        </Slide>
      </Box>
    </Box>
  );
}

 */
export default RegisterPage;
