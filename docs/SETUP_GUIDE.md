# Setup Guide

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd express-auth-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create environment file:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d

# Security Configuration
BCRYPT_ROUNDS=12

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:3000
```

### 4. Database Setup

#### Option A: Local PostgreSQL

1. **Install PostgreSQL** (if not already installed):

   - **macOS**: `brew install postgresql`
   - **Ubuntu**: `sudo apt-get install postgresql postgresql-contrib`
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/)

2. **Create Database**:

   ```bash
   # Connect to PostgreSQL
   psql -U postgres

   # Create database
   CREATE DATABASE mydb;

   # Create user (optional)
   CREATE USER myuser WITH PASSWORD 'mypassword';
   GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

   # Exit
   \q
   ```

3. **Update DATABASE_URL** in `.env`:
   ```env
   DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb?schema=public"
   ```

#### Option B: Docker PostgreSQL

1. **Create docker-compose.yml**:

   ```yaml
   version: "3.8"
   services:
     postgres:
       image: postgres:15
       environment:
         POSTGRES_DB: mydb
         POSTGRES_USER: myuser
         POSTGRES_PASSWORD: mypassword
       ports:
         - "5432:5432"
       volumes:
         - postgres_data:/var/lib/postgresql/data

   volumes:
     postgres_data:
   ```

2. **Start PostgreSQL**:
   ```bash
   docker-compose up -d
   ```

### 5. Database Migration

Run Prisma migrations to set up the database schema:

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view data
npm run prisma:studio
```

### 6. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Verification

### 1. Health Check

Test if the server is running:

```bash
curl http://localhost:3000/api/v1/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is running",
  "data": {
    "status": "OK",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "environment": "development"
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 2. Test Registration

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### 3. Test Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

## Development Workflow

### 1. Code Quality

Run linting:

```bash
npm run lint
npm run lint:fix
```

### 2. Database Changes

When modifying the Prisma schema:

```bash
# Create and apply migration
npm run prisma:migrate

# Regenerate Prisma client
npm run prisma:generate
```

### 3. Environment-Specific Configuration

#### Development

- Use `.env` file
- Enable detailed logging
- Hot reload with nodemon

#### Production

- Set environment variables directly
- Use production database
- Enable error reporting
- Configure proper CORS origins

## Troubleshooting

### Common Issues

#### 1. Database Connection Error

```
Error: Can't reach database server
```

**Solutions:**

- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists
- Verify user permissions

#### 2. JWT Secret Error

```
Error: JWT_SECRET environment variable is required
```

**Solution:**

- Ensure JWT_SECRET is set in `.env`
- Make it at least 32 characters long
- Use a random, secure string

#### 3. Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

- Change PORT in `.env`
- Kill process using port 3000: `lsof -ti:3000 | xargs kill -9`

#### 4. Prisma Client Not Generated

```
Error: @prisma/client did not initialize yet
```

**Solution:**

```bash
npm run prisma:generate
```

### Logs and Debugging

#### Enable Debug Logging

Add to `.env`:

```env
DEBUG=*
```

#### View Database Queries

Prisma logs are enabled in development mode. Check console output for SQL queries.

#### Check Server Logs

The application uses Morgan for HTTP request logging and console.log for application logs.

## Next Steps

After successful setup:

1. **Explore the API** using the provided endpoints
2. **Read the Architecture Documentation** to understand the codebase
3. **Review the API Documentation** for detailed endpoint information
4. **Set up your development environment** with your preferred IDE
5. **Consider adding tests** for your specific use cases

## Production Deployment

For production deployment, consider:

1. **Environment Variables**: Use proper secret management
2. **Database**: Use managed PostgreSQL service
3. **Security**: Configure proper CORS, rate limiting
4. **Monitoring**: Add application monitoring and logging
5. **SSL/TLS**: Enable HTTPS
6. **Process Management**: Use PM2 or similar for process management
