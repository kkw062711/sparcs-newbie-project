import React, {useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import "./css/profile.css";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
// MUI import


const ProfilePage = (props: {}) => {
  useEffect(() => {
    console.log('');
    store.dispatch({type: 'changepage', page: 'Profile'})
  }, []);
  const navigate = useNavigate();
  const page = "Profile"
  const auth = true
  return (
    <div>
      <div className="container"></div>
    </div>
  )
};

export default ProfilePage;
