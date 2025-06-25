# 🛒 E-Commerce Application

A full-stack e-commerce web application built with **React**, **Node.js**, **Express**, and **SQLite**. This app allows users to browse products, add them to a cart, checkout, and manage orders, while admins can manage inventory and orders.


## ✨ Features

### 👤 User Features

* User authentication (signup/login)
* View products by category
* Add products to cart
* Checkout with order summary
* View past orders

### 🛠️ Admin Features

* Admin dashboard
* Add, update, and delete products
* Manage orders
* View user activity

---

## 🖥️ Tech Stack

| Frontend     | Backend          | Database | Other               |
| ------------ | ---------------- | -------- | ------------------- |
| React, Redux | Node.js, Express | SQLite   | JWT Auth, Sequelize |

---

## 📁 Project Structure

```
E-Commerce-application/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── config/
│   └── database.sqlite
├── frontend/
│   ├── src/
│   └── public/
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16 or above recommended)
* SQLite installed (or use built-in Node modules)

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-app.git
cd E-Commerce-application
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

---

## 📷 Screenshots

*Add screenshots or screen recordings of the app UI here to visually show how it works.*

---

## 📌 TODO

* [ ] Add payment gateway (Stripe/PayPal)
* [ ] Improve product search and filtering
* [ ] Add product reviews and ratings
* [ ] Mobile responsiveness

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📫 Contact

Made by **Yadhagiri Ponnada**
📧 Email: *[yadhagiriponnada111@gmail.com](yadhagiri9577@gmail.com)*
🔗 GitHub: [@YadhagiriPonnada](https://github.com/YadhagiriPonnada)
