import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routers";

dotenv.config();

const app = express();


// Kết nối db
mongoose.connect(`mongodb://localhost:27017/web503`);
// middleware

app.use(express.json());

// router
app.use("/api",router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
