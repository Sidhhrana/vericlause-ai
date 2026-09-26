# 🛡️ VeriClause AI — Minimalist Document Risk & Traceability Prototype

A fast, zero-dependency, production-styled prototype for **Problem Statement #1 (Intelligent Business Document Analysis)**.

Built with a restrained, modern B2B SaaS aesthetic (Linear / Vercel style) focusing on high performance, readable typography, and bidirectional document grounding.

---

## ⚡ Quick Launch (Instant)

Open the app directly in your browser:

```bash
# On macOS:
open index.html

# Or run with Python local server:
python3 -m http.server 3000
# Then open: http://localhost:3000
```

---

## 🚀 Key Features Implemented in the Prototype

1. **Bidirectional Grounded Traceability:**
   - Click any alert card in the right pane &rarr; the document canvas instantly glides to the clause and highlights it with an animated, glowing bounding box.
   - Click any bounding box on the document &rarr; highlights the corresponding intelligence card.

2. **The "Plain English" (ELI5) vs. "Legal View" Toggle:**
   - Switch between direct, non-legalese explanations (e.g., *"If someone sues them, you pay their legal bills"*) and formal legal risk citations.

3. **Cross-Document Invoice Reconciliation (Invoice vs. Contract):**
   - Switch the document dropdown to `Invoice_INV-892.pdf`.
   - Cross-audits the invoice against Master Agreement Section 4.1, flagging an unauthorized **+$30/hr rate discrepancy** and a **$1,200 unapproved surcharge**.

4. **1-Click Counter-Clause & Pushback Email Generator:**
   - Click `Counter-Clause` on any card to view balanced standard amendment language and a pre-drafted negotiation email ready to copy.

5. **Autonomous Notice Calendar Sync:**
   - On deadline cards (like the 90-day auto-renewal notice on Aug 16, 2026), click `Add to Calendar` to automatically download a valid `.ics` calendar reminder.

6. **Missing-Clause / Omission Scanner:**
   - Flags critical legal shields omitted from the document (e.g., missing Supplier IP Indemnification).

7. **Custom Text / Clause Audit:**
   - Click `Upload New` to paste any raw clause and see it parsed into the audit stream.

---

## 📁 Project Structure

```
├── index.html        # Clean, accessible semantic HTML5 layout
├── styles.css        # High-contrast, optimized CSS variables & subtle typography
├── app.js            # Reactive state management, bidirectional trace engine, and export
└── README.md         # Documentation & guide
```
