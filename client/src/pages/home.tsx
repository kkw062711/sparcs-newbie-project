import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import "./css/home.css";
import { SAPIBase } from "../tools/api";
import Header from '../components/header';
import { Button } from "@mui/material";

// MUI import

const HomePage = (props) => {
  return (
    <div>
      <div className="container"></div>
    </div>
  )
};

export default HomePage;
