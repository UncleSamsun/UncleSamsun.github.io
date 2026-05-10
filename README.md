# 김민준 Backend Developer Portfolio

성능과 안정성을 함께 고려하는 백엔드 개발자 김민준의 정적 포트폴리오 사이트입니다.

## 디렉토리 구조

```text
.
├── index.html
├── styles.css
├── script.js
├── assets
│   ├── favicon.svg
│   └── og-image.svg
├── sitemap.xml
├── robots.txt
└── README.md
```

## 로컬 실행

별도 패키지 설치 없이 실행할 수 있습니다.

```bash
python3 -m http.server 4173
```

브라우저에서 `http://127.0.0.1:4173`을 열면 됩니다.

## 배포

### GitHub Pages

1. 변경사항을 `main` 브랜치에 push합니다.
2. GitHub 저장소의 `Settings > Pages`에서 `Deploy from a branch`를 선택합니다.
3. Branch는 `main`, folder는 `/root`를 선택합니다.

### Vercel

1. Vercel에서 GitHub 저장소를 Import합니다.
2. Framework Preset은 `Other`를 선택합니다.
3. Build Command는 비워두고 Output Directory는 `.`로 둡니다.

## 디자인 결정

v2 방향에 맞춰 Skills와 Projects를 가장 앞에 배치했습니다. 이전 경력의 긴 서사보다 백엔드 역량, 프로젝트 담당 범위, 문제 해결 결과가 먼저 보이도록 카드 밀도를 높이고 섹션 구분을 명확히 했습니다.

컬러는 다크 모드 기본에 티얼 강조색 하나만 사용했습니다. 기술 태그와 프로젝트 성과를 같은 시각 언어로 묶어 과한 연출 없이 개발자 포트폴리오답게 읽히도록 구성했습니다.

## 주요 기능

- 반응형 싱글 페이지
- 다크 모드 기본, 라이트 모드 토글
- Skills 4그룹 그리드
- Featured 프로젝트와 문제 상황, 해결 방법, 결과 구조
- Education 카드 2개 병렬 배치
- Background 상세 토글
- 이메일 클립보드 복사
- SEO 메타 태그, OpenGraph 이미지, sitemap, robots 포함
