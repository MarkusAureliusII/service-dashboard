# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Environment

This is a development environment optimized for working with:
- **Supabase** (PostgreSQL database with real-time features)
- **n8n** (workflow automation platform)  
- **OpenWebUI** (web interface for LLMs via Ollama)

## Available Tools & Versions

- Docker v20.10.24 & docker-compose v1.29.2
- Node.js v20.19.2 & npm v11.4.2
- Python 3.11 with pip3 and pipx
- Ollama v0.9.2 (local LLM runtime)
- Supabase CLI v2.26.9
- Git v2.39.5

## Common Development Commands

### Supabase Database Management
```bash
# Initialize new Supabase project
supabase init

# Start local development environment
supabase start

# Create database migration
supabase migration new <migration_name>

# Apply migrations
supabase db push

# Generate TypeScript types from database schema
supabase gen types typescript --local > types/supabase.ts

# Stop local environment
supabase stop
```

### n8n Workflow Automation
```bash
# Install n8n globally (if not already installed)
npm install -g n8n

# Start n8n with local tunnel for webhooks
n8n start --tunnel

# Start n8n on specific port
n8n start --port 5679
```

### OpenWebUI (LLM Interface)
```bash
# Run OpenWebUI with Ollama integration
docker run -d -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main

# Access at http://localhost:3000
```

### Ollama LLM Management
```bash
# Pull and run a model (e.g., llama3.2)
ollama pull llama3.2

# List installed models
ollama list

# Run model interactively
ollama run llama3.2

# Start Ollama service (if not running)
sudo systemctl start ollama

# Check Ollama status
sudo systemctl status ollama
```

### Docker Development
```bash
# Start all services with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and restart services
docker-compose up --build -d
```

## Architecture Overview

### Data Flow
1. **Supabase** serves as the primary database with real-time subscriptions
2. **n8n** handles workflow automation, data processing, and API integrations
3. **OpenWebUI** provides the user interface for interacting with local LLMs via Ollama
4. **Ollama** runs local language models for AI capabilities

### Integration Patterns
- Use Supabase database functions for complex queries
- n8n workflows can trigger on Supabase database changes via webhooks
- OpenWebUI can connect to external APIs through n8n workflows
- All services communicate via REST APIs and webhooks

### Development Workflow
1. Set up database schema in Supabase
2. Create automation workflows in n8n
3. Configure LLM interactions in OpenWebUI
4. Use Docker Compose for local development environment

## Project Structure Recommendations
```
project/
├── supabase/           # Database migrations and functions
│   ├── migrations/
│   └── functions/
├── n8n/               # Workflow definitions
│   └── workflows/
├── docker-compose.yml # Service orchestration
├── .env              # Environment variables
└── types/            # Generated TypeScript types
    └── supabase.ts
```

## Environment Variables
Essential environment variables to configure:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `OLLAMA_BASE_URL` - Usually http://localhost:11434
- `N8N_WEBHOOK_URL` - For webhook integrations
```

## Security Notes

- Always check VPS host directly
  - überprüfe nie die local hosts sondern immer direkt den VPS Host 217.154.225.184