/**
 * SENTINEL AUDIT (VeriClause Engine)
 * High-Precision Document Risk, Audit & Traceability Engine
 * Metallic Grayscale Palette & Realistic Long-Form Contracts
 */

const DB = {
  msa: {
    title: "CloudScale_MSA_2026.pdf",
    pageInfo: "Page 14 of 38",
    score: 54,
    riskLevel: "Critical Risk",
    exposure: "$185,000+",
    deadline: "Aug 16, 2026",
    missingCount: "2 Missing",
    rawText: `MASTER SERVICES & CLOUD INFRASTRUCTURE AGREEMENT
Effective Date: November 15, 2025   Doc Ref: CS-MSA-2026-V4
This Master Services Agreement is entered into by and between CloudScale Infrastructure Technologies LLC (Vendor) and Apex Global Enterprise Corp. (Client).

SECTION 1: SCOPE OF SERVICES
1.1 SOW Execution: Vendor shall provide services described in mutually executed Statements of Work referencing this Agreement.
1.2 Change Orders: Any modification to the scope, timing, or deliverables shall be documented in a written Change Order signed by authorized procurement representatives.

SECTION 2: SERVICE LEVEL AGREEMENT & UPTIME COMMITMENT
2.1 Availability: Vendor covenants that the core compute and database clusters shall maintain monthly Service Level Availability of 99.95%.

SECTION 4: FEES, INVOICING & PAYMENT TERMS
4.1 Standard Net-30 Invoicing: Client shall remit payment for undisputed invoices within thirty (30) calendar days. Senior technical advisory rates are fixed at $95.00/hr.
4.2 Late Penalties: In the event any invoice balance remains unpaid past the thirty (30) day window, such delinquent balance shall automatically accrue interest compounding at the rate of 18.5% per month, payable immediately upon demand without requirement of prior cure notice or grace period.

SECTION 8: TERM, RENEWAL & TERMINATION
8.1 Initial Term: Commencing November 15, 2025 for a period of twelve (12) consecutive months.
8.2 Termination for Material Breach: Either party may terminate upon thirty (30) days written notice if the other party materially breaches.
8.3 Automatic Extension: Unless Client tenders formal written notice of non-renewal via certified registered courier strictly no less than ninety (90) calendar days prior to expiration of the Initial Term (Strict Notice Cutoff: August 16, 2026), this Agreement shall irrevocably renew for an additional twenty-four (24) months subject to a mandatory 15% rate escalation across all compute line items.

SECTION 12: LIMITATION OF REMEDIES & LIABILITY
12.1 Liability Thresholds: Vendor cumulative aggregate liability shall be strictly capped at the total fees received in the immediately preceding one (1) month ($15,000 max). Conversely, Client agrees that its indemnification exposure and liability shall remain wholly uncapped, without waiver or exclusion of incidental or consequential damages.

SECTION 13: GOVERNING LAW & JURISDICTION
13.1 Choice of Law: This Agreement shall be construed and enforced in accordance with the substantive laws of the State of Delaware.`,
    docHtml: `
      <div style="font-family: var(--font-mono); font-size: 11px; color: var(--metallic-silver); margin-bottom: 24px; border-bottom: 1px solid var(--steel-gray); padding-bottom: 8px; display: flex; justify-content: space-between;">
        <span>CONFIDENTIAL // MASTER SERVICES AGREEMENT</span>
        <span>DOC REF: CS-MSA-2026-V4.2</span>
      </div>

      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-family: var(--font-display); font-size: 18px; font-weight: 700; color: #0f172a; letter-spacing: -0.01em; margin-bottom: 6px;">MASTER SERVICES & CLOUD INFRASTRUCTURE AGREEMENT</h1>
        <p style="font-size: 12px; color: var(--metallic-silver);">Effective Date: November 15, 2025 &bull; Execution Copy</p>
      </div>

      <p style="margin-bottom: 14px; font-size: 13px; color: #334155; line-height: 1.7;">
        This Master Services Agreement ("<strong>Agreement</strong>") is entered into by and between <strong>CloudScale Infrastructure Technologies LLC</strong>, a Delaware limited liability company with principal offices at 500 Howard Street, San Francisco, CA ("<strong>Vendor</strong>"), and <strong>Apex Global Enterprise Corp.</strong> ("<strong>Client</strong>").
      </p>

      <h2>RECITALS</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        <strong>WHEREAS</strong>, Vendor provides enterprise cloud hosting, distributed computing clusters, and high-availability managed infrastructure services; and<br>
        <strong>WHEREAS</strong>, Client desires to retain Vendor to perform infrastructure orchestration, managed database failover, and technical advisory services as specified in one or more mutually executed Statements of Work ("SOW").
      </p>

      <h2>SECTION 1: SCOPE OF SERVICES & SOW STRUCTURE</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        1.1 SOW Execution: Vendor shall provide services described in each executed SOW. Each SOW shall reference this Agreement and specify project milestones, deliverables, service level benchmarks, and applicable fee schedules.
      </p>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        1.2 Change Orders: Any modification to the scope, timing, or deliverables shall be documented in a written Change Order signed by authorized procurement representatives of both parties prior to commencement.
      </p>

      <h2>SECTION 2: SERVICE LEVEL AGREEMENT & UPTIME COMMITMENT</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        2.1 Availability: Vendor covenants that the core compute and database clusters shall maintain a monthly Service Level Availability of not less than ninety-nine and ninety-five hundredths percent (99.95%), excluding scheduled maintenance.
      </p>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        2.2 SLA Remedies: If Vendor fails to achieve the SLA target during any calendar month, Client shall be entitled to receive service credits calculated according to the Tiered SLA Credit Schedule set forth in Exhibit B.
      </p>

      <h2>SECTION 3: CLIENT OBLIGATIONS & SECURITY PROTOCOLS</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        3.1 Credential Management: Client shall maintain strict access controls over administrative IAM roles and API keys. Client shall immediately notify Vendor upon discovery of any credential compromise.
      </p>

      <h2>SECTION 4: FEES, INVOICING & PAYMENT TERMS</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        4.1 Standard Net-30 Invoicing: Client shall remit payment for undisputed invoices within thirty (30) calendar days from receipt of a verifiable invoice submitted through Client's designated accounts payable portal.
      </p>

      <!-- FLAGGED CLAUSE: LATE FEE TRAP -->
      <div class="bounding-box box-warning" id="bbox-latefee" onclick="selectFinding('latefee')">
        <span class="box-tag badge-warning">Section 4.2 &bull; Financial Anomaly</span>
        <p style="color: #0f172a; font-size: 13.5px; line-height: 1.65;">
          <strong>4.2 Late Penalties:</strong> In the event any invoice balance remains unpaid past the thirty (30) day window, such delinquent balance shall automatically accrue interest compounding at the rate of <mark style="background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px; border: 1px solid #fde68a;">18.5% per month</mark> (or the maximum statutory rate allowable), payable immediately upon demand without requirement of prior cure notice or grace period.
        </p>
      </div>

      <h2>SECTION 5: INTELLECTUAL PROPERTY RIGHTS</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        5.1 Pre-Existing Materials: Each party retains sole and exclusive ownership of its pre-existing intellectual property, proprietary tools, frameworks, and background technology.
      </p>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        5.2 Deliverables: Subject to full payment of applicable fees, Client shall own all custom scripts, architecture diagrams, and configurations specifically created for Client under an executed SOW as works made for hire.
      </p>

      <h2>SECTION 6: CONFIDENTIALITY & NON-DISCLOSURE</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        6.1 Duty of Care: Each party agrees to protect the other party's Confidential Information with the same degree of care it exercises for its own proprietary information of like nature, but not less than reasonable care, for a period of three (3) years.
      </p>

      <h2>SECTION 7: DATA PRIVACY & CYBERSECURITY SAFEGUARDS</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        7.1 Security Controls: Vendor maintains SOC 2 Type II certification and implements industry-standard administrative, physical, and technical safeguards, including AES-256 encryption for data at rest and TLS 1.3 for data in transit.
      </p>

      <h2>SECTION 8: TERM, RENEWAL & TERMINATION</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        8.1 Initial Term: This Agreement shall commence on November 15, 2025 and continue in full force for twelve (12) consecutive months ("Initial Term").
      </p>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        8.2 Termination for Material Breach: Either party may terminate upon thirty (30) days written notice if the other party materially breaches any provision and fails to cure within such period.
      </p>

      <!-- FLAGGED CLAUSE: AUTO RENEWAL LOCK-IN -->
      <div class="bounding-box box-danger" id="bbox-renewal" onclick="selectFinding('renewal')">
        <span class="box-tag badge-danger">Section 8.3 &bull; Auto-Renewal Trap</span>
        <p style="color: #0f172a; font-size: 13.5px; line-height: 1.65;">
          <strong>8.3 Automatic Extension:</strong> Unless Client tenders formal written notice of non-renewal via certified registered courier strictly no less than <mark style="background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px; border: 1px solid #fecaca;">ninety (90) calendar days prior</mark> to the expiration of the Initial Term (Strict Notice Cutoff: <strong>August 16, 2026</strong>), this Agreement shall irrevocably renew for an additional <mark style="background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px; border: 1px solid #fecaca;">twenty-four (24) months</mark> subject to a mandatory 15% rate escalation across all compute line items.
        </p>
      </div>

      <h2>SECTION 9: REPRESENTATIONS & WARRANTIES</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        9.1 Mutual Authority: Each party represents that it possesses the requisite corporate power and authority to enter into and perform its obligations under this Agreement.
      </p>

      <!-- FLAGGED OMISSION: MISSING IP WARRANTY -->
      <div class="bounding-box box-missing" id="bbox-missing" onclick="selectFinding('missing')">
        <span class="box-tag badge-danger">Omission &bull; Missing IP Warranty</span>
        <div style="font-weight: 600; color: #dc2626; margin-bottom: 4px; font-size: 13px;">
          Missing Supplier IP Infringement Defense Obligation
        </div>
        <p style="font-size: 12.5px; color: var(--metallic-silver); line-height: 1.6;">
          Standard enterprise SaaS agreements require the Vendor to defend, indemnify, and hold harmless the Client against third-party patent, copyright, or trade secret infringement claims. This agreement completely lacks an IP indemnity clause, exposing Client to direct legal liability if CloudScale's proprietary software infringes third-party IP.
        </p>
      </div>

      <h2>SECTION 10: FORCE MAJEURE</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        10.1 Excusable Delay: Neither party shall be liable for performance failures resulting from acts of God, flood, war, civil disturbance, regional grid outage, or governmental embargo beyond reasonable control.
      </p>

      <h2>SECTION 11: DISPUTE RESOLUTION & ARBITRATION</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        11.1 Good-Faith Escalation: The parties shall first attempt to resolve disputes through executive conferences between VP-level officers for a period of fifteen (15) business days before initiating formal arbitration.
      </p>

      <h2>SECTION 12: LIMITATION OF REMEDIES & LIABILITY</h2>
      <!-- FLAGGED CLAUSE: ASYMMETRIC LIABILITY -->
      <div class="bounding-box box-danger" id="bbox-liability" onclick="selectFinding('liability')">
        <span class="box-tag badge-danger">Section 12.1 &bull; Asymmetric Liability Cap</span>
        <p style="color: #0f172a; font-size: 13.5px; line-height: 1.65;">
          <strong>12.1 Liability Thresholds:</strong> Vendor's cumulative aggregate liability arising under contract, tort, or warranty shall be strictly capped at the total fees received in the immediately preceding one (1) month ($15,000 max). Conversely, <mark style="background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px; border: 1px solid #fecaca;">Client agrees that its indemnification exposure and liability shall remain wholly uncapped</mark>, without waiver or exclusion of incidental, consequential, or exemplary damages.
        </p>
      </div>

      <h2>SECTION 13: GOVERNING LAW & JURISDICTION</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        13.1 Choice of Law: This Agreement shall be construed and enforced in accordance with the substantive laws of the State of Delaware, without regard to conflict of laws principles.
      </p>

      <h2>SECTION 14: MISCELLANEOUS & INTEGRATION</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        14.1 Entire Agreement: This Agreement, together with all executed SOWs and Exhibits, constitutes the entire understanding between the parties and supersedes all prior verbal or written negotiations, proposals, or representations.
      </p>

      <div style="margin-top: 36px; padding-top: 24px; border-top: 1px solid #e2e8f0; display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
        <div>
          <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 24px;">For Vendor: CloudScale Technologies LLC</div>
          <div style="border-bottom: 1px solid #cbd5e1; height: 1px; margin-bottom: 6px;"></div>
          <div style="font-size: 11px; color: #64748b;">Authorized Signatory &bull; Date</div>
        </div>
        <div>
          <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 24px;">For Client: Apex Global Enterprise Corp.</div>
          <div style="border-bottom: 1px solid #cbd5e1; height: 1px; margin-bottom: 6px;"></div>
          <div style="font-size: 11px; color: #64748b;">Authorized Signatory &bull; Date</div>
        </div>
      </div>
    `,
    findings: [
      {
        id: "renewal",
        category: "deadline",
        severity: "danger",
        badge: "Critical Deadline",
        section: "Section 8.3",
        page: "Page 14",
        title: "24-Month Automatic Lock-in Trap",
        plainDesc: "You must send written cancellation notice by August 16, 2026. If you miss this date, you are legally locked into paying for 2 more full years at 15% higher prices.",
        legalDesc: "Mandatory 90-day pre-expiration notice required to prevent consecutive 24-month automatic renewal with non-negotiable 15% compounding rate escalation.",
        impact: "Est. Financial Lock-In: $96,000",
        actionText: "Notice Deadline: Aug 16, 2026",
        counterClause: "Either party may terminate this Agreement at the conclusion of the Initial Term by providing thirty (30) days prior written notice via electronic mail, without penalty or fee escalation.",
        emailDraft: "Hi Team,\n\nWe are reviewing Section 8.3 of the MSA. A 90-day courier notice and 24-month automatic extension is outside our company policy. We request changing this to standard 30-day notice with mutual termination rights as per our attached redline.\n\nBest regards,\nProcurement Team"
      },
      {
        id: "latefee",
        category: "financial",
        severity: "warning",
        badge: "Financial Anomaly",
        section: "Section 4.2",
        page: "Page 14",
        title: "Compounding Late Fee (18.5% Monthly)",
        plainDesc: "If an invoice is late, they charge 18.5% interest compounding every month (~222% annualized). Standard commercial rate is only 1.5% simple monthly interest.",
        legalDesc: "Compounding late payment interest rate of 18.5% monthly exceeds standard commercial benchmarks (typically 1.5% monthly simple interest) and lacks cure period notice.",
        impact: "Excess Exposure: ~$14,200 on 60-day lag",
        actionText: "Benchmark: 1.5% Simple Interest",
        counterClause: "Late payments shall accrue simple interest at the rate of 1.5% per month (or the statutory maximum), commencing only after thirty (30) days written notice of cure.",
        emailDraft: "Hi Team,\n\nOur compliance audit flagged the 18.5% compounding late fee in Section 4.2. Industry standard is 1.5% simple monthly interest with a 30-day cure period. Please accept our redline amendment to Section 4.2.\n\nThank you."
      },
      {
        id: "missing",
        category: "missing",
        severity: "danger",
        badge: "Missing Protection",
        section: "Section 9 & 10",
        page: "Page 14",
        title: "Missing Supplier IP Indemnity Shield",
        plainDesc: "If a third party sues alleging CloudScale's software infringes their patent or copyright, CloudScale does not have to defend you or pay legal fees.",
        legalDesc: "Total absence of express Supplier IP Infringement Indemnification leaves Client directly exposed to third-party intellectual property litigation without vendor defense obligations.",
        impact: "Unmitigated Third-Party IP Liability",
        actionText: "Remediation: Insert Standard IP Warranty",
        counterClause: "Vendor shall defend, indemnify, and hold harmless Client against any claims, damages, or costs arising out of any allegation that the Services or Deliverables infringe any third-party patent, copyright, or trademark.",
        emailDraft: "Hi Legal Team,\n\nOur contract review noted the omission of standard Supplier IP Indemnification in Section 9. Our enterprise governance requires reciprocal IP defense language. Please incorporate the attached standard defense clause."
      },
      {
        id: "liability",
        category: "financial",
        severity: "danger",
        badge: "Liability Gap",
        section: "Section 12.1",
        page: "Page 14",
        title: "Asymmetric Uncapped Liability Risk",
        plainDesc: "If they cause damage, they only pay up to 1 month of fees (~$15k). If you breach, your liability is 100% uncapped with no limit.",
        legalDesc: "Gross asymmetry in limitation of liability: Vendor cap is tied to 1 month trailing fees ($15,000 maximum), while Client indemnification liability is entirely uncapped without consequential damage exclusions.",
        impact: "Uncapped Consequential Damages Exposure",
        actionText: "Remediation: Mutual Cap (12 Months)",
        counterClause: "Except for breaches of confidentiality or willful misconduct, each party's aggregate liability under this Agreement shall be limited to the total fees paid or payable by Client in the preceding twelve (12) months.",
        emailDraft: "Hi CloudScale Team,\n\nSection 12.1 establishes an asymmetric 1-month liability cap for Vendor while leaving Client liability uncapped. We require a mutual cap equal to 12 months trailing fees, with mutual exclusion of consequential damages."
      }
    ]
  },

  invoice: {
    title: "Invoice_INV-892.pdf",
    pageInfo: "Page 1 of 2",
    score: 41,
    riskLevel: "High Discrepancy",
    exposure: "$6,000 Overcharge",
    deadline: "Payment Due: 14 Days",
    missingCount: "2 Overbills",
    rawText: `INVOICE #INV-2026-892
Vendor: CloudScale Infrastructure Technologies LLC (500 Howard Street, San Francisco, CA)
Billed To: Apex Global Enterprise Corp. (PO Reference: PO-89421)
Billing Period: October 01 - October 31, 2026   Due: Net 30 Days

Line Item 01: Dedicated Compute Instances (c6i.8xlarge): 720 Hours @ $10.00/hr = $7,200.00
Line Item 02: Senior Cloud Architect Consultation: 160.00 Hours billed at $125.00/Hour = $20,000.00
(Reference: Master Services Agreement CS-MSA-2026 §4.1 specifies approved rate cap of $95.00/Hour)
Line Item 03: Dedicated Transit Gateway & VPC Peering: Monthly Fee = $1,400.00
Line Item 04: Managed PostgreSQL Storage & IOPS: 1,200 GB = $2,600.00
Line Item 05: Infrastructure Expedited Handling Surcharge: Flat Fee $1,200.00
(Note: SOW #2 §3 prohibits auxiliary administrative fees without prior written Change Order)

Gross Billed Total: $21,200.00
Total Overcharge Identified: -$6,000.00
Legitimate Payable: $15,200.00`,
    docHtml: `
      <div style="font-family: var(--font-mono); font-size: 11px; color: var(--metallic-silver); margin-bottom: 24px; border-bottom: 1px solid var(--steel-gray); padding-bottom: 8px; display: flex; justify-content: space-between;">
        <span>VENDOR BILLING RECONCILIATION // INVOICE #INV-2026-892</span>
        <span>AUDIT MATCH: CS-MSA-2026 §4.1</span>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px;">
        <div>
          <h1 style="font-family: var(--font-display); font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">CloudScale Infrastructure Technologies LLC</h1>
          <p style="font-size: 12px; color: var(--metallic-silver); line-height: 1.5;">
            500 Howard Street, Suite 400<br>
            San Francisco, CA 94105 &bull; Tax ID: XX-XXXX912<br>
            Billing Contact: billing@cloudscale.io
          </p>
        </div>
        <div style="text-align: right; background: rgba(58, 65, 74, 0.35); border: 1px solid var(--steel-gray); border-radius: 8px; padding: 12px 18px;">
          <div style="font-size: 11px; color: var(--metallic-silver); text-transform: uppercase;">Invoice Balance</div>
          <div style="font-family: var(--font-display); font-size: 20px; font-weight: 700; color: #0f172a;">$21,200.00</div>
          <div style="font-size: 11px; color: #dc2626; font-weight: 500;">Due: Net 30 Days</div>
        </div>
      </div>

      <div style="margin-bottom: 20px; font-size: 12.5px; color: #334155;">
        <strong>Billed To:</strong> Apex Global Enterprise Corp. &bull; PO Reference: <strong>PO-89421</strong> &bull; Billing Period: Oct 01 - Oct 31, 2026
      </div>

      <h2>ITEMIZED CHARGES & RATE AUDIT</h2>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12.5px;">
        <thead>
          <tr style="border-bottom: 1px solid var(--steel-gray); color: var(--metallic-silver); text-align: left; font-size: 11px;">
            <th style="padding: 8px 4px;">Item</th>
            <th style="padding: 8px;">Description</th>
            <th style="padding: 8px;">Qty / Hrs</th>
            <th style="padding: 8px; text-align: right;">Billed Rate</th>
            <th style="padding: 8px; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e2e8f0; color: #334155;">
            <td style="padding: 10px 4px;">01</td>
            <td style="padding: 10px 8px;">Dedicated Compute Instances (c6i.8xlarge)</td>
            <td style="padding: 10px 8px;">720 Hrs</td>
            <td style="padding: 10px 8px; text-align: right;">$10.00 / hr</td>
            <td style="padding: 10px 8px; text-align: right; font-weight: 600;">$7,200.00</td>
          </tr>
        </tbody>
      </table>

      <!-- FLAGGED OVERCHARGE: RATE DISCREPANCY -->
      <div class="bounding-box box-danger" id="bbox-ratemismatch" onclick="selectFinding('ratemismatch')">
        <span class="box-tag badge-danger">Line Item 02 &bull; Rate Overcharge</span>
        <p style="color: #0f172a; font-size: 13.5px; line-height: 1.65;">
          <strong>Line Item 02: Senior Cloud Architect Consultation</strong><br>
          160.00 Hours billed at <mark style="background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px; border: 1px solid #fecaca;">$125.00/Hour</mark> = <strong>$20,000.00</strong><br>
          <span style="font-size: 11.5px; color: #dc2626; margin-top: 4px; display: inline-block;">
            Contract Rate Discrepancy: Master Services Agreement CS-MSA-2026 §4.1 specifies approved rate of <strong>$95.00/Hour</strong>. Unauthorized rate escalation: +$30.00/Hour ($4,800.00 overcharge).
          </span>
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12.5px;">
        <tbody>
          <tr style="border-bottom: 1px solid #e2e8f0; color: #334155;">
            <td style="padding: 10px 4px;">03</td>
            <td style="padding: 10px 8px;">Dedicated Transit Gateway & VPC Peering</td>
            <td style="padding: 10px 8px;">Monthly Fee</td>
            <td style="padding: 10px 8px; text-align: right;">$1,400.00</td>
            <td style="padding: 10px 8px; text-align: right; font-weight: 600;">$1,400.00</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0; color: #334155;">
            <td style="padding: 10px 4px;">04</td>
            <td style="padding: 10px 8px;">Managed PostgreSQL Storage & IOPS</td>
            <td style="padding: 10px 8px;">1,200 GB</td>
            <td style="padding: 10px 8px; text-align: right;">$2.16 / GB</td>
            <td style="padding: 10px 8px; text-align: right; font-weight: 600;">$2,600.00</td>
          </tr>
        </tbody>
      </table>

      <!-- FLAGGED SURCHARGE: UNAUTHORIZED FEE -->
      <div class="bounding-box box-warning" id="bbox-surcharge" onclick="selectFinding('surcharge')">
        <span class="box-tag badge-warning">Line Item 05 &bull; Disallowed Fee</span>
        <p style="color: #0f172a; font-size: 13.5px; line-height: 1.65;">
          <strong>Line Item 05: Infrastructure Expedited Handling Surcharge</strong><br>
          Flat Fee <mark style="background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px; border: 1px solid #fde68a;">$1,200.00</mark><br>
          <span style="font-size: 11.5px; color: #d97706; margin-top: 4px; display: inline-block;">
            Reconciliation Note: Statement of Work #2 §3 explicitly prohibits auxiliary administrative handling fees without prior written Change Order authorization.
          </span>
        </p>
      </div>

      <!-- RECONCILIATION SUMMARY MATH -->
      <div style="margin-top: 24px; padding: 16px; background: rgba(58, 65, 74, 0.25); border-radius: 8px; border: 1px solid var(--steel-gray); font-size: 12.5px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: var(--metallic-silver);">Gross Billed Total:</span>
          <span style="font-weight: 600; color: #0f172a;">$21,200.00</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: #dc2626; margin-bottom: 6px;">
          <span>Contract Overcharge Identified:</span>
          <span style="font-weight: 600;">- $6,000.00</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--steel-gray); padding-top: 8px; font-weight: 700; font-size: 14px; color: #0f172a;">
          <span>Validated Legitimate Payable:</span>
          <span style="color: #16a34a;">$15,200.00</span>
        </div>
      </div>
    `,
    findings: [
      {
        id: "ratemismatch",
        category: "invoice",
        severity: "danger",
        badge: "Rate Mismatch",
        section: "Line Item 02 vs MSA §4.1",
        page: "Page 1",
        title: "Unauthorized $30/Hr Rate Escalation",
        plainDesc: "They billed you $125/hr for cloud architect time, but your signed contract says the rate is $95/hr. This is a direct $4,800 overbilling.",
        legalDesc: "Invoice rate of $125.00/hr directly violates Master Services Agreement Section 4.1 rate card, which caps technical advisory services at $95.00/hr.",
        impact: "Direct Cash Leakage: $4,800.00",
        actionText: "Action: Short-pay or request revised credit note",
        counterClause: "In accordance with Master Services Agreement CS-MSA-2026 §4.1, all Senior Cloud Architect hours are payable strictly at $95.00/hr. Total revised line item: $15,200.00.",
        emailDraft: "Hi Accounts Team,\n\nWe received Invoice #INV-2026-892. Line item 02 bills Cloud Architect hours at $125/hr; however, our signed Master Agreement specifies $95/hr. Please re-issue an amended invoice reflecting the contract rate, with a revised total of $15,200.\n\nThank you,\nFinance Department"
      },
      {
        id: "surcharge",
        category: "financial",
        severity: "warning",
        badge: "Unauthorized Surcharge",
        section: "Line Item 05 vs SOW #2",
        page: "Page 1",
        title: "Disallowed Processing Fee ($1,200)",
        plainDesc: "They added a $1,200 'expedited processing fee' that does not exist in your contract. Your agreement states that additional fees must be approved in writing first.",
        legalDesc: "Statement of Work #2 Section 3 prohibits ancillary handling fees unless authorized by an executed Change Order. Line item 05 lacks supporting authorization.",
        impact: "Direct Cash Leakage: $1,200.00",
        actionText: "Action: Disallow surcharge from remittance",
        counterClause: "Pursuant to SOW #2 §3, all auxiliary fees require prior written authorization. Line item 05 is disallowed from the remittance schedule.",
        emailDraft: "Hi Accounts Team,\n\nRegarding the $1,200 processing fee on invoice INV-2026-892: As per SOW #2, auxiliary fees are not approved without prior written consent. We will deduct this sum from our remittance.\n\nBest regards."
      }
    ]
  },

  lease: {
    title: "BostonHQ_Lease_2026.pdf",
    pageInfo: "Page 6 of 22",
    score: 68,
    riskLevel: "Moderate Exposure",
    exposure: "$32,000/yr",
    deadline: "Notice: 120 Days",
    missingCount: "1 Omission",
    rawText: `COMMERCIAL OFFICE BUILDING LEASE AGREEMENT
Landlord: Boston Tower Properties Trust (100 Federal Street, Boston, MA)
Tenant: Apex Global Technologies   Lease ID: BOS-HQ-2026

SECTION 1: DEMISED PREMISES & RENTABLE AREA
1.1 Premises: Entire fourteenth (14th) floor at 100 Federal Street, Boston, Massachusetts, consisting of 18,500 rentable square feet (RSF).

SECTION 2: LEASE TERM & POSSESSION
2.1 Duration: Sixty (60) calendar months, commencing February 01, 2026 and expiring January 31, 2031.

SECTION 3: BASE RENT & PAYMENT SCHEDULE
3.1 Minimum Annual Rent: Monthly installments of $95,583.33 ($62.00 per RSF per annum).

SECTION 4: OPERATING EXPENSES & ESCALATION
4.1 Proportionate Share: Tenant shall pay Tenant's Proportionate Share (4.12%) of Building Operating Expenses.
4.3 Base Rent Escalation & Capital Pass-Through: Base Rent shall automatically compound annually by eight and five-tenths percent (8.5%) on each anniversary without ceiling. Operating Expenses shall include central HVAC chiller replacements, structural retrofits, and roof replacements amortized at Landlord's sole discretion without cap or percentage ceiling, payable by Tenant without independent audit rights.

SECTION 7: SURRENDER & RESTORATION
7.1 Condition at Surrender: Surrender in broom-clean condition, ordinary wear and tear excepted.`,
    docHtml: `
      <div style="font-family: var(--font-mono); font-size: 11px; color: var(--metallic-silver); margin-bottom: 24px; border-bottom: 1px solid var(--steel-gray); padding-bottom: 8px; display: flex; justify-content: space-between;">
        <span>COMMERCIAL OFFICE LEASE AGREEMENT // 100 FEDERAL STREET, BOSTON</span>
        <span>LEASE ID: BOS-HQ-2026</span>
      </div>

      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-family: var(--font-display); font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">COMMERCIAL OFFICE BUILDING LEASE</h1>
        <p style="font-size: 12px; color: var(--metallic-silver);">Landlord: Boston Tower Properties Trust &bull; Tenant: Apex Global Technologies</p>
      </div>

      <h2>SECTION 1: DEMISED PREMISES & RENTABLE AREA</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        1.1 Premises: Landlord hereby leases to Tenant, and Tenant hereby leases from Landlord, the entire fourteenth (14th) floor of the building situated at 100 Federal Street, Boston, Massachusetts, consisting of 18,500 rentable square feet ("RSF").
      </p>

      <h2>SECTION 2: LEASE TERM & POSSESSION</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        2.1 Duration: The term of this Lease shall be sixty (60) calendar months, commencing on February 01, 2026 and expiring on January 31, 2031, unless sooner terminated pursuant to the provisions herein.
      </p>

      <h2>SECTION 3: BASE RENT & PAYMENT SCHEDULE</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        3.1 Minimum Annual Rent: Tenant shall pay Base Rent in equal monthly installments of $95,583.33 ($62.00 per RSF per annum), payable on the first day of each calendar month.
      </p>

      <h2>SECTION 4: OPERATING EXPENSES & ESCALATION</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        4.1 Proportionate Share: Tenant shall pay Tenant's Proportionate Share (4.12%) of the amount by which Building Operating Expenses exceed the Base Year Operating Expenses established for 2026.
      </p>

      <!-- FLAGGED EXPENSE ESCALATION -->
      <div class="bounding-box box-warning" id="bbox-escalation" onclick="selectFinding('escalation')">
        <span class="box-tag badge-warning">Section 4.3 &bull; Uncapped Escalation</span>
        <p style="color: #0f172a; font-size: 13.5px; line-height: 1.65;">
          <strong>4.3 Uncapped Capital Cost Pass-Through:</strong> Operating Expenses shall include all building capital expenditures, structural retrofits, and elevator modernizations <mark style="background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px; border: 1px solid #fde68a;">amortized at Landlord's sole unreviewed discretion without cap or percentage ceiling</mark>, payable by Tenant without independent audit rights.
        </p>
      </div>

      <h2>SECTION 5: UTILITIES, JANITORIAL & ACCESS</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        5.1 Access: Tenant shall enjoy seven-day, twenty-four-hour (24/7) secure keycard access to the Demised Premises, passenger elevators, and building loading docks.
      </p>

      <h2>SECTION 6: QUIET ENJOYMENT & REPAIRS</h2>
      <!-- FLAGGED OMISSION: QUIET ENJOYMENT -->
      <div class="bounding-box box-missing" id="bbox-quiet" onclick="selectFinding('quiet')">
        <span class="box-tag badge-danger">Omission &bull; Missing Quiet Enjoyment</span>
        <div style="font-weight: 600; color: #dc2626; margin-bottom: 4px; font-size: 13px;">
          Missing Covenant of Quiet Enjoyment & Rent Abatement Remedies
        </div>
        <p style="font-size: 12.5px; color: var(--metallic-silver); line-height: 1.6;">
          This commercial lease lacks an express covenant of quiet enjoyment or a landlord repair cure guarantee. If building HVAC, elevators, or electrical systems fail for several consecutive weeks rendering the space untenantable, Tenant has zero contractual rent abatement rights.
        </p>
      </div>

      <h2>SECTION 7: SURRENDER & RESTORATION</h2>
      <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
        7.1 Condition at Surrender: At expiration, Tenant shall surrender the premises in broom-clean condition, ordinary wear and tear and casualty damage excepted.
      </p>
    `,
    findings: [
      {
        id: "escalation",
        category: "financial",
        severity: "warning",
        badge: "Financial Exposure",
        section: "Section 4.3",
        page: "Page 6",
        title: "Uncapped Capital Expense Pass-Through",
        plainDesc: "The landlord can pass on building upgrade costs with zero cap and you are not allowed to audit their accounting.",
        legalDesc: "Uncapped operating expense clause permits landlord to pass through discretionary capital improvements without annual percentage cap or tenant audit verification rights.",
        impact: "Est. Uncapped Exposure: $32,000+/year",
        actionText: "Benchmark: 5% Compounding Cap",
        counterClause: "Controllable Operating Expenses shall not increase by more than five percent (5%) per annum on a cumulative basis. Capital expenditures shall be amortized over useful life in accordance with GAAP, and Tenant shall retain annual CPA audit rights.",
        emailDraft: "Hi Leasing Team,\n\nSection 4.3 currently permits uncapped capital expense pass-throughs. Standard institutional practice requires a 5% cap on controllable expenses and annual tenant audit rights. Please revise as per our redline.\n\nBest regards."
      },
      {
        id: "quiet",
        category: "missing",
        severity: "danger",
        badge: "Missing Shield",
        section: "Section 6",
        page: "Page 6",
        title: "Missing Quiet Enjoyment & Abatement",
        plainDesc: "If the elevators or AC break for a month and you cannot use the office, you still have to pay 100% full rent under this lease.",
        legalDesc: "Absence of standard quiet enjoyment covenant and rent abatement remedies during extended utility or critical building systems disruption.",
        impact: "Severe Operational Continuity Risk",
        actionText: "Remediation: Insert Abatement Covenant",
        counterClause: "Landlord covenants that Tenant shall peaceably and quietly hold and enjoy the Demised Premises. If services are interrupted for more than seventy-two (72) consecutive hours through no fault of Tenant, Base Rent shall abate proportionately until restored.",
        emailDraft: "Hi Leasing Team,\n\nWe noted the absence of a covenant of quiet enjoyment and service interruption rent abatement in Section 6. We require standard 72-hour abatement remedies if the premises become untenantable.\n\nThank you."
      }
    ]
  }
};

const state = {
  currentView: "home", // "home" or "workspace"
  currentDoc: "msa",
  activeFindingId: "renewal",
  mode: "plain", // "plain" or "legal"
  filter: "all",
  appliedRemediations: new Set(),
  activeModalFindingId: null
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  renderDocument();
  renderFindings();
  initFeaturesScroll();

  // URL Hash Routing Support
  function parseAndRouteHash() {
    const rawHash = window.location.hash.replace("#", "");
    const [viewPart, docPart] = rawHash.split(":");
    if (docPart && DB[docPart]) {
      switchDocument(docPart);
    }
    if (viewPart === "upload") {
      showView("landing", false);
      setTimeout(openUploadModal, 150);
    } else if (["landing", "features", "workspace"].includes(viewPart)) {
      showView(viewPart, false);
    } else {
      showView("landing", false);
    }
  }

  parseAndRouteHash();
  window.addEventListener("hashchange", parseAndRouteHash);
});

// View Navigation: 3 Completely Separate Pages
function showView(viewName, updateHash = true) {
  if (viewName === "home") viewName = "landing";
  state.currentView = viewName;

  if (updateHash && window.location.hash !== `#${viewName}`) {
    window.location.hash = viewName;
  }

  const landingPage = document.getElementById("page-landing");
  const featuresPage = document.getElementById("page-features");
  const workspacePage = document.getElementById("page-workspace");

  const navLandingBtn = document.getElementById("nav-landing-btn");
  const navFeaturesBtn = document.getElementById("nav-features-btn");
  const navWorkspaceBtn = document.getElementById("nav-workspace-btn");

  const docPicker = document.getElementById("headerDocPicker");
  const wsOnlyBtns = document.querySelectorAll(".ws-only");

  if (landingPage) landingPage.style.display = "none";
  if (featuresPage) featuresPage.style.display = "none";
  if (workspacePage) workspacePage.style.display = "none";

  if (navLandingBtn) navLandingBtn.classList.remove("active");
  if (navFeaturesBtn) navFeaturesBtn.classList.remove("active");
  if (navWorkspaceBtn) navWorkspaceBtn.classList.remove("active");

  if (viewName === "landing") {
    if (landingPage) landingPage.style.display = "flex";
    if (navLandingBtn) navLandingBtn.classList.add("active");
    if (docPicker) docPicker.style.display = "none";
    wsOnlyBtns.forEach(b => b.style.display = "none");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (viewName === "features") {
    if (featuresPage) featuresPage.style.display = "flex";
    if (navFeaturesBtn) navFeaturesBtn.classList.add("active");
    if (docPicker) docPicker.style.display = "none";
    wsOnlyBtns.forEach(b => b.style.display = "none");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (viewName === "workspace") {
    if (workspacePage) workspacePage.style.display = "flex";
    if (navWorkspaceBtn) navWorkspaceBtn.classList.add("active");
    if (docPicker) docPicker.style.display = "flex";
    wsOnlyBtns.forEach(b => b.style.display = "inline-flex");
    selectFinding(state.activeFindingId);
  }
}

// Features Vertical Scroll Controller
function initFeaturesScroll() {
  const cards = document.querySelectorAll(".feat-card-vertical");
  const subnavPills = document.querySelectorAll(".subnav-pill");
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        subnavPills.forEach(pill => {
          const target = pill.getAttribute("onclick") || "";
          if (target.includes(id)) {
            pill.classList.add("active");
          } else {
            pill.classList.remove("active");
          }
        });
      }
    });
  }, { threshold: 0.35 });

  cards.forEach(card => observer.observe(card));
}

function scrollToFeature(featureId) {
  const el = document.getElementById(featureId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ============================================================================
// PRODUCTION FILE INGESTION PIPELINE (PDF, DOCX, TXT)
// ============================================================================

async function ingestFile(file) {
  if (!file) return;
  closeModal("uploadModal");

  const fileName = file.name;
  const ext = fileName.split(".").pop().toLowerCase();

  showScanOverlay(`Ingesting ${fileName}`, "Extracting text streams & tokenizing clauses...");

  try {
    let extractedText = "";

    updateScanProgress(20, "Extracting binary file content...");

    if (ext === "pdf") {
      updateScanProgress(35, "Parsing PDF vector streams via PDF.js...");
      const arrayBuffer = await file.arrayBuffer();
      extractedText = await extractTextFromPdf(arrayBuffer);
    } else if (ext === "docx") {
      updateScanProgress(35, "Extracting Word DOCX paragraphs via Mammoth...");
      const arrayBuffer = await file.arrayBuffer();
      extractedText = await extractTextFromDocx(arrayBuffer);
    } else {
      updateScanProgress(35, "Reading plain text & markdown streams...");
      extractedText = await file.text();
    }

    if (!extractedText || !extractedText.trim()) {
      throw new Error("Unable to extract text from file. Please ensure the document contains readable text.");
    }

    updateScanProgress(60, "Running multi-pass heuristic & statutory forensics...");
    await new Promise(r => setTimeout(r, 300));

    updateScanProgress(80, "Auditing missing protective shields & liability caps...");
    const analyzedDoc = ForensicEngine.analyzeDocument(extractedText, fileName);

    updateScanProgress(95, "Calculating exposure & spatial visual grounding...");
    await new Promise(r => setTimeout(r, 200));

    // Store in global DB
    DB[fileName] = analyzedDoc;

    // Update Dropdown in Header
    const sel = document.getElementById("docSelector");
    if (sel) {
      let optExists = false;
      for (let i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value === fileName) optExists = true;
      }
      if (!optExists) {
        const opt = document.createElement("option");
        opt.value = fileName;
        opt.textContent = `${fileName} (Live Extracted)`;
        sel.appendChild(opt);
      }
      sel.value = fileName;
    }

    updateScanProgress(100, "Forensic audit complete!");
    await new Promise(r => setTimeout(r, 150));

    hideScanOverlay();
    switchDocument(fileName);
    showView("workspace");

    showAppleToast(`Forensic Audit Complete: ${analyzedDoc.findings.length} findings indexed`, "✓");

  } catch (err) {
    console.error("Ingestion failed:", err);
    hideScanOverlay();
    alert(`Document Ingestion Notice: ${err.message || err}`);
  }
}

async function extractTextFromPdf(arrayBuffer) {
  if (typeof pdfjsLib === "undefined") {
    throw new Error("PDF parser is initializing. Please try again.");
  }
  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "vendor/pdf.worker.min.js";
  }

  let pdfDoc;
  try {
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true
    });
    pdfDoc = await loadingTask.promise;
  } catch (workerErr) {
    console.warn("Primary PDF.js worker load threw, falling back to main thread:", workerErr);
    try {
      if (pdfjsLib.GlobalWorkerOptions) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "";
      }
    } catch (_) {}
    const fallbackTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      disableWorker: true,
      useWorkerFetch: false
    });
    pdfDoc = await fallbackTask.promise;
  }
  const numPages = pdfDoc.numPages;
  let fullText = "";

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const textContent = await page.getTextContent();
    let lastY = null;
    let pageText = "";

    for (const item of textContent.items) {
      if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
        pageText += "\n";
      } else if (pageText && !pageText.endsWith(" ") && !pageText.endsWith("\n")) {
        pageText += " ";
      }
      pageText += item.str;
      lastY = item.transform[5];
    }
    fullText += `\n--- SECTION / PAGE ${i} ---\n` + pageText + "\n";
  }
  return fullText;
}

async function extractTextFromDocx(arrayBuffer) {
  if (typeof mammoth === "undefined") {
    throw new Error("Word DOCX parser is initializing.");
  }
  const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
  return result.value;
}

function handleDropFile(event) {
  event.preventDefault();
  const dt = event.dataTransfer;
  if (dt && dt.files && dt.files.length > 0) {
    ingestFile(dt.files[0]);
  }
}

function handleFileSelected(event) {
  const file = event.target.files && event.target.files[0];
  if (file) {
    ingestFile(file);
  }
}

function showScanOverlay(title, subtitle) {
  const overlay = document.getElementById("scanOverlay");
  const titleEl = document.getElementById("scanTitle");
  const subEl = document.getElementById("scanSubtitle");
  const bar = document.getElementById("scanBarFill");
  const text = document.getElementById("scanStatusText");

  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = subtitle;
  if (bar) bar.style.width = "10%";
  if (text) text.textContent = "Initializing forensic pipeline...";
  if (overlay) overlay.classList.add("visible");
}

function updateScanProgress(percent, message) {
  const bar = document.getElementById("scanBarFill");
  const text = document.getElementById("scanStatusText");
  if (bar) bar.style.width = `${percent}%`;
  if (text && message) text.textContent = message;
}

function hideScanOverlay() {
  const overlay = document.getElementById("scanOverlay");
  if (overlay) overlay.classList.remove("visible");
}

function switchModalTab(tabId, btn) {
  document.querySelectorAll(".modal-nav-tab").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".modal-tab-pane").forEach(p => p.classList.remove("active"));

  if (btn) btn.classList.add("active");
  const target = document.getElementById(tabId);
  if (target) target.classList.add("active");
}

function loadSnippetPreset(type) {
  const input = document.getElementById("pasteSnippetInput");
  if (!input) return;

  const presets = {
    renewal: "8.3 Automatic Extension: Unless Client tenders formal written notice of non-renewal via certified registered courier strictly no less than ninety (90) calendar days prior to expiration, this Agreement shall irrevocably renew for an additional twenty-four (24) months subject to a mandatory 15% rate escalation across all service items.",
    latefee: "4.2 Delinquent Balances: In the event any invoice remains unpaid past thirty (30) days, such delinquent balance shall accrue interest compounding at the rate of 18.5% per month, payable immediately upon demand without requirement of prior cure notice.",
    liability: "12.1 Liability Thresholds: Vendor's cumulative aggregate liability shall be strictly capped at the total fees received in the preceding one (1) month ($15,000 max). Client agrees that its indemnification exposure and liability shall remain wholly uncapped without waiver of incidental or consequential damages.",
    lease: "ARTICLE 4. BASE RENT ESCALATION: Tenant shall pay Base Rent increasing annually by eight and five-tenths percent (8.5%) compounding per annum. Capital replacements including HVAC central chillers shall be charged to Tenant under Operating Expenses."
  };

  input.value = presets[type] || "";
  showAppleToast(`Loaded ${type} test clause`, "ℹ");
}

function processCustomSnippet() {
  const snippet = document.getElementById("pasteSnippetInput").value.trim();
  if (!snippet) {
    alert("Please paste text or a clause snippet to audit.");
    return;
  }

  closeModal("uploadModal");
  showAppleToast("Auditing custom snippet...", "⏳");

  const customDoc = ForensicEngine.analyzeDocument(snippet, "Custom_Clause_Audit.txt");
  DB.custom = customDoc;

  const sel = document.getElementById("docSelector");
  if (sel) {
    let opt = Array.from(sel.options).find(o => o.value === "custom");
    if (!opt) {
      opt = document.createElement("option");
      opt.value = "custom";
      opt.textContent = "Custom_Clause_Audit.txt";
      sel.appendChild(opt);
    }
    sel.value = "custom";
  }

  switchDocument("custom");
  showView("workspace");
  showAppleToast(`Audit Complete: ${customDoc.findings.length} findings identified`, "✓");
}

function runCrossReconciliation() {
  const contractKey = document.getElementById("reconContractSelect")?.value || "msa";
  const invoiceKey = document.getElementById("reconInvoiceSelect")?.value || "invoice";

  const contractDoc = (contractKey === "current" ? DB[state.currentDoc] : DB[contractKey]) || DB.msa;
  const invoiceDoc = DB[invoiceKey] || DB.invoice;

  closeModal("uploadModal");
  showAppleToast("Reconciling Invoice against Contract Fee Schedule...", "⏳");

  const invoiceText = invoiceDoc.rawText || "";
  const contractText = contractDoc.rawText || "";

  const reconDoc = ForensicEngine.createReconciliationDoc(
    invoiceText,
    contractText,
    invoiceDoc.title || "Invoice_INV-892.pdf",
    contractDoc.title || "CloudScale_MSA_2026.pdf"
  );

  DB["reconciliation"] = reconDoc;

  // Update header dropdown
  const sel = document.getElementById("docSelector");
  if (sel) {
    let opt = Array.from(sel.options).find(o => o.value === "reconciliation");
    if (!opt) {
      opt = document.createElement("option");
      opt.value = "reconciliation";
      opt.textContent = `Reconciliation: ${reconDoc.title}`;
      sel.appendChild(opt);
    }
    sel.value = "reconciliation";
  }

  switchDocument("reconciliation");
  showView("workspace");
  showAppleToast(`Reconciliation complete: ${reconDoc.exposure} flagged`, "✓");
}

function scrollToFeatures() {
  showView("features");
}

// Switch Document in Split-Screen Workspace
function switchDocument(docKey) {
  state.currentDoc = docKey;
  const doc = DB[docKey];
  if (!doc) return;

  // Set default active finding
  if (doc.findings && doc.findings.length > 0) {
    state.activeFindingId = doc.findings[0].id;
  } else {
    state.activeFindingId = null;
  }

  // Update dropdown if present
  const docSel = document.getElementById("docSelector");
  if (docSel && docSel.value !== docKey) {
    docSel.value = docKey;
  }

  renderDocument();
  renderFindings();

  // Scroll to first finding
  if (state.activeFindingId) {
    setTimeout(() => selectFinding(state.activeFindingId), 150);
  }
}

// Quick Load from Landing Page or Upload Modal
function quickLoadDoc(docKey) {
  closeModal("uploadModal");
  switchDocument(docKey);
  showView("workspace");
  showAppleToast(`Loaded ${DB[docKey].title}`, "✓");
}

// Render Document Canvas on Left
function renderDocument() {
  const doc = DB[state.currentDoc];
  if (!doc) return;

  if (doc.baseScore === undefined) doc.baseScore = doc.score;
  if (doc.baseExposure === undefined) doc.baseExposure = doc.exposure;
  if (doc.baseRiskLevel === undefined) doc.baseRiskLevel = doc.riskLevel;

  const docTitle = document.getElementById("docTitle");
  const docPageIndicator = document.getElementById("docPageIndicator");
  const docPaper = document.getElementById("docPaper");

  if (docTitle) docTitle.textContent = doc.title;
  if (docPageIndicator) docPageIndicator.textContent = doc.pageInfo;
  if (docPaper) docPaper.innerHTML = doc.docHtml;

  if (!state.appliedRemediations) {
    state.appliedRemediations = new Set();
  }

  // Restore and render in-place applied redlines
  if (doc.findings) {
    doc.findings.forEach(f => {
      if (state.appliedRemediations.has(f.id)) {
        const box = document.getElementById("bbox-" + f.id);
        if (box) {
          box.classList.add("box-resolved");
          const tag = box.querySelector(".box-tag");
          if (tag) {
            tag.className = "box-tag badge-resolved";
            tag.textContent = "✓ Remediated & Balanced";
          }

          if (box.classList.contains("box-missing")) {
            box.style.background = "#f0fdf4";
            box.style.borderColor = "#22c55e";
            const pEl = box.querySelector("p");
            if (pEl && f.counterClause) {
              pEl.innerHTML = `
                <div style="margin-bottom: 6px; padding: 8px 12px; background: rgba(34, 197, 94, 0.12); border-left: 3px solid #22c55e; border-radius: 4px; color: #15803d; font-size: 13px; line-height: 1.6;">
                  <strong>✓ Protective Shield Injected:</strong> ${f.counterClause}
                </div>
              `;
            }
          } else {
            const pEl = box.querySelector("p") || box.querySelector(".clause-text");
            if (pEl && f.counterClause) {
              const origContent = pEl.innerText || pEl.textContent;
              pEl.innerHTML = `
                <div style="margin-bottom: 6px; padding: 8px 12px; background: rgba(34, 197, 94, 0.12); border-left: 3px solid #22c55e; border-radius: 4px; color: #15803d; font-size: 13px; line-height: 1.6;">
                  <strong>✓ Balanced Redline (Enacted):</strong> ${f.counterClause}
                </div>
                <div style="font-size: 11.5px; color: #94a3b8; text-decoration: line-through; opacity: 0.85; line-height: 1.5; padding: 2px 4px;">
                  ${origContent.slice(0, 320)}
                </div>
              `;
            }
          }
        }
      }
    });
  }

  // Calculate dynamic metrics & exposure
  const totalFindings = (doc.findings || []).length;
  const remediatedCount = (doc.findings || []).filter(f => state.appliedRemediations.has(f.id)).length;

  if (remediatedCount > 0) {
    const bonus = Math.round((98 - doc.baseScore) * (remediatedCount / (totalFindings || 1)));
    doc.score = Math.min(98, doc.baseScore + bonus);
    doc.riskLevel = doc.score >= 80 ? "Secured Parity" : doc.score >= 60 ? "Moderate Concern" : "Critical Risk";
    if (remediatedCount === totalFindings) {
      doc.exposure = "$0 (Fully Mitigated)";
    } else {
      doc.exposure = `${totalFindings - remediatedCount} Active Exposure${totalFindings - remediatedCount > 1 ? 's' : ''}`;
    }
  } else {
    doc.score = doc.baseScore;
    doc.riskLevel = doc.baseRiskLevel;
    doc.exposure = doc.baseExposure;
  }

  // Update Metrics Ribbon & Radial Visualizer Gauge
  const mScore = document.getElementById("metricScore");
  const mScoreNum = document.getElementById("metricScoreNum");
  const mScoreCircle = document.getElementById("metricScoreCircle");
  const mSpectrumFill = document.getElementById("metricSpectrumFill");
  const mBadge = document.getElementById("metricRiskBadge");
  const mExposure = document.getElementById("metricExposure");
  const mDeadline = document.getElementById("metricDeadline");
  const mMissing = document.getElementById("metricMissing");
  const mobileCount = document.getElementById("mobileFindingsBadge");

  if (mScore) mScore.innerHTML = `${doc.score} <span style="font-size: 11px; color: var(--metallic-silver); font-weight: 400;">/ 100</span>`;
  if (mScoreNum) mScoreNum.textContent = doc.score;

  // Animate SVG circular progress gauge (Circumference of r=28 is 2 * PI * 28 = 175.93)
  const circumference = 175.93;
  const strokeOffset = circumference - (circumference * (doc.score / 100));
  if (mScoreCircle) {
    mScoreCircle.style.strokeDashoffset = strokeOffset;
    if (doc.score >= 80) {
      mScoreCircle.style.stroke = "#10b981";
      mScoreCircle.style.filter = "drop-shadow(0 0 6px rgba(16, 185, 129, 0.45))";
    } else if (doc.score >= 60) {
      mScoreCircle.style.stroke = "#f59e0b";
      mScoreCircle.style.filter = "drop-shadow(0 0 6px rgba(245, 158, 11, 0.45))";
    } else {
      mScoreCircle.style.stroke = "#ef4444";
      mScoreCircle.style.filter = "drop-shadow(0 0 6px rgba(239, 68, 68, 0.45))";
    }
  }

  if (mSpectrumFill) {
    mSpectrumFill.style.width = `${Math.max(6, doc.score)}%`;
    if (doc.score >= 80) {
      mSpectrumFill.style.background = "linear-gradient(90deg, #10b981, #34d399)";
    } else if (doc.score >= 60) {
      mSpectrumFill.style.background = "linear-gradient(90deg, #f59e0b, #fbbf24)";
    } else {
      mSpectrumFill.style.background = "linear-gradient(90deg, #ef4444, #f87171)";
    }
  }

  if (mBadge) {
    mBadge.textContent = doc.riskLevel;
    mBadge.className = `badge-risk ${doc.score < 50 ? 'badge-danger' : doc.score < 75 ? 'badge-warning' : 'badge-safe'}`;
  }
  if (mExposure) mExposure.textContent = doc.exposure;
  if (mDeadline) mDeadline.textContent = doc.deadline;
  if (mMissing) {
    const remainingMissing = (doc.findings || []).filter(f => f.category === 'missing' && !state.appliedRemediations.has(f.id)).length;
    mMissing.textContent = remainingMissing > 0 ? `${remainingMissing} Missing` : "Protected";
  }
  if (mobileCount) {
    mobileCount.textContent = (doc.findings || []).length;
  }
}

// Render Intelligence Cards on Right
function renderFindings() {
  const doc = DB[state.currentDoc];
  const container = document.getElementById("findingsContainer");
  if (!doc || !container) return;

  if (!state.appliedRemediations) {
    state.appliedRemediations = new Set();
  }

  const items = doc.findings.filter(f => {
    if (state.filter === "all") return true;
    return f.category === state.filter;
  });

  const countLabel = document.getElementById("findingsCountLabel");
  if (countLabel) countLabel.textContent = `Findings (${items.length})`;

  let html = "";

  // If invoice reconciliation mode, show summary card
  if (state.currentDoc === "invoice") {
    html += `
      <div class="reconciliation-box">
        <div style="font-weight: 600; color: #0f172a; margin-bottom: 3px; display: flex; align-items: center; gap: 6px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--metallic-silver);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
          Cross-Document Reconciliation
        </div>
        <p style="color: var(--metallic-silver); font-size: 11px;">
          Cross-checking Invoice #INV-892 against Master Services Agreement (CS-MSA-2026 §4.1).
        </p>
        <div class="recon-grid">
          <div class="recon-col">
            <span style="font-size: 10px; color: var(--metallic-silver);">Contract Agreed Rate:</span>
            <div style="font-weight: 600; color: #16a34a;">$95.00 / hr</div>
          </div>
          <div class="recon-col">
            <span style="font-size: 10px; color: var(--metallic-silver);">Invoice Billed Rate:</span>
            <div style="font-weight: 600; color: #dc2626;">$125.00 / hr (+$30)</div>
          </div>
        </div>
      </div>
    `;
  }

  items.forEach(f => {
    const isSelected = f.id === state.activeFindingId;
    const isRemediated = state.appliedRemediations.has(f.id);
    const desc = state.mode === "plain" ? f.plainDesc : f.legalDesc;

    html += `
      <div class="finding-card ${isSelected ? 'selected' : ''}" id="card-${f.id}" onclick="selectFinding('${f.id}')">
        <div class="card-top">
          <span class="badge-risk ${isRemediated ? 'badge-safe' : f.severity === 'danger' ? 'badge-danger' : 'badge-warning'}">
            ${isRemediated ? '✓ Remediated' : f.badge}
          </span>
          <span style="font-size: 10.5px; color: var(--metallic-silver); font-family: var(--font-mono);">
            ${f.section} &bull; ${f.page}
          </span>
        </div>
        
        <div class="card-title">${f.title}</div>
        <div class="card-desc">${desc}</div>

        <div style="font-size: 11.5px; color: ${isRemediated ? '#86efac' : f.severity === 'danger' ? '#ff8a80' : '#ffd15c'}; font-weight: 500; margin-bottom: 8px;">
          ${isRemediated ? '✓ Exposure Mitigated' : f.impact}
        </div>

        <div class="card-actions">
          <button class="btn btn-subtle btn-xs" onclick="event.stopPropagation(); openCounterModal('${f.id}')" title="Inspect Counter-Clause & Email">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Counter-Clause
          </button>

          <button class="btn ${isRemediated ? 'btn-subtle' : 'btn-primary'} btn-xs" onclick="event.stopPropagation(); toggleRemediation('${f.id}')" title="Apply Balanced Amendment">
            ${isRemediated ? 'Undo Redline' : 'Apply Redline'}
          </button>

          ${f.category === 'deadline' ? `
            <button class="btn btn-subtle btn-xs" onclick="event.stopPropagation(); addToCalendar('${f.id}')" title="Download .ics Calendar Reminder">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              .ics Sync
            </button>
          ` : ''}

          <button class="btn btn-subtle btn-xs" style="margin-left: auto; color: #0f172a;" onclick="event.stopPropagation(); selectFinding('${f.id}')">
            Trace &rarr;
          </button>
        </div>
      </div>
    `;
  });

  // End of audit feed footer (Page End Fix)
  html += `
    <div class="audit-feed-footer">
      <div class="feed-footer-pill">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Forensic Audit Stream Grounded • Privacy Guaranteed</span>
      </div>
      <div class="feed-footer-sub">All predatory terms, rate cards & omissions analyzed locally</div>
    </div>
  `;

  container.innerHTML = html;
}

// Select & Trace finding on visual canvas
function selectFinding(id) {
  state.activeFindingId = id;

  document.querySelectorAll(".finding-card").forEach(c => c.classList.remove("selected"));
  const card = document.getElementById("card-" + id);
  if (card) {
    card.classList.add("selected");
    card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  const targetBox = document.getElementById("bbox-" + id);
  if (targetBox) {
    document.querySelectorAll(".bounding-box").forEach(b => b.classList.remove("box-highlighted"));
    targetBox.scrollIntoView({ behavior: "smooth", block: "center" });
    targetBox.classList.add("box-highlighted");
  }

  // On mobile screens, automatically show document canvas to reveal highlighted box
  if (window.innerWidth <= 960 && state.mobileActivePane === "findings") {
    setMobilePane("doc");
    setTimeout(() => {
      if (targetBox) targetBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  }
}

// Mobile Responsive Split Switcher
function setMobilePane(pane) {
  state.mobileActivePane = pane;
  const ws = document.getElementById("page-workspace");
  const docPane = document.querySelector(".document-pane");
  const auditPane = document.querySelector(".audit-pane");
  const btnDoc = document.getElementById("btnMobileDoc");
  const btnFindings = document.getElementById("btnMobileFindings");

  if (ws) {
    if (pane === "doc") {
      ws.classList.add("mobile-pane-doc");
      ws.classList.remove("mobile-pane-findings");
    } else {
      ws.classList.add("mobile-pane-findings");
      ws.classList.remove("mobile-pane-doc");
    }
  }

  if (btnDoc) {
    if (pane === "doc") btnDoc.classList.add("active");
    else btnDoc.classList.remove("active");
  }
  if (btnFindings) {
    if (pane === "findings") btnFindings.classList.add("active");
    else btnFindings.classList.remove("active");
  }

  if (window.innerWidth <= 960) {
    if (pane === "doc") {
      if (docPane) docPane.style.display = "flex";
      if (auditPane) auditPane.style.display = "none";
    } else {
      if (docPane) docPane.style.display = "none";
      if (auditPane) auditPane.style.display = "flex";
    }
  } else {
    if (docPane) docPane.style.display = "";
    if (auditPane) auditPane.style.display = "";
  }
}

// In-Place Redline Remediation Toggle
function toggleRemediation(findingId) {
  if (!state.appliedRemediations) {
    state.appliedRemediations = new Set();
  }

  const doc = DB[state.currentDoc];
  const finding = doc && doc.findings ? doc.findings.find(f => f.id === findingId) : null;
  if (!finding) return;

  if (state.appliedRemediations.has(findingId)) {
    state.appliedRemediations.delete(findingId);
    renderDocument();
    renderFindings();
    showAppleToast(`Redline reverted. Score: ${doc.score}/100`, "↩");
  } else {
    state.appliedRemediations.add(findingId);
    renderDocument();
    renderFindings();
    showAppleToast(`Counter-clause applied! Health score upgraded to ${doc.score}/100`, "✓");
  }
}

function applyModalRemediation() {
  if (state.activeModalFindingId) {
    toggleRemediation(state.activeModalFindingId);
    closeModal("counterModal");
  }
}

// View Mode Toggle (Plain English vs Legal)
function setMode(mode) {
  state.mode = mode;
  const pBtn = document.getElementById("btnModePlain");
  const lBtn = document.getElementById("btnModeLegal");
  if (pBtn) pBtn.className = "toggle-opt " + (mode === "plain" ? "active" : "");
  if (lBtn) lBtn.className = "toggle-opt " + (mode === "legal" ? "active" : "");
  renderFindings();
}

// Category Filter Tabs
function setFilter(filter) {
  state.filter = filter;
  document.querySelectorAll(".tab-btn").forEach(btn => {
    if (btn.dataset.filter === filter) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  renderFindings();
}

// Modal Handlers
function openCounterModal(findingId) {
  state.activeModalFindingId = findingId;
  const doc = DB[state.currentDoc];
  const finding = doc && doc.findings ? doc.findings.find(f => f.id === findingId) : null;
  if (!finding) return;

  const isRemediated = state.appliedRemediations && state.appliedRemediations.has(findingId);

  document.getElementById("modalTitle").textContent = `Counter-Clause: ${finding.title}`;
  document.getElementById("modalClauseText").textContent = finding.counterClause;
  document.getElementById("modalEmailText").textContent = finding.emailDraft;

  const applyBtn = document.getElementById("btnModalApplyRedline");
  if (applyBtn) {
    if (isRemediated) {
      applyBtn.textContent = "↩ Undo Redline";
      applyBtn.className = "btn btn-subtle";
    } else {
      applyBtn.textContent = "✓ Apply to Document";
      applyBtn.className = "btn btn-primary";
    }
  }

  const modal = document.getElementById("counterModal");
  if (modal) modal.classList.add("open");
}

function copyModalContent() {
  const clause = document.getElementById("modalClauseText").textContent;
  const email = document.getElementById("modalEmailText").textContent;
  navigator.clipboard.writeText(`${clause}\n\n---\n${email}`).then(() => {
    showAppleToast("Counter-clause & email copied to clipboard", "✓");
    closeModal("counterModal");
  }).catch(() => {
    showAppleToast("Copied to clipboard", "✓");
    closeModal("counterModal");
  });
}

function updateReconDropdowns() {
  const contractSel = document.getElementById("reconContractSelect");
  const invoiceSel = document.getElementById("reconInvoiceSelect");
  if (!contractSel || !invoiceSel) return;

  const prevContract = contractSel.value;
  const prevInvoice = invoiceSel.value;

  contractSel.innerHTML = `
    <option value="msa">CloudScale_MSA_2026.pdf ($95/hr cap)</option>
    <option value="current">Active Studio Document (${DB[state.currentDoc]?.title || state.currentDoc})</option>
  `;

  invoiceSel.innerHTML = `
    <option value="invoice">Invoice_INV-892.pdf ($125/hr billed)</option>
  `;

  Object.keys(DB).forEach(key => {
    if (key !== "msa" && key !== "invoice" && key !== "lease" && key !== "reconciliation") {
      const doc = DB[key];
      if (doc && doc.title) {
        const opt1 = document.createElement("option");
        opt1.value = key;
        opt1.textContent = `${doc.title} (${doc.docType || 'Document'})`;
        contractSel.appendChild(opt1);

        const opt2 = document.createElement("option");
        opt2.value = key;
        opt2.textContent = `${doc.title} (${doc.docType || 'Document'})`;
        invoiceSel.appendChild(opt2);
      }
    }
  });

  if (prevContract) contractSel.value = prevContract;
  if (prevInvoice) invoiceSel.value = prevInvoice;
}

function openUploadModal() {
  updateReconDropdowns();
  const modal = document.getElementById("uploadModal");
  if (modal) modal.classList.add("open");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("open");
}

// Autonomous Notice Calendar Sync (.ics)
function addToCalendar(findingId) {
  const doc = DB[state.currentDoc];
  const finding = (doc.findings && doc.findings.find(f => f.id === findingId)) || (doc.findings && doc.findings[0]) || {};
  const icsContent = ForensicEngine.generateIcs(finding, doc);

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${(doc.title || 'Document').replace(/\.pdf$/i,'')}_Notice_Reminder.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showAppleToast("Calendar reminder (.ics) downloaded", "📅");
}

// Export Summary Dossier
function exportSummary() {
  const doc = DB[state.currentDoc];
  const markdown = ForensicEngine.generateMarkdownDossier(doc);

  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${(doc.title || 'Document').replace(/\.pdf$/i,'')}_Forensic_Dossier.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showAppleToast("Exported forensic audit report (.md)", "✓");
}

// Re-Audit Action
function triggerRunAnalysis(event) {
  const btn = (event && event.currentTarget) ? event.currentTarget : document.getElementById("btnReAudit");
  if (!btn) return;

  const originalHtml = btn.innerHTML;
  btn.innerHTML = `<span style="display: inline-block; animation: spin 0.8s linear infinite;">↻</span> Auditing...`;
  btn.style.opacity = "0.75";

  setTimeout(() => {
    btn.innerHTML = originalHtml;
    btn.style.opacity = "1";

    const doc = DB[state.currentDoc];
    if (doc && doc.rawText) {
      const refreshed = ForensicEngine.analyzeDocument(doc.rawText, doc.title);
      DB[state.currentDoc] = refreshed;
      refreshed.baseScore = refreshed.score;
      refreshed.baseExposure = refreshed.exposure;
      refreshed.baseRiskLevel = refreshed.riskLevel;
      renderDocument();
      renderFindings();
    }
    showAppleToast("Document re-audited and metrics verified", "✓");
  }, 500);
}

// Ask VeriClause AI Assistant Copilot
function executeCopilotQuery() {
  const input = document.getElementById("copilotInput");
  const resultArea = document.getElementById("copilotResultArea");
  if (!input || !resultArea) return;

  const query = input.value.trim();
  if (!query) return;

  const doc = DB[state.currentDoc];
  const res = ForensicEngine.answerQuery(query, doc);

  resultArea.style.display = "block";
  resultArea.innerHTML = `
    <div class="copilot-result-card">
      <div class="copilot-result-header">
        <span>VERICLAUSE COPILOT // ${res.citation || 'FORENSIC SCAN'}</span>
        <button class="btn-xs btn-subtle" style="padding: 1px 6px;" onclick="document.getElementById('copilotResultArea').style.display='none'">✕</button>
      </div>
      <p style="margin: 0 0 8px 0; color: #f8fafc; font-size: 11.5px; line-height: 1.55;">
        ${res.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
      </p>
      <div style="display: flex; gap: 6px; align-items: center; margin-top: 6px;">
        ${res.jumpId ? `
          <button class="btn btn-subtle btn-xs" onclick="selectFinding('${res.jumpId}')">
            Jump to Clause &rarr;
          </button>
        ` : ''}
        ${res.remediation ? `
          <button class="btn btn-primary btn-xs" onclick="openCounterModal('${res.jumpId}')">
            Inspect Counter-Clause
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

function quickQuery(text) {
  const input = document.getElementById("copilotInput");
  if (input) {
    input.value = text;
    executeCopilotQuery();
  }
}

// Dynamic HUD Toast
function showAppleToast(message, icon = "✓") {
  const toast = document.getElementById("appleToast");
  const text = document.getElementById("appleToastText");
  const iconEl = toast ? toast.querySelector(".toast-icon") : null;
  if (!toast || !text) return;
  text.textContent = message;
  if (iconEl) iconEl.textContent = icon;
  toast.classList.add("visible");
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2800);
}
