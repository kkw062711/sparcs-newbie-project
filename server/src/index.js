import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

// 라우터 정의

import roomRouter from './routes/room';
import userRouter from './routes/user';

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

