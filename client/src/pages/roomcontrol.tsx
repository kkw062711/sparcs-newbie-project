import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import "./css/roomcontrol.css";
import { SAPIBase } from "../tools/api";
import Header from "../components/header";
// MUI import


const RoomcontrolPage = (props: {}) => {
  const navigate = useNavigate();
  const page = "Roomcontrol"
  const auth = true
  return (
    <div>
      <div className="container"></div>
    </div>
  )
};

export default RoomcontrolPage;
