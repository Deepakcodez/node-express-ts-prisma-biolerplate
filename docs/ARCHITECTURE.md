# Architecture Documentation

## Overview

This application follows a layered architecture pattern with clear separation of concerns. Each layer has specific responsibilities and communicates with adjacent layers through well-defined interfaces.

## Architecture Layers

```
┌─────────────────────────────────────────┐
│                Routes                   │  ← HTTP endpoints
├─────────────────────────────────────────┤
│              Controllers                │  ← Request/Response handling
├─────────────────────────────────────────┤
│               Services                  │  ← Business logic
├─────────────────────────────────────────┤
│              Database                   │  ← Data persistence
└─────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Routes Layer (`src/routes/`)

- **Purpose**: Define HTTP endpoints and route configuration
- **Responsibilities**:
  - Map HTTP methods and paths to controller functions
  - Apply middleware (authentication, validation, rate limiting)
  - Group related routes together

**Example:**

```typescript
router.post(
  "/register",
  validateRequest(registerSchema),
  AuthController.register
);
router.get("/profile", authenticate, AuthController.getProfile);
```

### 2. Controllers Layer (`src/controllers/`)

- **Purpose**: Handle HTTP requests and responses
- **Responsibilities**:
  - Extract data from HTTP requests
  - Call appropriate service methods
  - Format and send HTTP responses
  - Handle errors by passing them to error middleware

**Example:**

```typescript
static async register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await AuthService.register(req.body);
    ApiResponseUtil.success(res, 'User registered successfully', result, 201);
  } catch (error) {
    next(error);
  }
}
```

### 3. Services Layer (`src/services/`)

- **Purpose**: Implement business logic and rules
- **Responsibilities**:
  - Validate business rules
  - Interact with database through Prisma
  - Perform data transformations
  - Handle complex operations

**Example:**

```typescript
static async register(data: RegisterRequest): Promise<AuthResponse> {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new ConflictError('User already exists');

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await prisma.user.create({ data: { email, password: hashedPassword } });

  return { user, token: JwtUtil.generateToken({ userId: user.id, email }) };
}
```

### 4. Database Layer (`src/config/`)

- **Purpose**: Data persistence and retrieval
- **Responsibilities**:
  - Database connection management
  - Query execution through Prisma ORM
  - Data modeling and relationships

## Cross-Cutting Concerns

### Middleware (`src/middleware/`)

- **Authentication**: JWT token verification
- **Validation**: Request data validation using Joi
- **Error Handling**: Global error processing and response formatting
- **Security**: Rate limiting, CORS, security headers

### Utilities (`src/utils/`)

- **JWT**: Token generation and verification
- **API Responses**: Standardized response formatting
- **Errors**: Custom error classes with proper HTTP status codes
- **Validation**: Joi schemas for request validation

### Types (`src/types/`)

- **Interfaces**: TypeScript type definitions
- **Request/Response**: API contract definitions
- **Domain Models**: Business entity types

## Data Flow

### 1. Request Flow

```
HTTP Request → Route → Middleware → Controller → Service → Database
```

### 2. Response Flow

```
Database → Service → Controller → Response Formatter → HTTP Response
```

### 3. Error Flow

```
Error → Service/Controller → Error Middleware → Formatted Error Response
```

## Design Patterns

### 1. Dependency Injection

- Services are injected into controllers
- Database client is injected into services
- Promotes testability and loose coupling

### 2. Factory Pattern

- Error classes use factory methods
- JWT utility provides factory methods for token operations

### 3. Middleware Pattern

- Express middleware for cross-cutting concerns
- Composable and reusable middleware functions

### 4. Repository Pattern (via Prisma)

- Database operations abstracted through Prisma client
- Type-safe database queries
- Automatic query generation

## Security Architecture

### 1. Authentication

- JWT-based stateless authentication
- Secure token generation with configurable expiration
- Token verification middleware for protected routes

### 2. Authorization

- Role-based access control ready (extensible)
- Route-level protection through middleware

### 3. Data Protection

- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention through Prisma ORM

### 4. Security Headers

- Helmet middleware for security headers
- CORS configuration
- Rate limiting to prevent abuse

## Scalability Considerations

### 1. Horizontal Scaling

- Stateless design allows multiple server instances
- JWT tokens eliminate server-side session storage
- Database connection pooling through Prisma

### 2. Caching Strategy

- Ready for Redis integration
- JWT tokens reduce database lookups
- Prisma query optimization

### 3. Monitoring & Logging

- Structured logging with Morgan
- Error tracking and reporting
- Health check endpoints for monitoring

## Testing Strategy

### 1. Unit Tests

- Service layer business logic
- Utility functions
- Middleware functions

### 2. Integration Tests

- API endpoint testing
- Database operations
- Authentication flows

### 3. End-to-End Tests

- Complete user workflows
- Error scenarios
- Security testing
