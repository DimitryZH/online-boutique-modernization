# E-Commerce Observability & Performance Benchmark

This project implements a comprehensive performance testing pipeline for a microservices e-commerce application running in Kubernetes, with full observability through Grafana Cloud and load testing using k6.

## 🎯 Project Goals

- Deploy microservices e-commerce app in Kubernetes
- Enable full observability (metrics, logs, traces)
- Run baseline performance tests using k6
- Send test results to Grafana Cloud
- Evaluate system behavior under load
- Prepare to implement autoscaling (HPA) and compare results

## Prerequisites

### 1. Install k6 Locally

Choose one of these installation methods:

#### Windows with WSL (Recommended)
```powershell
# Open WSL as root
wsl -u root

# Install k6
apt update
apt install -y sudo ca-certificates curl gnupg
curl -sS https://dl.k6.io/key.gpg | gpg --dearmor -o /usr/share/keyrings/k6-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" > /etc/apt/sources.list.d/k6.list
apt update
apt install -y k6
```

#### Windows (Native)
```powershell
# Using Chocolatey
choco install k6

# Or using Windows Package Manager (winget)
winget install grafana.k6
```

#### Verify Installation
```bash
k6 version
```

### 2. Configure Grafana Cloud

1. Sign up for [Grafana Cloud](https://grafana.com/products/cloud/)
2. Get your API key from Grafana Cloud dashboard
3. Configure k6 to send results to Grafana Cloud:
   ```bash
   export K6_CLOUD_TOKEN=your-token-here
   ```

## Running Load Tests

### Local Execution
```bash
k6 run k6/loadtest-realflow.js
```

### Cloud Execution
```bash
k6 cloud k6/loadtest-realflow.js
```

## Test Scenarios

The load tests simulate real user flows including:
- Browsing the home page
- Viewing product details
- Adding items to cart
- Checking out

See `k6/loadtest-realflow.js` for the detailed test implementation. 



