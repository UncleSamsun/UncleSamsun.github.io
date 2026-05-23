export const profile = {
  name: "김민준",
  role: "Backend Developer",
  email: "alswns5620@naver.com",
  phone: "010-9229-1802",
  github: "https://github.com/UncleSamsun",
  blog: null,
  headline: "검증 가능한 구조와 안정적인 흐름을 만드는 백엔드 개발자",
  intro:
    "Java와 Spring Boot 기반 백엔드를 중심으로 인증, 데이터 처리, Redis, 테스트, 모니터링을 다룹니다. 철도 신호장치 SIL4 인증 프로젝트에서 쌓은 검증 중심의 태도를 서비스 백엔드 설계와 문제 해결에 연결하고 있습니다.",
  about: [
    "요구사항을 기능 목록으로만 보지 않고, 실패 가능성과 운영 흐름까지 함께 정리하려고 합니다.",
    "테스트와 문서화, API 계약, 모니터링을 통해 팀이 같은 상태를 보고 판단할 수 있는 개발 방식을 선호합니다.",
    "기존 코드와 현재 제약을 먼저 읽고, 작은 개선을 꾸준히 쌓아 안정성을 높이는 데 강점이 있습니다.",
  ],
  skills: [
    "Java",
    "Spring Boot",
    "Spring Security",
    "Spring Data JPA",
    "MySQL",
    "Redis",
    "Querydsl",
    "Spring Batch",
    "JUnit5",
    "Mockito",
    "Docker",
    "AWS",
    "GitHub Actions",
    "Prometheus",
    "Grafana",
    "Swagger",
  ],
  education: [
    {
      period: "2024.11 ~ 2025.06",
      title: "구름톤 딥다이브 - 카카오 연계 백엔드 부트캠프",
      description:
        "Java/Spring Boot 기반 서비스 개발, 도메인 모델링, 테스트, 모니터링, 배포 흐름을 학습하고 팀 프로젝트로 적용했습니다.",
    },
    {
      period: "2026.01 ~ 현재",
      title: "SSAFY - 삼성청년SW아카데미",
      description:
        "Java 트랙에서 객체지향, 알고리즘, SQL, Spring Boot, CS 기초를 학습하고 있습니다.",
    },
  ],
  career: [
    {
      period: "2018.12 ~ 2024.04",
      title: "샬롬엔지니어링(주) - 하드웨어 및 소프트웨어 개발 대리",
      description:
        "철도 신호장치 개발과 SIL4 인증 프로젝트를 수행하며 요구사항 문서화, 테스트, 하드웨어 연동, 양산·납품까지 이어지는 신뢰성 중심 개발을 경험했습니다.",
    },
  ],
};

export const hardwareProjects = [
  {
    title: "SIL4 인증 ATC 차상신호장치 개발",
    period: "2018.12 ~ 2024.04",
    description:
      "국내 최초 SIL4 인증 ATC 차상신호장치 개발 프로젝트에서 QMP, CMP, SQAP, SRS, SMG, SWRS 등 계획문서를 작성하고 SW/Component/Integration/Hardware 연동 테스트를 수행했습니다. 인증 후 양산·납품을 통해 약 100억 원 규모 매출 달성에 기여했습니다.",
  },
  {
    title: "부산 1호선 차상신호장치 AMP 보드 개량",
    period: "철도 전장 시스템",
    description:
      "부산 1호선 차량에 실제 탑재되는 AMP 보드 개량에 참여하며 현장 적용을 전제로 한 하드웨어 안정성과 검증 흐름을 경험했습니다.",
  },
  {
    title: "ATS Backplane 보드 최신화 / TACHO Pulse Generator",
    period: "하드웨어 자체 개발 전환",
    description:
      "외주 의존도가 있던 ATS 차상신호장치 Backplane 보드를 자체 개발 흐름으로 전환하고, CAN/RS 기반 속도 발생 장치인 TACHO Pulse Generator 개발에 참여했습니다.",
  },
  {
    title: "창고 자재관리 앱",
    period: "Xamarin",
    description:
      "C#과 Xamarin으로 창고 자재관리 앱을 개발해 실제 업무에 적용했습니다. 이 경험을 계기로 업무 문제를 소프트웨어로 해결하는 방식에 관심을 갖고 백엔드 개발로 전환했습니다.",
  },
];

export const projects = [
  {
    slug: "cafe-gamsugwang",
    name: "카페감수광",
    label: "Recommendation",
    summary: "제주 카페 리뷰와 위치 데이터를 기반으로 취향에 맞는 카페를 추천하는 서비스",
    period: "2025.05.12 ~ 2025.06.10",
    team: "5명",
    role:
      "카카오 연계 프로젝트에서 데이터 수집과 추천 품질을 담당했습니다. FastAPI 기반 데이터 처리 서버와 Spring Boot 서비스 서버를 분리하고, 리뷰 키워드 추출 파이프라인과 실시간 작업 상태 조회 흐름을 설계했습니다.",
    stack: [
      "Java 17",
      "Spring Boot 3.4.5",
      "Spring Security",
      "Spring Data JPA",
      "MySQL",
      "Redis",
      "Elasticsearch",
      "Spring Batch",
      "Python 3.11",
      "FastAPI",
      "Selenium",
      "KiwiPipy",
      "KR-SBERT",
      "TF-IDF",
      "Swagger",
      "Docker",
      "AWS S3",
      "GitHub Actions",
    ],
    links: [
      { label: "Backend GitHub", url: "https://github.com/UncleSamsun/cafe-gamsugwang-be" },
    ],
    overview:
      "카카오맵 API와 웹 크롤링으로 제주 카페 리뷰와 위치 데이터를 수집하고, 키워드 추출과 추천 API로 사용자가 지도, 키워드, 테마, 위치 기반으로 카페를 탐색할 수 있게 만든 서비스입니다.",
    features: [
      "이메일 로그인/회원가입, JWT 인증, Kakao/Naver/Google OAuth 진입점",
      "카페 목록/상세 조회, 검색, 자동완성, 수정 제안",
      "위치 기반 추천, 키워드 기반 추천, 사용자 정보 기반 맞춤 추천",
      "리뷰 작성/조회/삭제, 리뷰 좋아요, 북마크, 피드, 프로필 관리",
      "카카오맵 기반 카페 검색과 Selenium 크롤링, 리뷰 저장",
      "Kiwi 형태소 분석, KR-SBERT 임베딩, HDBSCAN 클러스터링, TF-IDF 기반 대표 키워드 선정",
    ],
    architecture:
      "FastAPI 데이터 처리 서버와 Spring Boot 서비스 서버를 분리한 이중 서버 아키텍처입니다. FastAPI 서버는 카카오맵 데이터 수집, 크롤링, 키워드 분석을 담당하고 Spring Boot 서버는 인증, 카페, 추천, 리뷰, 북마크, 피드, 사용자 API를 제공합니다. Redis는 비동기 작업 상태를 저장해 진행률 조회에 활용했습니다.",
    problemSolving: [
      {
        title: "카카오맵 API 응답량 제한 대응",
        detail:
          "한 번에 확보할 수 있는 카페 데이터가 제한되는 문제를 제주도 행정구역 좌표 기반 격자 데이터로 나누어 해결했습니다. 지역 단위로 탐색 범위를 분할해 누락을 줄이고 수집 안정성을 높였습니다.",
      },
      {
        title: "한국어 리뷰 키워드 파이프라인 설계",
        detail:
          "KiwiPipy 형태소 분석, KR-SBERT 임베딩, TF-IDF를 조합하고 불용어 사전과 형용사 필터링을 적용해 추천에 사용할 수 있는 키워드를 추출했습니다.",
      },
      {
        title: "비동기 크롤링 진행률 조회",
        detail:
          "크롤링과 키워드 분석은 시간이 오래 걸리는 작업이어서 Redis에 작업 상태를 저장하고, 클라이언트가 실시간 진행률을 조회할 수 있는 구조로 구성했습니다.",
      },
    ],
    results: [
      "FastAPI + Spring Boot 이중 서버 아키텍처 설계",
      "카카오맵 API 응답량 제한을 좌표 격자화로 보완",
      "KiwiPipy + KR-SBERT + TF-IDF 기반 한국어 키워드 파이프라인 설계",
      "비동기 크롤링 + Redis 상태 저장으로 실시간 진행률 조회 기능 구현",
    ],
  },
  {
    slug: "jsonstore",
    name: "JsonStore",
    label: "E-commerce",
    summary: "상품 등록부터 장바구니, 배송지, 주문, 관리자 처리까지 이어지는 커머스 MVP",
    period: "2025.03.31 ~ 2025.04.16",
    team: "5명",
    role:
      "장바구니 캐싱, 웹 알림, 테스트 코드를 담당했습니다. 고객 쇼핑 흐름과 관리자 주문 처리 흐름이 끊기지 않도록 API 계약과 도메인 책임을 정리했습니다.",
    stack: [
      "Java 21",
      "Spring Boot 3.4.4",
      "Spring Security",
      "Spring Data JPA",
      "Querydsl",
      "JWT",
      "MySQL",
      "H2",
      "Redis",
      "Firebase Admin SDK",
      "AWS S3 SDK",
      "Swagger",
      "JUnit5",
      "Mockito",
      "Spring Security Test",
      "React 19",
      "TypeScript",
      "Vite 6",
    ],
    links: [
      { label: "Backend GitHub", url: "https://github.com/UncleSamsun/json-store-be" },
    ],
    overview:
      "일반 고객과 관리자가 같은 서비스 안에서 서로 다른 목적을 수행하는 쇼핑몰형 서비스입니다. 고객은 상품을 탐색하고 장바구니와 배송지를 기반으로 주문을 생성하며, 관리자는 상품과 주문 상태를 관리합니다.",
    features: [
      "고객/관리자 회원가입과 로그인, JWT 기반 인증",
      "상품 목록 조회, 검색, 상세 조회, 관리자 상품 등록/수정",
      "장바구니 추가/조회/삭제",
      "배송지 등록/조회/수정/삭제, 기본 배송지 설정",
      "주문 생성, 주문 목록/상세 조회, 주문 취소, 배송지 변경",
      "관리자 주문 목록/상세 조회와 주문 상태 변경",
      "FCM 토큰 등록, 알림, S3 이미지 업로드, Redis 확장 구조",
    ],
    architecture:
      "Spring Boot 백엔드는 common, admin, auth, cart, delivery, member, notification, order, product 도메인으로 분리되어 있습니다. 프론트엔드는 Vite/React 단일 앱에서 고객 기능과 관리자 기능을 좌측 내비게이션으로 나누고, REST API 계약을 그대로 호출합니다.",
    problemSolving: [
      {
        title: "Redis 기반 장바구니 캐싱",
        detail:
          "조회와 수정이 빈번한 장바구니 데이터를 Redis 캐싱 구조로 다루어 DB 접근 부담을 줄이고 장바구니 CRUD 응답 흐름을 개선했습니다.",
      },
      {
        title: "Firebase Cloud Messaging 웹 알림",
        detail:
          "Firebase Cloud Messaging을 연동해 웹 알림 기능을 구현하고, 향후 주문/배송 이벤트 알림으로 확장할 수 있는 기반을 만들었습니다.",
      },
      {
        title: "테스트 코드 작성",
        detail:
          "JUnit과 Mockito로 담당 기능 테스트 코드를 작성해 장바구니와 알림 기능의 주요 동작을 검증 가능하게 구성했습니다.",
      },
    ],
    results: [
      "Redis 기반 장바구니 캐싱으로 CRUD 성능 개선",
      "Firebase Cloud Messaging 연동 웹 알림 구현",
      "JUnit/Mockito 테스트 코드 100% 작성",
    ],
  },
  {
    slug: "readandshare",
    name: "ReadAndShare",
    label: "Community",
    summary: "독서 기록 공유 서비스의 인증, 검색, 탈퇴 기능을 확장한 커뮤니티 백엔드",
    period: "2025.03.13 ~ 2025.03.31",
    team: "4명",
    role:
      "이메일 인증, 사용자 검색, 회원 탈퇴 기능을 구현하고 주요 기능 테스트를 작성했습니다. 기능 추가 과정에서 발생할 수 있는 예외와 실패 흐름을 테스트로 검증하는 데 집중했습니다.",
    stack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "MySQL",
      "Redis",
      "Swagger",
      "JUnit5",
      "Mockito",
      "Git Flow",
      "GitHub Actions",
      "SonarCloud",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/UncleSamsun/read-and-share" },
    ],
    overview:
      "독서 기록 공유 서비스인 ReadNShare에 추가 기능을 구현하면서 백엔드 시스템의 에러와 버그를 탐지하고 해결하는 데 초점을 둔 프로젝트입니다.",
    features: [
      "회원가입, 로그인, 이메일 인증",
      "이메일 기반 회원 검색",
      "도서 검색과 상세 조회",
      "리뷰 작성/조회와 책 제목, 저자, 출판사, 리뷰어, 키워드 기반 검색",
      "팔로우/언팔로우와 팔로워/팔로잉 조회",
      "FCM 알림과 이벤트 리스너 테스트",
      "Swagger 기반 API 문서화",
    ],
    architecture:
      "auth, member, book, review, follow, notification 도메인으로 나뉜 Spring Boot 백엔드입니다. GitHub Actions CI/CD와 SonarCloud 기반 품질 관리 흐름을 갖추고, 컨트롤러와 서비스 단위 테스트로 주요 기능을 검증합니다.",
    problemSolving: [
      {
        title: "이메일 인증 흐름 구현",
        detail:
          "회원가입 이후 이메일 토큰을 발급하고 인증 상태를 갱신하는 흐름을 구현했습니다. 메일 발송 실패와 인증 실패 케이스도 함께 다루었습니다.",
      },
      {
        title: "사용자 검색·탈퇴 기능",
        detail:
          "이메일 기반 사용자 검색과 회원 탈퇴 기능을 구현했습니다. 사용자 상태 변화가 인증과 검색 흐름에 영향을 주지 않도록 기능을 분리했습니다.",
      },
      {
        title: "JUnit 기반 테스트",
        detail:
          "주요 기능에 대한 JUnit/Mockito 테스트를 작성해 기능 확장 중 발생할 수 있는 오류를 빠르게 확인할 수 있도록 했습니다.",
      },
    ],
    results: [
      "이메일 인증 / 사용자 검색·탈퇴 기능 구현",
      "JUnit 기반 주요 기능 100% 테스트 커버리지",
      "Git Flow와 Swagger 기반 협업 경험",
    ],
  },
  {
    slug: "the-last-supper",
    name: "The Last Supper",
    label: "Waiting & Reservation",
    summary: "식당 예약과 현장 웨이팅을 함께 관리하는 백엔드 서비스",
    period: "2025.04.17 ~ 2025.05.09",
    team: "5명",
    role:
      "웨이팅 파트를 담당했습니다. 부하 테스트와 단위 테스트로 병목과 동시성 문제를 발견하고, DB Lock과 분산락을 비교한 뒤 Redis Atomic 연산 기반 해결책을 적용했습니다.",
    stack: [
      "Java 17",
      "Spring Boot 3.4.4",
      "Spring Security",
      "JWT",
      "Spring Data JPA",
      "MySQL",
      "H2",
      "Redis",
      "Spring Batch",
      "WebSocket",
      "Actuator",
      "Prometheus",
      "Grafana",
      "JUnit5",
      "Mockito",
      "Gradle",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/UncleSamsun/The-Last-Supper" },
    ],
    overview:
      "식당 이용자가 예약 또는 웨이팅으로 방문을 신청하고, 운영자가 예약 슬롯과 웨이팅 큐를 관리할 수 있는 백엔드 프로젝트입니다. 대기열 증가, 중복 접수, 대기번호 발급, 영업 종료 후 이력 관리 같은 운영 문제를 다룹니다.",
    features: [
      "회원가입, 로그인, JWT 인증과 토큰 재발급",
      "매장 등록/조회/수정과 예약/웨이팅 운영 정보 관리",
      "예약 플랜 조회, 예약 슬롯 오픈/상태 변경, 고객 예약 등록/취소/거절",
      "웨이팅 오픈/중단/종료, 고객 웨이팅 등록/취소/미루기",
      "내 대기 순번 조회, 다음 고객 호출, 웨이팅 큐 조회",
      "Redis 기반 웨이팅 큐, 실패 요청 dead-letter 큐, Spring Batch 이력 처리",
      "Prometheus/Grafana 모니터링 환경",
    ],
    architecture:
      "Spring Boot API 서버가 JWT 인증 뒤 MySQL, Redis, Spring Batch, Actuator와 연결됩니다. 웨이팅 등록 요청은 Redis 큐에 먼저 적재되고 비동기 프로세서가 DB 저장을 수행하며, Batch는 웨이팅 이력을 처리합니다. Actuator 메트릭은 Prometheus/Grafana로 관찰합니다.",
    problemSolving: [
      {
        title: "부하 테스트 기반 병목 탐지",
        detail:
          "JMeter 부하 테스트로 웨이팅 등록 요청이 몰릴 때 응답 시간이 지연되는 구간을 발견했습니다. 이후 DB 저장을 요청-응답 경로에서 분리하고 Spring 비동기 처리로 개선했습니다.",
      },
      {
        title: "웨이팅 번호 중복 동시성 문제 해결",
        detail:
          "JUnit 테스트 중 동시에 웨이팅 번호가 발급될 때 중복 가능성을 발견했습니다. DB Lock, 분산락을 검토한 뒤 Redis Atomic 연산인 SETNX 기반 pending key를 적용해 중복 접수를 방지했습니다.",
      },
      {
        title: "운영 흐름 자동화와 모니터링",
        detail:
          "Prometheus와 Grafana로 모니터링 환경을 구성하고, Spring Batch로 자정 웨이팅 이력 처리를 자동화했습니다.",
      },
    ],
    results: [
      "JMeter 부하 테스트로 병목 지점 탐지",
      "JUnit 테스트 중 웨이팅 번호 중복 동시성 문제 발견",
      "DB Lock, 분산락 검토 후 Redis Atomic 연산(SETNX)으로 해결",
      "Spring 비동기 처리 도입으로 응답 속도 약 97% 개선",
      "Prometheus + Grafana 모니터링 구성, Spring Batch 자정 배치 처리",
    ],
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
