const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes

// --- TEST ROUTE ---
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// --- Auth Routes ---
app.post('/api/auth/register', async (req, res) => {
    console.log("Register endpoint hit with body:", req.body); // Debug log
    const { name, email, password, bloodGroup, allergies, emergencyContact1, emergencyContact2, emergencyContact3 } = req.body;
    try {
        // Check if user exists
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            `INSERT INTO users (name, email, password_hash, blood_group, allergies, emergency_contact_1, emergency_contact_2, emergency_contact_3) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, email, hashedPassword, bloodGroup, allergies, emergencyContact1, emergencyContact2, emergencyContact3]
        );

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        console.error("Register SQL Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Return user info (excluding password)
        const { password_hash, ...userInfo } = user;
        res.json({ message: 'Login successful', user: userInfo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// --- Services Routes ---
app.get('/api/services', async (req, res) => {
    try {
        const { type, search } = req.query;
        let query = 'SELECT * FROM services WHERE 1=1';
        const params = [];

        if (type && type !== 'all') {
            query += ' AND type = ?';
            params.push(type);
        }

        if (search) {
            query += ' AND (name LIKE ? OR address LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// --- Blood Requests Routes ---
app.get('/api/blood-requests', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM blood_requests WHERE status = "active" ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/blood-requests', async (req, res) => {
    const { userId, bloodGroup, hospital, urgency, contact, location, additionalInfo } = req.body;
    try {
        await db.query(
            `INSERT INTO blood_requests (user_id, blood_group, hospital, urgency, contact, location, additional_info) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId || null, bloodGroup, hospital, urgency, contact, location, additionalInfo]
        );
        res.status(201).json({ message: 'Blood request created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// --- Profile Routes ---
app.put('/api/profile/:id', async (req, res) => {
    const userId = req.params.id;
    const { name, bloodGroup, allergies, emergencyContact1, emergencyContact2, emergencyContact3 } = req.body;
    try {
        await db.query(
            `UPDATE users SET name=?, blood_group=?, allergies=?, emergency_contact_1=?, emergency_contact_2=?, emergency_contact_3=? WHERE id=?`,
            [name, bloodGroup, allergies, emergencyContact1, emergencyContact2, emergencyContact3, userId]
        );
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// --- SOS Route ---
app.post('/api/sos', (req, res) => {
    const { emergencyType, location, timestamp } = req.body;
    console.log(`[SOS ALERT] Type: ${emergencyType}, Time: ${timestamp}, Location:`, location);
    // In a real app, this would trigger SMS/Email/Push Notification
    res.json({ message: 'SOS alert received' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Routes registered:');
    console.log(' - POST /api/auth/register');
    console.log(' - POST /api/auth/login');
    console.log(' - GET /api/services');
});
