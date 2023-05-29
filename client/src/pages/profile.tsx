import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../components/reducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
import { Box, TextField, Typography, Button, Divider, OutlinedInput, Switch } from "@mui/material";
import SimpleRoomInfo from "../components/simpleroominfo";
// MUI import
interface IAPIResponseRoom {
  category: string, creator: string, createdat: string,
  description: string, image: string, isclosed: boolean, id: number
  ispurchased: boolean, iscompleted: boolean, isrecieved: boolean,
  members: number[], name: string, price: number
}
interface IAPIResponseUser {name: string}
const ProfilePage = (props: {}) => {
  const userId = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    store.dispatch({ type: 'changepage', page: 'Profile' })
    getProfile()

    const getUsernName = async () => {
      const { data } = await axios.post<IAPIResponseUser[]>(SAPIBase + '/user/getUser', {id:userId});
      setLAPIResponseUser(data);
    };
    getUsernName().catch((e) => window.alert(`Error while running API Call: ${e}`));



    let BComponentExited = false;
    const asyncFun = async () => {
      const { data } = await axios.post<IAPIResponseRoom[]>(SAPIBase + '/room/getMyRoom', { id: userId });
      if (BComponentExited) return;
      // console.log(data[0].members.length)
      setLAPIResponseRoom(data);
    };
    asyncFun().catch((e) => window.alert(`Error while running API Call: ${e}`));
    return () => { BComponentExited = true; }

  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [pwstate, setPwstate] = useState(false);
  const [LAPIResponseRoom, setLAPIResponseRoom] = useState<IAPIResponseRoom[]>([]);
  const [LAPIResponseUser, setLAPIResponseUser] = useState<IAPIResponseUser[]>([]);

  const getProfile = () => {
    const asyncFun = async () => {
      const getProfile = await axios.post(SAPIBase + '/user/getUser', { id: userId });
      if (getProfile.data) {
        const { email, password, name, phone, bank, account } = getProfile.data;
        setEmail(email)
        setPassword(password)
        setName(name)
        setPhone(phone)
        setBank(bank)
        setAccount(account)
      }
      else {
        navigate('/')
      }
    }
    asyncFun().catch(e => { window.alert(`Login Error! ${e}`) });
  }

  const changeProfile = () => {
    if (cpassword !== password) {
      window.alert(`새 비밀번호가 일치하지 않습니다!`)
      return
    }
    const asyncFun = async () => {
      console.log(userId, password, name, phone, bank, account)
      const updateProfile = await axios.post(SAPIBase + '/user/updateUserInfo',
        {
          id: userId, password: password, name: name,
          phone: phone, bank: bank, account: account
        });
    }
    asyncFun().catch(e => { window.alert(`Update Error! ${e}`) });
  }

  const deleteUser = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      const asyncFun = async () => {
        const deleteUser = await axios.post(SAPIBase + '/user/deleteUser', { id: userId });
        console.log(deleteUser)
      }
      asyncFun().catch(e => { window.alert(`Delete Error! ${e}`) });
      store.dispatch({ type: 'changeauth', auth:'0' })
      navigate('/')
      location.reload()
    } else {
      return
    }
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

        <Divider></Divider>

        <Box sx={{ display: 'flex', flexDirection: 'row' }}>

          <Box
            sx={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', justifyItems: 'center'
            }}>
            <Typography color='primary' sx={{
              fontSize: "25px", fontWeight: 'bold',
              margin: '10px 0px 10px 0px'
            }}>
              - 계정 정보
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography sx={{
                fontSize: "20px", fontWeight: 'bold', margin: '17px 30px 0px 0px'
              }}>
                이메일 -
              </Typography>
              <TextField
                label={email} disabled
                sx={{ width: '19.5vw' }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px 0px 0px 0px' }}>              <Typography sx={{
              fontSize: "20px", fontWeight: 'bold', margin: '17px 10px 0px 0px'
            }}>
              비밀번호 -
            </Typography>
              <TextField
                label={!pwstate ? '기존 비밀번호 입력' : '인증되었습니다!'} type='password'
                sx={{ width: '19.5vw' }}
                onChange={(e) => { setCpassword(e.target.value) }} />

              <Button variant="outlined" size='small' onClick={(e) => { console.log(password, cpassword); if (password == cpassword) { setPwstate(true) } }} sx={{
                margin: '0px 0px 0px 10px'
              }}>
                <Typography
                  sx={{ fontSize: '17px', fontWeight: 'bold', alignSelf: 'center', margin: '0px 0px 0px' }}>
                  비밀번호 인증
                </Typography>
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px 0px 0px 0px' }}>
              <TextField onChange={(e) => { setPassword(e.target.value) }}
                label={'새 비밀번호 입력'} disabled={!pwstate} type='password'
                sx={{ width: '17.5vw', margin: '0px 10px 0px 0px' }} />

              <TextField onChange={(e) => { setCpassword(e.target.value) }}
                label={'새 비밀번호 확인'} disabled={!pwstate} type='password'
                sx={{ width: '17.5vw', margin: '0px 0px 0px 10px' }} />
            </Box>

          </Box>

          <Divider orientation="vertical" flexItem
            sx={{ margin: "3px 8px 0px 8px" }} />

          <Box
            sx={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', justifyItems: 'center'
            }}>
            <Typography color='primary' sx={{
              fontSize: "25px", fontWeight: 'bold',
              margin: '10px 0px 10px 0px'
            }}>
              - 개인 정보
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography sx={{
                fontSize: "20px", fontWeight: 'bold', margin: '17px 50px 0px 0px'
              }}>
                이름 -
              </Typography>
              <TextField
                value={name}
                sx={{ width: '19.5vw' }}
                onChange={(e) => { setName(e.target.value) }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px 0px 0px 0px' }}>              <Typography sx={{
              fontSize: "20px", fontWeight: 'bold', margin: '17px 10px 0px 0px'
            }}>
              전화번호 -
            </Typography>
              <TextField
                value={phone}
                sx={{ width: '19.5vw' }}
                onChange={(e) => { setPhone(e.target.value) }} />
            </Box>
          </Box>

          <Divider orientation="vertical" flexItem
            sx={{ margin: "3px 8px 0px 8px" }} />

          <Box
            sx={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', justifyItems: 'center'
            }}>
            <Typography color='primary' sx={{
              fontSize: "25px", fontWeight: 'bold',
              margin: '10px 0px 10px 0px'
            }}>
              - 계좌 정보
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography sx={{
                fontSize: "20px", fontWeight: 'bold', margin: '17px 50px 0px 0px'
              }}>
                은행 -
              </Typography>
              <TextField
                value={bank}
                sx={{ width: '19.5vw' }}
                onChange={(e) => { setBank(e.target.value) }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px 0px 0px 0px' }}>              <Typography sx={{
              fontSize: "20px", fontWeight: 'bold', margin: '17px 10px 0px 0px'
            }}>
              계좌번호 -
            </Typography>
              <TextField
                value={account}
                sx={{ width: '19.5vw' }}
                onChange={(e) => { setAccount(e.target.value) }} />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Button variant="outlined" onClick={(e) => { deleteUser() }} sx={{
                margin: '20px 20px 0px 0px', alignSelf: 'flex-end'
              }}>
                <Typography
                  sx={{ fontSize: '27px', fontWeight: 'bold', alignSelf: 'center' }}>
                  탈퇴하기
                </Typography>
              </Button>
              <Button variant="outlined" onClick={(e) => { changeProfile() }} sx={{
                margin: '20px 0px 0px 0px', alignSelf: 'flex-end'
              }}>
                <Typography
                  sx={{ fontSize: '27px', fontWeight: 'bold', alignSelf: 'center' }}>
                  변경 내용 저장
                </Typography>
              </Button>
            </Box>

          </Box>

        </Box>
      </Box>

      <Box sx={{ border: '2px solid', borderRadius: '20px', padding: "30px", borderColor: 'primary.dark' }}>
        <Box sx={{ display: "flex", justifyContent: 'space-around' }}>
          <Typography sx={{
            fontSize: "30px", fontWeight: 'bold',
            margin: '0px', color: 'primary.dark'
          }}> 생성한 방 </Typography>

          <Typography sx={{
            fontSize: "30px", fontWeight: 'bold',
            margin: '0px', color: 'primary.dark'
          }}> 참여중인 방 </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: 'space-evenly' }}>
          <Box sx={{ display: "flex", flexDirection: 'column' }}>
            <Box>

              {
                LAPIResponseRoom.map((val, i) =>
                  val.creator == userId
                    ?
                    <SimpleRoomInfo username={LAPIResponseUser} text={'방 삭제'} mcount={val.members.length} category={val.category} createdat={val.createdat}
                      creator={val.creator} id={val.id} image={val.image} name={val.name} isclosed={val.isclosed}
                      ispurchased={val.ispurchased} iscompleted={val.iscompleted} isrecieved={val.isrecieved} key={i} />
                    :
                    <Box sx={{width: '43vw'}}></Box>
                )
              }


            </Box>
          </Box>

          <Divider orientation="vertical" flexItem
            sx={{ margin: "3px 0px 0px 0px" }} />
          <Box sx={{ display: "flex", flexDirection: 'column' }}>
            <Box>

              {
                LAPIResponseRoom.map((val, i) =>
                  val.creator == userId
                    ?
                    <Box sx={{width: '43vw'}}></Box>
                    :
                    <SimpleRoomInfo username={LAPIResponseUser} text={'방 탈퇴'} mcount={val.members.length} category={val.category} createdat={val.createdat}
                      creator={val.creator} id={val.id} image={val.image} name={val.name} isclosed={val.isclosed}
                      ispurchased={val.ispurchased} iscompleted={val.iscompleted} isrecieved={val.isrecieved} key={i} />
                )
              }


            </Box>
          </Box>
        </Box>


      </Box>
    </Box>
  )
};

export default ProfilePage;
