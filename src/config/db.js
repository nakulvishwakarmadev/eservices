import pkg from "pg";
import dotenv from "dotenv";

const {Pool}=pkg;
dotenv.config();

const pool=new Pool({    
   user: process.env.DATABASE_USER,
   host: process.env.DATABASE_HOST,
   database: process.env.DATABASE_NAME,
   password: process.env.DATABASE_PASSWORD,
   port: process.env.DATABASE_PORT,
   max: process.env.DATABASE_POOL_SIZE, // maximum number of connections in the pool
  idleTimeoutMillis: process.env.DATABSE_IDLETIMEOUTMILLIS, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: process.env.DATABSE_CONNECTIONTIMEOUTMILLIS, // how long to wait for a connection to be established
});

pool.on("onnect",()=>{
    console.log("Connection Pool estalished with database");
});
export default pool;
