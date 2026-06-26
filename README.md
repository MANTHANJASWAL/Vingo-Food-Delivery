# 🍔 Vingo - Food Delivery App

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)

## 📖 About

**Vingo** is a full-stack MERN Food Delivery application that allows users to discover restaurants, browse food items, and manage their profiles. Shop owners have access to a dedicated dashboard where they can create shops and manage food items efficiently. The application provides secure authentication, cloud-based image storage, and location services to deliver a smooth user experience.

---

## ✨ Features

### 👤 User Features

* Secure JWT Authentication
* Firebase Google Authentication
* Password Reset via Email (Nodemailer)
* Browse Restaurants
* View Food Items
* User Profile Management
* Geoapify API integration for fetching user location (Latitude & Longitude)
* Responsive User Interface

### 🏪 Shop Owner Features

* Dedicated Shop Owner Dashboard
* Create Shops
* Update Shop Details
* Delete Shops
* Add Food Items
* Update Food Items
* Delete Food Items
* Upload Images using Cloudinary

### 🔒 Security

* JWT Authentication
* Protected Routes
* Cookie-based Authentication
* Password Hashing using bcrypt

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Redux Toolkit
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Firebase Authentication
* Multer
* Cloudinary
* Nodemailer
* Cookie Parser
* CORS

### APIs & Services

* Geoapify API
* Cloudinary
* Firebase Authentication

---

## 📂 Project Structure

```text
Vingo/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Vingo
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the **server** folder and add:

```env
PORT=
MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL=
EMAIL_PASSWORD=

FIREBASE_API_KEY=
GEOAPIFY_API_KEY=
```

---

## ▶️ Run the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

The application will start on:

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:8000`

---

## 📸 Screenshots

Add screenshots of your application here.

* Home Page
* Login Page
* Restaurant Listing
* Food Details
* User Profile
* Shop Owner Dashboard
* Add Food Item
* Manage Shops

---

## 🔮 Future Improvements

* Online Payment Integration
* Order Tracking
* Order History
* Ratings & Reviews
* Wishlist
* Coupons & Discounts
* Admin Dashboard
* Push Notifications
* Delivery Partner Module

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

## 👨‍💻 Author

**Manthan Jaswal**

Computer Engineering Student | MERN Stack Developer

---

## 📄 License

This project is developed for learning and educational purposes.
