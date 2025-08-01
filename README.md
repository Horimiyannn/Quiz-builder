# Quiz App

### 1. Clone the Repository and install dependencies

```bash
git clone https://github.com/Horimiyannn/Quiz-builder
cd Quiz-builder
pnpm i
```

---

## Backend Setup


```bash
cd backend
```

### 2. Set Up Database

- Copy the example environment file and edit if needed:
  ```bash
  cp .env.example .env
  ```
- The default uses SQLite, no extra setup needed.

- Push prisma schema to database:
  ```bash
  pnpm prisma db push
  ```

### 3. Seed the Database with Sample Quizzes

```bash
pnpm seed
```

### 4. Start Frontend and Backend Servers

```bash
cd ..
pnpm dev
```

The frontend will run on [http://localhost:3000](http://localhost:3000) by default.
The backend will run on [http://localhost:3001](http://localhost:3001) by default.

---


## Creating a Sample Quiz

1. Go to [http://localhost:3000/create](http://localhost:3000/create).
2. Fill in the quiz title.
3. Add questions (Boolean, Input, or Checkbox).
4. For Checkbox questions, add options and mark correct answers.
5. Click "Create Quiz" to save.

---

## Notes

- The backend API runs on port 3001, and the frontend expects this by default.
- The database is SQLite and stored in `backend/prisma/dev.db`.
- You can modify or add more seed data in `backend/prisma/seed.ts`.

---
