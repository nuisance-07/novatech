---
description: How to deploy the NovaTech application to Vercel for 24/7 availability.
---

# Deploying NovaTech to Vercel

To make your website online 24/7, the best and easiest way for a Next.js application is to use **Vercel**.

## Prerequisites
1.  **GitHub Account**: You need to push your code to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.

## Steps

### 1. Push Code to GitHub
If you haven't already, initialize a git repository and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
# Create a new repo on GitHub, then:
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

### 2. Connect to Vercel
1.  Go to your Vercel Dashboard.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `novatech` repository from GitHub.

### 3. Configure Project
Vercel will automatically detect that it's a Next.js project.
-   **Framework Preset**: Next.js
-   **Root Directory**: `novatech` (if that's where your package.json is)
-   **Environment Variables**: Add your `MONGODB_URI` here.
    -   Key: `MONGODB_URI`
    -   Value: `your_mongodb_connection_string`

### 4. Deploy
Click **"Deploy"**. Vercel will build your application and assign it a live URL (e.g., `novatech.vercel.app`).

## Alternative: Netlify
You can also use Netlify.
1.  Drag and drop your `out` folder (if using static export) or connect via Git similar to Vercel.
2.  For dynamic Next.js features (like we have), you'll need the **Netlify Next.js Runtime** plugin which usually installs automatically.

## Database Note
Since you are using MongoDB, ensure your database is hosted in the cloud (e.g., **MongoDB Atlas**) so your deployed app can access it. Localhost MongoDB won't work for a deployed site.
