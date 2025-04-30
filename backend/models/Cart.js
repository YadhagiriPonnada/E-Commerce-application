const { pool } = require('../config/db');

class Cart {
  static async getCartItems(userId) {
    try {
      const [rows] = await pool.execute(
        `SELECT c.id, c.user_id, c.product_id, c.quantity, 
                p.name, p.price, p.image_url, p.brand, p.category
         FROM cart c
         JOIN products p ON c.product_id = p.id
         WHERE c.user_id = ?`,
        [userId]
      );
      
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  static async addToCart(userId, productId, quantity = 1) {
    try {
      
      const [existing] = await pool.execute(
        'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      
      if (existing.length > 0) {
        
        const newQuantity = existing[0].quantity + quantity;
        await pool.execute(
          'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
          [newQuantity, userId, productId]
        );
        return { ...existing[0], quantity: newQuantity };
      } else {
        
        const [result] = await pool.execute(
          'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
          [userId, productId, quantity]
        );
        
        return { id: result.insertId, user_id: userId, product_id: productId, quantity };
      }
    } catch (error) {
      throw error;
    }
  }
  
  static async updateQuantity(userId, productId, quantity) {
    try {
      await pool.execute(
        'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, productId]
      );
      
      return { user_id: userId, product_id: productId, quantity };
    } catch (error) {
      throw error;
    }
  }
  
  static async removeFromCart(userId, productId) {
    try {
      await pool.execute(
        'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
  
  static async clearCart(userId) {
    try {
      await pool.execute(
        'DELETE FROM cart WHERE user_id = ?',
        [userId]
      );
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Cart; 