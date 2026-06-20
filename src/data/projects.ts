import type { PortfolioProject } from "./types";

export const holaClimbingProject: PortfolioProject = {
  slug: "hola-climbing",
  name: "Hola Climbing",
  label: "AI Climbing SNS",
  priority: 1,
  period: "2026.05.15 ~ 2026.06.25",
  team: "2명",
  status: "active",
  summary:
    "클라이밍 영상을 업로드하면 AI가 동작 기술과 동적/정적 성향을 분석하고, SNS 피드·암장·기록·채팅 경험으로 연결하는 서비스",
  common: {
    purpose:
      "클라이머가 영상을 단순 공유하는 데서 끝나지 않고, 자신의 동작을 데이터로 되돌아보며 성장 흐름을 추적하도록 돕는다.",
    goal:
      "대용량 영상 업로드, AI 분석, 실시간 진행률, 추천 피드, 암장 데이터, 기록·통계 API를 하나의 백엔드/AI 파이프라인으로 연결한다.",
    developmentIssue:
      "영상 파일은 수십~수백 MB라 애플리케이션 서버를 경유하면 WAS 대역폭과 스레드가 포화될 수 있고, AI 분석은 긴 작업이라 요청/응답 흐름과 분리해야 했다.",
    results: [
      "GCS v4 Signed URL로 영상 바이너리 업로드를 백엔드에서 분리했다.",
      "Redis Streams + Pub/Sub + SSE로 AI 분석 요청, 진행률, 결과 저장 흐름을 분리했다.",
      "Spring Boot 서버와 Python AI 워커 간 callback 계약을 정리하고 E2E smoke를 검증했다.",
      "추천 피드 성능 테스트에서 snapshot cursor cache와 public thumbnail URL 전환으로 cursor page p95 약 9.8ms 수준의 증거를 확보했다.",
    ],
  },
  role: {
    title: "Backend & AI pipeline",
    contribution:
      "Spring Boot 백엔드와 Python AI 워커 파이프라인을 단독 담당했다. 프론트엔드는 팀원이 맡았고, 백엔드 API 계약과 AI 워커 입출력 계약 정합을 책임졌다.",
    implementedFeatures: [
      "회원·인증·OAuth·JWT·약관·프로필 API",
      "영상 메타데이터, GCS Signed URL, 댓글, 좋아요 API",
      "암장 검색, 난이도, 리뷰, 즐겨찾기, 운영상태 API",
      "Redis Streams 기반 AI 분석 dispatch와 SSE 진행률",
      "AI worker callback 결과 저장, 분석 피드백, 재시도",
      "WebSocket STOMP 암장별 채팅과 GPS 암장 인증",
      "pgvector + 팔로잉 boost 기반 추천 피드와 snapshot cursor",
      "Flyway, Testcontainers, Swagger/ErrorCode 문서화",
    ],
    achievements: [
      "Spring REST/STOMP 100개 이상 API와 AI worker health/readiness 계약을 코드 기준으로 정리했다.",
      "PostgreSQL·Redis·GCS·AI worker가 연결된 분석 E2E 흐름을 검증했다.",
      "추천 피드 성능 evidence를 raw 결과와 presentation 이미지로 분리해 포트폴리오용 근거를 만들었다.",
    ],
  },
  tech: [
    { name: "Java 25", category: "backend", reason: "Spring Boot 4 기반 백엔드 런타임과 최신 Java API를 맞춰 사용했다." },
    {
      name: "Spring Boot 4",
      category: "backend",
      reason: "회원·영상·암장·채팅·분석 callback 등 인증/권한이 필요한 API를 일관된 방식으로 구현하기 위해 사용했다.",
    },
    {
      name: "Spring Security 7 + JWT",
      category: "backend",
      reason: "모바일/웹 클라이언트 인증, 토큰 재발급, 로그아웃 블랙리스트를 처리하기 위해 사용했다.",
    },
    {
      name: "MyBatis 4",
      category: "data",
      reason: "pgvector 추천, 통계, 집계성 조회처럼 SQL 제어가 중요한 워크로드가 많아 JPA보다 명시적 SQL을 선택했다.",
    },
    {
      name: "PostgreSQL + pgvector",
      category: "data",
      reason: "관계형 도메인과 스타일 임베딩 기반 추천을 같은 저장소에서 다루기 위해 사용했다.",
    },
    {
      name: "Redis Streams",
      category: "infra",
      reason: "이미 Redis를 사용하고 있어 Kafka를 추가하지 않고 AI 작업 큐를 구성했다.",
    },
    {
      name: "Redis Pub/Sub + SSE",
      category: "infra",
      reason: "분석 진행률은 서버에서 클라이언트로 가는 단방향 이벤트라 WebSocket 대신 SSE로 단순화했다.",
    },
    {
      name: "Google Cloud Storage Signed URL",
      category: "infra",
      reason: "대용량 영상 바이너리가 WAS를 거치지 않게 해 서버 부하를 줄였다.",
    },
    {
      name: "Python 3.11 + FastAPI",
      category: "ai",
      reason: "AI worker의 health/readiness와 장기 실행 stream consumer를 구성하기 위해 사용했다.",
    },
    {
      name: "MediaPipe Pose",
      category: "ai",
      reason: "클라이밍 영상에서 33개 pose keypoint를 추출해 규칙 기반 기술 판정의 입력으로 사용했다.",
    },
    {
      name: "OpenCV + Optical Flow",
      category: "ai",
      reason: "dynamic/static 영상 단위 보정을 위한 flow feature를 추출했다.",
    },
    {
      name: "RandomForest flow gate",
      category: "ai",
      reason: "규칙 기반 segment 결과의 약한 dynamic 오탐을 영상 단위 prior로 보정하기 위해 사용했다.",
    },
    {
      name: "JUnit 5 + Testcontainers",
      category: "test",
      reason: "PostgreSQL/Redis까지 실제 컨테이너로 띄워 통합 테스트 재현성을 확보했다.",
    },
    {
      name: "pytest + ruff + mypy",
      category: "test",
      reason: "Python AI worker의 계약, Redis bus, callback, vision 유틸을 검증하기 위해 사용했다.",
    },
  ],
  decisions: [
    {
      title: "GCS Signed URL 직접 업로드",
      decision: "백엔드는 업로드 URL과 메타데이터만 다루고 영상 바이너리는 클라이언트가 GCS에 직접 PUT한다.",
      reason: "영상이 수십~수백 MB라 WAS 대역폭과 스레드가 영상 트래픽에 묶이는 것을 피해야 했다.",
      alternatives: ["백엔드 multipart proxy", "업로드 전담 서비스 분리"],
      tradeOff:
        "서버 부하는 줄지만 GCS CORS, 만료 시간, object path 검증, 업로드 완료 후 메타데이터 정합을 신경 써야 한다.",
      verification: "GCS Signed URL double slash 회귀 테스트와 운영 upload path 검증을 수행한다.",
      ownership: "direct",
    },
    {
      title: "Redis Streams 기반 AI dispatch",
      decision: "Kafka를 새로 도입하지 않고 Redis Streams로 AI 분석 작업 큐를 구성한다.",
      reason: "JWT 블랙리스트와 진행 버스에 Redis가 이미 필요했고, 1인 운영 부담상 신규 인프라를 줄이는 편이 맞았다.",
      alternatives: ["Kafka", "RabbitMQ", "HTTP direct call"],
      tradeOff: "운영 단순성은 얻지만 Kafka 수준의 생태계와 장기 보관/관측성은 약하다.",
      verification: "Spring -> Redis Stream -> AI worker -> Spring callback -> SSE E2E smoke를 통과시킨다.",
      ownership: "direct",
    },
    {
      title: "MyBatis over JPA",
      decision: "ORM 영속성 컨텍스트보다 SQL 제어가 중요한 도메인이라 MyBatis를 선택한다.",
      reason: "추천, 통계, 차단, cursor pagination, pgvector 거리 정렬처럼 native SQL이 핵심인 API가 많았다.",
      alternatives: ["Spring Data JPA", "JPA + native query 혼용"],
      tradeOff: "SQL 명시성과 성능 제어는 좋아지지만 반복 mapping 코드와 mapper 테스트 부담이 생긴다.",
      verification: "Mapper/Integration 테스트와 SQL explain evidence로 주요 조회 성능을 확인한다.",
      ownership: "direct",
    },
  ],
  problems: [
    {
      title: "추천 피드 tail latency와 signed URL 병목",
      problem: "추천 피드 성능 테스트에서 SQL 병목을 줄인 뒤에도 API p95가 목표보다 높게 남았다.",
      approach: "k6, SQL explain, presentation evidence를 분리해 DB와 API 레이어를 따로 해석했다.",
      cause: "추천 피드 응답마다 streamUrl과 thumbnailUrl signed URL을 반복 생성하는 비용이 컸다.",
      solution:
        "추천 피드에서는 streamUrl을 제거하고, 썸네일은 public GCS bucket URL로 제공했다. cursor page는 Redis snapshot으로 ranking SQL 재계산을 피했다.",
      result:
        "baseline 대비 current p95와 cursor page p95가 개선되었고, cursor aggregate p95는 약 9.8ms 수준으로 측정되었다.",
    },
    {
      title: "AI worker callback 계약 정합",
      problem: "Spring과 Python 워커가 분석 결과 shape, snake_case/camelCase, dynamic/static 필드를 다르게 이해할 위험이 있었다.",
      approach: "Spring API 명세를 SSOT로 두고 워커 DTO와 callback body를 맞췄다.",
      cause: "두 런타임이 같은 도메인 결과를 서로 다른 타입 시스템과 naming convention으로 다뤘다.",
      solution:
        "top-level techniques, is_dynamic, dynamic_probability를 callback payload에 명시하고 Notion/API 명세와 테스트를 갱신했다.",
      result: "Spring targeted tests, AI pytest subset, local E2E에서 callback 저장과 조회 응답 정합을 검증했다.",
    },
  ],
  ai: {
    model: "rule_v3 + flow_rf_v2",
    inputData: "GCS에 업로드된 클라이밍 영상과 MediaPipe Pose keypoint sequence",
    outputData: "techniques, isDynamic, dynamicProbability, segment start/end/confidence",
    preprocessing: [
      "GCS object 다운로드",
      "OpenCV frame sampling",
      "MediaPipe Pose 33 keypoint 추출",
      "segment 분리",
      "optical flow 기반 영상 단위 dynamic/static feature 추출",
    ],
    dataCharacteristics: [
      "클라이밍 영상은 촬영 각도, 루트, 동작 속도 차이가 크다.",
      "정적 자세에서도 keypoint jitter가 발생해 coordination false positive가 생길 수 있다.",
      "동작 라벨은 하이스텝, 플래깅, 훅, 락오프, 다이노, 코디네이션 중심으로 관리한다.",
    ],
    selectedModelReason:
      "Frozen video encoder 실험은 기준을 넘지 못했고 새 오답 비용이 컸다. MVP에서는 설명 가능하고 디버깅 가능한 규칙 기반 판정에 flow RF 보정을 붙이는 방식이 더 현실적이었다.",
    resultDrivenImprovements: [
      "coordination one-hit false positive를 active frame ratio와 same-frame 동시 이동 조건으로 줄였다.",
      "flagging/hook 오탐을 rule_v3로 조정했다.",
      "flow RF는 dynamic/static 영상 단위 prior로 약한 dynamic segment만 보정하도록 제한했다.",
    ],
  },
  metrics: [
    {
      label: "추천 피드 HTTP p95",
      before: "251.233ms",
      after: "122.642ms",
      note: "local-baseline 대비 current 측정. 같은 조건 반복 측정 결과로만 최종 문구 확정.",
    },
    {
      label: "추천 피드 SQL execution",
      before: "181.086ms",
      after: "80.966ms",
      note: "temp blocks written 9,138 -> 0.",
    },
    {
      label: "cursor aggregate p95",
      value: "9.794ms",
      note: "Redis snapshot cursor cache 적용 후 2~3페이지 호출 기준.",
    },
    {
      label: "AI worker model version",
      value: "rule_v3+flow_rf_v2",
      note: "flow gate on일 때 top-level dynamicProbability와 isDynamic을 callback.",
    },
  ],
  visuals: [
    {
      kind: "architecture",
      title: "Backend/AI Architecture",
      src: "/assets/projects/hola-climbing/architecture.svg",
      caption: "GCS direct upload, Redis Streams, AI worker, Spring callback, SSE 흐름",
      highlight: "Minjoun 담당: Spring backend, Redis dispatch, AI worker pipeline",
    },
    {
      kind: "erd",
      title: "ERD",
      src: "/assets/projects/hola-climbing/erd.png",
      caption: "회원, 영상, 암장, 분석, 추천, 기록 도메인 관계",
    },
    {
      kind: "ai-chart",
      title: "AI Flow Sample",
      src: "/assets/projects/hola-climbing/ai-flow-sample.png",
      caption: "Optical flow 기반 dynamic/static feature 시각 자료",
    },
    {
      kind: "performance",
      title: "Recommendation Performance Summary",
      src: "/assets/projects/hola-climbing/performance/01-after-summary-card.png",
      caption: "추천 피드 성능 테스트 요약",
    },
    {
      kind: "performance",
      title: "Cursor Cache Comparison",
      src: "/assets/projects/hola-climbing/performance/06-after-cursor-cache-comparison.png",
      caption: "snapshot 이후 cursor page 성능 비교",
    },
  ],
  retrospective: {
    learned: [
      "백엔드와 AI worker처럼 런타임이 다른 시스템은 메시지 큐와 결과 callback을 분리해야 안정적이다.",
      "큰 바이너리는 애플리케이션 서버를 우회시키는 설계가 운영 부담을 크게 줄인다.",
      "포트폴리오용 성능 주장은 raw evidence와 사람이 읽는 presentation evidence를 함께 남겨야 설득력이 생긴다.",
    ],
    regrets: [
      "Kafka와 Redis Streams를 사전에 실측 비교하지 못했다.",
      "pgvector 인덱스 전략은 데이터가 더 쌓인 뒤 결정해야 해서 아직 확정하지 못했다.",
      "멀티 노드 STOMP/SSE fan-out은 현재 단일 노드 가정 밖의 과제로 남아 있다.",
    ],
    improvements: [
      "성능 테스트는 같은 조건으로 3회 이상 반복 측정해 최종 수치로 고정한다.",
      "AI 모델은 post-MVP에서 fine-tuning 또는 재촬영 UX와 함께 재평가한다.",
      "발표용 아키텍처 도식에는 담당 영역을 명확히 하이라이트한다.",
    ],
    collaboration:
      "프론트 담당자와 API 명세, OAuth callback, 영상 업로드 완료 후 메타데이터 등록, 분석 상태 vocabulary를 맞추며 협업했다.",
  },
  star: [
    {
      title: "대용량 영상 업로드와 AI 분석 파이프라인",
      situation:
        "클라이밍 영상은 수십~수백 MB이고 AI 분석은 오래 걸리는 작업이라 단순 request/response로 처리하면 서버와 사용자 경험이 모두 흔들릴 수 있었다.",
      action:
        "GCS Signed URL로 영상 업로드를 서버에서 분리하고, Redis Streams + Pub/Sub + SSE로 분석 요청/진행률/결과 저장을 분리했다.",
      result: "서버는 메타데이터와 계약을 관리하고, 영상 바이너리와 장기 실행 AI 작업은 독립 흐름으로 처리하게 되었다.",
      learning: "운영 부담을 줄이는 설계는 기술을 더 붙이는 것보다 책임 경계를 정확히 나누는 데서 시작한다.",
    },
  ],
  links: [
    { label: "GitHub Backend", url: "https://github.com/UncleSamsun/hola-climbing-server", external: true },
    { label: "GitHub AI", url: "https://github.com/UncleSamsun/hola-climbing-ai", external: true },
  ],
};

export const cafeGamsugwangProject: PortfolioProject = {
  slug: "cafe-gamsugwang",
  name: "카페감수광",
  label: "Recommendation",
  priority: 2,
  period: "2025.05.12 ~ 2025.06.10",
  team: "5명",
  status: "completed",
  summary: "제주 카페 리뷰와 위치 데이터를 기반으로 취향에 맞는 카페를 추천하는 서비스",
  common: {
    purpose:
      "제주도 카페를 위치와 리뷰 키워드만으로 나열하지 않고, 사용자의 취향과 현재 탐색 맥락에 맞게 찾을 수 있도록 돕는다.",
    goal:
      "카카오맵 API, 웹 크롤링, 한국어 리뷰 키워드 추출, 추천 API를 연결해 지도·키워드·테마·위치 기반 탐색 흐름을 만든다.",
    developmentIssue:
      "카카오맵 API 응답량 제한과 크롤링 실패, 짧고 반복적인 한국어 리뷰 텍스트 때문에 추천에 쓸 수 있는 정제 데이터가 바로 나오지 않았다.",
    results: [
      "FastAPI 데이터 처리 서버와 Spring Boot 서비스 서버를 분리했다.",
      "제주도 검색 좌표 47,190개를 기준으로 카페 데이터를 수집했다.",
      "카페 3,950개와 리뷰 22,144개를 정리했다.",
      "80,601개 원천 키워드를 30,336개 최종 키워드로 정제했다.",
    ],
  },
  role: {
    title: "Data pipeline & recommendation backend",
    contribution:
      "데이터 수집과 추천 품질을 담당했다. FastAPI 기반 데이터 처리 서버와 Spring Boot 서비스 서버를 분리하고, 리뷰 키워드 추출 파이프라인과 실시간 작업 상태 조회 흐름을 설계했다.",
    implementedFeatures: [
      "카카오맵 기반 카페 검색과 Selenium 상세 크롤링",
      "카페 목록/상세 조회, 검색, 자동완성, 수정 제안",
      "위치 기반 추천, 키워드 기반 추천, 사용자 정보 기반 맞춤 추천",
      "Kiwi 형태소 분석, KR-SBERT 임베딩, TF-IDF 대표 키워드 선정",
      "비동기 크롤링 작업 상태 저장과 진행률 조회",
    ],
    achievements: [
      "제주 전체 수집 범위를 격자 기반으로 나눠 API 응답 제한을 보완했다.",
      "짧은 한국어 리뷰를 추천 가능한 키워드 데이터로 정제하는 흐름을 만들었다.",
      "장기 실행 크롤링 작업을 Redis 상태 저장으로 분리해 사용자 대기 흐름을 줄였다.",
    ],
  },
  tech: [
    { name: "Java 17", category: "backend", reason: "Spring Boot 서비스 서버의 표준 런타임으로 사용했다." },
    {
      name: "Spring Boot 3.4.5",
      category: "backend",
      reason: "인증, 카페, 추천, 리뷰, 북마크, 피드, 사용자 API를 서비스 서버에서 일관되게 제공하기 위해 사용했다.",
    },
    { name: "Spring Security", category: "backend", reason: "이메일 로그인과 JWT 인증 흐름을 구성하기 위해 사용했다." },
    { name: "Spring Data JPA", category: "data", reason: "카페, 리뷰, 사용자, 북마크 도메인을 관계형 모델로 관리하기 위해 사용했다." },
    { name: "MySQL", category: "data", reason: "서비스 도메인의 정형 데이터를 저장하기 위해 사용했다." },
    { name: "Redis", category: "infra", reason: "비동기 크롤링과 키워드 분석 작업의 진행 상태를 저장하기 위해 사용했다." },
    { name: "Elasticsearch", category: "data", reason: "카페 검색과 자동완성 흐름에 맞는 검색 저장소로 사용했다." },
    { name: "Spring Batch", category: "backend", reason: "수집·정제 데이터 처리 흐름을 배치 작업으로 분리하기 위해 사용했다." },
    { name: "Python 3.11 + FastAPI", category: "ai", reason: "크롤링과 키워드 분석처럼 Python 생태계가 강한 데이터 처리 API를 분리하기 위해 사용했다." },
    { name: "Selenium", category: "data", reason: "카카오맵 상세 페이지 리뷰 데이터를 수집하기 위해 사용했다." },
    { name: "KiwiPipy", category: "ai", reason: "한국어 리뷰에서 후보 키워드를 추출하기 위해 사용했다." },
    { name: "KR-SBERT", category: "ai", reason: "리뷰 키워드의 의미 유사도를 임베딩으로 비교하기 위해 사용했다." },
    { name: "TF-IDF", category: "ai", reason: "클러스터별 대표 키워드를 선정하기 위해 사용했다." },
    { name: "Docker", category: "infra", reason: "백엔드와 데이터 처리 서버 실행 환경을 재현하기 위해 사용했다." },
    { name: "AWS S3", category: "infra", reason: "이미지와 정적 자산 저장소로 사용했다." },
    { name: "Swagger", category: "docs", reason: "백엔드 API 계약을 팀원이 확인할 수 있게 문서화하기 위해 사용했다." },
    { name: "JUnit 5", category: "test", reason: "카페 도메인과 검색·추천 API 회귀를 검증하기 위해 사용했다." },
  ],
  decisions: [
    {
      title: "FastAPI와 Spring Boot 서버 분리",
      decision: "크롤링·키워드 분석은 FastAPI가 맡고, 인증·카페·추천 서비스 API는 Spring Boot가 맡는다.",
      reason: "Python NLP/크롤링 생태계를 쓰면서도 서비스 도메인과 인증은 Spring 기반으로 안정화해야 했다.",
      alternatives: ["Spring 단일 서버에서 Python 프로세스 호출", "FastAPI 단일 서버"],
      tradeOff: "런타임 경계와 API 계약 관리 비용은 생기지만, 데이터 처리와 서비스 도메인의 책임이 명확해진다.",
      verification: "크롤링 서버 단위 테스트와 Spring 도메인 테스트를 분리해 각각의 실패 범위를 확인한다.",
      ownership: "direct",
    },
    {
      title: "제주 좌표 격자 기반 수집",
      decision: "제주도를 작은 좌표 격자로 나누고 지역 단위 검색을 반복한다.",
      reason: "카카오맵 API의 단일 검색 응답량 제한 때문에 전체 카페를 한 번에 수집하기 어려웠다.",
      alternatives: ["행정동 키워드 수동 수집", "검색 결과 pagination만 사용"],
      tradeOff: "좌표 생성과 중복 제거 비용은 늘지만 누락 가능성을 줄일 수 있다.",
      verification: "수집된 카페 수, 실패 ID 재시도 결과, 중복 제거 후 개수를 기록한다.",
      ownership: "direct",
    },
    {
      title: "키워드 정제 후 추천 데이터로 사용",
      decision: "리뷰 원문을 바로 쓰지 않고 형태소 분석, 임베딩, 클러스터링, TF-IDF를 거쳐 키워드로 정제한다.",
      reason: "리뷰는 짧고 반복 표현이 많아 원문 그대로는 추천 특징으로 쓰기 어려웠다.",
      alternatives: ["리뷰 전문 임베딩만 사용", "수동 태그 입력"],
      tradeOff: "파이프라인은 복잡해지지만 사람이 이해할 수 있는 추천 근거 키워드를 만들 수 있다.",
      verification: "원천 키워드와 최종 키워드 수, 샘플 카페의 대표 키워드를 비교한다.",
      ownership: "direct",
    },
  ],
  problems: [
    {
      title: "카카오맵 API 응답량 제한 대응",
      problem: "한 번의 검색에서 받을 수 있는 결과가 제한되어 제주 전체 카페를 안정적으로 수집하기 어려웠다.",
      approach: "제주도 행정구역과 격자 좌표를 기준으로 탐색 범위를 쪼개 반복 검색했다.",
      cause: "API 검색 반경과 응답 개수 제한으로 넓은 영역 검색 결과가 누락될 수 있었다.",
      solution: "200m 격자와 GeoJSON 육지 필터링으로 검색 좌표를 만들고, 실패 ID를 별도로 모아 재시도했다.",
      result: "47,190개 좌표 탐색을 통해 카페 3,950개와 리뷰 22,144개를 수집했다.",
    },
    {
      title: "한국어 리뷰 키워드 파이프라인 설계",
      problem: "리뷰 원문은 표현이 짧고 반복어가 많아 바로 추천에 쓰기 어려웠다.",
      approach: "형태소 분석, 불용어 필터링, 임베딩, 클러스터링, 대표 키워드 선정을 단계로 나눴다.",
      cause: "카페 리뷰 특성상 감성 표현과 일반 단어가 섞여 추천 품질을 흔들 수 있었다.",
      solution: "KiwiPipy, KR-SBERT, HDBSCAN, TF-IDF를 연결해 추천 가능한 키워드 데이터로 정리했다.",
      result: "80,601개 원천 키워드를 30,336개 최종 정제 키워드로 축소했다.",
    },
  ],
  metrics: [
    { label: "카페 데이터", value: "3,950개", note: "카카오맵 API와 크롤링으로 정리한 제주 카페 수." },
    { label: "리뷰 데이터", value: "22,144개", note: "추천 키워드 추출에 사용한 리뷰 데이터 수." },
    {
      label: "키워드 정제",
      before: "80,601개",
      after: "30,336개",
      note: "원천 추출 키워드에서 최종 정제 키워드로 축소.",
    },
    { label: "검색 좌표", value: "47,190개", note: "200m 격자와 GeoJSON 육지 필터링 기반 좌표 수." },
  ],
  visuals: [],
  retrospective: {
    learned: [
      "추천 품질은 모델보다 먼저 입력 데이터 품질과 재현 가능한 수집 절차에 크게 좌우된다.",
      "장기 실행 크롤링 작업은 동기 API 흐름에서 분리해야 실패와 진행률을 다루기 쉽다.",
    ],
    regrets: [
      "크롤러 원본 저장소에 대용량 자산이 섞여 있어 Git LFS나 별도 저장소 전략을 더 일찍 정했어야 했다.",
      "추천 품질을 사용자 행동 지표로 검증하는 단계까지 연결하지 못했다.",
    ],
    improvements: [
      "크롤링 데이터셋 버전과 재수집 절차를 문서화한다.",
      "추천 결과에 대한 클릭·북마크 같은 후속 지표를 추가해 품질을 검증한다.",
    ],
    collaboration:
      "추천 API가 프론트 화면에서 어떻게 노출될지 팀원과 맞추며 키워드, 지도, 북마크 흐름의 응답 형태를 조정했다.",
  },
  star: [
    {
      title: "리뷰 데이터를 추천 가능한 키워드로 정제",
      situation: "제주 카페 리뷰는 짧고 반복 표현이 많아 원문 그대로는 추천 근거로 쓰기 어려웠다.",
      action: "형태소 분석, 불용어 필터링, 임베딩, 클러스터링, TF-IDF 선정 과정을 연결해 키워드 파이프라인을 만들었다.",
      result: "80,601개 원천 키워드를 30,336개 최종 키워드로 줄이고, 카페 추천에 쓸 수 있는 데이터 형태로 정리했다.",
      learning: "AI 추천 기능은 알고리즘 이름보다 데이터 수집·정제·검증 흐름이 먼저 탄탄해야 한다.",
    },
  ],
  links: [
    { label: "Backend GitHub", url: "https://github.com/UncleSamsun/cafe-gamsugwang-be", external: true },
    { label: "Crawler GitHub", url: "https://github.com/UncleSamsun/cafe-gamsugwang-crawling", external: true },
    { label: "Embedding GitHub", url: "https://github.com/UncleSamsun/cafe-gamsugwang-embedding", external: true },
  ],
};

export const jsonstoreProject: PortfolioProject = {
  slug: "jsonstore",
  name: "JsonStore",
  label: "E-commerce",
  priority: 3,
  period: "2025.03.31 ~ 2025.04.16",
  team: "5명",
  status: "completed",
  summary: "상품 등록부터 장바구니, 배송지, 주문, 관리자 처리까지 이어지는 커머스 MVP",
  common: {
    purpose: "고객 쇼핑 흐름과 관리자 상품·주문 처리 흐름을 하나의 커머스 MVP 안에서 검증한다.",
    goal: "고객/관리자 인증을 분리하고, 상품·장바구니·배송지·주문·알림 흐름을 끝까지 연결한다.",
    developmentIssue:
      "고객과 관리자가 같은 서비스에 존재해 인증 필터, 권한, 장바구니 캐싱, 주문 재고 동시성 경계가 흐려질 수 있었다.",
    results: [
      "팀 프로젝트의 고객/관리자 인증 분리 구조를 분석하고, 본인 담당 API는 JWT 인증 주체 기준으로 정리했다.",
      "Redis 기반 장바구니 캐싱 흐름을 구성했다.",
      "Firebase Cloud Messaging 기반 웹 알림을 구현했다.",
      "주문·재고 동시성 테스트와 JUnit/Mockito 테스트를 보강했다.",
    ],
  },
  role: {
    title: "Cart, notification & test coverage",
    contribution:
      "장바구니 캐싱, 웹 알림, 테스트 코드를 담당했다. 고객 쇼핑 흐름과 관리자 주문 처리 흐름이 끊기지 않도록 API 계약과 도메인 책임을 정리했다.",
    implementedFeatures: [
      "장바구니 추가/조회/삭제",
      "FCM 토큰 등록과 웹 알림 발송",
      "JWT 인증 주체 기준 장바구니·알림 API 정리",
      "주문·재고 동시성 테스트",
      "고객/관리자 권한 경계 테스트",
    ],
    achievements: [
      "장바구니를 Redis 저장소로 분리해 반복 조회·수정 흐름을 가볍게 만들었다.",
      "요청 파라미터가 아니라 JWT 인증 주체 기준으로 사용자 API가 동작하도록 정리했다.",
      "주문과 재고 차감 흐름의 동시성 위험을 테스트로 드러냈다.",
    ],
  },
  tech: [
    { name: "Java 21", category: "backend", reason: "커머스 MVP 백엔드의 Spring Boot 런타임으로 사용했다." },
    { name: "Spring Boot 3.4.4", category: "backend", reason: "커머스 도메인 API를 빠르게 구성하고 계층별 테스트를 붙이기 위해 사용했다." },
    { name: "Spring Security + JWT", category: "backend", reason: "고객과 관리자 인증 필터를 분리하기 위해 사용했다." },
    { name: "Spring Data JPA", category: "data", reason: "상품, 주문, 배송지, 회원 도메인의 관계형 모델을 관리하기 위해 사용했다." },
    { name: "Querydsl", category: "data", reason: "상품 검색과 조건 조회를 타입 안정적으로 확장하기 위해 사용했다." },
    { name: "MySQL", category: "data", reason: "커머스 주문과 상품 데이터를 저장하기 위해 사용했다." },
    { name: "H2", category: "test", reason: "로컬 테스트에서 빠르게 도메인 계층을 검증하기 위해 사용했다." },
    { name: "Redis", category: "infra", reason: "장바구니 캐싱과 주문 만료 대기 자원으로 사용했다." },
    { name: "Firebase Admin SDK", category: "infra", reason: "웹 알림 토큰 등록과 발송을 처리하기 위해 사용했다." },
    { name: "AWS S3 SDK", category: "infra", reason: "상품 이미지 업로드 저장소 연동을 위해 사용했다." },
    { name: "Docker Compose", category: "infra", reason: "서비스 실행 환경과 외부 의존성을 묶어 재현하기 위해 사용했다." },
    { name: "Swagger", category: "docs", reason: "고객/관리자 API를 팀원이 확인할 수 있게 문서화하기 위해 사용했다." },
    { name: "JUnit 5 + Mockito", category: "test", reason: "장바구니, 알림, 주문, 인증 기능의 회귀를 검증하기 위해 사용했다." },
    { name: "Spring Security Test", category: "test", reason: "권한별 API 접근과 인증 주체 기반 동작을 검증하기 위해 사용했다." },
  ],
  decisions: [
    {
      title: "Redis 기반 장바구니 캐싱",
      decision: "사용자별 장바구니 상태를 Redis에 저장하고 서비스 계층에서 추가·조회·삭제 흐름을 일관되게 다룬다.",
      reason: "장바구니는 상품 탐색 중 반복 조회·수정되는 데이터라 DB만 거치면 응답 흐름이 무거워질 수 있었다.",
      alternatives: ["DB 테이블 단독 저장", "클라이언트 local state 중심 처리"],
      tradeOff: "Redis 키 스키마와 만료 정책을 관리해야 하지만 반복 조회와 수정 응답을 가볍게 만들 수 있다.",
      verification: "장바구니 추가/조회/삭제 서비스 테스트와 인증 사용자 기준 API 테스트로 확인한다.",
      ownership: "direct",
    },
    {
      title: "JWT principal 기반 장바구니·알림 API",
      decision: "장바구니와 알림 API는 요청 body의 회원 식별자보다 JWT 인증 주체를 기준으로 동작하게 한다.",
      reason: "클라이언트가 넘긴 식별자와 실제 인증 사용자가 어긋나면 다른 사용자의 장바구니나 알림에 접근할 위험이 있었다.",
      alternatives: ["요청 body memberId 사용", "path variable memberId 사용"],
      tradeOff: "테스트에서 인증 컨텍스트를 구성해야 하지만 API 입력이 단순해지고 권한 경계가 명확해진다.",
      verification: "Spring Security Test로 인증 사용자 기준 장바구니·알림 동작과 실패 케이스를 검증한다.",
      ownership: "direct",
    },
    {
      title: "FCM 알림과 테스트 보강",
      decision: "FCM 토큰 등록과 알림 발송 실패 흐름을 테스트 대상에 포함한다.",
      reason: "웹 알림은 외부 서비스와 연결되므로 토큰 저장, 발송 요청, 실패 예외를 분리해서 다뤄야 했다.",
      alternatives: ["알림 기능 제외", "발송 실패를 로깅만 하고 테스트하지 않음"],
      tradeOff: "외부 SDK 추상화와 테스트 setup 비용은 늘지만 알림 기능의 회귀를 줄일 수 있다.",
      verification: "FCM 토큰 등록과 알림 발송 실패 예외 테스트로 확인한다.",
      ownership: "direct",
    },
  ],
  problems: [
    {
      title: "JWT 기준 장바구니·알림 API 정리",
      problem: "요청값의 회원 식별자에 의존하면 인증 주체와 요청 데이터가 어긋날 수 있었다.",
      approach: "API 입력에서 사용자 식별 책임을 줄이고 JWT의 memberUid를 기준으로 서비스 계층을 정리했다.",
      cause: "초기 구현은 화면에서 넘긴 값과 인증 컨텍스트가 동시에 존재해 권한 경계가 흐려질 수 있었다.",
      solution: "장바구니와 알림 기능에서 현재 로그인 사용자를 인증 객체에서 가져오도록 수정했다.",
      result: "클라이언트가 임의 식별자를 넘기지 않아도 현재 로그인 사용자 기준으로 동작하게 되었다.",
    },
    {
      title: "주문·재고 동시성 검증",
      problem: "동시에 같은 상품을 구매할 때 재고가 잘못 차감될 수 있는 위험이 있었다.",
      approach: "상품 재고 처리 책임을 분리하고 동시성 테스트로 주문 생성 흐름을 재현했다.",
      cause: "주문 생성과 재고 차감이 함께 움직여야 하는데 동시 요청에서 경계가 약해질 수 있었다.",
      solution: "재고 처리 서비스를 분리하고 주문 생성 테스트에서 동시 요청 케이스를 검증했다.",
      result: "동시성 위험을 테스트 시나리오로 남겨 이후 주문 처리 수정의 회귀 기준을 만들었다.",
    },
  ],
  metrics: [
    { label: "권한 필터", value: "2개", note: "프로젝트 구조 분석 기준 Member/Admin JWT 필터와 Provider가 분리되어 있었다." },
    { label: "주문 만료 정책", value: "15분", note: "프로젝트 설정 분석 기준 대기 주문 재고 점유 제한 정책." },
    { label: "테스트 검증", value: "당시 Gradle test suite 통과", note: "기존 포트폴리오 기록의 검증 항목이며 전체 품질 보증률을 뜻하지 않는다." },
  ],
  visuals: [],
  retrospective: {
    learned: [
      "커머스에서는 인증 주체, 주문 상태, 재고 차감의 경계가 API 형태보다 중요하다.",
      "관리자와 고객이 같은 서비스에 있으면 필터 수준에서 역할을 분리하는 편이 디버깅하기 쉽다.",
    ],
    regrets: [
      "주문·재고 동시성 테스트를 더 다양한 상품 조합과 실패 케이스까지 넓히지 못했다.",
      "S3와 Firebase 운영 키 관리 절차를 문서로 충분히 남기지 못했다.",
    ],
    improvements: [
      "주문 상태 전이와 재고 차감 정책을 별도 문서로 고정한다.",
      "Firebase/S3 키 로테이션과 권한 정책을 운영 체크리스트로 만든다.",
    ],
    collaboration:
      "고객 화면과 관리자 화면이 같은 API 서버를 바라보는 구조라, 팀원과 권한별 응답과 에러 케이스를 맞추며 진행했다.",
  },
  star: [
    {
      title: "장바구니 API를 인증 주체 기준으로 정리",
      situation: "장바구니와 알림 API가 요청값의 회원 식별자에 의존하면 다른 사용자 데이터 접근 위험이 있었다.",
      action: "JWT에서 현재 사용자를 가져오도록 서비스 경계를 바꾸고, Spring Security Test로 인증 케이스를 보강했다.",
      result: "클라이언트가 사용자 ID를 직접 넘기지 않아도 현재 로그인 사용자 기준으로 장바구니와 알림이 처리됐다.",
      learning: "인증된 서비스에서는 편한 파라미터보다 인증 컨텍스트를 기준으로 도메인 책임을 잡는 편이 안전하다.",
    },
  ],
  links: [
    { label: "Backend GitHub", url: "https://github.com/UncleSamsun/json-store-be", external: true },
    { label: "Frontend GitHub", url: "https://github.com/UncleSamsun/json-store-fe", external: true },
  ],
};

export const readAndShareProject: PortfolioProject = {
  slug: "readandshare",
  name: "ReadAndShare",
  label: "Community",
  priority: 4,
  period: "2025.03.13 ~ 2025.03.31",
  team: "4명",
  status: "completed",
  summary: "독서 기록 공유 서비스의 인증, 검색, 탈퇴 기능을 확장한 커뮤니티 백엔드",
  common: {
    purpose: "독서 기록과 리뷰를 공유하는 커뮤니티에서 회원, 리뷰, 팔로우, 알림 흐름을 안정적으로 운영한다.",
    goal: "기존 백엔드에 이메일 인증, 사용자 검색, 회원 탈퇴, 테스트와 Swagger 문서화를 보강한다.",
    developmentIssue:
      "짧은 기간 안에 기존 코드를 이어받아 기능을 확장해야 했고, 인증·회원·리뷰 도메인의 예외 흐름을 함께 검증해야 했다.",
    results: [
      "이메일 인증, 사용자 검색, 회원 탈퇴 기능을 구현했다.",
      "Auth, Book, Favorite, Review, Member 도메인 테스트를 보강했다.",
      "Swagger 기반 API 문서화를 추가해 협업 정합을 높였다.",
    ],
  },
  role: {
    title: "Member domain & regression tests",
    contribution:
      "이메일 인증, 사용자 검색, 회원 탈퇴 기능을 구현하고 주요 기능 테스트를 작성했다. 기능 추가 과정에서 발생할 수 있는 예외와 실패 흐름을 테스트로 검증하는 데 집중했다.",
    implementedFeatures: [
      "회원가입과 이메일 인증 토큰 발급·검증",
      "이메일 기반 사용자 검색",
      "회원 정보 수정과 탈퇴",
      "도서/리뷰/즐겨찾기 도메인 테스트 보강",
      "Swagger 기반 API 문서화",
    ],
    achievements: [
      "member 도메인 전반을 직접 구현하며 인증·회원 생명주기를 정리했다.",
      "PR 단위로 테스트를 추가해 기존 기능 회귀를 줄였다.",
      "팀원이 이어서 볼 수 있도록 문서화와 테스트를 함께 남겼다.",
    ],
  },
  tech: [
    { name: "Java 17", category: "backend", reason: "독서 SNS 백엔드의 Spring Boot 런타임으로 사용했다." },
    { name: "Spring Boot 3.3.7", category: "backend", reason: "독서 SNS 도메인 API를 구성하기 위해 사용했다." },
    { name: "Spring Security + JWT", category: "backend", reason: "로그인, 토큰 재발급, 인증 사용자 접근 제어를 처리하기 위해 사용했다." },
    { name: "Spring Data JPA", category: "data", reason: "회원, 도서, 리뷰, 팔로우, 알림 도메인을 관계형 모델로 관리하기 위해 사용했다." },
    { name: "H2", category: "test", reason: "로컬 테스트에서 도메인 동작을 빠르게 검증하기 위해 사용했다." },
    { name: "Redis", category: "infra", reason: "인증·피드·알림 관련 상태 저장소로 사용했다." },
    { name: "Spring Events", category: "backend", reason: "팀원이 구현한 알림 이벤트 구조를 분석하고 테스트 경계를 이해하는 데 사용된 프로젝트 기술이다." },
    { name: "FCM", category: "infra", reason: "알림 푸시 전송을 위해 사용했다." },
    { name: "Prometheus + Micrometer", category: "infra", reason: "서비스 관측 지표를 노출하기 위해 사용했다." },
    { name: "Swagger", category: "docs", reason: "프론트엔드와 백엔드 API 계약을 맞추기 위해 사용했다." },
    { name: "JUnit 5 + Mockito", category: "test", reason: "회원, 인증, 도서, 리뷰 기능의 회귀를 검증하기 위해 사용했다." },
    { name: "GitHub Actions + SonarCloud", category: "test", reason: "CI와 정적 분석 기반으로 변경 품질을 확인하기 위해 사용했다." },
  ],
  decisions: [
    {
      title: "이메일 인증을 회원가입 흐름에서 분리",
      decision: "회원가입 이후 이메일 인증 토큰을 발급하고 인증 상태 갱신을 별도 흐름으로 둔다.",
      reason: "회원가입 직후 실제 이메일 소유 여부를 확인하지 않으면 잘못된 계정이 활성화될 수 있었다.",
      alternatives: ["가입 즉시 활성화", "관리자 수동 승인", "소셜 로그인만 허용"],
      tradeOff: "인증 토큰과 메일 발송 실패 처리가 추가되지만 계정 신뢰도를 높일 수 있다.",
      verification: "EmailServiceTest와 MemberApiControllerTest에서 인증 성공·실패 케이스를 검증한다.",
      ownership: "direct",
    },
    {
      title: "BCrypt 기반 비밀번호 처리",
      decision: "회원 비밀번호는 평문 저장 없이 BCrypt 해시로 저장하고 인증 흐름에서 검증한다.",
      reason: "회원 도메인에서 가장 기본적인 보안 경계인 비밀번호 저장 방식을 코드로 보장해야 했다.",
      alternatives: ["평문 저장", "단순 SHA 해시", "외부 인증 서비스 위임"],
      tradeOff: "해시 비용과 테스트 setup이 생기지만 비밀번호 유출 위험을 크게 낮춘다.",
      verification: "회원가입·로그인 테스트에서 해시 저장과 인증 성공/실패를 확인한다.",
      ownership: "direct",
    },
    {
      title: "회원 생명주기 회귀 테스트 보강",
      decision: "회원 검색, 정보 수정, 탈퇴, 이메일 인증처럼 상태가 바뀌는 기능을 서비스와 컨트롤러 테스트로 고정한다.",
      reason: "짧은 기간에 기존 코드를 확장하면서 회원 상태 변화가 다른 API에 회귀를 만들 수 있었다.",
      alternatives: ["수동 QA 중심 확인", "컨트롤러 테스트만 작성"],
      tradeOff: "테스트 작성 시간이 늘지만 기능 추가 후 회귀를 빠르게 확인할 수 있다.",
      verification: "MemberServiceTest와 MemberApiControllerTest로 정상·예외 흐름을 확인한다.",
      ownership: "direct",
    },
  ],
  problems: [
    {
      title: "이메일 인증 흐름 구현",
      problem: "회원가입 직후 바로 서비스를 이용하게 두면 실제 이메일 소유 여부를 확인하기 어려웠다.",
      approach: "EmailToken 엔티티와 저장소, EmailService를 추가해 인증 토큰 발급과 상태 갱신 흐름을 만들었다.",
      cause: "기존 회원가입 흐름에는 이메일 소유 검증 단계가 충분히 분리되어 있지 않았다.",
      solution: "메일 발송 실패, 인증 실패, 토큰 검증 성공 케이스를 테스트와 함께 구현했다.",
      result: "회원가입 이후 이메일 인증 상태를 서비스 정책으로 다룰 수 있게 되었다.",
    },
    {
      title: "사용자 검색·탈퇴 기능",
      problem: "사용자 검색과 탈퇴는 인증 상태, 중복 이메일, 삭제 상태와 맞물려 예외가 생기기 쉬웠다.",
      approach: "이메일 기반 검색과 탈퇴 흐름을 서비스 계층에 분리하고 테스트 케이스를 보강했다.",
      cause: "회원 생명주기와 검색 API가 같은 회원 데이터를 다루지만 실패 조건이 달랐다.",
      solution: "탈퇴 후 조회·인증 흐름에 영향을 주지 않도록 예외와 테스트를 정리했다.",
      result: "회원 도메인 기능 추가 이후에도 주요 회귀를 자동 테스트로 확인할 수 있게 되었다.",
    },
  ],
  metrics: [
    { label: "본인 직접 PR", value: "8건", note: "member 도메인 전반과 테스트 보강 중심 PR." },
    { label: "테스트 검증", value: "당시 Java 17 로컬 test suite 통과", note: "기존 포트폴리오 기록 기준이며 전체 품질 보증률을 뜻하지 않는다." },
    { label: "Graphify 노드", value: "1,030개", note: "vault Graphify readandshare AST-only 보고서 기준." },
  ],
  visuals: [],
  retrospective: {
    learned: [
      "기존 코드에 기능을 추가할 때는 먼저 실패 흐름을 테스트로 고정해야 안전하다.",
      "Swagger 문서화는 단순 산출물이 아니라 프론트엔드와 백엔드가 같은 계약을 보는 도구다.",
    ],
    regrets: [
      "Redis가 필요한 Feed/FCM 통합 테스트 실행 조건을 더 일찍 분리하지 못했다.",
      "인증·인프라 논의에서 비전공자로서 부족했던 기본기를 더 빠르게 보완했어야 했다.",
    ],
    improvements: [
      "외부 API 키와 FCM 키 로테이션 절차를 별도 운영 문서로 남긴다.",
      "도메인별 테스트 범위와 실행 조건을 README에 더 명확히 기록한다.",
    ],
    collaboration:
      "짧은 팀 프로젝트라 Git Flow와 Swagger, 테스트 결과를 기준으로 변경 내용을 공유하고 다음 작업자가 이어받기 쉽게 정리했다.",
  },
  star: [
    {
      title: "이메일 인증과 회원 도메인 테스트 보강",
      situation: "기존 독서 SNS에 이메일 인증과 회원 탈퇴를 추가해야 했지만, 회원 상태 변화가 여러 API에 영향을 줄 수 있었다.",
      action: "EmailToken, EmailService, MemberService 테스트를 추가하고 인증 성공·실패·탈퇴 후 흐름을 나눠 구현했다.",
      result: "회원 도메인 기능을 확장하면서도 주요 실패 케이스를 회귀 테스트로 남길 수 있었다.",
      learning: "기존 코드 확장은 새 기능 구현보다 회귀 가능성을 먼저 찾는 태도가 중요하다.",
    },
  ],
  links: [{ label: "GitHub", url: "https://github.com/UncleSamsun/read-and-share", external: true }],
};

export const theLastSupperProject: PortfolioProject = {
  slug: "the-last-supper",
  name: "The Last Supper",
  label: "Waiting & Reservation",
  priority: 5,
  period: "2025.04.17 ~ 2025.05.09",
  team: "5명",
  status: "completed",
  summary: "식당 예약과 현장 웨이팅을 함께 관리하는 백엔드 서비스",
  common: {
    purpose: "식당 이용자가 예약 또는 현장 웨이팅으로 방문을 신청하고, 운영자가 대기열과 예약 슬롯을 관리하도록 돕는다.",
    goal: "예약 슬롯, 웨이팅 큐, 고객 호출, 이력 처리, 모니터링을 하나의 운영 흐름으로 연결한다.",
    developmentIssue:
      "웨이팅 등록 요청이 몰릴 때 대기번호 중복, DB 저장 병목, 실패 요청 복구, 운영 종료 후 이력 처리 문제가 함께 발생할 수 있었다.",
    results: [
      "JMeter 부하 테스트로 웨이팅 등록 병목을 확인했다.",
      "Redis Atomic 연산으로 중복 진입과 대기번호 발급 문제를 단순화했다.",
      "Spring 비동기 처리로 응답 경로와 DB 저장 경로를 분리했다.",
      "Prometheus/Grafana와 Spring Batch 기반 운영 흐름을 구성했다.",
    ],
  },
  role: {
    title: "Waiting queue backend",
    contribution:
      "웨이팅 파트를 담당했다. 부하 테스트와 단위 테스트로 병목과 동시성 문제를 발견하고, DB Lock과 분산락을 비교한 뒤 Redis Atomic 연산 기반 해결책을 적용했다.",
    implementedFeatures: [
      "웨이팅 오픈/중단/종료",
      "고객 웨이팅 등록/취소/미루기",
      "내 대기 순번 조회와 다음 고객 호출",
      "Redis 기반 웨이팅 큐와 pending key",
      "실패 요청 dead-letter 큐",
      "Spring Batch 기반 웨이팅 이력 처리",
      "JMeter 부하 테스트와 Prometheus/Grafana 모니터링",
    ],
    achievements: [
      "동시 요청에서 대기번호 중복 가능성을 테스트로 드러냈다.",
      "DB Lock과 분산락을 비교한 뒤 Redis SETNX/INCR로 단순한 해결책을 선택했다.",
      "응답 경로에서 DB 저장을 분리해 웨이팅 등록 체감 성능을 개선했다.",
    ],
  },
  tech: [
    { name: "Java 17", category: "backend", reason: "예약·웨이팅 백엔드의 Spring Boot 런타임으로 사용했다." },
    { name: "Spring Boot 3.4.4", category: "backend", reason: "예약·웨이팅 API와 운영 모니터링을 구성하기 위해 사용했다." },
    { name: "Spring Security + JWT", category: "backend", reason: "고객과 운영자 인증을 처리하기 위해 사용했다." },
    { name: "Spring Data JPA", category: "data", reason: "예약, 매장, 계정, 웨이팅 이력을 관계형 모델로 관리하기 위해 사용했다." },
    { name: "MySQL 8", category: "data", reason: "예약과 웨이팅 이력의 영속 저장소로 사용했다." },
    { name: "Redis 7", category: "infra", reason: "웨이팅 큐, pending key, 대기번호 발급을 빠르게 처리하기 위해 사용했다." },
    { name: "Spring Batch", category: "backend", reason: "운영 종료 후 웨이팅 이력 처리를 자동화하기 위해 사용했다." },
    { name: "WebSocket", category: "backend", reason: "웨이팅 상태 변화를 실시간으로 전달하기 위한 통신 경로로 사용했다." },
    { name: "Actuator + Micrometer", category: "infra", reason: "애플리케이션 상태와 메트릭을 노출하기 위해 사용했다." },
    { name: "Prometheus + Grafana", category: "infra", reason: "부하 테스트와 운영 지표를 시각화하기 위해 사용했다." },
    { name: "JMeter", category: "test", reason: "웨이팅 등록 부하와 병목을 재현하기 위해 사용했다." },
    { name: "JUnit 5 + Mockito", category: "test", reason: "웨이팅 서비스, Redis 서비스, 비동기 프로세서를 검증하기 위해 사용했다." },
    { name: "Gradle", category: "infra", reason: "빌드와 테스트 실행을 표준화하기 위해 사용했다." },
  ],
  decisions: [
    {
      title: "웨이팅 큐를 Redis로 관리",
      decision: "웨이팅 등록 초입과 대기번호 발급은 Redis 큐와 atomic 연산으로 처리한다.",
      reason: "동시 요청에서 DB만으로 대기번호를 안정적으로 발급하면 lock 비용과 병목이 커질 수 있었다.",
      alternatives: ["DB pessimistic lock", "분산락", "단일 DB sequence"],
      tradeOff: "Redis 키 스키마와 복구 흐름을 관리해야 하지만 요청 초입의 동시성 처리가 단순해진다.",
      verification: "웨이팅 등록 동시성 테스트와 JMeter 부하 테스트로 확인한다.",
      ownership: "direct",
    },
    {
      title: "JMeter + Prometheus + Grafana 부하 검증",
      decision: "웨이팅 등록 성능은 JMeter 시나리오와 Prometheus/Grafana 지표로 함께 본다.",
      reason: "단위 테스트만으로는 응답 시간과 병목 위치를 설명하기 어렵다.",
      alternatives: ["수동 API 반복 호출", "k6", "테스트 없음"],
      tradeOff: "테스트 자산 관리 비용은 늘지만 성능 개선 전후를 증거로 남길 수 있다.",
      verification: "Thread Group, accountIds.csv, JMeter log, 메트릭 대시보드로 결과를 확인한다.",
      ownership: "direct",
    },
    {
      title: "Spring Batch로 예약·웨이팅 생명주기 처리",
      decision: "운영 종료 후 이력 처리와 생명주기 작업은 Batch로 분리한다.",
      reason: "운영자가 수동으로 상태를 정리하면 누락과 반복 작업이 생길 수 있었다.",
      alternatives: ["수동 관리자 API", "단순 scheduler only"],
      tradeOff: "Batch Job 관리 비용은 생기지만 상태 전이를 반복 가능하게 만들 수 있다.",
      verification: "BatchMonitoringController와 job 실행 결과로 확인한다.",
      ownership: "team",
      ownershipNote: "프로젝트 구조에 포함된 운영 생명주기 결정이며, 포트폴리오에서는 웨이팅 운영 흐름과 연결해 설명한다.",
    },
  ],
  problems: [
    {
      title: "부하 테스트 기반 병목 탐지",
      problem: "웨이팅 등록 요청이 몰릴 때 DB 저장까지 동기적으로 처리하면서 응답 시간이 길어지는 구간이 생겼다.",
      approach: "2,000개 계정 데이터와 JMeter 시나리오로 요청 흐름을 재현했다.",
      cause: "API 응답 경로가 DB 저장과 강하게 결합되어 있었다.",
      solution: "API 응답 경로에서는 Redis 큐에 먼저 적재하고, 비동기 프로세서가 DB 저장을 맡도록 구조를 바꿨다.",
      result:
        "기존 포트폴리오 기록의 웨이팅 등록 부하 테스트 기준으로 Spring 비동기 처리 후 응답 시간이 크게 줄어든 것을 확인했다.",
    },
    {
      title: "웨이팅 번호 중복 동시성 문제",
      problem: "동시에 같은 고객이 웨이팅을 등록하거나 대기번호가 발급될 때 중복 접수 가능성이 있었다.",
      approach: "DB Lock, 분산락, Redis atomic 연산을 비교했다.",
      cause: "동시 요청 초입에서 같은 사용자와 같은 매장에 대한 중복 진입을 충분히 막지 못했다.",
      solution: "Redis SETNX 기반 pending key로 중복 진입을 막고 Redis INCR로 대기번호를 발급했다.",
      result: "동시성 문제를 단순한 Redis atomic 연산으로 해결하고 테스트로 회귀 기준을 남겼다.",
    },
  ],
  metrics: [
    { label: "JMeter 계정 데이터", value: "2,000개", note: "웨이팅 등록 부하 테스트용 계정 CSV 기준." },
    { label: "JMeter 로그", value: "28,661줄", note: "기존 포트폴리오 데이터의 실행 로그 규모." },
    {
      label: "응답 속도",
      before: "동기 DB 저장 경로",
      after: "Redis 큐 적재 후 비동기 DB 저장 경로",
      note: "기존 포트폴리오 기록의 max response time 개선 사례이며 전체 성능 보증 수치로 일반화하지 않는다.",
    },
    { label: "테스트 검증", value: "당시 Gradle test suite 통과", note: "기존 포트폴리오 기록 기준이며 전체 품질 보증률을 뜻하지 않는다." },
  ],
  visuals: [],
  retrospective: {
    learned: [
      "동시성 문제는 추상적인 우려보다 부하 테스트와 단위 테스트로 재현해야 해결 방향이 선명해진다.",
      "대기열은 단순 CRUD가 아니라 상태 전이, 실패 복구, 운영 종료 흐름까지 함께 설계해야 한다.",
    ],
    regrets: [
      "Redis 키 스키마와 TTL 정책을 더 명확한 문서로 남기지 못했다.",
      "JMeter 수치를 포트폴리오에서 바로 인용할 수 있도록 표준 요약으로 정리하지 못했다.",
    ],
    improvements: [
      "웨이팅 큐 키, pending key, dead-letter 큐의 생명주기를 문서화한다.",
      "부하 테스트 결과를 before/after 표와 그래프로 정리해 재현 가능하게 만든다.",
    ],
    collaboration:
      "예약과 웨이팅 도메인이 매장 운영 흐름에서 만나는 지점을 팀원과 조율하며 컨트롤러 책임을 작게 나눴다.",
  },
  star: [
    {
      title: "Redis Atomic 연산으로 웨이팅 동시성 해결",
      situation: "웨이팅 등록 요청이 동시에 들어오면 중복 접수와 대기번호 충돌 가능성이 있었다.",
      action: "DB Lock과 분산락을 비교한 뒤 Redis SETNX pending key와 INCR 대기번호 발급으로 요청 초입을 단순화했다.",
      result: "중복 진입을 막고 대기번호 발급을 원자적으로 처리했으며, JMeter와 단위 테스트로 병목과 회귀를 확인했다.",
      learning: "동시성 해결은 강한 락을 먼저 붙이는 것이 아니라, 공유 상태를 작게 만들고 atomic primitive로 제한하는 데서 시작한다.",
    },
  ],
  links: [
    { label: "Backend GitHub", url: "https://github.com/UncleSamsun/The-Last-Supper", external: true },
    { label: "Frontend GitHub", url: "https://github.com/UncleSamsun/The-Last-Supper-Front", external: true },
  ],
};

export const projects: PortfolioProject[] = [
  holaClimbingProject,
  cafeGamsugwangProject,
  jsonstoreProject,
  readAndShareProject,
  theLastSupperProject,
];
