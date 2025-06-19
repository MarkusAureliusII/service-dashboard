# Service Dashboard

A modern React dashboard for managing and monitoring n8n, Supabase, and OpenWebUI services.

## 🚀 Features

- **Service Management**: Central hub for accessing n8n, Supabase, and OpenWebUI
- **Live Health Monitoring**: Real-time status checks for OpenWebUI
- **Responsive Design**: Clean 3-column grid layout with shadcn/ui components
- **TypeScript**: Full type safety throughout the application
- **Modern Stack**: React 18, Vite, TailwindCSS

## 📋 Services Included

### n8n Automation
- Workflow automation and data pipelines
- Direct link to n8n interface (default: localhost:5678)

### Supabase Database  
- Central data management and backend
- Direct link to Supabase dashboard (default: localhost:54323)

### Open Web UI
- Interface for LLM interactions
- Live health check with status badges
- Direct link to OpenWebUI (default: localhost:3000)

## 🛠️ Installation

```bash
# Clone repository
git clone https://github.com/MarkusAureliusII/service-dashboard.git
cd service-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## ⚙️ Configuration

Create a `.env` file to customize service URLs:

```env
VITE_N8N_URL=http://localhost:5678
VITE_SUPABASE_URL=http://localhost:54323
VITE_OPEN_WEBUI_URL=http://localhost:3000
```

## 🌐 Access

**Development:**
- Local: `http://localhost:3001`
- Network: `http://[your-ip]:3001`

## 📚 Documentation

See `n8n-supabase-connection-guide.md` for detailed instructions on connecting n8n with self-hosted Supabase instances.

## 🔧 Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **TailwindCSS** for styling
- **shadcn/ui** components
- **Lucide React** icons

## 📝 Development

The dashboard includes:
- Live health checks for services
- Responsive design for all screen sizes
- Clean, modern UI with status indicators
- Easy service URL configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.