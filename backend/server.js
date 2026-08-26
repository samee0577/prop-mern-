import express from "express"
import connectDb from "./database/connection/dbConnection.js";
import authRouter from "./APIroutes/authRoute.js"
import userRouter from "./APIroutes/userRoute.js"
import propertyRouter from "./APIroutes/propertyRoutes.js"
import cors from "cors"
import "dotenv/config";

connectDb()//connecting to db function 

const app =express();
app.use(express.json())
const corsOptions = {
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL,
      ].filter(Boolean);
      const isLocalDevelopmentOrigin = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin || "");

      if (!origin || allowedOrigins.includes(origin) || isLocalDevelopmentOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Origin is not allowed by CORS"));
      }
    },
    credentials: true,
  };

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
const port = process.env.port || 3000;  //server port from env

app.use("/api/auth",authRouter)//when added /api/auth this route handles /login and /signup
app.use("/api/user",userRouter)// /profile and /update_profile
app.use("/api/property",propertyRouter)// /property


app.listen(port,()=>{
    console.log( `server running on http://localhost:${port}` )
})