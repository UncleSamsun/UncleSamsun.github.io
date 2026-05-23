# 김민준 Backend Developer Portfolio

백엔드 개발자 **김민준**의 포트폴리오 사이트입니다.  
기존 디자인을 전면 교체하고, 프로젝트 카드는 메인에서 간결하게 보여주며 각 프로젝트 상세 페이지에서 개요, 역할, 기술, 기능, 문제 해결 경험, 구조, 성과를 정리합니다.

## 접속 주소

<https://minjoon.me>

## 페이지 구조

- `/`: 메인 포트폴리오 페이지
- `/projects/cafe-gamsugwang/`: 카페감수광 상세
- `/projects/jsonstore/`: JsonStore 상세
- `/projects/readandshare/`: ReadAndShare 상세
- `/projects/the-last-supper/`: The Last Supper 상세

## 구현 방향

- 흰색, 검정, 회색 중심의 미니멀 모노톤 UI
- 정적 GitHub Pages에서 직접 접근 가능한 실제 디렉토리 라우팅
- 프로젝트 정보는 `assets/projects.js`에 분리
- 기존 인적 사항, 연락처, 교육, 경력 정보 유지
- 프로젝트 설명은 로컬 프로젝트 README, 코드, 설정 파일, 원격 저장소 정보를 근거로 작성
- 개발 기간이나 팀 규모처럼 README에서 확인하지 못한 항목은 TODO placeholder로 표기

## 참고한 로컬 프로젝트

- `/Users/minjoun/Workspace/projects/cafe-gamsugwang`
- `/Users/minjoun/Workspace/projects/JsonStore`
- `/Users/minjoun/Workspace/projects/ReadAndShare`
- `/Users/minjoun/Workspace/projects/TheLastSupper`

## 주요 파일

```text
.
├── index.html
├── styles.css
├── script.js
├── assets
│   ├── favicon.svg
│   ├── og-image.svg
│   └── projects.js
├── projects
│   ├── cafe-gamsugwang
│   │   └── index.html
│   ├── jsonstore
│   │   └── index.html
│   ├── readandshare
│   │   └── index.html
│   └── the-last-supper
│       └── index.html
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
