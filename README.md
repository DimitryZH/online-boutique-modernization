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

This part of the project provides comprehensive solutions for monitoring, logging, tracing, and performance testing the application.

For more details, see the [README in `e-commerce-observability-platform`](e-commerce-observability-platform/README.md).

### Additional Components
The following components are currently under active development and will be integrated into the project shortly.            

*   **Alerts**: This directory contains configurations for various alerts related to the microservices and infrastructure.
*   **Chaos**: This directory is intended for chaos engineering experiments to test the resilience of the application.
*   **Dashboards**: This directory stores custom Grafana dashboards for visualizing metrics and logs.


