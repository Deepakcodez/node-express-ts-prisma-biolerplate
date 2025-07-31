# Express TypeScript Authentication Backend

A production-ready Node.js backend built with Express, TypeScript, Prisma, and PostgreSQL featuring comprehensive user authentication, robust error handling, and industry best practices.

## 🚀 Features

- 🔐 **JWT Authentication** - Secure token-based authentication with configurable expiration
- 🛡️ **Password Security** - bcrypt hashing with configurable salt rounds
- 📝 **Input Validation** - Joi schema validation with custom error messages
- 🗄️ **Database ORM** - PostgreSQL with Prisma for type-safe database operations
- 🚦 **Security Middleware** - Rate limiting, CORS, Helmet security headers
- 📊 **Structured Responses** - Consistent API response format across all endpoints
- 🔍 **Error Handling** - Comprehensive error handling with custom error classes
- 📋 **Code Quality** - ESLint, TypeScript strict mode, and proper project structure
- 🔄 **Development Tools** - Hot reload, logging, and database management tools
- 🏗️ **Architecture** - Clean separation of concerns with controllers, services, and middleware

## Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your database URL and JWT secret.

3. **Set up database**

   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Authentication Endpoints

#### Register User

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login User

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Get User Profile (Protected)

```http
GET /api/v1/auth/profile
Authorization: Bearer <jwt_token>
```

### System Endpoints

#### Health Check

```http
GET /api/v1/health
```

## 🔧 Authentication Flow

1. **Registration**: User provides email, password, and optional profile info
2. **Password Hashing**: Password is hashed using bcrypt with configurable rounds
3. **JWT Generation**: Server generates JWT token with user payload
4. **Login**: User provides credentials, server validates and returns JWT
5. **Protected Routes**: Client sends JWT in Authorization header
6. **Token Verification**: Middleware verifies JWT and extracts user info

## 🏗️ Project Architecture

```
src/
├── config/
│   └── database.ts          # Prisma client configuration
├── controllers/
│   └── authController.ts    # Authentication route handlers
├── middleware/
│   ├── auth.ts             # JWT authentication middleware
│   ├── errorHandler.ts     # Global error handling
│   └── validation.ts       # Request validation middleware
├── routes/
│   ├── authRoutes.ts       # Authentication routes
│   └── index.ts            # Main route aggregator
├── services/
│   └── authService.ts      # Authentication business logic
├── types/
│   └── index.ts            # TypeScript interfaces and types
├── utils/
│   ├── apiResponse.ts      # Standardized API responses
│   ├── errors.ts           # Custom error classes
│   ├── jwt.ts              # JWT utility functions
│   └── validation.ts       # Joi validation schemas
├── app.ts                  # Express application setup
└── server.ts               # Server entry point and graceful shutdown
```

### Architecture Principles

- **Controllers**: Handle HTTP requests/responses, delegate to services
- **Services**: Contain business logic, interact with database
- **Middleware**: Handle cross-cutting concerns (auth, validation, errors)
- **Utils**: Reusable utility functions and helpers
- **Types**: TypeScript interfaces for type safety
- **Separation of Concerns**: Each layer has a single responsibility

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Environment Variables

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="mysql://root:root@localhost:3306/test_db"
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
```

## API Response Format

All API responses follow a consistent structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 📚 Documentation

For detailed information, check out these documentation files:

- **[Setup Guide](docs/SETUP_GUIDE.md)** - Complete installation and configuration guide
- **[API Documentation](docs/API_DOCUMENTATION.md)** - Detailed API endpoints with examples
- **[Architecture Guide](docs/ARCHITECTURE.md)** - System architecture and design patterns

## 🛠️ Development

### Code Quality Standards

- **TypeScript**: Strict mode enabled with comprehensive type checking
- **ESLint**: Configured with TypeScript rules and best practices
- **Error Handling**: Custom error classes with proper HTTP status codes
- **Validation**: Joi schemas for request validation with custom messages
- **Security**: Helmet, CORS, rate limiting, and JWT authentication

### Project Conventions

- **Naming**: camelCase for variables/functions, PascalCase for classes
- **File Structure**: Feature-based organization with clear separation
- **Error Handling**: Always use try-catch with proper error propagation
- **API Responses**: Consistent response format using ApiResponseUtil
- **Database**: Use Prisma for all database operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
