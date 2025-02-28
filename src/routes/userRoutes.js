import express from "express";

import { getActiveUsersByLoginId, getUserById, getUsers, getUsersByLoginId } from "../controllers/userController.js";
import { validateLoginId, validateUserId } from "../middelwares/inputValidator.js";

const router=express.Router();

router.get("/:id",getUserById);
router.post("/",validateUserId,getUsers);
router.post("/getUsersByLoginId", validateLoginId,getUsersByLoginId);
router.post("/getActiveUserByLoginIdService",validateLoginId, getActiveUsersByLoginId);

export default router;
