import {register, getAllAdmins, adminLogin} from '../controllers/authController.js';
import express from 'express';

const router = express.Router();

//api/auth/
router.post("/admin-register", register);
router.post("/admin-login", adminLogin);
router.get("/admins", getAllAdmins);

export default router;