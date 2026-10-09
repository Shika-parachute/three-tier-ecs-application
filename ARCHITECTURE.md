# 🏗️ Architecture

## Application Architecture

The application follows a three-tier architecture consisting of a frontend, backend, and MongoDB database.

```text
User / Browser
      |
      | HTTP :80
      v
+-------------------+
| Application Load  |
|     Balancer      |
+---------+---------+
          |
          v
+-------------------+
| Frontend          |
| Nginx             |
| ECS Fargate :80   |
+---------+---------+
          |
          | /api/*
          | Reverse Proxy
          | Cloud Map
          v
+-------------------+
| Backend           |
| Node.js + Express |
| ECS Fargate :5000 |
+---------+---------+
          |
          | Cloud Map
          | mongodb.three-tier.local
          | :27017
          v
+-------------------+
| MongoDB           |
| ECS Fargate       |
| :27017            |
+-------------------+
          |
          v
+-------------------+
| Amazon EFS        |
| Persistent Storage|
+-------------------+
```

## AWS Service Discovery

The private AWS Cloud Map namespace is:

```text
three-tier.local
```

Registered services:

```text
backend.three-tier.local
mongodb.three-tier.local
```

Cloud Map allows ECS services to communicate using service names instead of fixed task IP addresses.

## AWS Components

- Amazon ECS Fargate
- Amazon ECR
- Application Load Balancer
- AWS Cloud Map
- Amazon EFS
- IAM
- Security Groups
- GitHub Actions
- GitHub OIDC

---