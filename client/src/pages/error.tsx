import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../tools/interval";
import "./css/error.css";
import { SAPIBase } from "../tools/api";
import Header from "../components/header";
// MUI import


const ErrorPage = (props: {}) => {
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
