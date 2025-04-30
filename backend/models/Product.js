const { pool } = require('../config/db');

class Product {
  static async getAllProducts(sort, category, brand, priceRange) {
    try {
      let query = 'SELECT * FROM products WHERE 1=1';
      const params = [];
      
      
      if (category) {
        query += ' AND category = ?';
        params.push(category);
      }
      
      if (brand) {
        query += ' AND brand = ?';
        params.push(brand);
      }
      
      if (priceRange) {
        const [min, max] = priceRange.split('-');
        if (min && max) {
          query += ' AND price BETWEEN ? AND ?';
          params.push(parseFloat(min), parseFloat(max));
        }
      }
      
      
      if (sort === 'price_asc') {
        query += ' ORDER BY price ASC';
      } else if (sort === 'price_desc') {
        query += ' ORDER BY price DESC';
      } else if (sort === 'newest') {
        query += ' ORDER BY created_at DESC';
      }
      
      const [rows] = await pool.execute(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  static async getProductById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM products WHERE id = ?',
        [id]
      );
      
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  static async searchProducts(term) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM products WHERE name LIKE ? OR brand LIKE ? OR category LIKE ?',
        [`%${term}%`, `%${term}%`, `%${term}%`]
      );
      
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product; 