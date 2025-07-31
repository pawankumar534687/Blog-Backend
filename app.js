import express from "express";
import connectDB from "./db/dbConnections.js";
import blog from "./routes/blog.routes.js"
import cors from "cors"
const app = express()
import dotenv from "dotenv";
dotenv.config()

const PORT = process.env.PORT || 6000
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174','https://blog-frontend-388e.onrender.com','https://blog-admin-zu4c.onrender.com' ], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
   
}));

app.use(express.json());
connectDB()

app.use("/api", blog)

app.use((err,req,res,next) =>{
     console.error(" ERROR:", err);
    const status = err.status || 500;
    const message = err.message ||  "Something went wrong";
    res.status(status).json({error: message});
});

app.listen(PORT, () =>{
     console.log(`Server running on port ${PORT}`);
})

