const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./Connection');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'tu_secreto_aqui'; 

const app = express();
app.use(cors());  
app.use(express.json());  


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);  // No token present

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);  // Token invalid or expired
        req.user = user;
        next();
    });
};

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Attempting login with email: ${email} and password: ${password}`);

    // Verificar si el correo pertenece al dominio uvg.edu.gt
    const domainRegex = /@uvg\.edu\.gt$/i;
    if (!domainRegex.test(email)) {
        return res.status(401).json({ success: false, message: "Invalid email domain. Only @uvg.edu.gt is allowed." });
    }

    
    try {
        const connection = await pool.getConnection();
        try {
            const [results] = await connection.query(
                'SELECT id FROM user WHERE email = ? AND password = ?',
                [email, password]
            );
            console.log(results);  
            if (results.length > 0) {
                const user = results[0];
                const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
                res.json({ success: true, message: "Login successful", token });
            } else {
                res.status(401).json({ success: false, message: "Invalid credentials" });
            }
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});



pp.get('/sessions', authenticateToken, async (req, res) => {
     try {
       const userId = req.user.id;
       const query = 'SELECT * FROM students_Session WHERE id_student = ?';
       const [results] = await pool.query(query, [userId]);
      if (results.length > 0) {
        res.json(results);
       } else {

       res.json({ success: true, message: "No sessions found", sessions: [] });
      }
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
   });
  

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});