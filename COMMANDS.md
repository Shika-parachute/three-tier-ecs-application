# 🖥️ Commands

## Local Docker Commands

### Build the application

```bash
docker compose build
```

### Start the application

```bash
docker compose up -d
```

### Check running containers

```bash
docker compose ps
```

### View logs

```bash
docker compose logs
```

### Stop the application

```bash
docker compose down
```

### Rebuild containers

```bash
docker compose up -d --build
```

## Local Application

Frontend:

```text
http://localhost:8080
```

Backend:

```text
http://localhost:5000
```

Backend health check:

```text
http://localhost:5000/health
```

## Git Commands

Check repository status:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit changes:

```bash
git commit -m "Update project"
```

Push to GitHub:

```bash
git push origin main
```

## AWS ECS Commands

List ECS services:

```bash
aws ecs list-services \
  --cluster three-tier-cluster-new
```

Check ECS service:

```bash
aws ecs describe-services \
  --cluster three-tier-cluster-new \
  --services three-tier-backend-service
```

Force a new deployment:

```bash
aws ecs update-service \
  --cluster three-tier-cluster-new \
  --service three-tier-backend-service \
  --force-new-deployment
```

---