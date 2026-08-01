import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <Logo compact />
      <p className="footer-note">본 프로젝트는 화면 시안 구현용 샘플이며 실제 결제 기능은 포함하지 않습니다.</p>
    </footer>
  );
}
