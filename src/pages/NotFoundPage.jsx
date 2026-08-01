export default function NotFoundPage({ navigate }) {
  return <div className="empty-state"><strong>페이지를 찾을 수 없습니다.</strong><p>주소가 변경되었거나 존재하지 않는 페이지입니다.</p><button className="button button--primary" type="button" onClick={() => navigate('/')}>홈으로 이동</button></div>;
}
