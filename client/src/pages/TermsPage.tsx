import { PageMeta } from '@/components/PageMeta';
import { Link } from 'react-router-dom';

export function TermsPage() {
  return (
    <>
      <PageMeta
        title="Terms of Service & Cargo Claims"
        description="Standard Trading Conditions, Liability Limitations, and Cargo Claims Procedures of Global Logistics Solutions."
        path="/terms"
      />
      <section className="section">
        <div className="container prose">
          <p>
            <Link to="/">Home</Link> / Terms & Liability
          </p>
          <h1>Standard Trading Conditions & Cargo Claims Policy</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Effective Date: 1 November 2026 | Governing Jurisdiction: Kingdom of Saudi Arabia
          </p>

          <div className="card" style={{ background: 'var(--surface-alt, var(--surface))', borderLeft: '4px solid var(--accent)', margin: '1.5rem 0' }}>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              <strong>Notice to Shippers and Consignees:</strong> All freight forwarding, customs brokerage, warehousing, and transportation services provided by Global Logistics Solutions (GLS) are strictly subject to these Standard Trading Conditions. International conventions mandating statutory liability limits apply to all shipments.
            </p>
          </div>

          <h2>1. Scope of Services & Contract Formation</h2>
          <p>
            Global Logistics Solutions acts as an international freight forwarder, licensed customs broker, and multimodal logistics organizer. When acting as an agent on behalf of the customer, contracts with sea carriers, airlines, terminal operators, and hauliers are entered into under standard carrier terms and conditions.
          </p>

          <h2>2. Quotations, Surcharges & Payment Terms</h2>
          <ul>
            <li><strong>Validity:</strong> Freight quotations are based on carrier tariffs, vessel availability, and bunker surcharges prevailing on the quotation date and remain subject to change until booking confirmation.</li>
            <li><strong>Chargeable Weight:</strong> Freight is invoiced on the greater of actual gross weight or volumetric/dimensional weight (Air: L×W×H cm / 6000; Ocean LCL: CBM or metric ton).</li>
            <li><strong>Port Demurrage & Detention:</strong> Free-time allocations are set by container shipping lines and port authorities. Any demurrage, container detention, quay storage, or customs inspection fees incurred beyond allowed free days are the sole responsibility of the customer/consignee.</li>
            <li><strong>Payment:</strong> Invoices are payable upon receipt unless approved under written 30-day corporate credit terms. Invoicing questions should be addressed directly to <a href="mailto:accounts@global-logisticssolution.com">accounts@global-logisticssolution.com</a>.</li>
          </ul>

          <h2>3. Customer Warranties & Dangerous Cargo</h2>
          <p>
            The customer warrants that:
          </p>
          <ul>
            <li>All cargo descriptions, counts, weights, dimensions, and HS codes provided to GLS are complete and accurate.</li>
            <li>Goods are securely packed, stowed, labeled, and marked to withstand normal transport risks and international multi-modal handling.</li>
            <li>No shipment contains illegal, undeclared hazardous materials, counterfeit goods, or contraband prohibited under Saudi Arabian or international law.</li>
            <li>Hazardous materials (IATA DGR / IMDG Code) are declared in writing prior to dispatch with authorized Safety Data Sheets (SDS) and test certificates.</li>
          </ul>

          <h2>4. Statutory Limitations of Liability</h2>
          <p>
            In the event of physical cargo loss, destruction, or damage where GLS is legally determined to be liable, liability is strictly capped pursuant to prevailing international transport conventions and local regulations:
          </p>
          <ul>
            <li><strong>Air Cargo:</strong> Limited pursuant to the Montreal Convention 1999 (as amended) to <strong>22 Special Drawing Rights (SDR)</strong> per kilogram of gross weight affected.</li>
            <li><strong>Ocean Freight:</strong> Governed by the Hague-Visby Rules / Saudi Maritime Code, limited to <strong>666.67 SDR per package</strong> or unit, or <strong>2.00 SDR per kilogram</strong> of gross weight, whichever is higher.</li>
            <li><strong>Overland Road Haulage:</strong> Subject to the CMR Convention or GCC Uniform Transport Regulations, limited to <strong>8.33 SDR per kilogram</strong> of damaged cargo.</li>
            <li><strong>Delay & Indirect Loss:</strong> Under no circumstances shall GLS be liable for indirect, consequential, punitive, or loss-of-profit damages resulting from transit delays, port congestion, customs clearance holds, or weather conditions.</li>
          </ul>

          <h2>5. Marine & Cargo Insurance</h2>
          <p>
            Because carrier liability is strictly limited by international law, <strong>shippers are strongly encouraged to procure Comprehensive All-Risk Cargo Insurance</strong>. GLS can arrange primary open-cover cargo insurance upon written request prior to shipment dispatch.
          </p>

          <h2>6. Cargo Claims Submission Procedure & Time Limits</h2>
          <p>
            Strict adherence to claims notification deadlines is required under international law. Failure to give timely written notice releases the carrier and forwarder from all liability:
          </p>
          <ol>
            <li>
              <strong>Apparent Physical Damage or Shortage:</strong> Notice and clear endorsement must be made immediately on the carrier delivery receipt / Proof of Delivery (POD) at the time of delivery in the presence of the driver.
            </li>
            <li>
              <strong>Concealed / Non-Apparent Damage:</strong> Written notice detailing the loss must be submitted within <strong>seven (7) calendar days</strong> of delivery.
            </li>
            <li>
              <strong>Total Loss / Non-Delivery:</strong> Formal written claim must be filed within <strong>twenty-one (21) calendar days</strong> from the date cargo should have been delivered.
            </li>
            <li>
              <strong>Supporting Documentation Required:</strong> Commercial invoice, packing list, bill of lading/AWB, joint survey inspection report, color photographs of cargo packaging and damage, and salvage valuation.
            </li>
          </ol>
          <p>
            All formal cargo claims must be emailed directly to our risk department at <a href="mailto:info@global-logisticssolution.com">info@global-logisticssolution.com</a> and <a href="mailto:import@global-logisticssolution.com">import@global-logisticssolution.com</a>.
          </p>

          <h2>7. Customs Clearance, Duties & Taxes</h2>
          <p>
            GLS acts as customs broker via electronic single window platforms (FASAH, ZATCA, SABER, SFDA). Customs duties, VAT, inspection fees, and regulatory penalties levied by government authorities remain the sole legal responsibility of the importer of record.
          </p>

          <h2>8. Force Majeure</h2>
          <p>
            Neither party shall be liable for failure or delay in performing freight obligations caused by events beyond reasonable control, including acts of God, war, acts of terrorism, civil unrest, piracy, blockades, strikes, labor disputes, port closures, severe storms, vessel groundings, or government sanctions.
          </p>

          <h2>9. Governing Law & Jurisdiction</h2>
          <p>
            These Standard Trading Conditions and any dispute or claim arising out of freight services provided shall be governed by and construed in accordance with the laws of the <strong>Kingdom of Saudi Arabia</strong>, and subject to the exclusive jurisdiction of the competent courts of Saudi Arabia.
          </p>

          <h2>10. Contact Information</h2>
          <p>
            For questions regarding freight contracts, rate inquiries, or claims assistance:
          </p>
          <ul>
            <li><strong>Freight Rates & Sales:</strong> <a href="mailto:sales@global-logisticssolution.com">sales@global-logisticssolution.com</a></li>
            <li><strong>Import Operations & Customs:</strong> <a href="mailto:import@global-logisticssolution.com">import@global-logisticssolution.com</a></li>
            <li><strong>Accounting & Billing:</strong> <a href="mailto:accounts@global-logisticssolution.com">accounts@global-logisticssolution.com</a></li>
            <li><strong>General Inquiries & Claims:</strong> <a href="mailto:info@global-logisticssolution.com">info@global-logisticssolution.com</a></li>
          </ul>
        </div>
      </section>
    </>
  );
}
