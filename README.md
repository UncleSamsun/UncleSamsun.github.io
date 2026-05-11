# 김민준 Backend Developer Portfolio

성능과 안정성을 함께 고려하는 백엔드 개발자 **김민준**의 포트폴리오 사이트입니다.  
5년차 하드웨어 엔지니어 경험에서 얻은 검증·테스트 중심 사고를 Java, Spring Boot, Redis 기반 백엔드 개발로 이어가고 있습니다.

## 접속 주소

<https://minjoon.me>

## 포트폴리오 구성

- **Hero**: 이름, 포지션, 핵심 관심사
- **기술 스택**: Strong, Knowledgeable, Testing & Monitoring, Collaboration
- **프로젝트**: 4개 백엔드 프로젝트와 담당 역할, 주요 구현, 기술적 고민, 성과
- **교육**: 구름톤 딥다이브, SSAFY
- **이전 경력**: 샬롬엔지니어링 철도 전장 시스템 개발·검증 경험
- **연락**: 이메일, 전화번호, GitHub

## 주요 프로젝트

### 최후의 만찬 — 실시간 웨이팅 서비스

- 기간: 2025.04.17 ~ 2025.05.09
- 담당: 웨이팅 도메인 전체, API 설계, 이벤트 스토밍
- 기술: Java, Spring Boot, Spring Batch, MySQL, Redis, JMeter, Prometheus, Grafana
- 핵심: Redis SETNX 기반 중복 방지, Spring 비동기 처리, Spring Batch 자정 집계, 모니터링 구성
- 성과: 응답 처리 시간 약 97% 개선
- GitHub: <https://github.com/UncleSamsun/The-Last-Supper>

### 카페감수광 — 카페 리뷰 기반 맞춤 추천

- 기간: 2025.05.12 ~ 2025.06.10
- 담당: 데이터 수집 파이프라인, 한국어 키워드 추출 시스템
- 기술: Python, FastAPI, Spring Boot, MySQL, Redis, KR-SBERT, Selenium
- 핵심: Selenium 크롤링, FastAPI NLP 서버, Redis 작업 상태 저장, 실시간 진행률 조회
- GitHub: <https://github.com/pok-ssak>

### Json-store — 이커머스 백엔드

- 기간: 2025.03.31 ~ 2025.04.16
- 담당: 장바구니 도메인, 웹 알림 기능, 테스트 코드
- 기술: Java, Spring Boot, MySQL, Redis, Firebase, JUnit, Mockito
- 핵심: 장바구니 CRUD, Redis 캐싱 레이어, Firebase Cloud Messaging, Swagger API 문서
- GitHub: <https://github.com/UncleSamsun/json-store-be>

### ReadNShare — 독서 기록 공유 커뮤니티

- 기간: 2025.03.13 ~ 2025.03.31
- 담당: 이메일 인증, 사용자 검색, 회원 탈퇴, 주요 기능 테스트
- 기술: Java, Spring Boot, MySQL, Redis, JUnit, Mockito
- 핵심: 이메일 인증 흐름, 회원 탈퇴 처리, 사용자 검색 API, JUnit 기반 테스트
- GitHub: <https://github.com/UncleSamsun/read-and-share>

## 기술 스택

### Strong

`Java` `Spring Boot` `Spring MVC` `MySQL` `JPA` `Redis`

### Knowledgeable

`Docker` `AWS` `FastAPI` `Python` `Firebase` `Node.js` `MSSQL`

### Testing & Monitoring

`JUnit5` `Mockito` `JMeter` `Prometheus` `Grafana` `Swagger`

### Collaboration

`Git` `GitHub` `Git Flow` `Notion` `이벤트 스토밍` `DDD`

## 교육

- **구름톤 딥다이브 — 카카오 연계 백엔드 부트캠프**
  - 2024.11 ~ 2025.06
  - Java/Spring Boot 기반 서비스 개발, DDD, 이벤트 스토밍, 테스트, 모니터링, 배포 학습
- **SSAFY — 삼성청년SW아카데미**
  - 2026.01 ~ 현재
  - Java, 알고리즘, SQL, Spring Boot, CS 기초 학습

## 이전 경력

**샬롬엔지니어링(주)** · 2018.12 ~ 2024.04 · 하드웨어 및 소프트웨어 개발 대리

철도 차량용 전장 시스템 분야에서 SIL4 인증 프로젝트의 SW 테스트, 품질 문서 작성, 일부 하드웨어 설계를 담당했습니다.  
검증·테스트 중심의 업무 습관을 현재의 백엔드 개발에도 이어가고 있습니다.

키워드: `SIL4 인증` `부산 1호선 납품` `SW 테스터` `Vector CAST` `Code Inspector` `EN50126` `요구사양서 작성` `Arduino` `PCB 설계`

## 연락

- Email: <alswns5620@naver.com>
- Phone: 010-9229-1802
- GitHub: <https://github.com/UncleSamsun>

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
4. 커스텀 도메인 설정 후 <https://minjoon.me>로 접속할 수 있습니다.

### Vercel

1. Vercel에서 GitHub 저장소를 Import합니다.
2. Framework Preset은 `Other`를 선택합니다.
3. Build Command는 비워두고 Output Directory는 `.`로 둡니다.

## 디자인 방향

다크 모드를 기본으로 하고, 티얼 계열의 단일 강조색을 사용했습니다. 카드형 레이아웃과 얇은 구분선을 중심으로 프로젝트와 기술 정보가 먼저 읽히도록 구성했습니다.

프로젝트 상세는 작은 카드 그리드 대신 `개요 / 담당 역할 / 주요 구현 / 기술적 고민 / 성과·배운 점` 흐름의 세로 리스트로 정리해, 좁은 영역에 내용을 끼워 넣는 느낌을 줄였습니다.
