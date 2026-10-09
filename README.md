# 🚀 Three-Tier To-Do Application on AWS

A containerized three-tier To-Do application deployed on **AWS ECS Fargate** using Docker, Amazon ECR, AWS Cloud Map, Nginx, Node.js, MongoDB, and GitHub Actions CI/CD with GitHub OIDC authentication.

---

## 📌 Project Overview

This project implements a **three-tier web application** consisting of:

- **Frontend:** HTML, CSS, JavaScript served using Nginx
- **Backend:** Node.js and Express REST API
- **Database:** MongoDB

The application is containerized using **Docker** and deployed on **Amazon ECS Fargate**.

AWS **Cloud Map** is used for service discovery between the application components, while **Nginx** acts as a reverse proxy between the frontend and backend.

A **GitHub Actions CI/CD pipeline** automatically builds Docker images, pushes them to Amazon ECR, and triggers ECS deployments whenever changes are pushed to the `main` branch.

---

## 🎯 Objectives

- Build a complete three-tier web application.
- Containerize all application components using Docker.
- Deploy the application using Amazon ECS Fargate.
- Store Docker images in Amazon ECR.
- Implement service discovery using AWS Cloud Map.
- Configure Nginx as a reverse proxy.
- Connect the backend with MongoDB.
- Implement CI/CD using GitHub Actions.
- Configure secure GitHub-to-AWS authentication using OIDC.
- Test the deployed application end-to-end.

---

## ✨ Features

- Add new To-Do tasks.
- View existing tasks.
- Store tasks persistently in MongoDB.
- Refresh the page without losing stored tasks.
- Frontend-to-backend communication through Nginx.
- Automated Docker image build and deployment through GitHub Actions.

- ## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Web Server | Nginx |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Containerization | Docker |
| Container Orchestration | Amazon ECS Fargate |
| Container Registry | Amazon ECR |
| Service Discovery | AWS Cloud Map |
| CI/CD | GitHub Actions |
| Authentication | GitHub OIDC + AWS IAM |
| Version Control | Git & GitHub |
| Cloud Platform | AWS |

---

## 🏗️ Architecture

```text
User / Browser
      |
      | HTTP :80
      v
+----------------------+
|   Application Load   |
|      Balancer        |
+----------+-----------+
           |
           v
+----------------------+
|  Frontend Container  |
|       Nginx          |
|       Port 80        |
+----------+-----------+
           |
           | /api/*
           | Reverse Proxy
           v
+----------------------+
|  Backend Container   |
| Node.js + Express    |
|      Port 5000       |
+----------+-----------+
           |
           | Cloud Map
           | mongodb.three-tier.local
           | :27017
           v
+----------------------+
|  MongoDB Container   |
|      Port 27017      |
+----------------------+

---


## ☁️ AWS Architecture

```text
Internet
    |
    v
User Browser
    |
    | HTTP :80
    v
+--------------------------+
|   Application Load       |
|       Balancer           |
+------------+-------------+
             |
             v
+--------------------------+
|   ECS Fargate Frontend  |
|       Nginx :80         |
+------------+-------------+
             |
             | Cloud Map
             | backend.three-tier.local
             | :5000
             v
+--------------------------+
|   ECS Fargate Backend   |
|    Node.js / Express    |
|        :5000            |
+------------+-------------+
             |
             | Cloud Map
             | mongodb.three-tier.local
             | :27017
             v
+--------------------------+
|   ECS Fargate MongoDB   |
|        :27017           |
+--------------------------+

Private Namespace:
three-tier.local
---
## 🐳 Docker

The project contains three Dockerized components.

### Frontend

- Base image: `nginx:alpine`
- Port: `80`
- Serves the frontend application.
- Acts as a reverse proxy for backend API requests.

### Backend

- Base image: `node:20-alpine`
- Port: `5000`
- Runs the Node.js/Express REST API.
- Connects to MongoDB using `MONGODB_URI`.

### MongoDB

- Image: `mongo:latest`
- Port: `27017`
- Stores To-Do tasks.

---

## 📁 Project Structure

```text
three-tier-ecs-application/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   └── nginx.conf
│
├── mongodb/
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
└── README.md






## 🔌 Backend API

The backend provides REST API endpoints for managing tasks.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Retrieve all tasks |
| POST | `/api/tasks` | Create a new task |

Backend port:

```text
5000
```

MongoDB database:

```text
three_tier_db
```

---

## 🗺️ AWS Cloud Map

The project uses a private AWS Cloud Map namespace:

```text
three-tier.local
```

Services registered in the namespace include:

```text
backend.three-tier.local
mongodb.three-tier.local
```

This allows ECS services to communicate using service names even when task IP addresses change.

---


## 🚀 AWS Deployment

The application is deployed on AWS using Amazon ECS Fargate.

### AWS Region

```text
us-east-1
```

### ECS Cluster

```text
three-tier-cluster-new
```

### ECS Services

The application runs as three separate ECS Fargate services:

```text
three-tier-frontend-service-3
three-tier-backend-service
three-tier-mongodb-service-2
```

### Amazon ECR Repositories

Docker images are stored in Amazon ECR:

```text
three-tier-frontend
three-tier-backend
three-tier-mongodb
```

### MongoDB Persistence

MongoDB uses Amazon EFS for persistent storage so that database data can survive MongoDB container or task restarts.

### Application Load Balancer

The frontend is exposed through an Application Load Balancer on HTTP port `80`.

The ALB forwards incoming requests to the frontend Nginx container.

---


## 🔐 Security

The application uses AWS security mechanisms to secure communication between the different application tiers.

### Security Components

- **AWS IAM** for access control and permissions.
- **Security Groups** to control network traffic.
- **AWS Cloud Map** for private service discovery.
- **ECS task networking** for communication between containers.
- **GitHub OIDC** for secure GitHub Actions authentication with AWS.

### GitHub OIDC

GitHub Actions authenticates with AWS using OpenID Connect (OIDC) instead of storing long-term AWS access keys in GitHub.

The IAM role used by GitHub Actions is:

```text
GitHubActionsThreeTierDeploy
```

### Application Ports

| Component | Port |
|---|---:|
| Frontend / Nginx | 80 |
| Backend / Node.js | 5000 |
| MongoDB | 27017 |

---
## ⚙️ CI/CD Pipeline

GitHub Actions is used to automate the application deployment process.

The workflow is triggered whenever changes are pushed to the `main` branch.

---

### Deployment Flow

```text
Git Push
    ↓
GitHub Actions
    ↓
Authenticate with AWS using GitHub OIDC
    ↓
Login to Amazon ECR
    ↓
Build Backend Docker Image
    ↓
Push Backend Image to ECR
    ↓
Build Frontend Docker Image
    ↓
Push Frontend Image to ECR
    ↓
Deploy Backend to ECS
    ↓
Deploy Frontend to ECS
    ↓
Wait for ECS Services to become stable
```

### Workflow File

The GitHub Actions workflow is located at:

```text
.github/workflows/deploy.yml
```

The pipeline automatically builds and pushes the frontend and backend Docker images to Amazon ECR and triggers new ECS deployments.

---

## 🧪 Testing

### Local Testing

The application was tested locally using Docker Compose.

The following components were verified:

- Frontend availability.
- Backend API availability.
- MongoDB connectivity.
- Task creation.
- Task retrieval.
- Data persistence.
- Persistence after refreshing the frontend.

---

### AWS Testing

The deployed application was verified through the Application Load Balancer.

The following were checked:

- Frontend accessible through the ALB.
- Frontend ECS task running successfully.
- Backend ECS service running successfully.
- MongoDB ECS service running successfully.
- Frontend target health in the ALB target group.
- Nginx reverse proxy configuration.
- AWS Cloud Map service discovery.
- GitHub Actions deployment workflow.

---
## 🛠️ Problems Solved

During the implementation of the project, several practical deployment and infrastructure challenges were addressed.

### Docker Containerization

The frontend, backend, and MongoDB components were separated into individual containers so that each application tier could run independently.

### Service Discovery

AWS Cloud Map was configured to allow the frontend and backend services to communicate using service names instead of fixed task IP addresses.

---

### Reverse Proxy

Nginx was configured to serve the frontend and forward `/api/` requests to the backend service.

### Persistent Database Storage

Amazon EFS was configured for MongoDB so that database data can persist beyond individual ECS task restarts.

---
### CI/CD Authentication

GitHub Actions was configured with AWS IAM and GitHub OIDC so the deployment pipeline can authenticate with AWS without storing long-term AWS access keys.

---

### ECS Deployment

The application was deployed as separate ECS Fargate services for the frontend, backend, and MongoDB tiers.

---

## 📚 Learning Outcomes

This project provided practical experience with:

- Designing a three-tier application architecture.
- Containerizing applications using Docker.
- Building and deploying containers on Amazon ECS Fargate.
- Creating and managing Docker images using Amazon ECR.
- Configuring AWS Cloud Map for service discovery.
- Using Nginx as a reverse proxy.
- Connecting a Node.js backend with MongoDB.
- Configuring Amazon EFS for persistent database storage.
- Implementing CI/CD using GitHub Actions.
- Configuring GitHub OIDC with AWS IAM for secure authentication.
- Testing an application locally and on AWS.
- Understanding communication between different application tiers.

---


## 📊 Final Architecture

The final application architecture consists of three independent application tiers running as ECS Fargate services.

```text
                         +-------------------+
                         |       User        |
                         |     Browser       |
                         +---------+---------+
                                   |
                                   | HTTP :80
                                   v
                    +--------------------------+
                    |  Application Load        |
                    |       Balancer :80       |
                    +------------+-------------+
                                 |
                                 v
                    +--------------------------+
                    |    ECS Fargate Frontend  |
                    |         Nginx :80        |
                    +------------+-------------+
                                 |
                                 | /api/*
                                 | Cloud Map
                                 v
                    +--------------------------+
                    |    ECS Fargate Backend   |
                    |  Node.js + Express :5000 |
                    +------------+-------------+
                                 |
                                 | Cloud Map
                                 v
                    +--------------------------+
                    |    ECS Fargate MongoDB   |
                    |         MongoDB :27017    |
                    +--------------------------+
                                 |
                                 v
                    +--------------------------+
                    |      Amazon EFS          |
                    |   Persistent DB Storage  |
                    +--------------------------+
```

### Service Discovery

```text
Private Cloud Map Namespace
        |
        +-- backend.three-tier.local:5000
        |
        +-- mongodb.three-tier.local:27017
```

This architecture keeps the frontend, backend, and database as separate ECS Fargate services while using Nginx and AWS Cloud Map for communication between the application tiers.

---
## 📌 Final Status

The three-tier To-Do application has been successfully:

- Developed using HTML, JavaScript, Node.js, Express, and MongoDB.
- Containerized using Docker.
- Tested locally using Docker Compose.
- Pushed to GitHub.
- Docker images built and stored in Amazon ECR.
- Deployed using Amazon ECS Fargate.

---
- Configured with AWS Cloud Map service discovery.
- Configured with Nginx as a reverse proxy.
- Configured with Amazon EFS for MongoDB persistent storage.
- Exposed through an Application Load Balancer.
- Integrated with GitHub Actions for automated deployment.
- Secured with GitHub OIDC and AWS IAM.

The final deployment demonstrates a complete three-tier application running on AWS with automated CI/CD.

---
## 🔗 Repository

The complete project source code and deployment configuration are available on GitHub:

```text
https://github.com/Shika-parachute/three-tier-ecs-application
```

---

## 🎉 Conclusion

This project demonstrates the complete deployment of a containerized three-tier application on AWS ECS Fargate.

It combines Docker, Amazon ECR, ECS Fargate, Application Load Balancer, AWS Cloud Map, Nginx, MongoDB, Amazon EFS, GitHub Actions, and GitHub OIDC into a working cloud deployment.

---
