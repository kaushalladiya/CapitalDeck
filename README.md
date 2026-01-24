# 💰 CapitalDeck

A full-stack financial intelligence platform for tracking personal income and expenses, built with **Java (Spring Boot)** and **React**. This project demonstrates enterprise-grade architecture, RESTful API design, and a high-precision UI inspired by professional trading terminals.

![Project Status](https://img.shields.io/badge/status-active%20development-brightgreen)
![Java Version](https://img.shields.io/badge/Java-17%2B-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![React Version](https://img.shields.io/badge/React-18.3-blue)

## 📸 Screenshots

> *Screenshots will be added as features are completed.*

## ✨ Features

### ✅ Implemented Features (Frontend)
- **Professional Architecture**: Monorepo structure separating `CapitalDeck.UI` and `CapitalDeck.API`.
- **UX & Design**:
  - [x] **Smart Dashboard**: Gradient summary cards (Income, Expense, Balance).
  - [x] **Data Visualization**: Interactive "Income vs Expense" Bar Charts using Recharts.
  - [x] **Monospace Typography**: "Cascadia Code" for financial precision.
  - [x] **Glassmorphism**: Sticky navigation with backdrop blur and Lucide icons.
- **Responsive Layout**: Adapts from mobile (stacked) to desktop (3-column) grids.

### 🚧 Planned Features (Backend)
- **Secure Authentication**: Spring Security + JWT Implementation.
- **RESTful API**: Endpoints for Transaction CRUD operations.
- **Database Integration**: MySQL/PostgreSQL with Hibernate/JPA.

## 🎨 Design Philosophy

### Psychology of Money
This project utilizes specific design choices to build trust and clarity:
- **Visual Hierarchy**:
  - **Dark Gradient**: Used for Total Balance to signify importance and solidity.
  - **Green & Red**: Universally recognized signals for Profit (Income) and Loss (Expense).
- **Typography**:
  - **Cascadia Code**: Used exclusively. The monospaced font implies "Calculation," "Accuracy," and "Terminal-like precision," similar to professional trading platforms like Zerodha.

## 🛠️ Tech Stack

### Backend (CapitalDeck.API) - *Upcoming*
- **Framework:** Spring Boot 3.2 (Java)
- **Build Tool:** Maven
- **Database:** MySQL / PostgreSQL
- **Security:** Spring Security + JWT

### Frontend (CapitalDeck.UI)
- **Framework:** React 18.3 with Vite
- **Routing:** React Router DOM
- **Visualization:** Recharts
- **Styling:** Tailwind CSS 3.4
- **State Management:** React Context API
- **HTTP Client:** Axios

## 🚀 Getting Started

### Prerequisites
- [Java JDK 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/)
- [Node.js 18+](https://nodejs.org/)

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/kaushalladiya/CapitalDeck.git](https://github.com/kaushalladiya/CapitalDeck.git)
   cd CapitalDeck
   ```

2. **Set up the Frontend**
   ```bash
   cd CapitalDeck.UI

   # Install dependencies
   npm install

   # Run the development server
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Set up the Backend** (Once implemented)
   ```bash
   cd ../CapitalDeck.API

   # Run the API
   mvn spring-boot:run
   ```
   Backend will run on `http://localhost:8080`

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
CapitalDeck/
├── CapitalDeck.API/          # Spring Boot Backend (Skeleton)
│
└── CapitalDeck.UI/           # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── dashboard/    # StatCards, Charts
    │   │   └── layout/       # Navbar, Layout Wrapper
    │   ├── pages/            # Dashboard Page
    │   ├── App.jsx           # Route Definitions
    │   └── main.jsx          # Entry Point & Font Loading
    └── tailwind.config.js    # Design System Config

```

## 👨‍💻 Author

**Kaushal Ladiya**

* GitHub : [@kaushalladiya](https://www.google.com/search?q=https://github.com/kaushalladiya)
* LinkedIn : [@kaushalladiya](https://www.google.com/search?q=https://linkedin.com/in/kaushalladiya)

## 🙏 Acknowledgments

* Built as part of full-stack development learning journey
* Thanks to the .NET and React communities for excellent documentation
* Tailwind CSS for making styling enjoyable

---

**⭐ If you find this project helpful, please consider giving it a star!**