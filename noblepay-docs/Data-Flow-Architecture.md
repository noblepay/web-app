# NoblePay Data Flow Architecture

## Overview
This document details the data flow patterns for NoblePay's core features, showing how information moves through the system from user interaction to backend services and external integrations.

## 1. Cross-Border Remittance Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant RC as RemittanceCalculator
    participant API as Remittance API
    participant FX as FX Service
    participant Compliance as AML/KYC Service
    participant Bank as Banking Partner
    participant Recipient as Recipient
    
    U->>RC: Enter amount & select country
    RC->>FX: Get current exchange rate
    FX-->>RC: Return rate (e.g., 1 USD = 1650 NGN)
    RC->>RC: Calculate fees & final amount
    RC-->>U: Display calculation summary
    
    U->>RC: Confirm transfer
    RC->>API: Initiate transfer request
    API->>Compliance: Validate sender/recipient
    Compliance-->>API: Compliance status
    
    alt Compliance Approved
        API->>Bank: Execute transfer
        Bank->>Bank: Process international transfer
        Bank-->>API: Transfer confirmation
        API->>Recipient: Send notification
        API-->>RC: Success response
        RC-->>U: Transfer complete notification
    else Compliance Failed
        API-->>RC: Compliance error
        RC-->>U: Additional verification required
    end
```

### Data Models
```typescript
interface RemittanceTransaction {
  id: string;
  senderId: string;
  recipientId: string;
  sendAmount: number;
  sendCurrency: string;
  receiveAmount: number;
  receiveCurrency: string;
  exchangeRate: number;
  fees: number;
  status: TransactionStatus;
  createdAt: Date;
  completedAt?: Date;
  reference: string;
}

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  timestamp: Date;
  source: string;
}

enum TransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}
```

## 2. Mobile Money Integration Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant MM as MobileMoneySection
    participant API as Mobile Money API
    parameter Det as Provider Detection
    participant MTN as MTN API
    participant Airtel as Airtel API
    participant Orange as Orange API
    
    U->>MM: Enter phone number
    MM->>Det: Detect provider from number
    Det-->>MM: Provider identified (e.g., MTN)
    MM-->>U: Show provider & rates
    
    U->>MM: Enter top-up amount
    MM->>MM: Calculate fees & total
    MM-->>U: Display cost breakdown
    
    U->>MM: Confirm top-up
    MM->>API: Create top-up request
    
    alt MTN Provider
        API->>MTN: Initiate top-up
        MTN->>MTN: Process transaction
        MTN-->>API: Transaction result
    else Airtel Provider
        API->>Airtel: Initiate top-up
        Airtel-->>API: Transaction result
    else Orange Provider
        API->>Orange: Initiate top-up
        Orange-->>API: Transaction result
    end
    
    API-->>MM: Final status
    MM-->>U: Success/failure notification
```

### Data Models
```typescript
interface MobileMoneyProvider {
  id: string;
  name: string;
  code: string;
  countries: string[];
  apiEndpoint: string;
  supportedOperations: Operation[];
  fees: FeeStructure;
}

interface TopUpTransaction {
  id: string;
  userId: string;
  phoneNumber: string;
  provider: string;
  amount: number;
  fees: number;
  total: number;
  status: TransactionStatus;
  externalReference?: string;
  createdAt: Date;
}

interface FeeStructure {
  fixed: number;
  percentage: number;
  minimum: number;
  maximum: number;
}
```

## 3. Bill Payment Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant BS as BillsSection
    participant API as Bills API
    participant Utility as Utility Provider
    participant Payment as Payment Gateway
    
    U->>BS: Select bill category
    BS->>API: Get providers by country
    API-->>BS: Return provider list
    BS-->>U: Display available providers
    
    U->>BS: Select provider & enter details
    BS->>API: Validate bill number
    API->>Utility: Verify customer account
    Utility-->>API: Account details & amount due
    API-->>BS: Bill information
    BS-->>U: Show bill details
    
    U->>BS: Confirm payment
    BS->>API: Process bill payment
    API->>Payment: Charge user account
    Payment-->>API: Payment confirmation
    API->>Utility: Submit payment
    Utility-->>API: Payment accepted
    API-->>BS: Success response
    BS-->>U: Payment confirmation
```

### Data Models
```typescript
interface BillProvider {
  id: string;
  name: string;
  category: BillCategory;
  country: string;
  apiEndpoint: string;
  validationPattern: string;
  icon: string;
}

interface BillPayment {
  id: string;
  userId: string;
  provider: string;
  accountNumber: string;
  amount: number;
  fees: number;
  customerName?: string;
  dueDate?: Date;
  status: TransactionStatus;
  receiptNumber?: string;
  createdAt: Date;
}

enum BillCategory {
  ELECTRICITY = 'electricity',
  WATER = 'water',
  INTERNET = 'internet',
  TV = 'tv',
  EDUCATION = 'education'
}
```

## 4. QR/P2P Payment Data Flow

```mermaid
sequenceDiagram
    participant Payer as Payer
    participant PS as PaymentsSection
    participant QR as QR Service
    participant API as Payments API
    participant Payee as Payee
    participant Wallet as Wallet Service
    
    alt QR Code Payment
        Payee->>PS: Generate QR code
        PS->>QR: Create payment QR
        QR-->>PS: QR code data
        PS-->>Payee: Display QR code
        
        Payer->>PS: Scan QR code
        PS->>QR: Decode QR data
        QR-->>PS: Payment details
        PS-->>Payer: Show payment details
        
        Payer->>PS: Confirm payment
        PS->>API: Process QR payment
    else P2P Transfer
        Payer->>PS: Enter recipient & amount
        PS->>API: Validate recipient
        API-->>PS: Recipient details
        PS-->>Payer: Confirm transfer details
        
        Payer->>PS: Authorize transfer
        PS->>API: Process P2P transfer
    end
    
    API->>Wallet: Debit payer account
    Wallet-->>API: Debit confirmation
    API->>Wallet: Credit payee account
    Wallet-->>API: Credit confirmation
    API-->>PS: Transaction complete
    PS-->>Payer: Success notification
    PS-->>Payee: Payment received notification
```

### Data Models
```typescript
interface QRPaymentData {
  merchantId: string;
  merchantName: string;
  amount?: number;
  currency: string;
  description?: string;
  expiresAt?: Date;
}

interface P2PTransfer {
  id: string;
  senderId: string;
  recipientId: string;
  amount: number;
  currency: string;
  fees: number;
  description?: string;
  status: TransactionStatus;
  createdAt: Date;
}

interface WalletTransaction {
  id: string;
  walletId: string;
  type: 'debit' | 'credit';
  amount: number;
  balance: number;
  reference: string;
  description: string;
  createdAt: Date;
}
```

## 5. Marketplace Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant MS as MarketplaceSection
    participant API as Marketplace API
    participant Inventory as Inventory Service
    participant Cart as Cart Service
    participant Payment as Payment Service
    participant Vendor as Vendor
    
    U->>MS: Browse products
    MS->>API: Get products by category
    API->>Inventory: Fetch product catalog
    Inventory-->>API: Product list with availability
    API-->>MS: Product data
    MS-->>U: Display product grid
    
    U->>MS: Add product to cart
    MS->>Cart: Add item to cart
    Cart-->>MS: Updated cart state
    MS-->>U: Cart updated notification
    
    U->>MS: Proceed to checkout
    MS->>Cart: Get cart contents
    Cart-->>MS: Cart items & total
    MS-->>U: Checkout summary
    
    U->>MS: Complete purchase
    MS->>Payment: Process payment
    Payment-->>MS: Payment confirmation
    MS->>API: Create order
    API->>Vendor: Send order notification
    API->>Inventory: Update stock levels
    API-->>MS: Order created
    MS-->>U: Order confirmation
```

### Data Models
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  vendor: string;
  stock: number;
  images: string[];
  rating: number;
  reviews: number;
  countryAvailability: string[];
}

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  addedAt: Date;
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
  shippingAddress: Address;
  createdAt: Date;
}

enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}
```

## 6. Real-time Data Synchronization

### WebSocket Connections
```mermaid
graph LR
    Client[Client App] --> WS[WebSocket Server]
    WS --> Exchange[Exchange Rate Updates]
    WS --> Transaction[Transaction Status Updates]
    WS --> Notification[Push Notifications]
    WS --> Cart[Cart Synchronization]
```

### Event-Driven Updates
```typescript
interface WebSocketEvent {
  type: EventType;
  payload: any;
  timestamp: Date;
  userId?: string;
}

enum EventType {
  EXCHANGE_RATE_UPDATE = 'exchange_rate_update',
  TRANSACTION_STATUS_UPDATE = 'transaction_status_update',
  CART_SYNC = 'cart_sync',
  NOTIFICATION = 'notification',
  SYSTEM_MAINTENANCE = 'system_maintenance'
}
```

## 7. Offline Data Handling

### Local Storage Strategy
```typescript
interface OfflineQueue {
  id: string;
  action: string;
  data: any;
  timestamp: Date;
  retries: number;
}

// IndexedDB for offline data
interface OfflineStore {
  transactions: Transaction[];
  exchangeRates: ExchangeRate[];
  products: Product[];
  userProfile: User;
}
```

### Sync Mechanism
```mermaid
sequenceDiagram
    participant App as PWA
    participant SW as Service Worker
    participant API as Backend API
    participant IDB as IndexedDB
    
    App->>SW: Queue offline action
    SW->>IDB: Store in offline queue
    
    Note over App, API: Network available
    
    SW->>IDB: Get queued actions
    IDB-->>SW: Offline queue
    SW->>API: Sync queued actions
    API-->>SW: Sync results
    SW->>IDB: Update local data
    SW->>App: Notify sync complete
```

## 8. Error Handling & Recovery

### Error Flow Patterns
```typescript
interface ErrorResponse {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  requestId: string;
}

// Retry mechanism for failed requests
interface RetryConfig {
  maxRetries: number;
  backoffMultiplier: number;
  retryableErrors: string[];
}
```

### Circuit Breaker Pattern
```mermaid
stateDiagram-v2
    [*] --> Closed
    Closed --> Open : Failure threshold reached
    Open --> HalfOpen : Timeout elapsed
    HalfOpen --> Closed : Success
    HalfOpen --> Open : Failure
```

---
*Document Version: 1.0*  
*Last Updated: August 19, 2025*  
*Author: Bob (System Architect)*