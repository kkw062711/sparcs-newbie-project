import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../components/reducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { style } from "./css/home";
import { SAPIBase } from "../tools/api";
import { Button, Typography } from "@mui/material";
import { TextField, InputLabel, MenuItem, Select, Radio, RadioGroup, FormControlLabel, Divider, Box } from '@mui/material/';
import store from "../components/store";
import RoomInfo from "../components/roominfo";

// MUI import

const HomePage = (props) => {
  // useeffect
  useEffect(() => {
    store.dispatch({ type: 'changepage', page: 'Home' })
  }, []);

  // usestate
  const [search, setSearch] = useState('');
  const [orderby, setOrderby] = useState('date');
  const [orderrule, setOrderrule] = useState('u');
  const [filter, setFilter] = useState('all');

  // routing
  const navigate = useNavigate();

  return (
    <Box //메인 컨테이너 
      sx={{
        display: 'flex', flexDirection: 'column', width: 'auto',
      }}>
      <Divider variant="middle"
        sx={{ margin: "10px 0px 10px 0px" }} />

      {/* 방 검색, 정렬, 필터 */}
      <Box // 방 헤더
        sx={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', minWidth:'auto',
          padding: '0px 10px 0px 10px', justifyContent: 'center', width:'100vw', alignSelf:'center'
        }}>

        {/* 방 검색 */}
        <Box // 방 검색 칸
          sx={{
            display: 'flex', alignItems: 'center', justifyItems: 'center'
          }}>

          <Typography // 방 검색 라벨
            sx={{
              fontSize: "20px", fontWeight: 'bold',
              margin: '10px 0px 0px 0px'
            }}>
            방 검색 -
          </Typography>

          <TextField // 방 검색 입력칸
            label="방 검색하기"
            variant="standard" onChange={(e) => { setSearch(e.target.value) }}
            sx={{ width: '25vw', margin: '0px 0px 0px 15px' }} />
        </Box>
        <Divider orientation="vertical" flexItem
          sx={{ margin: "3px 8px 0px 8px" }} />

        {/* 방 정렬 */}
        <Box // 방 정렬 칸
          sx={{
            display: 'flex', alignItems: 'center', justifyItems: 'center'
          }}>
          <Typography // 정렬 설정 라벨
            sx={{
              fontSize: '20px', fontWeight: 'bold',
              margin: '10px 10px 0px 0px'
            }}>
            정렬 설정 -  </Typography>
          <Box // 방 정렬 종류
            sx={{ margin: "0px 20px 0px 5px" }}>
            <InputLabel // 정렬 종류 라벨
              sx={{
                fontSize: '15px', fontWeight: 'bold', color: 'dimgray',
                margin: '0px 0px 5px 0px'
              }}>
              정렬 종류
            </InputLabel>
            <Select // 정렬 옵션 선택 드롭다운
              value={orderby} variant="standard"
              label="정렬 옵션" onChange={(e) => { setOrderby(e.target.value) }}>
              <MenuItem value="date" >
                <Typography
                  sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                  날짜순
                </Typography>
              </MenuItem>
              <MenuItem value="name">
                <Typography
                  sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                  가나다순
                </Typography>
              </MenuItem>
              <MenuItem value="price">
                <Typography
                  sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                  가격순
                </Typography>
              </MenuItem>
              <MenuItem value="price">
                <Typography
                  sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                  참여자순
                </Typography>
              </MenuItem>
            </Select>
          </Box>


          <Box // 방 정렬 순서
            sx={{ margin: "0px 5px 0px 5px" }}>

            <InputLabel // 정렬 순서 라벨
              sx={{
                fontSize: '15px', fontWeight: 'bold', color: 'dimgray',
                margin: '0px 0px -4px 0px'
              }}>
              정렬 순서
            </InputLabel>
            <RadioGroup // 정렬 순서 입력 라디오 버튼
              row value={orderrule} onChange={(e) => { setOrderrule((e.target as HTMLInputElement).value) }}
              sx={{ margin: 0 }}>
              <FormControlLabel value="u" control={<Radio />} label="오름차순"
                sx={{ fontSize: '15px', fontWeight: 'bold' }} />
              <FormControlLabel value="d" control={<Radio />} label="내림차순"
                sx={{ fontSize: '15px', fontWeight: 'bold' }} />
            </RadioGroup>
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem
          sx={{ margin: "3px 8px 0px 8px" }} />

        {/* 카테고리 필터 */}
        <Box // 카테고리 필터 칸
          sx={{
            display: 'flex', alignItems: 'center', justifyItems: 'center'
          }}>
          <Typography // 카테고리 설정 라벨
            sx={{
              fontSize: '20px', fontWeight: 'bold',
              margin: '10px 10px 0px 0px'
            }}>
            카테고리 설정 -
          </Typography>
          <Box sx={{ margin: "0px 5px 0px 5px" }}>
            <InputLabel // 카테고리 종류 라벨
              sx={{
                fontSize: '15px', fontWeight: 'bold', color: 'dimgray',
                margin: '0px 0px 5px 0px'
              }}>
              카테고리 종류
            </InputLabel>
            <Select // 카테고리 종류 입력 드롭다운
              value={filter} variant='standard'
              label="정렬 옵션" onChange={(e) => { setFilter(e.target.value) }}>
              <MenuItem value="all" >
                <Typography
                  sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                  전체
                </Typography>
              </MenuItem>
              <MenuItem value="food">
                <Typography
                  sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                  음식
                </Typography>
              </MenuItem>
              <MenuItem value="necessity">
                <Typography
                  sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                  생필품
                </Typography>
              </MenuItem>
              <MenuItem value="device">
                <Typography
                  sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                  전자기기
                </Typography>
              </MenuItem>
              <MenuItem value="fashion">
                <Typography
                  sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                  패션
                </Typography>
              </MenuItem>
              <MenuItem value="cosmetic">
                <Typography
                  sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                  화장품
                </Typography>
              </MenuItem>
              <MenuItem value="stationery">
                <Typography
                  sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                  완구/문구
                </Typography>
              </MenuItem>
              <MenuItem value="etc">
                <Typography
                  sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                  기타
                </Typography>
              </MenuItem>
            </Select>
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem
          sx={{ margin: "3px 8px 0px 8px" }} />

        {/* 방 생성 */}
        <Box // 방 생성 칸
          sx={{
            display: 'flex', alignItems: 'center', justifyItems: 'center'
          }}>
          <Typography // 방 만들기 라벨
            sx={{
              fontSize: '20px', fontWeight: 'bold',
              margin: '10px 10px 0px 0px'
            }}>
            방 만들기 -
          </Typography>
          <Box // 방 만들기 버튼
            sx={{ flexGrow: 1 }}>
            <Button variant="outlined" onClick={(e) => { navigate("/roomcreate") }}
              sx={{
                margin: '15px 10px 0px 0px'
              }}>
              <Typography
                sx={{ fontSize: '15px', fontWeight: 'bold', }}>
                방 만들기
              </Typography>
            </Button>
          </Box>
        </Box>

      </Box>
      <Divider variant="middle"
        sx={{ margin: "17px 0px 3px 0px" }} />

      {/* /****************************************** */}
      <RoomInfo/>
      <RoomInfo/>
      <RoomInfo/>
      {/* ******************************** */}


    </Box>
  )
};

export default HomePage;
