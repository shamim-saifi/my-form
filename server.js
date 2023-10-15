import Express from "express";
import { db } from './backend/db/dataBase.js';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import cloudinary from 'cloudinary'

import router from "./backend/Router/UserRouter.js";
import userrouter from "./backend/Router/FormRouter.js";

import path from "path";


dotenv.config({ path: './backend/Config/config.env' })

db()
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})
const app = Express()
app.use(Express.json({limit:'50mb'}))
app.use(Express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser())
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))

app.use('/api/user', router)
app.use('/api/form', userrouter)




app.use(Express.static(path.resolve('./frontend/build')))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve('./frontend/build/index.html'))
})

app.listen(process.env.PORT, () => {
    console.log(`port is ready ${process.env.PORT}`)
})