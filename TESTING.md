# 🧪 Testing

## Local Testing

The application was tested locally using Docker Compose.

### Start the Application

```bash
docker compose up -d
```

### Verify Containers

```bash
docker compose ps
```

The following services should be running:

```text
Frontend
Backend
MongoDB
```

## Frontend Testing

Open:

```text
http://localhost:8080
```

Verify that:

- The frontend loads successfully.
- The task input is visible.
- Tasks can be added.
- Existing tasks are displayed.

## Backend Testing

Check the backend health endpoint:

```text
http://localhost:5000/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "backend"
}
```

## Database Testing

MongoDB runs on:

```text
27017
```

The backend connects using:

```text
mongodb://mongodb.three-tier.local:27017
```

## Persistence Testing

1. Add a task.
2. Refresh the frontend.
3. Verify that the task is still displayed.

This confirms that the task data is stored in MongoDB.

## AWS Testing

The deployed application was verified through the Application Load Balancer.

The following were checked:

- Frontend accessibility through the ALB.
- Frontend ECS service.
- Backend ECS service.
- MongoDB ECS service.
- ALB target health.
- Nginx reverse proxy.
- AWS Cloud Map service discovery.
- GitHub Actions deployment.

---