import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';
import { z } from 'zod';

const router = express.Router();

// Zod schemas for validation
const signupSchema = z.object({
    fullName: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const validatedData = signupSchema.parse(req.body);

        const emailExist = await User.findOne({ email: validatedData.email });
        if (emailExist) return res.status(400).json({ message: 'Email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(validatedData.password, salt);

        const user = new User({
            fullName: validatedData.fullName,
            username: validatedData.username,
            email: validatedData.email,
            password: hashedPassword
        });

        const savedUser = await user.save();
        res.json({ user: savedUser._id });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});

// Login route (assuming you have one)
router.post('/login', async (req, res) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        // Check if email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Email or password is wrong');

        // Check password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send('Email or password is wrong');

        // Create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Email verification route
router.get('/verify/:token', async (req, res) => {
    // Find the user associated with the token
    // Mark the user as verified
    // Redirect the user to the login page or send a success response
});

export default router;

