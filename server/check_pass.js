const mysql = require('mysql2/promise');
require('dotenv').config();

const passwordsToTry = ['', 'root', 'password', 'admin', '123456', '12345678', 'mysql'];

async function checkPasswords() {
    console.log("Testing common MySQL passwords...");

    // Test current env first
    console.log(`Current ENV Password: '${process.env.DB_PASSWORD}'`);

    for (const password of passwordsToTry) {
        try {
            console.log(`Trying '${password}'...`);
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'root',
                password: password,
            });
            console.log(`### SUCCESS ###`);
            console.log(`Connected with password: '${password}'`);
            await connection.end();
            process.exit(0);
        } catch (error) {
            console.log(`Failed: ${error.code}`);
        }
    }
    console.log("FAILED_ALL");
    process.exit(1);
}

checkPasswords();
