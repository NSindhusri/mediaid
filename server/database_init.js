const mysql = require('mysql2/promise');
require('dotenv').config();

const mockServices = [
    // GMRIT Rajam Area
    {
        name: 'GMR Care Hospital',
        type: 'hospital',
        address: 'GMR Nagar, Rajam, Andhra Pradesh',
        phone: '+91-8941251592',
        lat: 18.4650,
        lng: 83.6596,
        is_open: true,
    },
    {
        name: 'Rajam Community Health Centre',
        type: 'hospital',
        address: 'Main Road, Rajam, Andhra Pradesh',
        phone: '+91-8941251234',
        lat: 18.4680,
        lng: 83.6620,
        is_open: true,
    },
    {
        name: 'Apollo Pharmacy Rajam',
        type: 'pharmacy',
        address: 'Near Bus Stand, Rajam, Andhra Pradesh',
        phone: '+91-9876543210',
        lat: 18.4640,
        lng: 83.6600,
        is_open: true,
    },
    // Visakhapatnam (Vizag) Area
    {
        name: 'KGH Visakhapatnam',
        type: 'hospital',
        address: 'Maharanipeta, Visakhapatnam, Andhra Pradesh',
        phone: '+91-8912564891',
        lat: 17.7088,
        lng: 83.3039,
        is_open: true,
    },
    {
        name: 'Apollo Hospitals Vizag',
        type: 'hospital',
        address: 'Health City, Arilova, Visakhapatnam',
        phone: '+91-8912867777',
        lat: 17.7700,
        lng: 83.3300,
        is_open: true,
    },
    {
        name: 'Vizag Blood Bank',
        type: 'blood-bank',
        address: 'Dwaraka Nagar, Visakhapatnam',
        phone: '+91-8912555555',
        lat: 17.7280,
        lng: 83.3000,
        is_open: true,
    },
    // Srikakulam Area
    {
        name: 'RIMS Srikakulam',
        type: 'hospital',
        address: 'Balaga, Srikakulam, Andhra Pradesh',
        phone: '+91-8942279188',
        lat: 18.3008,
        lng: 83.8968,
        is_open: true,
    },
    {
        name: 'Srikakulam Red Cross',
        type: 'blood-bank',
        address: 'Near Collectorate, Srikakulam',
        phone: '+91-8942223344',
        lat: 18.3050,
        lng: 83.9000,
        is_open: true,
    },
    // Vizianagaram Area
    {
        name: 'MIMS Vizianagaram',
        type: 'hospital',
        address: 'Nellimarla, Vizianagaram, Andhra Pradesh',
        phone: '+91-8922244444',
        lat: 18.1667,
        lng: 83.4333,
        is_open: true,
    },
    {
        name: 'Tirumala Medicover Hospitals',
        type: 'hospital',
        address: 'Double Road, Vizianagaram',
        phone: '+91-8922255666',
        lat: 18.1100,
        lng: 83.4000,
        is_open: true,
    }
];

async function initDB() {
    let connection;
    try {
        // Create connection without database selected to create it
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        console.log('Connected to MySQL server...');

        // Create Database
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
        console.log(`Database '${process.env.DB_NAME}' created or already exists.`);

        // Use the database
        await connection.changeUser({ database: process.env.DB_NAME });

        // Create Users Table
        await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        blood_group VARCHAR(5),
        allergies TEXT,
        emergency_contact_1 VARCHAR(20) NOT NULL,
        emergency_contact_2 VARCHAR(20),
        emergency_contact_3 VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('Users table ready.');

        // Create Services Table
        await connection.query(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type ENUM('hospital', 'pharmacy', 'blood-bank', 'ambulance') NOT NULL,
        address TEXT NOT NULL,
        phone VARCHAR(20),
        lat DECIMAL(10, 8),
        lng DECIMAL(11, 8),
        is_open BOOLEAN DEFAULT TRUE
      )
    `);
        console.log('Services table ready.');

        // Create Blood Requests Table
        await connection.query(`
      CREATE TABLE IF NOT EXISTS blood_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        blood_group VARCHAR(5) NOT NULL,
        hospital VARCHAR(255) NOT NULL,
        urgency ENUM('normal', 'urgent', 'critical') NOT NULL,
        contact VARCHAR(20) NOT NULL,
        location VARCHAR(255) NOT NULL,
        status ENUM('active', 'fulfilled') DEFAULT 'active',
        additional_info TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
        console.log('Blood requests table ready.');

        // Seed Services (Truncate first to ensure fresh data)
        console.log('Seeding services...');
        await connection.query('TRUNCATE TABLE services'); // Clear old mock data

        for (const service of mockServices) {
            await connection.query(
                'INSERT INTO services (name, type, address, phone, lat, lng, is_open) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [service.name, service.type, service.address, service.phone, service.lat, service.lng, service.is_open]
            );
        }
        console.log('Services seeded with local data.');

        console.log('Database initialization completed successfully!');

    } catch (error) {
        console.error('Database initialization failed:', error);
    } finally {
        if (connection) await connection.end();
    }
}

initDB();
