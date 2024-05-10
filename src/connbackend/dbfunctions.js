import bcrypt from 'bcryptjs';
const bcrypt = require('bcryptjs'); // Importar bcrypt para hashear contraseñas
const { crearUsuario, buscarUsuarioPorEmail } = require('./funcionesUsuarios');

// Función modificada para crear un nuevo usuario con contraseña hasheada
async function crearUsuario(username, email, plainPassword) {
    const pool = await crearPoolConexion();
    const conexion = await pool.getConnection();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);  // Hashea la contraseña
    try {
        const [result] = await conexion.execute(`INSERT INTO user (username, email, password) VALUES (?, ?, ?)`, [username, email, hashedPassword]);
        console.log(result);
    } catch (error) {
        console.error('Error al crear usuario:', error);
    } finally {
        conexion.release();
    }
}

// Función modificada para buscar un usuario por email y verificar la contraseña
async function buscarUsuarioPorEmail(email, plainPassword) {
    const pool = await crearPoolConexion();
    const conexion = await pool.getConnection();
    try {
        const [usuarios] = await conexion.execute(`SELECT * FROM user WHERE email = ?`, [email]);
        if (usuarios.length > 0) {
            const user = usuarios[0];
            const isMatch = await bcrypt.compare(plainPassword, user.password);  // Verifica la contraseña
            if (isMatch) {
                console.log("Login successful", user);
            } else {
                console.log("Password incorrect");
            }
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error('Error al buscar usuario:', error);
    } finally {
        conexion.release();
    }
}

