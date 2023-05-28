import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/header.css";
import { Box, Divider, Typography, Button, Switch } from "@mui/material";
const SimpleRoomInfo1 = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{
            border: '2px solid', borderRadius: '20px', width: '43vw', height: '26.5vh', display: 'flex',
            borderColor: 'primary.dark', margin: '20px 0px 0px 0px', alignSelf: 'center'
        }}>
            <Box sx={{
                border: '2px solid', borderRadius: '20px', width: '10vw', height: '10vw',
                borderColor: 'primary.dark', margin: '20px'
            }}>
            </Box>
            <Divider orientation="vertical"
                sx={{ margin: "0px", height: '23vh', alignSelf: 'center' }} />
            <Box sx={{
                width: '10vw', height: '25vh', margin: '20px 20px 20px 10px', padding: '0px 0px 0px 15px'
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
                        margin: '0px 0px 0px 0.5vw', fontWeight: 'bold', fontSize: '23px', alignSelf: 'flex-end'
                    }}>
                        (인원 - n명)
                    </Typography>

                </Box>

                <Box sx={{
                    width: '28vw', height: '13vh',
                    margin: '10px 0px 10px 0px', padding: '0px 0px 0px 0px',
                    display: 'flex'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', margin: '0px 5px 0px 5px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography
                                color='primary'
                                sx={{ fontWeight: 'bold', margin: '7px 0px 0px 0px' }}>
                                마감함
                            </Typography>
                        </Box>
                        <Switch
                            onChange={(e) => { }} />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', margin: '0px 5px 0px 5px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography
                                color='primary'
                                sx={{ fontWeight: 'bold', margin: '7px 0px 0px 0px' }}>
                                구매함
                            </Typography>
                        </Box>
                        <Switch
                            onChange={(e) => { }} />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', margin: '0px 5px 0px 5px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography
                                color='primary'
                                sx={{ fontWeight: 'bold', margin: '7px 0px 0px 0px' }}>
                                배송됨
                            </Typography>
                        </Box>
                        <Switch
                            onChange={(e) => { }} />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', margin: '0px 5px 0px 5px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography
                                color='primary'
                                sx={{ fontWeight: 'bold', margin: '7px 0px 0px 0px' }}>
                                정산함
                            </Typography>
                        </Box>
                        <Switch
                            onChange={(e) => { }} />
                    </Box>

                    <Box sx={{
                        display: 'flex', flexDirection: 'column', alignSelf: 'center',
                        margin: '0px 5px 0px 20px', padding: '0px 0px 0px 10px'
                    }}>
                        <Button variant="outlined" size='small' onClick={(e) => { navigate('/room') }}>
                            <Typography
                                sx={{ fontSize: '20px', fontWeight: 'bold', alignSelf: 'center', margin: '0px 0px 0px' }}>
                                방 수정
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default SimpleRoomInfo1;