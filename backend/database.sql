
USE mabishaala;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);


INSERT INTO products (name, price, image_url, category, brand) VALUES
INSERT INTO products (name, price, image_url, category, brand) VALUES
('Men''s Formal Trousers', 2336.21, 'https://images.unsplash.com/photo-1606813904571-6f56d2a54f38', 'Men', 'Van Heusen'),
('Women''s Anarkali Kurta', 900.93, 'https://images.unsplash.com/photo-1618354691263-3f3d1ef667a2', 'Women', 'Biba'),
('Kids Graphic T-Shirt', 1773.25, 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2', 'Kids', 'Zara Kids'),
('Women''s Yoga Pants', 1094.06, 'https://images.unsplash.com/photo-1629970465775-1a0e07c790e1', 'Women', 'HRX'),
('Men''s Slim Fit Jeans', 1582.52, 'https://images.unsplash.com/photo-1596464716125-5f1e92a37062', 'Men', 'Levis'),
('Kids Party Dress', 1415.81, 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3', 'Kids', 'Carter’s'),
('Women''s Sweater', 1306.81, 'https://images.unsplash.com/photo-1606813904571-6f56d2a54f38', 'Women', 'H&M'),
('Kids Joggers', 1531.65, 'https://images.unsplash.com/photo-1596464716125-5f1e92a37062', 'Kids', 'UCB'),
('Men''s Casual Blazer', 1202.44, 'https://images.unsplash.com/photo-1588072432836-e10032774350', 'Men', 'Raymond'),
('Kids Pajamas Set', 2067.96, 'https://images.unsplash.com/photo-1588072432836-e10032774350', 'Kids', 'Mothercare'),
('Kids Trolley Bag', 594.36, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3', 'Kids', 'Disney'),
('Women''s Casual Top', 561.32, 'https://images.unsplash.com/photo-1588072432836-e10032774350', 'Women', 'ONLY'),
('Men''s Hooded Jacket', 609.06, 'https://images.unsplash.com/photo-1617036374066-cd9f963c2672', 'Men', 'Woodland'),
('Women''s Leather Boots', 1727.42, 'https://images.unsplash.com/photo-1617036374066-cd9f963c2672', 'Women', 'Carlton London'),
('Kids Denim Dungarees', 2763.42, 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2', 'Kids', 'Gini & Jony'),
('Women''s Sports Bra', 1607.71, 'https://images.unsplash.com/photo-1618354691263-3f3d1ef667a2', 'Women', 'Nike'),
('Men''s Flip Flops', 783.44, 'https://images.unsplash.com/photo-1617036374066-cd9f963c2672', 'Men', 'Puma'),
('Women''s Bracelet', 2917.47, 'https://images.unsplash.com/photo-1618354691263-3f3d1ef667a2', 'Women', 'Fastrack'),
('Men''s Cotton Polo T-Shirt', 2294.76, 'https://images.unsplash.com/photo-1618354691263-3f3d1ef667a2', 'Men', 'U.S. Polo Assn.'),
('Kids Rain Boots', 2576.52, 'https://images.unsplash.com/photo-1588072432836-e10032774350', 'Kids', 'Skechers'),
('Men''s Leather Belt', 2567.87, 'https://images.unsplash.com/photo-1629970465775-1a0e07c790e1', 'Men', 'Hidesign'),
('Kids Fleece Hoodie', 2891.10, 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2', 'Kids', 'Pepe Jeans'),
('Men''s Analog Watch', 539.88, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', 'Men', 'Titan'),
('Women''s Maxi Dress', 2691.03, 'https://images.unsplash.com/photo-1588072432836-e10032774350', 'Women', 'Zara'),
('Men''s Formal Shirt', 1435.75, 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10', 'Men', 'Arrow'),
('Women''s Jeans', 1499.00, 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c', 'Women', 'Levis'),
('Kids School Shoes', 799.00, 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2', 'Kids', 'Adidas'),
('Men''s Sneakers', 1999.00, 'https://images.unsplash.com/photo-1549298916-b21d5d6d6efa', 'Men', 'Nike'),
('Women''s Handbag', 2499.00, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3', 'Women', 'Lavie'),
('Kids Winter Jacket', 1299.00, 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2', 'Kids', 'GAP'),
('Men''s Watch', 3499.00, 'https://images.unsplash.com/photo-1524805444758-089113d48a6d', 'Men', 'Fossil'),
('Women''s Sunglasses', 899.00, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083', 'Women', 'RayBan'),
('Kids Backpack', 699.00, 'https://images.unsplash.com/photo-1588072432836-e10032774350', 'Kids', 'Skybags'),
('Men''s Kurta', 1299.00, 'https://images.unsplash.com/photo-1596464716125-5f1e92a37062', 'Men', 'Manyavar'),
('Women''s Dupatta', 499.00, 'https://images.unsplash.com/photo-1617036374066-cd9f963c2672', 'Women', 'W'),
('Kids Nightwear', 999.00, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', 'Kids', 'FirstCry'),
('Women''s Sports Leggings', 1199.00, 'https://images.unsplash.com/photo-1588072432836-e10032774350', 'Women', 'Nike'),
('Men''s Tracksuit', 1599.00, 'https://images.unsplash.com/photo-1629970465775-1a0e07c790e1', 'Men', 'Puma'),
('Kids Cap', 299.00, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3', 'Kids', 'Adidas'),
('Men''s Beanie', 399.00, 'https://images.unsplash.com/photo-1588072432836-e10032774350', 'Men', 'Superdry'),
('Women''s Wallet', 899.00, 'https://images.unsplash.com/photo-1617036374066-cd9f963c2672', 'Women', 'Caprese'),
('Men''s Loafers', 1299.00, 'https://images.unsplash.com/photo-1629970465775-1a0e07c790e1', 'Men', 'Bata'),
('Kids Gloves', 199.00, 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2', 'Kids', 'Mothercare'),
('Women''s Earrings', 599.00, 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3', 'Women', 'Zaveri Pearls'),
('Men''s Tie', 349.00, 'https://images.unsplash.com/photo-1606813904571-6f56d2a54f38', 'Men', 'Raymond'),
('Women''s Stilettos', 1899.00, 'https://images.unsplash.com/photo-1618354691263-3f3d1ef667a2', 'Women', 'Catwalk'),
('Kids Hat', 299.00, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', 'Kids', 'Babyhug');
