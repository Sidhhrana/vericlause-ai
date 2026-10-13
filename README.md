# 🛡️ VeriClause AI — Intelligent Document Forensics & Risk Engine

An autonomous, production-grade legal forensic platform for **Intelligent Business Document Analysis** (Contracts, Master Service Agreements, Commercial Leases, and Vendor Invoices).

Engineered with a restrained, high-contrast B2B SaaS aesthetic (**Monopo Saigon & Apple HIG** design language) focusing on instant local execution, client-side zero-leak privacy, and bidirectional spatial grounding.

---

## ⚡ Instant Launch

Open directly in your browser with zero setup:

```bash
# On macOS:
open index.html

# Or run with Python local server:
python3 -m http.server 3000
# Then open: http://localhost:3000
```

---

## 🧠 Core System Capabilities

### 1. 📄 Multi-Format Client-Side Document Ingestion
- **PDF Vector Extraction:** Parses full-length PDF contracts page-by-page using embedded `PDF.js` with structural heading and section reconstruction.
- **Word DOCX Ingestion:** Parses `.docx` files using `Mammoth` preserving semantic hierarchy.
- **Plain Text & Markdown:** Direct drag-and-drop or raw clause snippet paste with live parsing.
- **100% Client-Side Privacy:** No contract data ever leaves the local machine.

### 2. 🔍 Autonomous Forensic Rule & Semantic Engine (`forensics.js`)
- **Predatory Lock-In Forensics:** Detects evergreen traps, narrow notice windows (e.g. 90-day certified courier requirements), multi-year extensions (24 months), and compound price escalation upon renewal.
- **Compounding & Punitive Fee Auditor:** Flags usurious late fees (>1.5%/month or 18% APR) compounding monthly with zero grace periods.
- **Asymmetric Liability & Indemnity Shifts:** Flags one-sided hold-harmless provisions where the vendor caps liability at 1 month trailing fees while leaving the customer uncapped.
- **Missing Protective Shields (Omission Scanner):** Audits what is *absent* from the contract (missing Supplier IP Indemnity, absent 72-hour Data Breach SLA, missing Transition/Offboarding Assistance).
- **Commercial Lease Forensics:** Detects predatory compounding base-rent escalations (e.g. 8.5%) and shifts of capital expenditures (HVAC, structural repairs) into tenant CAM expenses.

### 3. ⚖️ Cross-Document Invoice vs Contract Reconciliation
- Cross-audits vendor invoices against Master Service Agreement fee schedules (Section 4.1).
- Detects silent rate creep (e.g., **+$30/hr unauthorized rate discrepancy**) and unapproved emergency surcharges (**$1,200 fee**).
- Computes exact cumulative overcharge totals in real time.

### 4. ✏️ Interactive In-Place Redlining & Live Remediation
- Click **Apply Redline** on any finding card to apply balanced enterprise amendments directly to the document canvas.
- Original predatory text is rendered with strikethrough redline styling; balanced terms are inserted in green.
- Bounding boxes transition into a verified green state (`box-resolved`).
- The **Health Score dynamically increases** (+18 pts per resolution), and financial exposure decreases in real time.
- Full "Undo Redline" toggle support.

### 5. 🤖 "Ask VeriClause" AI Assistant Copilot
- Natural language command bar embedded in the Audit Studio.
- Query contract provisions: *"What is the notice deadline?"*, *"Is liability capped?"*, *"What are the late payment terms?"*.
- Instant grounded semantic retrieval with direct section citations, jump-to-clause links, and recommended counter-clauses.

### 6. 📅 Autonomous Notice Calendar Sync (.ics RFC 5545)
- Evaluates contract commencement and duration, computing the exact termination cutoff date.
- One-click RFC 5545 standard `.ics` download for Apple Calendar, Google Calendar, and Microsoft Outlook with dual pre-deadline reminder alarms (14 days and 7 days prior).

### 7. 📑 Executive Audit Dossier Export (.md & Print)
- One-click export of a comprehensive forensic dossier in Markdown (`.md`) format, complete with Executive Health Scorecards, Risk Classifications, Anomaly Tables, and Negotiation Redline Scripts.

---

## 📁 Project Architecture

```
├── index.html          # Semantic HTML5 layout, Apple segmented controls & modal tabs
├── styles.css          # Monopo Saigon & Apple HIG design system with glass effects
├── app.js              # State management, reactive rendering & real-time redlining
├── forensics.js        # Core Forensic Engine: multi-pass heuristic & statutory logic
├── vendor/             # Local offline client-side extraction libraries
│   ├── pdf.min.js      # Mozilla PDF.js vector parser
│   ├── pdf.worker.min.js
│   └── mammoth.min.js  # Mammoth DOCX extractor
├── samples/            # Test contracts for instant drag-and-drop verification
│   ├── CloudScale_Master_Services_Agreement.pdf
│   ├── MetroCommercial_Lease_Agreement.pdf
│   └── AcmeCorp_Vendor_Invoice_INV-904.pdf
└── README.md           # Platform documentation
```

---

*VeriClause AI • Meticulous Review, Guaranteed Precision*
