import PageTitle from '../components/PageTitle.jsx';
import QuantityControl from '../components/QuantityControl.jsx';
import { formatWon, products } from '../data.js';

const statusItems = ['주문접수', '배송중', '배송완료', '리뷰작성', '교환/반품'];

export default function MyPage() {
  return (
    <>
      <PageTitle title="마이페이지" description="주문 현황, 쿠폰, 포인트를 한눈에 확인" />
      <section className="profile-card"><div className="profile-avatar">홍</div><div><h2>홍길동님</h2><p>VIP 등급 · 이번 달 혜택 3개 사용 가능</p></div><button type="button">회원정보 관리</button><div className="status-row">{statusItems.map((item, index) => <div key={item}><span>{index === 1 ? '1' : '0'}</span><strong>{item}</strong></div>)}</div></section>
      <section className="benefit-cards"><article><span>쿠폰</span><strong>5장</strong></article><article><span>포인트</span><strong>12,400P</strong></article><article><span>최근 본 상품</span><strong>8개</strong></article></section>
      <section className="section-block"><div className="section-heading"><div><h2>최근 주문 내역</h2><p>최근 결제한 상품의 배송 상태</p></div></div><div className="order-list">{[products[0], products[2]].map((item, index) => <article key={item.id}><div className={`cart-thumb tone-${item.tone}`}>{item.code}</div><div><h3>{item.name}</h3><p>2026.07.{index === 0 ? '26' : '20'} 결제 · {index === 0 ? '배송 준비중' : '배송 완료'}</p></div><QuantityControl small value={1} onChange={() => {}} /><strong>{formatWon(item.price)}</strong></article>)}</div></section>
    </>
  );
}
