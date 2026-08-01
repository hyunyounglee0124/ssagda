import { useState } from 'react';
import './EventsPage.css';

const coupons = [
  {
    title: '신규회원 10% 할인',
    text: '첫 구매 고객 전용 쿠폰',
    value: '10%',
    type: 'member',
  },
  {
    title: '장바구니 5천원 할인',
    text: '7만원 이상 구매 시 사용 가능',
    value: '5,000원',
    type: 'cart',
  },
  {
    title: '무료배송 쿠폰',
    text: '오늘 밤 12시까지 사용 가능',
    value: 'FREE',
    type: 'delivery',
  },
  {
    title: '리뷰 적립 이벤트',
    text: '포토리뷰 작성 시 추가 적립',
    value: '2,000P',
    type: 'review',
  },
];

function CouponIcon({ type }) {
  if (type === 'member') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="22" cy="16" r="8" />
        <path d="M9 39c1-9 6-14 13-14s12 5 13 14" />

        <circle
          className="icon-fill"
          cx="36"
          cy="34"
          r="9"
        />

        <path
          className="icon-white"
          d="M36 29v10M31 34h10"
        />
      </svg>
    );
  }

  if (type === 'cart') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 10h6l4 22h20l4-15H17" />
        <path d="M20 21h18M22 27h14" />

        <circle cx="22" cy="38" r="3" />
        <circle cx="36" cy="38" r="3" />

        <circle
          className="icon-fill"
          cx="38"
          cy="35"
          r="8"
        />

        <path
          className="icon-white"
          d="m34.5 35 2.3 2.3 4.3-5"
        />
      </svg>
    );
  }

  if (type === 'delivery') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M7 14h23v19H7z" />
        <path d="M30 21h7l5 7v5H30z" />

        <circle cx="15" cy="36" r="4" />
        <circle cx="36" cy="36" r="4" />

        <path d="M10 19h13" />

        <text
          x="10"
          y="28"
          className="free-text"
        >
          FREE
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M11 16h26v22H11z" />
      <path d="M18 16l3-6h8l3 6" />

      <circle cx="24" cy="27" r="7" />

      <circle
        className="icon-fill"
        cx="38"
        cy="36"
        r="8"
      />

      <path
        className="icon-white"
        d="m38 31 1.5 3 3.5.5-2.5 2.4.6 3.5-3.1-1.6-3.1 1.6.6-3.5-2.5-2.4 3.5-.5z"
      />
    </svg>
  );
}

export default function EventsPage() {
  const [received, setReceived] = useState(false);

  const handleReceiveCoupon = () => {
    setReceived(true);
  };

  return (
    <main className="events-page">
      <section className="events-hero">
        <div className="events-hero__content">
          <h1>SSAGDA 쿠폰팩</h1>

          <p>
            이번 주 한정 할인 쿠폰과 무료배송 혜택을 확인하세요.
          </p>

          <button
            type="button"
            className={`events-hero__button ${
              received ? 'events-hero__button--received' : ''
            }`}
            onClick={handleReceiveCoupon}
            disabled={received}
          >
            {received ? '쿠폰 받기 완료' : '쿠폰 받기'}
          </button>
        </div>

        <div
          className="events-hero__visual"
          aria-hidden="true"
        >
          <span className="decoration decoration--blue" />
          <span className="decoration decoration--green" />
          <span className="decoration decoration--yellow" />
          <span className="decoration decoration--pink" />

          <div className="hero-cloud hero-cloud--left" />
          <div className="hero-cloud hero-cloud--right" />

          <div className="coupon-ticket">
            <span>COUPON</span>
          </div>

          <div className="coupon-ribbon" />
        </div>
      </section>

      <section className="events-benefit">
        <div className="events-benefit__heading">
          <h2>진행 중인 이벤트</h2>
        </div>

        <div className="coupon-grid">
          {coupons.map((coupon) => (
            <article
              key={coupon.title}
              className={`coupon-card coupon-card--${coupon.type}`}
            >
              <div className="coupon-card__icon">
                <CouponIcon type={coupon.type} />
              </div>

              <div className="coupon-card__content">
                <h3>{coupon.title}</h3>
                <p>{coupon.text}</p>
              </div>

              <strong className="coupon-card__value">
                {coupon.value}
              </strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}