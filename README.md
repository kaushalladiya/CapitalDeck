# 💰 CapitalDeck

A full-stack financial intelligence platform for tracking personal income and expenses, built with **Java (Spring Boot)** and **React**. This project demonstrates enterprise-grade architecture, RESTful API design, and a high-precision UI inspired by professional trading terminals.

![Project Status](https://img.shields.io/badge/status-active%20development-brightgreen)
![Java Version](https://img.shields.io/badge/Java-17%2B-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![React Version](https://img.shields.io/badge/React-18.3-blue)

## 📸 Screenshots

> *Screenshots will be added as features are completed.*

## ✨ Features

### ✅ Implemented Features
- **Full-Stack Architecture**: React frontend communicating with Spring Boot REST API.
- **Layered Backend Architecture**: Professional separation of concerns (Controller → Service → Repository).
- **CRUD Operations**:
  - **Create**: Add transactions via a smart modal with dynamic category selection.
  - **Read**: Real-time dashboard updates fetching data from H2 Database.
  - **Delete**: Remove transactions with a secure confirmation flow.
- **Data Visualization**:
  - **Interactive Charts**: "Income vs Expense" Bar Charts using Recharts (Dynamic aggregation).
  - **Smart Stats**: Real-time calculation of Total Balance, Income, and Expense.
- **UX & Design**:
  - **Smart Dashboard**: Gradient summary cards and responsive grid layouts.
  - **Monospace Typography**: "Cascadia Code" for financial precision.
  - **Glassmorphism**: Sticky navigation with backdrop blur and Lucide icons.
  - **Defensive UI**: Smart category filtering (Income categories vs Expense categories).

### 🚧 Planned Features
- **Persistence**: Migration from H2 (In-Memory) to MySQL/PostgreSQL.
- **Secure Authentication**: Spring Security + JWT Implementation.
- **Advanced Reporting**: Downloadable PDF/CSV reports.

## 🎨 Design Philosophy

### Psychology of Money
This project utilizes specific design choices to build trust and clarity:
- **Visual Hierarchy**:
  - **Dark Gradient**: Used for Total Balance to signify importance and solidity.
  - **Green & Red**: Universally recognized signals for Profit (Income) and Loss (Expense).
- **Typography**:
  - **Cascadia Code**: Used exclusively. The monospaced font implies "Calculation," "Accuracy," and "Terminal-like precision," similar to professional trading platforms like Zerodha.

## 🛠️ Tech Stack

### Backend (CapitalDeck.API)
- **Framework:** Spring Boot 3.2 (Java)
- **Architecture:** Layered (Controller -> Repository -> Database)
- **Database:** H2 In-Memory (Dev), MySQL (Prod)
- **API Documentation:** Swagger UI (`/swagger`)
- **Key Patterns:**
  - **Dependency Injection:** Wiring components using `@Autowired`.
  - **JPA:** Object-Relational Mapping for database abstraction.
  - **CORS:** Configured for secure Frontend-Backend communication.

### Frontend (CapitalDeck.UI)
- **Framework:** React 18.3 with Vite
- **HTTP Client:** Axios (Custom instance with Interceptors)
- **Visualization:** Recharts
- **Styling:** Tailwind CSS 3.4
- **State Management:** React Hooks (useState, useEffect)

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
   ./mvnw spring-boot:run
   ```
   Backend will run on `http://localhost:8080`

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
CapitalDeck/
├── CapitalDeck.API/          # Spring Boot Backend
│   ├── src/main/java/com/capitaldeck/api/
│   │   ├── controller/       # REST Endpoints (The "Waiter")
│   │   ├── service/          # Business Logic (The "Chef")
│   │   ├── repository/       # Database Access (The "Pantry")
│   │   └── model/            # JPA Entities (The "Ingredients")
│   └── pom.xml               # Maven Dependencies
│
└── CapitalDeck.UI/           # React Frontend
    ├── src/
    │   ├── api/              # Axios Services (transactionService.js)
    │   ├── components/       # Reusable UI (Charts, Modals, Cards)
    │   ├── pages/            # Page Views (Dashboard.jsx)
    │   └── App.jsx           # Main Router
    └── tailwind.config.js    # Design System Config

```

## 🔌 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/api/transactions` | Retrieve all transactions |
| **POST** | `/api/transactions` | Create a new transaction |
| **DELETE** | `/api/transactions/{id}` | Delete a transaction by ID |

## 👨‍💻 Author

**Kaushal Ladiya**

* GitHub : [@kaushalladiya](https://www.google.com/search?q=https://github.com/kaushalladiya)
* LinkedIn : [@kaushalladiya](https://www.google.com/search?q=https://linkedin.com/in/kaushalladiya)

## 🙏 Acknowledgments

* Built as part of full-stack development learning journey
* Thanks to the Java(Spring) and React communities for excellent documentation
* Tailwind CSS for making styling enjoyable

---

**⭐ If you find this project helpful, please consider giving it a star!**