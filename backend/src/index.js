import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import { io,app,server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());


app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
}))
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoute)

server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    connectDB()
})