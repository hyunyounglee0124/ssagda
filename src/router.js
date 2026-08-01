// src/router.js

export function getCurrentPath() {
  const hash = window.location.hash.replace('#', '');

  // 해시가 없으면 홈 화면
  return hash || '/';
}

export function navigate(path) {
  const normalizedPath = path.startsWith('/')
    ? path
    : `/${path}`;

  window.location.hash = normalizedPath;
}