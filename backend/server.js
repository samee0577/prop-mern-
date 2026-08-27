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
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
const port = process.env.port || 3000;  //server port from env

app.use("/api/auth",authRouter)//when added /api/auth this route handles /login and /signup
app.use("/api/user",userRouter)// /profile and /update_profile
app.use("/api/property",propertyRouter)// /property


if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
  });
}

export default app;