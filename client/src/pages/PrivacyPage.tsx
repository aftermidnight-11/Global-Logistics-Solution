import { PageMeta } from '@/components/PageMeta';

export function PrivacyPage() {
  return (
    <>
      <PageMeta title="Privacy Policy" description="How Global Logistics Solutions collects and uses inquiry data." path="/privacy" />
      <section className="section">
        <div className="container prose">
          <h1>Privacy Policy</h1>
          <p>Last updated: 1 October 2026</p>
          <h2>What we collect</h2>
          <p>
            When you submit an inquiry or job application, we collect the information you provide (such as name, phone,
            company and message) plus technical metadata used for fraud prevention.
          </p>
          <h2>How we use it</h2>
          <p>
            We use your data to respond to your request, route it to the appropriate regional team, and improve our
            services. We do not sell personal data.
          </p>
          <h2>Retention</h2>
          <p>Inquiry records are retained for up to 24 months unless a longer period is required for legal or contractual reasons.</p>
          <h2>Contact</h2>
          <p>
            For privacy questions, email <a href="mailto:info@global-logisticssolution.com">info@global-logisticssolution.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
