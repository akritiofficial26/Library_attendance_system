import { getAllAttendance, checkIn, checkOut, getTodayStatus } from "../controllers/attendanceController.js";
import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get all attendance records
router.get("/all", getAllAttendance);

// Check-in endpoint
router.post("/check-in", checkIn);

// Check-out endpoint  
router.post("/check-out", checkOut);

// Get today's status for a student
router.get("/status/:collegeId", getTodayStatus);

export default router;