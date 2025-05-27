import express from "express"
import connectDb from "./database/connection/dbConnection.js";
import authRouter from "./APIroutes/authRoute.js"
import userRouter from "./APIroutes/userRoute.js"
import propertyRouter from "./APIroutes/propertyRoutes.js"
import cors from "cors"

connectDb()//connecting to db function 

const app =express();
app.use(express.json())
app.use(cors({
    origin: ["https://prop-mern-frontend.onrender.com"], // Allow your live frontend URL
    credentials: true,
  }));
const port = process.env.port || 3000;  //server port from env

app.use("/api/auth",authRouter)//when added /api/auth this route handles /login and /signup
app.use("/api/user",userRouter)// /profile and /update_profile
app.use("/api/property",propertyRouter)// /property


app.listen(port,()=>{
    console.log( `server running on http://localhost:${port}` )
})