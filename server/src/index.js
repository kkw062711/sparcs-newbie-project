// package.json 의 type이 module인 경우 import문을, commonjs인 경우 require문을 사용
// import userRouter from './routes/user.js';
// import roomRouter from './routes/room.js';
// import express from "express";
// import dotenv from "dotenv";
// import cors from 'cors';
// import path from 'path';
// import mongoose from 'mongoose';

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose')

// 라우터 정의 

const roomRouter = require('./routes/room')
const userRouter = require('./routes/user')

/* DO NOT REMOVE */
/* Configure Environment Variables */
if (process.env.ENVIRONMENT === "DEVELOPMENT") {
	dotenv.config({ path: ".env.development" })
} else {
	dotenv.config({ path: ".env.production" })
}


const app = express();
const port = process.env.EXPRESS_PORT;

app.use(express.json)

const corsOptions = {
    origin: (origin, callback) => {
        console.log('[REQUEST-CORS] Request from origin: ', origin);
        if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true)
        else callback(new Error('Not Allowed by CORS'));
    },
    credentials: true,
} 

app.use(cors(corsOptions))

//라우터 사용

app.use('/room', roomRouter);
app.use('/user', userRouter);

app.use('/static', express.static(path.join(__dirname,'public')));


const OMongooseOption = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect("mongodb://127.0.0.1:27017/GSiK", OMongooseOption).then(
    () => { console.log("[Mongoose] Connection Complete!") },
    (err) => { console.log(`[Mongoose] Connection Error: ${ err }`) }
);


app.get("/", (req, res) => {
	res.send("Hello, World!");
});


app.listen(port, () => {
	console.log(`Express Listening @ http://localhost:${ port }`);
});

