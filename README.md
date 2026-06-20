# 김민준 Backend Developer Portfolio

백엔드 개발자 **김민준**의 포트폴리오 사이트입니다.

이 사이트는 **Astro + React**로 빌드하며, GitHub Pages는 GitHub Actions에서 생성한 `dist/` 산출물을 서비스합니다.

## 접속 주소

<https://minjoon.me>

## 구조

- `src/pages`: Astro 라우트
- `src/components/portfolio`: 포트폴리오 UI 컴포넌트
- `src/design-system/portello`: vendored Portello design system
- `src/data`: 프로필, 내비게이션, 프로젝트 포트폴리오 콘텐츠
- `public/`: 정적 자산 원본. Astro 빌드 시 `dist/`로 복사됩니다.
- `dist/`: `npm run build`가 생성하는 배포 산출물

## 현재 라우트

- `/`
- `/projects/hola-climbing/`
- `/projects/cafe-gamsugwang/`
- `/projects/jsonstore/`
- `/projects/readandshare/`
- `/projects/the-last-supper/`

## 로컬 개발

```bash
npm install
npm run dev
```

기본 개발 서버는 `http://127.0.0.1:4321`에서 실행됩니다.

## 확인 및 빌드

```bash
npm run check
npm run build
npm run test:e2e
```

- `npm run check`: `astro check`와 Vitest를 실행합니다.
- `npm run build`: Astro 정적 사이트를 `dist/`에 빌드합니다.
- `npm run test:e2e`: Playwright smoke 테스트를 실행합니다.

## 미리보기

```bash
npm run preview
```

## GitHub Pages 배포

`.github/workflows/deploy.yml`은 `main` 브랜치 push 또는 수동 실행 시 Node 22로 의존성을 설치하고, `npm run check`, `npm run build`를 통과한 뒤 `dist/`를 GitHub Pages artifact로 업로드합니다.

루트의 레거시 정적 HTML/CSS/JS 파일은 retired 상태입니다. `CNAME`, `robots.txt`, `sitemap.xml`, favicon, Open Graph image 같은 정적 배포 메타데이터는 `public/` 아래 원본을 유지하고 Astro가 `dist/`로 복사합니다.
