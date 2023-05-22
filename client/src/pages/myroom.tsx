import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import "./css/myroom.css";
import { SAPIBase } from "../tools/api";
import Header from "../components/header";
// MUI import


const MyroomPage = (props: {}) => {
  const navigate = useNavigate();
  const page = "Myroom"
  const auth = true
  return (
    <div>
      <div className="container"></div>
    </div>
  )
};

export default MyroomPage;
