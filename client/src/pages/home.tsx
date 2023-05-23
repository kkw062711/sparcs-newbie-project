import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import "./css/home.css";
import { SAPIBase } from "../tools/api";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import store from "../components/store";
import Divider from "@mui/material/Divider";
// MUI import

const HomePage = (props) => {

  // useeffect
  useEffect(() => {
    console.log('');
    store.dispatch({ type: 'changepage', page: 'Home' })
  }, []);

  // change input value
  const changeorderby = (event: SelectChangeEvent) => {
    // console.log(event) // PointerEvent
    setOrderby(event.target.value);
  };
  const changefilter = (event: SelectChangeEvent) => {
    // console.log(event) // PointerEvent
    setFilter(event.target.value);
  };
  const changeorderrule = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event) // SyntheticBasEvent
    setOrderrule((event.target as HTMLInputElement).value);
  };

  // usestate
  const [orderby, setOrderby] = React.useState('date');
  const [orderrule, setOrderrule] = React.useState('u');
  const [filter, setFilter] = React.useState('all');

  // routing
  const navigate = useNavigate();

  return (
    <div className="container">
      <Divider variant="middle" sx={{margin:"17px 0px 3px 0px"}}/>
      <div className="roominfo">

        {/* 텍스트 */}
        <div className="currroom">
          <h4 className="curroomlabel" style={{fontSize:"30px", padding:0}}>
            현재 방
          </h4>
        </div>

        {/* 방 검색 */}
        <div className="searchroom">

          <TextField label="방 검색하기" variant="standard" />
        </div>

        {/* 방 정렬 종류 */}
        <div className="order">
          <FormControl >
            <InputLabel className="orderlabel">정렬</InputLabel>
            <Select className="orderselect" value={orderby}
              label="정렬 옵션" onChange={(e) => { setOrderby(e.target.value) }}>
              <MenuItem value="date">
                <em>날짜순</em>
              </MenuItem>
              <MenuItem value="name">가나다순</MenuItem>
              <MenuItem value="price">가격순</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* 방 정렬 순서 */}
        <div className="orderrule">
          <FormControl>
            <FormLabel >정렬 순서</FormLabel>
            <RadioGroup row value={orderrule} onChange={(e) => { setOrderrule((e.target as HTMLInputElement).value) }}>
              <FormControlLabel value="u" control={<Radio />} label="오름차순" />
              <FormControlLabel value="d" control={<Radio />} label="내림차순" />
            </RadioGroup>
          </FormControl>
        </div>

        {/* 카테고리 필터 */}
        <div className="filter">
          <FormControl >
            <InputLabel className="filterlabel">필터</InputLabel>
            <Select className="filterselect" value={filter}
              label="정렬 옵션" onChange={(e) => { setFilter(e.target.value) }}>
              <MenuItem value="all">
                <em>전체</em>
              </MenuItem>
              <MenuItem value="food">음식</MenuItem>
              <MenuItem value="necessity">생필품</MenuItem>
              <MenuItem value="device">전자기기</MenuItem>
              <MenuItem value="fashion">패션</MenuItem>
              <MenuItem value="cosmetic">화장품</MenuItem>
              <MenuItem value="stationery">완구/문구</MenuItem>
              <MenuItem value="etc">기타</MenuItem>
            </Select>
          </FormControl>
        </div>



        {/* 방 생성 */}
        <div className="createroom">
          <Button variant="outlined" onClick={(e) => { navigate("/roomcreate") }}>방 만들기</Button>
        </div>





      </div>
      <Divider variant="middle" sx={{margin:"17px 0px 3px 0px"}}/>
    </div>
  )
};

export default HomePage;
