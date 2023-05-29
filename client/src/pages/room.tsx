import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
import { Box, Typography, Button, TextField, Divider, Paper, Switch, List, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../components/reducer";

interface IAPIResponse1 {
  category: string, creator: string, createdat:string,
  description: string, image: string, isclosed: boolean,
  ispurchased: boolean, iscompleted: boolean, isrecieved: boolean,
  members: IAPIResponse2[], name: string, price: number
}
interface IAPIResponse2 {
  name: string, phone: string, bank: string, account: string, email: string
}

const RoomPage = (props: {}) => {
  const roomid = useSelector((state: RootState) => state.room);
  useEffect(() => {
    store.dispatch({ type: 'changepage', page: 'Room' })
    let BComponentExited = false;
    const asyncFun = async () => {
      const { data } = await axios.post<IAPIResponse1[]>(SAPIBase + '/room/getRoombyId', { id: roomid });
      if (BComponentExited) return;
      setLAPIResponse(data);
    };
    asyncFun().catch((e) => window.alert(`Error while running API Call: ${e}`));
    return () => { BComponentExited = true; }

    // const asyncFun = async () => {
    //   const added = await axios.post(SAPIBase + '/room/getRoombyId', {id:roomid});
    //     setTitle(added.data.name)
    //     setCreator(added.data.creator)
    //     setCategory(added.data.category)
    //     setDescription(added.data.description)
    //     setPrice(added.data.price)
    //     setMembers(added.data.members)
    //     setIspurchased(added.data.ispurchased)
    //     setIsclosed(added.data.isclosed)
    //     setIscompleted(added.data.iscompleted)
    //     setIsrecieved(added.data.isrecieved)
    // }
    // asyncFun().catch(e => window.alert(`addUser Error! ${e}`));
  }, []);
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(true)
  const [title, setTitle] = useState('')
  const [creator, setCreator] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [members, setMembers] = useState([])
  const [ispurchased, setIspurchased] = useState(false)
  const [isclosed, setIsclosed] = useState(false)
  const [iscompleted, setIscompleted] = useState(false)
  const [isrecieved, setIsrecieved] = useState(false)
  const [LAPIResponse, setLAPIResponse] = useState<IAPIResponse1[]>([]);



  return (
    LAPIResponse.map((val, i) =>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: "30px" }}>
        <Box sx={{
          border: '2px solid', borderRadius: '20px', padding: "20px",
          borderColor: 'primary.dark', margin: '0px 0px 20px 0px'
        }}>

          <Box sx={{
            display: 'flex', alignItems: 'center', flexWrap: 'nowrap',
            padding: '0px 0px 0px 10px', flexDirection: 'row', overflow: 'hidden'
          }}>

            <Typography
              sx={{
                fontSize: '35px', margin: '0px 10px 0px 0px',
                padding: '0px', fontWeight: 'bold', color: 'darkgray'
              }}>

              [{val.category}]
            </Typography>

            <Typography
              sx={{
                fontSize: '35px', margin: '0px', padding: '0px', fontWeight: 'bold'
              }}>
            </Typography>
            {val.name}
            <Typography className="page"
              sx={{
                fontSize: '20px', color: 'dimgray',
                margin: '0px 50px 10px -10px', fontWeight: 'bold'
              }}>
              - 방 생성자 : {val.creator}
            </Typography>

            <Divider orientation="vertical" flexItem
              sx={{ margin: "3px 50px 0px 8px" }} />

            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{ fontWeight: 'bold', margin: '0px 5px 0px 0px', fontSize: '25px' }}
                color='secondary.dark'>
                ●
              </Typography>
              <Typography
                color='secondary.dark'
                sx={{ fontWeight: 'bold', margin: '7px 0px 0px 0px' }}>
                마감됨
              </Typography>
              <Switch
                onChange={(e) => { }} disabled defaultChecked={val.isclosed}
                sx={{ fontWeight: 'bold', margin: '0px 0px 0px 5px' }} />
            </Box>

            <Divider orientation="vertical"
              sx={{ margin: "3px 10px 0px 8px", height: '25px' }} />

            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{ fontWeight: 'bold', margin: '0px 5px 0px 0px', fontSize: '25px' }}
                color='secondary.dark'>
                ●
              </Typography>
              <Typography
                color='secondary.dark'
                sx={{ fontWeight: 'bold', margin: '7px 0px 0px 0px' }}>
                구매함
              </Typography>
              <Switch
                onChange={(e) => { }} disabled defaultChecked={val.ispurchased}
                sx={{ fontWeight: 'bold', margin: '0px 0px 0px 5px' }} />
            </Box>

            <Divider orientation="vertical"
              sx={{ margin: "3px 10px 0px 8px", height: '25px' }} />

            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{ fontWeight: 'bold', margin: '0px 5px 0px 0px', fontSize: '25px' }}
                color='secondary.dark'>
                ●
              </Typography>
              <Typography
                color='secondary.dark'
                sx={{ fontWeight: 'bold', margin: '7px 0px 0px 0px' }}>
                수령함
              </Typography>
              <Switch
                onChange={(e) => { }} disabled defaultChecked={val.isrecieved}
                sx={{ fontWeight: 'bold', margin: '0px 0px 0px 5px' }} />
            </Box>

            <Divider orientation="vertical"
              sx={{ margin: "3px 10px 0px 8px", height: '25px' }} />
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{ fontWeight: 'bold', margin: '0px 5px 0px 0px', fontSize: '25px' }}
                color='secondary.dark'>
                ●
              </Typography>
              <Typography
                color='secondary.dark'
                sx={{ fontWeight: 'bold', margin: '7px 0px 0px 0px' }}>
                정산함
              </Typography>
              <Switch
                onChange={(e) => { }} disabled defaultChecked={val.iscompleted}
                sx={{ fontWeight: 'bold', margin: '0px 0px 0px 5px' }} />
            </Box>

          </Box>

          <Box sx={{
            display: 'flex', alignItems: 'center', flexWrap: 'nowrap',
            padding: '0px 0px 0px 10px', flexDirection: 'row', overflow: 'hidden'
          }}>
            <Box sx={{
              width: '13vw', height: '13vw',
              border: '2px solid', borderRadius: '20px', padding: "20px",
              borderColor: 'primary.dark', margin: '30px 0px 20px 0px'
            }} />

            <Divider orientation="vertical" flexItem
              sx={{ margin: "3px 7px 0px 20px" }} />

            <Box>
              <Typography
                sx={{ fontWeight: 'bold', fontSize: '25px', margin: '0px 0px 0px 20px' }}>
                설명 -
              </Typography>
              <TextField
                value={val.description}
                multiline
                rows={5}
                disabled
                variant="filled"
                sx={{ margin: '0px 0px 0px 20px', width: '30vw' }} />
            </Box>

            <Divider orientation="vertical" flexItem
              sx={{ margin: "3px 7px 0px 20px" }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography
                  sx={{
                    fontWeight: 'bold', fontSize: '25px', margin: '0px 10px 0px 20px',
                    justifySelf: 'center', alignSelf: 'center'
                  }}>
                  멤버 - {val.members.length}명
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                  <Paper style={{ maxHeight: '20vh', width: '25vw', overflow: 'auto' }}>
                    {val.members.map((member, i) =>
                      <List>
                        <Box sx={{ display: 'flex' }}>
                          <Typography sx={{ margin: '0px 0px 0px 5px', fontWeight: 'bold' }}>
                            {member.name} ({member.email}) -- {member.phone} --
                            [{member.bank}:{member.account}]
                          </Typography>

                          <Button sx={{ margin:'0px 0px 0px auto' }}>
                          <Typography color='#ff0000'>
                            X
                          </Typography>
                          </Button>

                        </Box>

                      </List>
                    )}

                  </Paper>

                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', margin: '30px 0px 0px 0px' }}>
                <Typography
                  sx={{
                    fontWeight: 'bold', fontSize: '25px', margin: '0px 10px 0px 20px',
                    justifySelf: 'flex-start'
                  }}>
                  가격 - {val.price}원
                </Typography>

              </Box>

            </Box>

          </Box>
        </Box>

      </Box>
    )
  )
};

export default RoomPage;
/*
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function SwitchLabels() {
  return (
    <FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} label="Label" />
      <FormControlLabel required control={<Switch />} label="Required" />
      <FormControlLabel disabled control={<Switch />} label="Disabled" />
    </FormGroup>
  );
}

*/