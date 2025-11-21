# Deployment Guide: How to publish your website

Since I am an AI assistant, I cannot create accounts or deploy servers on your behalf. However, I have prepared your project for deployment. Follow these steps to make your website accessible to everyone using **Vercel** (the best platform for Next.js) and a **PostgreSQL** database.

## Prerequisites
1.  A **GitHub** account ([Sign up](https://github.com/join))
2.  A **Vercel** account ([Sign up](https://vercel.com/signup))

---

## Step 1: Push your code to GitHub

1.  Create a new repository on GitHub: [https://github.com/new](https://github.com/new)
    *   Name it `radiant-zenith` (or anything you like).
    *   Make it **Public** or **Private**.
    *   Do **not** initialize with README/gitignore (we already have them).

2.  Run the following commands in your terminal (I have already committed your local changes):

```bash
# Replace <YOUR_USERNAME> and <REPO_NAME> with your actual details
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

1.  Go to your Vercel Dashboard: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `radiant-zenith` repository.
4.  In the **Configure Project** screen:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: `./` (default).
    *   **Environment Variables**: We will add these in the next step.
5.  Click **Deploy**.
    *   *Note: The initial deployment might fail or show an error because the database isn't connected yet. This is normal.*

---

## Step 3: Set up the Database (Vercel Postgres)

1.  Once the project is created (even if deploy failed), go to the **Storage** tab in your Vercel project dashboard.
2.  Click **"Connect Store"** -> **"Create New"** -> **"Postgres"**.
3.  Accept the terms and create the database.
4.  Once created, go to the **.env.local** tab (or "Quickstart") in the database page.
5.  Click **"Copy Snippet"** to get your database credentials.
6.  Go to your Project **Settings** -> **Environment Variables**.
7.  Add the variables you copied (mainly `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING`).
    *   **Important**: Rename `POSTGRES_PRISMA_URL` to `DATABASE_URL` in the environment variables, OR update your schema to use the specific name. The easiest way is to set `DATABASE_URL` to the value of `POSTGRES_PRISMA_URL`.

---

## Step 4: Update Code for PostgreSQL

By default, we used SQLite. For production, we need PostgreSQL.

1.  Open `prisma/schema.prisma` in your editor.
2.  Change the provider from `"sqlite"` to `"postgresql"`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3.  Commit and push this change:

```bash
git add prisma/schema.prisma
git commit -m "Switch to PostgreSQL for production"
git push
```

Vercel will automatically detect the push and start a new deployment.

---

## Step 5: Seed the Database

Now we need to put your questions into the new cloud database.

1.  Get your **connection string** from Vercel (the `POSTGRES_PRISMA_URL`).
2.  Run the seed command locally, pointing to the remote database:

```bash
# Replace the URL with your actual Vercel Postgres URL
export DATABASE_URL="postgres://default:..." 
npx prisma db push
npx prisma db seed
```

*   `npx prisma db push`: Creates the tables in the cloud DB.
*   `npx prisma db seed`: Fills it with your chapters and questions.

---

## Step 6: Visit your Website!

Once the deployment finishes and the database is seeded, Vercel will give you a domain (e.g., `radiant-zenith.vercel.app`). You can share this link with anyone!
