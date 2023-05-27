const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv')//.config();

const roomRouter = require('./routes/room')
const userRouter = require('./routes/user')
const port = process.env.EXPRESS_PORT;
const app = express();
app.use(express.json());

if (process.env.ENVIRONMENT === "DEVELOPMENT") {
	dotenv.config({ path: ".env.development" })
} else {
	dotenv.config({ path: ".env.production" })
}

const whitelist = ['http://localhost:5173'];
const corsOptions = {
    origin: (origin, callback) => {
        console.log('[REQUEST-CORS] Request from origin: ', origin);
        if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true)
        else callback(new Error('Not Allowed by CORS'));
    },
    credentials: true,
} 


app.use(cors(corsOptions));

app.use('/room', roomRouter);
app.use('/user', userRouter);

app.use('/static', express.static(path.join(__dirname,'public')));



app.listen(port, () => {
   console.log(`Example App Listening @ http://localhost:${ port }`);
});
