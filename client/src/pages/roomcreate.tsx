import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
import { Box, Typography, Button, TextField, Divider, MenuItem, Select, OutlinedInput, InputAdornment } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../components/reducer";


const RoomcreatePage = (props: {}) => {
  useEffect(() => {
    store.dispatch({ type: 'changepage', page: 'Roomcreate' })
  }, []);
  const navigate = useNavigate();

  const [category, setCategory] = useState('기타');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const creator = useSelector((state: RootState) => state.auth);

  const createRoom = () => {
    const asyncFun = async () => {
      const createRoom = await axios.post(SAPIBase + '/room/addRoom', {
        name: title,
        creator: creator,
        image: "",
        description: description,
        category: category,
        price: price
      });
    }
    asyncFun().catch(e => window.alert(`addRoom Error! ${e}`));
  }


  return (
    <Box sx={{
      border: '2px solid', borderRadius: '20px', width: '95vw', height: '45vh', display: 'flex',
      borderColor: 'primary.dark', margin: '20px 0px 0px 35px', alignSelf: 'center'
    }}>
      <Box sx={{ diaplay: 'flex', flexDirection: 'column' }}>
        <Box sx={{
          border: '2px solid', borderRadius: '20px', width: '15vw', height: '15vw',
          borderColor: 'primary.dark', margin: '20px 20px 10px 20px'
        }}>
        </Box>
        <Button variant="outlined" onClick={(e) => { window.alert("미구현") }}
          sx={{
            margin: '0px 0px 0px 50px'
          }}>
          <Typography
            sx={{ fontSize: '25px', fontWeight: 'bold' }}>
            사진 업로드
          </Typography>
        </Button>
      </Box>

      <Divider orientation="vertical"
        sx={{ margin: "0px", height: '23vh', alignSelf: 'center' }} />
      <Box sx={{
        display: 'flex', flexDirection: 'column', width: '80vw',
        margin: '20px 20px 20px 10px', padding: '0px 0px 0px 15px'
      }}>
        <Box sx={{ display: 'flex', alignSelf: 'flex-start', margin: '0px 0px 10px 0px' }}>
          <Typography color='primary' sx={{
            fontSize: "25px", fontWeight: 'bold',
            margin: '20px 14px 0px 14px'
          }}>
            카테고리 -
          </Typography>

          <Select // 카테고리 종류 입력 드롭다운
            value={category} variant='standard'
            onChange={(e) => { setCategory(e.target.value) }}>
            <MenuItem value="음식">
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                음식
              </Typography>
            </MenuItem>
            <MenuItem value="생필품">
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                생필품
              </Typography>
            </MenuItem>
            <MenuItem value="전자기기">
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                전자기기
              </Typography>
            </MenuItem>
            <MenuItem value="패션">
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                패션
              </Typography>
            </MenuItem>
            <MenuItem value="화장품">
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                화장품
              </Typography>
            </MenuItem>
            <MenuItem value="완구/문구">
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                완구/문구
              </Typography>
            </MenuItem>
            <MenuItem value="기타">
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                기타
              </Typography>
            </MenuItem>
          </Select>

          <Typography color='primary' sx={{
            fontSize: "25px", fontWeight: 'bold',
            margin: '20px 14px 0px 14px'
          }}>
            방 이름 (공구 물품) -
          </Typography>

          <TextField
            label={""}
            variant="standard"
            sx={{ width: '16vw', margin: '15px 15px 0px 15px' }}
            onChange={(e) => { setTitle(e.target.value) }} />

          <Typography color='primary' sx={{
            fontSize: "25px", fontWeight: 'bold',
            margin: '20px 14px 0px 14px'
          }}>
            가격 -
          </Typography>

          <OutlinedInput
            label={""} endAdornment={<InputAdornment position="end">원</InputAdornment>}
            sx={{ width: '8vw', margin: '15px 15px 0px 15px' }}
            onChange={(e) => { setPrice(e.target.value) }} />


        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography color='primary' sx={{
            fontSize: "25px", fontWeight: 'bold',
            margin: '0px 14px 0px 14px'
          }}>
            방 설명 -
          </Typography>
          <TextField onChange={(e) => { setDescription(e.target.value) }}
            multiline rows={3} sx={{ width: '50vw' }} />

        </Box>

        <Box sx={{ alignSelf: 'flex-end', margin: '20px 0px 0px 0px' }}>

          <Button variant="outlined" onClick={(e) => { createRoom(); navigate("/"); location.reload() }}
            sx={{
              margin: '0px 0px 0px 50px'
            }}>
            <Typography
              sx={{ fontSize: '25px', fontWeight: 'bold' }}>
              방 생성
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>

  )
};

export default RoomcreatePage;
