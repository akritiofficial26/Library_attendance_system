import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './src/routes/authRoutes.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use('/api/auth', router); //user registration and login routes

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})