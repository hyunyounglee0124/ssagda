import { useEffect, useMemo, useState } from 'react';
import QuantityControl from '../components/QuantityControl.jsx';
import { formatWon } from '../data.js';
import './CartPage.css';

function CartIcon({ type, size = 22 }) {
  const icons = {
    cart: (
      <>
        <path d="M3 4h2l2.2 9.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L20 7H6" />
        <circle cx="9" cy="19" r="1.2" />
        <circle cx="17" cy="19" r="1.2" />
      </>
    ),
    card: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
        <path d="M7 15h4" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.6 2.6L16.5 9" />
      </>
    ),
    truck: (
      <>
        <path d="M3 6h11v10H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="1.5" />
        <circle cx="18" cy="18" r="1.5" />
      </>
    ),
    store: (
      <>
        <path d="M4 9h16l-1.5-4h-13z" />
        <path d="M5 9v10h14V9" />
        <path d="M9 19v-5h6v5" />
        <path d="M4 9c0 1.7 1.2 3 2.7 3S9.3 10.7 9.3 9" />
        <path d="M9.3 9c0 1.7 1.2 3 2.7 3s2.7-1.3 2.7-3" />
        <path d="M14.7 9c0 1.7 1.2 3 2.7 3S20 10.7 20 9" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3 3.2 3 14.8 0 18" />
        <path d="M12 3c-3 3.2-3 14.8 0 18" />
      </>
    ),
    gift: (
      <>
        <rect x="3" y="9" width="18" height="12" rx="2" />
        <path d="M12 9v12" />
        <path d="M3 13h18" />
        <path d="M12 9H8.5A2.5 2.5 0 1 1 11 6.5V9" />
        <path d="M12 9h3.5A2.5 2.5 0 1 0 13 6.5V9" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l-1 13H6z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.8 2.8 8.1 7 10 4.2-1.9 7-5.2 7-10V6z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  };

  return (
    <svg
      className="cart-svg-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[type]}
    </svg>
  );
}

export default function CartPage({
  navigate,
  cartItems,
  updateQuantity,
  removeCartItem,
}) {
  const [coupon, setCoupon] = useState('SSAGDA10');
  const [applied, setApplied] = useState(true);
  const [selectedIds, setSelectedIds] = useState(
    () => new Set(cartItems.map((item) => item.id)),
  );

  const cartIdKey = cartItems.map((item) => item.id).join(',');

  useEffect(() => {
    setSelectedIds(new Set(cartItems.map((item) => item.id)));
  }, [cartIdKey]);

  const selectedItems = useMemo(
    () => cartItems.filter((item) => selectedIds.has(item.id)),
    [cartItems, selectedIds],
  );

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // 화면 예시용 상품 할인입니다.
  // 실제 할인 데이터가 있으면 item.discount 또는 API 값으로 교체하세요.
  const productDiscount = Math.round(subtotal * 0.15);
  const couponDiscount = applied && selectedItems.length > 0 ? 10000 : 0;
  const deliveryFee = subtotal >= 50000 || subtotal === 0 ? 0 : 3000;

  const totalPrice = Math.max(
    0,
    subtotal - productDiscount - couponDiscount + deliveryFee,
  );

  const rewardPoint = Math.floor(totalPrice * 0.01);
  const allSelected =
    cartItems.length > 0 && selectedIds.size === cartItems.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
      return;
    }

    setSelectedIds(new Set(cartItems.map((item) => item.id)));
  };

  const toggleItem = (id) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const removeSelectedItems = () => {
    selectedIds.forEach((id) => removeCartItem(id));
  };

  const removeSoldOutItems = () => {
    cartItems
      .filter((item) => item.soldOut)
      .forEach((item) => removeCartItem(item.id));
  };

  const applyCoupon = () => {
    setApplied(Boolean(coupon.trim()));
  };

  const orderSelectedItems = () => {
    if (selectedItems.length === 0) {
      window.alert('주문할 상품을 선택해 주세요.');
      return;
    }

    navigate('/checkout');
  };

  return (
    <main className="cart-page">
      <div className="cart-page__heading">
        <div>
          <h1>장바구니</h1>
          <p>담은 상품과 결제 예정 금액을 확인하세요.</p>
        </div>

        <div className="cart-stepper">
          <div className="cart-step cart-step--active">
            <span className="cart-step__icon">
              <CartIcon type="cart" />
            </span>
            <strong>01. 장바구니</strong>
          </div>

          <span className="cart-stepper__arrow">›</span>

          <div className="cart-step">
            <span className="cart-step__icon">
              <CartIcon type="card" />
            </span>
            <strong>02. 주문/결제</strong>
          </div>

          <span className="cart-stepper__arrow">›</span>

          <div className="cart-step">
            <span className="cart-step__icon">
              <CartIcon type="check" />
            </span>
            <strong>03. 주문완료</strong>
          </div>
        </div>
      </div>

      <div className="cart-layout">
        <section className="cart-panel">
          <div className="cart-delivery-tabs">
            <button
              className="cart-delivery-tab cart-delivery-tab--active"
              type="button"
            >
              <span className="cart-delivery-tab__icon">
                <CartIcon type="truck" />
              </span>

              <span>
                <strong>SSAGDA 배송</strong>
                <b>{cartItems.length}</b>
              </span>
            </button>

            <button className="cart-delivery-tab" type="button">
              <span className="cart-delivery-tab__icon">
                <CartIcon type="store" />
              </span>

              <span>
                <strong>브랜드 배송</strong>
                <b>0</b>
              </span>
            </button>

            <button className="cart-delivery-tab" type="button">
              <span className="cart-delivery-tab__icon">
                <CartIcon type="globe" />
              </span>

              <span>
                <strong>해외 직배송</strong>
                <b>0</b>
              </span>
            </button>
          </div>

          <div className="cart-selection-bar">
            <label className="cart-checkbox-label">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
              />

              <span className="cart-custom-checkbox">
                {allSelected && '✓'}
              </span>

              <strong>
                전체 선택 ({selectedIds.size}/{cartItems.length})
              </strong>
            </label>

            <div className="cart-selection-actions">
              <button type="button" onClick={removeSoldOutItems}>
                품절 삭제
              </button>

              <span />

              <button
                type="button"
                onClick={removeSelectedItems}
                disabled={selectedIds.size === 0}
              >
                선택 삭제
              </button>
            </div>
          </div>

          <div className="cart-promotion">
            <span className="cart-promotion__badge">%</span>

            <div className="cart-promotion__text">
              <strong>SSAGDA 첫구매 · 최대 3만원 즉시할인</strong>
              <p>5만원 이상 무료배송 · 회원 등급별 추가 적립 최대 5%</p>
            </div>

            <button type="button">
              더보기 <span>›</span>
            </button>
          </div>

          <div className="cart-list">
            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <span>
                  <CartIcon type="cart" size={34} />
                </span>
                <strong>장바구니가 비어 있습니다.</strong>
                <p>마음에 드는 상품을 장바구니에 담아보세요.</p>
              </div>
            ) : (
              cartItems.map((item) => {
                const selected = selectedIds.has(item.id);
                const originalPrice =
                  item.originalPrice ??
                  Math.round((item.price * 1.17) / 1000) * 1000;

                return (
                  <article
                    className={`cart-item ${
                      selected ? 'cart-item--selected' : ''
                    }`}
                    key={item.id}
                  >
                    <label className="cart-item__checkbox">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleItem(item.id)}
                      />

                      <span className="cart-custom-checkbox">
                        {selected && '✓'}
                      </span>
                    </label>

                    <div
                      className={`cart-thumb tone-${item.tone ?? 'default'}`}
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <span>{item.code}</span>
                      )}
                    </div>

                    <div className="cart-item__info">
                      <h3>{item.name}</h3>
                      <p>
                        {item.option}
                        <span>·</span>
                        수량 {item.quantity}
                      </p>

                      <div className="cart-item__delivery">
                        <span>무료배송</span>
                        <em>내일 도착</em>
                      </div>
                    </div>

                    <div className="cart-item__quantity">
                      <QuantityControl
                        small
                        value={item.quantity}
                        onChange={(quantity) =>
                          updateQuantity(item.id, quantity)
                        }
                      />
                    </div>

                    <div className="cart-item__purchase">
                      <div className="cart-item__price">
                        <del>{formatWon(originalPrice)}</del>
                        <strong>
                          {formatWon(item.price * item.quantity)}
                        </strong>
                      </div>

                      <div className="cart-item__buttons">
                        <button
                          className="cart-option-button"
                          type="button"
                        >
                          옵션/배송 변경
                        </button>

                        <button
                          className="cart-direct-button"
                          type="button"
                          onClick={() => navigate('/checkout')}
                        >
                          바로 주문하기
                        </button>
                      </div>
                    </div>

                    <button
                      className="cart-remove-button"
                      type="button"
                      onClick={() => removeCartItem(item.id)}
                      aria-label={`${item.name} 삭제`}
                    >
                      ×
                    </button>
                  </article>
                );
              })
            )}
          </div>

          <div className="cart-shipping-benefit">
            <div>
              <span>i</span>
              <strong>배송비 혜택</strong>
              <p>· 5만원 이상 구매 시 무료배송</p>
            </div>

            {subtotal >= 50000 ? (
              <strong className="cart-shipping-benefit__price">
                무료배송이 적용됐어요
              </strong>
            ) : (
              <strong className="cart-shipping-benefit__price">
                더 담으면 무료배송까지{' '}
                <em>{formatWon(50000 - subtotal)}</em>
              </strong>
            )}
          </div>
        </section>

        <aside className="cart-summary-area">
          <div className="cart-summary">
            <div className="cart-summary__header">
              <h2>결제 예정 금액</h2>
              <p>쿠폰 및 포인트는 주문서에서 적용됩니다.</p>
            </div>

            <div className="cart-summary__prices">
              <div>
                <span>상품금액</span>
                <strong>{formatWon(subtotal)}</strong>
              </div>

              <div>
                <span>상품 할인</span>
                <strong>-{formatWon(productDiscount)}</strong>
              </div>

              <div>
                <span>쿠폰 할인</span>
                <strong className="cart-summary__discount">
                  -{formatWon(couponDiscount)}
                </strong>
              </div>

              <div>
                <span>배송비</span>
                <strong>
                  {deliveryFee === 0
                    ? '무료'
                    : formatWon(deliveryFee)}
                </strong>
              </div>
            </div>

            <div className="cart-summary__total">
              <span>총 결제금액</span>

              <div>
                <strong>{formatWon(totalPrice)}</strong>
                <p>
                  적립 예정 <b>{rewardPoint.toLocaleString()}P</b>
                </p>
              </div>
            </div>

            <div className="cart-coupon">
              <input
                value={coupon}
                onChange={(event) => {
                  setCoupon(event.target.value);
                  setApplied(false);
                }}
                placeholder="쿠폰코드 입력"
              />

              <button
                type="button"
                className={applied ? 'cart-coupon__applied' : ''}
                onClick={applyCoupon}
              >
                {applied ? '적용됨' : '적용'}
              </button>
            </div>

            <button
              className="cart-order-button"
              type="button"
              onClick={orderSelectedItems}
              disabled={selectedItems.length === 0}
            >
              주문하기 · {selectedItems.length}건 ·{' '}
              {formatWon(totalPrice)}
            </button>

            <div className="cart-summary__sub-buttons">
              <button type="button" onClick={orderSelectedItems}>
                <CartIcon type="gift" size={19} />
                선택 상품 주문
              </button>

              <button type="button">
                <CartIcon type="bag" size={19} />
                찜한 상품으로 이동
              </button>
            </div>
          </div>

          <div className="cart-safe-payment">
            <div className="cart-safe-payment__title">
              <CartIcon type="shield" size={20} />
              <strong>안전결제 보장</strong>
            </div>

            <p>
              전 상품 무이자 최대 6개월 · 카카오페이/네이버페이 지원
            </p>
            <p>평일 오후 3시 이전 결제 시 · 당일 출고 · 무료 반품 7일</p>
          </div>
        </aside>
      </div>
    </main>
  );
}