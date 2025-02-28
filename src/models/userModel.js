import pool from "../config/db.js";

export const getUserByIdService=async(id)=>{
    console.log("id"+id);
    const client = await pool.connect(); // manually connect to the database
    let result;
    try {

        result= await client.query("select * from hp_edist.um_users where id=$1",[id]);    
        return result.rows;
         } catch (error) {
        console.error("Error executing query", error.message);
        throw new Error('Database query failed'); 
        }finally{
        client.release(); // Release the connection back to the pool
        console.log("Query finished, connection returned to the pool.");
        }    
}


export const getUserByLoginIdService = async (loginId) => {
    

    if (typeof loginId !== 'string') {
        throw new Error("Invalid loginId: Expected a string.");
    }

    const client = await pool.connect(); // manually connect to the database
    let result;
    try {
     result = await client.query("SELECT * FROM hp_edist.um_users WHERE login_id = $1", [loginId]);

    return result.rows;  // Return the user rows
    } catch (error) {
    console.error("Error executing query", error.message);
    throw new Error('Database query failed'); 
    }finally{
    client.release(); // Release the connection back to the pool
    console.log("Query finished, connection returned to the pool.");
    }    
};

export const getActiveUserByLoginIdService = async (loginId) => {
    console.log("loginId: ", loginId);

    if (typeof loginId !== 'string') {
        throw new Error("Invalid loginId: Expected a string.");
    }

    const client = await pool.connect(); // manually connect to the database
    let result;
    try {
    // Query to fetch user from database
    result = await client.query("SELECT * FROM hp_edist.um_users WHERE login_id = $1 and is_active=$2", [loginId,1]);
    return result.rows;  // Return the user rows
} catch (error) {
    console.error("Error executing query", error.message);
    throw new Error('Database query failed'); 
    }finally{
    client.release(); // Release the connection back to the pool
    console.log("Query finished, connection returned to the pool.");
    }    
};