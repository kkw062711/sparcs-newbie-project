import React , {useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import { SAPIBase } from "../tools/api";
import Header from "../components/header";
import store from "../components/store";
import { Box, Typography } from "@mui/material";
// MUI import


const ErrorPage = (props: {}) => {
  useEffect(() => {
    console.log('');
    store.dispatch({type: 'changepage', page: 'Error'})
  }, []);
  const navigate = useNavigate();
  const page = "Error"
  return (
    <Box>
      <Typography className="container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0',
        marginTop: '200px',
        fontSize: '70px'
      }} >
        Something Wen't Wrong!!!
      </Typography>
    </Box>
  )
};

export default ErrorPage;
