# Roadmap iniziale

La roadmap è intenzionalmente breve. Il PM deve aggiornarla in base allo stato reale e non creare task solo per rispettare un calendario.

## M0 — Fondamenta del repository

**Obiettivo:** ambiente riproducibile e controlli di qualità funzionanti.

- [ ] Inizializzare monorepo pnpm e workspace TypeScript strict.
- [ ] Creare app Next.js, API Express e package condivisi/database.
- [ ] Configurare lint, format, typecheck, test e build.
- [ ] Aggiungere CI per Pull Request.
- [ ] Documentare setup locale e variabili d'ambiente; aggiungere `.env.example` senza segreti.

**Gate di completamento:** clone pulito, installazione da lockfile, controlli locali e CI riusciti; istruzioni riproducibili.

## M1 — Modello dati e sicurezza di base

**Obiettivo:** fondamenta del database e delle API.

- [ ] Schema iniziale utenti, profili, competenze e associazione utente/competenza.
- [ ] Migrazioni versionate e seed solo per dati demo.
- [ ] Decisione documentata su sessione/autenticazione.
- [ ] Gestione errori, validazione e logging sicuro.
- [ ] Test di integrazione database/API.

**Gate di completamento:** migrazioni da database vuoto e controlli di autorizzazione coperti dai test.

## M2 — Account e profili

**Obiettivo:** registrazione/login/logout e profilo essenziale.

**Gate di completamento:** flussi principali e casi negativi verificati; password e sessioni gestite in modo sicuro.

## M3 — Competenze e ricerca

**Obiettivo:** aggiungere competenze offerte/desiderate e trovare competenze offerte da altri utenti.

**Gate di completamento:** input validati, paginazione e autorizzazioni verificate, test per duplicati e ricerca.

## M4 — Richieste di scambio

**Obiettivo:** creare, accettare, rifiutare e annullare richieste consentite; definire transizioni di stato esplicite.

**Gate di completamento:** nessuna transizione illegale; ogni azione è autorizzata e coperta da test.

## M5 — Ledger dei crediti

**Obiettivo:** riserva, rilascio e trasferimento dei crediti sulla base di regole approvate.

**Gate di completamento:** test su saldo insufficiente, doppie richieste, idempotenza, completamento confermato da entrambe le parti e concorrenza. Il credito iniziale deve essere approvato prima dell'implementazione.

## M6 — Percorso end-to-end MVP

**Obiettivo:** consentire a due utenti demo di completare il percorso principale dalla scoperta di una competenza allo scambio confermato.

**Gate di completamento:** test E2E, accessibilità/responsive di base, documentazione e checklist di sicurezza completati.

## M7 — AI Project Manager operativo

La configurazione del PM in parallelo ai primi task è utile, ma il PM può essere dichiarato operativo solo quando supera questi criteri:

- [ ] legge il README, `AGENTS.md`, specifica, architettura, roadmap, Issue e PR;
- [ ] crea un backlog iniziale senza duplicati e con criteri di accettazione;
- [ ] assegna quotidianamente task esistenti o ne crea di nuove solo quando necessarie;
- [ ] reagisce alle PR e ai fallimenti CI;
- [ ] valida gli output del modello e applica permessi minimi;
- [ ] gestisce correttamente errori, rate limit, assenza di configurazione e ri-esecuzioni;
- [ ] non effettua merge o modifiche sostanziali al prodotto senza approvazione;
- [ ] test end-to-end dimostrano il comportamento reale su una repository di prova.
