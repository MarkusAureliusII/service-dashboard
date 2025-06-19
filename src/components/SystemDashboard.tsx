import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Database, Workflow, Bot, CheckCircle, XCircle } from 'lucide-react';

interface ServiceStatus {
  isOnline: boolean;
  isLoading: boolean;
}

const SystemDashboard: React.FC = () => {
  const [n8nStatus, setN8nStatus] = useState<ServiceStatus>({
    isOnline: false,
    isLoading: true
  });
  
  const [supabaseStatus, setSupabaseStatus] = useState<ServiceStatus>({
    isOnline: false,
    isLoading: true
  });
  
  const [openWebUIStatus, setOpenWebUIStatus] = useState<ServiceStatus>({
    isOnline: false,
    isLoading: true
  });

  // Configuration from environment variables
  const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL || 'http://localhost';
  const services = {
    n8n: {
      url: `${baseUrl}:${import.meta.env.VITE_N8N_PORT || '5678'}`,
      healthUrl: import.meta.env.VITE_N8N_HEALTH_URL || 'http://localhost:5678',
      name: 'n8n Automation'
    },
    supabase: {
      url: `${baseUrl}:${import.meta.env.VITE_SUPABASE_PORT || '8000'}`,
      healthUrl: import.meta.env.VITE_SUPABASE_HEALTH_URL || 'http://localhost:54323',
      name: 'Supabase Datenbank'
    },
    openWebUI: {
      url: `${baseUrl}:${import.meta.env.VITE_OPEN_WEBUI_PORT || '3000'}`,
      healthUrl: import.meta.env.VITE_OPEN_WEBUI_HEALTH_URL || 'http://localhost:3000',
      name: 'Open Web UI'
    }
  };

  // Health check functions
  const checkServiceHealth = async (
    healthUrl: string, 
    setStatus: React.Dispatch<React.SetStateAction<ServiceStatus>>,
    endpoint: string = ''
  ) => {
    try {
      setStatus(prev => ({ ...prev, isLoading: true }));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${healthUrl}${endpoint}`, {
        method: 'GET',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      setStatus({
        isOnline: response.status === 200,
        isLoading: false
      });
    } catch (error) {
      setStatus({
        isOnline: false,
        isLoading: false
      });
    }
  };

  // Health checks for all services
  useEffect(() => {
    // n8n health check
    checkServiceHealth(services.n8n.healthUrl, setN8nStatus, '/healthz');
    
    // Supabase health check 
    checkServiceHealth(services.supabase.healthUrl, setSupabaseStatus, '/health');
    
    // OpenWebUI health check
    checkServiceHealth(services.openWebUI.healthUrl, setOpenWebUIStatus, '/health');
  }, []);

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Dashboard</h1>
        <p className="text-gray-600">Zentrale Anlaufstelle für alle extern Kern-Services</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* n8n Automation Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-6 w-6 text-blue-600" />
              {services.n8n.name}
            </CardTitle>
            <CardDescription>
              Workflow-Automatisierung und Daten-Pipelines.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              {n8nStatus.isLoading ? (
                <Badge variant="secondary">
                  Prüfe...
                </Badge>
              ) : (
                <Badge 
                  variant={n8nStatus.isOnline ? "default" : "destructive"}
                  className={n8nStatus.isOnline ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {n8nStatus.isOnline ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Online
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" />
                      Offline
                    </>
                  )}
                </Badge>
              )}
            </div>
            
            <Button 
              onClick={() => openInNewTab(services.n8n.url)}
              className="w-full"
              variant="default"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              n8n öffnen
            </Button>
          </CardContent>
        </Card>

        {/* Supabase Database Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6 text-green-600" />
              {services.supabase.name}
            </CardTitle>
            <CardDescription>
              Zentrale Datenverwaltung und Backend.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              {supabaseStatus.isLoading ? (
                <Badge variant="secondary">
                  Prüfe...
                </Badge>
              ) : (
                <Badge 
                  variant={supabaseStatus.isOnline ? "default" : "destructive"}
                  className={supabaseStatus.isOnline ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {supabaseStatus.isOnline ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Online
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" />
                      Offline
                    </>
                  )}
                </Badge>
              )}
            </div>
            
            <Button 
              onClick={() => openInNewTab(services.supabase.url)}
              className="w-full"
              variant="default"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Supabase öffnen
            </Button>
          </CardContent>
        </Card>

        {/* Open Web UI Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-purple-600" />
              {services.openWebUI.name}
            </CardTitle>
            <CardDescription>
              Benutzeroberfläche für Interaktionen mit Sprachmodellen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              {openWebUIStatus.isLoading ? (
                <Badge variant="secondary">
                  Prüfe...
                </Badge>
              ) : (
                <Badge 
                  variant={openWebUIStatus.isOnline ? "default" : "destructive"}
                  className={openWebUIStatus.isOnline ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {openWebUIStatus.isOnline ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Online
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" />
                      Offline
                    </>
                  )}
                </Badge>
              )}
            </div>
            
            <Button 
              onClick={() => openInNewTab(services.openWebUI.url)}
              className="w-full"
              variant="default"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Web UI öffnen
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Hinweise</h2>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Alle Services sollten lokal oder über Docker ausgeführt werden</li>
          <li>• Bei Verbindungsproblemen prüfen Sie die jeweiligen Service-URLs</li>
          <li>• Der Status-Check für Open Web UI erfolgt automatisch beim Laden</li>
        </ul>
      </div>
    </div>
  );
};

export default SystemDashboard;