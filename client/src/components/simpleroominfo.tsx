import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/header.css";
import { Box, Divider, Typography, Button, Switch } from "@mui/material";
import store from "./store";
import { SAPIBase } from "../tools/api";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "./reducer";

interface IAPIResponseUser { name: string }


const SimpleRoomInfo = (props: {
    text, mcount, category, createdat, creator, id, image, name, isclosed,
    ispurchased, iscompleted, isrecieved, username, key
}) => {
    useEffect(() => {
        const getUsernName = async () => {
            const { data } = await axios.post<IAPIResponseUser[]>(SAPIBase + '/user/getUser', { id: props.creator });
            setLAPIResponseUser(data);
        };
        getUsernName().catch((e) => window.alert(`Error while running API Call: ${e}`));
        return () => { }
    }, []);

    const navigate = useNavigate();
    const userId = useSelector((state: RootState) => state.auth)
    const [ispurchased, setIspurchased] = useState(props.ispurchased)
    const [isclosed, setIsclosed] = useState(props.isclosed)
    const [iscompleted, setIscompleted] = useState(props.iscompleted)
    const [isrecieved, setIsrecieved] = useState(props.isrecieved)
    const [is, setIs] = useState([props.isclosed, props.ispurchased, props.isrecieved, props.iscompleted])
    const [LAPIResponseuser, setLAPIResponseUser] = useState<IAPIResponseUser[]>([]);
    const iscreator = props.text=='방 삭제' ? false : true

    const changeis = (n) => {
        console.log(n)
        is[n] = !is[n]
        setIs([...is])
        console.log(is)
        updateRoom()
    }



    const deleteRoom = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            const asyncFun = async () => {
                const deleteRoom = await axios.post(SAPIBase + '/room/deleteRoom', { id: props.id });
                console.log(deleteRoom)
            }
            asyncFun().catch(e => { window.alert(`Delete Error! ${e}`) });
            location.reload();
        } else {
            return
        }
    }

    const outRoom = () => {
        if (window.confirm("정말 탈퇴하시겠습니까?")) {
            const asyncFun = async () => {
                const Roomout = await axios.post(SAPIBase + '/room/updateRoomMember', {
                    roomid: props.id, userid: userId, ifadd: false
                });
                console.log(Roomout)
                location.reload()
            }
            asyncFun().catch(e => window.alert(`Out Error! ${e}`));
        } else {
            return
        }
    }

    const updateRoom = () => {
        console.log(isclosed)
        const asyncFun = async () => {
            const updateRoom = await axios.post(SAPIBase + '/room/updateRoomState', {
                id: props.id, isclosed: is[0],
                ispurchased: is[1], iscompleted: is[3],
                isrecieved: is[2]
            });
        }
        asyncFun().catch(e => window.alert(`Out Error! ${e}`));

    }

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
                        margin: '0px 0px 0px 0.5vw', fontWeight: 'bold', fontSize: '23px', alignSelf: 'flex-end'
                    }}>
                        (인원 - {props.mcount}명)
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

                        <Switch checked={is[0]} disabled={iscreator}
                            sx={{ fontWeight: 'bold' }} color='secondary' onClick={(e) => { changeis(0) }} />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', margin: '0px 5px 0px 5px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography
                                color='primary'
                                sx={{ fontWeight: 'bold', margin: '7px 0px 0px 0px' }}>
                                구매함
                            </Typography>
                        </Box>
                        <Switch disabled={iscreator} checked={is[1]} sx={{ fontWeight: 'bold' }} color='secondary' onClick={(e) => { changeis(1) }} />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', margin: '0px 5px 0px 5px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography
                                color='primary'
                                sx={{ fontWeight: 'bold', margin: '7px 0px 0px 0px' }}>
                                배송됨
                            </Typography>
                        </Box>
                        <Switch disabled={iscreator} checked={is[2]} sx={{ fontWeight: 'bold' }} color='secondary' onClick={(e) => { changeis(2) }} />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', margin: '0px 5px 0px 5px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography
                                color='primary'
                                sx={{ fontWeight: 'bold', margin: '7px 0px 0px 0px' }}>
                                정산함
                            </Typography>
                        </Box>
                        <Switch disabled={iscreator} checked={is[3]} sx={{ fontWeight: 'bold' }} color='secondary' onClick={(e) => { changeis(3) }} />

                    </Box>

                    <Box sx={{
                        display: 'flex', flexDirection: 'column', alignSelf: 'center',
                        margin: '0px 5px 0px 20px', padding: '0px 0px 0px 10px'
                    }}>
                        <Button variant="outlined" size='small' onClick={(e) => {
                            store.dispatch({ type: 'changeroom', room: props.id });
                            navigate('/room')
                        }}>
                            <Typography
                                sx={{ fontSize: '20px', fontWeight: 'bold', alignSelf: 'center', margin: '0px 0px 0px' }}>
                                방 정보
                            </Typography>
                        </Button>
                        <Button variant="outlined" size='small' onClick={(e) => {
                            if (props.text == '방 삭제') {
                                deleteRoom();
                            }
                            else {
                                outRoom();
                            }
                        }}
                            sx={{ margin: "10px 0px 0px 0px" }}>
                            <Typography
                                sx={{ fontSize: '20px', fontWeight: 'bold', alignSelf: 'center', margin: '0px 0px 0px' }}>
                                {props.text}
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default SimpleRoomInfo;