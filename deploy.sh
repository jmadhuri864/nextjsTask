#!/bin/bash

echo "House of EdTech - Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: House of EdTech LMS"
    echo "Git repository initialized!"
    echo ""
    echo "Next steps:"
    echo "1. Create a GitHub repository"
    echo "2. Run: git remote add origin https://github.com/yourusername/house-of-edtech.git"
    echo "3. Run: git push -u origin main"
    echo "4. Deploy to Vercel by importing the GitHub repository"
else
    echo "Git repository already exists"
    echo "Pushing latest changes..."
    git add .
    git commit -m "Update: $(date)"
    git push
fi

echo ""
echo "Deployment checklist:"
echo "[ ] Database created (Supabase/Railway/Neon)"
echo "[ ] GitHub repository created and pushed"
echo "[ ] Vercel project created"
echo "[ ] Environment variables set in Vercel:"
echo "    - DATABASE_URL"
echo "    - NEXTAUTH_SECRET"
echo "    - NEXTAUTH_URL"
echo "[ ] Database migrations deployed"
echo "[ ] Application tested"

echo ""
echo "For detailed instructions, see DEPLOYMENT.md"