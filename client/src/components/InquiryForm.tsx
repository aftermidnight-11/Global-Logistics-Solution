import { useId, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { INQUIRY_TYPES } from '@/content/navigation';
import { postFormData } from '@/api/client';
import { trackEvent } from '@/utils/analytics';
import './InquiryForm.css';

type Props = {
  sourcePage?: string;
  showAttachments?: boolean;
  onSuccess?: () => void;
  variant?: 'modal' | 'inline';
};

export function InquiryForm({ sourcePage, showAttachments = true, onSuccess, variant = 'modal' }: Props) {
  const { t } = useTranslation();
  const formId = useId();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = (fd.get('name') as string || '').trim();
    const phone = (fd.get('phone') as string || '').trim();
    const inquiryType = (fd.get('inquiryType') as string || '').trim();

    if (!name) {
      setError(t('inquiry.errorName', 'Please enter your full name.'));
      return;
    }
    if (!phone) {
      setError(t('inquiry.errorPhone', 'Please enter your phone or WhatsApp number.'));
      return;
    }
    if (!inquiryType) {
      setError(t('inquiry.errorType', 'Please select an inquiry type.'));
      return;
    }

    setStatus('loading');
    fd.set('sourcePage', sourcePage || window.location.pathname);
    if (fileRef.current?.files) {
      for (const file of fileRef.current.files) {
        fd.append('attachments', file);
      }
    }
    try {
      await postFormData<{ success: boolean; message: string }>('/api/inquiries', fd);
      setStatus('success');
      trackEvent('form_submit', { page: sourcePage });
      form.reset();
      onSuccess?.();
    } catch (err) {
      setStatus('error');
      const msg = err instanceof Error ? err.message : t('inquiry.submitFailed', 'Submission failed');
      setError(msg);
      trackEvent('form_error', { message: msg });
    }
  }

  if (status === 'success') {
    return (
      <div className="inquiry-form__success" role="status">
        {t('inquiry.success', 'Thank you. We will contact you within one business day.')}
      </div>
    );
  }

  return (
    <form className={`inquiry-form inquiry-form--${variant}`} onSubmit={onSubmit} noValidate>
      <div className="inquiry-form__honeypot" aria-hidden>
        <label htmlFor={`${formId}-website`}>Website</label>
        <input id={`${formId}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="inquiry-form__field">
        <label htmlFor={`${formId}-name`}>{t('inquiry.name', 'Name')} *</label>
        <input id={`${formId}-name`} name="name" required autoComplete="name" />
      </div>

      <div className="inquiry-form__field">
        <label htmlFor={`${formId}-phone`}>{t('inquiry.phone', 'Phone (WhatsApp)')} *</label>
        <input id={`${formId}-phone`} name="phone" required autoComplete="tel" />
      </div>

      <div className="inquiry-form__field">
        <label htmlFor={`${formId}-company`}>{t('inquiry.company', 'Company name')}</label>
        <input id={`${formId}-company`} name="companyName" autoComplete="organization" />
      </div>

      <div className="inquiry-form__field">
        <label htmlFor={`${formId}-type`}>{t('inquiry.type', 'Inquiry type')} *</label>
        <select id={`${formId}-type`} name="inquiryType" required defaultValue="">
          <option value="" disabled>
            {t('inquiry.selectService', 'Select a service')}
          </option>
          {INQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="inquiry-form__field">
        <label htmlFor={`${formId}-message`}>{t('inquiry.message', 'Message (optional)')}</label>
        <textarea id={`${formId}-message`} name="message" rows={3} />
      </div>

      {showAttachments && (
        <div className="inquiry-form__field">
          <label htmlFor={`${formId}-files`}>{t('inquiry.attachments', 'Attachments (optional, max 10 MB each)')}</label>
          <input
            id={`${formId}-files`}
            ref={fileRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.dwg"
          />
        </div>
      )}

      {error && (
        <p className="inquiry-form__error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
        {status === 'loading' ? t('inquiry.submitting', 'Sending…') : t('inquiry.submit', 'Submit inquiry')}
      </button>
    </form>
  );
}
