import React from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "./loginbutton";
import ProfileButton from "./profilebutton";
import "./css/header.css";
import { useSelector } from "react-redux";
import { RootState } from "./reducer";
import { useDispatch } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const page = useSelector((state: RootState) => state.page);
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const changeAuth = (auth) => {
      dispatch({ type: 'changeauth',auth : auth })
    }
    return (
        <div className="header">
            <h3 className="name" onClick={(e) => { navigate("/"); changeAuth(false) }}>Group Shopping in Kaist</h3>
            <div className="page">-{page}</div>
            <div className="auth">{auth ? <ProfileButton /> : <LoginButton />}</div>
        </div>
    );
}

export default Header;


