// const express = require('express')
import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
// const cors = require('cors');
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import adminRouter from './routes/admin-routes.js';
import movieRouter from './routes/movie-routes.js';
import bookingRouter from './routes/booking-routers.js';


dotenv.config();

const app = express();

// Allow requests from http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000'
}));

// middlewares
app.use(express.json())
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);



mongoose.connect(
    `mongodb+srv://root:${process.env.mongoPass}@bookstore-mern.v4ejn78.mongodb.net/?retryWrites=true&w=majority&appName=BookStore-MERN`
)
    .then(() =>
        app.listen(5000, () =>
            console.log(`App is running on port ${5000}`)
        )
    )
    .catch((e) => console.log(e))


app.use('/', (req, res, next) => {
    res.send("<h1>hii</h1>");
})




// mongodb+srv://root:root@bookstore-mern.v4ejn78.mongodb.net/?retryWrites=true&w=majority&appName=BookStore-MERN