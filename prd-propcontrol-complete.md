# Product Requirements Document
# PropControl — Self-Hosted Property Management, Finance, Expenses, Reporting & Tax SaaS

---

**Document purpose:** Dieses PRD ist für menschliche Stakeholder und KI-Entwicklungsagenten wie GPT Codex oder Claude Code geschrieben. Die Benutzersprache ist Deutsch. Der Code, die Datenbankstruktur, APIs, Tests, Migrationen und technische Dokumentation sind in Englisch.

**Produktname:** PropControl  
**Status:** Draft  
**Version:** v1.0  
**Last updated:** 2026-04-05  
**Deployment model:** Self-hosted SaaS auf Ubuntu Server  
**Platform foundation:** Self-hosted Supabase  
**Primary UI language:** German (`de-DE`)  
**Technical language:** English

---

## 1. Ziel des Produkts

PropControl ist eine self-hosted SaaS-Anwendung für die Verwaltung von Immobilien, Mietern, Ausgaben, Finanzierung, Nebenkostenabrechnungen, Reporting und steuerlicher Aufbereitung.

Die Anwendung richtet sich an:
- private Vermieter,
- Investorengemeinschaften,
- kleine Hausverwaltungen,
- vermögensverwaltende Eigentümerstrukturen,
- technische Betreiber mit Wunsch nach voller Datenkontrolle.

PropControl soll drei Kernprobleme lösen:
1. operative Verwaltung von Objekten und Mietverhältnissen,
2. strukturierte finanzielle Steuerung inkl. Betriebskosten, Investitionskosten und Finanzierung,
3. steuer- und reportingfähige Aufbereitung pro Objekt.

---

## 2. Verbindliche Sprach- und Umsetzungsregeln

### R-LANG-001 — UI-Sprache
Die gesamte Benutzeroberfläche muss standardmäßig auf Deutsch ausgeliefert werden.

Dies umfasst:
- Navigation,
- Buttons,
- Formulare,
- Fehlermeldungen,
- Systemmeldungen,
- E-Mails,
- PDF-Ausgaben,
- Hilfetexte,
- Reporting-Bezeichnungen.

### R-LANG-002 — Technische Sprache
Der gesamte technische Layer muss in Englisch gehalten werden.

Dies umfasst:
- source code,
- folder names,
- file names,
- classes,
- functions,
- variables,
- enums,
- API endpoints,
- event names,
- database schema,
- table names,
- column names,
- SQL migrations,
- comments,
- test names,
- commit messages.

### R-LANG-003 — i18n-Architektur
UI-Texte dürfen nicht inline hartcodiert werden. Das Frontend muss eine saubere Internationalisierungsschicht mit Locale-Dateien verwenden.

### R-LANG-004 — Kein Sprachmix
Englische technische Strings dürfen nicht in die deutsche UI durchschlagen. Fehlende Übersetzungen müssen in Entwicklung und QA sichtbar fehlschlagen.

---

## 3. AI-Consumption Rules

Dieses Dokument muss maschinenverarbeitbar sein.

### R-AI-DOC-001
Alle Anforderungen sind wörtlich und nicht interpretativ umzusetzen.

### R-AI-DOC-002
Wenn eine Anforderung unklar ist, muss die KI ein `OPEN_QUESTION` erzeugen, statt Annahmen zu treffen.

### R-AI-DOC-003
Jede Anforderung mit einer Requirement-ID ist als testbares Verhalten umzusetzen.

### R-AI-DOC-004
`POST-MVP`-Elemente dürfen nicht automatisch mitgebaut werden.

### R-AI-DOC-005
Jedes implementierte Feature muss enthalten:
- Code,
- Tests,
- Migrations,
- Dokumentationsupdate,
- Requirement-Traceability.

### R-AI-DOC-006
Die KI muss jeden Feature-Block in kleinen, reviewbaren Schritten umsetzen.

### R-AI-DOC-007
Self-hosted Annahmen dürfen nicht durch vendor-hosted Defaults ersetzt werden.

---

## 4. Zielarchitektur

### R-ARCH-001 — Self-hosted Plattform
PropControl wird als self-hosted Anwendung auf Ubuntu Server betrieben.

### R-ARCH-002 — Plattformbasis
Als Datenbank- und Plattformbasis wird self-hosted Supabase verwendet. Supabase unterstützt Self-Hosting offiziell über Docker und Docker Compose und passt damit zum geforderten Ubuntu-Server-Betriebsmodell. [web:48][web:51]

### R-ARCH-003 — Primäres Deployment-Ziel
Der primäre Deployment-Standard ist Ubuntu Server 22.04 LTS oder 24.04 LTS mit Docker Engine und Docker Compose Plugin. [web:48][web:52]

### R-ARCH-004 — Single installation / customer controlled
Jede Installation ist kundenseitig isoliert. Es gibt keine Abhängigkeit von Supabase Cloud oder einer zentralen Hersteller-Control-Plane. [web:48][web:51]

### R-ARCH-005 — Technischer Kern
Pflichtbestandteile des MVP:
- Frontend in TypeScript,
- Backend/Application Layer in TypeScript,
- Supabase PostgreSQL,
- Supabase Auth,
- Supabase Storage oder kompatible Dateispeicher-Abstraktion,
- SQL migrations,
- Docker Compose Deployment,
- Backup/Restore Support,
- Audit Logging.

---

## 5. Produktprinzipien

### Fachliche Prinzipien
- Objektzentrierte Verwaltung.
- Pro Objekt vollständige Sicht auf Mieter, Einnahmen, Ausgaben, Finanzierung, Reports und Steuerdaten.
- Klare Trennung von operativer Sicht, Cash-Sicht und Tax-Sicht.
- Mehrbenutzerfähigkeit pro Objekt.

### Technische Prinzipien
- Modularer Aufbau.
- Klare Core-vs-Module-Trennung.
- Erweiterbarkeit ohne Refactoring des Gesamtsystems.
- Datenmodell zuerst, UI darauf aufbauend.
- Auditierbarkeit aller fachlich relevanten Änderungen.

### UX-Prinzipien
- schlicht,
- technisch,
- produktivitätsorientiert,
- klickarm,
- tabellen- und workflowfreundlich,
- zurückhaltendes Design,
- hohe Bearbeitungseffizienz.

---

## 6. Nutzergruppen

### Persona A — Privater Vermieter
- 1 bis 20 Einheiten,
- will Übersicht, Finanzierung, steuerliche Daten, Nebenkostenabrechnung,
- benötigt einfache Bedienung.

### Persona B — Investorengemeinschaft
- mehrere Personen verwalten gemeinsam ein Objekt,
- jede Person benötigt eigenen Login,
- Rollen und Änderungen müssen personenbeziehbar protokolliert werden.
- Benötigt Reporting, PDF-Exporte für Bankpräsentation

### Persona C — Kleine Hausverwaltung
- 20 bis 200 Einheiten,
- arbeitet stark listen- und prozessorientiert,
- benötigt Reporting, PDF-Exporte, steuerliche Aufbereitung und Nebenkostenabrechnung.

---

## 7. Scope

### In scope — MVP
- Objekt- und Einheitenverwaltung
- Mieter- und Mietvertragsverwaltung
- gemeinsame Objektverwaltung durch mehrere Benutzer
- Einladungssystem für Mitverwaltung
- Erfassung von Einnahmen und Ausgaben
- Unterscheidung zwischen Betriebskosten und Investitionskosten
- Finanzierung pro Objekt
- Darlehensübersicht mit Zins, Tilgung, Tilgungsbeginn und Restlaufzeit
- Aufgaben und Termine pro Objekt
- Reporting mit Cash-Sicht und Tax-Sicht
- Nebenkostenabrechnung pro Mieter mit PDF-Export
- Steuer-Bereich für objektbezogene Aufbereitung je Steuerjahr
- Elster-kompatible Exportaufbereitung
- PDF- und CSV-Exporte
- Audit Log
- Rollen- und Rechtekonzept
- self-hosted Betrieb auf Ubuntu mit Supabase

### Post-MVP
- Tenant portal
- Maintenance management
- DATEV Direktintegration
- SSO / SAML
- Kubernetes / Helm
- natürliche Sprachabfragen im Reporting
- mehrsprachige UI zusätzlich zu Deutsch

### Out of scope
- öffentliche Vermarktung von Leerständen
- vollwertige doppelte Buchhaltung als ERP-Ersatz
- integrierte Zahlungsabwicklung
- mobile native apps im MVP

---

## 8. Modularer Aufbau

PropControl muss als modular erweiterbare Plattform gebaut werden. Erweiterbare Plattformen funktionieren typischerweise über klar getrennte Komponenten, stabile Schnittstellen und definierte Erweiterungspunkte. [web:53][web:56][web:59]

### R-MOD-001 — Core Platform
Der Core umfasst:
- Auth,
- users,
- roles,
- property memberships,
- settings,
- audit log,
- notifications,
- file handling,
- reporting engine foundation,
- tax year framework,
- module registry.

### R-MOD-002 — Module
Geschäftsfunktionen werden als Module organisiert.

Pflichtmodule im MVP:
- Properties
- Tenants
- Expenses
- Financing
- Reporting
- Utilities Statement
- Task Management
- Tax
- Documents

### R-MOD-003 — Modulvertrag
Jedes Modul definiert:
- domain entities,
- API surface,
- UI routes,
- permissions,
- database migrations,
- tests,
- navigation registration.

### R-MOD-004 — Aktivierung
Module müssen registrierbar und später erweiterbar sein, ohne unrelated modules manuell umzubauen.

### R-MOD-005 — Isolierung
Module dürfen nicht eng gekoppelt sein. Kommunikation erfolgt über definierte services, repositories oder events.

---

## 9. Mehrbenutzerfähigkeit pro Objekt

### R-COLL-001 — Shared property management
Ein Objekt muss von mehreren Usern gleichzeitig verwaltet werden können.

### R-COLL-002 — Property memberships
Ein User kann mehreren Objekten zugeordnet sein. Ein Objekt kann mehreren Usern zugeordnet sein.

### R-COLL-003 — Einladung zur Mitverwaltung
Ein berechtigter User kann einen weiteren User per E-Mail einladen, ein bestimmtes Objekt mitzuverwalten.

Der Einladungsprozess unterstützt:
- Einladung an bestehende User,
- Einladung an neue User,
- Rollenzuweisung,
- Token-basierte Annahme,
- Ablaufdatum,
- Widerruf,
- Auditierung.

### R-COLL-004 — Property scoped roles
Rollen müssen global und objektspezifisch möglich sein.

Beispiel für objektspezifische Rollen:
- Eigentümer
- Objektmanager
- Bearbeiter
- Buchhaltung
- Leser
- Mieter

### R-COLL-005 — Nachvollziehbarkeit
Jede Änderung an einem gemeinsam verwalteten Objekt muss eindeutig einem konkreten User zugeordnet werden.

**Acceptance criteria**
- WHEN User A User B zu Objekt X einlädt, THEN erhält User B erst nach Annahme Zugriff.
- WHEN User B aus Objekt X entfernt wird, THEN verliert User B den Zugriff auf Objekt X sofort.
- WHEN mehrere User an Objekt X arbeiten, THEN müssen alle Änderungen im Audit Log benutzerbezogen erscheinen.

---

## 10. Objekt- und Stammdatenverwaltung

### R-PROP-001 — Objekt
Pro Objekt müssen mindestens erfasst werden:
- Objektname
- Adresse
- Objekttyp
- Anzahl Einheiten
- Kaufdatum
- Kaufpreis
- Kaufnebenkosten
- Status aktiv/archiviert

### R-PROP-002 — Einheiten
Ein Objekt kann eine oder mehrere Einheiten enthalten.

### R-PROP-003 — Dokumente
Pro Objekt müssen Dokumente abgelegt werden können.

Dokumenttypen:
- Kaufvertrag
- Grundbuch
- Mietvertrag
- Darlehensunterlagen
- Rechnungen
- Nebenkostenunterlagen
- Steuerunterlagen
- Sonstige

### R-PROP-004 — Objektbezogene Datensicht
Alle fachlichen Bereiche müssen pro Objekt filterbar und auswertbar sein.

---

## 11. Mieter- und Vertragsverwaltung

### R-TEN-001
Pro Mieter müssen mindestens erfasst werden:
- Name
- Kontaktinformationen wie Handy, Email
- Kontoinformationen (IBAN, BIC)
- Einheit
- Vertragsbeginn
- Vertragsende optional
- Kaltmiete
- Nebenkostenvorauszahlung
- Kaution optional
- Zahlungsrhythmus

### R-TEN-002
Einheiten müssen einen historischen Mieterverlauf unterstützen.

### R-TEN-003
Mieter müssen als aktiv, gekündigt, ausgezogen markierbar sein.

### R-TEN-004
Mietvertragsdaten müssen für Reporting, Nebenkostenabrechnung und Steuerbereich nutzbar sein.

---

## 12. Einnahmen und Forderungen

### R-INC-001
Wiederkehrende Soll-Mieten müssen pro Mieter erzeugbar sein.

### R-INC-002
Zahlungseingänge müssen erfasst oder importiert werden können.

### R-INC-003
Statuslogik für Forderungen:
- offen
- teilweise bezahlt
- bezahlt
- überfällig

### R-INC-004
Einnahmen müssen objektbezogen, mieterbezogen und periodenbezogen auswertbar sein.

---

## 13. Ausgabenmanagement

### R-EXP-001 — Grundstruktur
Ausgaben müssen pro Objekt erfasst werden können.

### R-EXP-002 — Pflichtfelder
Mindestens zu erfassen:
- Datum
- Betrag
- Lieferant / Empfänger
- Objekt
- Einheit optional
- Kategorie
- Beleg
- Notiz optional
- Zahlungsstatus optional

### R-EXP-003 — Kostenart
Bei Ausgaben muss zwingend unterschieden werden zwischen:
- **Betriebskosten**
- **Investitionskosten**

### R-EXP-004 — Betriebskosten
Betriebskosten sind operative, umlagefähige oder laufende Kosten und müssen für Reporting, Nebenkostenabrechnung und Steueraufbereitung nutzbar sein.

### R-EXP-005 — Investitionskosten
Investitionskosten sind wertsteigernde oder langfristige Maßnahmen und müssen separat gekennzeichnet und separat ausgewertet werden.

### R-EXP-006 — Kategorieebene
Zusätzlich zur Kostenart muss eine fachliche Kategorie erfasst werden, z. B.:
- Heizung
- Wasser
- Reinigung
- Versicherung
- Verwaltung
- Reparatur
- Sanierung
- Modernisierung
- Steuerberatung
- Sonstiges

### R-EXP-007 — Belegverarbeitung
Belege müssen hochladbar sein. OCR ist für MVP vorgesehen, aber auch manuelle Erfassung muss vollständig möglich sein.

### R-EXP-008 — Reporting-Relevanz
Ausgaben müssen in Cash-, Tax- und Finanzierungsreporting korrekt berücksichtigt werden.

---

## 14. Finanzierung pro Objekt

Ein Darlehen wird immer **pro Objekt** angelegt.

### R-FIN-001 — Darlehensanlage
Pro Objekt muss eine oder mehrere Finanzierungen erfasst werden können.

### R-FIN-002 — Pflichtfelder Finanzierung
Mindestens zu erfassen:
- Darlehensbezeichnung
- Darlehensgeber
- Objekt
- Darlehensbetrag
- Zinssatz
- Tilgungssatz oder Tilgungslogik
- Tilgungsbeginn
- Startdatum / Valuta
- Zinsbindungsende optional
- Laufzeit optional
- Rate optional
- Restschuld initial oder berechnet

### R-FIN-003 — Zins und Tilgung
Die Anwendung muss Zins- und Tilgungsanteile getrennt darstellen.

### R-FIN-004 — Restlaufzeit
Die Restlaufzeit einer Finanzierung muss ausgegeben werden.

### R-FIN-005 — Tilgungsbeginn
Der Tilgungsbeginn muss separat erfasst werden können, damit zins- und tilgungsfreie Anlaufphasen abbildbar sind.

### R-FIN-006 — Darlehensübersicht
Es muss eine Finanzierungsübersicht geben mit mindestens:
- aktueller Darlehensstand
- Restschuld
- Zinssatz
- Tilgungsbeginn
- monatliche Rate
- Anteil Zins aktuelle Periode
- Anteil Tilgung aktuelle Periode
- Restlaufzeit

### R-FIN-007 — Mehrere Darlehen pro Objekt
Ein Objekt kann mehrere Finanzierungen haben.

### R-FIN-008 — Historisierung
Änderungen an Finanzierungsdaten müssen versioniert oder auditierbar sein.

### R-FIN-009 — Berücksichtigung im Reporting
Finanzierungen müssen im Reporting berücksichtigt werden, insbesondere:
- Zinsbelastung,
- Tilgungsanteil,
- Cashflow-Effekt,
- objektbezogene Finanzierungsübersicht,
- Auswirkung auf Periodenergebnis je Sicht.

### R-FIN-010 — Tilgungsplan / Amortisation
Die Anwendung soll einen Tilgungsplan bzw. eine Darlehensübersicht erzeugen, in der Zinsanteil, Tilgungsanteil und Restschuld über die Laufzeit sichtbar sind. Ein Amortisationsplan stellt genau diese Aufteilung typischerweise in Principal, Interest und Remaining Balance dar. [web:69][web:75]

**Acceptance criteria**
- WHEN eine Finanzierung für ein Objekt angelegt wird, THEN müssen Zinssatz, Höhe und Tilgungsbeginn erfasst werden können.
- WHEN eine Finanzierung angezeigt wird, THEN müssen Restlaufzeit und Restschuld sichtbar sein.
- WHEN Reporting erzeugt wird, THEN müssen Zins und Tilgung in der Finanzierungslogik berücksichtigt werden.

---

## 15. Reporting

Das Reporting muss fachlich zwischen **Cash-Sicht** und **Tax-Sicht** unterscheiden. Cash- und steuerliche Sicht sind nicht identisch und müssen deshalb getrennt auswählbar sein. [web:54][web:57][web:60]

### R-REP-001 — Reporttypen MVP
Pflicht-Reports:
- Objektübersicht
- Portfolioübersicht
- Einnahmen/Ausgaben Report
- Cashflow Report
- Finanzierungsreport
- Rent Roll
- Ausgaben nach Kostenart
- Ausgaben nach Kategorie
- Steuerjahresübersicht pro Objekt

### R-REP-002 — Cash-Sicht
In der Cash-Sicht werden tatsächliche Zahlungsflüsse dargestellt:
- Einnahmen bei Geldeingang,
- Ausgaben bei Zahlung,
- Finanzierung mit Zins und Tilgung als Cash-relevante Größen,
- Liquiditätssicht pro Objekt.

### R-REP-003 — Tax-Sicht
In der Tax-Sicht werden Daten steuerorientiert aufbereitet:
- Objektbezogene Struktur,
- Kategorisierung nach steuerlicher Relevanz,
- Unterscheidung von Betriebskosten und Investitionskosten,
- Ausweis finanzierungsbezogener steuerlich relevanter Bestandteile,
- Exportbasis für Elster-Vorbereitung.

### R-REP-004 — Umschaltbarkeit
Jeder Finanzreport muss im selben Workflow zwischen `Cash-Sicht` und `Tax-Sicht` umschaltbar sein.

### R-REP-005 — Kennzeichnung
Jeder Report muss im Header klar ausweisen, in welcher Sicht er erzeugt wurde.

### R-REP-006 — Objektbezug
Alle Reports müssen mindestens pro Objekt erzeugbar sein.

### R-REP-007 — Finanzierungsintegration
Der Reporting Layer muss Finanzierung berücksichtigen, einschließlich:
- Darlehenssaldo,
- Zinskosten,
- Tilgung,
- Restlaufzeit,
- Belastung je Objekt,
- Einwirkung auf Cashflow.

### R-REP-008 — Filter
Reports müssen filterbar sein nach:
- Objekt
- Zeitraum
- Steuerjahr
- Mieter
- Kostenart
- Kategorie
- Report-Sicht

---

## 16. Nebenkostenabrechnung

Für Deutschland muss pro Mieter eine Nebenkostenabrechnung erzeugt und als PDF exportiert werden können. Eine ordnungsgemäße Nebenkostenabrechnung enthält unter anderem Abrechnungszeitraum, Gesamtkosten, Verteilerschlüssel, Mieteranteil und Abzug der Vorauszahlungen; sie sollte schriftlich, z. B. als PDF, zugestellt werden. [web:68][web:74]

### R-UTIL-001 — Abrechnung pro Mieter
Es muss möglich sein, pro Mieter und Abrechnungszeitraum eine Nebenkostenabrechnung zu erstellen.

### R-UTIL-002 — Datenbasis
Die Nebenkostenabrechnung muss auf folgenden Daten basieren:
- Objekt,
- Einheit,
- Mieter,
- Abrechnungszeitraum,
- umlagefähige Betriebskosten,
- Verteilerschlüssel,
- Mieteranteil,
- geleistete Vorauszahlungen,
- Saldo Nachzahlung/Guthaben.

### R-UTIL-003 — Pflichtbestandteile
Die Abrechnung muss mindestens enthalten:
- Vermieter bzw. verwaltende Partei,
- Mieter,
- Objekt / Einheit,
- Abrechnungszeitraum,
- Zusammenstellung der Gesamtkosten,
- Erläuterung des Verteilerschlüssels,
- Berechnung des individuellen Anteils,
- Abzug der Vorauszahlungen,
- Ergebnis (Nachzahlung oder Guthaben).

### R-UTIL-004 — Umlagefähigkeit
Nur als Betriebskosten markierte und für die Umlage freigegebene Positionen dürfen in die Nebenkostenabrechnung einfließen.

### R-UTIL-005 — PDF-Export
Die Nebenkostenabrechnung muss als PDF exportiert werden können.

### R-UTIL-006 — Nachvollziehbarkeit
Die zugrunde liegenden Kostenpositionen müssen aus der Abrechnung heraus nachvollziehbar sein.

### R-UTIL-007 — Historie
Erzeugte Nebenkostenabrechnungen müssen gespeichert und erneut abrufbar sein.

**Acceptance criteria**
- WHEN eine Nebenkostenabrechnung erzeugt wird, THEN dürfen nur passende Betriebskosten berücksichtigt werden.
- WHEN eine Abrechnung exportiert wird, THEN muss eine PDF mit allen Pflichtbestandteilen erzeugt werden. [web:68]

---

## 17. Steuer-Menü und Elster-Vorbereitung

Es muss einen eigenen Menüpunkt **Steuer** geben.

ELSTER ist das offizielle Online-Portal für die elektronische Kommunikation mit dem deutschen Finanzamt und wird für elektronische Steuerdatenübermittlung genutzt. ELSTER-Workflows arbeiten mit strukturierten, plausibilisierten Datensätzen und in bestimmten Fällen mit XML-basierten Übergaben. [web:64][web:67][web:70][web:73]

### R-TAX-001 — Menüpunkt Steuer
Die Anwendung muss einen Hauptmenüpunkt `Steuer` besitzen.

### R-TAX-002 — Steuerjahr
Im Bereich Steuer muss ein Steuerjahr auswählbar sein.

### R-TAX-003 — Objektbezogene Aufbereitung
Steuerdaten müssen pro Objekt aufbereitet werden.

### R-TAX-004 — Datenbasis
Für ein Steuerjahr müssen mindestens verarbeitet werden:
- Einnahmen,
- Betriebskosten,
- Investitionskosten,
- finanzierungsbezogene Daten,
- Zinsanteile,
- objektspezifische Zuordnung,
- steuerliche Kategorisierung.

### R-TAX-005 — Exportvorbereitung für Elster
Die Anwendung muss die Daten so strukturieren, dass sie als vorbereitete Elster-Uploadbasis exportiert oder weiterverarbeitet werden können.

### R-TAX-006 — Exportformate
Mindestens erforderlich:
- strukturierter CSV-Export,
- strukturierter PDF-Überblick,
- optional vorbereitete XML-kompatible Datenstruktur für spätere Elster-Anbindung.

### R-TAX-007 — Mapping Layer
Es muss ein Mapping von operativen Kategorien auf steuerliche Kategorien geben.

### R-TAX-008 — Objekttrennung
Export und Darstellung müssen strikt objektbezogen sein, damit die Daten je Immobilie nachvollziehbar bleiben.

### R-TAX-009 — Finanzierungsbezug
Zinsanteile aus Finanzierungen müssen separat auswertbar und im Steuerbereich sichtbar sein.

### R-TAX-010 — Reviewability
Vor dem Export muss ein Review-Screen die aufbereiteten Daten pro Objekt und Steuerjahr anzeigen.

**Acceptance criteria**
- WHEN ein Nutzer in den Bereich Steuer wechselt, THEN muss er ein Steuerjahr und ein Objekt auswählen können.
- WHEN ein Steuerexport erzeugt wird, THEN müssen die Daten objektbezogen strukturiert sein.
- WHEN Elster-Vorbereitung ausgegeben wird, THEN müssen die Daten in einer strukturierten Form für den elektronischen Weiterverarbeitungsprozess vorliegen. [web:67][web:70]

---

## 18. Rollen und Rechte

### R-ROL-001 — Global roles
Globale Rollen im System:
- Installation Owner
- Admin
- Operator

### R-ROL-002 — Property roles
Objektspezifische Rollen:
- Eigentümer
- Objektmanager
- Bearbeiter
- Buchhaltung
- Leser

### R-ROL-003 — Rechteebenen
Rechte müssen auf UI- und API-Ebene erzwungen werden.

### R-ROL-004 — Steuerbereich
Der Bereich Steuer darf nur von berechtigten Rollen genutzt werden.

### R-ROL-005 — Finanzierung
Finanzierungsdaten sind sensibel und benötigen separate Berechtigungslogik.

---

## 19. Audit Logging

### R-AUD-001
Folgende Ereignisse müssen protokolliert werden:
- Login,
- Einladung,
- Annahme/Verfall/Widerruf einer Einladung,
- Anlegen/Bearbeiten/Löschen von Objekten,
- Änderungen an Mietern,
- Änderungen an Ausgaben,
- Änderungen an Finanzierungen,
- Report- und PDF-Erzeugung,
- Steuerexporte,
- Nebenkostenabrechnung-Erzeugung,
- Rollenänderungen.

### R-AUD-002
Das Audit Log muss mindestens enthalten:
- user,
- timestamp,
- action,
- entity type,
- entity id,
- before/after where applicable.

---

## 20. Datenmodell — Pflichtentitäten

Mindestens erforderliche Entitäten:
- `User`
- `Role`
- `Property`
- `Unit`
- `PropertyMembership`
- `PropertyInvitation`
- `Tenant`
- `Lease`
- `Charge`
- `Payment`
- `Expense`
- `ExpenseCategory`
- `ExpenseCostType`
- `Financing`
- `FinancingScheduleEntry`
- `UtilityStatement`
- `UtilityStatementLine`
- `TaxYear`
- `TaxExport`
- `TaxCategoryMapping`
- `Report`
- `ReportViewDefinition`
- `Document`
- `AuditLog`
- `ModuleRegistry`
- `SystemSetting`

### Datenregeln
- Tabellen- und Spaltennamen ausschließlich auf Englisch.
- Zeitstempel in UTC speichern.
- Businesskritische Datensätze bevorzugt soft-delete oder auditierbar versionieren.
- Finanzierung ist immer einem Objekt zugeordnet.
- Nebenkostenabrechnung ist immer einem Mieter und Objekt zugeordnet.
- Steuerexport ist immer Objekt + Steuerjahr zugeordnet.

---

## 21. Supabase-spezifische Anforderungen

### R-SUPA-001
Supabase Auth wird für Identität verwendet.

### R-SUPA-002
Business Permissions dürfen nicht nur aus Auth abgeleitet werden; PropertyMemberships und Rollenlogik sind zusätzlich erforderlich.

### R-SUPA-003
Supabase PostgreSQL ist die primäre Datenbank.

### R-SUPA-004
RLS kann eingesetzt werden, wo sinnvoll, ersetzt aber nicht die fachliche Berechtigungslogik.

### R-SUPA-005
Supabase muss self-hosted betrieben werden, ohne Abhängigkeit zu Supabase Cloud. [web:48][web:51]

---

## 22. UI / UX Anforderungen

### R-UI-001 — Stil
Das UI muss schlicht und technisch wirken.

### R-UI-002 — Effizienz
Bearbeitungsgeschwindigkeit ist wichtiger als dekoratives Design.

### R-UI-003 — Tabellenfokus
Kernbereiche wie Ausgaben, Finanzierung, Steuer und Reporting müssen stark tabellenorientiert sein.

### R-UI-004 — Low-click workflows
Wichtige Aktionen müssen in möglichst wenigen Klicks erreichbar sein.

### R-UI-005 — Filter und Bulk Actions
Listenansichten benötigen:
- Filter,
- Sortierung,
- Suche,
- Bulk Actions,
- gespeicherte Ansichten optional post-MVP.

### R-UI-006 — Konsistenz
Filter, Tabellen, Formulare und Exportaktionen müssen sich in allen Modulen gleich verhalten.

### R-UI-007 — Reporting Workflow
Cash-/Tax-Umschaltung, Zeitraum, Objekt und Export müssen ohne unnötige Zwischenschritte bedienbar sein.

---

## 23. API-Anforderungen

### R-API-001
Alle Endpunkte und Payloads sind in Englisch zu definieren.

### R-API-002
Pflichtdomänen:
- auth
- users
- properties
- memberships
- invitations
- tenants
- leases
- charges
- payments
- expenses
- financing
- utilities-statements
- reports
- tax
- documents
- audit
- settings

### R-API-003
List endpoints müssen Pagination, Filtering und Sorting unterstützen.

### R-API-004
Exportendpunkte müssen asynchrones Job-Handling unterstützen, wenn die Generierung länger dauert.

---

## 24. Nichtfunktionale Anforderungen

### Performance
- Initial load unter 3 Sekunden auf typischem SMB-Server.
- API p95 unter 500 ms für Standardlisten.
- PDF-Generierung unter 10 Sekunden für Standardreports.
- Steuerexport unter 15 Sekunden für ein einzelnes Objektjahr.

### Reliability
- Clean restart nach Server-Reboot.
- Migrations deterministisch.
- Backups regelmäßig.
- Restore dokumentiert und testbar.

### Security
- TLS in Transit.
- Secrets nicht im Repository.
- 2FA für privilegierte Rollen.
- Auditierbare Exporte.

### Operations
- Ubuntu Server ist offizielle Zielplattform.
- Docker Compose Deployment Assets müssen mitgeliefert werden.
- Backup- und Restore-Runbook verpflichtend.

---

## 25. Ubuntu Deployment Requirements

### R-DEP-001
Das offizielle Installationsziel ist Ubuntu Server.

### R-DEP-002
Mitgeliefert werden müssen:
- Docker Compose Files,
- `.env.example`,
- Installationsanleitung,
- Reverse-Proxy-Beispiel,
- Backup-Anleitung,
- Restore-Anleitung,
- Upgrade-Anleitung.

### R-DEP-003
Die Installationsdokumentation muss mindestens Ubuntu 22.04 LTS oder 24.04 LTS abdecken. [web:48][web:52]

### R-DEP-004
Die Anwendung muss auf einem frisch vorbereiteten Ubuntu-Server mit dokumentierten Voraussetzungen deploybar sein.

---

## 26. Akzeptanztest-Format für KI-Agenten

Alle abgeleiteten Implementierungsaufgaben sollen folgendes Format verwenden:

```text
Requirement ID: R-XXX-001
Scenario: <short name>
GIVEN <initial state>
WHEN <action>
THEN the system SHALL <expected behavior>
AND <additional behavior>
```

### Beispiel
```text
Requirement ID: R-FIN-004
Scenario: Remaining term visible
GIVEN a financing with stored principal, start date, repayment start and schedule
WHEN the financing detail page is opened
THEN the system SHALL display the remaining term
AND the system SHALL display the current remaining balance
```

---

## 27. Repository-Struktur für KI-Umsetzung

Die Implementierung soll mindestens folgende Dateien/Ordner pflegen:
- `docs/requirements.md`
- `docs/architecture.md`
- `docs/data-model.md`
- `docs/api.md`
- `docs/plan.md`
- `docs/tasks.md`
- `docs/runbook.md`
- `CLAUDE.md` oder äquivalente Agent-Instruction-Datei

### Pflichtinhalte von `CLAUDE.md`
- Stackdefinition
- Sprachregel: UI Deutsch, Code Englisch
- Test- und Lint-Kommandos
- Migrationsworkflow
- Requirement Traceability
- Regel: kein Task ohne Tests und Docs als erledigt markieren

---

## 28. Open Questions

| ID | Question | Status |
|---|---|---|
| OQ-001 | Soll OCR für Belege im MVP verpflichtend aktiviert sein oder per Feature Flag? | Open |
| OQ-002 | Soll neben CSV bereits im MVP ein XML-nahes Exportformat für Elster erzeugt werden? | Open |
| OQ-003 | Wie detailliert soll die steuerliche Mapping-Tabelle im MVP ausfallen? | Open |
| OQ-004 | Soll Tilgung aus Rate + Zinssatz berechnet oder manuell gepflegt werden können? | Open |
| OQ-005 | Werden Sondertilgungen bereits im MVP benötigt? | Open |
| OQ-006 | Welche Property-Role darf Nebenkostenabrechnungen final freigeben? | Open |
| OQ-007 | Sollen Investitionskosten in der Tax-Sicht separat nach Modernisierung vs. Erhaltungsaufwand klassifiziert werden? | Open |

---

## 29. Definition of Done

Ein Feature gilt nur dann als fertig, wenn:
- die zugehörigen Requirements umgesetzt sind,
- Tests vorhanden und grün sind,
- UI-Texte auf Deutsch vorliegen,
- technischer Code auf Englisch vorliegt,
- Rechteprüfung implementiert ist,
- Auditierbarkeit berücksichtigt ist,
- Migrations enthalten sind, falls das Datenmodell betroffen ist,
- Doku aktualisiert ist,
- keine TODOs oder Platzhalter im produktiven Code verbleiben.

---

## 30. Delivery Phases

### Phase 1 — Foundation
- Ubuntu deployment
- self-hosted Supabase
- auth
- roles
- memberships
- i18n
- audit log

### Phase 2 — Property core
- properties
- units
- tenants
- leases
- charges/payments

### Phase 3 — Expenses and financing
- expenses
- cost types
- financing
- schedules
- core reporting integration

### Phase 4 — Utilities and tax
- utilities statement
- tax module
- Elster preparation exports

### Phase 5 — Hardening
- advanced reporting
- restore drills
- security review
- performance optimization

---

*PropControl PRD — Complete Revised Version — 2026-04-05*
