import { useState } from 'react';
import Icon from './Icon';
import './PaymentModal.css';

export default function PaymentModal({ total, carName, onPaymentComplete, onClose }) {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!cardName.trim()) { setError('Enter the cardholder name.'); return; }
    if (cardNumber.replace(/\s/g, '').length < 16) { setError('Enter a valid 16-digit card number.'); return; }
    if (expiry.length < 5) { setError('Enter a valid expiry date.'); return; }
    if (cvv.length < 3) { setError('Enter a valid CVV.'); return; }

    setProcessing(true);
    setTimeout(() => {
      onPaymentComplete();
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="payment-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={e => e.stopPropagation()}>
        <button className="payment-close" onClick={onClose}>
          <Icon name="close" size={20} />
        </button>

        <div className="payment-header">
          <Icon name="star" size={28} />
          <h2>Complete Payment</h2>
        </div>

        <div className="payment-summary">
          <span className="payment-summary-label">{carName}</span>
          <span className="payment-summary-amount">${total.toLocaleString()}</span>
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="payment-field">
            <label className="field-label">Cardholder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={cardName}
              onChange={e => setCardName(e.target.value)}
              autoComplete="cc-name"
            />
          </div>

          <div className="payment-field">
            <label className="field-label">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={e => setCardNumber(formatCardNumber(e.target.value))}
              autoComplete="cc-number"
            />
          </div>

          <div className="payment-row">
            <div className="payment-field">
              <label className="field-label">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                autoComplete="cc-exp"
              />
            </div>
            <div className="payment-field">
              <label className="field-label">CVV</label>
              <input
                type="text"
                placeholder="123"
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                autoComplete="cc-csc"
              />
            </div>
          </div>

          {error && <p className="payment-error">{error}</p>}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={processing}
          >
            {processing ? 'Processing…' : `Pay $${total.toLocaleString()}`}
            {!processing && <Icon name="arrow-right" size={18} />}
          </button>

          <p className="payment-secure">
            <Icon name="shield" size={14} />
            Secured with 256-bit encryption
          </p>
        </form>
      </div>
    </div>
  );
}
