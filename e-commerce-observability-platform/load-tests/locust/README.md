# Locust Load Testing Workflow

This document describes the workflow used to run default and high‑load tests against the Online Boutique application using Locust running inside Kubernetes.

##  Overview

We performed two rounds of load testing:

1. **Default load test** – using original Locust configuration from the deployment
2. **High‑load test** – updating the deployment to increase `USERS` and `RATE` env vars

We collected logs, saved them to files, and analyzed results with a Python script.

---

##  Default Load Test Workflow

### 1. Verify loadgenerator pod

```bash
kubectl get pods -l app=loadgenerator
```

### 2. Wait for steady‑state load

Let the test run for multiple hours.

### 3. Collect Locust logs

```bash
kubectl logs <loadgenerator-pod-name > default_locust_test_logs.txt
```

Here is the example of: [./default_locust_test_logs.txt](./default_locust_test_logs.txt)    


(Optional) To find the pod name:

```bash
kubectl get pods -l app=loadgenerator
```

### 4. Run Python log analysis

Run Python  script locally [./analyze_locust_logs.py](./analyze_locust_logs.py)         :

```bash
python analyze_locust_logs.py default_locust_test_logs.txt
```

This outputs summary metrics (requests, failures, slowest endpoints, etc.).


Here is the example: [./default_logs_report.png](./default_logs_report.png)    


---

##  High‑Load Test Workflow

### 1. Edit Deployment to increase load

Update `LOCUST_USERS` and `LOCUST_SPAWN_RATE` env vars inside `loadgenerator` Deployment. 

Here is the Deployment manifest: [./loadgenerator.yaml](./loadgenerator.yaml)  


Example:

```bash
env:
- name: USERS
  value: "20"
- name: RATE
  value: "2"
```

### 2. Apply and verify new pod

Recreate Deployment and confirm new pod is running:

```bash
kubectl apply -f loadgenerator.yaml
kubectl get pods -l app=loadgenerator
```

Wait a few minutes for metrics generation.

### 3. Collect logs correctly

**Important:** collect logs from the pod, not label selector

```bash
kubectl get pods
kubectl logs <loadgenerator-pod-name > highload_locust_test_logs.txt
```

> Using `kubectl logs -l app=loadgenerator` can miss streaming logs depending on how Kubernetes routes stdout.

Here is the example of: [./locust_logs_highload.txt](./locust_logs_highload.txt)    



### 4. Run analysis again

Change the name of log file in Python script 

```bash
python analyze_locust_logs.py locust_logs_highload.txt
```

Here is the example of: [./highload_logs_report.png](./highload_logs_report.png)  

Compare results vs the default test.

---

##  Tests Comparison

| Metric        | Default Test | High Load Test   |
| ------------- | ------------ | -----------------|
| Users         | 10           | 20               |
| Spawn rate    | 1            | 2                |
| Duration      | ~3 hours     | ~4 hours         |
| Total requests| ~63k         | ~ 96k            |

---
##  Load Test Comparison Summary

### Default Load (10 users, rate=1) vs High Load (20 users, rate=2)

| Metric               | Default Load      | High Load        | Change                           |
| -------------------- | ----------------- | ---------------- | ---------------------------------|
| Total Requests       | 63,649            | 96,244           |  +51%                            |
| Total Failures       | 9,882             | 46,064           |  +366%                           |
| Failure Rate         | 15.53%            | 47.86%           |  x3.1 worse                      |
| Slowest Endpoint     | `/cart` avg 163ms | `/cart` avg 65ms |  Appears faster due to failures  |
| Key Failing Endpoint | `/cart/checkout`  | `/cart/checkout` |  retains bottleneck              |

### Key Insights

* System **does not scale linearly** with double users.
* Massive spike in failures indicates **backend bottleneck**.
* `/cart/checkout` is the critical weak point.
* Lower latency under high load is misleading — **fast fail behavior**.

###  What This Means

These results highlight **bottlenecks in the current local Kubernetes setup** when load increases:

* The system struggles with higher concurrency — but this may be due to **local resource limitations**
* `/cart/checkout` remains the most failure-prone endpoint under stress
* Failure surge suggests **resource contention or unoptimized service logic**
* Lower average latency during high load is **fast-fail behavior**, not improved performance

> **Note:** These findings are **preliminary**.
> To confirm whether the bottlenecks are due to the application or just Local K8s limits, testing must be repeated on **cloud infrastructure with autoscaling** (EKS/GKE/AKS).

###  Next Steps

| Action                                        | Purpose                                             |
| --------------------------------------------- | --------------------------------------------------- |
| Run load tests on cloud cluster (EKS/AKS/GKE) | Validate real scalability & eliminate Minikube bias |
| Use multiple replicas for services            | Test behavior with true microservice scaling        |
| Configure CPU/memory requests & limits        | Avoid resource starvation and eviction              |
| Enable HPA/VPA                                | Evaluate autoscaling reaction to load               |
| Export metrics to Prometheus/Grafana          | Identify CPU/memory/latency bottlenecks             |
| Automate tests via CI/CD                      | Consistent, repeatable performance checks           |