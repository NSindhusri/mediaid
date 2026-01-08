import axios from 'axios';

async function testPing() {
    try {
        console.log("Pinging http://localhost:3001/api/test...");
        const response = await axios.get('http://localhost:3001/api/test');
        console.log("Ping Success. Status:", response.status);
        console.log("Response:", response.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error("Connection Refused! Server is NOT running on 3001.");
        } else if (error.response) {
            console.error("Ping Error Response:", error.response.status, error.response.statusText);
        } else {
            console.error("Ping Error:", error.message);
        }
    }
}

testPing();
