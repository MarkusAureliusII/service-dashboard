#!/bin/bash
# Service Dashboard Startup Script

# Verzeichnis wechseln
cd /root

# Stoppe alle laufenden Vite Dev Server
pkill -f vite

# Baue aktuelle Version (falls Änderungen)
npm run build

# Stoppe eventuell laufenden serve-Prozess
pkill -f "serve dist"

# Warte kurz
sleep 2

# Starte Produktions-Server
echo "Starte Service Dashboard auf Port 3001..."
serve dist -l 3001 -s &

# Warte auf Start
sleep 3

# Teste Verfügbarkeit
if curl -f http://localhost:3001/ > /dev/null 2>&1; then
    echo "✅ Dashboard erfolgreich gestartet!"
    echo "🌐 Verfügbar unter: http://217.154.225.184:3001/"
else
    echo "❌ Dashboard-Start fehlgeschlagen!"
    exit 1
fi