# Atlas Phase - React Website

Vite + React + Tailwind site scaffolded for Atlas Phase, including your AP logo badge.

## Local dev
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Docker

Build a Docker image for nginx deployment:

```bash
docker build -t rmoen/atlasphase .
```

Run the container (port 80):

```bash
docker run -p 80:80 rmoen/atlasphase
```

## Automated Deploy Script

Use the provided `deploy.sh` to commit, push, and deploy to the mint server in one step:

```bash
# from the atlasphase project folder
deploy.sh "Your commit message"
```
