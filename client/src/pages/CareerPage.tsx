import { useId, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { PageMeta } from '@/components/PageMeta';
import { jobRoles } from '@/content/careers';
import { postFormData } from '@/api/client';
import { trackEvent } from '@/utils/analytics';
import '@/styles/card-list.css';

type CareerPageProps = {
  embedded?: boolean;
};

export function CareerPage({ embedded }: CareerPageProps) {
  const { t } = useTranslation();
  const formId = useId();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState(jobRoles[0]?.id ?? '');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = (fd.get('name') as string || '').trim();
    const email = (fd.get('email') as string || '').trim();
    const phone = (fd.get('phone') as string || '').trim();

    if (!name) {
      setError('Please enter your full name.');
      setStatus('error');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    if (!phone) {
      setError('Please enter your phone number.');
      setStatus('error');
      return;
    }

    const role = jobRoles.find((r) => r.id === selectedRole);
    fd.set('roleId', selectedRole);
    fd.set('roleTitle', role?.title ?? selectedRole);
    try {
      await postFormData('/api/careers/apply', fd);
      setStatus('success');
      trackEvent('career_apply', { role: selectedRole });
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Application failed');
    }
  }

  return (
    <>
      {!embedded && (
        <PageMeta title={t('career.heroTitle')} description="Open roles at Global Logistics Solutions across operations and customs." path="/career" />
      )}
      <section className="section">
        <div className="container">
          <h1>{t('career.heroTitle')}</h1>
          <p className="prose">{t('career.heroDesc')}</p>

          <h2>{t('career.openRoles')}</h2>
          <div className="card-list">
            {jobRoles.map((r) => (
              <article key={r.id} className="card job-card">
                <h3 className="job-card__title">{t(`data.jobs.${r.id}.title`, { defaultValue: r.title })}</h3>
                <p className="job-card__meta">
                  {r.location} · {t(`data.jobs.${r.id}.type`, { defaultValue: r.type })}
                </p>
                <p className="job-card__summary">{t(`data.jobs.${r.id}.summary`, { defaultValue: r.summary })}</p>
              </article>
            ))}
          </div>

          <div className="career-about">
            <h2>{t('career.aboutTitle')}</h2>
            <p className="prose">
              {t('career.aboutDesc')}
            </p>
          </div>

          <h2 style={{ marginTop: '2rem' }}>{t('career.mailUs')}</h2>
          {status === 'success' ? (
            <p role="status">{t('career.successMsg')}</p>
          ) : (
            <form className="card" style={{ maxWidth: 520 }} onSubmit={onSubmit}>
              <div className="inquiry-form__honeypot" aria-hidden>
                <input name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="inquiry-form__field">
                <label htmlFor={`${formId}-role`}>{t('career.labelRole')}</label>
                <select id={`${formId}-role`} value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
                  {jobRoles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="inquiry-form__field">
                <label htmlFor={`${formId}-email`}>{t('career.labelEmail')} *</label>
                <input id={`${formId}-email`} name="email" type="email" required />
              </div>
              <div className="inquiry-form__field">
                <label htmlFor={`${formId}-name`}>{t('career.labelName')} *</label>
                <input id={`${formId}-name`} name="name" required />
              </div>
              <div className="inquiry-form__field">
                <label htmlFor={`${formId}-phone`}>{t('career.labelPhone')} *</label>
                <input id={`${formId}-phone`} name="phone" required />
              </div>
              <div className="inquiry-form__field">
                <label htmlFor={`${formId}-cv`}>{t('career.labelFile')}</label>
                <input id={`${formId}-cv`} name="cv" type="file" accept=".pdf,.doc,.docx" />
              </div>
              <div className="inquiry-form__field">
                <label htmlFor={`${formId}-cover`}>{t('career.labelMessage')}</label>
                <textarea id={`${formId}-cover`} name="coverLetter" rows={4} />
              </div>
              {error && (
                <p className="inquiry-form__error" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
                {status === 'loading' ? t('career.submitting') : t('career.submit')}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
