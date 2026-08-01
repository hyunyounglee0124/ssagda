import { categories, products } from '../data.js';
import ProductCard from '../components/ProductCard.jsx';

export default function HomePage({ navigate, wishlist, toggleWish }) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">SSAGDA SHOPPING</span>
          <h1>생활에 필요한 건 싹다</h1>
          <p>SSAGDA에서 의류, 잡화, 리빙, 뷰티까지 한 번에 둘러보세요.</p>
          <div className="hero-actions">
            <button className="button button--primary" type="button" onClick={() => navigate('/category')}>오늘 특가 보러가기</button>
            <span className="sale-pill">최대 45% SALE</span>
            <button className="button button--soft" type="button" onClick={() => navigate('/events')}>신규회원 쿠폰</button>
          </div>
        </div>
        <div className="hero-brand-panel">
          <span>S</span>
          <strong>SSAGDA</strong>
          <small>Smart Shopping, All Goods</small>
        </div>
      </section>

      <section className="category-strip" aria-label="카테고리">
        {categories.map((category) => (
          <button key={category.label} type="button" onClick={() => navigate(`/category?category=${encodeURIComponent(category.label)}`)}>
            <span>{category.code}</span>
            {category.label}
          </button>
        ))}
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><h2>오늘의 추천 상품</h2><p>지금 SSAGDA에서 가장 반응이 좋은 상품</p></div>
          <button className="text-link" type="button" onClick={() => navigate('/category')}>전체보기 →</button>
        </div>
        <div className="product-grid product-grid--four">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} navigate={navigate} wished={wishlist.includes(product.id)} onToggleWish={toggleWish} />
          ))}
        </div>
      </section>
    </>
  );
}
