import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
import { Box, Typography, Button, TextField, Divider, Paper, Switch, List, Select } from "@mui/material";
// MUI import


const RoomPage = (props: {}) => {
  useEffect(() => {
    console.log('');
    store.dispatch({ type: 'changepage', page: 'Room' })
  }, []);
  const navigate = useNavigate();

  const [title, setTitle] = useState('Title')
  const [creator, setCreator] = useState('Creator')
  const [category, setCategory] = useState('Category')

  return (
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
            [{category}]
          </Typography>

          <Typography
            sx={{
              fontSize: '35px', margin: '0px', padding: '0px', fontWeight: 'bold'
            }}>
            {title}
          </Typography>

          <Typography className="page"
            sx={{
              fontSize: '20px', color: 'dimgray',
              margin: '0px 50px 10px -10px', fontWeight: 'bold'
            }}>
            - 방 생성자 : {creator}
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
              onChange={(e) => { }} disabled
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
              onChange={(e) => { }} disabled
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
              onChange={(e) => { }} disabled
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
              onChange={(e) => { }} disabled
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
                  fontWeight: 'bold', fontSize: '25px', margin: '50px 10px 0px 20px',
                  justifySelf: 'flex-start'
                }}>
                멤버 - n명
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                <Paper style={{ maxHeight: '20vh', width:'25vw' ,overflow: 'auto' }}>
                  <List>
                    ...
                  </List>
                  <List>
                    ...
                  </List>
                  <List>
                    ...
                  </List>

                </Paper>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', margin:'30px 0px 0px 0px'}}>
              <Typography
                sx={{
                  fontWeight: 'bold', fontSize: '25px', margin: '0px 10px 0px 20px',
                  justifySelf: 'flex-start'
                }}>
                가격 - n원
              </Typography>

              <Typography
                sx={{
                  fontWeight: 'bold', fontSize: '25px', margin: '0px 10px 0px 20px',
                  justifySelf: 'flex-start'
                }}>
                기한

              </Typography>

            </Box>

          </Box>

        </Box>
      </Box>

    </Box>
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