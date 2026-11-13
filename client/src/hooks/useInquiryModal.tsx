import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { trackEvent } from '@/utils/analytics';

type InquiryModalContextValue = {
  isOpen: boolean;
  open: (source?: string) => void;
  close: () => void;
  sourcePage: string;
};

const InquiryModalContext = createContext<InquiryModalContextValue | null>(null);

export function InquiryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sourcePage, setSourcePage] = useState('/');

  const open = useCallback((source?: string) => {
    setSourcePage(source || window.location.pathname);
    setIsOpen(true);
    trackEvent('form_open', { page: source || window.location.pathname });
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, open, close, sourcePage }),
    [isOpen, open, close, sourcePage]
  );

  return <InquiryModalContext.Provider value={value}>{children}</InquiryModalContext.Provider>;
}

export function useInquiryModal() {
  const ctx = useContext(InquiryModalContext);
  if (!ctx) throw new Error('useInquiryModal must be used within InquiryModalProvider');
  return ctx;
}
