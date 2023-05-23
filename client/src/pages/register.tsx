import React, {useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import "./css/register.css";
import { SAPIBase } from "../tools/api";
import store from "../components/store";
// MUI import


const RegisterPage = (props: {}) => {
    useEffect(() => {
        console.log('');
        store.dispatch({type: 'changepage', page: 'Register'})
      }, []);
    const navigate = useNavigate();
    const page = "Register"
    const auth = true
    return (
        <div>
            <div className="container"></div>
        </div>
    )
};

export default RegisterPage;
