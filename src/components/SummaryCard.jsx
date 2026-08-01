import { formatWon } from '../data.js';

export default function SummaryCard({ subtotal, discount = 10000, buttonText, onSubmit }) {
  const total = Math.max(0, subtotal - discount);
  return (
    <aside className="summary-card">
      <h2>결제 예정 금액</h2>
      <dl>
        <div><dt>상품금액</dt><dd>{formatWon(subtotal)}</dd></div>
        <div><dt>배송비</dt><dd>무료</dd></div>
        <div><dt>쿠폰 할인</dt><dd className="discount">-{formatWon(discount)}</dd></div>
      </dl>
      <div className="summary-total"><span>총 결제금액</span><strong>{formatWon(total)}</strong></div>
      <button className="button button--primary button--full" type="button" onClick={onSubmit}>{buttonText}</button>
    </aside>
  );
}
