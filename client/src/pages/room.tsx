import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import "./css/room.css";
import { SAPIBase } from "../tools/api";
import Header from "../components/header";
// MUI import


const RoomPage = (props: {}) => {
  const navigate = useNavigate();
  const page = "Room"
  const auth = true
  return (
    <div>
      <div className="container"></div>
    </div>
  )
};

export default RoomPage;
