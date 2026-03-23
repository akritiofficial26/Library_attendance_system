import prisma from '../config/prisma.config.js';

// Get all attendance records
export const getAllAttendance = async (req, res) => {
    try {
        const attendanceRecords = await prisma.attendance.findMany({
            include: {
                student: {
                    select: {
                        id: true,
                        collegeId: true,
                        fullName: true
                    }
                }
            },
            orderBy: {
                date: 'desc'
            }
        });

        res.status(200).json({
            success: true,
            attendanceRecords
        });
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error fetching attendance records' 
        });
    }
};

// Student Check-In
export const checkIn = async (req, res) => {
    const { collegeId } = req.body;

    try {
        // Verify student exists
        const student = await prisma.student.findUnique({
            where: { collegeId }
        });

        if (!student) {
            return res.status(404).json({ 
                success: false,
                error: 'Student not found' 
            });
        }

        // Get today's date
        const today = new Date().toISOString().split('T')[0];
        const todayDate = new Date(today);

        // Find or create attendance record for today
        let attendanceRecord = await prisma.attendance.findUnique({
            where: {
                studentId_date: {
                    studentId: student.id,
                    date: todayDate
                }
            }
        });

        if (!attendanceRecord) {
            // Create new attendance record
            attendanceRecord = await prisma.attendance.create({
                data: {
                    studentId: student.id,
                    date: todayDate,
                    sessions: [
                        {
                            checkInTime: new Date().toISOString()
                        }
                    ]
                },
                include: { student: true }
            });
        } else {
            // Add check-in to existing sessions
            const sessions = attendanceRecord.sessions || [];
            
            // Check if already checked in
            const lastSession = sessions[sessions.length - 1];
            if (lastSession && !lastSession.checkOutTime) {
                return res.status(400).json({ 
                    success: false,
                    error: 'Student is already checked in' 
                });
            }

            sessions.push({
                checkInTime: new Date().toISOString()
            });

            attendanceRecord = await prisma.attendance.update({
                where: { id: attendanceRecord.id },
                data: { sessions },
                include: { student: true }
            });
        }

        res.status(200).json({
            success: true,
            message: 'Check-in successful',
            data: {
                studentName: student.fullName,
                collegeId: student.collegeId,
                checkInTime: new Date().toLocaleTimeString(),
                status: 'checked-in'
            }
        });
    } catch (error) {
        console.error('Check-in error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error during check-in' 
        });
    }
};

// Student Check-Out
export const checkOut = async (req, res) => {
    const { collegeId } = req.body;

    try {
        // Verify student exists
        const student = await prisma.student.findUnique({
            where: { collegeId }
        });

        if (!student) {
            return res.status(404).json({ 
                success: false,
                error: 'Student not found' 
            });
        }

        // Get today's date
        const today = new Date().toISOString().split('T')[0];
        const todayDate = new Date(today);

        // Find today's attendance record
        const attendanceRecord = await prisma.attendance.findUnique({
            where: {
                studentId_date: {
                    studentId: student.id,
                    date: todayDate
                }
            }
        });

        if (!attendanceRecord) {
            return res.status(404).json({ 
                success: false,
                error: 'No check-in record found for today' 
            });
        }

        const sessions = attendanceRecord.sessions || [];
        
        if (sessions.length === 0) {
            return res.status(400).json({ 
                success: false,
                error: 'No active session to check out from' 
            });
        }

        const lastSession = sessions[sessions.length - 1];
        if (lastSession.checkOutTime) {
            return res.status(400).json({ 
                success: false,
                error: 'Already checked out' 
            });
        }

        // Add check-out time and calculate duration
        const checkInTime = new Date(lastSession.checkInTime);
        const checkOutTime = new Date();
        const durationMs = checkOutTime - checkInTime;
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        const duration = `${hours}h ${minutes}m`;

        lastSession.checkOutTime = checkOutTime.toISOString();
        lastSession.duration = duration;

        const updatedRecord = await prisma.attendance.update({
            where: { id: attendanceRecord.id },
            data: { sessions },
            include: { student: true }
        });

        res.status(200).json({
            success: true,
            message: 'Check-out successful',
            data: {
                studentName: student.fullName,
                collegeId: student.collegeId,
                checkOutTime: checkOutTime.toLocaleTimeString(),
                duration: duration,
                status: 'checked-out'
            }
        });
    } catch (error) {
        console.error('Check-out error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error during check-out' 
        });
    }
};

// Get today's status for a student
export const getTodayStatus = async (req, res) => {
    const { collegeId } = req.params;

    try {
        const student = await prisma.student.findUnique({
            where: { collegeId }
        });

        if (!student) {
            return res.status(404).json({ 
                success: false,
                error: 'Student not found' 
            });
        }

        const today = new Date().toISOString().split('T')[0];
        const todayDate = new Date(today);

        const attendanceRecord = await prisma.attendance.findUnique({
            where: {
                studentId_date: {
                    studentId: student.id,
                    date: todayDate
                }
            }
        });

        if (!attendanceRecord) {
            return res.status(200).json({
                success: true,
                data: {
                    studentName: student.fullName,
                    collegeId: student.collegeId,
                    status: 'not-checked-in',
                    sessions: []
                }
            });
        }

        const sessions = attendanceRecord.sessions || [];
        const lastSession = sessions[sessions.length - 1];
        const isCheckedIn = lastSession && !lastSession.checkOutTime;

        res.status(200).json({
            success: true,
            data: {
                studentName: student.fullName,
                collegeId: student.collegeId,
                status: isCheckedIn ? 'checked-in' : 'checked-out',
                currentSessionCheckInTime: lastSession?.checkInTime,
                totalSessions: sessions.length,
                sessions: sessions
            }
        });
    } catch (error) {
        console.error('Error fetching today status:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error fetching status' 
        });
    }
}