import axios from 'axios';

async function testRegister() {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
            name: "Debug User",
            email: "debug_" + Date.now() + "@example.com",
            password: "password123",
            bloodGroup: "A+",
            allergies: "None",
            emergencyContact1: "1234567890",
            emergencyContact2: "",
            emergencyContact3: ""
        });
        console.log("Success:", response.data);
    } catch (error) {
        if (error.response) {
            console.error("Error Response:", error.response.status, error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }
}

testRegister();
