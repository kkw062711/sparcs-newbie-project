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
interface IAPIResponseRoom {
  category: string, createdat: string, creator: string,
  description: string, id: number, image: string,
  isclosed: boolean,
  // ispurchased: boolean, iscompleted: boolean, isrecieved: boolean,
  members: string[], name: string, price: number
}
const HomePage = (props) => {
  const userId = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    store.dispatch({ type: 'changepage', page: 'Home' })

    let BComponentExited = false;
    const asyncFun = async () => {
      const { data } = await axios.get<IAPIResponseRoom[]>(SAPIBase + '/room/getRoom');
      if (BComponentExited) return;
      setLAPIResponseRoom(data);
      setFinal(data)
    };
    asyncFun().catch((e) => window.alert(`Error while running API Call: ${e}`));
    return () => { BComponentExited = true; }
  }, []);


  // usestate
  // const [search, setSearch] = useState('');
  // const [orderby, setOrderby] = useState('date');
  // const [orderrule, setOrderrule] = useState('u');
  // const [filterv, setFilterv] = useState('전체');
  const [resultparam, setResultparam] = useState(['', '전체', '날짜순', 1])
  const [LAPIResponseRoom, setLAPIResponseRoom] = useState<IAPIResponseRoom[]>([]);
  const [final, setFinal] = useState<IAPIResponseRoom[]>([])
  // routing
  const navigate = useNavigate();


  const changeResultparam = (n, e) => {
    resultparam[n] = e.value
    setResultparam([...resultparam])
    showResult()
  }
  const showResult = () => {
    // 필터
    let result;
    if (resultparam[1] == "전체") {
      result = LAPIResponseRoom
    }
    else {
      result = LAPIResponseRoom.filter(item => {
          return item.category == resultparam[1]
        })
    }

    // 정렬
    const orderby=parseInt(resultparam[3])
    switch (resultparam[2]) {
      case '날짜순':
        result = [...result].sort(
          function(a,b) {
          return a.createdat < b.createdat ? -orderby : orderby
        })
      case '가나다순':
        result = [...result].sort(
          function(a,b) {
          return a.name < b.name ? -orderby : orderby
        })
        break;
      case '가격순':
        result = [...result].sort(
          function(a,b) {
          return a.price < b.price ? orderby : -orderby
        })
        break;
      case '참여자순':
        result = [...result].sort(
          function(a,b) {
          return a.members.length < b.members.length ? orderby : -orderby
        })
        break;
      default:
        break;
    }

    // 검색
    if(resultparam[0]){
      result = result.filter(item => {
        return item.name.includes(resultparam[0])
      });
    }
    setFinal(result)
    

  }

// const categoryfilter = (e) => {
//   const filter = e.target.value
//   setFilterv(e.target.value)
//   setResult(LAPIResponseRoom)
//   console.log(result)
//   if(filter == '전체'){
//   }
//   else{
//     setResult(result.filter(item => {
//       return item.category == filter}))
//   }
// }
// const order = () => {

// }
// const searchby = () => {

// }


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
        display: 'flex', flexDirection: 'row', alignItems: 'center', minWidth: 'auto',
        padding: '0px 10px 0px 10px', justifyContent: 'center', width: '105vw', alignSelf: 'center'
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
          variant="standard" onChange={(e) => { changeResultparam(0, e.target) }}
          sx={{ width: '25vw', margin: '0px 0px 0px 15px' }} />
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
            value={resultparam[1]} variant='standard'
            label="정렬 옵션" onChange={(e) => { changeResultparam(1, e.target) }}>
            <MenuItem value="전체" >
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                전체
              </Typography>
            </MenuItem>
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
        </Box>
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
            value={resultparam[2]} variant="standard"
            label="정렬 옵션" onChange={(e) => { changeResultparam(2, e.target) }}>
            <MenuItem value="날짜순" >
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                날짜순
              </Typography>
            </MenuItem>
            <MenuItem value="가나다순">
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                가나다순
              </Typography>
            </MenuItem>
            <MenuItem value="가격순">
              <Typography
                sx={{ fontSize: '20px', fontWeight: 'bold', }}>
                가격순
              </Typography>
            </MenuItem>
            <MenuItem value="참여자순">
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
            row value={resultparam[3]} onChange={(e) => {
              changeResultparam(3, e.target as HTMLInputElement)
            }}
            sx={{ margin: 0 }}>
            <FormControlLabel value={1} control={<Radio />} label="오름차순"
              sx={{ fontSize: '15px', fontWeight: 'bold' }} />
            <FormControlLabel value={-1} control={<Radio />} label="내림차순"
              sx={{ fontSize: '15px', fontWeight: 'bold' }} />
          </RadioGroup>
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

    {final.map((val, i) =>

      <RoomInfo key={i} category={val.category} createdat={val.createdat} creator={val.creator} members={val.members}
        description={val.description} id={val.id} image={val.image} name={val.name} price={val.price} />

    )}


  </Box>
)
};

export default HomePage;
