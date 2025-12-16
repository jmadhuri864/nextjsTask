# House of EdTech - Learning Management System

A comprehensive Learning Management System built with Next.js, PostgreSQL, and Prisma. Features course creation, student enrollment, and progress tracking.

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS

## Features

- Multi-role authentication (Admin, Instructor, Learner)
- Course creation and management
- Student enrollment with progress tracking
- Secure password hashing with bcrypt
- Responsive design with Tailwind CSS
- Type-safe database operations with Prisma
- Production-ready API structure

## Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or later)
- PostgreSQL installed and running
- npm or yarn package manager

## Setup Instructions

### 1. Install PostgreSQL

**Windows:**
- Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- Follow the installation wizard
- Remember your postgres user password

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

Connect to PostgreSQL and create a database:

```sql
-- Connect to PostgreSQL as postgres user
psql -U postgres

-- Create database
CREATE DATABASE nextjs_postgres_db;

-- Create a user (optional)
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE nextjs_postgres_db TO your_username;
```

### 3. Configure Environment Variables

Update the `.env` file with your PostgreSQL connection details:

```env
# Replace with your actual PostgreSQL credentials
DATABASE_URL="postgresql://username:password@localhost:5432/nextjs_postgres_db?schema=public"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

**Example configurations:**
- Default postgres user: `postgresql://postgres:your_password@localhost:5432/nextjs_postgres_db?schema=public`
- Custom user: `postgresql://your_username:your_password@localhost:5432/nextjs_postgres_db?schema=public`

### 4. Install Dependencies

```bash
npm install
```

### 5. Set up Prisma

Generate Prisma client and run migrations:

```bash
# Generate Prisma client
npx prisma generate

# Create and run database migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
nextjs-postgres-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── users/route.ts      # User API endpoints
│   │   │   └── posts/route.ts      # Post API endpoints
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                # Main page
│   ├── components/
│   │   ├── UserList.tsx            # User management component
│   │   └── PostList.tsx            # Post management component
│   └── lib/
│       └── prisma.ts               # Prisma client configuration
├── prisma/
│   └── schema.prisma               # Database schema
├── .env                            # Environment variables
└── package.json
```

## Database Schema

The project includes two main models:

### User Model
- `id`: Auto-incrementing primary key
- `email`: Unique email address
- `name`: Optional user name
- `posts`: Relation to user's posts
- `createdAt`, `updatedAt`: Timestamps

### Post Model
- `id`: Auto-incrementing primary key
- `title`: Post title
- `content`: Optional post content
- `published`: Boolean flag for publication status
- `author`: Relation to user (author)
- `authorId`: Foreign key to user
- `createdAt`, `updatedAt`: Timestamps

## API Endpoints

### Users
- `GET /api/users` - Get all users with their posts
- `POST /api/users` - Create a new user

### Posts
- `GET /api/posts` - Get all posts with author information
- `POST /api/posts` - Create a new post

## Useful Commands

```bash
# Reset database
npx prisma migrate reset

# View database in browser
npx prisma studio

# Generate Prisma client after schema changes
npx prisma generate

# Create new migration
npx prisma migrate dev --name migration_name

# Deploy migrations to production
npx prisma migrate deploy
```

## Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running
2. Check your DATABASE_URL in `.env`
3. Verify database exists and user has permissions
4. Test connection: `npx prisma db pull`

### Migration Issues
1. Reset database: `npx prisma migrate reset`
2. Generate client: `npx prisma generate`
3. Run migrations: `npx prisma migrate dev`

### Common Errors
- **"Database does not exist"**: Create the database in PostgreSQL
- **"Authentication failed"**: Check username/password in DATABASE_URL
- **"Connection refused"**: Ensure PostgreSQL service is running

## Next Steps

- Add authentication with NextAuth.js
- Implement user roles and permissions
- Add image upload functionality
- Create admin dashboard
- Add search and filtering
- Implement pagination
- Add email notifications
- Deploy to Vercel with Supabase or Railway

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
