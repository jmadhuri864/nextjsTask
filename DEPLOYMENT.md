# Vercel Deployment Guide

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **PostgreSQL Database** - Use a cloud provider like:
   - [Supabase](https://supabase.com) (Recommended - Free tier)
   - [Railway](https://railway.app)
   - [Neon](https://neon.tech)
   - [PlanetScale](https://planetscale.com)

## Step 1: Setup Database (Supabase Recommended)

### Using Supabase (Free):
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy the connection string (URI format)
5. Replace `[YOUR-PASSWORD]` with your actual password

Example connection string:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
```

## Step 2: Push to GitHub

```bash
cd nextjs-postgres-app
git init
git add .
git commit -m "Initial commit: House of EdTech LMS"
git branch -M main
git remote add origin https://github.com/yourusername/house-of-edtech.git
git push -u origin main
```

## Step 3: Deploy to Vercel

1. **Connect GitHub to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables:**
   In Vercel dashboard, add these environment variables:

   ```
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres
   NEXTAUTH_SECRET=your-super-secret-key-min-32-chars
   NEXTAUTH_URL=https://your-app-name.vercel.app
   ```

3. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

## Step 4: Run Database Migrations

After deployment, you need to set up your database:

### Option A: Using Vercel CLI (Recommended)
```bash
npm i -g vercel
vercel login
vercel env pull .env.local
npx prisma migrate deploy
npx prisma db seed
```

### Option B: Using Prisma Studio
1. Install Prisma CLI: `npm install -g prisma`
2. Set your DATABASE_URL locally
3. Run: `prisma migrate deploy`
4. Run: `prisma db seed`

## Step 5: Verify Deployment

1. Visit your Vercel URL
2. Test user creation and course enrollment
3. Check database connections

## Environment Variables Explained

- **DATABASE_URL**: Your PostgreSQL connection string
- **NEXTAUTH_SECRET**: Random string for JWT signing (generate with `openssl rand -base64 32`)
- **NEXTAUTH_URL**: Your production URL (automatically set by Vercel)

## Troubleshooting

### Build Errors:
- Ensure all dependencies are in `package.json`
- Check that `prisma generate` runs in build script

### Database Connection:
- Verify DATABASE_URL is correct
- Check database allows external connections
- Ensure database exists

### Migration Issues:
- Run `prisma migrate deploy` manually
- Check Vercel function logs for errors

## Production Checklist

- [ ] Database created and accessible
- [ ] Environment variables set in Vercel
- [ ] Repository pushed to GitHub
- [ ] Vercel project deployed
- [ ] Database migrations applied
- [ ] Sample data seeded (optional)
- [ ] Application tested in production

## Sample Database Providers Setup

### Supabase (Free Tier):
1. Create project at supabase.com
2. Go to Settings > Database
3. Use connection string in format above

### Railway:
1. Create project at railway.app
2. Add PostgreSQL service
3. Copy DATABASE_URL from variables tab

### Neon:
1. Create database at neon.tech
2. Copy connection string from dashboard
3. Use in Vercel environment variables

Your House of EdTech LMS will be live at: `https://your-app-name.vercel.app`