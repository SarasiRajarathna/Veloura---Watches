//index.js is a the main file of the project. It is the entry point of the application. It is responsible for connecting to the database and starting the server. It also imorts the routers and controllers of the application.

import express from "express"
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import authenticateUser from "./middlewears/authentication.js";
import productRouter from "./routers/productRouter.js"
import cors from "cors"
import dotenv from "dotenv";

dotenv.config(); // Load all environment variables(env) to backend from .env file
const app = express();

const mongodbURI = process.env.MONGO_URI;

// Atlas (use this when network supports SRV lookups)
// const mongodbURI = "mongodb+srv://admin:1234@cluster0.ahkzxmv.mongodb.net/veloura?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongodbURI)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
    });

app.use(cors())    
app.use(express.json())

app.use("/users", userRouter)
app.use(authenticateUser)
app.use("/products", productRouter)


app.listen(3000, (req,res) => {
    console.log("Server is running on port 3000");
});