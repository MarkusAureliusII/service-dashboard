# n8n-Supabase Integration Configuration

## Overview
This document describes the configuration for connecting n8n workflows to the self-hosted Supabase installation in the Docker environment.

## Docker Network Configuration
Both n8n and Supabase run in the same Docker network `demo`, enabling internal service-to-service communication.

### Service Network Names
- **n8n**: `n8n` (container name)
- **Supabase Kong Gateway**: `kong` (container name, port 8000)
- **Supabase REST API**: `supabase-rest` (container name, port 3000)
- **Supabase Auth**: `supabase-auth` (container name, port 9999)
- **Supabase Realtime**: `supabase-realtime` (container name, port 4000)
- **Supabase Storage**: `supabase-storage` (container name, port 5000)

## n8n Configuration in Docker Compose

```yaml
environment:
  # Supabase Integration
  - SUPABASE_URL=http://kong:8000
  - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
  - SUPABASE_SERVICE_KEY=${SUPABASE_SERVICE_KEY}
```

## Connection URLs for n8n Workflows

### Primary Supabase Connection
- **Base URL**: `http://kong:8000`
- **Purpose**: Main Supabase API access through Kong gateway
- **Usage**: For general Supabase operations in n8n workflows

### Direct Service Connections
- **REST API**: `http://supabase-rest:3000`
- **Auth Service**: `http://supabase-auth:9999`
- **Realtime**: `http://supabase-realtime:4000`
- **Storage**: `http://supabase-storage:5000`

## Environment Variables
All required environment variables are defined in `/opt/webapp/.env`:

```bash
# Available from Docker environment
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here
JWT_SECRET=your_jwt_secret_here
```

## n8n Workflow Configuration

### HTTP Request Node Configuration
When creating HTTP request nodes in n8n to connect to Supabase:

1. **URL**: Use `http://kong:8000` as base URL
2. **Headers**:
   - `Authorization: Bearer ${SUPABASE_SERVICE_KEY}` (for service operations)
   - `apikey: ${SUPABASE_ANON_KEY}` (for public operations)
   - `Content-Type: application/json`

### Example API Endpoints
- **Database queries**: `http://kong:8000/rest/v1/your_table`
- **Authentication**: `http://kong:8000/auth/v1/`
- **Storage**: `http://kong:8000/storage/v1/`
- **Realtime**: `http://kong:8000/realtime/v1/`

## Health Checks
- **Supabase Health**: `http://kong:8000/health`
- **n8n Health**: `http://n8n:5678/healthz`

## External Access
- **n8n Interface**: `http://217.154.225.184:5678`
- **Supabase Studio**: `http://217.154.225.184:8000`

This configuration ensures seamless integration between n8n workflows and the Supabase backend services while maintaining security and performance in the Docker environment.