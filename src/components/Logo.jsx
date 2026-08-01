import logoImage from '../assets/logo3.png';

export default function Logo({ compact = false }) {
  return (
    <span
      className={`brand ${compact ? 'brand--compact' : ''}`}
      aria-label="SSAGDA"
    >
      <img
        className="brand__logo-image"
        src={logoImage}
        alt="SSAGDA 로고"
      />
    </span>
  );
}