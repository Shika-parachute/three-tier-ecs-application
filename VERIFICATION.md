# ✅ Verification

This document records the verification steps performed for the three-tier application.

## Local Verification

The application was started using Docker Compose:

```bash
docker compose up -d
```

Container status was checked using:

```bash
docker compose ps
```

The following services were verified:

```text
Frontend
Backend
MongoDB
```

## Frontend Verification

The frontend was accessed using:

```text
http://localhost:8080
```

Verified:

- Frontend loads successfully.
- Task input is available.
- New tasks can be created.
- Existing tasks are displayed.

## Backend Verification

The backend health endpoint was verified:

```text
http://localhost:5000/health
```

The backend successfully responded with its health status.

## Database Verification

MongoDB was verified as running on:

```text
27017
```

The backend successfully connected to MongoDB.

Task data was stored and remained available after refreshing the frontend.

## AWS Verification

The deployed application was accessed through the Application Load Balancer.

Verified:

- Frontend ECS service is running.
- Backend ECS service is running.
- MongoDB ECS service is running.
- Frontend target is healthy.
- Nginx reverse proxy is configured.
- AWS Cloud Map service discovery is configured.
- MongoDB uses Amazon EFS for persistent storage.

## CI/CD Verification

GitHub Actions deployment was verified successfully.

The workflow:

```text
.github/workflows/deploy.yml
```

successfully:

1. Authenticated with AWS using GitHub OIDC.
2. Logged in to Amazon ECR.
3. Built the backend Docker image.
4. Pushed the backend image to ECR.
5. Built the frontend Docker image.
6. Pushed the frontend image to ECR.
7. Triggered ECS backend deployment.
8. Triggered ECS frontend deployment.
9. Waited for the ECS services to become stable.

## Final Result

The complete three-tier application was successfully deployed and verified on AWS ECS Fargate.

---