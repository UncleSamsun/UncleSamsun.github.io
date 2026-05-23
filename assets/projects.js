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
          "카카오맵 API는 한 번의 검색에서 받을 수 있는 결과가 제한되어 제주 전체 카페를 안정적으로 수집하기 어려웠습니다. 제주도 행정구역 좌표와 격자 데이터를 기준으로 탐색 범위를 나누고, 지역 단위 검색을 반복하는 방식으로 누락 가능성을 줄였습니다.",
      },
      {
        title: "한국어 리뷰 키워드 파이프라인 설계",
        detail:
          "리뷰 원문은 표현이 짧고 반복어가 많아 바로 추천에 쓰기 어려웠습니다. KiwiPipy로 후보 단어를 추출한 뒤 불용어와 형용사 필터링을 적용하고, KR-SBERT 임베딩과 클러스터링, TF-IDF 대표 키워드 선정 과정을 연결해 추천에 사용할 수 있는 키워드 데이터로 정리했습니다.",
      },
      {
        title: "비동기 크롤링 진행률 조회",
        detail:
          "크롤링과 키워드 분석은 요청 시간이 길어지는 작업이라 API 응답을 기다리게 만들면 사용자 경험이 나빠졌습니다. FastAPI 작업을 비동기로 실행하고 Redis에 작업 상태를 저장해, 클라이언트가 진행률과 실패 상태를 별도로 조회할 수 있도록 구성했습니다.",
      },
      {
        title: "크롤링 실패 재시도 흐름",
        detail:
          "상세 페이지 크롤링은 네트워크 상태와 페이지 구조 변화에 영향을 받기 쉬웠습니다. 실패한 카페 ID를 따로 모아 재시도하는 흐름을 두고, 검색 성공/빈 응답/오류 응답과 상세 크롤링 재시도 케이스를 단위 테스트로 검증했습니다.",
      },
    ],
    validation: [
      {
        title: "백엔드 테스트 실행 결과",
        detail:
          "Spring Boot 백엔드 전체 테스트는 Java 17 환경에서 133개 중 121개가 통과했습니다. 나머지 12개는 외부 키와 환경변수 값이 없는 로컬 환경에서 Spring context와 CafeService 통합성 테스트가 로딩되지 않아 실패한 케이스입니다.",
      },
      {
        title: "카페 도메인 테스트 보강",
        detail:
          "카페 컨트롤러, 엔티티, 저장소, Elasticsearch 클라이언트, 서비스 테스트가 추가되어 검색·추천·도메인 동작을 여러 계층에서 검증할 수 있게 구성했습니다.",
      },
      {
        title: "크롤링 서버 테스트 설계",
        detail:
          "FastAPI 크롤링 서버에는 카페 검색, 상세 크롤링, 키워드 추출, 키워드 클러스터링 단위 테스트가 준비되어 있습니다. 검색 성공/빈 응답/오류 응답, 상세 크롤링 재시도, 형태소 분석 예외, 클러스터 저장 흐름을 테스트 대상으로 분리했습니다.",
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
          "장바구니는 상품 탐색 중 반복적으로 조회·수정되는 데이터라 매번 DB를 거치면 응답 흐름이 무거워질 수 있었습니다. Redis를 장바구니 저장소로 활용해 추가, 조회, 삭제 API가 빠르게 동작하도록 구성하고, 사용자별 장바구니 상태를 서비스 계층에서 일관되게 다루도록 정리했습니다.",
      },
      {
        title: "JWT 기준 장바구니·알림 API 정리",
        detail:
          "초기 API는 요청값의 회원 식별자에 의존할 여지가 있어 인증 주체와 요청 데이터가 어긋날 수 있었습니다. 장바구니와 알림 기능에서 JWT 토큰의 memberUid를 기준으로 사용자 정보를 가져오도록 수정해, 클라이언트가 임의 식별자를 넘기지 않아도 현재 로그인 사용자 기준으로 동작하게 만들었습니다.",
      },
      {
        title: "주문·재고 동시성 검증",
        detail:
          "주문 처리 과정에서는 동시에 같은 상품을 구매할 때 재고가 잘못 차감될 수 있는 위험이 있었습니다. 상품 재고 처리를 별도 서비스로 분리하고 동시성 테스트를 추가해 주문 생성과 재고 차감 흐름을 검증했습니다.",
      },
      {
        title: "Firebase Cloud Messaging 웹 알림",
        detail:
          "Firebase Cloud Messaging을 연동해 웹 알림 기능을 구현했습니다. 알림 토큰 등록과 발송 실패 예외를 테스트로 다루어, 향후 주문·배송 이벤트 알림으로 확장할 수 있는 기반을 만들었습니다.",
      },
    ],
    validation: [
      {
        title: "전체 테스트 실행 결과",
        detail:
          "Java 21 환경에서 Gradle 테스트를 실행해 69개 테스트 스위트, 152개 테스트가 모두 통과했습니다. 장바구니, 알림, 주문, 배송지, 상품, 인증, 관리자 기능이 테스트 대상에 포함됩니다.",
      },
      {
        title: "테스트 기반 API 안정화",
        detail:
          "로그인·토큰 인증, 장바구니, 알림, 주문/재고 흐름에 대한 JUnit/Mockito 테스트를 보강했습니다. Jacoco 설정을 추가해 기능 구현 후 테스트 누락을 확인할 수 있는 기반도 마련했습니다.",
      },
    ],
    results: [
      "Redis 기반 장바구니 캐싱으로 CRUD 성능 개선",
      "Firebase Cloud Messaging 연동 웹 알림 구현",
      "장바구니·알림 API를 JWT 인증 주체 기준으로 정리",
      "주문·재고 동시성 테스트와 JUnit/Mockito 테스트 보강",
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
          "회원가입 직후 바로 서비스를 이용하게 두면 실제 이메일 소유 여부를 확인하기 어려웠습니다. EmailToken 엔티티와 저장소, EmailService를 추가해 인증 토큰 발급과 인증 상태 갱신 흐름을 만들고, 메일 발송 실패와 인증 실패 예외까지 테스트로 다루었습니다.",
      },
      {
        title: "사용자 검색·탈퇴 기능",
        detail:
          "사용자 검색과 회원 탈퇴는 인증 상태, 중복 이메일, 삭제 상태와 맞물려 예외가 생기기 쉬운 기능이었습니다. 이메일 기반 사용자 검색과 탈퇴 흐름을 서비스 계층에 분리하고, 탈퇴 후 조회·인증 흐름에 영향을 주지 않도록 테스트 케이스를 보강했습니다.",
      },
      {
        title: "리뷰 검색과 이벤트 테스트 보강",
        detail:
          "리뷰 검색은 책 제목, 저자, 출판사, 리뷰어, 키워드 등 여러 조건을 함께 다뤄야 했습니다. 검색 조건 객체와 리뷰 이벤트 리스너 테스트를 추가해 조건별 검색과 리뷰 작성 이후 부가 동작을 검증할 수 있게 했습니다.",
      },
      {
        title: "협업 인수인계 중심의 디버깅",
        detail:
          "짧은 기간 안에 기존 코드를 이어받아 기능을 확장해야 했기 때문에 Swagger 문서화와 테스트 보강을 함께 진행했습니다. 버그 리포트와 수정 이력을 남겨 다음 팀원이 같은 문제를 재현하고 이어서 개선할 수 있는 형태로 정리했습니다.",
      },
    ],
    validation: [
      {
        title: "전체 테스트 실행 결과",
        detail:
          "Java 17 환경에서 전체 테스트를 실행했을 때 199개 중 192개가 통과했습니다. 실패한 7개는 로컬 Redis가 실행되지 않은 상태에서 Feed/FCM 통합 테스트가 localhost:6379 연결을 시도하며 발생한 인프라 의존 실패입니다.",
      },
      {
        title: "기능별 테스트 보강",
        detail:
          "EmailServiceTest, MemberServiceTest, MemberApiControllerTest를 통해 이메일 인증과 회원 기능을 검증했고, Auth, Book, Favorite, Review 도메인 테스트를 추가해 주요 기능의 회귀를 확인할 수 있게 했습니다.",
      },
    ],
    results: [
      "이메일 인증 / 사용자 검색·탈퇴 기능 구현",
      "인증, 도서, 즐겨찾기, 리뷰 도메인 테스트 보강",
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
          "웨이팅 등록 요청이 몰릴 때 DB 저장까지 동기적으로 처리하면서 응답 시간이 길어지는 구간이 생겼습니다. 2,000개 계정 데이터와 JMeter 시나리오로 요청 흐름을 재현하고, API 응답 경로에서는 Redis 큐에 먼저 적재한 뒤 비동기 프로세서가 DB 저장을 맡도록 구조를 바꿨습니다.",
      },
      {
        title: "웨이팅 번호 중복 동시성 문제 해결",
        detail:
          "동시에 같은 고객이 웨이팅을 등록하거나 대기번호가 발급될 때 중복 접수 가능성이 있었습니다. DB Lock과 분산락을 비교한 뒤, 요청 초입에서 Redis SETNX 기반 pending key로 중복 진입을 막고 Redis INCR로 대기번호를 발급하는 방식으로 단순화했습니다.",
      },
      {
        title: "실패 요청 복구 흐름",
        detail:
          "비동기 처리에서는 큐 적재 이후 DB 저장이 실패했을 때 사용자가 성공으로 오해할 위험이 있었습니다. 대기열 처리 프로세서에 실패 요청 dead-letter 큐와 pending key 해제 흐름을 두고, 성공·중복·저장 실패 케이스를 단위 테스트로 검증했습니다.",
      },
      {
        title: "운영 흐름 자동화와 모니터링",
        detail:
          "운영 종료 후 웨이팅 큐 데이터를 이력으로 옮기는 작업을 수동 처리에 의존하지 않도록 Spring Batch와 스케줄러로 구성했습니다. Actuator 메트릭은 Prometheus와 Grafana로 연결해 병목 확인과 운영 상태 관찰이 가능하도록 했습니다.",
      },
    ],
    validation: [
      {
        title: "전체 테스트 실행 결과",
        detail:
          "Java 17 환경에서 Gradle 테스트를 실행해 7개 테스트 스위트, 17개 테스트가 모두 통과했습니다. 웨이팅 서비스, Redis 서비스, 비동기 큐 프로세서 테스트가 포함됩니다.",
      },
      {
        title: "부하 테스트와 모니터링 자산",
        detail:
          "JMeter Thread Group, 2,000개 계정 CSV, 테스트용 SQL 데이터, 28,661줄 규모의 JMeter 실행 로그가 남아 있습니다. MethodExecutionTimeLogger와 Prometheus/Grafana 설정을 함께 두어 성능 개선 전후를 관찰할 수 있게 구성했습니다.",
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
