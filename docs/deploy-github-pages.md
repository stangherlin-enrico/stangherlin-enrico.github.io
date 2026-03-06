# Deploy su GitHub Pages — guida personale

## Stato attuale del progetto

- Workflow CI/CD già configurato: `.github/workflows/deploy.yml`
- Build target: `dist/` (gitignored, viene prodotta in CI)
- SPA routing: il workflow copia `dist/index.html → dist/404.html` dopo la build
- PDF del CV: generati localmente con `npm run cv`, salvati in `public/cv/` (committati)
- Firma sul CV: metti l'immagine in `private/signature.png` (gitignored, non committata)
- Nessun `base` in `vite.config.ts` — corretto per user pages (`username.github.io`)

---

## 1. Genera i PDF del CV prima del primo deploy

I PDF devono essere presenti in `public/cv/` perché il workflow non li genera.

```bash
cd D:\Sviluppi\stangherlin-enrico\stangherlin-enrico.github.io
npm run cv
```

Verifica che esistano:
- `public/cv/en-GB.pdf`
- `public/cv/en-GB-bw.pdf`
- `public/cv/manifest.json`

Per includere la firma nel PDF, metti l'immagine in `private/signature.png` prima di eseguire il comando.
Il file `private/` è gitignored — non viene mai committato.

---

## 2. Crea il repository su GitHub

Il nome del repo **deve** essere esattamente `stangherlin-enrico.github.io`.

1. Vai su [github.com/new](https://github.com/new)
2. **Repository name:** `stangherlin-enrico.github.io`
3. **Owner:** `stangherlin-enrico`
4. **Visibility:** Public (obbligatorio per GitHub Pages gratuito)
5. **Non inizializzare** con README, .gitignore o licenza — il repo deve essere vuoto
6. Click **Create repository**

---

## 3. Inizializza Git e fai il primo commit

```bash
cd D:\Sviluppi\stangherlin-enrico\stangherlin-enrico.github.io

git init
git branch -M main
git remote add origin https://github.com/stangherlin-enrico/stangherlin-enrico.github.io.git
```

Verifica cosa verrà committato (non deve esserci `node_modules`, `dist` o `private/`):

```bash
git status
```

Aggiungi tutto e committa:

```bash
git add .
git commit -m "Initial commit"
```

---

## 4. Abilita GitHub Pages con GitHub Actions

**Prima di fare il push**, configura Pages nel repo — altrimenti il workflow fallisce per mancanza dell'ambiente `github-pages`.

1. Vai su `github.com/stangherlin-enrico/stangherlin-enrico.github.io`
2. **Settings** → **Pages** (sidebar sinistra)
3. Under **Source** → seleziona **GitHub Actions**
4. Non serve fare altro

---

## 5. Push e primo deploy

```bash
git push -u origin main
```

Il workflow parte automaticamente. Monitoralo da:
`github.com/stangherlin-enrico/stangherlin-enrico.github.io/actions`

Il primo deploy richiede 1–3 minuti. Al termine il sito è live su:
**`https://stangherlin-enrico.github.io`**

---

## 6. Workflow ordinario (da ora in poi)

Ogni push su `main` triggera il deploy automaticamente.

```bash
git add .
git commit -m "descrizione della modifica"
git push
```

### Aggiornare il CV

Il PDF non viene rigenerato in CI — devi farlo localmente e committarlo.

```bash
npm run cv                          # colore + BW, con data e firma
npm run cv -- --no-bw              # solo versione colore
npm run cv -- --no-place-date      # senza luogo e data
npm run cv -- --no-signature       # senza firma (anche se il file esiste)
npm run cv -- --help               # mostra tutti i flag disponibili
```

Per includere la firma: metti l'immagine in `private/signature.png` prima di eseguire il comando.

Dopo la generazione, committa e pusha:

```bash
git add public/cv/
git commit -m "update CV PDF"
git push
```

---

## 7. Troubleshooting

**Il workflow fallisce con "Error: No such environment: github-pages"**
→ Hai fatto push prima di abilitare Pages. Vai in Settings → Pages → Source: GitHub Actions,
poi ri-esegui il workflow manualmente da Actions → Run workflow.

**Le route dirette (es. `/blog/hello-world`) danno 404**
→ Il workflow deve completare il passo `cp dist/index.html dist/404.html`. Controlla il log.

**I PDF del CV non si scaricano (404)**
→ I file `public/cv/*.pdf` non sono stati committati. Esegui `npm run cv` e committa `public/cv/`.

**Il sito non si aggiorna dopo il push**
→ Controlla la tab Actions. Se è verde ma il browser mostra la versione vecchia: `Ctrl+Shift+R`.

**Errore TypeScript nella build CI**
→ Il workflow usa `npm run build` che include `tsc -b`. Verifica che compili localmente prima di pushare.
