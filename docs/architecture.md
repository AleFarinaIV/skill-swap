# Architettura iniziale — Skill Swap

**Stato:** baseline proposta. Le deviazioni significative devono essere documentate in `docs/decisions/` e approvate quando cambiano uno stack già concordato o una regola di prodotto.

## 1. Architettura logica

```text
Browser
  |
  v
Next.js (React, App Router, TypeScript)
  | HTTP/JSON
  v
Express REST API (Node.js, TypeScript)
  | Prisma
  v
PostgreSQL

GitHub Issues / Pull Requests / CI
  ^                 |
  |                 v
AI Project Manager < GitHub Actions (schedulati + eventi)
```

Next.js è l'applicazione frontend. La logica di business e l'accesso al database vivono nell'API Express, non in componenti UI o route handler del frontend. Il browser non accede direttamente al database.

## 2. Monorepo

- `apps/web`: Next.js App Router, React e TypeScript strict.
- `apps/api`: Express REST API e servizi di business.
- `packages/shared`: schemi Zod, tipi e costanti condivisi tra web e API; non deve contenere accessi al database o segreti.
- `packages/db`: schema Prisma, migrazioni e moduli di accesso al database.
- `tools/pm`: script del Project Manager, isolati dal codice dell'applicazione.
- `.github/workflows`: CI e automazioni di progetto/PM.

Usare pnpm workspaces. Non aggiungere un sistema di orchestrazione/build complesso finché non è necessario.

## 3. Confini e responsabilità

### Web

- Presentazione, navigazione, form e feedback all'utente.
- Validazione lato client solo per usabilità; l'API resta responsabile della validazione effettiva.
- Chiamate HTTP all'API, senza query dirette a PostgreSQL.

### API

- Autenticazione, autorizzazione, validazione, regole di business e gestione degli errori.
- Struttura consigliata: route/controller sottili, servizi di business testabili e repository/Prisma confinato all'accesso dati.
- Verifica della proprietà delle risorse ad ogni lettura/scrittura protetta.

### Database

- PostgreSQL come fonte di verità.
- Tutti i cambiamenti dello schema tramite migrazioni versionate.
- Vincoli unici e foreign key per proteggere l'integrità, oltre ai controlli applicativi.

## 4. Librerie e decisioni iniziali

- TypeScript in modalità strict per tutte le app e gli script.
- Zod per validazione runtime e schemi condivisi.
- Prisma per accesso a PostgreSQL e migrazioni, salvo evidenza tecnica contraria documentata.
- API REST JSON versionabile; evitare GraphQL e microservizi nell'MVP.
- Node.js LTS compatibile con le versioni stabili scelte al bootstrap; registrare versione e package manager nei file di progetto.
- Dipendenze con versioni bloccate tramite lockfile e aggiornamenti tramite task/PR.

## 5. Autenticazione e sicurezza

La decisione dettagliata sul meccanismo di sessione deve diventare una decision record prima dell'implementazione dell'autenticazione. Requisiti minimi:

- credenziali mai conservate in chiaro; hashing password con algoritmo raccomandato e parametri aggiornabili;
- cookie di sessione HttpOnly, Secure in produzione e SameSite adeguato, oppure una soluzione equivalente documentata;
- protezioni appropriate contro CSRF, brute force e abuso degli endpoint;
- CORS con origini esplicite, non wildcard con credenziali;
- segreti tramite GitHub Secrets o secret manager dell'ambiente, mai in repository/log;
- rate limiting per login/registrazione e operazioni sensibili;
- gestione centralizzata degli errori senza esporre stack trace in produzione.

## 6. Ledger dei crediti

Il ledger deve essere la fonte di verità e non un semplice campo `balance` modificato liberamente.

Modello logico suggerito:

- `credit_accounts`: conto disponibile per ogni utente, conto escrow per ciascuna richiesta che riserva crediti e conto di emissione del sistema per la dotazione iniziale;
- `credit_transfers`: trasferimento immutabile tra due conti, importo intero positivo in minuti, tipo, timestamp, riferimento alla richiesta e chiave di idempotenza univoca;
- saldo di un conto = somma degli accrediti meno gli addebiti; si potrà introdurre una proiezione/cache in seguito, ma il ledger resterà autoritativo.

Flusso previsto:

1. Dotazione iniziale, se approvata: trasferimento dal conto di emissione al conto disponibile dell'utente, una sola volta.
2. Richiesta creata: in una transazione DB, verifica del saldo e trasferimento del tempo richiesto dal conto disponibile del richiedente all'escrow della richiesta.
3. Rifiuto o annullamento consentito: trasferimento dall'escrow al conto disponibile del richiedente.
4. Doppia conferma di completamento: trasferimento dall'escrow al conto disponibile del prestatore e aggiornamento dello stato in un'unica transazione.

Ogni operazione deve usare una chiave di idempotenza univoca. Gestire la concorrenza con transazioni e lock/isolamento adeguati: due richieste simultanee non devono poter spendere lo stesso credito. Se l'operazione fallisce, stato e ledger devono restare entrambi invariati.

## 7. Test e CI

La CI iniziale deve essere semplice e ripetibile. Definire gli strumenti nel primo task di bootstrap e applicare almeno:

- installazione riproducibile dal lockfile;
- lint e typecheck per tutti i workspace;
- test unitari;
- test di integrazione API con PostgreSQL di test;
- build web e API;
- migrazioni eseguibili da database vuoto.

I test end-to-end del percorso principale possono essere introdotti dopo il bootstrap, ma prima del rilascio dell'MVP. Il ledger richiede test su doppia conferma, richieste duplicate, saldo insufficiente e richieste concorrenti.

## 8. AI Project Manager

Per la prima iterazione il PM può vivere nello stesso monorepo in `tools/pm` e usare workflow GitHub Actions come trigger. Mantenerlo separato dal codice prodotto. In una fase successiva potrà essere estratto in una GitHub Action riutilizzabile o in un servizio dedicato.

Il runner dovrà:

- caricare esplicitamente `AGENTS.md`, questa architettura, la specifica prodotto e la roadmap;
- raccogliere stato di Issues, PR, milestone e CI con API GitHub;
- invocare il provider IA configurato;
- validare l'output del modello con uno schema runtime prima di eseguire azioni;
- usare token con permessi minimi e allowlist di azioni;
- evitare task duplicate e applicare limiti al numero di Issue assegnate;
- registrare riepiloghi e motivazioni, senza esporre segreti;
- fallire in modo sicuro se mancano variabili, permessi o contesto.

Configurazione attesa (da definire durante il task di implementazione):

- repository variable `PM_ASSIGNEE`: login GitHub dello sviluppatore da assegnare alle Issue;
- repository variable `PM_MODEL` e/o `PM_PROVIDER`: modello/provider scelto;
- Actions secret `PM_LLM_API_KEY`: chiave API del provider, se necessaria;
- permessi workflow minimi e limitati al repository.

Non eseguire merge automatici. Il PM può proporre correzioni o lasciare commenti di revisione; le regole di branch protection e i controlli CI restano indipendenti dall'IA.
