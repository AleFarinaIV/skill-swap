# Specifica di prodotto — Skill Swap

**Stato:** bozza iniziale per l'MVP. Le regole segnate come “da approvare” non devono essere implementate come decisioni definitive senza conferma del proprietario.

## 1. Problema e proposta di valore

Skill Swap aiuta le persone a insegnarsi competenze a vicenda senza denaro. Il valore scambiato è il tempo: chi insegna una competenza può usare i crediti temporali guadagnati per imparare da un'altra persona.

## 2. Principi

- Nessun pagamento, prezzo in valuta o conversione dei crediti in denaro.
- Accesso semplice e trasparente alla propria attività e ai propri movimenti.
- Fiducia basata su regole chiare e conferma degli scambi.
- Integrità del registro dei crediti prima di funzionalità social più elaborate.
- Dati personali limitati allo stretto necessario per l'MVP.

## 3. Attori

- **Utente:** gestisce il profilo, pubblica competenze, cerca opportunità e partecipa agli scambi.
- **Operatore/amministratore:** non ha una console nell'MVP; eventuali interventi manuali vanno documentati e non devono alterare direttamente il ledger.

## 4. Funzionalità MVP

### 4.1 Account e profilo

- Registrazione, login e logout.
- Password memorizzate solo come hash sicuro; mai in chiaro.
- Profilo essenziale: nome pubblico, descrizione breve e informazioni minime.
- Un utente può visualizzare e modificare solo i propri dati privati.

Recupero password, verifica email e accesso social sono candidati a una milestone successiva, salvo necessità emerse dall'implementazione e approvate.

### 4.2 Competenze

- L'utente può indicare competenze che **offre** e competenze che **vuole imparare**.
- Una competenza ha almeno nome e descrizione breve; categoria può essere opzionale nell'MVP.
- Il catalogo deve evitare duplicati banali dovuti a maiuscole/spazi.
- Le ricerche restituiscono solo profili/competenze pubblicamente visibili e paginano i risultati.
- L'utente non può inviare una richiesta a sé stesso.

### 4.3 Richieste di scambio

- L'utente sceglie una competenza offerta da un'altra persona, la durata desiderata in minuti e un messaggio breve.
- Le richieste hanno uno stato esplicito e transizioni validate lato server.
- Il destinatario può accettare o rifiutare una richiesta pendente.
- Il richiedente può annullare una richiesta ancora pendente.
- Dopo l'accettazione, entrambe le parti possono confermare il completamento.
- Solo la conferma di entrambe le parti completa lo scambio e trasferisce i crediti al prestatore.
- Il supporto a controversie e annullamenti dopo l'accettazione è fuori scope iniziale; prima del rilascio pubblico va definita una strategia sicura per questi casi.

### 4.4 Crediti temporali

- Unità intera: 1 credito equivale a 1 minuto di tempo di scambio; 60 crediti equivalgono a un'ora.
- I crediti non hanno valore in denaro, non si acquistano e non si riscattano.
- Ogni utente ha un conto disponibile; le richieste pendenti/accettate possono avere un conto di riserva/escrow per evitare doppie spese.
- La creazione della richiesta riserva la durata richiesta, se il saldo disponibile è sufficiente.
- Rifiuto o annullamento nello stato consentito rilasciano i crediti riservati.
- Dopo la doppia conferma di completamento, i crediti riservati sono trasferiti al prestatore.
- Il sistema non può spendere più crediti di quelli disponibili.
- Ogni movimento è immutabile e riconciliabile; correzioni avvengono tramite movimenti compensativi autorizzati, non cancellando lo storico.
- Ogni operazione finanziaria in termini di crediti è atomica, idempotente e protetta da condizioni di concorrenza.

**Decisione da approvare:** assegnare a ogni nuovo account una dotazione iniziale configurabile di 60 minuti per permettere di provare lo scambio. Il valore e le protezioni anti-abuso devono essere confermati prima di implementare il ledger. Nessun agente può cambiare questo criterio da solo.

### 4.5 Storico

L'utente può vedere il saldo disponibile, i crediti riservati e lo storico con data, quantità, motivo e scambio collegato. Il saldo deve essere coerente con il ledger.

## 5. Fuori scope per l'MVP

- Chat in tempo reale o messaggistica privata continuativa.
- Video/audiochiamate o strumenti per erogare lezioni.
- Calendario e sincronizzazione esterna.
- Recensioni, rating e classifiche.
- Notifiche email/push.
- Abbonamenti, pagamenti, compravendita o cash-out dei crediti.
- Raccomandazioni IA agli utenti.
- App mobile nativa.
- Sistema completo di gestione controversie e console amministrativa.

## 6. Criteri trasversali di qualità

- Validazione runtime di tutti gli input non fidati.
- Autenticazione e controllo dell'autorizzazione in ogni endpoint protetto.
- Errori API coerenti, senza stack trace o dettagli sensibili in produzione.
- Paginazione per liste e ricerche.
- Test unitari e di integrazione per transizioni di stato e ledger.
- Test di concorrenza/idempotenza sui movimenti di crediti.
- Migrazioni versionate e verificabili da un database vuoto.
- Log strutturati senza password, token, session cookie o altri segreti.
- Accessibilità e layout responsive come requisiti per le pagine MVP.

## 7. Criteri di successo dell'MVP

- Un nuovo ambiente può essere avviato seguendo la documentazione.
- Un utente può completare il percorso principale senza interventi manuali sul database.
- Un credito non può essere creato, speso o trasferito due volte accidentalmente.
- I test coprono i casi positivi, gli errori di autorizzazione e i casi limite principali.
- CI esegue lint, typecheck, test e build su ogni Pull Request.
- Il PM produce task che portano a progressi verificabili e non duplicano il backlog esistente.
