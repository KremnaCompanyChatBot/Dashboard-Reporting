# Kremna Chatbot Dashboard & Reporting


## 🎯 Purpose
This project was developed to monitor, analyze, and report on the interaction, performance, and user data of the **Kremna Chatbot** system.  
The goal is to make the status of chatbot operations visible, understand user behavior, and provide data-driven decision support.

---

## 🧩 Overview
**Kremna Chatbot Dashboard & Reporting**, It is a web panel that collects, processes, and visualizes data from chatbot systems.  
The backend layer is based on NestJS, while the frontend layer is developed using React and TypeScript.  
The real-time infrastructure is managed by a different team and is outside the scope of this project.

---

## 🏗️ Architecture

| Layer | Technology | Description |
|--------|------------|----------|
| **Backend** | NestJS (TypeScript) | REST API, data access layer, service architecture |
| **Frontend** | React + TypeScript | Dashboard interface, user interaction |
| **Database** | PostgreSQL | Database |
| **Auth** | JWT | Authentication |
| **Containerization** | Docker & docker-compose | Environment-independent operation |

---

## ⚙️ Features  
- Chatbot conversation counts and distributions  
- Channel-based performance (Web, WhatsApp, Telegram, etc.)  
- Intent analysis and fallback rates  
- User behavior analytics  
- Dashboard widget system (graphs, tables, KPI cards)  
- Report export (Excel, PDF)  
- Role-based access (Admin, Analyst, Operator)  
- Modern and responsive user interface  

---

## 🚀 Installation

### Requirements
- [Node.js 18+](https://nodejs.org)
- PostgreSQL (local or container)

### Steps

#### 
```bash
1. Cloning the repository
git clone https://github.com/KremnaCompanyChatBot/Dashboard-Reporting.git
cd Dashboard-Reporting
git checkout release/KREM-229

2. Backend setup    
cd backend    
npm install    
npm run start:dev    
    
3. Frontend setup    
cd ../frontend    
npm install    
npm start    
    
🐳 Running with Docker    
    
To run the entire service in a container environment:

docker-compose up --build

🔧 Inftastructure
Backend .env
DATABASE_URL=postgresql://user:password@localhost:5432/dashboard
JWT_SECRET=your-jwt-secret
NODE_ENV=development
PORT=4000

Frontend .env
REACT_APP_API_URL=http://localhost:4000
REACT_APP_ENV=development


🧪 Testing & CI/CD
Tests

Backend: Nest.js

Frontend: React.js

Test command:

npm run test

CI/CD

GitHub Actions pipeline:

Test
Build & Dockerize
Deploy (with manual approval)

📊 Reporting Modules

Overview Dashboard: General metrics (active users, message volume, average response time)
User Insights: User activity trends
Channel Reports: Channel-based interaction reports


👨‍💻 Contribution Guide

Create a branch for the new feature:

git checkout -b feature/<feature-name>

Run tests:

npm run test
Explain the purpose of the change in the PR description.
Merge after code review.

🪪 License

This project belongs to Kremna Company.
All rights reserved.

📫 Contact

Project Management: suaybdemir1@gmail.com

Note: The real-time messaging and event publishing infrastructure is outside the scope of this repository.
This repository only contains dashboard and reporting functions.
