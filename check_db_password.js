import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const passwordsToTry = ['', 'root', 'password', 'admin', '123456', '12345678', 'mysql'];

async function checkPasswords() {
    console.log("Testing common MySQL passwords...");

    for (const password of passwordsToTry) {
        try {
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'root',
                password: password,
            });
            console.log(`SUCCESS! Connected with password: '${password}'`);
            await connection.end();
            process.exit(0);
        } catch (error) {
            console.log(`Failed with '${password}': ${error.code}`);
        }
    }
    console.log("FAILED to connect with any common password.");
    process.exit(1);
}

checkPasswords();
