# IPM-2025
Repository for the Interação Pessoa-Máquina project in the a.y. 2025/2026

This project was developed using Next.js 15.5 and Supabase.
To run the project you will need to:

### 0. Preparations
Assure you have Node.js (>=18) and npm installed.
Have a supabase project ready to be used as the database.
Clone the repository and move to the subfolder growandcare

### 1. Install dependencies
npm install

### 2. Create an environment file
touch .env
### (Fill in the values)
You'll need your supabase project API keys, copy them from the dashboard
### 3. Run the development server
npm run dev

### 4. Build and run production (optional)
npm run build
npm start

### Structure
- /app — Next.js App Router pages
- /components — UI components
- /public — static assets
- /lib — helpers / Supabase clients
- /styles — global CSS
- /types — TypeScript types

## Important notes
Supabase must have tables created, constraint applied and RLS policies activated. You can find a dump of the DB schema in `schema_dump.sql` and restore through 

`psql -d your_database_name -f db/schema.sql`


Authentication is handled using Supabase Auth.
Supabase Storage buckets are required to store photos of dynamic components.