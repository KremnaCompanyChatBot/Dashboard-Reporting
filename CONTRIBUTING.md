# Contributing Guide

Thank you for your interest in contributing to **Kremna**.  
This guide explains how to set up your environment, follow our development workflow, and submit contributions properly.

---

## 🧩 Development Workflow

### 1. Fork and Clone
```
git clone https://github.com/KremnaCompanyChatBot/Dashboard-Reporting.git
cd Dashboard-Reporting
```

### 2. Branch Naming
Follow our Gitflow structure:

| Type | Example | Description |
|------|----------|-------------|
| **feature/** | `feature/KREM-500-user-service` | New feature or story |
| **fix/** | `fix/KREM-510-api-response` | Bug fix |
| **hotfix/** | `hotfix/KREM-520-critical-bug` | Production issue fix |
| **release/** | `release/v1.3.0` | Release preparation |
| **docs/** | `docs/KREM-530-update-readme` | Documentation updates |

---

## 🧠 Commit Message Convention

We follow the **Conventional Commits** standard.

**Format:**
```
<type>(<scope>): <short summary>
```

**Examples:**
```
feat(KREM-501): add user registration API
fix(KREM-502): resolve null reference error
refactor(KREM-503): simplify authentication logic
docs(KREM-504): update README and contribution guide
test(KREM-505): add unit tests for chatbot service
```

Allowed commit types:  
`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

---

## 🧪 Testing

### Backend (NestJS)
```
cd backend
npm run test
```

### Frontend (React)
```
cd frontend
npm run test
```

Please ensure all tests pass **before submitting a pull request**.  
For complex changes, include new tests or update existing ones.

---

## 🚀 Pull Requests

1. Make sure your branch is up to date with `develop`.
2. Run all tests and linters.
3. Write a clear pull request description explaining **why** and **what** you changed.
4. Assign at least one reviewer.
5. Do **not** merge without review approval.

---

## 🔍 Code Style

- **TypeScript:** Follow ESLint and Prettier configurations in the repo.  
- **Naming:** Use descriptive, camelCase variable and function names.  
- **Functions:** Keep them pure when possible.  
- **Comments:** Only where necessary — code should be self-explanatory.

Run lint before committing:
```
npm run lint
```

---

## 🧱 Environment Setup

### Backend `.env`
```
DATABASE_URL=postgresql://user:password@localhost:5432/dashboard
JWT_SECRET=your-jwt-secret
NODE_ENV=development
PORT=4000
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:4000
REACT_APP_ENV=development
```

---

## 🧾 Code of Conduct
By participating in this project, you agree to follow our Code of Conduct.  
Respect all contributors and maintain a professional environment.

---

## 📦 Release Process

1. Merge `develop` → `release/vX.Y.Z`
2. Finalize tests, documentation, and version bump
3. Merge `release/vX.Y.Z` → `main`
4. Tag the release:
   ```bash
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   git push origin main --tags
   ```
5. Merge back to `develop` if necessary

---

## 💬 Contact

For questions, discussions, or suggestions:  
**Project Management:** suaybdemir1@gmail.com

---

> _This repository covers the dashboard and reporting modules only.  
> Real-time communication and event publishing are managed separately._
