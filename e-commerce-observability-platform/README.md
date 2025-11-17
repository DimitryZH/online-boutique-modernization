## Part 2: E-commerce Observability Platform

This part of the project provides two comprehensive solutions for monitoring, logging, tracing, and performance testing the application.

### Solution 1: Cloud Observability with Grafana Cloud

This solution uses the **Grafana Cloud Kubernetes Monitoring stack (k8s-monitoring v3.5.6)** to provide a fully managed observability platform.

*   **Components**: Grafana Alloy, Prometheus, Loki, Tempo, Kube State Metrics, Node Exporter, cAdvisor, and Kepler.
*   **Features**: Centralized metrics, logs, and traces in Grafana Cloud, with minimal local setup.
*   **Best for**: Production or pre-production environments where a managed, scalable solution is preferred.

For more details, see the [README in `observability/grafana-cloud-stack`](observability/grafana-cloud-stack/README.md).

### Solution 2: Local Observability with Kube Prometheus Stack

This solution provides a self-hosted, local observability platform running locally.

*   **Components**: Prometheus, Grafana, Alertmanager, Loki, and Tempo.
*   **Features**: A full-featured observability stack running locally for development and testing.
*   **Best for**: Local development, testing, and debugging in an isolated environment.

For more details, see the [README in `observability/kube-prometheus-stack`](observability/kube-prometheus-stack/README.md).

### Load Testing

Both observability solutions can be used in conjunction with the provided load testing tools:

*   **k6**: For scripted, performance-oriented load tests.
*   **Locust**: For user behavior simulation and complex load testing scenarios.

See the `e-commerce-observability-platform/load-tests` directory for more details.
