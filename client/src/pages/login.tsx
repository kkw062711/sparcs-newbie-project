import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import "./css/login.css";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
import Box from '@mui/material/Box';
import Boxtheme from "./css/muicolor";
import { ThemeProvider } from "@emotion/react";

// MUI import

const LoginPage = (props: {}) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('');
    store.dispatch({ type: 'changepage', page: 'Login' })
  }, []);
  const page = "Login"
  const auth = true
  return (
    <div className="container">
      <ThemeProvider theme={Boxtheme}>
          <Box className="loginbox" color="secondory.light"/>
      </ThemeProvider>
    </div>
  )
};

export default LoginPage;


/*
 */