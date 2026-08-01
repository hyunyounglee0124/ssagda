import { useState } from 'react';
import PageTitle from '../components/PageTitle.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data.js';

export default function WishlistPage({ navigate, wishlist, toggleWish }) {
  const [category, setCategory] = useState('전체');
  const base = products.filter((product) => wishlist.includes(product.id));
  const shown = (base.length ? base : products.slice(0, 6)).filter((product) => category === '전체' || product.category === category);
  return (
    <>
      <PageTitle title="찜한 상품" description="관심 상품을 모아 비교하고 바로 담기" actions={<select aria-label="정렬"><option>최근 저장순</option><option>낮은 가격순</option></select>} />
      <div className="category-tabs">{['전체', '패션', '가방', '신발', '리빙'].map((item) => <button key={item} type="button" className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="product-grid product-grid--three">{shown.map((product) => <ProductCard key={product.id} product={product} navigate={navigate} wished={wishlist.includes(product.id)} onToggleWish={toggleWish} />)}</div>
    </>
  );
}
