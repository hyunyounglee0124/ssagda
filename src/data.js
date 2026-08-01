export const categories = [
  { label: '패션', code: 'TOP' },
  { label: '가방', code: 'BAG' },
  { label: '신발', code: 'SHOE' },
  { label: '뷰티', code: 'BEAUTY' },
  { label: '리빙', code: 'LIFE' },
  { label: '디지털', code: 'DIGITAL' },
  { label: '식품', code: 'FOOD' },
  { label: '선물', code: 'GIFT' },
];

export const products = [
  { id: 1, code: 'BAG', name: '크림 미니 숄더백', price: 59000, category: '가방', tone: 'peach', description: '부드러운 컬러감과 가벼운 수납력으로 데일리 코디에 어울리는 인기 상품입니다.' },
  { id: 2, code: 'KNIT', name: '소프트 니트 가디건', price: 42000, category: '패션', tone: 'cream' },
  { id: 3, code: 'SHOE', name: '데일리 스니커즈', price: 79000, category: '신발', tone: 'blue' },
  { id: 4, code: 'BEAUTY', name: '시그니처 바디로션', price: 29000, category: '뷰티', tone: 'rose' },
  { id: 5, code: 'TOP', name: '오버핏 셔츠', price: 32000, category: '패션', tone: 'sand' },
  { id: 6, code: 'BAG', name: '캔버스 토트백', price: 28000, category: '가방', tone: 'peach' },
  { id: 7, code: 'SHOE', name: '화이트 스니커즈', price: 69000, category: '신발', tone: 'blue' },
  { id: 8, code: 'LIFE', name: '무드 조명', price: 36000, category: '리빙', tone: 'yellow' },
  { id: 9, code: 'DRESS', name: '썸머 원피스', price: 48000, category: '패션', tone: 'rose' },
  { id: 10, code: 'WALLET', name: '데일리 지갑', price: 39000, category: '가방', tone: 'sand' },
  { id: 11, code: 'BEAUTY', name: '향수 미스트', price: 25000, category: '뷰티', tone: 'rose' },
  { id: 12, code: 'HOME', name: '키친 수납함', price: 19000, category: '리빙', tone: 'mint' },
  { id: 13, code: 'ACC', name: '체인 카드지갑', price: 35000, category: '가방', tone: 'cream' },
  { id: 14, code: 'KEY', name: '스트랩 키링', price: 12000, category: '가방', tone: 'yellow' },
];

export const initialCart = [
  { ...products[0], quantity: 1, option: '색상 크림' },
  { ...products[1], quantity: 1, option: '색상 아이보리' },
  { ...products[2], quantity: 1, option: '사이즈 250' },
];

export const faqItems = [
  { question: '배송은 보통 며칠 걸리나요?', answer: '결제 완료 후 평균 1~3영업일 이내 출고되며, 택배사 사정에 따라 달라질 수 있습니다.' },
  { question: '쿠폰은 어디서 확인하나요?', answer: '마이페이지의 쿠폰 메뉴 또는 이벤트 페이지에서 보유 쿠폰과 사용 조건을 확인할 수 있습니다.' },
  { question: '교환 신청은 어떻게 하나요?', answer: '마이페이지 주문 내역에서 교환할 상품을 선택한 뒤 교환·반품 신청을 진행해 주세요.' },
  { question: '비회원 주문 조회가 가능한가요?', answer: '고객센터에서 주문번호와 주문자 정보를 입력하면 비회원 주문 내역을 조회할 수 있습니다.' },
];

export const formatWon = (value) => `₩${value.toLocaleString('ko-KR')}`;
export const users = [
  {
    id: 1,
    email: 'admin@ssagda.com',
    password: '1234',
    name: '관리자',
    grade: 'VIP',
  },
    {
    id: 4,
    email: '1@1',
    password: '1234',
    name: '관리자',
    grade: 'VIP',
  },
  {
    id: 2,
    email: 'user@ssagda.com',
    password: '1111',
    name: '이충훈',
    grade: 'GOLD',
  },
  {
    id: 3,
    email: 'test@ssagda.com',
    password: 'test1234',
    name: '테스트회원',
    grade: 'NORMAL',
  },
];