# 🧹 Cleanup

This document describes the main AWS resources created for the three-tier application.

## ECS Resources

The application uses the following ECS cluster and services:

```text
Cluster:
three-tier-cluster-new

Services:
three-tier-frontend-service-3
three-tier-backend-service
three-tier-mongodb-service-2
```

## Amazon ECR

The Docker images are stored in:

```text
three-tier-frontend
three-tier-backend
three-tier-mongodb
```

## Application Load Balancer

The frontend is exposed through an Application Load Balancer using HTTP port `80`.

## AWS Cloud Map

The private namespace used for service discovery is:

```text
three-tier.local
```

## Amazon EFS

MongoDB uses Amazon EFS for persistent database storage.

## Cleanup

When the project is no longer required, the AWS resources should be removed carefully to avoid unnecessary charges.

Recommended cleanup order:

1. Delete ECS services.
2. Delete ECS cluster.
3. Remove the Application Load Balancer and target groups.
4. Remove Cloud Map services and namespace.
5. Remove EFS resources after confirming database data is no longer required.
6. Delete unused ECR repositories and images.
7. Remove unused security groups and networking resources.
8. Remove the GitHub Actions IAM role if CI/CD is no longer required.

> ⚠️ Always verify that a resource is no longer required before deleting it.

---