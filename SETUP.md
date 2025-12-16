# Quick Setup Guide

## 1. Install PostgreSQL

### Windows
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user
4. PostgreSQL will start automatically as a Windows service

### macOS
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## 2. Create Database

Open your terminal/command prompt and connect to PostgreSQL:

```bash
# Connect as postgres user
psql -U postgres

# In the PostgreSQL prompt, create the database:
CREATE DATABASE nextjs_postgres_db;

# Exit PostgreSQL
\q
```

## 3. Configure Environment

Update the `.env` file with your PostgreSQL credentials:

```env
# For default postgres user:
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/nextjs_postgres_db?schema=public"

# Replace YOUR_PASSWORD with the password you set during PostgreSQL installation
```

## 4. Setup Database Schema

Run the following commands in order:

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Create database tables
npm run db:migrate

# Seed with sample data (optional)
npm run db:seed
```

## 5. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your application!

## Troubleshooting

### "Database does not exist"
Make sure you created the database in step 2.

### "Authentication failed"
Check that your password in the DATABASE_URL matches your PostgreSQL password.

### "Connection refused"
Ensure PostgreSQL service is running:
- Windows: Check Services app
- macOS: `brew services list | grep postgresql`
- Linux: `sudo systemctl status postgresql`

### Reset Everything
If you need to start over:
```bash
npm run db:reset
npm run db:setup
```