import React from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "./loginbutton";
import ProfileButton from "./profilebutton";
import "./css/header.css";
import { useSelector } from "react-redux";
import { RootState } from "./reducer";
import { Box, Typography } from "@mui/material";

const Header = () => {
    const navigate = useNavigate();
    const page = useSelector((state: RootState) => state.page);
    const auth = useSelector((state: RootState) => state.auth);
    return (
        <Box className="header" sx={{
            display: 'flex', alignItems: 'center', flexWrap: 'nowrap',
            padding: '0px 0px 0px 10px', flexDirection: 'row', overflow:'hidden'
        }}>
            <Typography className="name" onClick={(e) => { navigate("/") }}
                sx={{
                    fontSize: '50px', margin: '0px', padding: '0px', fontWeight:'bold'
                }}>
                Group Shopping in Kaist
            </Typography>
            <Box className="page" sx={{fontSize: '25px', color: 'dimgray'}}>
                -{page}
                </Box>
            <Box className="auth" sx={{margin: "0px 5px 0px auto"}}>
                {auth!=='0' ? <ProfileButton /> : <LoginButton />}
            </Box>
        </Box>
    );
}

export default Header;


