# API Documentation

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 1. Register User

**Endpoint:** `POST /auth/register`

**Description:** Register a new user account

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John", // Optional
  "lastName": "Doe" // Optional
}
```

**Validation Rules:**

- `email`: Must be a valid email format (required)
- `password`: Minimum 8 characters (required)
- `firstName`: Optional string
- `lastName`: Optional string

**Success Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "clr123abc456",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Error Responses:**

- `400`: Validation error
- `409`: User already exists

---

### 2. Login User

**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and receive JWT token

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "clr123abc456",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Error Responses:**

- `400`: Validation error
- `401`: Invalid credentials
- `404`: User not found

---

### 3. Get User Profile

**Endpoint:** `GET /auth/profile`

**Description:** Get current user's profile information

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "clr123abc456",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isActive": true,
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Error Responses:**

- `401`: Unauthorized (missing or invalid token)
- `404`: User not found

---

### 4. Health Check

**Endpoint:** `GET /health`

**Description:** Check server health status

**Success Response (200):**

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

## Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (optional)",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict (resource already exists)
- `429`: Too Many Requests (rate limit exceeded)
- `500`: Internal Server Error

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Response**: 429 status code when limit exceeded
- **Headers**: Rate limit info included in response headers
