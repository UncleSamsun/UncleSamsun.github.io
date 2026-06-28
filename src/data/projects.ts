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
    "클라이밍 영상을 업로드하면 AI가 ==동작 기술과 동적/정적 성향==을 분석하고, SNS 피드·암장·기록·채팅 경험으로 연결하는 서비스",
  recruiterSummary: {
    role: "Spring Boot 백엔드 + Python AI worker pipeline 단독 담당",
    impact: "GCS 직접 업로드, Redis Streams/SSE, snapshot cursor로 업로드·분석·추천 흐름 분리",
    proof: "cursor aggregate p95 9.794ms, Spring/AI E2E smoke, raw/presentation evidence",
  },
  common: {
    purpose: "영상 공유를 넘어 동작 데이터 회고와 성장 흐름 추적",
    goal:
      "대용량 영상 업로드 · AI 분석 · 실시간 진행률 · 추천 피드 · 암장 데이터 · 기록/통계 API 연결",
    developmentIssue:
      "수십~수백 MB 영상 파일의 WAS 대역폭·스레드 포화 위험. 장기 실행 AI 분석의 ==요청/응답 흐름 분리== 필요.",
    results: [
      "`GCS v4 Signed URL` 기반 영상 바이너리 업로드 분리",
      "`Redis Streams + Pub/Sub + SSE` 기반 AI 분석 요청·진행률·결과 저장 분리",
      "Spring Boot 서버와 Python AI 워커 간 callback 계약 정리, E2E smoke 검증",
      "snapshot cursor cache + public thumbnail URL 전환, ==cursor page p95 약 9.8ms== 증거 확보",
    ],
  },
  role: {
    title: "Backend & AI pipeline",
    contribution:
      "**Spring Boot 백엔드와 Python AI 워커 파이프라인 단독 담당**. 프론트엔드 팀원 담당, 백엔드 API 계약과 AI 워커 입출력 계약 정합 책임.",
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
      "Spring REST/STOMP API 계약 다수, AI worker health/readiness 계약 코드 기준 정리",
      "PostgreSQL·Redis·GCS·AI worker 연결 분석 E2E 흐름 검증",
      "추천 피드 성능 evidence: raw 결과 + presentation 이미지 분리, 포트폴리오용 근거 확보",
    ],
  },
  tech: [
    { name: "Java 25", category: "backend", reason: "Spring Boot 4 기반 백엔드 런타임, 최신 Java API 정합성" },
    {
      name: "Spring Boot 4",
      category: "backend",
      reason: "회원·영상·암장·채팅·분석 callback 등 인증/권한 API의 일관된 구현",
    },
    {
      name: "Spring Security 7 + JWT",
      category: "backend",
      reason: "모바일/웹 클라이언트 인증, 토큰 재발급, 로그아웃 블랙리스트 처리",
    },
    {
      name: "MyBatis 4",
      category: "data",
      reason: "pgvector 추천, 통계, 집계성 조회 등 SQL 제어 중심 워크로드",
    },
    {
      name: "PostgreSQL + pgvector",
      category: "data",
      reason: "관계형 도메인과 스타일 임베딩 기반 추천의 단일 저장소 처리",
    },
    {
      name: "Redis Streams",
      category: "infra",
      reason: "기존 Redis 활용, Kafka 추가 없이 AI 작업 큐 구성",
    },
    {
      name: "Redis Pub/Sub + SSE",
      category: "infra",
      reason: "서버 → 클라이언트 단방향 분석 진행률, WebSocket 대신 SSE 단순화",
    },
    {
      name: "Google Cloud Storage Signed URL",
      category: "infra",
      reason: "대용량 영상 바이너리의 WAS 우회, 서버 부하 감소",
    },
    {
      name: "Python 3.11 + FastAPI",
      category: "ai",
      reason: "AI worker health/readiness, 장기 실행 stream consumer 구성",
    },
    {
      name: "MediaPipe Pose",
      category: "ai",
      reason: "클라이밍 영상 33개 pose keypoint 추출, 규칙 기반 기술 판정 입력",
    },
    {
      name: "OpenCV + Optical Flow",
      category: "ai",
      reason: "dynamic/static 영상 단위 보정용 flow feature 추출",
    },
    {
      name: "RandomForest flow gate",
      category: "ai",
      reason: "규칙 기반 segment 결과의 약한 dynamic 오탐 보정, 영상 단위 prior",
    },
    {
      name: "JUnit 5 + Testcontainers",
      category: "test",
      reason: "PostgreSQL/Redis 실제 컨테이너 기반 통합 테스트 재현성",
    },
    {
      name: "pytest + ruff + mypy",
      category: "test",
      reason: "Python AI worker 계약, Redis bus, callback, vision 유틸 검증",
    },
  ],
  decisions: [
    {
      title: "GCS Signed URL 직접 업로드",
      decision: "백엔드는 업로드 URL·메타데이터만 관리. 영상 바이너리는 클라이언트의 GCS 직접 PUT.",
      reason: "수십~수백 MB 영상 트래픽으로 인한 WAS 대역폭·스레드 점유 회피",
      alternatives: ["백엔드 multipart proxy", "업로드 전담 서비스 분리"],
      tradeOff:
        "서버 부하 감소 vs GCS CORS·만료 시간·object path 검증·업로드 완료 후 메타데이터 정합 관리",
      verification: "GCS Signed URL double slash 회귀 테스트, 운영 upload path 검증",
      ownership: "direct",
    },
    {
      title: "Redis Streams 기반 AI dispatch",
      decision: "별도 메시지 브로커 신규 도입 없이 기존 Redis 기반 AI 분석 작업 큐 구성",
      reason: "JWT 블랙리스트·진행 버스용 Redis 선사용, 1인 운영 기준 신규 인프라 최소화",
      alternatives: ["Kafka/RabbitMQ 신규 도입", "HTTP direct call"],
      tradeOff: "운영 단순성 확보 vs Kafka 수준 생태계·장기 보관·관측성 약화",
      verification: "Spring -> Redis Stream -> AI worker -> Spring callback -> SSE E2E smoke",
      ownership: "direct",
    },
    {
      title: "MyBatis over JPA",
      decision: "ORM 영속성 컨텍스트보다 SQL 제어 우선. MyBatis 선택.",
      reason: "추천, 통계, 차단, cursor pagination, pgvector 거리 정렬 등 native SQL 중심 API",
      alternatives: ["Spring Data JPA", "JPA + native query 혼용"],
      tradeOff: "SQL 명시성·성능 제어 확보 vs 반복 mapping 코드·mapper 테스트 부담",
      verification: "Mapper/Integration 테스트, SQL explain evidence 기반 주요 조회 성능 확인",
      ownership: "direct",
    },
  ],
  problems: [
    {
      title: "추천 피드 tail latency와 signed URL 병목",
      problem: "SQL 병목 제거 이후에도 목표보다 높은 추천 피드 API p95",
      approach: "k6 · SQL explain · presentation evidence 분리, DB/API 레이어 별도 해석",
      cause: "추천 피드 응답마다 streamUrl·thumbnailUrl signed URL 반복 생성 비용",
      solution:
        "추천 피드 streamUrl 제거, 썸네일 public GCS bucket URL 제공. cursor page는 `Redis snapshot`으로 ranking SQL 재계산 회피.",
      result:
        "baseline 대비 current p95·cursor page p95 개선, cursor aggregate p95 ==약 9.8ms== 측정",
    },
    {
      title: "AI worker callback 계약 정합",
      problem: "Spring/Python 워커 간 분석 결과 shape, snake_case/camelCase, dynamic/static 필드 해석 차이 위험",
      approach: "Spring API 명세 SSOT, 워커 DTO와 callback body 정합",
      cause: "동일 도메인 결과의 서로 다른 타입 시스템·naming convention 처리",
      solution:
        "top-level techniques, is_dynamic, dynamic_probability callback payload 명시. Notion/API 명세와 테스트 갱신.",
      result: "Spring targeted tests, AI pytest subset, local E2E 기반 callback 저장·조회 응답 정합 검증",
    },
  ],
  ai: {
    model: "rule_v3 + flow_rf_v2",
    inputData: "GCS에 업로드된 클라이밍 영상과 `MediaPipe Pose keypoint sequence`",
    outputData: "`techniques`, `isDynamic`, `dynamicProbability`, segment start/end/confidence",
    preprocessing: [
      "GCS object 다운로드",
      "OpenCV frame sampling",
      "MediaPipe Pose 33 keypoint 추출",
      "segment 분리",
      "optical flow 기반 영상 단위 dynamic/static feature 추출",
    ],
    dataCharacteristics: [
      "촬영 각도, 루트, 동작 속도 편차가 큰 클라이밍 영상",
      "정적 자세에서도 발생하는 keypoint jitter, coordination false positive 가능성",
      "동작 라벨: 하이스텝, 플래깅, 훅, 락오프, 다이노, 코디네이션 중심",
    ],
    selectedModelReason:
      "Frozen video encoder 실험 기준 미달, 새 오답 비용 부담. MVP 기준: 설명 가능·디버깅 가능한 규칙 기반 판정 + flow RF 보정.",
    resultDrivenImprovements: [
      "coordination one-hit false positive 감소: active frame ratio + same-frame 동시 이동 조건",
      "flagging/hook 오탐 조정: rule_v3",
      "flow RF 역할 제한: dynamic/static 영상 단위 prior, 약한 dynamic segment 보정만",
    ],
  },
  metrics: [
    {
      label: "추천 피드 HTTP p95",
      before: "251.233ms",
      after: "122.642ms",
      note: "local-baseline 대비 current 측정. ==같은 조건 반복 측정 결과==로만 최종 문구 확정.",
    },
    {
      label: "추천 피드 SQL execution",
      before: "181.086ms",
      after: "80.966ms",
      note: "`temp blocks written` 9,138 -> 0.",
    },
    {
      label: "cursor aggregate p95",
      value: "9.794ms",
      note: "`Redis snapshot cursor cache` 적용 후 2~3페이지 호출 기준.",
    },
    {
      label: "AI worker model version",
      value: "rule_v3+flow_rf_v2",
      note: "flow gate on일 때 top-level dynamicProbability와 isDynamic을 callback.",
    },
  ],
  visuals: [
    {
      kind: "screenshot",
      title: "App Screen Overview",
      src: "/assets/projects/hola-climbing/final/app-overview.jpg",
      caption: "마이페이지, 주변 암장 탐색, 월간 기록 화면 최종 UI",
      highlight: "영상 분석 결과를 기록·암장 탐색·월간 회고 흐름으로 연결",
    },
    {
      kind: "ai-chart",
      title: "AI Pose Analysis",
      src: "/assets/projects/hola-climbing/final/ai-pose-analysis.jpg",
      caption: "MediaPipe 33 keypoints 기반 클라이밍 자세 추출 화면",
    },
    {
      kind: "ai-chart",
      title: "Technique Classification",
      src: "/assets/projects/hola-climbing/final/technique-classification.jpg",
      caption: "프레임별 기술명과 dynamic/static 성향 분류 결과",
    },
    {
      kind: "screenshot",
      title: "Monthly Report",
      src: "/assets/projects/hola-climbing/final/monthly-report.jpg",
      caption: "월간 클라이밍 리포트: 성향 비율, 기술 빈도, 코칭 팁",
    },
    {
      kind: "screenshot",
      title: "Gym Detail",
      src: "/assets/projects/hola-climbing/final/gym-detail.jpg",
      caption: "암장 상세: 관련 영상, 운영 시간, 실시간 채팅 진입",
    },
    {
      kind: "screenshot",
      title: "Gym Exploration",
      src: "/assets/projects/hola-climbing/final/gym-exploration.jpg",
      caption: "내 주변 암장 탐색과 맞춤 추천 화면",
    },
  ],
  retrospective: {
    learned: [
      "런타임이 다른 백엔드/AI worker: 메시지 큐와 결과 callback 분리 필요",
      "대용량 바이너리: 애플리케이션 서버 우회 설계로 운영 부담 감소",
      "포트폴리오용 성능 주장: raw evidence + 사람이 읽는 presentation evidence 동시 보관",
    ],
    regrets: [
      "Kafka vs Redis Streams 사전 실측 비교 부족",
      "데이터 누적 이후 확정 가능한 pgvector 인덱스 전략",
      "단일 노드 가정 밖의 멀티 노드 STOMP/SSE fan-out 과제",
    ],
    improvements: [
      "동일 조건 3회 이상 반복 측정, 최종 성능 수치 고정",
      "post-MVP AI 모델 재평가: fine-tuning 또는 재촬영 UX",
      "발표용 아키텍처 도식의 ==담당 영역== 명확화",
    ],
    collaboration:
      "프론트 담당자와 API 명세, OAuth callback, 영상 업로드 완료 후 메타데이터 등록, 분석 상태 vocabulary 정합",
  },
  star: [
    {
      title: "대용량 영상 업로드와 AI 분석 파이프라인",
      situation:
        "수십~수백 MB 클라이밍 영상, 장기 실행 AI 분석, 단순 request/response 처리 시 서버·사용자 경험 리스크",
      action:
        "GCS Signed URL 기반 영상 업로드 분리, Redis Streams + Pub/Sub + SSE 기반 분석 요청/진행률/결과 저장 분리",
      result: "서버는 메타데이터·계약 관리, 영상 바이너리와 장기 실행 AI 작업은 독립 흐름 처리",
      learning: "운영 부담 감소의 출발점: 기술 추가보다 명확한 책임 경계",
    },
  ],
  links: [
    { label: "Live Service", url: "https://hola-climb.app", external: true },
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
  summary: "제주 카페 리뷰와 위치 데이터를 기반으로 ==취향에 맞는 카페==를 추천하는 서비스",
  recruiterSummary: {
    role: "데이터 수집·전처리·정제 파이프라인 담당",
    impact: "47,190 좌표, 3,950 카페, 22,144 리뷰, 30,336 추천 키워드 정리",
    proof: "Kakao 45개 제한 대응, 200m grid + GeoJSON, Selenium retry, KR-SBERT/TF-IDF",
  },
  common: {
    purpose: "위치·리뷰 키워드 나열을 넘어, 취향과 탐색 맥락에 맞춘 제주 카페 발견",
    goal:
      "`카카오맵 API` · 웹 크롤링 · 한국어 리뷰 키워드 추출 · 추천 API 연결. 지도·키워드·테마·위치 기반 탐색 흐름.",
    developmentIssue:
      "카카오맵 API 응답량 제한, 크롤링 실패, 짧고 반복적인 한국어 리뷰. 추천용 ==정제 데이터== 확보 난이도.",
    results: [
      "FastAPI 데이터 처리 서버와 Spring Boot 서비스 서버 분리",
      "제주도 검색 좌표 ==47,190개== 기준 카페 데이터 수집",
      "카페 ==3,950개==, 리뷰 ==22,144개== 정리",
      "80,601개 원천 키워드 → ==30,336개 최종 키워드== 정제",
    ],
  },
  role: {
    title: "Data pipeline & recommendation backend",
    contribution:
      "**데이터 수집과 추천 품질 담당**. FastAPI 데이터 처리 서버와 Spring Boot 서비스 서버 분리, 리뷰 키워드 추출 파이프라인과 실시간 작업 상태 조회 설계.",
    implementedFeatures: [
      "카카오맵 기반 카페 검색과 Selenium 상세 크롤링",
      "카페 목록/상세 조회, 검색, 자동완성, 수정 제안",
      "위치 기반 추천, 키워드 기반 추천, 사용자 정보 기반 맞춤 추천",
      "Kiwi 형태소 분석, KR-SBERT 임베딩, TF-IDF 대표 키워드 선정",
      "비동기 크롤링 작업 상태 저장과 진행률 조회",
    ],
    achievements: [
      "제주 전체 수집 범위의 격자 기반 분할, API 응답 제한 보완",
      "짧은 한국어 리뷰 → ==추천 가능한 키워드 데이터== 정제 흐름",
      "장기 실행 크롤링 작업의 Redis 상태 저장 분리, 사용자 대기 흐름 감소",
    ],
  },
  tech: [
    { name: "Java 17", category: "backend", reason: "Spring Boot 서비스 서버 표준 런타임" },
    {
      name: "Spring Boot 3.4.5",
      category: "backend",
      reason: "인증, 카페, 추천, 리뷰, 북마크, 피드, 사용자 API의 일관된 제공",
    },
    { name: "Spring Security", category: "backend", reason: "이메일 로그인과 JWT 인증 흐름" },
    { name: "Spring Data JPA", category: "data", reason: "카페, 리뷰, 사용자, 북마크 도메인의 관계형 모델 관리" },
    { name: "MySQL", category: "data", reason: "서비스 도메인의 정형 데이터 저장소" },
    { name: "Redis", category: "infra", reason: "비동기 크롤링과 키워드 분석 작업의 진행 상태 저장" },
    { name: "Elasticsearch", category: "data", reason: "카페 검색과 자동완성용 검색 저장소" },
    { name: "Spring Batch", category: "backend", reason: "수집·정제 데이터 처리 흐름의 배치 작업 분리" },
    { name: "Python 3.11 + FastAPI", category: "ai", reason: "크롤링·키워드 분석용 Python 데이터 처리 API 분리" },
    { name: "Selenium", category: "data", reason: "카카오맵 상세 페이지 리뷰 데이터 수집" },
    { name: "KiwiPipy", category: "ai", reason: "한국어 리뷰 후보 키워드 추출" },
    { name: "KR-SBERT", category: "ai", reason: "리뷰 키워드 의미 유사도 임베딩 비교" },
    { name: "TF-IDF", category: "ai", reason: "클러스터별 대표 키워드 선정" },
    { name: "Docker", category: "infra", reason: "백엔드와 데이터 처리 서버 실행 환경 재현" },
    { name: "AWS S3", category: "infra", reason: "이미지와 정적 자산 저장소" },
    { name: "Swagger", category: "docs", reason: "팀원 확인용 백엔드 API 계약 문서화" },
    { name: "JUnit 5", category: "test", reason: "카페 도메인과 검색·추천 API 회귀 검증" },
  ],
  decisions: [
    {
      title: "FastAPI와 Spring Boot 서버 분리",
      decision: "크롤링·키워드 분석은 FastAPI, 인증·카페·추천 서비스 API는 Spring Boot",
      reason: "Python NLP/크롤링 생태계 활용 + 서비스 도메인·인증의 Spring 기반 안정화",
      alternatives: ["Spring 단일 서버에서 Python 프로세스 호출", "FastAPI 단일 서버"],
      tradeOff: "런타임 경계·API 계약 관리 비용 증가 vs 데이터 처리/서비스 도메인 책임 명확화",
      verification: "크롤링 서버 단위 테스트와 Spring 도메인 테스트 분리, 실패 범위 확인",
      ownership: "direct",
    },
    {
      title: "제주 좌표 격자 기반 수집",
      decision: "제주도 좌표 격자 분할, 지역 단위 반복 검색",
      reason: "카카오맵 API 단일 검색 응답량 제한, 전체 카페 일괄 수집 어려움",
      alternatives: ["행정동 키워드 수동 수집", "검색 결과 pagination만 사용"],
      tradeOff: "좌표 생성·중복 제거 비용 증가 vs 누락 가능성 감소",
      verification: "수집 카페 수, 실패 ID 재시도 결과, 중복 제거 후 개수 기록",
      ownership: "direct",
    },
    {
      title: "키워드 정제 후 추천 데이터로 사용",
      decision: "리뷰 원문 대신 형태소 분석, 임베딩, 클러스터링, `TF-IDF` 기반 키워드 정제",
      reason: "짧고 반복 표현이 많은 리뷰, 원문 그대로 추천 특징화 어려움",
      alternatives: ["리뷰 전문 임베딩만 사용", "수동 태그 입력"],
      tradeOff: "파이프라인 복잡도 증가 vs 사람이 이해 가능한 추천 근거 키워드 확보",
      verification: "원천/최종 키워드 수, 샘플 카페 대표 키워드 비교",
      ownership: "direct",
    },
  ],
  problems: [
    {
      title: "카카오맵 API 응답량 제한 대응",
      problem: "단일 검색 결과 제한으로 제주 전체 카페 안정 수집 어려움",
      approach: "제주도 행정구역 + 격자 좌표 기준 탐색 범위 분할, 반복 검색",
      cause: "API 검색 반경·응답 개수 제한, 넓은 영역 검색 결과 누락 가능성",
      solution: "200m 격자 + GeoJSON 육지 필터링 기반 검색 좌표, 실패 ID 별도 재시도",
      result: "47,190개 좌표 탐색, 카페 3,950개와 리뷰 22,144개 수집",
    },
    {
      title: "한국어 리뷰 키워드 파이프라인 설계",
      problem: "짧고 반복어가 많은 리뷰 원문, 추천 직접 사용 어려움",
      approach: "형태소 분석 → 불용어 필터링 → 임베딩 → 클러스터링 → 대표 키워드 선정",
      cause: "감성 표현과 일반 단어 혼재, 추천 품질 흔들림 가능성",
      solution: "`KiwiPipy` · KR-SBERT · HDBSCAN · TF-IDF 연결, 추천 가능한 키워드 데이터 정리",
      result: "80,601개 원천 키워드 → ==30,336개 최종 정제 키워드== 축소",
    },
  ],
  metrics: [
    { label: "카페 데이터", value: "3,950개", note: "카카오맵 API와 크롤링으로 정리한 제주 카페 수." },
    { label: "리뷰 데이터", value: "22,144개", note: "==추천 키워드 추출==에 사용한 리뷰 데이터 수." },
    {
      label: "키워드 정제",
      before: "80,601개",
      after: "30,336개",
      note: "원천 추출 키워드에서 ==최종 정제 키워드==로 축소.",
    },
    { label: "검색 좌표", value: "47,190개", note: "200m 격자와 GeoJSON 육지 필터링 기반 좌표 수." },
  ],
  visuals: [
    {
      kind: "architecture",
      title: "Architecture",
      src: "/assets/projects/cafe-gamsugwang/architecture.png",
      caption: "Next.js 클라이언트 → REST API 서버, Python `Crawler/NLP` 파이프라인과 `CafeDocument` 동기화 배치, Kakao·지도·임베딩 외부 연동, MySQL·ES(검색·Geo·Vector) 데이터 레이어",
    },
    {
      kind: "erd",
      title: "ERD",
      src: "/assets/projects/cafe-gamsugwang/erd.png",
      caption: "사용자·카페·리뷰·키워드·메뉴·관심목록과 ES(`cafeDocument`·`keywords`·`address`) 검색 인덱스 구조",
    },
  ],
  retrospective: {
    learned: [
      "추천 품질의 선행 조건: 모델보다 입력 데이터 품질과 재현 가능한 수집 절차",
      "장기 실행 크롤링 작업: 동기 API 흐름 분리, 실패·진행률 관리 용이성",
    ],
    regrets: [
      "크롤러 원본 저장소의 대용량 자산 혼재, Git LFS/별도 저장소 전략 지연",
      "추천 품질의 사용자 행동 지표 검증 단계 미연결",
    ],
    improvements: [
      "크롤링 데이터셋 버전과 재수집 절차 문서화",
      "추천 결과 클릭·북마크 후속 지표 추가, 품질 검증",
    ],
    collaboration:
      "프론트 노출 방식 기준 추천 API 응답 조정. 키워드, 지도, 북마크 흐름 정합.",
  },
  star: [
    {
      title: "리뷰 데이터를 추천 가능한 키워드로 정제",
      situation: "짧고 반복 표현이 많은 제주 카페 리뷰, 원문 기반 추천 근거화 어려움",
      action: "형태소 분석 · 불용어 필터링 · 임베딩 · 클러스터링 · TF-IDF 선정 연결",
      result: "80,601개 원천 키워드 → 30,336개 최종 키워드, 카페 추천용 데이터 형태 정리",
      learning: "AI 추천 기능의 우선순위: 알고리즘 이름보다 데이터 수집·정제·검증 흐름",
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
  summary: "상품 등록부터 장바구니, 배송지, 주문, 관리자 처리까지 이어지는 ==커머스 MVP==",
  recruiterSummary: {
    role: "장바구니·알림 흐름 분석/정리와 테스트 보강",
    impact: "JWT 인증 주체 기준 API, Redis cart, FCM 알림 흐름의 권한 경계 점검",
    proof: "Gradle test suite 당시 통과. 권한 필터·주문 만료 정책은 팀 구조 분석 기준",
  },
  common: {
    purpose: "고객 쇼핑 흐름과 관리자 상품·주문 처리 흐름의 `커머스 MVP` 검증",
    goal: "고객/관리자 인증 분리, 상품·장바구니·배송지·주문·알림 흐름 연결",
    developmentIssue:
      "고객/관리자 공존 서비스. 인증 필터, 권한, 장바구니 캐싱, 주문 재고 ==동시성 경계== 혼재 위험.",
    results: [
      "팀 프로젝트 고객/관리자 인증 분리 구조 분석, 장바구니·알림 API는 JWT 인증 주체 기준 정리",
      "`Redis` 기반 장바구니 캐싱 흐름 분석·테스트",
      "`Firebase Cloud Messaging` 기반 웹 알림 흐름 분석·테스트",
      "주문·재고 동시성 테스트, JUnit/Mockito 테스트 보강",
    ],
  },
  role: {
    title: "Cart, notification & test coverage",
    contribution:
      "**장바구니·알림 흐름 분석과 테스트 보강**. 고객 쇼핑 흐름과 관리자 주문 처리 흐름의 API 계약·도메인 책임 정리.",
    implementedFeatures: [
      "장바구니 추가/조회/삭제 흐름 분석",
      "FCM 토큰 등록과 웹 알림 발송 흐름 분석",
      "JWT 인증 주체 기준 장바구니·알림 API 정리",
      "주문·재고 동시성 테스트",
      "고객/관리자 권한 경계 테스트",
    ],
    achievements: [
      "장바구니 `Redis` 저장소 분리 구조의 반복 조회·수정 흐름 분석",
      "요청 파라미터 대신 JWT 인증 주체를 쓰는 API 경계 정리",
      "주문·재고 차감 흐름의 동시성 위험 테스트 시나리오화",
    ],
  },
  tech: [
    { name: "Java 21", category: "backend", reason: "커머스 MVP 백엔드의 Spring Boot 런타임" },
    { name: "Spring Boot 3.4.4", category: "backend", reason: "커머스 도메인 API 구성, 계층별 테스트 기반" },
    { name: "Spring Security + JWT", category: "backend", reason: "고객/관리자 인증 필터 분리" },
    { name: "Spring Data JPA", category: "data", reason: "상품, 주문, 배송지, 회원 도메인의 관계형 모델 관리" },
    { name: "Querydsl", category: "data", reason: "상품 검색과 조건 조회의 타입 안정적 확장" },
    { name: "MySQL", category: "data", reason: "커머스 주문과 상품 데이터 저장소" },
    { name: "H2", category: "test", reason: "로컬 테스트의 빠른 도메인 계층 검증" },
    { name: "Redis", category: "infra", reason: "장바구니 캐싱과 주문 만료 대기 자원" },
    { name: "Firebase Admin SDK", category: "infra", reason: "웹 알림 토큰 등록과 발송 처리" },
    { name: "AWS S3 SDK", category: "infra", reason: "상품 이미지 업로드 저장소 연동" },
    { name: "Docker Compose", category: "infra", reason: "서비스 실행 환경과 외부 의존성 재현" },
    { name: "Swagger", category: "docs", reason: "팀원 확인용 고객/관리자 API 문서화" },
    { name: "JUnit 5 + Mockito", category: "test", reason: "장바구니, 알림, 주문, 인증 기능 회귀 검증" },
    { name: "Spring Security Test", category: "test", reason: "권한별 API 접근과 인증 주체 기반 동작 검증" },
  ],
  decisions: [
    {
      title: "Redis 기반 장바구니 캐싱",
      decision: "사용자별 장바구니 상태 `Redis` 저장, 서비스 계층의 추가·조회·삭제 흐름 일관화",
      reason: "상품 탐색 중 반복 조회·수정되는 장바구니, DB 단독 경유 시 응답 흐름 부담",
      alternatives: ["DB 테이블 단독 저장", "클라이언트 local state 중심 처리"],
      tradeOff: "Redis 키 스키마·만료 정책 관리 부담 vs 반복 조회·수정 응답 경량화",
      verification: "장바구니 추가/조회/삭제 서비스 테스트, 인증 사용자 기준 API 테스트",
      ownership: "analyzed",
      ownershipNote: "포트폴리오 표현 범위: 구조 분석/테스트 보강.",
    },
    {
      title: "JWT principal 기반 장바구니·알림 API",
      decision: "장바구니·알림 API 기준: 요청 body 회원 식별자보다 JWT 인증 주체",
      reason: "클라이언트 식별자와 실제 인증 사용자 불일치 시 타 사용자 장바구니·알림 접근 위험",
      alternatives: ["요청 body memberId 사용", "path variable memberId 사용"],
      tradeOff: "테스트 인증 컨텍스트 구성 부담 vs API 입력 단순화·권한 경계 명확화",
      verification: "Spring Security Test 기반 인증 사용자 기준 장바구니·알림 동작과 실패 케이스 검증",
      ownership: "analyzed",
      ownershipNote: "포트폴리오 표현 범위: 구조 분석/테스트 보강.",
    },
    {
      title: "FCM 알림과 테스트 보강",
      decision: "FCM 토큰 등록과 알림 발송 실패 흐름까지 테스트 대상 포함",
      reason: "외부 서비스 연동 웹 알림, 토큰 저장·발송 요청·실패 예외 분리 필요",
      alternatives: ["알림 기능 제외", "발송 실패를 로깅만 하고 테스트하지 않음"],
      tradeOff: "외부 SDK 추상화·테스트 setup 비용 증가 vs 알림 기능 회귀 감소",
      verification: "FCM 토큰 등록과 알림 발송 실패 예외 테스트",
      ownership: "analyzed",
      ownershipNote: "포트폴리오 표현 범위: 구조 분석/테스트 보강.",
    },
  ],
  problems: [
    {
      title: "JWT 기준 장바구니·알림 API 정리",
      problem: "요청값 회원 식별자 의존 시 인증 주체와 요청 데이터 불일치 위험",
      approach: "API 입력의 사용자 식별 책임 축소, JWT memberUid 기준 서비스 계층 정리",
      cause: "화면 전달 값과 인증 컨텍스트의 동시 존재, 흐려지는 권한 경계",
      solution: "장바구니·알림 기능의 현재 로그인 사용자 조회를 인증 객체 기준으로 수정",
      result: "클라이언트 임의 식별자 없이 현재 로그인 사용자 기준 동작",
    },
    {
      title: "주문·재고 동시성 검증",
      problem: "동일 상품 동시 구매 시 재고 오차 위험",
      approach: "상품 재고 처리 책임 분리, 동시성 테스트 기반 주문 생성 흐름 재현",
      cause: "주문 생성과 재고 차감의 결합, 동시 요청 경계 약화 가능성",
      solution: "재고 처리 서비스 분리, 주문 생성 테스트의 동시 요청 케이스 검증",
      result: "동시성 위험 테스트 시나리오화, 이후 주문 처리 수정의 ==회귀 기준== 확보",
    },
  ],
  metrics: [
    { label: "권한 필터", value: "2개", note: "프로젝트 구조 분석 기준 `Member/Admin JWT 필터`와 Provider 분리." },
    { label: "주문 만료 정책", value: "15분", note: "프로젝트 설정 분석 기준 대기 주문 재고 점유 제한 정책." },
    { label: "테스트 검증", value: "당시 Gradle test suite 통과", note: "기존 포트폴리오 기록의 검증 항목이며 전체 품질 보증률을 뜻하지 않는다." },
  ],
  visuals: [
    {
      kind: "erd",
      title: "ERD",
      src: "/assets/projects/jsonstore/erd.png",
      caption: "회원·상품·재고·장바구니·주문(`orders`·`order_products`)·배송·결제·알림·관리자 도메인 관계",
    },
  ],
  retrospective: {
    learned: [
      "커머스 핵심 경계: API 형태보다 인증 주체, 주문 상태, 재고 차감",
      "관리자/고객 공존 서비스: 필터 수준 역할 분리의 디버깅 이점",
    ],
    regrets: [
      "주문·재고 동시성 테스트의 다양한 상품 조합·실패 케이스 부족",
      "S3와 Firebase 운영 키 관리 절차 문서화 부족",
    ],
    improvements: [
      "주문 상태 전이와 재고 차감 정책 별도 문서화",
      "Firebase/S3 키 로테이션과 권한 정책 운영 체크리스트화",
    ],
    collaboration:
      "고객/관리자 화면의 단일 API 서버 사용 구조. 팀원과 권한별 응답·에러 케이스 정합.",
  },
  star: [
    {
      title: "장바구니 API를 인증 주체 기준으로 정리",
      situation: "장바구니·알림 API의 요청값 회원 식별자 의존, 타 사용자 데이터 접근 위험",
      action: "JWT 현재 사용자 기준 서비스 경계 변경, Spring Security Test 인증 케이스 보강",
      result: "사용자 ID 직접 전달 없이 현재 로그인 사용자 기준 장바구니·알림 처리",
      learning: "인증 서비스의 안전한 기준: 편한 파라미터보다 인증 컨텍스트",
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
  summary: "독서 기록 공유 서비스의 ==인증, 검색, 탈퇴 기능==을 확장한 커뮤니티 백엔드",
  recruiterSummary: {
    role: "member 도메인 전반 + 테스트 보강",
    impact: "이메일 인증, BCrypt, 사용자 검색/탈퇴, 회원 생명주기 회귀 테스트",
    proof: "본인 PR 8건: #44, #53, #80, #100, #133, #148, #158, #167",
  },
  common: {
    purpose: "독서 기록·리뷰 공유 커뮤니티의 회원, 리뷰, 팔로우, 알림 흐름 안정화",
    goal: "기존 백엔드에 이메일 인증, 사용자 검색, 회원 탈퇴, 테스트, `Swagger` 문서화 보강",
    developmentIssue:
      "짧은 기간의 기존 코드 인수인계와 기능 확장. 인증·회원·리뷰 도메인의 예외 흐름 동시 검증 필요.",
    results: [
      "이메일 인증, 사용자 검색, 회원 탈퇴 기능 구현",
      "`member` 중심 테스트 보강, 일부 도메인 회귀 테스트 정리",
      "`Swagger` 기반 API 문서화 추가, 협업 정합 강화",
    ],
  },
  role: {
    title: "Member domain & regression tests",
    contribution:
      "**이메일 인증, 사용자 검색, 회원 탈퇴 기능 구현**. 주요 기능 테스트 작성, 기능 추가 과정의 예외·실패 흐름 검증 집중.",
    implementedFeatures: [
      "회원가입과 이메일 인증 토큰 발급·검증",
      "이메일 기반 사용자 검색",
      "회원 정보 수정과 탈퇴",
      "member 외 일부 도메인 회귀 테스트 보강",
      "Swagger 기반 API 문서화",
    ],
    achievements: [
      "member 도메인 전반 직접 구현, 인증·회원 생명주기 정리",
      "PR 단위 테스트 추가, ==기존 기능 회귀== 감소",
      "팀원이 이어 볼 수 있는 문서화와 테스트 자산",
    ],
  },
  tech: [
    { name: "Java 17", category: "backend", reason: "독서 SNS 백엔드의 Spring Boot 런타임" },
    { name: "Spring Boot 3.3.7", category: "backend", reason: "독서 SNS 도메인 API 구성" },
    { name: "Spring Security + JWT", category: "backend", reason: "로그인, 토큰 재발급, 인증 사용자 접근 제어" },
    { name: "Spring Data JPA", category: "data", reason: "회원, 도서, 리뷰, 팔로우, 알림 도메인의 관계형 모델 관리" },
    { name: "H2", category: "test", reason: "로컬 테스트의 빠른 도메인 동작 검증" },
    { name: "Redis", category: "infra", reason: "인증·피드·알림 관련 상태 저장소" },
    { name: "Spring Events", category: "backend", reason: "팀원 구현 알림 이벤트 구조 분석, 테스트 경계 이해용 프로젝트 기술" },
    { name: "FCM", category: "infra", reason: "알림 푸시 전송" },
    { name: "Prometheus + Micrometer", category: "infra", reason: "서비스 관측 지표 노출" },
    { name: "Swagger", category: "docs", reason: "프론트엔드/백엔드 API 계약 정합" },
    { name: "JUnit 5 + Mockito", category: "test", reason: "회원, 인증, 도서, 리뷰 기능 회귀 검증" },
    { name: "GitHub Actions + SonarCloud", category: "test", reason: "CI와 정적 분석 기반 변경 품질 확인" },
  ],
  decisions: [
    {
      title: "이메일 인증을 회원가입 흐름에서 분리",
      decision: "회원가입 이후 이메일 인증 토큰 발급, 인증 상태 갱신은 별도 흐름",
      reason: "회원가입 직후 실제 이메일 소유 여부 미확인 시 잘못된 계정 활성화 위험",
      alternatives: ["가입 즉시 활성화", "관리자 수동 승인", "소셜 로그인만 허용"],
      tradeOff: "인증 토큰·메일 발송 실패 처리 추가 vs 계정 신뢰도 향상",
      verification: "EmailServiceTest와 MemberApiControllerTest 기반 인증 성공·실패 케이스 검증",
      ownership: "direct",
    },
    {
      title: "BCrypt 기반 비밀번호 처리",
      decision: "회원 비밀번호 평문 저장 금지, BCrypt 해시 저장과 인증 흐름 검증",
      reason: "회원 도메인의 기본 보안 경계: 비밀번호 저장 방식의 코드 보장",
      alternatives: ["평문 저장", "단순 SHA 해시", "외부 인증 서비스 위임"],
      tradeOff: "해시 비용·테스트 setup 부담 vs 비밀번호 유출 위험 감소",
      verification: "회원가입·로그인 테스트 기반 해시 저장과 인증 성공/실패 확인",
      ownership: "direct",
    },
    {
      title: "회원 생명주기 회귀 테스트 보강",
      decision: "회원 검색, 정보 수정, 탈퇴, 이메일 인증 등 상태 변경 기능을 `서비스와 컨트롤러 테스트`로 고정",
      reason: "짧은 기간의 기존 코드 확장, 회원 상태 변화로 인한 다른 API 회귀 가능성",
      alternatives: ["수동 QA 중심 확인", "컨트롤러 테스트만 작성"],
      tradeOff: "테스트 작성 시간 증가 vs 기능 추가 후 빠른 회귀 확인",
      verification: "MemberServiceTest와 MemberApiControllerTest 기반 정상·예외 흐름 확인",
      ownership: "direct",
    },
  ],
  problems: [
    {
      title: "이메일 인증 흐름 구현",
      problem: "회원가입 직후 서비스 이용 허용 시 실제 이메일 소유 여부 확인 어려움",
      approach: "EmailToken 엔티티·저장소·EmailService 추가, 인증 토큰 발급과 상태 갱신 흐름 구성",
      cause: "기존 회원가입 흐름의 이메일 소유 검증 단계 분리 부족",
      solution: "메일 발송 실패, 인증 실패, 토큰 검증 성공 케이스 테스트 동반 구현",
      result: "회원가입 이후 이메일 인증 상태의 서비스 정책화",
    },
    {
      title: "사용자 검색·탈퇴 기능",
      problem: "사용자 검색·탈퇴와 인증 상태, 중복 이메일, 삭제 상태의 예외 결합",
      approach: "이메일 기반 검색과 탈퇴 흐름의 서비스 계층 분리, 테스트 케이스 보강",
      cause: "같은 회원 데이터를 다루는 회원 생명주기와 검색 API, 서로 다른 실패 조건",
      solution: "탈퇴 후 조회·인증 흐름 영향 최소화를 위한 예외와 테스트 정리",
      result: "회원 도메인 기능 추가 이후 주요 회귀의 ==자동 테스트== 확인",
    },
  ],
  metrics: [
    { label: "본인 직접 PR", value: "8건", note: "`member` 도메인 전반과 테스트 보강 중심 PR." },
    { label: "테스트 검증", value: "당시 Java 17 로컬 test suite 통과", note: "기존 포트폴리오 기록 기준이며 전체 품질 보증률을 뜻하지 않는다." },
    { label: "Graphify 노드", value: "1,030개", note: "vault Graphify readandshare AST-only 보고서 기준." },
  ],
  visuals: [
    {
      kind: "architecture",
      title: "Architecture",
      src: "/assets/projects/readandshare/architecture.png",
      caption: "GitHub CI/CD → Docker Compose 배포, AWS 서버의 ReadNShare 백엔드와 `Refresh Token Store`, 도서 검색·이메일 인증·푸시 알림 외부 연동",
    },
    {
      kind: "erd",
      title: "ERD",
      src: "/assets/projects/readandshare/erd.png",
      caption: "회원·도서·리뷰·팔로우·피드·좋아요·즐겨찾기와 인증(`refresh_token`·`email_token`·`fcm_token`) 도메인 관계",
    },
  ],
  retrospective: {
    learned: [
      "기존 코드 기능 추가의 안전장치: 실패 흐름 테스트 선고정",
      "Swagger 문서화의 역할: 산출물이 아니라 프론트엔드/백엔드의 공유 계약",
    ],
    regrets: [
      "Redis 필요 Feed/FCM 통합 테스트 실행 조건 분리 지연",
      "인증·인프라 논의에서 부족했던 기본기 보완 속도 아쉬움",
    ],
    improvements: [
      "외부 API 키와 FCM 키 로테이션 절차의 별도 운영 문서화",
      "도메인별 테스트 범위와 실행 조건의 README 명확화",
    ],
    collaboration:
      "짧은 팀 프로젝트. Git Flow, Swagger, 테스트 결과 기준 변경 공유와 다음 작업자 인수인계 정리.",
  },
  star: [
    {
      title: "이메일 인증과 회원 도메인 테스트 보강",
      situation: "기존 독서 SNS의 이메일 인증·회원 탈퇴 추가, 회원 상태 변화의 다중 API 영향 가능성",
      action: "EmailToken, EmailService, MemberService 테스트 추가, 인증 성공·실패·탈퇴 후 흐름 분리 구현",
      result: "회원 도메인 기능 확장과 주요 실패 케이스 회귀 테스트 확보",
      learning: "기존 코드 확장의 우선순위: 새 기능보다 회귀 가능성 탐색",
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
  summary: "식당 예약과 ==현장 웨이팅==을 함께 관리하는 백엔드 서비스",
  recruiterSummary: {
    role: "웨이팅 파트 + JMeter 부하 검증",
    impact: "Redis atomic/queue/async로 웨이팅 등록 max 응답 233ms → 7ms",
    proof: "500명/1초 JMeter spike, max 233ms → 7ms, 평균 40.9%~47.8% 감소",
  },
  common: {
    purpose: "식당 이용자의 예약·현장 웨이팅 신청, 운영자의 대기열·예약 슬롯 관리",
    goal: "예약 슬롯 · 웨이팅 큐 · 고객 호출 · 이력 처리 · 모니터링의 `운영 흐름` 연결",
    developmentIssue:
      "웨이팅 등록 요청 집중 시 대기번호 중복, DB 저장 병목, 실패 요청 복구, 운영 종료 후 이력 처리 문제가 ==동시 발생== 가능.",
    results: [
      "JMeter 부하 테스트 기반 웨이팅 등록 병목 확인",
      "`Redis Atomic` 연산 기반 중복 진입과 대기번호 발급 단순화",
      "Spring 비동기 처리 기반 응답 경로와 DB 저장 경로 분리, max response ==233ms → 7ms==",
      "Prometheus/Grafana와 Spring Batch 기반 운영 흐름 구성",
    ],
  },
  role: {
    title: "Waiting queue backend",
    contribution:
      "**웨이팅 파트 담당**. 부하 테스트와 단위 테스트로 병목·동시성 문제 확인, DB Lock/분산락 비교 후 Redis Atomic 연산 기반 해결책 적용.",
    implementedFeatures: [
      "웨이팅 오픈/중단/종료",
      "고객 웨이팅 등록/취소/미루기",
      "내 대기 순번 조회와 다음 고객 호출",
      "Redis 기반 웨이팅 큐와 pending key",
      "실패 요청 dead-letter 큐",
      "팀 구조에 포함된 Spring Batch 기반 웨이팅 이력 처리 흐름 분석/연동",
      "JMeter 부하 테스트와 Prometheus/Grafana 모니터링",
    ],
    achievements: [
      "동시 요청의 대기번호 중복 가능성 테스트 노출",
      "DB Lock/분산락 비교 후 `Redis SETNX/INCR` 기반 단순 해결책 선택",
      "응답 경로와 DB 저장 분리, 웨이팅 등록 체감 성능 개선",
    ],
  },
  tech: [
    { name: "Java 17", category: "backend", reason: "예약·웨이팅 백엔드의 Spring Boot 런타임" },
    { name: "Spring Boot 3.4.4", category: "backend", reason: "예약·웨이팅 API와 운영 모니터링 구성" },
    { name: "Spring Security + JWT", category: "backend", reason: "고객과 운영자 인증 처리" },
    { name: "Spring Data JPA", category: "data", reason: "예약, 매장, 계정, 웨이팅 이력의 관계형 모델 관리" },
    { name: "MySQL 8", category: "data", reason: "예약과 웨이팅 이력의 영속 저장소" },
    { name: "Redis 7", category: "infra", reason: "웨이팅 큐, pending key, 대기번호 발급의 빠른 처리" },
    { name: "Spring Batch", category: "backend", reason: "운영 종료 후 웨이팅 이력 처리 자동화" },
    { name: "WebSocket", category: "backend", reason: "웨이팅 상태 변화 실시간 전달 경로" },
    { name: "Actuator + Micrometer", category: "infra", reason: "애플리케이션 상태와 메트릭 노출" },
    { name: "Prometheus + Grafana", category: "infra", reason: "부하 테스트와 운영 지표 시각화" },
    { name: "JMeter", category: "test", reason: "웨이팅 등록 부하와 병목 재현" },
    { name: "JUnit 5 + Mockito", category: "test", reason: "웨이팅 서비스, Redis 서비스, 비동기 프로세서 검증" },
    { name: "Gradle", category: "infra", reason: "빌드와 테스트 실행 표준화" },
  ],
  decisions: [
    {
      title: "웨이팅 큐를 Redis로 관리",
      decision: "웨이팅 등록 초입과 대기번호 발급은 Redis 큐와 atomic 연산 처리",
      reason: "동시 요청에서 DB 단독 대기번호 발급 시 lock 비용·병목 증가 가능성",
      alternatives: ["DB pessimistic lock", "분산락", "단일 DB sequence"],
      tradeOff: "Redis 키 스키마·복구 흐름 관리 부담 vs 요청 초입 동시성 처리 단순화",
      verification: "웨이팅 등록 동시성 테스트와 JMeter 부하 테스트",
      ownership: "direct",
    },
    {
      title: "JMeter + Prometheus + Grafana 부하 검증",
      decision: "웨이팅 등록 성능은 JMeter 시나리오와 Prometheus/Grafana 지표 동시 확인",
      reason: "단위 테스트만으로는 부족한 응답 시간·병목 위치 설명력",
      alternatives: ["수동 API 반복 호출", "k6", "테스트 없음"],
      tradeOff: "테스트 자산 관리 비용 증가 vs 성능 개선 전후 evidence 확보",
      verification: "Thread Group, accountIds.csv, JMeter log, 메트릭 대시보드 결과 확인",
      ownership: "direct",
    },
    {
      title: "Spring Batch로 예약·웨이팅 생명주기 처리",
      decision: "운영 종료 후 이력 처리와 생명주기 작업은 Batch 분리",
      reason: "운영자 수동 상태 정리 시 누락과 반복 작업 발생 가능성",
      alternatives: ["수동 관리자 API", "단순 scheduler only"],
      tradeOff: "Batch Job 관리 비용 증가 vs 반복 가능한 상태 전이",
      verification: "BatchMonitoringController와 job 실행 결과 확인",
      ownership: "team",
      ownershipNote: "프로젝트 구조의 운영 생명주기 결정. 포트폴리오에서는 웨이팅 운영 흐름과 연결.",
    },
  ],
  problems: [
    {
      title: "부하 테스트 기반 병목 탐지",
      problem: "웨이팅 등록 요청 집중 시 동기 DB 저장으로 인한 응답 시간 증가 구간",
      approach: "2,000개 계정 데이터와 JMeter 시나리오 기반 요청 흐름 재현",
      cause: "API 응답 경로와 DB 저장의 강한 결합",
      solution: "API 응답 경로는 Redis 큐 선적재, DB 저장은 비동기 프로세서 담당",
      result:
        "JMeter spike 기준 max response time 233ms → 7ms, 평균 응답 95ms → 1ms 확인",
    },
    {
      title: "웨이팅 번호 중복 동시성 문제",
      problem: "동일 고객 동시 웨이팅 등록과 대기번호 발급 시 중복 접수 가능성",
      approach: "DB Lock, 분산락, Redis atomic 연산 비교",
      cause: "동시 요청 초입의 동일 사용자·동일 매장 중복 진입 차단 부족",
      solution: "`Redis SETNX` pending key 기반 중복 진입 차단, Redis INCR 기반 대기번호 발급",
      result: "단순한 Redis atomic 연산으로 동시성 해결, 테스트 기반 ==회귀 기준== 확보",
    },
  ],
  metrics: [
    {
      label: "웨이팅 등록 max response",
      before: "233ms",
      after: "7ms",
      note: "500명/1초 JMeter spike. Redis atomic + queue + async 적용 후 max 기준.",
    },
    {
      label: "평균 응답 감소",
      value: "40.9%~47.8%",
      note: "동일 점주 반복 조회, 다수 점주 조회, 기간 확대, 대량 부하 시나리오 기준.",
    },
    { label: "JMeter 계정 데이터", value: "2,000개", note: "웨이팅 등록 `부하 테스트용 계정 CSV` 기준." },
    { label: "테스트 검증", value: "당시 Gradle test suite 통과", note: "기존 포트폴리오 기록 기준이며 전체 품질 보증률을 뜻하지 않는다." },
  ],
  visuals: [
    {
      kind: "architecture",
      title: "Architecture",
      src: "/assets/projects/the-last-supper/architecture.png",
      caption: "Spring Boot 3.4.4 백엔드, Redis 7 대기열·캐시, MySQL 8, Firebase FCM 푸시, React 19 SPA와 JMeter 부하 테스트·Prometheus/Grafana 모니터링까지 포함한 구성",
    },
    {
      kind: "erd",
      title: "ERD",
      src: "/assets/projects/the-last-supper/erd.png",
      caption: "계정·매장·예약(`reservation_plan`·`slot`·`history`)·웨이팅(`queue`·`history`·`setting`)·알림 도메인 관계",
    },
  ],
  retrospective: {
    learned: [
      "동시성 문제 해결의 출발점: 추상적 우려보다 부하 테스트와 단위 테스트 재현",
      "대기열 설계 범위: CRUD를 넘어 상태 전이, 실패 복구, 운영 종료 흐름",
    ],
    regrets: [
      "Redis 키 스키마와 TTL 정책의 명확한 문서 부족",
      "포트폴리오 즉시 인용 가능한 JMeter 표준 요약 부족",
    ],
    improvements: [
      "웨이팅 큐 key, pending key, dead-letter 큐 생명주기 문서화",
      "부하 테스트 결과 before/after 표·그래프 정리, 재현 가능성 확보",
    ],
    collaboration:
      "예약/웨이팅 도메인이 만나는 매장 운영 흐름 조율. 컨트롤러 책임 단위 축소.",
  },
  star: [
    {
      title: "Redis Atomic 연산으로 웨이팅 동시성 해결",
      situation: "동시 웨이팅 등록 요청, 중복 접수와 대기번호 충돌 가능성",
      action: "DB Lock/분산락 비교 후 Redis SETNX pending key와 INCR 대기번호 발급으로 요청 초입 단순화",
      result: "중복 진입 차단, 대기번호 원자적 발급, JMeter·단위 테스트 기반 병목과 회귀 확인",
      learning: "동시성 해결의 출발점: 강한 락보다 작은 공유 상태와 atomic primitive 제한",
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
