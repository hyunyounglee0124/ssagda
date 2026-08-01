import { formatWon } from '../data.js';

export default function ProductCard({ product, navigate, wished, onToggleWish, compact = false }) {
  return (
    <article className={`product-card ${compact ? 'product-card--compact' : ''}`}>
      <button className="product-card__open" type="button" onClick={() => navigate(`/product/${product.id}`)} aria-label={`${product.name} 상세 보기`}>
        <div className={`product-art tone-${product.tone}`}>
          <span className="product-art__badge">{product.code}</span>
          <strong>{product.code}</strong>
        </div>
      </button>
      <button
        className={`wish-button ${wished ? 'is-wished' : ''}`}
        type="button"
        onClick={() => onToggleWish(product.id)}
        aria-label={wished ? '찜 해제' : '찜하기'}
      >
        {wished ? '♥' : '♡'}
      </button>
      <div className="product-card__body">
        <h3><button type="button" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</button></h3>
        <p>무료배송 · 오늘출발</p>
        <strong className="price">{formatWon(product.price)}</strong>
      </div>
    </article>
  );
}
