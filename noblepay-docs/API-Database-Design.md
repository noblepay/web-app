# NoblePay API & Database Design Specification

## API Design Overview

### REST API Principles
- **Resource-based URLs**: Clear, hierarchical endpoint structure
- **HTTP Methods**: GET, POST, PUT, DELETE for CRUD operations
- **Status Codes**: Standard HTTP status codes for response indication
- **Content Type**: JSON for request/response payloads
- **Versioning**: URL path versioning (e.g., /api/v1/)

### Base URL Structure
```
Production: https://api.noblepay.com/v1
Staging: https://staging-api.noblepay.com/v1
Development: http://localhost:3001/api/v1
```

## Authentication API

### Endpoints
```http
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
POST /auth/verify-phone
POST /auth/reset-password
```

### Data Models
```typescript
interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  country: string;
  acceptedTerms: boolean;
}

interface LoginRequest {
  identifier: string; // email or phone
  password: string;
  rememberMe?: boolean;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  isVerified: boolean;
  kycStatus: KYCStatus;
  walletBalance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

enum KYCStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected'
}
```

## Remittance API

### Endpoints
```http
GET /remittance/countries
GET /remittance/exchange-rates
POST /remittance/calculate
POST /remittance/send
GET /remittance/transactions
GET /remittance/transactions/:id
```

### Exchange Rate Calculation
```typescript
interface ExchangeRateRequest {
  from: string;
  to: string;
  amount: number;
}

interface ExchangeRateResponse {
  from: string;
  to: string;
  rate: number;
  amount: number;
  convertedAmount: number;
  fees: number;
  total: number;
  timestamp: Date;
}

interface RemittanceRequest {
  recipientId: string;
  sendAmount: number;
  sendCurrency: string;
  receiveCurrency: string;
  purpose: string;
  notes?: string;
}
```

## Mobile Money API

### Endpoints
```http
GET /mobile-money/providers
GET /mobile-money/providers/:country
POST /mobile-money/top-up
POST /mobile-money/withdraw
GET /mobile-money/transactions
POST /mobile-money/link-account
```

### Provider Integration
```typescript
interface MobileMoneyProvider {
  id: string;
  name: string;
  code: string;
  logo: string;
  countries: string[];
  apiEndpoint: string;
  credentials: ProviderCredentials;
  supportedOperations: Operation[];
}

interface TopUpRequest {
  phoneNumber: string;
  amount: number;
  provider: string;
  country: string;
}

interface TopUpResponse {
  transactionId: string;
  status: TransactionStatus;
  reference: string;
  fees: number;
  total: number;
}
```

## Bill Payment API

### Endpoints
```http
GET /bills/providers
GET /bills/providers/:country/:category
POST /bills/validate
POST /bills/pay
GET /bills/transactions
GET /bills/history/:userId
```

### Bill Validation & Payment
```typescript
interface BillValidationRequest {
  provider: string;
  accountNumber: string;
  country: string;
}

interface BillValidationResponse {
  isValid: boolean;
  customerName?: string;
  amountDue?: number;
  dueDate?: Date;
  billDetails?: BillDetails;
}

interface BillPaymentRequest {
  provider: string;
  accountNumber: string;
  amount: number;
  customerName?: string;
}
```

## Payments API (QR/P2P)

### Endpoints
```http
POST /payments/qr/generate
POST /payments/qr/process
POST /payments/p2p/send
POST /payments/p2p/request
GET /payments/transactions
POST /payments/merchant/register
```

### QR Code Payments
```typescript
interface QRGenerationRequest {
  merchantId: string;
  amount?: number;
  description?: string;
  expiresIn?: number; // seconds
}

interface QRPaymentRequest {
  qrData: string;
  amount?: number;
  payerId: string;
}

interface P2PTransferRequest {
  recipientId: string;
  amount: number;
  description?: string;
  currency: string;
}
```

## Marketplace API

### Endpoints
```http
GET /marketplace/products
GET /marketplace/products/:id
GET /marketplace/categories
POST /marketplace/cart/add
PUT /marketplace/cart/update
DELETE /marketplace/cart/remove
POST /marketplace/orders
GET /marketplace/orders/:userId
```

### Product & Order Management
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  vendor: Vendor;
  images: string[];
  stock: number;
  rating: number;
  reviews: Review[];
  availability: CountryAvailability[];
}

interface OrderRequest {
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: string;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  taxes: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  createdAt: Date;
}
```

## Database Schema Design

### User Management Schema
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    country_code CHAR(2) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    kyc_status kyc_status_enum DEFAULT 'pending',
    wallet_balance DECIMAL(15,2) DEFAULT 0.00,
    currency CHAR(3) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User profiles table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    id_document_type VARCHAR(50),
    id_document_number VARCHAR(100),
    occupation VARCHAR(100),
    monthly_income DECIMAL(15,2)
);

-- User sessions table
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    refresh_token VARCHAR(500) UNIQUE NOT NULL,
    device_info JSONB,
    ip_address INET,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Transaction Schema
```sql
-- Base transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    type transaction_type_enum NOT NULL,
    status transaction_status_enum DEFAULT 'pending',
    amount DECIMAL(15,2) NOT NULL,
    currency CHAR(3) NOT NULL,
    fees DECIMAL(15,2) DEFAULT 0.00,
    description TEXT,
    reference VARCHAR(100) UNIQUE,
    external_reference VARCHAR(100),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Remittance transactions
CREATE TABLE remittance_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id),
    recipient_id UUID REFERENCES users(id),
    send_amount DECIMAL(15,2) NOT NULL,
    send_currency CHAR(3) NOT NULL,
    receive_amount DECIMAL(15,2) NOT NULL,
    receive_currency CHAR(3) NOT NULL,
    exchange_rate DECIMAL(10,6) NOT NULL,
    purpose VARCHAR(100),
    compliance_status compliance_status_enum DEFAULT 'pending'
);

-- Mobile money transactions
CREATE TABLE mobile_money_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    provider_id UUID REFERENCES mobile_money_providers(id),
    operation_type operation_type_enum NOT NULL,
    provider_reference VARCHAR(100)
);

-- Bill payments
CREATE TABLE bill_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES bill_providers(id),
    account_number VARCHAR(100) NOT NULL,
    customer_name VARCHAR(200),
    bill_category bill_category_enum NOT NULL,
    due_date DATE,
    receipt_number VARCHAR(100)
);
```

### Country & Provider Schema
```sql
-- Countries table
CREATE TABLE countries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code CHAR(2) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    currency CHAR(3) NOT NULL,
    flag_emoji VARCHAR(10),
    is_active BOOLEAN DEFAULT TRUE,
    regulatory_info JSONB
);

-- Exchange rates table
CREATE TABLE exchange_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_currency CHAR(3) NOT NULL,
    to_currency CHAR(3) NOT NULL,
    rate DECIMAL(10,6) NOT NULL,
    source VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(from_currency, to_currency, timestamp)
);

-- Mobile money providers
CREATE TABLE mobile_money_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    logo_url VARCHAR(500),
    api_endpoint VARCHAR(500),
    countries CHAR(2)[] NOT NULL,
    supported_operations operation_type_enum[] NOT NULL,
    fee_structure JSONB,
    is_active BOOLEAN DEFAULT TRUE
);

-- Bill providers
CREATE TABLE bill_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category bill_category_enum NOT NULL,
    country_code CHAR(2) NOT NULL,
    api_endpoint VARCHAR(500),
    validation_pattern VARCHAR(200),
    icon_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE
);
```

### Marketplace Schema
```sql
-- Vendors table
CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    business_license VARCHAR(100),
    address TEXT,
    country_code CHAR(2) NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_sales BIGINT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID REFERENCES vendors(id),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(15,2) NOT NULL,
    currency CHAR(3) NOT NULL,
    category VARCHAR(100) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    images JSONB, -- Array of image URLs
    rating DECIMAL(3,2) DEFAULT 0.00,
    review_count INTEGER DEFAULT 0,
    country_availability CHAR(2)[] NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    total_amount DECIMAL(15,2) NOT NULL,
    currency CHAR(3) NOT NULL,
    status order_status_enum DEFAULT 'pending',
    shipping_address JSONB NOT NULL,
    payment_method VARCHAR(50),
    tracking_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL
);
```

### Enums and Types
```sql
-- Custom enum types
CREATE TYPE transaction_type_enum AS ENUM (
    'remittance', 'mobile_money', 'bill_payment', 
    'p2p_transfer', 'qr_payment', 'marketplace_purchase'
);

CREATE TYPE transaction_status_enum AS ENUM (
    'pending', 'processing', 'completed', 'failed', 'cancelled'
);

CREATE TYPE kyc_status_enum AS ENUM (
    'pending', 'verified', 'rejected'
);

CREATE TYPE operation_type_enum AS ENUM (
    'top_up', 'withdrawal', 'balance_inquiry'
);

CREATE TYPE bill_category_enum AS ENUM (
    'electricity', 'water', 'internet', 'tv', 'education'
);

CREATE TYPE order_status_enum AS ENUM (
    'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
);

CREATE TYPE compliance_status_enum AS ENUM (
    'pending', 'approved', 'rejected', 'requires_review'
);
```

### Indexes and Performance Optimization
```sql
-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_country ON users(country_code);

-- Transaction indexes
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_reference ON transactions(reference);

-- Remittance indexes
CREATE INDEX idx_remittance_sender ON remittance_transactions(sender_id);
CREATE INDEX idx_remittance_recipient ON remittance_transactions(recipient_id);

-- Exchange rate indexes
CREATE INDEX idx_exchange_rates_currencies ON exchange_rates(from_currency, to_currency);
CREATE INDEX idx_exchange_rates_timestamp ON exchange_rates(timestamp);

-- Product indexes
CREATE INDEX idx_products_vendor ON products(vendor_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_country ON products USING GIN(country_availability);
```

## API Response Standards

### Success Response Format
```typescript
interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: Date;
  requestId: string;
}
```

### Error Response Format
```typescript
interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: Date;
  requestId: string;
}

// Standard error codes
enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  PROVIDER_UNAVAILABLE = 'PROVIDER_UNAVAILABLE',
  TRANSACTION_LIMIT_EXCEEDED = 'TRANSACTION_LIMIT_EXCEEDED',
  COMPLIANCE_CHECK_FAILED = 'COMPLIANCE_CHECK_FAILED'
}
```

### Pagination Standards
```typescript
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

## API Security & Validation

### Input Validation
```typescript
// Request validation schemas using Joi
const remittanceRequestSchema = Joi.object({
  recipientId: Joi.string().uuid().required(),
  sendAmount: Joi.number().min(1).max(10000).required(),
  sendCurrency: Joi.string().length(3).required(),
  receiveCurrency: Joi.string().length(3).required(),
  purpose: Joi.string().max(100).required(),
  notes: Joi.string().max(500).optional()
});

const phoneNumberSchema = Joi.string()
  .pattern(/^\+[1-9]\d{1,14}$/)
  .required()
  .messages({
    'string.pattern.base': 'Phone number must be in E.164 format'
  });
```

### Rate Limiting
```typescript
interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  message: string; // Error message when limit exceeded
}

// Rate limits by endpoint type
const rateLimits = {
  auth: { windowMs: 15 * 60 * 1000, maxRequests: 5 },
  transactions: { windowMs: 60 * 1000, maxRequests: 10 },
  general: { windowMs: 15 * 60 * 1000, maxRequests: 100 }
};
```

### Request/Response Middleware
```typescript
// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const requestId = uuidv4();
  req.requestId = requestId;
  
  console.log({
    requestId,
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
  
  next();
};
```

---
*Document Version: 1.0*  
*Last Updated: August 19, 2025*  
*Author: Bob (System Architect)*