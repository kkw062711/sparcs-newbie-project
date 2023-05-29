import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/header.css";
import { Box, Typography, Divider, Button, TextField, MenuItem, Select } from "@mui/material";
import store from "./store";
import { Category } from "@mui/icons-material";
import axios from "axios";
import { SAPIBase } from "../tools/api";
import { useSelector } from "react-redux";
import { RootState } from "./reducer";

interface IAPIResponseUser { name: string }

const RoomInfo = (props: {  category, createdat, creator, description, id, image, name, price, members, key }) => {
    const userId = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [joined, setJoined] = useState(false)

    const [LAPIResponseuser, setLAPIResponseUser] = useState<IAPIResponseUser[]>([]);
    useEffect(() => {
        const getUsernName = async () => {
            const { data } = await axios.post<IAPIResponseUser[]>(SAPIBase + '/user/getUser', { id: props.creator });
            setLAPIResponseUser(data);
        };
        getUsernName().catch((e) => window.alert(`Error while running API Call: ${e}`));

        props.members.forEach(element => {
            if (element == userId) {
                setJoined(true)
            }
        })
        return () => { }
    }, []);

    const roomjoin = () => {
        const asyncFun = async () => {
            const Roomjoin = await axios.post(SAPIBase + '/room/updateRoomMember', {
                roomid: props.id, userid: userId, ifadd: true
            });
            store.dispatch({ type: 'changeroom', room: props.id })
            navigate('/room')
        }
        asyncFun().catch(e => window.alert(`Login Error! ${e}`));
    }


    return (
        <Box sx={{
            border: '2px solid', borderRadius: '20px', width: '95vw', height: '37vh', display: 'flex',
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
                        [{props.category}]
                    </Typography>
                    <Typography color={'primary.dark'} sx={{
                        margin: '0px 0px 0px 0.3vw', fontWeight: 'bold', fontSize: '30px'
                    }}>
                        {props.name}
                    </Typography>
                    <Typography color={'secondary.dark'} sx={{
                        margin: '0px 0px 0px 0.5vw', fontWeight: 'bold', fontSize: '20px', alignSelf: 'flex-end'
                    }}>
                        - by. {LAPIResponseuser.name}
                    </Typography>
                    <Typography color={'secondary'} sx={{
                        margin: '0px 0px 0px 0.5vw', fontWeight: 'bold', fontSize: '20px', alignSelf: 'flex-end'
                    }}>
                        {props.createdat}
                    </Typography>
                </Box>
                <TextField
                    disabled multiline maxRows={3} label="설명" value={props.description} sx={{
                        width: '40vw'
                    }} />
            </Box>
            <Divider orientation="vertical"
                sx={{ margin: "0px", height: '23vh', alignSelf: 'center' }} />
            <Box sx={{
                width: '25vw', padding: '15px', alignSelf: 'center'
            }}>
                <Box sx={{ display: 'flex' }}>
                    <Typography color={'primary.dark'} sx={{ fontWeight: 'bold', fontSize: '27px' }}>
                        멤버수 - {props.members.length}명
                    </Typography>

                </Box>

                <Box sx={{ display: 'flex', margin: '10px 0px 10px 0px' }}>
                    <Typography color={'primary.dark'} sx={{ fontWeight: 'bold', fontSize: '27px' }}>
                        가격 - {props.price}원
                    </Typography>
                    <Typography color={'primary'} sx={{
                        fontWeight: 'bold', fontSize: '20px', alignSelf: 'flex-end', margin: '0px 0px 0px 10px'
                    }}>
                        / 1인당 {props.price / props.members.length}원
                    </Typography>
                </Box>
                <Button variant="outlined" onClick={(e) => {
                    store.dispatch({ type: 'changeroom', room: props.id })
                    navigate("/room")
                }}
                    sx={{
                        margin: '0px 20px 0px 0px'
                    }}>
                    <Typography
                        sx={{ fontSize: '25px', fontWeight: 'bold' }}>
                        방 정보
                    </Typography>
                </Button>
                {userId == '0'
                    ?
                    <Button variant="outlined" disabled={true}
                        onClick={(e) => { roomjoin() }}
                        sx={{
                            margin: ''
                        }}>
                        <Typography
                            sx={{ fontSize: '25px', fontWeight: 'bold' }}>
                            로그인 필요
                        </Typography>
                    </Button>
                    :
                    <Button variant="outlined" disabled={!joined ? false : true}
                        onClick={(e) => { roomjoin() }}
                        sx={{
                            margin: ''
                        }}>
                        <Typography
                            sx={{ fontSize: '25px', fontWeight: 'bold' }}>
                            {!joined ? "참여하기" : "참여함"}
                        </Typography>
                    </Button>
                }


            </Box>
        </Box>
    );
}

export default RoomInfo;