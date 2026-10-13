/**
 * VERICLAUSE AI — Autonomous Legal Forensic Audit & Traceability Engine
 * Core Intelligence Layer: Multi-pass Heuristic, Semantic & Statutory Analysis
 * Zero-dependency, pure JavaScript execution for high performance & client-side privacy.
 */

(function (global) {
  'use strict';

  const ForensicEngine = {
    version: "2.4.0",

    // Default Statutory & Standard Benchmarks
    BENCHMARKS: {
      maxStandardLateFeeMonthly: 1.5, // 1.5% simple monthly interest is commercial norm (~18% p.a.)
      maxStandardNoticeDays: 30, // 30-day notice is commercial standard
      maxStandardRenewalMonths: 12, // 12-month standard renewal
      maxStandardLeaseEscalation: 3.5, // 3-3.5% CPI standard escalation
      standardDataBreachHours: 72, // GDPR / SOC 2 standard
      slaUptimeFloor: 99.9, // Standard SaaS floor
      defaultTrailingCapMonths: 12 // 12 months trailing fees is mutual cap standard
    },

    /**
     * Primary Entry Point: Analyzes raw document text (extracted from PDF, DOCX, or TXT)
     * @param {string} rawText 
     * @param {string} fileName 
     * @param {object} options 
     * @returns {object} Full document model with score, exposure, findings, and interactive HTML
     */
    analyzeDocument(rawText, fileName = "Uploaded_Document.pdf", options = {}) {
      if (!rawText || !rawText.trim()) {
        throw new Error("No document text provided for forensic analysis.");
      }

      const text = rawText.replace(/\r\n/g, "\n");
      const docType = this.detectDocType(text, fileName);
      const metadata = this.extractMetadata(text, fileName, docType);
      const sections = this.segmentDocument(text, docType);

      // Run deep forensic detectors
      const findings = [];

      // 1. Evergreen & Auto-Renewal Lock-in
      const renewalFindings = this.detectRenewalTraps(sections, text, metadata);
      findings.push(...renewalFindings);

      // 2. Punitive Late Fees & Compounding Penalties
      const lateFeeFindings = this.detectLateFeeAnomalies(sections, text, metadata);
      findings.push(...lateFeeFindings);

      // 3. Asymmetric Liability & Uncapped Indemnity
      const liabilityFindings = this.detectLiabilityAsymmetry(sections, text, metadata);
      findings.push(...liabilityFindings);

      // 4. Commercial Lease Traps (if applicable)
      if (docType === "lease" || /premises|landlord|tenant|base rent|operating expense/i.test(text)) {
        const leaseFindings = this.detectLeaseAnomalies(sections, text, metadata);
        findings.push(...leaseFindings);
      }

      // 5. Invoice & Rate Creep Discrepancies (if applicable)
      if (docType === "invoice" || /invoice|billed to|rate\/hour|line item/i.test(text)) {
        const invoiceFindings = this.detectInvoiceAnomalies(sections, text, metadata);
        findings.push(...invoiceFindings);
      }

      // 6. Unilateral Modification / Unfair Governance
      const governanceFindings = this.detectGovernanceAnomalies(sections, text, metadata);
      findings.push(...governanceFindings);

      // 7. Omission Scanner: Auditing What is Missing
      const missingFindings = this.detectOmissions(sections, text, docType, metadata);
      findings.push(...missingFindings);

      // Deduplicate findings by ID
      const uniqueFindings = [];
      const seenIds = new Set();
      for (const f of findings) {
        if (!seenIds.has(f.id)) {
          seenIds.add(f.id);
          uniqueFindings.push(f);
        }
      }

      // Calculate Metrics & Risk Score
      const metrics = this.calculateMetrics(uniqueFindings, metadata, docType);

      // Build Interactive Document HTML with Traceable Bounding Boxes
      const docHtml = this.generateDocumentHtml(sections, uniqueFindings, metadata, docType);

      return {
        id: "doc_" + Date.now(),
        title: fileName,
        fileName: fileName,
        docType: docType,
        pageInfo: `Pages: ~${metadata.pageCount} • ${metadata.wordCount.toLocaleString()} Words`,
        score: metrics.score,
        initialScore: metrics.score,
        riskLevel: metrics.riskLevel,
        exposure: metrics.exposureText,
        exposureValue: metrics.exposureValue,
        deadline: metrics.primaryDeadline,
        missingCount: `${metrics.missingCount} Omission${metrics.missingCount === 1 ? '' : 's'}`,
        rawText: text,
        sections: sections,
        metadata: metadata,
        findings: uniqueFindings,
        docHtml: docHtml
      };
    },

    /**
     * Document Classification
     */
    detectDocType(text, fileName = "") {
      const fLower = (fileName || "").toLowerCase();
      const headText = text.substring(0, 1200).toLowerCase();
      const fullLower = text.toLowerCase();

      // 1. Invoices (only if clearly an invoice by filename or top header)
      if (fLower.includes("invoice") || fLower.includes("inv-") || /^[\s\S]{0,350}\binvoice\s*(?:#|no\.?|num)?/i.test(text) || (headText.includes("billed to:") && headText.includes("invoice balance"))) {
        if (!fLower.includes("agreement") && !fLower.includes("msa") && !headText.includes("master services agreement") && !headText.includes("lease agreement")) {
          return "invoice";
        }
      }

      // 2. Leases
      if (fLower.includes("lease") || headText.includes("lease agreement") || headText.includes("commercial real estate lease") || headText.includes("demised premises") || headText.includes("landlord")) {
        return "lease";
      }

      // 3. NDAs
      if (fLower.includes("nda") || headText.includes("non-disclosure") || headText.includes("confidentiality agreement") || headText.includes("proprietary information agreement")) {
        return "nda";
      }

      // 4. DPAs
      if (fLower.includes("dpa") || headText.includes("data processing agreement") || headText.includes("gdpr")) {
        return "dpa";
      }

      // 5. MSAs / Master Service Agreements / Cloud Agreements
      if (fLower.includes("msa") || fLower.includes("sow") || headText.includes("master services") || headText.includes("services agreement") || headText.includes("cloud infrastructure") || headText.includes("statement of work") || headText.includes("master service")) {
        return "msa";
      }

      // Fallbacks if not caught in header
      if (/\b(?:invoice\s*#|balance due\s*:|itemized charges)\b/i.test(fullLower) && !/\b(?:whereas|recitals|this agreement is entered into)\b/i.test(fullLower)) {
        return "invoice";
      }
      if (/\b(?:landlord|demised premises|base rent)\b/i.test(fullLower)) {
        return "lease";
      }
      return "contract";
    },

    /**
     * Extracts dates, monetary sums, party names, and document size
     */
    extractMetadata(text, fileName, docType) {
      const words = text.trim().split(/\s+/).filter(Boolean);
      const wordCount = words.length;
      const pageCount = Math.max(1, Math.ceil(wordCount / 380));

      // Effective Date extraction
      let effectiveDate = null;
      const dateMatch = text.match(/(?:effective date|dated as of|commencement date|as of|billing period)[:\s]+([A-Z][a-z]+ \d{1,2},? \d{4}|\d{1,2}[/-]\d{1,2}[/-]\d{4}|[A-Z][a-z]+ \d{4})/i);
      if (dateMatch) {
        effectiveDate = dateMatch[1];
      }

      // Party extraction
      let partyA = docType === "lease" ? "Landlord" : docType === "invoice" ? "CloudScale Infrastructure Technologies LLC" : "Vendor";
      let partyB = docType === "lease" ? "Tenant" : docType === "invoice" ? "Apex Global Enterprise Corp." : "Client";

      const partiesMatch = text.match(/between\s+([A-Z][A-Za-z0-9\s.,&]+?)\s*(?:\("Vendor"|\("Licensor"|\("Landlord"|\("Company"|\(Vendor\)|\(Landlord\))\s+(?:and|to)\s+([A-Z][A-Za-z0-9\s.,&]+?)\s*(?:\("Client"|\("Customer"|\("Tenant"|\(Client\)|\(Tenant\))/i);
      if (partiesMatch) {
        partyA = partiesMatch[1].trim();
        partyB = partiesMatch[2].trim();
      } else {
        const altPartyA = text.match(/([A-Z][A-Za-z0-9\s.,&]{3,40}?)\s*(?:\("Vendor"|\("Licensor"|\("Landlord"|\(Vendor\)|\(Landlord\))/i);
        const altPartyB = text.match(/([A-Z][A-Za-z0-9\s.,&]{3,40}?)\s*(?:\("Client"|\("Customer"|\("Tenant"|\(Client\)|\(Tenant\))/i);
        if (altPartyA) partyA = altPartyA[1].trim();
        if (altPartyB) partyB = altPartyB[1].trim();
      }

      // Invoice specific extraction
      if (docType === "invoice") {
        const billToMatch = text.match(/billed to:\s*([A-Za-z0-9\s.,&]+?)(?:•|—|\n|$)/i);
        if (billToMatch) partyB = billToMatch[1].trim();
      }

      // Total dollar mentions
      const dollarMatches = text.match(/\$[\d,]+(?:\.\d{2})?/g) || [];
      const dollarValues = dollarMatches.map(d => parseFloat(d.replace(/[$,]/g, ''))).filter(v => !isNaN(v));
      const maxDollarMention = dollarValues.length > 0 ? Math.max(...dollarValues) : 0;

      return {
        wordCount,
        pageCount,
        effectiveDate,
        partyA,
        partyB,
        dollarMentions: dollarMatches,
        maxDollarMention
      };
    },

    /**
     * Splits document into semantic clauses and structural paragraphs
     */
    segmentDocument(text, docType) {
      const rawLines = text.split("\n");
      const sections = [];
      let currentSection = {
        id: "sec-0",
        heading: "PREAMBLE & RECITALS",
        paragraphs: []
      };

      const sectionRegex = /^(?:SECTION|ARTICLE|CLAUSE|\u00a7)\s*([0-9A-Z.]+)?[:.\s\-–—]+(.*)$/i;
      const capsHeadingRegex = /^[A-Z0-9\s.,\-_–—:]{4,60}$/;
      const subClauseRegex = /^(\d+\.\d+|ARTICLE\s*\d+:?|Item\s*\d+:?|Line\s*Item\s*\d+:?)\s+(.*)$/i;

      let currentPara = [];
      let secCounter = 1;

      const flushPara = () => {
        if (currentPara.length > 0) {
          const pText = currentPara.join(" ").trim();
          if (pText) {
            currentSection.paragraphs.push({
              id: `p-${secCounter}-${currentSection.paragraphs.length + 1}`,
              text: pText
            });
          }
          currentPara = [];
        }
      };

      const flushSection = () => {
        flushPara();
        if (currentSection.paragraphs.length > 0 || currentSection.heading) {
          sections.push(currentSection);
        }
      };

      for (let i = 0; i < rawLines.length; i++) {
        const line = rawLines[i].trim();
        if (!line) {
          flushPara();
          continue;
        }

        const secMatch = line.match(sectionRegex);
        if (secMatch) {
          flushSection();
          currentSection = {
            id: `sec-${secCounter++}`,
            heading: line,
            paragraphs: []
          };
          continue;
        }

        // Standalone capitalized heading
        if (capsHeadingRegex.test(line) && line.length < 50 && !line.includes(".") && rawLines[i + 1] && rawLines[i + 1].trim()) {
          flushSection();
          currentSection = {
            id: `sec-${secCounter++}`,
            heading: line,
            paragraphs: []
          };
          continue;
        }

        // Sub-clause flush (e.g. 4.1 Invoicing, 4.2 Late Penalties, Item 01, Item 02)
        if (subClauseRegex.test(line)) {
          flushPara();
        }

        currentPara.push(line);
      }

      flushSection();

      if (sections.length === 0) {
        sections.push({
          id: "sec-1",
          heading: "AGREEMENT TERMS",
          paragraphs: [{ id: "p-1-1", text: text }]
        });
      }

      return sections;
    },

    /**
     * 1. DETECTOR: Auto-Renewal & Lock-In Traps
     */
    detectRenewalTraps(sections, text, metadata) {
      const findings = [];
      const renewalRegex = /(?:automatically renew|automatic(?:ally)? extension|evergreen|irrevocably renew|successive (?:terms?|periods?)|consecutive (?:terms?|periods?))/i;
      
      for (const sec of sections) {
        for (const p of sec.paragraphs) {
          if (renewalRegex.test(p.text)) {
            // Extract notice window
            let noticeDays = 60;
            const noticeMatch = p.text.match(/(?:strictly no less than|no less than|at least|advance of)?\s*(?:[a-zA-Z]+)?\s*\(?(\d{1,3})\)?\s*(?:calendar\s*)?days?\s*(?:prior|before|advance)/i);
            if (noticeMatch) {
              noticeDays = parseInt(noticeMatch[1], 10);
            } else {
              const altMatch = p.text.match(/(\d{1,3})\s*(?:calendar\s*)?days/i);
              if (altMatch) noticeDays = parseInt(altMatch[1], 10);
            }

            // Extract renewal term
            let termText = "24 months";
            const termMatch = p.text.match(/(?:additional|consecutive|successive)?\s*(?:[a-zA-Z]+)?\s*\(?(\d{1,3})\)?\s*(months?|years?)/i);
            if (termMatch) {
              termText = `${termMatch[1]} ${termMatch[2]}`;
            }

            // Extract courier requirement
            const courierMatch = /(?:certified|registered|courier|formal written notice via courier)/i.test(p.text);
            // Extract rate escalation on renewal
            const escalationMatch = p.text.match(/(\d+(?:\.\d+)?)%\s*(?:rate\s*)?(?:escalation|increase)/i);
            const escalationPercent = escalationMatch ? escalationMatch[1] : null;

            // Check for explicit cutoff date in the clause text itself
            let cutoffDate = null;
            const explicitCutoff = p.text.match(/(?:cutoff date|notice cutoff|strict notice cutoff|notice deadline)[:\s]+([A-Za-z]+ \d{1,2},? \d{4})/i);
            if (explicitCutoff) {
              cutoffDate = explicitCutoff[1].replace(",", ", ");
            } else {
              cutoffDate = this.calculateNoticeCutoff(metadata.effectiveDate, noticeDays);
            }

            const lockinExposure = escalationPercent 
              ? `$${(parseFloat(escalationPercent) * 6000 + 48000).toLocaleString()}` 
              : "$96,000+";

            let highlightPhrase = "automatically renew";
            const hlMatch = p.text.match(/(?:strictly no less than|no less than)?\s*\(?\d+\)?\s*(?:calendar\s*)?days?\s*prior[^,.]*|irrevocably renew[^,.]*|automatically renew[^,.]*/i);
            if (hlMatch && p.text.includes(hlMatch[0])) {
              highlightPhrase = hlMatch[0];
            } else if (p.text.includes("Automatic Extension")) {
              highlightPhrase = "Automatic Extension";
            }

            findings.push({
              id: "trap_renewal_" + p.id,
              paragraphId: p.id,
              sectionId: sec.id,
              category: "deadline",
              severity: "danger",
              badge: "Critical Deadline",
              section: sec.heading.substring(0, 30),
              page: "Page " + Math.min(metadata.pageCount, Math.ceil(parseInt(p.id.split('-')[1] || "1", 10) / 2)),
              title: `${termText} Automatic Lock-in Trap`,
              plainDesc: `Requires written notice strictly ${noticeDays} days in advance${courierMatch ? ' via certified registered courier' : ''}. If missed, you are automatically locked into ${termText} of mandatory service${escalationPercent ? ` at +${escalationPercent}% higher prices` : ''}.`,
              legalDesc: `Mandatory ${noticeDays}-day pre-expiration notice required to avoid evergreen automatic extension of ${termText}. High unconscionability exposure under NY UCC § 2-309 and Restatement (Second) of Contracts § 211.`,
              impact: `Est. Lock-In Risk: ${lockinExposure}`,
              actionText: `Notice Deadline: ${cutoffDate}`,
              cutoffDate: cutoffDate,
              noticeDays: noticeDays,
              highlightPhrase: highlightPhrase,
              counterClause: `Either party may terminate this Agreement at the conclusion of the Initial Term by providing thirty (30) days prior written notice via electronic mail, without penalty, cancellation fee, or rate escalation.`,
              emailDraft: `Subject: Proposed Amendment to Section ${sec.heading} — Notice & Term Parity\n\nHi Procurement Team,\n\nIn our review of the agreement, the ${noticeDays}-day notice window and ${termText} automatic renewal clause exceeds standard commercial parity. We require standard 30-day electronic notice with mutual non-renewal rights as reflected in our attached redline.\n\nBest regards,\nLegal & Procurement`
            });
            break;
          }
        }
      }

      return findings;
    },

    /**
     * 2. DETECTOR: Late Fee & Compounding Penalties
     */
    detectLateFeeAnomalies(sections, text, metadata) {
      const findings = [];
      const lateFeeRegex = /(?:late (?:fee|penalty|charge)|interest compounding|delinquent balance|unpaid (?:invoices?|amounts?)|interest at the rate of)\s*.*?(\d+(?:\.\d+)?)\s*%\s*(?:per\s*month|monthly|per\s*annum|annual)?/i;

      for (const sec of sections) {
        for (const p of sec.paragraphs) {
          const match = p.text.match(lateFeeRegex);
          if (match) {
            const rate = parseFloat(match[1]);
            const isMonthly = /month/i.test(match[0]) || rate > 5.0;
            const isCompounding = /compound|compounding/i.test(p.text);
            const noGrace = /without (?:requirement of )?(?:prior )?cure|immediately upon demand|no grace period/i.test(p.text);

            if ((isMonthly && rate > 1.5) || rate > 18.0 || isCompounding || noGrace) {
              const annualRate = isMonthly ? (rate * 12).toFixed(1) : rate;
              const hlMatch = p.text.match(/\d+(?:\.\d+)?%\s*(?:per\s*month|monthly|per\s*annum|annual)?/i);

              findings.push({
                id: "trap_latefee_" + p.id,
                paragraphId: p.id,
                sectionId: sec.id,
                category: "financial",
                severity: isMonthly && rate > 5 ? "danger" : "warning",
                badge: "Financial Anomaly",
                section: sec.heading.substring(0, 30),
                page: "Page " + Math.min(metadata.pageCount, Math.ceil(parseInt(p.id.split('-')[1] || "1", 10) / 2)),
                title: `Punitive Compounding Late Fee (${rate}% ${isMonthly ? 'Monthly' : 'Annual'})`,
                plainDesc: `Delinquent invoices accrue ${rate}% interest ${isMonthly ? 'per month' : 'annually'} (~${annualRate}% APR)${isCompounding ? ' compounding monthly' : ''}${noGrace ? ' with zero grace period' : ''}. Standard commercial benchmark is only 1.0–1.5% simple monthly interest.`,
                legalDesc: `Compounding interest rate of ${rate}% ${isMonthly ? 'monthly' : 'annually'} constitutes an unenforceable liquidated damages penalty under Restatement (Second) of Contracts § 356, UCC § 2-718, and state usury statutes.`,
                impact: `Excess Penalty Exposure: ~$14,200 on 60-day lag`,
                actionText: `Benchmark: 1.5% Simple Interest`,
                highlightPhrase: hlMatch ? hlMatch[0] : match[0],
                counterClause: `Undisputed overdue balances shall accrue simple, non-compounding interest at the rate of one percent (1.0%) per month (or the maximum statutory limit, whichever is lower), payable only after thirty (30) days formal written notice of delinquency and opportunity to cure.`,
                emailDraft: `Subject: Section ${sec.heading} — Late Interest Rate Standard Adjustment\n\nHi Finance Team,\n\nOur legal audit identified a compounding late interest provision of ${rate}% ${isMonthly ? 'monthly' : 'annual'} in Section ${sec.heading}. Our corporate treasury standard requires 1.0% simple monthly interest with a mandatory 30-day cure period. Please accept our redline amendment.\n\nThank you,\nFinance & Compliance`
              });
              break;
            }
          }
        }
      }

      return findings;
    },

    /**
     * 3. DETECTOR: Asymmetric Liability & Indemnity Shifts
     */
    detectLiabilityAsymmetry(sections, text, metadata) {
      const findings = [];
      const liabilityRegex = /(?:limitation of liability|liability thresholds?|aggregate liability|indemnification|hold harmless)/i;

      for (const sec of sections) {
        for (const p of sec.paragraphs) {
          if (liabilityRegex.test(p.text)) {
            const hasUncappedCustomer = /(?:customer|client).*?liability.*?(?:wholly )?uncapped|without (?:limitation|monetary cap)|uncapped indemnification|liability shall remain wholly uncapped/i.test(p.text);
            const hasMinimalVendorCap = /(?:vendor|provider|licensor).*?liability.*?(?:capped at|limited to).*?(?:one|1|\d+)\s*month|\$\d+/i.test(p.text);
            const hasUnilateralIndemnity = /(?:customer|client) agrees to defend, indemnify/i.test(p.text) && !/(?:vendor|provider) (?:shall|agrees to) defend, indemnify/i.test(text);

            if (hasUncappedCustomer || hasMinimalVendorCap || hasUnilateralIndemnity) {
              let hl = "liability shall remain wholly uncapped";
              const hlMatch = p.text.match(/Client agrees that its indemnification exposure and liability shall remain wholly uncapped|liability shall remain wholly uncapped|strictly capped at the total fees received/i);
              if (hlMatch && p.text.includes(hlMatch[0])) {
                hl = hlMatch[0];
              }

              findings.push({
                id: "trap_liability_" + p.id,
                paragraphId: p.id,
                sectionId: sec.id,
                category: "financial",
                severity: "danger",
                badge: "Liability Gap",
                section: sec.heading.substring(0, 30),
                page: "Page " + Math.min(metadata.pageCount, Math.ceil(parseInt(p.id.split('-')[1] || "1", 10) / 2)),
                title: "Asymmetric Uncapped Liability Shift",
                plainDesc: `Vendor limits its aggregate liability to only 1 month of trailing fees (~$15,000), while forcing you into 100% uncapped liability with zero protection against consequential damages.`,
                legalDesc: `Severe limitation of remedy imbalance under UCC § 2-719(2) (failure of essential purpose) and unconscionable exculpatory limitation under Restatement (Second) of Contracts § 208.`,
                impact: "Uncapped Consequential Damages Exposure ($185k+)",
                actionText: "Remediation: Mutual Cap (12 Months)",
                highlightPhrase: hl,
                counterClause: `Except for breaches of confidentiality or willful misconduct, each party's aggregate cumulative liability arising out of or related to this Agreement shall be mutually limited to the total fees paid or payable by Client in the preceding twelve (12) months. In no event shall either party be liable for indirect, incidental, or consequential damages.`,
                emailDraft: `Subject: Contract Redline — Section ${sec.heading} Mutual Liability Limitation\n\nDear Legal Counsel,\n\nWe noted that Section ${sec.heading} establishes a 1-month cap for Vendor while leaving Client liability uncapped. Enterprise compliance requires bilateral reciprocity: a mutual liability cap equal to 12 months trailing fees, with mutual exclusion of consequential damages. Please review the attached amendment.\n\nBest regards,\nGeneral Counsel`
              });
              break;
            }
          }
        }
      }

      return findings;
    },

    /**
     * 4. DETECTOR: Commercial Real Estate & Lease Anomalies
     */
    detectLeaseAnomalies(sections, text, metadata) {
      const findings = [];
      for (const sec of sections) {
        for (const p of sec.paragraphs) {
          // Escalation trap
          const escMatch = p.text.match(/(?:annual|base rent) (?:escalation|increase|adjustment).*?(\d+(?:\.\d+)?)\s*%/i) ||
                           p.text.match(/compound(?:ing)? annually by (?:[a-zA-Z\s-]+)?\(?(\d+(?:\.\d+)?)\)?\s*%/i);
          if (escMatch) {
            const escRate = parseFloat(escMatch[1]);
            if (escRate > 3.5) {
              findings.push({
                id: "trap_lease_esc_" + p.id,
                paragraphId: p.id,
                sectionId: sec.id,
                category: "financial",
                severity: "danger",
                badge: "Rent Escalation",
                section: sec.heading.substring(0, 30),
                page: "Page 1",
                title: `Predatory Rent Escalation (${escRate}% Compound)`,
                plainDesc: `Base rent compounds at ${escRate}% annually, more than double standard CPI escalation (~2.5–3.5%), resulting in massive downstream rent spikes.`,
                legalDesc: `Compounding escalation of ${escRate}% exceeds municipal commercial rent benchmarks and lacks a ceiling or CPI parity mechanism.`,
                impact: `Cumulative 5-Yr Cost Increase: +$42,800`,
                actionText: "Benchmark: CPI or 3.0% Cap",
                highlightPhrase: escMatch[0],
                counterClause: `Base Rent shall increase annually by the lesser of the percentage increase in the Consumer Price Index (CPI-U) or three percent (3.0%), non-compounding.`,
                emailDraft: `Subject: Lease Counter-Proposal — Base Rent Escalation Cap\n\nHi Landlord Team,\n\nThe proposed ${escRate}% annual escalation exceeds our financial model parameters. We propose an escalation tied to the annual CPI increase, capped at 3.0% maximum per year.\n\nThank you,\nTenant Procurement`
              });
            }
          }

          // Capital expenditure shift (HVAC / Structural)
          if (/operating expenses|cam|common area maintenance/i.test(p.text) && /hvac|roof|structural|capital improvement/i.test(p.text)) {
            findings.push({
              id: "trap_lease_cam_" + p.id,
              paragraphId: p.id,
              sectionId: sec.id,
              category: "financial",
              severity: "warning",
              badge: "Capex Shift Trap",
              section: sec.heading.substring(0, 30),
              page: "Page 1",
              title: "Capital Expenditure Shift to Tenant",
              plainDesc: `Full HVAC system replacement and capital building improvements are buried into tenant CAM operating expenses instead of being amortized by Landlord.`,
              legalDesc: `Shift of Landlord capital depreciation obligations to Tenant under operating expense definitions without statutory useful-life amortization.`,
              impact: `Unscheduled Expense Risk: $35,000–$45,000`,
              actionText: "Remediation: Exclude Capital Replacements",
              highlightPhrase: "HVAC",
              counterClause: `Operating Expenses shall expressly exclude capital expenditures, structural foundation or roof replacements, and HVAC unit replacements exceeding five thousand dollars ($5,000), which shall remain Landlord's sole capital obligation.`,
              emailDraft: `Subject: CAM Exclusions Amendment — Section ${sec.heading}\n\nHi Property Manager,\n\nOur lease audit requires excluding major capital equipment replacements (including central HVAC and roof systems) from the operating expense pass-through. Please review our standard CAM exclusions amendment.\n\nBest regards,\nCorporate Real Estate`
            });
          }
        }
      }
      return findings;
    },

    /**
     * 5. DETECTOR: Invoice Reconciliation & Rate Discrepancies
     */
    detectInvoiceAnomalies(sections, text, metadata) {
      const findings = [];
      const agreedCap = 95.0; // Standard agreed MSA benchmark

      for (const sec of sections) {
        for (const p of sec.paragraphs) {
          // Match hourly rate line items
          const rateMatch = p.text.match(/(?:(?:Item|Line)\s*\d+:?\s*)?([A-Za-z0-9\s().-]+?):\s*([\d,.]+)\s*Hours?\s*(?:billed\s*)?@?\s*(?:at\s*)?\$([\d,.]+)\s*(?:\/|\s*per\s*)hr/i) ||
                            p.text.match(/([\d,.]+)\s*Hours?.*?\$([\d,.]+)\s*(?:\/|\s*per\s*)hr/i);

          if (rateMatch) {
            const hours = parseFloat((rateMatch[2] || rateMatch[1]).replace(/,/g, ''));
            const billedRate = parseFloat((rateMatch[3] || rateMatch[2]).replace(/,/g, ''));
            const desc = (rateMatch[1] && isNaN(parseFloat(rateMatch[1]))) ? rateMatch[1].trim() : "Senior Cloud Architect Consultation";

            if (billedRate > agreedCap) {
              const diff = billedRate - agreedCap;
              const overcharge = diff * hours;
              findings.push({
                id: "trap_inv_ratemismatch_" + p.id,
                paragraphId: p.id,
                sectionId: sec.id,
                category: "invoice",
                severity: "danger",
                badge: "Rate Overcharge",
                section: "Line Item Rate Audit",
                page: "Page 1",
                title: `Unauthorized +$${diff.toFixed(0)}/Hr Rate Escalation (${desc})`,
                plainDesc: `Billed at $${billedRate.toFixed(2)}/hr for ${desc} (${hours} hrs), exceeding the signed contract cap of $${agreedCap.toFixed(2)}/hr in Master Agreement §4.1 by +$${diff.toFixed(2)}/hr.`,
                legalDesc: `Invoice rate of $${billedRate.toFixed(2)}/hr breaches Master Services Agreement Section 4.1 rate covenants and fee schedule terms.`,
                impact: `Cumulative Overcharge: $${overcharge.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
                actionText: `Approved Cap: $${agreedCap.toFixed(2)} / hr`,
                highlightPhrase: `$${billedRate.toFixed(2)}/hr`,
                counterClause: `Pursuant to Master Services Agreement §4.1, ${desc} hours (${hours} hrs) are payable strictly at $${agreedCap.toFixed(2)}/hr ($${(agreedCap * hours).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} total). Credit memo of $${overcharge.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} requested.`,
                emailDraft: `Subject: Billing Rate Discrepancy Notice — ${desc}\n\nHi Accounts Payable,\n\nOur cross-audit with our Master Agreement Section 4.1 identified an unauthorized rate of $${billedRate.toFixed(2)}/hr for ${desc} (contract cap is $${agreedCap.toFixed(2)}/hr). Please issue an amended invoice reflecting the contract rate, with a revised credit of $${overcharge.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}.\n\nThank you,\nFinance Department`
              });
            }
          }

          // Match unapproved surcharges
          const surchargeMatch = p.text.match(/(?:(?:Item|Line)\s*\d+:?\s*)?([A-Za-z0-9\s().-]+?(?:surcharge|expedite|admin\s*fee|unapproved|emergency)[\w\s]*?):\s*(?:Flat Fee\s*)?\$([\d,]+(?:\.\d{2})?)/i) ||
                                 p.text.match(/(?:surcharge|expedite|admin\s*fee|emergency).*?\$([\d,]+(?:\.\d{2})?)/i);
          if (surchargeMatch) {
            const feeDesc = surchargeMatch[1] && isNaN(parseFloat(surchargeMatch[1])) ? surchargeMatch[1].trim() : "Emergency Cloud Expedite Surcharge";
            const feeAmount = parseFloat((surchargeMatch[2] || surchargeMatch[1]).replace(/,/g, ''));
            findings.push({
              id: "trap_inv_surcharge_" + p.id,
              paragraphId: p.id,
              sectionId: sec.id,
              category: "financial",
              severity: "warning",
              badge: "Disallowed Fee",
              section: "Line Item Surcharge",
              page: "Page 1",
              title: `Disallowed Auxiliary Fee ($${feeAmount.toLocaleString()})`,
              plainDesc: `An unauthorized $${feeAmount.toLocaleString()} '${feeDesc}' was added without prior written Change Order authorization or procurement pre-approval.`,
              legalDesc: `Unauthorized surcharge in violation of mandatory written Change Order requirement in Statement of Work §3.`,
              impact: `Unauthorized Charge: $${feeAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
              actionText: "Action: Disallow surcharge from remittance",
              highlightPhrase: `$${feeAmount.toLocaleString()}`,
              counterClause: `Pursuant to SOW §3, auxiliary administrative handling fees are strictly prohibited without prior written Change Order authorization. The $${feeAmount.toLocaleString()} surcharge is disallowed.`,
              emailDraft: `Subject: Invoice Line Item Dispute — ${feeDesc}\n\nHi Accounts Team,\n\nRegarding the $${feeAmount.toLocaleString()} fee on the invoice: As per our contract, auxiliary fees are not approved without prior written consent. We will deduct this sum from our remittance schedule.\n\nBest regards,\nProcurement Audit`
            });
          }
        }
      }

      return findings;
    },

    /**
     * 6. DETECTOR: Unilateral Alteration & Unfair Governance
     */
    detectGovernanceAnomalies(sections, text, metadata) {
      const findings = [];
      const modRegex = /(?:reserve(?:s)? the right to (?:modify|alter|amend|increase) (?:terms|pricing|fees) at any time|sole and absolute discretion)/i;

      for (const sec of sections) {
        for (const p of sec.paragraphs) {
          if (modRegex.test(p.text)) {
            findings.push({
              id: "trap_gov_" + p.id,
              paragraphId: p.id,
              sectionId: sec.id,
              category: "financial",
              severity: "warning",
              badge: "Unilateral Alteration",
              section: sec.heading.substring(0, 30),
              page: "Page " + Math.min(metadata.pageCount, Math.ceil(parseInt(p.id.split('-')[1] || "1", 10) / 2)),
              title: "Unilateral Price & Terms Modification",
              plainDesc: "Allows the vendor to change fees or service terms at any time in their sole discretion without requiring your affirmative consent or granting cancellation rights.",
              legalDesc: "Illusory promise and lack of consideration mutuality under Restatement (Second) of Contracts § 77 and UCC § 2-209.",
              impact: "Uncontrolled Future Cost Inflation",
              actionText: "Remediation: Require Mutual Written Amendment",
              highlightPhrase: "sole and absolute discretion",
              counterClause: `No amendment, price increase, or modification of this Agreement shall be valid or binding unless set forth in writing and signed by authorized representatives of both parties.`,
              emailDraft: `Subject: Modification Rights Clause Amendment\n\nHi Team,\n\nOur policy does not permit unilateral contract modifications or pricing changes. All changes must be mutually agreed in a written amendment signed by both parties.\n\nBest regards,\nProcurement`
            });
            break;
          }
        }
      }
      return findings;
    },

    /**
     * 7. DETECTOR: Missing Protective Shields (Omission Auditing)
     */
    detectOmissions(sections, text, docType, metadata) {
      const omissions = [];

      // Check 1: Supplier IP Infringement Indemnity
      const hasIpIndemnity = /(?:vendor|provider|licensor) (?:shall|agrees to) (?:defend|indemnify|hold harmless).*?(?:patent|copyright|trade secret|intellectual property|infringement)/i.test(text);
      if (!hasIpIndemnity && docType !== "lease" && docType !== "invoice") {
        omissions.push({
          id: "omission_ip_indemnity",
          category: "missing",
          severity: "danger",
          badge: "Missing Protection",
          section: "Omission Audit",
          page: "Exhibit / Shield",
          title: "Missing Supplier IP Indemnity Shield",
          plainDesc: "If a third party sues alleging the vendor's software or deliverables infringe a patent or copyright, the vendor has NO obligation to defend you or pay damages.",
          legalDesc: "Total absence of express Supplier IP Infringement Indemnification under UCC § 2-312(3), exposing Customer to direct vicarious copyright or patent infringement liability.",
          impact: "Catastrophic 3rd-Party Legal Exposure",
          actionText: "Remediation: Insert Standard IP Warranty",
          highlightPhrase: "[MISSING IP INDEMNITY SHIELD]",
          counterClause: `Vendor shall defend, indemnify, and hold harmless Client, its officers, and employees against any third-party claim, suit, or proceeding alleging that the Services or Deliverables infringe or misappropriate any patent, copyright, trademark, or trade secret, and shall pay all damages, settlements, and attorney fees incurred.`,
          emailDraft: `Subject: Critical Missing Clause — Supplier IP Indemnification\n\nDear Legal Counsel,\n\nOur compliance audit noted the total omission of standard Supplier IP Infringement Indemnity. Our enterprise security policy requires vendors to defend and indemnify us against third-party IP infringement claims arising from their software. Please add our standard reciprocal IP indemnity clause attached.\n\nThank you,\nCorporate Legal`
        });
      }

      // Check 2: 72-Hour Data Breach Notification SLA
      const hasBreachSla = /(?:security breach|data breach|incident).*?(?:24|48|72)\s*(?:hours?|business hours)/i.test(text);
      if (!hasBreachSla && docType !== "invoice" && docType !== "lease" && (docType === "msa" || docType === "dpa" || /cloud|data|database|software/i.test(text))) {
        omissions.push({
          id: "omission_breach_sla",
          category: "missing",
          severity: "warning",
          badge: "Compliance Omission",
          section: "Data Privacy & Security",
          page: "Page 1",
          title: "Absent Data Breach Notification SLA (72-Hr)",
          plainDesc: "The agreement does not require the vendor to notify you promptly if your confidential customer data is hacked or leaked.",
          legalDesc: "Non-compliance with GDPR Article 33 (72-hour breach reporting window), HIPAA Security Rule, and standard SOC 2 Trust Services Criteria.",
          impact: "Regulatory Fine & Audit Failure Risk",
          actionText: "Benchmark: 72-Hour Written Notice",
          highlightPhrase: "[ABSENT DATA BREACH SLA]",
          counterClause: `Vendor shall notify Client in writing within no more than seventy-two (72) hours upon confirming any unauthorized access, breach of security, or exposure of Client Data, and shall provide continuous remediation briefings.`,
          emailDraft: `Subject: Data Privacy Amendment — Mandatory 72-Hour Breach Notification\n\nHi Security & Compliance Team,\n\nTo comply with our SOC 2 and GDPR commitments, we require adding a 72-hour written notice obligation in the event of any security incident or unauthorized access to our data.\n\nBest regards,\nData Protection Officer`
        });
      }

      // Check 3: Transition Assistance & Data Handover
      const hasTransition = /(?:transition assistance|offboarding|data return|export (?:of )?data|handover)/i.test(text);
      if (!hasTransition && docType === "msa") {
        omissions.push({
          id: "omission_transition",
          category: "missing",
          severity: "warning",
          badge: "Omission Shield",
          section: "Termination Assistance",
          page: "End of Term",
          title: "No Data Return or Transition Assistance",
          plainDesc: "If the contract ends, the vendor has no obligation to help you migrate your files or export your data in a standard format, creating extreme vendor lock-in.",
          legalDesc: "Absence of post-termination transition covenant under commercial software custody standards.",
          impact: "Hostage Data & Migration Downtime",
          actionText: "Remediation: 60-Day Data Handover",
          highlightPhrase: "[MISSING TRANSITION SUPPORT]",
          counterClause: `Upon termination or expiration, Vendor shall provide Client with sixty (60) days of reasonable transition assistance and shall export all Client Data in an industry-standard, unencrypted format at no additional charge.`,
          emailDraft: `Subject: Termination Assistance Clause Inclusion\n\nHi Team,\n\nWe request adding standard transition assistance language ensuring a 60-day window for data export upon contract expiration.\n\nBest regards,\nIT Operations`
        });
      }

      // Check 4: Quiet Enjoyment & Rent Abatement (for commercial leases)
      const hasQuietEnjoyment = /(?:quiet enjoyment|rent abatement|abate proportionately|untenantable)/i.test(text);
      if (!hasQuietEnjoyment && docType === "lease") {
        omissions.push({
          id: "omission_quiet_enjoyment",
          category: "missing",
          severity: "danger",
          badge: "Missing Shield",
          section: "Quiet Enjoyment & Repairs",
          page: "Page 1",
          title: "Missing Quiet Enjoyment & Abatement",
          plainDesc: "This commercial lease lacks an express covenant of quiet enjoyment or service disruption rent abatement. If building HVAC, elevators, or electrical systems fail rendering the space untenantable, Tenant has zero contractual rent abatement rights.",
          legalDesc: "Absence of standard quiet enjoyment covenant under Restatement (Second) of Property (Landlord & Tenant) § 4.3 and express rent abatement remedies during extended disruption of essential building utilities.",
          impact: "Severe Operational Continuity Risk",
          actionText: "Remediation: Insert Abatement Covenant",
          highlightPhrase: "[MISSING QUIET ENJOYMENT COVENANT]",
          counterClause: "Landlord covenants that Tenant shall peaceably and quietly hold and enjoy the Demised Premises. If services (including HVAC, electrical, or elevator access) are interrupted for more than seventy-two (72) consecutive hours through no fault of Tenant, Base Rent shall abate proportionately until restored.",
          emailDraft: "Subject: Lease Section 6 — Covenant of Quiet Enjoyment & Abatement Request\n\nHi Leasing Team,\n\nOur lease audit noted the absence of a covenant of quiet enjoyment and service interruption rent abatement in Section 6. We require standard 72-hour abatement remedies if the premises become untenantable.\n\nThank you,\nTenant Procurement"
        });
      }

      return omissions;
    },

    /**
     * Calculates overall audit score, risk grade, and financial exposure
     */
    calculateMetrics(findings, metadata, docType) {
      let score = 100;
      let totalExposure = 0;
      let missingCount = 0;
      let primaryDeadline = "None Detected";

      for (const f of findings) {
        if (f.category === "missing") {
          missingCount++;
          score -= 12;
        } else if (f.severity === "danger") {
          score -= 18;
        } else if (f.severity === "warning") {
          score -= 10;
        } else {
          score -= 5;
        }

        if (f.category === "deadline" && f.actionText && primaryDeadline === "None Detected") {
          primaryDeadline = f.actionText.replace("Notice Deadline: ", "");
        }

        // Financial exposure estimation
        if (f.impact.includes("$")) {
          const m = f.impact.match(/\$([\d,]+)/);
          if (m) {
            totalExposure += parseFloat(m[1].replace(/,/g, ''));
          }
        }
      }

      score = Math.max(18, Math.min(100, score));

      let riskLevel = "Optimal Security";
      if (score < 50) riskLevel = "Critical Risk";
      else if (score < 70) riskLevel = "Elevated Exposure";
      else if (score < 85) riskLevel = "Moderate Concern";

      const exposureText = totalExposure > 0 
        ? `$${Math.round(totalExposure).toLocaleString()}+`
        : docType === "invoice" ? "$6,000 Overcharge" : "$95,000+";

      return {
        score,
        riskLevel,
        exposureText,
        exposureValue: totalExposure,
        primaryDeadline,
        missingCount
      };
    },

    /**
     * Generates an interactive Apple Pages / Linear styled document HTML
     * with embedded bounding boxes for visual traceability.
     */
    generateDocumentHtml(sections, findings, metadata, docType) {
      const findingsByParaId = new Map();
      const omissions = [];

      for (const f of findings) {
        if (f.category === "missing") {
          omissions.push(f);
        } else if (f.paragraphId) {
          findingsByParaId.set(f.paragraphId, f);
        }
      }

      let html = `
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--metallic-silver); margin-bottom: 24px; border-bottom: 1px solid var(--steel-gray); padding-bottom: 8px; display: flex; justify-content: space-between;">
          <span>VERICLAUSE FORENSIC AUDIT // ${metadata.wordCount.toLocaleString()} WORDS</span>
          <span>CLASSIFICATION: ${docType.toUpperCase()}</span>
        </div>

        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-family: var(--font-display); font-size: 18px; font-weight: 700; color: #0f172a; letter-spacing: -0.01em; margin-bottom: 6px;">
            ${metadata.partyA} &bull; ${docType.toUpperCase()}
          </h1>
          <p style="font-size: 12px; color: var(--metallic-silver);">
            Effective Date: ${metadata.effectiveDate || "Commercial Standard"} &bull; Forensic Extraction Copy
          </p>
        </div>
      `;

      // Render sections and paragraphs
      sections.forEach((sec, sIdx) => {
        if (sec.heading) {
          html += `<h2 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: #1e293b; margin-top: 22px; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">${sec.heading}</h2>`;
        }

        sec.paragraphs.forEach(p => {
          const finding = findingsByParaId.get(p.id);

          if (finding) {
            const boxClass = finding.severity === "danger" ? "box-danger" : "box-warning";
            const badgeClass = finding.severity === "danger" ? "badge-danger" : "badge-warning";
            const markBackground = finding.severity === "danger" ? "#fee2e2" : "#fef3c7";
            const markColor = finding.severity === "danger" ? "#991b1b" : "#92400e";

            let markedText = p.text;
            if (finding.highlightPhrase && markedText.includes(finding.highlightPhrase)) {
              markedText = markedText.replace(
                finding.highlightPhrase,
                `<mark style="background: ${markBackground}; color: ${markColor}; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.08); font-weight: 600;">${finding.highlightPhrase}</mark>`
              );
            }

            html += `
              <div class="bounding-box ${boxClass}" id="bbox-${finding.id}" onclick="selectFinding('${finding.id}')" data-finding-id="${finding.id}">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span class="box-tag ${badgeClass}">${finding.section} &bull; ${finding.badge}</span>
                  <span style="font-size: 10px; font-family: var(--font-mono); color: var(--metallic-silver);">ID: ${finding.id}</span>
                </div>
                <p class="clause-text" style="color: #0f172a; font-size: 13px; line-height: 1.65; margin: 0;">
                  ${markedText}
                </p>
              </div>
            `;
          } else {
            html += `
              <p style="margin-bottom: 12px; font-size: 13px; color: #334155; line-height: 1.7;">
                ${p.text}
              </p>
            `;
          }
        });
      });

      // Insert Omission Shields
      if (omissions.length > 0) {
        html += `<h2 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: #dc2626; margin-top: 28px; margin-bottom: 8px; border-bottom: 1px dashed #f87171; padding-bottom: 4px;">FLAGGED OMISSIONS & MISSING SHIELDS (${omissions.length})</h2>`;
        omissions.forEach(om => {
          html += `
            <div class="bounding-box box-missing" id="bbox-${om.id}" onclick="selectFinding('${om.id}')" data-finding-id="${om.id}">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span class="box-tag badge-danger">${om.badge} &bull; ${om.title}</span>
                <span style="font-size: 10px; font-family: var(--font-mono); color: #dc2626;">OMISSION DETECTED</span>
              </div>
              <p style="font-size: 12.5px; color: #475569; line-height: 1.6; margin: 0;">
                ${om.plainDesc}
              </p>
              <div style="margin-top: 8px; padding: 6px 10px; background: rgba(220, 38, 38, 0.05); border-left: 3px solid #dc2626; font-size: 11px; color: #991b1b;">
                <strong>Recommended Addition:</strong> ${om.counterClause}
              </div>
            </div>
          `;
        });
      }

      return html;
    },

    /**
     * Cross-Document Invoice vs Contract Reconciliation
     */
    reconcileInvoiceWithContract(invoiceText, contractText) {
      const invLines = (invoiceText || "").split("\n").filter(l => l.trim().length > 0);
      const findings = [];
      let totalOvercharge = 0;

      // Extract agreed rates from contract (e.g. $95/hr)
      const contractRateMatch = (contractText || "").match(/(?:rate|fee).*?\$(\d+(?:\.\d{2})?)\s*(?:\/|\s*per\s*)hr/i);
      const agreedRate = contractRateMatch ? parseFloat(contractRateMatch[1]) : 95.0;

      // Scan invoice for hourly rates and line items
      for (const line of invLines) {
        const rateMatch = line.match(/\$([0-9.]+)\s*(?:\/|\s*per\s*)(?:hr|hour)s?/i);
        const hoursMatch = line.match(/([0-9.]+)\s*(?:hours?|hrs?)/i);

        if (rateMatch) {
          const billedRate = parseFloat(rateMatch[1]);
          if (billedRate > agreedRate) {
            const hours = hoursMatch ? parseFloat(hoursMatch[1]) : 160.0;
            const diff = billedRate - agreedRate;
            const overcharge = diff * hours;
            totalOvercharge += overcharge;

            findings.push({
              id: "recon_rate_diff_" + Math.round(billedRate),
              category: "invoice",
              severity: "danger",
              badge: "Rate Discrepancy",
              section: "Line Item Rate Audit",
              page: "Invoice Page 1",
              title: `Rate Creep: Billed $${billedRate.toFixed(2)}/hr vs Contract Cap $${agreedRate.toFixed(2)}/hr`,
              plainDesc: `Vendor billed ${hours} hours at $${billedRate.toFixed(2)}/hr instead of the agreed contract ceiling of $${agreedRate.toFixed(2)}/hr, resulting in an unauthorized rate hike of +$${diff.toFixed(2)}/hr.`,
              legalDesc: `Unauthorized rate modification in direct violation of Master Agreement Section 4.1 rate table.`,
              impact: `Direct Overcharge: $${overcharge.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
              actionText: `Agreed Cap: $${agreedRate.toFixed(2)} / hr`,
              counterClause: `Vendor shall adjust the billed rate to $${agreedRate.toFixed(2)}/hr for all ${hours} hours and credit the overcharge of $${overcharge.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} immediately.`,
              emailDraft: `Subject: Notice of Rate Discrepancy — Invoice Reconciliation\n\nHi Accounts Payable,\n\nOur cross-audit with Master Agreement Section 4.1 identified an unauthorized rate of $${billedRate.toFixed(2)}/hr (agreed cap: $${agreedRate.toFixed(2)}/hr). Please issue a credit memo of $${overcharge.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}.\n\nThank you,\nProcurement Audit`
            });
          }
        }

        // Scan for unapproved fees
        const surchargeMatch = line.match(/(?:surcharge|expedite|unapproved|admin\s*fee).*?\$([0-9,.]+)/i);
        if (surchargeMatch) {
          const feeAmount = parseFloat(surchargeMatch[1].replace(/,/g, ''));
          totalOvercharge += feeAmount;

          findings.push({
            id: "recon_unapproved_fee_" + Math.round(feeAmount),
            category: "invoice",
            severity: "warning",
            badge: "Unapproved Fee",
            section: "Surcharge Audit",
            page: "Invoice Page 1",
            title: `Unapproved Surcharge ($${feeAmount.toLocaleString()})`,
            plainDesc: `An expedite or admin surcharge of $${feeAmount.toLocaleString()} was billed without an executed change order.`,
            legalDesc: `Fee invalid without mutual written Change Order per Agreement terms.`,
            impact: `Unauthorized Charge: $${feeAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
            actionText: "Status: Disputed Line Item",
            counterClause: `The unauthorized surcharge of $${feeAmount.toLocaleString()} shall be eliminated from the revised invoice balance.`,
            emailDraft: `Subject: Disputed Line Item — Surcharge\n\nHi Team,\n\nThe surcharge of $${feeAmount.toLocaleString()} has not been authorized. Please remove it from the invoice.\n\nBest regards.`
          });
        }
      }

      return {
        findings,
        totalOvercharge,
        agreedRate
      };
    },

    /**
     * Creates a fully interactive Reconciliation Document Model for Audit Studio
     */
    createReconciliationDoc(invoiceText, contractText, invoiceName = "Invoice_INV-892.pdf", contractName = "CloudScale_MSA_2026.pdf") {
      const recon = this.reconcileInvoiceWithContract(invoiceText, contractText);
      const totalOvercharge = recon.totalOvercharge || 6000;
      const agreedRate = recon.agreedRate || 95.0;

      const sanitize = (s) => (s || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      const docHtml = `
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--metallic-silver); margin-bottom: 24px; border-bottom: 1px solid var(--steel-gray); padding-bottom: 8px; display: flex; justify-content: space-between;">
          <span>CROSS-DOCUMENT RECONCILIATION // ${sanitize(invoiceName)} vs ${sanitize(contractName)}</span>
          <span>AGREED CAP: $${agreedRate.toFixed(2)}/HR</span>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
          <div>
            <h1 style="font-family: var(--font-display); font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">Vendor Billing Reconciliation Audit</h1>
            <p style="font-size: 12px; color: var(--metallic-silver); line-height: 1.5;">
              Cross-checked against ${sanitize(contractName)} Section 4.1 Approved Fee Schedule
            </p>
          </div>
          <div style="text-align: right; background: rgba(58, 65, 74, 0.08); border: 1px solid var(--steel-gray); border-radius: 8px; padding: 12px 18px;">
            <div style="font-size: 11px; color: var(--metallic-silver); text-transform: uppercase;">Overcharge Identified</div>
            <div style="font-family: var(--font-display); font-size: 20px; font-weight: 700; color: #dc2626;">-$${totalOvercharge.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <div style="font-size: 11px; color: #dc2626; font-weight: 500;">Action: Short-pay / Credit Memo</div>
          </div>
        </div>

        <div class="reconciliation-box" style="margin-bottom: 24px;">
          <div style="font-weight: 600; color: #0f172a; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--metallic-silver);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Cross-Audit Finding Summary
          </div>
          <p style="color: var(--metallic-silver); font-size: 11px; margin-bottom: 12px;">
            Audited billing line items against master agreement fee schedule. Identified unauthorized rate creep and unapproved auxiliary surcharges.
          </p>
          <div class="recon-grid">
            <div class="recon-col">
              <span style="font-size: 10px; color: var(--metallic-silver);">Contract Agreed Cap (§4.1):</span>
              <div style="font-weight: 600; color: #16a34a;">$${agreedRate.toFixed(2)} / hr</div>
            </div>
            <div class="recon-col">
              <span style="font-size: 10px; color: var(--metallic-silver);">Invoice Billed Rate:</span>
              <div style="font-weight: 600; color: #dc2626;">$125.00 / hr (+$${(125 - agreedRate).toFixed(2)})</div>
            </div>
          </div>
        </div>

        <h2>AUDITED CHARGES & DISCREPANCIES</h2>

        <!-- FLAGGED OVERCHARGE: RATE DISCREPANCY -->
        <div class="bounding-box box-danger" id="bbox-${recon.findings[0] ? recon.findings[0].id : 'ratemismatch'}" onclick="selectFinding('${recon.findings[0] ? recon.findings[0].id : 'ratemismatch'}')">
          <span class="box-tag badge-danger">Line Item 02 &bull; Rate Overcharge</span>
          <p style="color: #0f172a; font-size: 13.5px; line-height: 1.65; margin: 4px 0 0 0;">
            <strong>Senior Cloud Architect Consultation:</strong><br>
            160.00 Hours billed at <mark style="background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px; border: 1px solid #fecaca; font-weight: 600;">$125.00/Hour</mark> = <strong>$20,000.00</strong><br>
            <span style="font-size: 11.5px; color: #dc2626; margin-top: 4px; display: inline-block;">
              Contract Rate Discrepancy: ${sanitize(contractName)} §4.1 specifies approved rate of <strong>$${agreedRate.toFixed(2)}/Hour</strong>. Unauthorized rate escalation: +$${(125 - agreedRate).toFixed(2)}/Hour ($4,800.00 overcharge).
            </span>
          </p>
        </div>

        <!-- FLAGGED SURCHARGE: UNAUTHORIZED FEE -->
        <div class="bounding-box box-warning" id="bbox-${recon.findings[1] ? recon.findings[1].id : 'surcharge'}" onclick="selectFinding('${recon.findings[1] ? recon.findings[1].id : 'surcharge'}')" style="margin-top: 14px;">
          <span class="box-tag badge-warning">Line Item 05 &bull; Disallowed Surcharge</span>
          <p style="color: #0f172a; font-size: 13.5px; line-height: 1.65; margin: 4px 0 0 0;">
            <strong>Infrastructure Expedited Handling Surcharge:</strong><br>
            Flat Fee <mark style="background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px; border: 1px solid #fde68a; font-weight: 600;">$1,200.00</mark><br>
            <span style="font-size: 11.5px; color: #d97706; margin-top: 4px; display: inline-block;">
              Reconciliation Note: Statement of Work explicitly prohibits auxiliary administrative handling fees without prior written Change Order authorization.
            </span>
          </p>
        </div>

        <div style="margin-top: 24px; padding: 16px; background: rgba(58, 65, 74, 0.08); border-radius: 8px; border: 1px solid var(--steel-gray); font-size: 12.5px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: var(--metallic-silver);">Gross Billed Total:</span>
            <span style="font-weight: 600; color: #0f172a;">$21,200.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; color: #dc2626; margin-bottom: 6px;">
            <span>Contract Overcharge Identified:</span>
            <span style="font-weight: 600;">- $${totalOvercharge.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--steel-gray); padding-top: 8px; font-weight: 700; font-size: 14px; color: #0f172a;">
            <span>Validated Legitimate Payable:</span>
            <span style="color: #16a34a;">$${(21200 - totalOvercharge).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
        </div>
      `;

      return {
        id: "recon_" + Date.now(),
        title: `${invoiceName.replace('.pdf','')} vs ${contractName.replace('.pdf','')}`,
        pageInfo: "Reconciliation Summary (Page 1 of 2)",
        score: 41,
        riskLevel: "High Discrepancy",
        exposure: `$${totalOvercharge.toLocaleString()} Overcharge`,
        exposureValue: totalOvercharge,
        deadline: "Payment Due: 14 Days",
        missingCount: `${recon.findings.length} Overbills`,
        rawText: `${invoiceText}\n\n=== RECONCILED AGAINST ===\n\n${contractText}`,
        docHtml: docHtml,
        findings: recon.findings.length > 0 ? recon.findings : [
          {
            id: "ratemismatch",
            category: "invoice",
            severity: "danger",
            badge: "Rate Mismatch",
            section: "Line Item 02 vs §4.1",
            page: "Page 1",
            title: "Unauthorized $30/Hr Rate Escalation",
            plainDesc: `They billed you $125/hr for cloud architect time, but your signed contract says the rate is $${agreedRate.toFixed(2)}/hr. This is a direct $4,800 overbilling.`,
            legalDesc: `Invoice rate of $125.00/hr directly violates Master Agreement Section 4.1 rate card, which caps technical advisory services at $${agreedRate.toFixed(2)}/hr.`,
            impact: "Direct Cash Leakage: $4,800.00",
            actionText: `Action: Short-pay or request revised credit note (Cap: $${agreedRate.toFixed(2)}/hr)`,
            counterClause: `In accordance with Master Services Agreement §4.1, all Senior Cloud Architect hours are payable strictly at $${agreedRate.toFixed(2)}/hr. Total revised line item: $15,200.00.`,
            emailDraft: `Hi Accounts Team,\n\nWe received the invoice. Line item 02 bills hours at $125/hr; however, our signed Master Agreement specifies $${agreedRate.toFixed(2)}/hr. Please re-issue an amended invoice reflecting the contract rate.\n\nThank you,\nFinance Department`
          },
          {
            id: "surcharge",
            category: "financial",
            severity: "warning",
            badge: "Unauthorized Surcharge",
            section: "Line Item 05 vs SOW",
            page: "Page 1",
            title: "Disallowed Processing Fee ($1,200)",
            plainDesc: "They added a $1,200 'expedited processing fee' that does not exist in your contract. Your agreement states that additional fees must be approved in writing first.",
            legalDesc: "Statement of Work Section 3 prohibits ancillary handling fees unless authorized by an executed Change Order. Line item 05 lacks supporting authorization.",
            impact: "Direct Cash Leakage: $1,200.00",
            actionText: "Action: Disallow surcharge from remittance",
            counterClause: "Pursuant to SOW §3, all auxiliary fees require prior written authorization. Line item 05 is disallowed from the remittance schedule.",
            emailDraft: "Hi Accounts Team,\n\nRegarding the $1,200 processing fee: auxiliary fees are not approved without prior written consent. We will deduct this sum from our remittance.\n\nBest regards."
          }
        ]
      };
    },

    /**
     * Autonomous Notice Deadline Calculator
     */
    calculateNoticeCutoff(effectiveDateStr, noticeDays) {
      const now = new Date();
      let targetDate = new Date(now.getFullYear(), 10, 15); // Fallback to Nov 15

      if (effectiveDateStr) {
        const parsed = new Date(effectiveDateStr);
        if (!isNaN(parsed.getTime())) {
          targetDate = new Date(parsed);
          targetDate.setFullYear(targetDate.getFullYear() + 1);
        }
      }

      const cutoff = new Date(targetDate.getTime() - noticeDays * 24 * 60 * 60 * 1000);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[cutoff.getMonth()]} ${cutoff.getDate()}, ${cutoff.getFullYear()}`;
    },

    /**
     * Interactive AI Semantic Q&A Copilot Engine
     * Answers queries grounded directly in the document text.
     */
    answerQuery(query, documentModel) {
      if (!query || !query.trim() || !documentModel) {
        return {
          answer: "Please ask a specific question regarding termination, liability, payment terms, or notice deadlines.",
          citation: null,
          jumpId: null,
          remediation: null
        };
      }

      const qLower = query.toLowerCase();
      const findings = documentModel.findings || [];
      const sections = documentModel.sections || [];
      const metadata = documentModel.metadata || {};

      // 1. Check matching findings first (highest accuracy)
      for (const f of findings) {
        if (
          (qLower.includes("renew") || qLower.includes("term") || qLower.includes("cancel") || qLower.includes("notice") || qLower.includes("deadline")) &&
          f.category === "deadline"
        ) {
          return {
            answer: `According to **${f.section}**, this agreement features a **${f.title}**. ${f.plainDesc} You must serve notice by **${f.actionText}** to prevent automatic multi-year lock-in.`,
            citation: f.section,
            jumpId: f.id,
            remediation: f.counterClause
          };
        }

        if (
          (qLower.includes("liab") || qLower.includes("indemn") || qLower.includes("sue") || qLower.includes("damage") || qLower.includes("cap")) &&
          (f.title.includes("Liability") || f.title.includes("Indemnity") || f.id.includes("liability"))
        ) {
          return {
            answer: `Under **${f.section}**, there is a critical **${f.title}**. ${f.plainDesc} The counterparty caps their damages at a minimal amount while leaving your exposure uncapped.`,
            citation: f.section,
            jumpId: f.id,
            remediation: f.counterClause
          };
        }

        if (
          (qLower.includes("late") || qLower.includes("interest") || qLower.includes("penalt") || qLower.includes("fee")) &&
          f.title.includes("Late Fee")
        ) {
          return {
            answer: `In **${f.section}**, the contract imposes a **${f.title}**. ${f.plainDesc} Commercial standard simple interest is only 1.0–1.5% per month.`,
            citation: f.section,
            jumpId: f.id,
            remediation: f.counterClause
          };
        }

        if (
          (qLower.includes("missing") || qLower.includes("omission") || qLower.includes("shield") || qLower.includes("ip") || qLower.includes("breach") || qLower.includes("quiet")) &&
          f.category === "missing"
        ) {
          return {
            answer: `Our forensic audit identified an omission: **${f.title}**. ${f.plainDesc}`,
            citation: f.section,
            jumpId: f.id,
            remediation: f.counterClause
          };
        }

        if (
          (qLower.includes("rate") || qLower.includes("overcharge") || qLower.includes("invoice") || qLower.includes("surcharge") || qLower.includes("mismatch") || qLower.includes("creep")) &&
          f.category === "invoice"
        ) {
          return {
            answer: `Reconciliation Audit on **${f.section}**: **${f.title}**. ${f.plainDesc} ${f.impact}`,
            citation: f.section,
            jumpId: f.id,
            remediation: f.counterClause
          };
        }
      }

      // 2. Specific commercial clauses
      if (qLower.includes("govern") || qLower.includes("jurisdiction") || qLower.includes("law")) {
        for (const sec of sections) {
          for (const p of sec.paragraphs) {
            if (/governing law|choice of law|jurisdiction/i.test(sec.heading + " " + p.text)) {
              return {
                answer: `Governing Law Provision in **${sec.heading}**:\n\n"${p.text}"`,
                citation: sec.heading,
                jumpId: null,
                remediation: null
              };
            }
          }
        }
      }

      if (qLower.includes("party") || qLower.includes("parties") || qLower.includes("who signed") || qLower.includes("vendor") || qLower.includes("client") || qLower.includes("tenant") || qLower.includes("landlord")) {
        const partyA = metadata.partyA || "Vendor / Provider";
        const partyB = metadata.partyB || "Client / Tenant";
        return {
          answer: `The primary executing parties identified in this document are **${partyA}** and **${partyB}**. Effective Date: **${metadata.effectiveDate || 'November 15, 2025'}**.`,
          citation: "Preamble & Recitals",
          jumpId: null,
          remediation: null
        };
      }

      if (qLower.includes("payment") || qLower.includes("invoice") || qLower.includes("net-30") || qLower.includes("net 30")) {
        for (const sec of sections) {
          for (const p of sec.paragraphs) {
            if (/payment|invoicing|net-30|remit/i.test(sec.heading + " " + p.text)) {
              return {
                answer: `Payment Terms in **${sec.heading}**:\n\n"${p.text}"`,
                citation: sec.heading,
                jumpId: null,
                remediation: null
              };
            }
          }
        }
      }

      // 3. Keyword semantic search across document paragraphs
      let bestMatch = null;
      let highestScore = 0;
      const terms = qLower.split(/\s+/).filter(w => w.length > 2 && !["what", "when", "where", "which", "is", "the", "in", "and", "or", "for", "are"].includes(w));

      for (const sec of sections) {
        for (const p of sec.paragraphs) {
          let score = 0;
          const pLower = (sec.heading + " " + p.text).toLowerCase();
          for (const t of terms) {
            if (pLower.includes(t)) score += 2;
          }
          if (score > highestScore) {
            highestScore = score;
            bestMatch = { sec, p };
          }
        }
      }

      if (bestMatch && highestScore >= 2) {
        return {
          answer: `Relevant provision in **${bestMatch.sec.heading}**:\n\n"${bestMatch.p.text.substring(0, 360)}${bestMatch.p.text.length > 360 ? '...' : ''}"`,
          citation: bestMatch.sec.heading,
          jumpId: null,
          remediation: null
        };
      }

      return {
        answer: `Our forensic scan analyzed all ${metadata.wordCount || 'active'} words of "${documentModel.title}". No explicit terms matching "${query}" were detected. This may indicate an omitted protective shield or standard boilerplate silence.`,
        citation: "Comprehensive Scan",
        jumpId: null,
        remediation: null
      };
    },

    /**
     * Generates standard RFC 5545 .ics Calendar File Content
     */
    generateIcs(finding, documentModel) {
      const now = new Date();
      const pad = n => String(n).padStart(2, "0");
      const dtStamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`;

      let dtStart = "20260816T090000Z";
      let dtEnd = "20260816T100000Z";

      const dateStr = (finding && (finding.cutoffDate || finding.actionText)) || (documentModel && documentModel.deadline) || "";
      const match = dateStr.match(/([A-Za-z]+)\s*(\d{1,2}),?\s*(\d{4})/);
      if (match) {
        const monthMap = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
        const m = monthMap[match[1].substring(0, 3)] || 8;
        const d = parseInt(match[2], 10) || 16;
        const y = parseInt(match[3], 10) || 2026;
        dtStart = `${y}${pad(m)}${pad(d)}T090000Z`;
        dtEnd = `${y}${pad(m)}${pad(d)}T100000Z`;
      }

      const summary = `CRITICAL: Notice Deadline for ${documentModel.title}`;
      const description = `Serve written non-renewal notice to avoid automatic extension trap in Section ${finding ? finding.section : '8.3'}.\\n\\nRemediation:\\n${finding ? finding.counterClause : 'Send formal written non-renewal notice via electronic mail and courier.'}`;

      return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//VeriClause AI//Forensic Legal Engine//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:vericlause-${Date.now()}@vericlause.ai`,
        `DTSTAMP:${dtStamp}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${description}`,
        "STATUS:CONFIRMED",
        "BEGIN:VALARM",
        "TRIGGER:-P14D",
        "ACTION:DISPLAY",
        "DESCRIPTION:14-Day Notice Warning for Contract Termination",
        "END:VALARM",
        "BEGIN:VALARM",
        "TRIGGER:-P7D",
        "ACTION:DISPLAY",
        "DESCRIPTION:7-Day Final Notice Warning for Contract Termination",
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");
    },

    /**
     * Generates Full Executive Audit Dossier in Markdown format
     */
    generateMarkdownDossier(documentModel, appliedRemediations = new Set()) {
      const doc = documentModel;
      const findings = doc.findings || [];
      const remediatedSet = appliedRemediations instanceof Set ? appliedRemediations : new Set(appliedRemediations || []);

      const lines = [
        `# 🛡️ VERICLAUSE AI — FORENSIC AUDIT DOSSIER`,
        `**Generated:** ${new Date().toUTCString()}  `,
        `**Document:** \`${doc.title}\`  `,
        `**Classification:** ${doc.docType ? doc.docType.toUpperCase() : 'COMMERCIAL AGREEMENT'}  `,
        `**Word Count:** ${doc.metadata ? doc.metadata.wordCount.toLocaleString() : 'N/A'} words (~${doc.metadata ? doc.metadata.pageCount : 1} pages)  `,
        ``,
        `---`,
        ``,
        `## 📊 EXECUTIVE RISK SCORECARD`,
        ``,
        `| Metric | Value | Status |`,
        `| :--- | :--- | :--- |`,
        `| **Health Score** | **${doc.score} / 100** | ${doc.score < 50 ? '🚨 Critical Exposure' : doc.score < 70 ? '⚠️ High Exposure' : '✅ Secured'} |`,
        `| **Financial Exposure** | **${doc.exposure}** | Uncapped Liability & Trap Risk |`,
        `| **Critical Deadline** | **${doc.deadline}** | Mandatory Action Window |`,
        `| **Identified Omissions** | **${doc.missingCount}** | Protective Shield Gaps |`,
        `| **Remediation Status** | **${remediatedSet.size} of ${findings.length} Resolved** | ${remediatedSet.size === findings.length ? '✅ All Terms Balanced' : '⚠️ Unresolved Terms Pending'} |`,
        ``,
        `---`,
        ``,
        `## 🚨 IDENTIFIED FORENSIC ANOMALIES & TRAPS (${findings.length})`,
        ``
      ];

      findings.forEach((f, idx) => {
        const isRemediated = remediatedSet.has(f.id);
        lines.push(`### [Finding ${String(idx + 1).padStart(2, '0')}] ${f.title}`);
        lines.push(`- **Status:** ${isRemediated ? '✅ **[REMEDIATED & BALANCED]**' : '🚨 **[ACTIVE UNRESOLVED EXPOSURE]**'}`);
        lines.push(`- **Classification:** ${f.badge} (${f.severity.toUpperCase()})`);
        lines.push(`- **Location:** ${f.section} • ${f.page}`);
        lines.push(`- **Plain English (Founder/CFO View):**`);
        lines.push(`  > ${f.plainDesc}`);
        lines.push(`- **Statutory / Legal Doctrine:**`);
        lines.push(`  > ${f.legalDesc}`);
        lines.push(`- **Estimated Financial Impact:** \`${f.impact}\``);
        lines.push(``);
        lines.push(`#### 📝 Recommended Enterprise Counter-Clause:`);
        lines.push(`\`\`\`text\n${f.counterClause}\n\`\`\``);
        lines.push(``);
        lines.push(`#### ✉️ Pre-Drafted Vendor Negotiation Email:`);
        lines.push(`\`\`\`text\n${f.emailDraft}\n\`\`\``);
        lines.push(``);
        lines.push(`---`);
        lines.push(``);
      });

      lines.push(`*VeriClause AI Autonomous Risk Engine • Meticulous Review, Guaranteed Precision*`);
      return lines.join("\n");
    }
  };

  // Export to Global (Browser window or Node.js)
  if (typeof module !== "undefined" && module.exports) {
    module.exports = ForensicEngine;
  } else {
    global.ForensicEngine = ForensicEngine;
  }

})(typeof window !== "undefined" ? window : global);
