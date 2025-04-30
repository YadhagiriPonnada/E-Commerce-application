const { pool } = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async createUser(name, email, password) {
    try {
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      
      const [result] = await pool.execute(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );
      
      return { id: result.insertId, name, email };
    } catch (error) {
      throw error;
    }
  }
  
  static async findByEmail(email) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  static async findById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, name, email FROM users WHERE id = ?',
        [id]
      );
      
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User; 