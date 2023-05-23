import React , {useEffect}from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import "./css/room.css";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
// MUI import


const RoomPage = (props: {}) => {
  useEffect(() => {
    console.log('');
    store.dispatch({type: 'changepage', page: 'Room'})
  }, []);
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
