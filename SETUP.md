# ⚙️ Setup Guide

## Prerequisites

Install the following tools before starting the project:

- Docker Desktop
- Git
- Node.js
- AWS CLI
- AWS account
- GitHub account

## Clone the Repository

```bash
git clone https://github.com/Shika-parachute/three-tier-ecs-application.git
cd three-tier-ecs-application
```

## Local Setup

Build the Docker containers:

```bash
docker compose build
```

Start the application:

```bash
docker compose up -d
```

Check the running containers:

```bash
docker compose ps
```

The expected services are:

```text
Frontend
Backend
MongoDB
```

## Access the Application

Open the frontend in a browser:

```text
http://localhost:8080
```

The backend health endpoint is:

```text
http://localhost:5000/health
```

## AWS Deployment

The application is deployed using:

- Amazon ECR
- Amazon ECS Fargate
- Application Load Balancer
- AWS Cloud Map
- Amazon EFS
- GitHub Actions
- GitHub OIDC

AWS region:

```text
us-east-1
```

ECS cluster:

```text
three-tier-cluster-new
```

## CI/CD

The GitHub Actions workflow is located at:

```text
.github/workflows/deploy.yml
```

A push to the `main` branch triggers the deployment workflow.

---