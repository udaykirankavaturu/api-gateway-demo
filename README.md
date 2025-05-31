# API Gateway Demo with NGINX

This project demonstrates how a single NGINX instance can serve as:

- ✅ A **Reverse Proxy**
- ✅ A **Load Balancer**
- ✅ An **API Gateway** (authentication, rate limiting, custom headers, logging)

---

## 📦 Project Structure

```
api-gateway-full-demo/
├── user-service-1/
├── user-service-2/
├── product-service/
├── order-service/
├── nginx.conf
└── docker-compose.yml
```

Each microservice is a simple Node.js Express app that returns mock data.

---

## 🚀 Getting Started

### Prerequisites

- Docker
- Docker Compose

### Steps to Run

```bash
# Clone or extract the project folder
cd api-gateway-full-demo

# Build and start services
docker-compose up --build
```

---

## 🧪 Test the Endpoints

### 1. `GET /users` (through API Gateway on port 8080)

```bash
curl -H "X-API-Key: secret123" http://localhost:8080/users/
```

✅ Returns user data from load-balanced user-service instances (check response headers)
❌ Returns 403 if API key is missing or incorrect  
🚫 Rate-limited to 1 request per second

### 2. `GET /products`

```bash
curl http://localhost:8080/products/
```

### 3. `GET /orders`

```bash
curl http://localhost:8080/orders/
```

### 4. `Test Rate Limiting`

#### Windows PowerShell

```powershell
1..10 | ForEach-Object { Invoke-WebRequest -Uri "http://localhost:8080/users/" -Headers @{"X-API-Key"="secret123"} -UseBasicParsing }
```

#### Mac/Linux (using curl)

```bash
for i in {1..10}; do curl -H "X-API-Key: secret123" http://localhost:8080/users/; done
```

#### Mac/Linux (using wget)

```bash
for i in {1..10}; do wget --header="X-API-Key: secret123" http://localhost:8080/users/ -O-; done
```

#### Mac/Linux (using Python)

```bash
python3 -c "
import requests
for i in range(10):
    response = requests.get('http://localhost:8080/users/', headers={'X-API-Key': 'secret123'})
    print(f'Request {i+1}: Status {response.status_code}')
"
```

#### Mac/Linux (using Node.js)

```bash
node -e "
const http = require('http');
for(let i = 0; i < 10; i++) {
    http.get({
        hostname: 'localhost',
        port: 8080,
        path: '/users/',
        headers: {'X-API-Key': 'secret123'}
    }, (res) => {
        console.log(`Request ${i+1}: Status ${res.statusCode}`);
    });
}
"
```

Expected behavior:

- First 6 requests will succeed (1 normal + 5 burst)
- Remaining requests will receive 503 errors due to rate limiting
- Logs in Docker also show the rate limited logs.

---

## 🔐 Gateway Logic Highlights

### ✅ Reverse Proxy

Routes `/users`, `/products`, and `/orders` to respective services.

### ✅ Load Balancing

`/users` requests are load-balanced between 2 instances.

### ✅ Authentication

Requires header: `X-API-Key: secret123` for `/users`.

### ✅ Rate Limiting

1 request/second per IP to `/users`.

### ✅ Header Injection

Adds `X-Gateway: NGINX-API` to `/users` responses.

### ✅ Logging

Custom access logs enabled in NGINX.

---
