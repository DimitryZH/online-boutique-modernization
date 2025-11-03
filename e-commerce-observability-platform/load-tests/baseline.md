# Baseline Load Test — k6

## Test Configuration & Readiness Criteria

### Prerequisites
- [ ] k6 installed and verified (`k6 version`)
- [ ] Target environment running (`http://127.0.0.1:8080` accessible)
- [ ] Grafana Cloud connection configured
- [ ] All microservices healthy and responding
- [ ] Monitoring dashboards set up

### Performance Targets
- Response Times:
  - P95: < 1.5s (current baseline)
  - P90: < 1.4s (current baseline)
  - Average: < 800ms (current baseline)
- Error Rate: 0% (maintaining current perfect rate)
- Throughput: > 17 requests/second

## Running the Test

```bash
k6 run --out cloud loadtest-realflow.js
```

## Test Scenario

Simulated user flow:
1. Visit homepage
2. Open product catalog
3. Add to cart
4. View cart

Test settings:
- Duration: 50s load + 30s ramp-down
- Max VUs: 30
- Output: Grafana Cloud

## Key Metrics from Latest Run

| Metric | Value |
|--------|-------|
| HTTP Requests | **910** |
| Success Rate | **100%** |
| Errors | **0** |
| Avg Latency | **~743ms** |
| p90 Latency | **1.39s** |
| p95 Latency | **1.50s** |
| Max Latency | **2.39s** |
| Req/sec | ~**17.6** |
| Iterations | **182** |
| Data received | **9.5 MB** |
| Data sent | **149 KB** |

```bash
checks_succeeded...: 100.00% 728/728
http_req_duration..: avg=742.68ms p(90)=1.39s p(95)=1.5s
http_req_failed....: 0.00%
vus...............: max=30
```
 k6-grafana-local-test.png


## Interpretation

- System is **stable** under 30 VUs
- **Zero request failures**
- Latency around **p95 ~ 1.5s** — acceptable baseline
- Ready for next step: autoscaling + increased load


## Dashboard Reference
For detailed metrics visualization, see:
grafana-cloud-loadtest-realflow-03.11.25.gif


## Monitoring Configuration

### Key Metrics to Watch
1. Application Performance:
   - Request rate and errors
   - Response time percentiles
   - Service health checks
   - Database response times

2. System Resources:
   - Container CPU/Memory
   - Network throughput
   - Disk I/O (if applicable)
   - Pod scaling events

3. Business Metrics:
   - Cart completion rate
   - Product view duration
   - Checkout funnel progress

## Next Test Plan & Scaling Strategy

### Immediate Actions
| Step | Goal | Success Criteria |
|------|------|------------------|
| Enable HPA | Scale based on CPU / requests | Pods scale within 2-3 minutes |
| Increase to 100–200 VUs | Stress system | Maintain p95 < 2s |
| Compare dashboards | Before/After scaling | Document improvements |

### Scale Testing Phases
1. **Baseline Verification** ✅
   - Current: 30 VUs
   - All metrics within targets
   - Zero errors

2. **Initial Scale Test**
   - Target: 100 VUs
   - Duration: 5 minutes
   - Monitor HPA behavior

3. **Peak Load Test**
   - Target: 200 VUs
   - Duration: 10 minutes
   - Validate recovery time

4. **Endurance Test**
   - Target: 150 VUs
   - Duration: 30 minutes
   - Verify stability

### Success Criteria for Scale Testing
- Zero application errors
- P95 response time < 2s under load
- Successful HPA scaling events
- No cascading failures
- Full recovery after test


