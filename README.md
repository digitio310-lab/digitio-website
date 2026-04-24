# Digitio — Website

Sito web istituzionale di Digitio, un'agenzia che offre servizi di sviluppo web, hosting e automazioni digitali per piccole imprese.

Costruito con **Vite**, **Tailwind CSS v4**, **GSAP** e **Supabase** per la gestione dei contatti.

---

## Stack

| Tecnologia | Utilizzo |
|---|---|
| [Vite](https://vitejs.dev/) | Bundler e dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Stili |
| [GSAP](https://gsap.com/) | Animazioni |
| [Supabase](https://supabase.com/) | Database per il form contatti |
| [nginx](https://nginx.org/) | Server web in produzione |
| [Docker](https://www.docker.com/) | Containerizzazione |

---

## Struttura del progetto

```
digitio/
├── public/                         # File statici copiati direttamente in dist
│   └── digitio_automazioni_article.html
├── src/
│   ├── assets/                     # Immagini e risorse
│   ├── main.js                     # Entry point JavaScript
│   ├── style.css                   # Stili globali
│   └── supabase.js                 # Configurazione client Supabase
├── index.html                      # HTML principale
├── vite.config.js                  # Configurazione Vite
├── nginx.conf                      # Configurazione nginx per produzione
├── Dockerfile                      # Build multi-stage per produzione
└── docker-compose.yml              # Orchestrazione container
```

---

## Sviluppo locale

### Prerequisiti

- [Node.js](https://nodejs.org/) v20 o superiore
- npm

### Setup

Clona il repository e installa le dipendenze:

```bash
git clone https://github.com/tuoaccount/digitio.git
cd digitio
npm install
```

### Variabili d'ambiente

Crea un file `.env` nella root del progetto con le credenziali Supabase:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

> Le chiavi le trovi su Supabase in **Project → Settings → API**.

### Avvio

```bash
npm run dev
```

Il sito sarà disponibile su [http://localhost:5173](http://localhost:5173).

### Build statica

```bash
npm run build
```

Genera la cartella `dist/` con i file ottimizzati pronti per la produzione.

Per preview locale della build:

```bash
npm run preview
```

---

## Docker

### Prerequisiti

- [Docker](https://docs.docker.com/get-docker/) installato e avviato

### Avvio con Docker

```bash
docker compose up -d --build
```

Il sito sarà disponibile su [http://localhost](http://localhost).

### Come funziona

Il `Dockerfile` usa un **multi-stage build**:

1. **Stage 1 — build**: usa Node 20 per installare le dipendenze e generare la cartella `dist/` con `npm run build`
2. **Stage 2 — serve**: usa nginx per servire i file statici della cartella `dist/`

L'image finale non contiene Node né il codice sorgente — solo i file statici ottimizzati serviti da nginx.

### Comandi utili

```bash
# Avvia i container in background
docker compose up -d --build

# Vedi i log
docker compose logs -f

# Ferma i container
docker compose down

# Rimuovi tutto (container, network, image)
docker compose down --rmi all
```

---

## Supabase — configurazione DB

Il form contatti invia i dati alla tabella `Contacts` su Supabase.

Per replicare la configurazione:

1. Crea un progetto su [Supabase](https://supabase.com/)
2. Crea una tabella `Contacts` con le colonne:

| Colonna | Tipo |
|---|---|
| id | int8 (primary key) |
| nome | text |
| email | text |
| messaggio | text |
| created_at | timestamptz |

3. Vai su **SQL Editor** ed esegui:

```sql
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON TABLE "Contacts" TO anon;
```

4. Aggiungi una RLS policy per permettere gli insert anonimi:
   - **Table Editor → Contacts → Add RLS Policy**
   - Command: `INSERT`
   - Target roles: `anon`
   - WITH CHECK: `true`

---

## Licenza

© 2025 Digitio. Tutti i diritti riservati.
