# Skill Swap

Skill Swap è una web app per scambiare competenze senza denaro. Le persone possono offrire ciò che sanno fare e imparare ciò che desiderano, usando crediti basati sul tempo.

> **Stato del progetto:** fase di fondazione e pianificazione. Le funzionalità descritte in questo documento sono obiettivi, non funzionalità già implementate.

## Obiettivo

Costruire prima fondamenta semplici, sicure e testabili; aggiungere funzionalità solo quando l'MVP è affidabile. Questa repository è anche il progetto pilota per un AI Project Manager che gestisce backlog, priorità, attività giornaliere e controlli del workflow GitHub.

## MVP

L'MVP dovrà consentire a un utente di:

1. registrarsi, accedere e uscire in modo sicuro;
2. creare e modificare un profilo essenziale;
3. indicare le competenze che offre e quelle che desidera imparare;
4. cercare competenze offerte dagli altri utenti;
5. inviare, accettare o rifiutare una richiesta di scambio indicando una durata;
6. confermare il completamento di uno scambio insieme all'altra parte;
7. ricevere, riservare e spendere crediti temporali tramite un registro verificabile;
8. consultare saldo e storico dei movimenti.

### Non incluso nell'MVP

Chat in tempo reale, videochiamate, calendario avanzato, recensioni e reputazione, notifiche email, pagamenti, conversione dei crediti in denaro, app mobile, raccomandazioni personalizzate e gestione automatizzata delle controversie. Potranno essere valutati dopo aver validato le fondamenta.

## Stack tecnico

- **Frontend:** React + Next.js (App Router), TypeScript con modalità strict.
- **Backend:** Node.js + Express, TypeScript.
- **Database:** PostgreSQL.
- **Monorepo/package manager:** pnpm workspaces.
- **Persistenza e migrazioni:** Prisma, con migrazioni versionate nella repository.
- **Validazione runtime e contratti condivisi:** Zod in `packages/shared`.
- **Test:** unitari, integrazione API/database ed end-to-end; gli strumenti verranno fissati nella prima milestone tecnica.
- **CI e automazioni:** GitHub Actions.

Le versioni precise di Node.js e delle dipendenze saranno fissate durante il bootstrap, scegliendo versioni stabili e compatibili e registrandole nei file di progetto. Non aggiornare major version automaticamente senza una task dedicata.

## Struttura prevista

```text
apps/
  web/             # interfaccia Next.js
  api/             # API REST Express
packages/
  shared/          # schemi Zod e tipi condivisi
  db/              # schema Prisma, migrazioni e accesso al database
docs/
  product-spec.md  # requisiti e regole di prodotto
  architecture.md # decisioni architetturali
  roadmap.md       # milestone e piano evolutivo
  decisions/       # decision log / ADR
.github/
  ISSUE_TEMPLATE/
  workflows/       # CI e, successivamente, automazioni del PM
tools/pm/          # eventuali script del PM, isolati dal codice prodotto
AGENTS.md          # istruzioni per gli agenti di coding
```

La struttura può essere adattata tramite una decisione documentata se esiste una ragione tecnica concreta. Evitare file, package o servizi vuoti creati solo per anticipare possibilità future.

## Principi di prodotto

- Nessuno scambio di denaro: i crediti rappresentano tempo e non hanno valore monetario né possibilità di cash-out.
- Le quantità di tempo sono interi espressi in minuti; niente floating point per i crediti.
- Un movimento di crediti deve essere tracciabile, atomico e idempotente.
- Il completamento dello scambio richiede la conferma di entrambe le parti.
- Il saldo non deve essere modificabile direttamente da endpoint generici: ogni movimento passa dal servizio di ledger.
- Gli endpoint devono verificare autenticazione, autorizzazione e validità dei dati.
- Nessun segreto o dato personale reale va inserito nel repository.

### Assunzione sul credito iniziale

Per evitare che i nuovi utenti non possano provare la piattaforma prima di avere insegnato una competenza, viene proposta una **dotazione iniziale configurabile di 60 minuti di crediti**. È un'ipotesi di prodotto da documentare e confermare prima di implementare il ledger; non è una regola già approvata. Deve essere registrata come movimento iniziale e non può essere applicata più di una volta allo stesso account.

## Workflow di sviluppo

- `main` deve rimanere sempre in uno stato verificabile.
- Ogni cambiamento significativo passa da una branch e una Pull Request.
- Ogni PR deve collegarsi a una Issue tramite `Closes #<numero>` quando applicabile.
- Le CI checks obbligatorie devono essere verdi prima del merge.
- Il PM può creare/assegnare Issue, ordinare il backlog e commentare le PR secondo permessi minimi; non esegue merge autonomi.
- Le decisioni che cambiano comportamento di prodotto, sicurezza o modello dei crediti richiedono approvazione umana.

## AI Project Manager

Il PM dovrà leggere questo README, `AGENTS.md`, `docs/product-spec.md`, `docs/architecture.md`, la roadmap e lo stato effettivo di Issues/PR prima di pianificare. Il suo obiettivo non è creare un numero fisso di task ogni giorno, ma assicurarsi che il prossimo lavoro più utile sia chiaro, piccolo, verificabile e non duplicato.

Le automazioni IA non sono ancora configurate in questa fase documentale. Non considerare il PM operativo finché provider, segreti, permessi, workflow e test end-to-end non saranno configurati e verificati.

## Lingua e convenzioni

- Conversazione PM, Issue e documentazione: italiano, salvo nomi tecnici o convenzioni della community.
- Identificatori nel codice, API, nomi di variabili e commit: inglese.
- Commit consigliati: Conventional Commits (per esempio `feat(api): add skill search`).
- PR piccole e focalizzate, con motivazione, test eseguiti e rischi residui.

## Primo obiettivo tecnico

Il primo traguardo è un bootstrap riproducibile del monorepo con lint, typecheck, test minimi e build eseguiti in CI. L'autenticazione e le funzionalità prodotto iniziano solo dopo che questa base è verificata.
