import { useState } from 'react';
import PageTitle from '../components/PageTitle.jsx';
import { faqItems } from '../data.js';

export default function SupportPage() {
  const [open, setOpen] = useState(0);
  const [query, setQuery] = useState('');
  const shown = faqItems.filter((item) => item.question.includes(query) || item.answer.includes(query));
  return (
    <>
      <PageTitle title="고객센터" description="FAQ 검색, 1:1 문의, 배송 안내를 빠르게 확인" />
      <div className="support-search">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="무엇을 도와드릴까요? 예) 교환, 배송조회, 쿠폰 사용"
        />

        <button type="button">
          검색
        </button>
      </div>
      <div className="support-categories">{['주문 / 결제', '배송', '교환 / 반품', '쿠폰 / 포인트', '회원정보'].map((item) => <button key={item} type="button">{item}</button>)}</div>
      <div className="support-layout"><section className="faq-panel"><h2>자주 묻는 질문</h2>{shown.map((item, index) => <article className={open === index ? 'is-open' : ''} key={item.question}>
      <button type="button" onClick={() => setOpen(open === index ? -1 : index)}><span>{item.question}</span><strong>{open === index ? '−' : '＋'}</strong></button>{open === index && <p>{item.answer}</p>}</article>)}</section>
      <aside className="contact-panel"><h2>1:1 문의하기</h2><p>답변 가능 시간</p><strong>평일 09:00 ~ 18:00</strong><button className="button button--primary button--full" type="button">문의 접수</button>
      <button className="button button--dark button--full" type="button">채팅 상담</button></aside></div>
    </>
  );
}
