# n8n/Supabase Verbindungsanleitung (Self-Hosted)

## Übersicht

Für eine erfolgreiche Verbindung zwischen n8n und einer self-hosted Supabase-Instanz sind **drei entscheidende Informationen** erforderlich. Diese Anleitung erklärt, wo Sie diese finden und warum jede für die korrekte Funktionalität notwendig ist.

## 1. Projekt-URL (Project URL)

### Was ist das?
Die Basis-URL Ihrer Supabase-Instanz, über die alle API-Anfragen geroutet werden.

### Wo finden Sie sie?
1. Öffnen Sie Ihr Supabase-Dashboard
2. Navigieren Sie zu **Settings** → **API**
3. Unter "Project URL" finden Sie eine URL im Format: `https://your-project-ref.supabase.co`

### Beispiel:
```
https://abcdefghijklmnop.supabase.co
```

## 2. Anon Key (Public Key)

### Was ist das?
Der öffentliche Schlüssel, der für Frontend-Anwendungen und anonyme Zugriffe gedacht ist. Er respektiert Row Level Security (RLS) Policies.

### Wo finden Sie ihn?
1. Im Supabase-Dashboard unter **Settings** → **API**
2. Suchen Sie nach "anon" oder "public" im Bereich "Project API keys"
3. Der Schlüssel beginnt typischerweise mit `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Hinweis:
Dieser Schlüssel ist für öffentliche Verwendung bestimmt und kann sicher in Frontend-Code eingebettet werden.

## 3. Service Role Key (Secret Key) ⚠️ KRITISCH

### Was ist das?
Der **Service Role Key** ist der administrative Schlüssel mit vollen Berechtigungen für Server-zu-Server-Kommunikation.

### Warum ist er für n8n essentiell?
- **Umgeht Row Level Security (RLS)**: n8n läuft auf Server-Ebene und benötigt oft administrative Rechte
- **Volle Datenbankberechtigungen**: Ermöglicht Lesen, Schreiben, Löschen ohne Einschränkungen
- **Massen-Operationen**: Notwendig für Bulk-Imports, Daten-Migrationen und komplexe Workflows
- **Bypass von Authentifizierungslogik**: Backend-Prozesse müssen nicht durch User-Authentifizierung

### Wo finden Sie ihn?
1. Im Supabase-Dashboard unter **Settings** → **API**
2. Suchen Sie nach "service_role" im Bereich "Project API keys"
3. ⚠️ **Dieser Schlüssel ist standardmäßig ausgeblendet** - klicken Sie auf "Reveal" oder das Augensymbol
4. Der Schlüssel hat das gleiche Format wie der Anon Key, aber andere Berechtigungen

### ⚠️ Sicherheitshinweise:
- **Niemals in Frontend-Code verwenden**
- **Nur in sicheren Server-Umgebungen speichern**
- **Als Umgebungsvariable konfigurieren**
- **Regelmäßig rotieren bei Sicherheitsbedenken**

## Konfiguration in n8n

### Credentials Setup:
1. Erstellen Sie neue Supabase-Credentials in n8n
2. Tragen Sie die drei Werte ein:
   - **Host**: Projekt-URL (ohne `https://`)
   - **Service Role Secret**: Service Role Key (NICHT Anon Key!)
   - **Database**: Standard ist `postgres`

### Typische Fehlerquellen:
- ❌ **Anon Key statt Service Role Key verwendet**
- ❌ **URL mit `https://` prefix eingegeben**
- ❌ **Falsche Database-Name (sollte `postgres` sein)**
- ❌ **RLS Policies blockieren Service Role (sollten nicht passieren)**

## Verbindungstest

Nach der Konfiguration testen Sie die Verbindung mit:
1. Einfacher SELECT-Query auf eine existierende Tabelle
2. INSERT-Operation (um Schreibberechtigungen zu prüfen)
3. Query auf system-Tabellen (um administrative Rechte zu bestätigen)

## Häufige Probleme und Lösungen

### Problem: "Authentication failed"
**Lösung**: Überprüfen Sie, ob Sie den Service Role Key (nicht Anon Key) verwenden

### Problem: "Row Level Security Policy"
**Lösung**: Service Role Key sollte RLS umgehen - prüfen Sie den verwendeten Key

### Problem: "Connection timeout"
**Lösung**: Überprüfen Sie die Projekt-URL und Netzwerkkonnektivität

### Problem: "Permission denied"
**Lösung**: Stellen Sie sicher, dass der Service Role Key korrekt konfiguriert ist

## Fazit

Der **Service Role Key** ist der entscheidende Faktor für eine funktionierende n8n/Supabase-Integration. Ohne ihn können Backend-Operationen nicht korrekt ausgeführt werden, da die RLS-Policies und Authentifizierungslogik eingreifen würden, die für Frontend-Anwendungen gedacht sind.