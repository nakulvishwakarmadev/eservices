import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middelwares/errorHandler.js";
import * as Constants from './util/Constant.js';
import { encryptDecrypt } from './util/Utility.js'; 




dotenv.config();

const app = express();

const port= process.env.PORT || 3001;

//Middlewares
app.use(express.json()); 
app.use(cors());

//Routes
app.use("/api/user",userRoutes);

//Error Handling Middelwares
app.use(errorHandling);
//Testing POSTGRES Connection
app.get("/", async(req,res) =>{
console.log("Start")   ;
// Run the query to get the current database name
const result = await pool.query("SELECT current_database()");
console.log("Connected");
// Log the entire result to see the column name
console.log("result", result.rows[0]);
// Access the correct column 'current_database'
res.send(`The database name is: ${result.rows[0].current_database}`);
});
//Service Running
app.listen(port,()=>{
    //Start land encryption/decryption method
    const textToEncrypt = "Hello, this is a test!";
    const encryptedText = encryptDecrypt(textToEncrypt, 'E');
    console.log('Encrypted:', encryptedText);
    
    const decryptedText = encryptDecrypt(encryptedText, 'D');
    console.log('Decrypted:', decryptedText);
//End land encryption/decryption method

    console.log(`Service is running on http//localhost:${port}`);

});


