# Online Boutique Modernization: From GCP to Azure with GitOps and Observability

This project demonstrates the modernization of the "Online Boutique" microservices application by migrating it from Google Kubernetes Engine (GKE) to Azure Kubernetes Service (AKS) using a GitOps approach with Argo CD. It also includes a comprehensive observability and performance testing platform.

## Project Structure

The project is organized into two main components:

```
.
├── azure-argocd/                  # Part 1: GitOps deployment to AKS
│   ├── apps/
│   ├── assets/
│   └── projects/
└── e-commerce-observability-platform/ # Part 2: Observability and Performance Testing
    ├── alerts/
    ├── chaos/
    ├── dashboards/
    ├── load-tests/
    └── observability/
        ├── grafana-cloud-stack/ # Solution 1: Grafana Cloud
        └── kube-prometheus-stack/ # Solution 2: Local Stack
```

---

## Part 1: GitOps Deployment with Argo CD on Azure Kubernetes Service (AKS)

This part of the project focuses on deploying the Online Boutique microservices to AKS using a multi-repo GitOps architecture.

*   **Argo CD** is used for continuous delivery, pulling Kubernetes manifests from a separate repository.
*   **Terraform** is used for provisioning the Azure infrastructure (not included in this repository).
*   The deployment is structured using the **App of Apps** pattern in Argo CD.

For more details, see the [README in `azure-argocd`](azure-argocd/README.md).

---

## Part 2: E-commerce Observability Platform

This part of the project provides two comprehensive solutions for monitoring, logging, tracing, and performance testing the application.

### Solution 1: Cloud Observability with Grafana Cloud

This solution uses the **Grafana Cloud Kubernetes Monitoring stack (k8s-monitoring v3.5.6)** to provide a fully managed observability platform.

*   **Components**: Grafana Alloy, Prometheus, Loki, Tempo, Kube State Metrics, Node Exporter, cAdvisor, and Kepler.
*   **Features**: Centralized metrics, logs, and traces in Grafana Cloud, with minimal local setup.
*   **Best for**: Production or pre-production environments where a managed, scalable solution is preferred.

For more details, see the [README in `e-commerce-observability-platform/observability/grafana-cloud-stack`](e-commerce-observability-platform/observability/grafana-cloud-stack/README.md).

### Solution 2: Local Observability with Kube Prometheus Stack

This solution provides a self-hosted, local observability platform running on Minikube.

*   **Components**: Prometheus, Grafana, Alertmanager, Loki, and Tempo.
*   **Features**: A full-featured observability stack running locally for development and testing.
*   **Best for**: Local development, testing, and debugging in an isolated environment.

For more details, see the [README in `e-commerce-observability-platform/observability/kube-prometheus-stack`](e-commerce-observability-platform/observability/kube-prometheus-stack/README.md).

### Load Testing

Both observability solutions can be used in conjunction with the provided load testing tools:

*   **k6**: For scripted, performance-oriented load tests.
*   **Locust**: For user behavior simulation and complex load testing scenarios.

See the `e-commerce-observability-platform/load-tests` directory for more details.

---

## Getting Started

### Prerequisites

*   An Azure account with an AKS cluster (for cloud deployment).
*   Minikube (for local deployment).
*   `kubectl` installed and configured.
*   `helm` for installing the observability stack.
*   `k6` for running load tests.

### Deployment

1.  **Deploy the Application with Argo CD:**
    Follow the instructions in the [`azure-argocd/README.md`](azure-argocd/README.md) to set up Argo CD and deploy the Online Boutique application to AKS.

2.  **Set up the Observability Platform:**
    Choose one of the following observability solutions:
    *   **Grafana Cloud:** Follow the instructions in the [`e-commerce-observability-platform/observability/grafana-cloud-stack/README.md`](e-commerce-observability-platform/observability/grafana-cloud-stack/README.md).
    *   **Local Stack:** Follow the instructions in the [`e-commerce-observability-platform/observability/kube-prometheus-stack/README.md`](e-commerce-observability-platform/observability/kube-prometheus-stack/README.md).

### Running Load Tests

Once the application and an observability platform are deployed, you can run load tests using k6 or Locust. See the `e-commerce-observability-platform/load-tests` directory for more details.
