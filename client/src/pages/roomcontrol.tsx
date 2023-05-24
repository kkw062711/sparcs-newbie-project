import React, {useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
// MUI import


const RoomcontrolPage = (props: {}) => {
  useEffect(() => {
    console.log('');
    store.dispatch({type: 'changepage', page: 'Roomcontrol'})
  }, []);
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
