import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
// MUI import


const MyroomPage = (props: {}) => {
  useEffect(() => {
    console.log('');
    store.dispatch({ type: 'changepage', page: 'Myroom' })
  }, []);
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
