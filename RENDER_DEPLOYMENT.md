# Render Deployment Guide

## Prerequisites

1. A Render account (https://render.com)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. MongoDB Atlas database (or another cloud MongoDB service)

## Step 1: Push Code to Git Repository

Ensure your code is pushed to a Git repository that Render can access.

## Step 2: Create a New Web Service on Render

1. Go to your Render dashboard
2. Click "New +" and select "Web Service"
3. Connect your Git repository
4. Configure the service:

### Basic Settings:
- **Name**: `anand-agro-backend` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your deployment branch)
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Environment Variables:
Add these environment variables in Render dashboard:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://admin:<password>@anandagro.8wocett.mongodb.net/anand-agro?retryWrites=true&w=majority&appName=anandagro
JWT_SECRET=your-super-secure-jwt-secret-for-production
FRONTEND_URL=https://your-frontend-domain.com
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://anandagro.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@anandagro.com
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## Step 3: Database Setup

1. Ensure your MongoDB Atlas database is accessible from anywhere (0.0.0.0/0) or whitelist Render's IP ranges
2. Update the MONGODB_URI with your actual database password
3. Test the connection

## Step 4: Domain Configuration

1. After deployment, Render will provide a URL like: `https://anand-agro-backend.onrender.com`
2. Update your frontend to use this API URL
3. Add your frontend domain to ALLOWED_ORIGINS environment variable

## Step 5: Post-Deployment

1. Test all API endpoints
2. Monitor logs in Render dashboard
3. Set up health checks if needed

## Important Notes

- Free tier services may sleep after 15 minutes of inactivity
- Consider upgrading to paid plans for production use
- Always use HTTPS in production
- Keep your environment variables secure

## API Health Check

Your API will be available at: `https://your-service-name.onrender.com/api/health`

## Troubleshooting

1. Check Render logs if deployment fails
2. Ensure all environment variables are set correctly
3. Verify MongoDB connection string
4. Check CORS configuration for frontend access
