import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { TextField, Typography, Button, Box, Paper, Theme, FormControlLabel, Switch, Slide } from "@mui/material";
// const nodemailer = require('nodemailer')
// import * as nodemailer from 'nodemailer';
// MUI import

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
  const [cpassword, setCpassword] = useState('');
  const [phone, setPhone] = useState('');
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1)

  const sendmail = (e) => {
    const asyncFun = async () => {
      await axios.post(SAPIBase + '/user/sendEmail', { email: email });
    }
    asyncFun().catch(e => window.alert(`sendemail Error! ${e}`));
  }
  const addUser = (e) => {
    const asyncFun = async () => {
      await axios.post(SAPIBase + '/user/addUser', {
        email: email, password: password, name: name,
        phone: phone, bank: bank, account: account
      });
    }
    asyncFun().catch(e => window.alert(`addUser Error! ${e}`));
  }

  const checkEmail = () => {
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    return regex.test(email)
  }

  //

  // const randnum = Math.floor(Math.random() * 899999) + 100000
  // let transporter = nodemailer.createTransport({
  //   service: 'gmail'              //사용하고자 하는 서비스
  //   , prot: 587
  //   , host: 'smtp.gmlail.com'
  //   , secure: false
  //   , requireTLS: true
  //   , auth: {
  //     user: '구글@gmail.com'           //gmail주소입력
  //     , pass: '비밀번호1234'                 //gmail패스워드 입력
  //   }
  // });
  // const sender = nodemailer.createTransport({
  //   // service: 'gmail', // mail 서비스명 ex) 'Naver', 'gmail' 등
  //   // auth: {
  //   //   user: 'GSiK.DEV@gmail.com', // mail 발송 이메일 주소
  //   //   pass: 'GSiK@DEV!!#', // 해당 이메일 비밀번호
  //   // },
  //   // tls: {
  //   //   rejectUnauthorized: false,
  //   // },
  // });

  // const mailopt = {
  //     from: 'Group shopping in Kaist',
  //     to: email,
  //     subject: '[GSiK] Email Authentication',
  //     text: `Your authentication code is ${randnum}`
  // }

  //
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
          width: '26vw',
          height: '65vh',
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
                  width: '19.5vw',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <TextField // 이메일 입력칸
                  size="small" sx={{
                    fontSize: '100px',
                    margin: '10px 0px 10px 0px',
                    fontWeight: 'bold'
                  }} label="이메일" variant="standard" onChange={(e) => { setEmail(e.target.value) }} />
                <Box // 인증 칸
                  sx={{
                    display: 'flex',
                    margin: '30px 0px 0px 0px',
                    alignContent: 'center'
                  }}>
                  <Button variant="contained" size="small" color='secondary'
                    type="submit" onClick={(e) => { /*sender.sendMail(mailopt, (error, responses) => { console.log(error); console.log(responses) })*/sendmail(e) }}>
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
                  type="submit" onClick={(e) => {
                    if (checkEmail()) { setLevel(level + 1) }
                    else { window.alert("올바른 이메일을 입력해 주세요!") }
                  }}>
                  <Typography fontSize={"22px"} sx={{ margin: '0px 50px 0px 50px' }}>
                    다음
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Slide>

          {/* 입력 칸 (비밀번호, 비번확인) */}
          <Slide direction="left" in={level == 2} container={boxref.current} mountOnEnter unmountOnExit>
            <Box>
              <Box // 비번, 비번확인 입력
                sx={{
                  width: '19.5vw',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Box // 비번, 비번확인 입력칸
                  sx={{
                    width: '19.5vw',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  <TextField // 비번 입력칸
                    size="small" type='password' sx={{
                      fontSize: '100px',
                      margin: '10px 0px 10px 0px',
                      fontWeight: 'bold'
                    }} label="비밀번호" variant="standard" onChange={(e) => { setPassword(e.target.value) }} />
                  <TextField // 이름 입력칸
                    size="small" type='password' sx={{
                      margin: '10px 0px 0px 0px'
                    }} label="비밀번호 확인" variant="standard"
                    onChange={(e) => { setCpassword(e.target.value) }}
                  />
                </Box>
              </Box>
              <Box // 버튼 입력 칸
                sx={{
                  display: 'flex', justifyContent: 'space-evenly',
                  margin: '50px 0px 0px 0px'
                }}>
                <Button variant="contained" size="large"
                  type="submit" onClick={(e) => {
                    if (password && password == cpassword) { setLevel(level + 1) }
                    else { window.alert("비밀번호를 올바르게 입력해 주세요!") }
                  }}>
                  <Typography fontSize={"22px"} sx={{ margin: '0px 50px 0px 50px' }}>
                    다음
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Slide>

          {/* 입력 칸 (이름, 전화번호) */}
          <Slide direction="left" in={level == 3} container={boxref.current} mountOnEnter unmountOnExit>
            <Box>
              <Box // 전화번호, 이름 입력
                sx={{
                  width: '19.5vw',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Box // 전화번호, 이메일 입력칸
                  sx={{
                    width: '19.5vw',
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
                  type="submit" onClick={(e) => { if(phone && name){ setLevel(level + 1) }
                  else{window.alert("올바른 전화번호와 이름을 입력해 주세요!")}}}>
                  <Typography fontSize={"22px"} sx={{ margin: '0px 50px 0px 50px' }}>
                    다음
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Slide>

          {/* 입력칸 (은행, 계좌번호) */}
          <Slide direction="left" in={level == 4} container={boxref.current} mountOnEnter unmountOnExit>
            <Box>
              <Box // 은행, 계좌 입력
                sx={{
                  width: '19.5vw',
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
                  type="submit" onClick={(e) => { 
                    if(bank && account){ 
                      try { addUser(e); navigate('/'); } 
                      catch { window.alert("ERROR") }
                    }
                  else{window.alert("올바른  은행과 계좌를 입력해 주세요!")}}}>
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

export default RegisterPage;
