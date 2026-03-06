# Sviluppo in locale

Questa guida spiega come avviare il sito in locale per vedere grafica,
navigazione e contenuti esattamente come appariranno online, senza dover fare push ogni volta.

---

## Prerequisiti

### Node.js 20+

Verifica la versione installata:
```bash
node --version
```

Se non è installato o è una versione precedente alla 20, scaricalo da [nodejs.org](https://nodejs.org)
(scegli la versione **LTS**).

### npm (incluso con Node.js)

```bash
npm --version
```

---

## Avvio rapido

```bash
# 1. Entra nella cartella del progetto
cd D:/Sviluppi/stangherlin-enrico/stangherlin-enrico.github.io

# 2. Installa le dipendenze (solo la prima volta, o dopo npm install)
npm install

# 3. Avvia il server di sviluppo
npm run dev
```

Apri il browser su **[http://localhost:5173](http://localhost:5173)**

---

## Cosa puoi fare in locale

| Funzionalità | Funziona in locale? |
|---|---|
| Navigazione tra le pagine | Si |
| Hot reload (aggiornamento automatico) | Si |
| Blog con post MDX | Si |
| Ricerca full-text | Si |
| Grafica / Tailwind CSS | Si |
| Favicon e asset statici | Si |
| SEO meta tags | Si (non indicizzati) |
| Commenti Giscus | Si (se configurati) |
| Routing diretto (es. `/blog/hello-world`) | Si |

---

## Comandi disponibili

```bash
# Server di sviluppo con hot reload
npm run dev

# Build di produzione (genera la cartella dist/)
npm run build

# Anteprima della build di produzione in locale
npm run preview
```

### Differenza tra `dev` e `preview`

- **`npm run dev`** — server Vite in modalità sviluppo. Veloce, con hot reload.
  Usalo per lavorare sul codice.
- **`npm run preview`** — serve la build finale (`dist/`). Simula esattamente
  quello che vedrà l'utente su GitHub Pages, inclusa la minificazione degli asset.

---

## Struttura delle cartelle principali

```
src/
├── content/blog/      ← aggiungi file .mdx qui per nuovi post
├── data/
│   ├── profile.ts     ← modifica le tue info personali
│   └── projects.ts    ← aggiungi/modifica i tuoi progetti
├── pages/             ← una pagina per ogni route del sito
└── components/        ← componenti React riusabili
```

---

## Aggiungere un post e vederlo subito

1. Crea `src/content/blog/mio-post.mdx`:

```mdx
---
title: "Titolo del post"
date: "2026-03-10"
tags: ["react"]
excerpt: "Breve descrizione."
---

## Contenuto

Scrivi il tuo post in **Markdown**.
```

2. Il server rileva il nuovo file e aggiorna automaticamente la pagina `/blog`
3. Clicca sul post per vedere la pagina completa a `/blog/mio-post`

---

## Aggiungere un progetto e vederlo subito

Apri `src/data/projects.ts` e aggiungi un oggetto all'array:

```ts
{
  id: 'mio-progetto',
  title: 'Il mio progetto',
  description: 'Cosa fa il progetto.',
  url: 'https://esempio.com',       // opzionale
  github: 'https://github.com/...', // opzionale
  tags: ['React', 'TypeScript'],
  featured: true,                   // true = compare in homepage
},
```

Salva — il browser si aggiorna automaticamente.

---

## Modificare lo stile

Il progetto usa **Tailwind CSS**. Aggiungi o cambia le classi direttamente
nei file `.tsx`. Le modifiche sono visibili istantaneamente grazie al hot reload.

Per personalizzare la palette colori o i font, modifica `tailwind.config.ts`.

---

## Risoluzione problemi

### Porta 5173 già in uso

```bash
npm run dev -- --port 3000
```

### Errore dopo `npm install`

Cancella `node_modules` e reinstalla:

```bash
rm -rf node_modules
npm install
```

Su Windows (PowerShell):
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Un post MDX non compare nella lista

- Verifica che il file sia in `src/content/blog/` con estensione `.mdx`
- Controlla che il frontmatter sia corretto (indentazione, virgolette, formato data `"YYYY-MM-DD"`)
- Riavvia il server (`Ctrl+C` poi `npm run dev`)

### Hot reload non funziona

Riavvia il server di sviluppo — è sufficiente nella maggior parte dei casi.

---

## Verifica finale prima del deploy

Prima di fare push, è buona pratica testare la build di produzione:

```bash
npm run build
npm run preview
```

Apri [http://localhost:4173](http://localhost:4173) e naviga il sito come un utente reale.
Se tutto funziona qui, funzionerà anche su GitHub Pages.
