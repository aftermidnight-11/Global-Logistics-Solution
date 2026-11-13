import './FloatingContact.css';

export function FloatingContact() {
  return (
    <div className="floating-contact" aria-label="Quick contact shortcuts">
      <a
        className="floating-contact__btn floating-contact__btn--wa"
        href="https://wa.me/97140000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        💬
      </a>
      <a
        className="floating-contact__btn floating-contact__btn--call"
        href="tel:+97140000000"
        aria-label="Call Global Logistics Solutions"
        title="Call"
      >
        📞
      </a>
    </div>
  );
}
