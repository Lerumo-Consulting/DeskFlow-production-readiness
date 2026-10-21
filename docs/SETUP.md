# DeskFlow Setup Guide

## Option 1: Docker Compose (simplest)

Requires Docker Desktop.

```bash
docker compose up --build
```

- App: http://localhost:3000
- API health: http://localhost:5000/api/health

Stop with `docker compose down` (add `-v` to wipe the database).

## Option 2: Kubernetes (minikube)

Requires Docker Desktop, `kubectl` and `minikube`. The images are public on GHCR.

```bash
minikube start --driver=docker
kubectl apply -f k8s/
kubectl get pods -w
```

When every pod is `Running` and `READY 1/1`, expose the services in two terminals:

```bash
kubectl port-forward svc/backend 5000:5000
kubectl port-forward svc/frontend 3000:80
```

Open http://localhost:3000. The frontend image calls the API at `http://localhost:5000/api`, so both port-forwards are needed.

Tear down with `kubectl delete -f k8s/`.

## Option 3: Local development

```bash
cd backend && npm ci && npm test
cd frontend && npm ci && npm run lint && npm run build
```

Backend tests mock Prisma, so no database is needed.

## Configuration

| Variable | Used by | Purpose |
|---|---|---|
| DATABASE_URL | backend | PostgreSQL connection string |
| JWT_SECRET | backend | Signs auth tokens (change outside demos) |
| VITE_API_BASE_URL | frontend build | API base URL baked in at build time |

The Kubernetes Secret in `k8s/postgres.yaml` holds demo values only.

## CI/CD

- Every PR runs backend tests, frontend lint and build, and Docker image builds.
- Merging to `main` triggers CD, which publishes both images to GHCR tagged `latest` and the commit SHA.
