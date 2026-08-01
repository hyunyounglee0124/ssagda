export default function QuantityControl({ value, onChange, small = false }) {
  const update = (next) => onChange(Math.max(1, next));
  return (
    <div className={`quantity-control ${small ? 'quantity-control--small' : ''}`}>
      <button type="button" onClick={() => update(value - 1)} aria-label="수량 줄이기">−</button>
      <span>{value}</span>
      <button type="button" onClick={() => update(value + 1)} aria-label="수량 늘리기">＋</button>
    </div>
  );
}
