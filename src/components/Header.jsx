import { useState } from 'react';
import Logo from './Logo.jsx';

const navItems = [
  ['/', '홈'],
  ['/category', '카테고리'],
  ['/category?sort=best', '베스트'],
  ['/category?sort=new', '신상품'],
  ['/events', '이벤트'],
  ['/support', '고객센터'],
];

export default function Header({
  pathname,
  search,
  navigate,
  cartCount,
}) {
  const [keyword, setKeyword] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const submitSearch = (event) => {
    event.preventDefault();

    const query = keyword.trim();

    navigate(
      query
        ? `/category?search=${encodeURIComponent(query)}`
        : '/category'
    );

    setMobileOpen(false);
  };

  const isActiveMenu = (path) => {
    const [menuPath, menuQuery = ''] = path.split('?');

    if (pathname !== menuPath) {
      return false;
    }

    const currentParams = new URLSearchParams(search || '');
    const menuParams = new URLSearchParams(menuQuery);

    const currentSort = currentParams.get('sort');
    const menuSort = menuParams.get('sort');

    if (path === '/category') {
      return !currentSort;
    }

    if (menuPath === '/category') {
      return currentSort === menuSort;
    }

    return true;
  };

  return (
    <header className="site-header">
      <div className="browser-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <button
        className="logo-button"
        type="button"
        onClick={() => navigate('/')}
      >
        <Logo />
      </button>

      <button
        className="mobile-menu-button"
        type="button"
        onClick={() => setMobileOpen((value) => !value)}
        aria-label="메뉴 열기"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`main-nav ${mobileOpen ? 'main-nav--open' : ''}`}>
        {navItems.map(([path, label]) => (
          <button
            key={label}
            type="button"
            className={isActiveMenu(path) ? 'is-active' : ''}
            onClick={() => {
              navigate(path);
              setMobileOpen(false);
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      <form className="header-search" onSubmit={submitSearch}>
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="검색어를 입력하세요"
          aria-label="상품 검색"
        />

        <button className="search-button" type="submit">
          검색
        </button>
      </form>

      <div className="header-actions">
        <button type="button" onClick={() => navigate('/login')}>
          로그인
        </button>

        <button type="button" onClick={() => navigate('/wishlist')}>
          찜
        </button>

        <button
          className="cart-link"
          type="button"
          onClick={() => navigate('/cart')}
        >
          장바구니
          {cartCount > 0 && <em>{cartCount}</em>}
        </button>

        <button type="button" onClick={() => navigate('/mypage')}>
          마이페이지
        </button>
      </div>
    </header>
  );
}