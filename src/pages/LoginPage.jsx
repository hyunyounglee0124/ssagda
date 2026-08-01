import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk, SiNaver } from 'react-icons/si';
import Logo from '../components/Logo.jsx';
import { users } from '../data.js';
import './LoginPage.css';

const socialProviders = {
  google: {
    name: 'Google',
    title: 'Google 로그인',
    description: 'Google 계정으로 SSAGDA에 로그인합니다.',
    icon: FcGoogle,
  },
  kakao: {
    name: 'Kakao',
    title: '카카오 로그인',
    description: '카카오 계정으로 SSAGDA에 로그인합니다.',
    icon: SiKakaotalk,
  },
  naver: {
    name: 'Naver',
    title: '네이버 로그인',
    description: '네이버 계정으로 SSAGDA에 로그인합니다.',
    icon: SiNaver,
  },
};

export default function LoginPage({ navigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLogin, setKeepLogin] = useState(false);
  const [error, setError] = useState('');
  const [socialLogin, setSocialLogin] = useState(null);

  const submit = (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      setError('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === normalizedEmail &&
        user.password === normalizedPassword,
    );

    if (!matchedUser) {
      setError(
        '등록되지 않은 계정이거나 비밀번호가 일치하지 않습니다.',
      );
      return;
    }

    /*
      비밀번호는 저장하지 않고 필요한 사용자 정보만 저장합니다.
    */
    const loginUser = {
      id: matchedUser.id,
      email: matchedUser.email,
      name: matchedUser.name,
      grade: matchedUser.grade,
    };

    localStorage.removeItem('ssagdaLoginUser');
    sessionStorage.removeItem('ssagdaLoginUser');

    if (keepLogin) {
      localStorage.setItem(
        'ssagdaLoginUser',
        JSON.stringify(loginUser),
      );
    } else {
      sessionStorage.setItem(
        'ssagdaLoginUser',
        JSON.stringify(loginUser),
      );
    }

    setError('');
    navigate('/mypage');
  };

  const openSocialLogin = (provider) => {
    setSocialLogin(provider);
  };

  const closeSocialLogin = () => {
    setSocialLogin(null);
  };

  const handleSocialContinue = () => {
    if (!socialLogin) {
      return;
    }

    const provider = socialProviders[socialLogin];

    window.alert(
      `${provider.title} 기능은 OAuth 연동 후 실제 로그인으로 연결할 수 있습니다.`,
    );

    closeSocialLogin();
  };

  const selectedProvider = socialLogin
    ? socialProviders[socialLogin]
    : null;

  const SelectedSocialIcon = selectedProvider?.icon;

  return (
    <section className="login-page">
      <div className="login-page__wrap">
        {/* 왼쪽 소개 영역 */}
        <div className="login-page__intro">
          <span className="login-page__eyebrow">
            SSAGDA MEMBERS
          </span>

          <h1>
            회원에게만 제공되는
            <br />
            특별한 쇼핑 혜택
          </h1>

          <p>
            로그인하고 쿠폰, 적립금, 무료배송 등
            <br />
            다양한 회원 전용 혜택을 만나보세요.
          </p>

          <div className="login-page__benefits">
            <article>
              <span>🎟️</span>

              <div>
                <strong>회원 전용 쿠폰</strong>
                <small>신규회원 첫 구매 10% 할인</small>
              </div>
            </article>

            <article>
              <span>🚚</span>

              <div>
                <strong>빠른 무료배송</strong>
                <small>회원 대상 배송 혜택 제공</small>
              </div>
            </article>

            <article>
              <span>⭐</span>

              <div>
                <strong>리뷰 추가 적립</strong>
                <small>포토리뷰 작성 시 추가 포인트</small>
              </div>
            </article>
          </div>

          <div className="login-page__brand-box">
            <Logo />
            <p>Smart Shopping, Special Benefits</p>
          </div>
        </div>

        {/* 오른쪽 로그인 영역 */}
        <form
          className="login-page__form"
          onSubmit={submit}
          noValidate
        >
          <div className="login-page__form-head">
            <span>WELCOME BACK</span>
            <h2>로그인</h2>
            <p>SSAGDA 계정으로 편리하게 쇼핑하세요.</p>
          </div>

          <div className="login-page__field">
            <label htmlFor="login-email">
              이메일 아이디
            </label>

            <div
              className={`login-page__input ${
                error && !email ? 'is-error' : ''
              }`}
            >
              <span aria-hidden="true">✉</span>

              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (error) {
                    setError('');
                  }
                }}
                placeholder="ssagda@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="login-page__field">
            <label htmlFor="login-password">
              비밀번호
            </label>

            <div
              className={`login-page__input ${
                error && !password ? 'is-error' : ''
              }`}
            >
              <span aria-hidden="true">🔒</span>

              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);

                  if (error) {
                    setError('');
                  }
                }}
                placeholder="비밀번호를 입력해 주세요"
                autoComplete="current-password"
              />

              <button
                type="button"
                className="login-page__toggle"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
              >
                {showPassword ? '숨김' : '보기'}
              </button>
            </div>
          </div>

          <div className="login-page__options">
            <label className="login-page__check">
              <input
                type="checkbox"
                checked={keepLogin}
                onChange={(event) =>
                  setKeepLogin(event.target.checked)
                }
              />

              <span />
              로그인 상태 유지
            </label>

            <button type="button">
              비밀번호를 잊으셨나요?
            </button>
          </div>

          {error && (
            <p
              className="login-page__error"
              role="alert"
            >
              <span>!</span>
              {error}
            </p>
          )}

          <button
            className="login-page__submit"
            type="submit"
          >
            로그인
            <strong aria-hidden="true">→</strong>
          </button>

          <div className="login-page__divider">
            <span>또는 간편 로그인</span>
          </div>

          {/* 소셜 로그인 */}
          <div className="login-page__social">
            <button
              type="button"
              className="login-page__social-btn login-page__social-btn--google"
              onClick={() => openSocialLogin('google')}
            >
              <FcGoogle
                className="login-page__social-icon"
                aria-hidden="true"
              />
              <span>Google</span>
            </button>

            <button
              type="button"
              className="login-page__social-btn login-page__social-btn--kakao"
              onClick={() => openSocialLogin('kakao')}
            >
              <SiKakaotalk
                className="login-page__social-icon"
                aria-hidden="true"
              />
              <span>Kakao</span>
            </button>

            <button
              type="button"
              className="login-page__social-btn login-page__social-btn--naver"
              onClick={() => openSocialLogin('naver')}
            >
              <SiNaver
                className="login-page__social-icon"
                aria-hidden="true"
              />
              <span>Naver</span>
            </button>
          </div>

          <div className="login-page__links">
            <button type="button">아이디 찾기</button>
            <i />

            <button type="button">
              비밀번호 찾기
            </button>
            <i />

            <button
              type="button"
              onClick={() => navigate('/signup')}
            >
              회원가입
            </button>
          </div>

          <p className="login-page__join">
            아직 SSAGDA 회원이 아니신가요?

            <button
              type="button"
              onClick={() => navigate('/signup')}
            >
              지금 가입하기
            </button>
          </p>
        </form>
      </div>

      {/* 소셜 로그인 모달 */}
      {selectedProvider && SelectedSocialIcon && (
        <div
          className="social-login-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeSocialLogin();
            }
          }}
        >
          <div
            className="social-login-modal__card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="social-login-title"
          >
            <button
              type="button"
              className="social-login-modal__close"
              onClick={closeSocialLogin}
              aria-label="로그인 창 닫기"
            >
              ×
            </button>

            <div
              className={`social-login-modal__logo social-login-modal__logo--${socialLogin}`}
            >
              <SelectedSocialIcon />
            </div>

            <h2 id="social-login-title">
              {selectedProvider.title}
            </h2>

            <p>{selectedProvider.description}</p>

            <button
              type="button"
              className={`social-login-modal__continue social-login-modal__continue--${socialLogin}`}
              onClick={handleSocialContinue}
            >
              {selectedProvider.name} 계정으로 계속하기
            </button>

            <button
              type="button"
              className="social-login-modal__cancel"
              onClick={closeSocialLogin}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </section>
  );
}