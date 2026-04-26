const express = require('express');
const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Custom CORS Middleware to explain the logic
app.use((req, res, next) => {
    // Allow the specific origin of your frontend (usually port 5173 for Vite)
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    
    // Specify which methods and headers are allowed for cross-origin requests
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // HANDLE PREFLIGHT: If the browser sends an OPTIONS request, 
    // we must respond with a success status (204 No Content) immediately.
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// Route for Simple Request
app.get('/api/product', (req, res) => {
    res.json({ name: "Simple Product", status: "Success" });
    
});

// Route for Preflighted Request
app.put('/api/resource', (req, res) => {
    res.json({ message: "Resource updated successfully" });
    
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});