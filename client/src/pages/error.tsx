import React , {useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import "./css/error.css";
import { SAPIBase } from "../tools/api";
import Header from "../components/header";
import store from "../components/store";
// MUI import


const ErrorPage = (props: {}) => {
  useEffect(() => {
    console.log('');
    store.dispatch({type: 'changepage', page: 'Error'})
  }, []);
  const navigate = useNavigate();
  const page = "Error"
  return (
    <div>
      <div className="container">
        Something Wen't Wrong!!!
      </div>
    </div>
  )
};

export default ErrorPage;
