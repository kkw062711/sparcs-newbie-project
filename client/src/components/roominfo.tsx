import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/header.css";
import { Box, Typography, Divider, Button, TextField, MenuItem, Select } from "@mui/material";

const RoomInfo = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{
            border: '2px solid', borderRadius: '20px', width: '95vw', height:'37vh',display: 'flex',
            borderColor: 'primary.dark', margin: '20px 0px 0px 0px', alignSelf: 'center'
        }}>
            <Box sx={{
                border: '2px solid', borderRadius: '20px', width: '15vw', height: '15vw',
                borderColor: 'primary.dark', margin: '20px'
            }}>
            </Box>
            <Divider orientation="vertical"
                sx={{ margin: "0px", height: '23vh', alignSelf: 'center' }} />
            <Box sx={{
                width: '50vw', height: '25vh', margin: '20px 20px 20px 10px', padding: '0px 0px 0px 15px'
            }}>
                <Box sx={{ width: '45vw', display: 'flex', alignSelf: 'center', margin: '0px 0px 10px 0px' }}>
                    <Typography color={'secondary'} sx={{
                        fontWeight: 'bold', alignSelf: 'center'
                    }}>
                        [카테고리]
                    </Typography>
                    <Typography color={'primary.dark'} sx={{
                        margin: '0px 0px 0px 0.3vw', fontWeight: 'bold', fontSize: '30px'
                    }}>
                        방 제목
                    </Typography>
                    <Typography color={'secondary.dark'} sx={{
                        margin: '0px 0px 0px 0.5vw', fontWeight: 'bold', fontSize: '20px', alignSelf: 'flex-end'
                    }}>
                        - 생성자
                    </Typography>
                    <Typography color={'secondary'} sx={{
                        margin: '0px 0px 0px 0.5vw', fontWeight: 'bold', fontSize: '20px', alignSelf: 'flex-end'
                    }}>
                        (~언제까지)
                    </Typography>
                </Box>
                <TextField
                    disabled multiline maxRows={3} label="설명" value={" "} sx={{
                        width: '40vw'
                    }} />
            </Box>
            <Divider orientation="vertical"
                sx={{ margin: "0px", height: '23vh', alignSelf: 'center' }} />
            <Box sx={{
                width: '25vw', padding: '15px', alignSelf: 'center'
            }}>
                <Box sx={{display:'flex'}}>
                <Typography color={'primary.dark'} sx={{ fontWeight: 'bold', fontSize: '27px' }}>
                    멤버수 - n명
                </Typography>

                <Select
                  value={'1'} variant="standard" sx={{margin:'0px 0px 0px 10px'}}
                  label="정렬 옵션" >
                  <MenuItem value="1">
                    <Typography color={'primary.dark'}
                      sx={{ fontSize: '20px', fontWeight: 'bold'}}>
                      1
                    </Typography>
                  </MenuItem>
                </Select>
                </Box>

                <Box sx={{ display: 'flex', margin: '10px 0px 10px 0px' }}>
                    <Typography color={'primary.dark'} sx={{ fontWeight: 'bold', fontSize: '27px' }}>
                        가격 - n원
                    </Typography>
                    <Typography color={'primary'} sx={{
                        fontWeight: 'bold', fontSize: '20px', alignSelf: 'flex-end', margin: '0px 0px 0px 10px'
                    }}>
                        / 1인당 n원
                    </Typography>
                </Box>
                <Button variant="outlined" onClick={(e) => { navigate('/room') }}
                    sx={{
                        margin: '0px 20px 0px 0px'
                    }}>
                    <Typography
                        sx={{ fontSize: '25px', fontWeight: 'bold' }}>
                        방 정보
                    </Typography>
                </Button>

                <Button variant="outlined" onClick={(e) => {  }}
                    sx={{
                        margin: ''
                    }}>
                    <Typography
                        sx={{ fontSize: '25px', fontWeight: 'bold' }}>
                        방 참여하기
                    </Typography>
                </Button>

            </Box>
        </Box>
    );
}

export default RoomInfo;