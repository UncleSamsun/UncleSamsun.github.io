export const profile = {
  name: "김민준",
  role: "Backend Developer",
  email: "alswns5620@naver.com",
  phone: "010-9229-1802",
  github: "https://github.com/UncleSamsun",
  blog: null,
  headline: "검증 가능한 구조와 안정적인 흐름을 만드는 백엔드 개발자",
  positioning:
    "철도 신호장치 **SIL4 인증 5년** 기반. 기능 구현보다 ==실패 가능성과 검증==을 먼저 보는 백엔드 개발자.",
  intro:
    "**Java/Spring Boot 백엔드**: 인증, 데이터 처리, Redis, 테스트, 모니터링. ==AI 파이프라인과 백엔드 경계== 분리, 운영에서 설명 가능한 구조.",
  // 첫 화면에서 클릭 전에 보이는 핵심 근거 요약. slug는 src/data/projects.ts와 일치해야 한다.
  highlights: [
    {
      slug: "hola-climbing",
      title: "Hola Climbing",
      point:
        "Kafka 대신 **Redis Streams**로 AI 분석 파이프라인을 분리하고, cursor 조회 ==p95 9.8ms==를 측정·검증",
    },
    {
      slug: "cafe-gamsugwang",
      title: "카페감수광",
      point:
        "리뷰 **22,144건**을 임베딩·클러스터링으로 정제해 취향 기반 카페 추천 파이프라인을 구축",
    },
    {
      slug: "the-last-supper",
      title: "The Last Supper",
      point:
        "웨이팅 부하를 **Redis 큐 비동기**로 분산하고 JMeter 부하 테스트로 응답 경로를 검증",
    },
  ],
  about: [
    "요구사항 → 기능 목록 + 실패 가능성 + 운영 흐름",
    "테스트 · 문서화 · `API 계약` · 모니터링 중심의 공유 가능한 판단 기준",
    "기존 코드와 현재 제약 먼저 파악. ==작은 개선의 지속 누적==으로 안정성 강화",
  ],
  skills: [
    "Java",
    "Spring Boot",
    "Spring Security",
    "Spring Data JPA",
    "MyBatis",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Querydsl",
    "Spring Batch",
    "JUnit5",
    "Mockito",
    "Testcontainers",
    "Docker",
    "AWS",
    "Google Cloud Storage",
    "Prometheus",
    "Grafana",
    "Swagger",
  ],
  skillGroups: [
    {
      title: "Backend",
      items: ["Java", "Spring Boot", "Spring Security", "JPA", "MyBatis", "Spring Batch"],
    },
    {
      title: "AI / Data",
      items: ["Python", "FastAPI", "MediaPipe Pose", "OpenCV", "pgvector", "Elasticsearch"],
    },
    {
      title: "Infra",
      items: ["Redis", "Docker", "AWS", "Google Cloud Storage", "Prometheus", "Grafana"],
    },
    {
      title: "Test / Docs",
      items: ["JUnit5", "Mockito", "Testcontainers", "pytest", "Swagger"],
    },
  ],
  education: [
    {
      period: "2026.01 ~ 현재",
      title: "SSAFY - 삼성청년SW아카데미",
      description: "Java 트랙. 객체지향, 알고리즘, SQL, Spring Boot, CS 기초.",
    },
    {
      period: "2024.11 ~ 2025.06",
      title: "구름톤 딥다이브 - 카카오 연계 백엔드 부트캠프",
      description:
        "Java/Spring Boot 서비스 개발, 도메인 모델링, 테스트, 모니터링, 배포 흐름. 팀 프로젝트 적용.",
    },
  ],
  career: [
    {
      period: "2018.12 ~ 2024.04",
      title: "샬롬엔지니어링(주) - 하드웨어 및 소프트웨어 개발 대리",
      description:
        "철도 신호장치 개발, SIL4 인증 프로젝트, 요구사항 문서화, 테스트, 하드웨어 연동, 양산·납품까지의 신뢰성 중심 개발.",
    },
  ],
};
