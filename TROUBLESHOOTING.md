# 🔧 Troubleshooting

## Docker Containers Are Not Running

Check the container status:

```bash
docker compose ps
```

View container logs:

```bash
docker compose logs
```

Restart the application:

```bash
docker compose down
docker compose up -d --build
```

## Frontend Is Not Accessible

Verify that the frontend container is running:

```bash
docker compose ps
```

Then open:

```text
http://localhost:8080
```

## Backend Is Not Responding

Check the backend logs:

```bash
docker compose logs backend
```

Verify the health endpoint:

```text
http://localhost:5000/health
```

## MongoDB Connection Problem

Check MongoDB logs:

```bash
docker compose logs mongodb
```

Verify that MongoDB is running on:

```text
27017
```

The backend uses:

```text
mongodb://mongodb.three-tier.local:27017
```

## ECS Service Is Not Stable

Check the ECS service:

```bash
aws ecs describe-services \
  --cluster three-tier-cluster-new \
  --services three-tier-backend-service
```

Check the ECS service events in the AWS Console for the reason a task may have stopped.

## ALB Target Is Unhealthy

Verify:

- ECS task is running.
- Target group is configured for the correct container port.
- Security groups allow the required traffic.
- Frontend container is listening on port `80`.

## GitHub Actions Deployment Failed

Check the GitHub Actions workflow logs.

Verify:

- AWS OIDC configuration.
- IAM role permissions.
- ECR repositories.
- ECS cluster name.
- ECS service names.
- AWS region.

The deployment region is:

```text
us-east-1
```

The GitHub Actions IAM role is:

```text
GitHubActionsThreeTierDeploy
```

---