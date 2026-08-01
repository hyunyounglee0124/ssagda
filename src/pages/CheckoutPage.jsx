import { useState } from 'react';
import PageTitle from '../components/PageTitle.jsx';
import QuantityControl from '../components/QuantityControl.jsx';
import SummaryCard from '../components/SummaryCard.jsx';
import { formatWon } from '../data.js';

export default function CheckoutPage({ cartItems, updateQuantity }) {
  const [payment, setPayment] = useState('신용카드');
  const [message, setMessage] = useState('문 앞에 놓아주세요. 배송 전 연락 바랍니다.');
  const [notice, setNotice] = useState('');
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const pay = () => {
    setNotice('결제 기능은 UI 프로토타입이므로 실제 결제는 진행되지 않습니다.');
    window.setTimeout(() => setNotice(''), 4000);
  };

  return (
    <>
      <PageTitle title="주문서 작성" description="배송지, 결제수단, 주문 상품 확인" />
      <div className="checkout-layout">
        <div className="checkout-sections">
          <section className="form-card">
            <h2>배송지 정보</h2>
            <div className="address-grid"><label>받는 사람<input defaultValue="홍길동" /></label><label>연락처<input defaultValue="010-0000-0000" /></label></div>
            <label>주소<input defaultValue="경남 창원시 의창구 샘플로 100, 101동 1001호" /></label>
          </section>
          <section className="form-card"><h2>배송 요청사항</h2><textarea value={message} onChange={(event) => setMessage(event.target.value)} /></section>
          <section className="form-card"><h2>결제 수단</h2><div className="payment-options">{['신용카드', '간편결제', '무통장입금', '포인트 사용'].map((item) => <button key={item} type="button" className={payment === item ? 'is-active' : ''} onClick={() => setPayment(item)}>{item}</button>)}</div></section>
          <section className="form-card"><h2>주문 상품</h2>{cartItems.slice(0, 1).map((item) => <div className="checkout-product" key={item.id}><div className={`cart-thumb tone-${item.tone}`}>{item.code}</div><div><strong>{item.name} 외 {Math.max(0, cartItems.length - 1)}건</strong><p>총 {cartItems.reduce((sum, product) => sum + product.quantity, 0)}개 상품</p></div><QuantityControl small value={item.quantity} onChange={(quantity) => updateQuantity(item.id, quantity)} /><strong>{formatWon(subtotal - 10000)}</strong></div>)}</section>
        </div>
        <SummaryCard subtotal={subtotal} discount={10000} buttonText="결제하기" onSubmit={pay} />
      </div>
      {notice && <div className="toast" role="status">{notice}</div>}
    </>
  );
}
