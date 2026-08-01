import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import QuantityControl from '../components/QuantityControl.jsx';
import { formatWon, products } from '../data.js';
import './ProductPage.css';

const productTabs = [
  { id: 'detail', label: '상세정보' },
  { id: 'review', label: '리뷰 5,379' },
  { id: 'recommend', label: '추천상품' },
  { id: 'qna', label: 'Q&A' },
];

const reviewItems = [
  {
    id: 1,
    name: '민지님',
    option: '크림 · FREE',
    date: '2026.07.14',
    rating: 5,
    text: '가을 코디에 딱 맞아요. 촉감이 부드럽고 어깨 라인이 잘 떨어져서 데일리로 편하게 입기 좋습니다.',
    helpful: 24,
    comments: 3,
  },
  {
    id: 2,
    name: '서현님',
    option: '베이지 · FREE',
    date: '2026.07.10',
    rating: 5,
    text: '색감이 사진과 거의 동일해요. 베이지가 은은해서 어떤 옷과도 잘 어울립니다. 두께감도 적당해서 활용도가 좋아요.',
    helpful: 41,
    comments: 7,
  },
  {
    id: 3,
    name: '지원님',
    option: '블랙 · FREE',
    date: '2026.07.05',
    rating: 4,
    text: '사이즈는 정사이즈이고 재질도 부드러워요. 세탁망을 사용하면 오래 예쁘게 입을 수 있을 것 같습니다.',
    helpful: 18,
    comments: 2,
  },
];

const qnaItems = [
  {
    id: 1,
    category: '상품',
    question: '크림 색상은 비침이 있나요?',
    answer:
      '두께감이 있는 니트 소재라 비침이 심하지 않습니다. 밝은 색 이너와 함께 착용하는 것을 권장합니다.',
    status: '답변완료',
    date: '2026.07.15',
  },
  {
    id: 2,
    category: '배송',
    question: '오늘 주문하면 언제 출고되나요?',
    answer:
      '평일 오후 2시 이전 결제 완료 주문은 당일 또는 다음 영업일에 출고됩니다.',
    status: '답변완료',
    date: '2026.07.12',
  },
  {
    id: 3,
    category: '상품',
    question: '세탁기 사용이 가능한가요?',
    answer:
      '제품 변형을 줄이기 위해 찬물 울 코스 또는 손세탁을 권장합니다. 건조기 사용은 피해 주세요.',
    status: '답변완료',
    date: '2026.07.08',
  },
];

function StarRating({ rating }) {
  return (
    <span
      className="product-review-stars"
      aria-label={`별점 ${rating}점`}
    >
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
      <strong>{rating}.0</strong>
    </span>
  );
}

export default function ProductPage({
  productId,
  navigate,
  wishlist,
  toggleWish,
  addToCart,
}) {
  const product = useMemo(
    () =>
      products.find((item) => item.id === Number(productId)) ||
      products[0],
    [productId],
  );

  const recommendedProducts = useMemo(
    () =>
      products
        .filter((item) => item.id !== product.id)
        .slice(0, 10),
    [product.id],
  );

  const [color, setColor] = useState('크림');
  const [quantity, setQuantity] = useState(1);
  const [thumb, setThumb] = useState(1);
  const [activeTab, setActiveTab] = useState('detail');
  const [reviewFilter, setReviewFilter] = useState('전체');
  const [openQuestion, setOpenQuestion] = useState(null);

  const selectedOption = `색상 ${color}`;

  const handleAddCart = () => {
    addToCart({
      ...product,
      quantity,
      option: selectedOption,
    });

    navigate('/cart');
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity,
      option: selectedOption,
    });

    navigate('/checkout');
  };

  const moveToTab = (tabId) => {
    setActiveTab(tabId);

    requestAnimationFrame(() => {
      document
        .querySelector('.product-tab-content')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    });
  };

  return (
    <main className="product-page">
      {/* 상품 기본 정보 */}
      <section className="product-detail">
        <div className="product-gallery">
          <div
            className={`product-gallery__main tone-${product.tone}`}
          >
            <span>{product.code}</span>
            <strong>{product.code}</strong>
          </div>

          <div className="thumbnail-row">
            {[1, 2, 3, 4].map((number) => (
              <button
                key={number}
                type="button"
                className={thumb === number ? 'is-active' : ''}
                onClick={() => setThumb(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </div>

        <div className="product-info">
          <div className="product-info__topline">
            <span>{product.category}</span>

            <button
              type="button"
              onClick={() => toggleWish(product.id)}
            >
              {wishlist.includes(product.id)
                ? '♥ 찜함'
                : '♡ 찜하기'}
            </button>
          </div>

          <h1>{product.name}</h1>

          <p>
            {product.description ||
              'SSAGDA가 엄선한 데일리 상품입니다. 깔끔한 디자인과 실용적인 사용성을 함께 만나보세요.'}
          </p>

          <strong className="product-detail-price">
            {formatWon(product.price)}
          </strong>

          <div className="option-group">
            <h3>옵션 선택</h3>

            <div className="option-buttons">
              {['크림', '베이지', '블랙'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={color === item ? 'is-active' : ''}
                  onClick={() => setColor(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="option-buttons option-buttons--secondary">
              <button type="button">FREE</button>
              <button type="button">예약배송</button>
              <button type="button">선물포장</button>
            </div>
          </div>

          <div className="purchase-row">
            <span>수량</span>

            <QuantityControl
              value={quantity}
              onChange={setQuantity}
            />
          </div>

          <div className="purchase-actions">
            <button
              className="button button--dark"
              type="button"
              onClick={handleAddCart}
            >
              장바구니 담기
            </button>

            <button
              className="button button--primary"
              type="button"
              onClick={handleBuyNow}
            >
              바로 구매
            </button>
          </div>

          <div className="benefit-row">
            <span>🚚 무료배송</span>
            <span>🎟️ 쿠폰혜택</span>
            <span>⭐ 리뷰 4.8</span>
          </div>
        </div>
      </section>

      {/* 상품 요약 및 탭 */}
      <section className="product-detail-navigation">
        <div className="product-quick-summary">
          <div
            className={`product-quick-summary__image tone-${product.tone}`}
          >
            {product.code}
          </div>

          <div className="product-quick-summary__content">
            <strong>{product.name}</strong>

            <span>
              {product.category} · {selectedOption} ·{' '}
              {formatWon(product.price)}
            </span>
          </div>

          <button
            type="button"
            className="product-quick-buy"
            onClick={handleBuyNow}
          >
            바로 구매
          </button>
        </div>

        <nav
          className="product-detail-tabs"
          aria-label="상품 정보 메뉴"
        >
          {productTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={
                activeTab === tab.id ? 'is-active' : ''
              }
              onClick={() => moveToTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </section>

      {/* 탭 내용 */}
      <section className="product-tab-content">
        {/* 상세정보 */}
        {activeTab === 'detail' && (
          <div className="product-detail-tab">
            <div className="product-detail-hero">
              <span>SSAGDA DAILY KNIT</span>

              <h2>매일 손이 가는 부드러운 니트</h2>

              <p>
                편안한 착용감과 깔끔한 실루엣을 모두 담은
                데일리 아이템입니다.
              </p>

              <div
                className={`product-detail-hero__image tone-${product.tone}`}
              >
                <small>{product.code}</small>
                <strong>{product.code}</strong>
              </div>
            </div>

            <div className="product-feature-grid">
              <article>
                <span>01</span>
                <h3>부드러운 촉감</h3>
                <p>
                  피부에 닿는 느낌이 편안하도록 부드러운
                  소재를 사용했습니다.
                </p>
              </article>

              <article>
                <span>02</span>
                <h3>편안한 실루엣</h3>
                <p>
                  너무 크거나 작지 않은 여유로운 핏으로
                  자연스럽게 착용할 수 있습니다.
                </p>
              </article>

              <article>
                <span>03</span>
                <h3>다양한 코디</h3>
                <p>
                  데님, 스커트, 슬랙스 등 다양한 하의와
                  자연스럽게 어울립니다.
                </p>
              </article>
            </div>

            <div className="product-information-card">
              <h2>상품 정보</h2>

              <dl>
                <div>
                  <dt>소재</dt>
                  <dd>폴리에스터 55%, 아크릴 45%</dd>
                </div>

                <div>
                  <dt>색상</dt>
                  <dd>크림, 베이지, 블랙</dd>
                </div>

                <div>
                  <dt>사이즈</dt>
                  <dd>FREE</dd>
                </div>

                <div>
                  <dt>세탁 방법</dt>
                  <dd>찬물 손세탁 또는 울 코스 권장</dd>
                </div>

                <div>
                  <dt>제조국</dt>
                  <dd>대한민국</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {/* 리뷰 */}
        {activeTab === 'review' && (
          <div className="product-review-tab">
            <div className="product-review-top">
              <section className="product-rating-card">
                <h2>전체 리뷰 평점</h2>

                <strong>
                  4.8<small>★</small>
                </strong>

                <p>5,379개의 리뷰</p>

                <div className="rating-bars">
                  {[
                    { score: 5, percent: 91 },
                    { score: 4, percent: 68 },
                    { score: 3, percent: 21 },
                    { score: 2, percent: 9 },
                    { score: 1, percent: 3 },
                  ].map((item) => (
                    <div key={item.score}>
                      <span>{item.score}★</span>

                      <i>
                        <b
                          style={{
                            width: `${item.percent}%`,
                          }}
                        />
                      </i>
                    </div>
                  ))}
                </div>

                <ul>
                  <li>
                    <span>정사이즈예요</span>
                    <strong>79%</strong>
                  </li>

                  <li>
                    <span>두께감이 보통이에요</span>
                    <strong>82%</strong>
                  </li>

                  <li>
                    <span>퀄리티가 만족스러워요</span>
                    <strong>57%</strong>
                  </li>
                </ul>
              </section>

              <section className="product-style-review">
                <div className="product-style-review__heading">
                  <h2>
                    스타일 리뷰 <span>178</span>
                  </h2>

                  <button type="button">
                    + 스타일 올리기
                  </button>
                </div>

                <div className="product-style-review__grid">
                  {[1, 2, 3, 4, 5].map((number) => (
                    <button
                      key={number}
                      type="button"
                      className={`tone-${product.tone}`}
                    >
                      <span>📷</span>

                      {number === 5 && (
                        <strong>+173</strong>
                      )}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="product-style-more"
                >
                  스타일 더보기 →
                </button>
              </section>
            </div>

            <section className="product-normal-review">
              <div className="product-normal-review__heading">
                <h2>
                  일반 리뷰 <span>5,379</span>
                </h2>

                <div className="review-filter-buttons">
                  {[
                    '전체',
                    '포토 리뷰',
                    '별점 높은순',
                    '최신순',
                    color,
                  ].map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      className={
                        reviewFilter === filter
                          ? 'is-active'
                          : ''
                      }
                      onClick={() =>
                        setReviewFilter(filter)
                      }
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="product-review-list">
                {reviewItems.map((review) => (
                  <article
                    key={review.id}
                    className="product-review-card"
                  >
                    <div className="product-review-card__top">
                      <div className="review-user">
                        <span>
                          {review.name.slice(0, 1)}
                        </span>

                        <div>
                          <strong>{review.name}</strong>
                          <small>
                            {review.option} · {review.date}
                          </small>
                        </div>
                      </div>

                      <StarRating rating={review.rating} />
                    </div>

                    <div className="product-review-card__body">
                      <div className="review-image-list">
                        <span
                          className={`tone-${product.tone}`}
                        >
                          📷
                        </span>

                        {review.id === 1 && (
                          <span
                            className={`tone-${product.tone}`}
                          >
                            📷
                          </span>
                        )}
                      </div>

                      <p>{review.text}</p>
                    </div>

                    <div className="product-review-card__actions">
                      <button type="button">
                        👍 도움돼요 {review.helpful}
                      </button>

                      <button type="button">
                        💬 댓글 {review.comments}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 추천상품 */}
        {activeTab === 'recommend' && (
          <div className="product-recommend-tab">
            <div className="product-recommend-heading">
              <div>
                <h2>회원님이 좋아할 만한 상품</h2>
                <p>
                  현재 상품과 잘 어울리는 추천 상품입니다.
                </p>
              </div>

              <div className="product-recommend-filters">
                <button type="button" className="is-active">
                  전체
                </button>
                <button type="button">니트/가디건</button>
                <button type="button">아우터</button>
                <button type="button">셔츠</button>
                <button type="button">데님</button>
              </div>
            </div>

            <div className="product-recommend-grid">
              {recommendedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  compact
                  product={item}
                  navigate={navigate}
                  wished={wishlist.includes(item.id)}
                  onToggleWish={toggleWish}
                />
              ))}
            </div>
          </div>
        )}

        {/* Q&A */}
        {activeTab === 'qna' && (
          <div className="product-qna-tab">
            <div className="product-qna-heading">
              <div>
                <h2>상품 Q&amp;A</h2>
                <p>
                  상품, 배송, 교환과 관련된 문의를 확인할 수
                  있습니다.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.alert(
                    '상품 문의 기능을 준비 중입니다.',
                  )
                }
              >
                상품 문의하기
              </button>
            </div>

            <div className="product-qna-notice">
              <strong>문의 전 확인해 주세요</strong>
              <p>
                주문 취소, 배송지 변경 등 주문 관련 문의는
                고객센터를 이용해 주세요.
              </p>
            </div>

            <div className="product-qna-list">
              {qnaItems.map((item) => {
                const isOpen = openQuestion === item.id;

                return (
                  <article
                    key={item.id}
                    className={isOpen ? 'is-open' : ''}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenQuestion(
                          isOpen ? null : item.id,
                        )
                      }
                    >
                      <span>{item.category}</span>

                      <strong>{item.question}</strong>

                      <small>{item.status}</small>

                      <time>{item.date}</time>

                      <i>{isOpen ? '−' : '+'}</i>
                    </button>

                    {isOpen && (
                      <div className="product-qna-answer">
                        <span>A</span>
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}