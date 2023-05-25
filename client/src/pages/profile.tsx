import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
import { Box, TextField, Typography, Button, Divider } from "@mui/material";
// MUI import

const ProfilePage = (props: {}) => {
  useEffect(() => {
    console.log('');
    store.dispatch({ type: 'changepage', page: 'Profile' })
  }, []);
  const navigate = useNavigate();
  const email = "example000@XXXXXX.com"

  const [isdisabled, setIsdisabled] = useState([true, true, true, true])
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');


  const changedisable = (n) => {
    isdisabled[n] = !isdisabled[n]
    setIsdisabled([...isdisabled]);
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: "30px" }}>
      <Box sx={{
        border: '2px solid', borderRadius: '20px', padding: "30px",
        borderColor: 'primary.dark', margin: '0px 0px 20px 0px'
      }}>
        <Typography sx={{
          fontSize: "30px", fontWeight: 'bold',
          margin: '0px', color: 'primary.dark'
        }}> 회원 정보 </Typography>

        <Box // 이메일 정보
          sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}
        >
          <Typography sx={{
            fontSize: "25px", fontWeight: 'bold',
            margin: '30px 0px 20px 0px'
          }}>
            메일 정보
          </Typography>
          <Divider orientation="vertical" flexItem
            sx={{ margin: "3px 8px 0px 8px" }} />

          <Typography sx={{
            fontSize: "20px", fontWeight: 'bold',
            margin: '30px 7px 20px 0px'
          }}>
            이메일 -
          </Typography>
          <TextField // 이메일 정보 입력칸
            label={email}
            variant="filled" disabled
            sx={{ width: '540px', margin: '0px 15px 0px 15px' }} />

          {/* <Button variant="outlined" onClick={(e) => { navigate("/roomcreate") }}
          sx={{
            margin: '15px 10px 0px 0px'
          }}>
          <Typography
            sx={{ fontSize: '20px', fontWeight: 'bold', alignSelf:'center'}}>
            방 만들기
          </Typography>
        </Button> */}
        </Box>

        <Box // 개인 정보
          sx={{
            display: 'flex', alignItems: 'center', justifyItems: 'center',
            margin: '20px 0px 20px 0px'
          }}>
          <Typography sx={{
            fontSize: "25px", fontWeight: 'bold',
            margin: '30px 0px 20px 0px'
          }}  >
            개인 정보
          </Typography>

          <Divider orientation="vertical" flexItem
            sx={{ margin: "3px 8px 0px 8px" }} />

          <Box sx={{ display: 'flex' }}>
            <Typography sx={{
              fontSize: "20px", fontWeight: 'bold',
              margin: '20px 14px 0px 14px'
            }}>
              이름 -
            </Typography>

            <TextField // 이름 입력칸
              label={"이름 - " + name}
              variant="filled" disabled={isdisabled[0]}
              sx={{ width: '300px', margin: '0px 15px 0px 15px' }}
              onChange={(e) => { setName(e.target.value) }}
            />

            <Button variant="outlined" onClick={(e) => { changedisable(0); if (!isdisabled[0]) { setName(name + "->") } else { setName(name) } }}
              sx={{
                margin: '15px 10px 0px 0px'
              }}>
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', alignSelf: 'center' }}>
                변경하기
              </Typography>
            </Button>

          </Box>

          <Divider orientation="vertical" flexItem
            sx={{ margin: "3px 8px 0px 8px" }} />

          <Box sx={{ display: 'flex' }}>
            <Typography sx={{
              fontSize: "20px", fontWeight: 'bold',
              margin: '20px 10px 0px 10px'
            }}>
              전화번호 -
            </Typography>

            <TextField // 전화번호 입력칸
              label={"전화번호 - " + phone} disabled={isdisabled[1]}
              variant="filled"
              sx={{ width: '300px', margin: '0px 15px 0px 15px' }}
              onChange={(e) => { setName(e.target.value) }} />

            <Button variant="outlined" onClick={(e) => { changedisable(1); if (!isdisabled[1]) { setName(phone + "->") } else { setName(phone) } }}
              sx={{
                margin: '15px 10px 0px 0px'
              }}>
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', alignSelf: 'center' }}>
                변경하기
              </Typography>
            </Button>

          </Box>
        </Box>

        <Box // 계좌 정보
          sx={{
            display: 'flex', alignItems: 'center', justifyItems: 'center',
            margin: '20px 0px 20px 0px'
          }}>
          <Typography sx={{
            fontSize: "25px", fontWeight: 'bold',
            margin: '30px 0px 20px 0px'
          }}>
            계좌 정보
          </Typography>

          <Divider orientation="vertical" flexItem
            sx={{ margin: "3px 8px 0px 8px" }} />

          <Box sx={{ display: 'flex' }}>
            <Typography sx={{
              fontSize: "20px", fontWeight: 'bold',
              margin: '20px 14px 0px 14px'
            }}>
              은행 -
            </Typography>
            <TextField // 은행 입력칸
              label={"은행 - "+bank} disabled={isdisabled[2]}
              variant="filled"
              sx={{ width: '300px', margin: '0px 15px 0px 15px' }}
              onChange={(e) => { setName(e.target.value) }} />
            <Button variant="outlined" onClick={(e) => { changedisable(2); if (!isdisabled[2]) { setName(bank + "->") } else { setName(bank) } }}
              sx={{
                margin: '15px 10px 0px 0px'
              }}>
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', alignSelf: 'center' }}>
                변경하기
              </Typography>
            </Button>
          </Box>

          <Divider orientation="vertical" flexItem
            sx={{ margin: "3px 8px 0px 8px" }} />

          <Box sx={{ display: 'flex' }}>
            <Typography sx={{
              fontSize: "20px", fontWeight: 'bold',
              margin: '20px 30px 0px 30px'
            }}>
              계좌 -
            </Typography>
            <TextField // 계좌 입력칸
              label={"계좌 - "+account}
              variant="filled" disabled={isdisabled[3]}
              sx={{ width: '300px', margin: '0px 15px 0px 15px' }}
              onChange={(e) => { setName(e.target.value) }} />
            <Button variant="outlined" onClick={(e) => { changedisable(3); if (!isdisabled[3]) { setName(account + "->") } else { setName(account) } }}
              sx={{
                margin: '15px 10px 0px 0px'
              }}>
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', alignSelf: 'center' }}>
                변경하기
              </Typography>
            </Button>
          </Box>

        </Box>

      </Box>

      <Box sx={{ border: '2px solid', borderRadius: '20px', padding: "30px", borderColor: 'primary.dark' }}>
        <Typography sx={{
          fontSize: "30px", fontWeight: 'bold',
          margin: '0px', color: 'primary.dark'
        }}> 참여중인 방 </Typography>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection:'column' }}>

          </Box>
          <Box sx={{ display: "flex", flexDirection:'column' }}>

          </Box>
        </Box>


      </Box>
    </Box>
  )
};

export default ProfilePage;
