require('dotenv').config();
const mysql = require('mysql2/promise');

async function setupDatabase() {
  console.log('Starting database setup...');
  
 
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'giri',
    password: process.env.DB_PASSWORD || 'Yadhagiri@11'
  };

  try {
  
    const connection = await mysql.createConnection(dbConfig);
    
    // Create database if it doesn't exist
    console.log('Creating database if it doesn\'t exist...');
    await connection.query(`CREATE DATABASE IF NOT EXISTS stylify`);
    
    // Switch to the database
    await connection.query(`USE stylify`);
    
   
    console.log('Creating users table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    
    console.log('Creating products table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image_url TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
  
    console.log('Creating cart table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);
    
    
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM products');
    
    // Insert sample products if none exist
    if (rows[0].count === 0) {
      console.log('Inserting sample products...');
      await connection.query(`
        INSERT INTO products (name, price, image_url, category, brand) VALUES
        ('Men''s Slim Fit T-Shirt', 499.00, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820', 'Men', 'Roadster'),
        ('Women''s Floral Dress', 1299.00, 'https://images.unsplash.com/photo-1612336307429-8a898d10e223', 'Women', 'Sassafras'),
        ('Kids Cartoon T-Shirt', 399.00, 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea', 'Kids', 'H&M'),
        ('Men''s Formal Shirt', 899.00, 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10', 'Men', 'Arrow'),
        ('Women''s Jeans', 1499.00, 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c', 'Women', 'Levis'),
        ('Kids School Shoes', 799.00, 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2', 'Kids', 'Adidas'),
        ('Men''s Sneakers', 1999.00, 'https://images.unsplash.com/photo-1549298916-b21d5d6d6efa', 'Men', 'Nike'),
        ('Women''s Handbag', 2499.00, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3', 'Women', 'Lavie'),
        ('Kids Winter Jacket', 1299.00, 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2', 'Kids', 'GAP'),
        ('Men''s Watch', 3499.00, 'https://images.unsplash.com/photo-1524805444758-089113d48a6d', 'Men', 'Fossil'),
        ('Women''s Sunglasses', 899.00, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083', 'Women', 'RayBan'),
        ('Kids Backpack', 699.00, 'https://images.unsplash.com/photo-1588072432836-e10032774350', 'Kids', 'Skybags')
      `);
    }
    
    console.log('Database setup completed successfully!');
    await connection.end();
    
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase(); 