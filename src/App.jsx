import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MyPage from './pages/MyPage.jsx';
import WishlistPage from './pages/WishlistPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import SupportPage from './pages/SupportPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import { initialCart } from './data.js';

/*
  GitHub Pages에서는 실제 주소가 다음처럼 구성됩니다.

  https://birdcross.github.io/ssagda/#/
  https://birdcross.github.io/ssagda/#/category
  https://birdcross.github.io/ssagda/#/login

  주소의 # 뒤에 있는 경로를 가져옵니다.
*/
function getRouteFromHash() {
  const hashValue = window.location.hash.slice(1);

  // 해시가 없으면 홈 화면으로 처리
  const fullPath = hashValue || '/';

  const questionMarkIndex = fullPath.indexOf('?');

  if (questionMarkIndex === -1) {
    return {
      pathname: fullPath || '/',
      search: '',
    };
  }

  return {
    pathname:
      fullPath.slice(0, questionMarkIndex) || '/',
    search: fullPath.slice(questionMarkIndex),
  };
}

export default function App() {
  /*
    현재 페이지 경로 관리

    예:
    pathname: /category
    search: ?category=best
  */
  const [route, setRoute] = useState(getRouteFromHash);

  const { pathname, search } = route;

  
  const navigate = useCallback((path) => {
    if (!path) {
      return;
    }

    const normalizedPath = path.startsWith('/')
      ? path
      : `/${path}`;

    const nextHash = `#${normalizedPath}`;

    /*
      현재 주소와 이동할 주소가 같으면
      화면 상단으로만 이동합니다.
    */
    if (window.location.hash === nextHash) {
      setRoute(getRouteFromHash());
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return;
    }

    window.location.hash = normalizedPath;
  }, []);

  /*
    브라우저 주소의 해시가 바뀌면
    React 화면을 다시 렌더링합니다.
  */
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash());

      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    };

    window.addEventListener(
      'hashchange',
      handleHashChange,
    );

    return () => {
      window.removeEventListener(
        'hashchange',
        handleHashChange,
      );
    };
  }, []);

  /*
    찜 상품
  */
  const [wishlist, setWishlist] = useState([
    1, 2, 3, 4, 6, 8,
  ]);

  /*
    장바구니 상품
  */
  const [cartItems, setCartItems] =
    useState(initialCart);

  /*
    장바구니 전체 수량
  */
  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      ),
    [cartItems],
  );

  /*
    찜 추가 및 해제
  */
  const toggleWish = (id) => {
    setWishlist((items) =>
      items.includes(id)
        ? items.filter((item) => item !== id)
        : [...items, id],
    );
  };

  /*
    장바구니 수량 변경
  */
  const updateQuantity = (id, quantity) => {
    /*
      수량이 1보다 작아지지 않도록 처리
    */
    const safeQuantity = Math.max(1, quantity);

    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: safeQuantity,
            }
          : item,
      ),
    );
  };

  /*
    장바구니 상품 삭제
  */
  const removeCartItem = (id) => {
    setCartItems((items) =>
      items.filter((item) => item.id !== id),
    );
  };

  /*
    장바구니 상품 추가
  */
  const addToCart = (product) => {
    setCartItems((items) => {
      const existing = items.find(
        (item) => item.id === product.id,
      );

      /*
        이미 장바구니에 있는 상품이면
        수량과 옵션을 갱신합니다.
      */
      if (existing) {
        return items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity +
                  product.quantity,
                option: product.option,
              }
            : item,
        );
      }

      /*
        없는 상품이면 새롭게 추가합니다.
      */
      return [...items, product];
    });
  };

  /*
    현재 경로에 따라 화면 선택
  */
  let page;

  if (pathname === '/') {
    page = (
      <HomePage
        navigate={navigate}
        wishlist={wishlist}
        toggleWish={toggleWish}
      />
    );
  } else if (pathname === '/category') {
    page = (
      <CategoryPage
        navigate={navigate}
        search={search}
        wishlist={wishlist}
        toggleWish={toggleWish}
      />
    );
  } else if (
    pathname.startsWith('/product/')
  ) {
    const productId = pathname.split('/')[2];

    page = (
      <ProductPage
        productId={productId}
        navigate={navigate}
        wishlist={wishlist}
        toggleWish={toggleWish}
        addToCart={addToCart}
      />
    );
  } else if (pathname === '/cart') {
    page = (
      <CartPage
        navigate={navigate}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeCartItem={removeCartItem}
      />
    );
  } else if (pathname === '/checkout') {
    page = (
      <CheckoutPage
        navigate={navigate}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
      />
    );
  } else if (pathname === '/login') {
    page = (
      <LoginPage navigate={navigate} />
    );
  } else if (pathname === '/mypage') {
    page = (
      <MyPage navigate={navigate} />
    );
  } else if (pathname === '/wishlist') {
    page = (
      <WishlistPage
        navigate={navigate}
        wishlist={wishlist}
        toggleWish={toggleWish}
      />
    );
  } else if (pathname === '/events') {
    page = (
      <EventsPage navigate={navigate} />
    );
  } else if (pathname === '/support') {
    page = (
      <SupportPage navigate={navigate} />
    );
  } else {
    page = (
      <NotFoundPage navigate={navigate} />
    );
  }

  return (
    <div className="app-shell">
      <Header
        pathname={pathname}
        search={search}
        navigate={navigate}
        cartCount={cartCount}
      />

      <main className="page-container">
        {page}
      </main>

      <Footer />
    </div>
  );
}