# Deployment Setup Guide

Since you have already pushed your code to GitHub (Step 1), here is how to complete Steps 2 and 3.

## Step 2: Set up MongoDB Atlas (Database)
Vercel needs a database that is accessible from the internet. Your local MongoDB won't work.

1.  **Create Account**: Go to [mongodb.com](https://www.mongodb.com/) and sign up for a free account.
2.  **Create Cluster**: 
    -   Click **"Build a Database"**.
    -   Select **"Shared"** (Free) and click **"Create"**.
    -   Choose a provider (AWS) and region close to you. Click **"Create Cluster"**.
3.  **Create User**:
    -   You will be asked to create a database user.
    -   Enter a **Username** and **Password**. **Write these down!**
    -   Click **"Create User"**.
4.  **Network Access (Crucial)**:
    -   In the "IP Access List" section, click **"Add IP Address"**.
    -   Select **"Allow Access from Anywhere"** (0.0.0.0/0).
    -   Click **"Add Entry"**. *This allows Vercel to connect to your database.*
5.  **Get Connection String**:
    -   Go back to the **"Database"** tab.
    -   Click **"Connect"**.
    -   Select **"Drivers"**.
    -   Copy the connection string (it looks like `mongodb+srv://<username>:<password>@cluster0...`).
    -   **Replace `<password>`** in the string with the password you created in step 3.

## Step 3: Connect to Vercel
1.  **Login**: Go to [vercel.com](https://vercel.com) and log in with GitHub.
2.  **Import Project**:
    -   On your dashboard, click **"Add New..."** -> **"Project"**.
    -   You should see your `novatech` repository. Click **"Import"**.
3.  **Configure**:
    -   **Framework Preset**: Leave as "Next.js".
    -   **Root Directory**: Leave as `./`.
    -   **Environment Variables**:
        -   Click to expand this section.
        -   **Key**: `MONGODB_URI`
        -   **Value**: Paste your **MongoDB Atlas connection string** from Step 2 (make sure the password is correct).
        -   Click **"Add"**.
4.  **Deploy**:
    -   Click **"Deploy"**.
    -   Wait for the build to finish. You will get a live URL (e.g., `novatech.vercel.app`).

## Troubleshooting
-   **Images not loading?** Ensure `next.config.js` includes `images.unsplash.com` (I am checking this for you now).
-   **Connection Error?** Double-check your MongoDB password and that you allowed access from anywhere (0.0.0.0/0).
