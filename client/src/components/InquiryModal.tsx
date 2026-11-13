import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInquiryModal } from '@/hooks/useInquiryModal';
import { InquiryForm } from './InquiryForm';
import './InquiryModal.css';

export function InquiryModal() {
  const { t } = useTranslation();
  const { isOpen, close, sourcePage } = useInquiryModal();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      const first = dialogRef.current?.querySelector<HTMLElement>(
        'input, select, textarea, button:not([disabled])'
      );
      first?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="inquiry-modal" role="presentation" onClick={close}>
      <div
        className="inquiry-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-modal-title"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="inquiry-modal__head">
          <h2 id="inquiry-modal-title">{t('nav.letsChat', "Let's chat")}</h2>
          <button type="button" className="inquiry-modal__close" onClick={close} aria-label="Close dialog">
            ×
          </button>
        </div>
        <p className="inquiry-modal__intro">
          {t('inquiry.modalIntro', 'Tell us about your shipment. We respond within one business day.')}
        </p>
        <InquiryForm sourcePage={sourcePage} onSuccess={() => setTimeout(close, 2000)} variant="modal" />
      </div>
    </div>
  );
}
