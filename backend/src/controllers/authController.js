import prisma from '../config/prisma.config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//admin registeration
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingAdmin = await prisma.admin.findUnique({ where: { email } });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await prisma.admin.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        console.log(admin, 'registered successfully');
        res.status(201).json({
            message: 'Admin registered successfully',
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error registering admin' });
    }
}

//get all admins
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await prisma.admin.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
        });

        res.status(200).json({
            admins
        })
    } catch (error) {
        res.status(500).json({ error: 'Error fetching admins' });
    }
}

//admin login
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await prisma.admin.findUnique({
            where: { email }
        });

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        //token generation
        const token = jwt.sign({
            id: admin.id,
            name: admin.name,
            email: admin.email
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true })

        res.status(200).json({
            message: 'Admin logged in successfully',
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                token
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
}