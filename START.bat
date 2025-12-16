@echo off
echo House of EdTech Setup
echo Setting up Learning Management System...
echo.

echo Step 1: Generating Prisma client...
call npm run db:generate
if %errorlevel% neq 0 (
    echo Error: Failed to generate Prisma client
    echo Make sure PostgreSQL is installed and running
    pause
    exit /b 1
)

echo.
echo Step 2: Running database migrations...
call npm run db:migrate
if %errorlevel% neq 0 (
    echo Error: Failed to run migrations
    echo Make sure the database 'nextjs_postgres_db' exists
    pause
    exit /b 1
)

echo.
echo Step 3: Seeding database...
call npm run db:seed
if %errorlevel% neq 0 (
    echo Warning: Failed to seed database
)

echo.
echo Setup complete!
echo.
echo Sample Login Credentials:
echo   Admin: admin@edtech.com / admin123
echo   Instructor: john.instructor@edtech.com / instructor123
echo   Learner: alice.student@edtech.com / student123
echo.
echo Starting development server...
echo Visit http://localhost:3000
echo.
call npm run dev