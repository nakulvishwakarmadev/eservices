import { getUserByIdService,getUserByLoginIdService,getActiveUserByLoginIdService } from "../models/userModel.js";

//Standardized response function
const handleResponse = (res,status,message,data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });   
};
export const getUserById=async(req,res,next) =>{
   // const {id}=req.body;
   console.log('getUserById methdd called');
    try {
        const user= await getUserByIdService(req.params.id);
        if (!user || (Array.isArray(user) && user.length === 0)) { 
            return handleResponse(res,404,"User not found");
        }
        handleResponse(res,200,"User fetched successfully",user);
        
    } catch (error) {
        next(error);
    }
}
export const getUsers = async (req, res, next) => {
    const { id } = req.body;  // This assumes the id is passed in the body for POST requests
    // Alternatively, if it's a GET request, use req.params.id: const { id } = req.params;

    try {
        const user = await getUserByIdService(id);
        // Check if user is null or undefined (if it's a single user object) or if it's an empty array
        if (!user || (Array.isArray(user) && user.length === 0)) { 
            return handleResponse(res, 404, "User not found");
        }

        // If a single user is returned, send the response with the user data
        handleResponse(res, 200, "User fetched successfully", user);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};
export const getUsersByLoginId = async (req, res, next) => {
    console.log('getUsersByLoginId methdd called');
    console.log(`req.body.loginId`,req.body.loginId);
    const { loginId } = req.body;  // This assumes the id is passed in the body for POST requests
    // Alternatively, if it's a GET request, use req.params.id: const { id } = req.params;
    try {
        const user = await getUserByLoginIdService(loginId);
        // Check if user is null or undefined (if it's a single user object) or if it's an empty array
        if (!user || (Array.isArray(user) && user.length === 0)) { 
            return handleResponse(res, 404, "User not found");
        }

        // If a single user is returned, send the response with the user data
        handleResponse(res, 200, "User fetched successfully", user);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};
export const getActiveUsersByLoginId = async (req, res, next) => {
    console.log('getActiveUsersByLoginId methdd called');
    console.log(`req.body.loginId`,req.body.loginId);

    const { loginId } = req.body;  // This assumes the id is passed in the body for POST requests
    // Alternatively, if it's a GET request, use req.params.id: const { id } = req.params;

    try {
        const user = await getActiveUserByLoginIdService(loginId);
        // Check if user is null or undefined (if it's a single user object) or if it's an empty array
        if (!user || (Array.isArray(user) && user.length === 0)) { 
            return handleResponse(res, 404, "User not found");
        }

        // If a single user is returned, send the response with the user data
        handleResponse(res, 200, "User fetched successfully", user);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};