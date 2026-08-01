import { useEffect, useMemo, useState } from 'react';
import PageTitle from '../components/PageTitle.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data.js';

const filterGroups = ['카테고리', '가격대', '색상', '배송', '브랜드'];
const sortItems = ['추천순', '신상품', '판매량', '낮은가격'];

const getSortName = (sortQuery) => {
  if (sortQuery === 'new') return '신상품';
  if (sortQuery === 'best') return '판매량';
  if (sortQuery === 'low') return '낮은가격';

  return '추천순';
};

export default function CategoryPage({
  navigate,
  search,
  wishlist,
  toggleWish,
}) {
  const params = new URLSearchParams(search);

  const keyword = (params.get('search') || '').toLowerCase();

  const [selectedCategory, setSelectedCategory] = useState(
    params.get('category') || '전체'
  );

  const [sort, setSort] = useState(
    getSortName(params.get('sort'))
  );

  /*
   * 헤더에서 카테고리, 베스트, 신상품을 클릭해
   * URL이 변경되면 화면 정렬 상태도 변경
   */
  useEffect(() => {
    const currentParams = new URLSearchParams(search);

    setSelectedCategory(
      currentParams.get('category') || '전체'
    );

    setSort(
      getSortName(currentParams.get('sort'))
    );
  }, [search]);

  const handleSort = (item) => {
    const nextParams = new URLSearchParams(search);

    if (item === '신상품') {
      nextParams.set('sort', 'new');
    } else if (item === '판매량') {
      nextParams.set('sort', 'best');
    } else if (item === '낮은가격') {
      nextParams.set('sort', 'low');
    } else {
      nextParams.delete('sort');
    }

    setSort(item);

    const queryString = nextParams.toString();

    navigate(
      queryString
        ? `/category?${queryString}`
        : '/category'
    );
  };

  const handleCategory = (category) => {
    const nextParams = new URLSearchParams(search);

    if (category === '전체') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', category);
    }

    setSelectedCategory(category);

    const queryString = nextParams.toString();

    navigate(
      queryString
        ? `/category?${queryString}`
        : '/category'
    );
  };

  const filteredProducts = useMemo(() => {
    let list = products.slice(0, 12);

    if (selectedCategory !== '전체') {
      list = list.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (keyword) {
      list = list.filter((product) =>
        `${product.name} ${product.code} ${product.category}`
          .toLowerCase()
          .includes(keyword)
      );
    }

    // 원본 배열 변경 방지를 위해 복사
    list = [...list];

    if (sort === '신상품') {
      list.sort((a, b) => b.id - a.id);
    }

    if (sort === '판매량') {
      list.sort(
        (a, b) =>
          (b.sales ?? b.id) - (a.sales ?? a.id)
      );
    }

    if (sort === '낮은가격') {
      list.sort((a, b) => a.price - b.price);
    }

    return list;
  }, [selectedCategory, keyword, sort]);

  return (
    <>
      <PageTitle
        title="전체 상품"
        description={
          keyword
            ? `“${params.get('search')}” 검색 결과`
            : '카테고리별 상품 목록과 필터 영역'
        }
      />

      <div className="catalog-layout">
        <aside className="filter-panel">
          <h2>필터</h2>

          {filterGroups.map((group) => (
            <button key={group} type="button">
              {group}
              <span>＋</span>
            </button>
          ))}

          <div className="filter-category-list">
            {[
              '전체',
              '패션',
              '가방',
              '신발',
              '뷰티',
              '리빙',
            ].map((category) => (
              <label key={category}>
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => handleCategory(category)}
                />

                {category}
              </label>
            ))}
          </div>

          <button
            className="button button--primary button--full"
            type="button"
          >
            필터 적용
          </button>
        </aside>

        <section className="catalog-content">
          <div className="sort-tabs">
            {sortItems.map((item) => (
              <button
                key={item}
                type="button"
                className={sort === item ? 'is-active' : ''}
                onClick={() => handleSort(item)}
              >
                {item}
              </button>
            ))}

            <span>{filteredProducts.length}개 상품</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid product-grid--four">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  navigate={navigate}
                  wished={wishlist.includes(product.id)}
                  onToggleWish={toggleWish}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <strong>검색 결과가 없습니다.</strong>
              <p>
                다른 검색어 또는 카테고리를 선택해 주세요.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}