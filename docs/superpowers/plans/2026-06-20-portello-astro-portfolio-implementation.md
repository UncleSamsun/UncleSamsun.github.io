# Portello Astro Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as an Astro + React GitHub Pages site using the Portello IDE/terminal design system, with all current projects plus Hola Climbing and backend/AI-focused technical content.

**Architecture:** Astro owns static routing, metadata, and project detail pages. React owns the interactive IDE shell: explorer, tabs, editor view switching, and terminal commands. Portello is vendored as an internal design system under `src/design-system/portello`; Minjoun-specific portfolio data stays under `src/data`.

**Tech Stack:** Astro, React, TypeScript, CSS modules/plain CSS, Vitest for pure data/helper tests, Playwright for final visual QA, GitHub Pages static build.

---

## Requirements From Attachments

The attached screenshots become content and UI requirements:

- Common project result checklist:
  - project name
  - project period and team size
  - project purpose and goal
  - project development issue
  - project results and outcomes
- Personal role checklist:
  - role and contribution
  - implemented features
  - backend/AI technology stack used in the project
  - reason for using each important stack
  - personal achievement
  - problem-solving contribution
  - lessons learned or growth
  - regret and improvement plan
- Interview-prep categories:
  - project experience / role and contribution
  - occurred problems and resolution process: problem, approach, cause, solution
  - technical decision reason: evidence, alternatives, trade-off
  - technology understanding: concept, pros/cons, implementation experience
  - retrospective and improvement / supplement points
  - collaboration experience: conflict, difficulty, success, important collaboration point
- Visual evidence requirements:
  - add AI charts and usage notes where available
  - show architecture diagrams and highlight Minjoun-owned backend/AI parts
  - include flowchart and ERD captures
  - explain AI model, input data, output data, preprocessing, data characteristics, selected model reason, and improvement based on results
  - use a gothic Korean font family for readable Korean body text
  - troubleshooting entries use Situation - Action - Result - Learning

## Scope

This plan covers the complete portfolio rebuild, not just a theme swap.

Included projects:

- `hola-climbing` (new, first-priority project)
- `cafe-gamsugwang`
- `jsonstore`
- `readandshare`
- `the-last-supper`

Technical content rule:

- Show backend, AI, data, infra, test, docs technology only.
- Do not present frontend stacks such as React, Vue, Capacitor, Vite as the main technology badges.
- Frontend may appear only as project context or team role text, not as Minjoun's technical stack.

## File Structure

Create or modify these files:

```text
package.json
package-lock.json
astro.config.mjs
tsconfig.json
src/
  env.d.ts
  data/
    types.ts
    profile.ts
    projects.ts
    navigation.ts
  design-system/
    portello/
      README.md
      styles.css
      tokens/
        fonts.css
        colors.css
        typography.css
        spacing.css
        base.css
      components/
        Button.tsx
        Badge.tsx
        Card.tsx
        CodeBlock.tsx
        Terminal.tsx
        FileTreeItem.tsx
        StatusBarItem.tsx
        Tab.tsx
        index.ts
  components/
    portfolio/
      IDEWindow.tsx
      ActivityBar.tsx
      Explorer.tsx
      EditorTabs.tsx
      EditorPane.tsx
      TerminalPanel.tsx
      ProjectCard.tsx
      ProjectDetail.tsx
      ProjectEvidence.tsx
      ArchitectureDiagram.tsx
      CodeLikeSection.tsx
  lib/
    portfolio.ts
    terminal.ts
    tech.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    projects/
      [slug].astro
      [...not-found].astro
  styles/
    portfolio.css
tests/
  portfolio-data.test.ts
  terminal.test.ts
  tech.test.ts
  smoke.spec.ts
public/
  CNAME
  robots.txt
  sitemap.xml
  assets/
    favicon.svg
    og-image.svg
    projects/
      hola-climbing/
        architecture.svg
        erd.png
        ai-flow-sample.png
        performance/
          01-after-summary-card.png
          02-after-sql-bottleneck.png
          03-after-k6-result-interpretation.png
          04-after-before-after-template.png
          05-after-code-change-template.png
          06-after-cursor-cache-comparison.png
```

Legacy files to retire after the Astro build works:

```text
index.html
styles.css
script.js
assets/projects.js
projects/*/index.html
```

Do not remove legacy files until the Astro version builds and direct routes are verified.

## Data Model

`src/data/types.ts` defines the content shape. This schema directly encodes the attachment checklist.

```ts
export type TechCategory = "backend" | "ai" | "data" | "infra" | "test" | "docs";

export interface TechItem {
  name: string;
  category: TechCategory;
  reason?: string;
}

export interface ProjectMetric {
  label: string;
  before?: string;
  after?: string;
  value?: string;
  note: string;
}

export interface ProjectProblem {
  title: string;
  problem: string;
  approach: string;
  cause: string;
  solution: string;
  result: string;
}

export interface StarStory {
  title: string;
  situation: string;
  action: string;
  result: string;
  learning: string;
}

export interface AiPortfolioDetail {
  model: string;
  inputData: string;
  outputData: string;
  preprocessing: string[];
  dataCharacteristics: string[];
  selectedModelReason: string;
  resultDrivenImprovements: string[];
}

export interface ProjectVisualAsset {
  kind: "architecture" | "erd" | "flowchart" | "ai-chart" | "performance" | "screenshot";
  title: string;
  src: string;
  caption: string;
  highlight?: string;
}

export interface PortfolioProject {
  slug: string;
  name: string;
  label: string;
  priority: number;
  period: string;
  team: string;
  status: "active" | "completed";
  summary: string;
  common: {
    purpose: string;
    goal: string;
    developmentIssue: string;
    results: string[];
  };
  role: {
    title: string;
    contribution: string;
    implementedFeatures: string[];
    achievements: string[];
  };
  tech: TechItem[];
  decisions: {
    title: string;
    decision: string;
    reason: string;
    alternatives: string[];
    tradeOff: string;
    verification: string;
  }[];
  problems: ProjectProblem[];
  ai?: AiPortfolioDetail;
  metrics: ProjectMetric[];
  visuals: ProjectVisualAsset[];
  retrospective: {
    learned: string[];
    regrets: string[];
    improvements: string[];
    collaboration: string;
  };
  star: StarStory[];
  links: { label: string; url: string; external: boolean }[];
}
```

## Hola Climbing Content Baseline

Add `hola-climbing` as `priority: 1` and show it first.

Required baseline content:

```ts
export const holaClimbingProject: PortfolioProject = {
  slug: "hola-climbing",
  name: "Hola Climbing",
  label: "AI Climbing SNS",
  priority: 1,
  period: "2026.05.15 ~ 2026.06.25",
  team: "2명",
  status: "active",
  summary: "클라이밍 영상을 업로드하면 AI가 동작 기술과 동적/정적 성향을 분석하고, SNS 피드·암장·기록·채팅 경험으로 연결하는 서비스",
  common: {
    purpose: "클라이머가 영상을 단순 공유하는 데서 끝나지 않고, 자신의 동작을 데이터로 되돌아보며 성장 흐름을 추적하도록 돕는다.",
    goal: "대용량 영상 업로드, AI 분석, 실시간 진행률, 추천 피드, 암장 데이터, 기록·통계 API를 하나의 백엔드/AI 파이프라인으로 연결한다.",
    developmentIssue: "영상 파일은 수십~수백 MB라 애플리케이션 서버를 경유하면 WAS 대역폭과 스레드가 포화될 수 있고, AI 분석은 긴 작업이라 요청/응답 흐름과 분리해야 했다.",
    results: [
      "GCS v4 Signed URL로 영상 바이너리 업로드를 백엔드에서 분리했다.",
      "Redis Streams + Pub/Sub + SSE로 AI 분석 요청, 진행률, 결과 저장 흐름을 분리했다.",
      "Spring Boot 서버와 Python AI 워커 간 callback 계약을 정리하고 E2E smoke를 검증했다.",
      "추천 피드 성능 테스트에서 snapshot cursor cache와 public thumbnail URL 전환으로 cursor page p95 약 9.8ms 수준의 증거를 확보했다."
    ]
  },
  role: {
    title: "Backend & AI pipeline",
    contribution: "Spring Boot 백엔드와 Python AI 워커 파이프라인을 단독 담당했다. 프론트엔드는 팀원이 맡았고, 백엔드 API 계약과 AI 워커 입출력 계약 정합을 책임졌다.",
    implementedFeatures: [
      "회원·인증·OAuth·JWT·약관·프로필 API",
      "영상 메타데이터, GCS Signed URL, 댓글, 좋아요 API",
      "암장 검색, 난이도, 리뷰, 즐겨찾기, 운영상태 API",
      "Redis Streams 기반 AI 분석 dispatch와 SSE 진행률",
      "AI worker callback 결과 저장, 분석 피드백, 재시도",
      "WebSocket STOMP 암장별 채팅과 GPS 암장 인증",
      "pgvector + 팔로잉 boost 기반 추천 피드와 snapshot cursor",
      "Flyway, Testcontainers, Swagger/ErrorCode 문서화"
    ],
    achievements: [
      "Spring REST/STOMP 100개 이상 API와 AI worker health/readiness 계약을 코드 기준으로 정리했다.",
      "PostgreSQL·Redis·GCS·AI worker가 연결된 분석 E2E 흐름을 검증했다.",
      "추천 피드 성능 evidence를 raw 결과와 presentation 이미지로 분리해 포트폴리오용 근거를 만들었다."
    ]
  },
  tech: [
    { name: "Java 25", category: "backend" },
    { name: "Spring Boot 4", category: "backend", reason: "회원·영상·암장·채팅·분석 callback 등 인증/권한이 필요한 API를 일관된 방식으로 구현하기 위해 사용했다." },
    { name: "Spring Security 7 + JWT", category: "backend", reason: "모바일/웹 클라이언트 인증, 토큰 재발급, 로그아웃 블랙리스트를 처리하기 위해 사용했다." },
    { name: "MyBatis 4", category: "data", reason: "pgvector 추천, 통계, 집계성 조회처럼 SQL 제어가 중요한 워크로드가 많아 JPA보다 명시적 SQL을 선택했다." },
    { name: "PostgreSQL + pgvector", category: "data", reason: "관계형 도메인과 스타일 임베딩 기반 추천을 같은 저장소에서 다루기 위해 사용했다." },
    { name: "Redis Streams", category: "infra", reason: "이미 Redis를 사용하고 있어 Kafka를 추가하지 않고 AI 작업 큐를 구성했다." },
    { name: "Redis Pub/Sub + SSE", category: "infra", reason: "분석 진행률은 서버에서 클라이언트로 가는 단방향 이벤트라 WebSocket 대신 SSE로 단순화했다." },
    { name: "Google Cloud Storage Signed URL", category: "infra", reason: "대용량 영상 바이너리가 WAS를 거치지 않게 해 서버 부하를 줄였다." },
    { name: "Python 3.11 + FastAPI", category: "ai", reason: "AI worker의 health/readiness와 장기 실행 stream consumer를 구성하기 위해 사용했다." },
    { name: "MediaPipe Pose", category: "ai", reason: "클라이밍 영상에서 33개 pose keypoint를 추출해 규칙 기반 기술 판정의 입력으로 사용했다." },
    { name: "OpenCV + Optical Flow", category: "ai", reason: "dynamic/static 영상 단위 보정을 위한 flow feature를 추출했다." },
    { name: "RandomForest flow gate", category: "ai", reason: "규칙 기반 segment 결과의 약한 dynamic 오탐을 영상 단위 prior로 보정하기 위해 사용했다." },
    { name: "JUnit 5 + Testcontainers", category: "test", reason: "PostgreSQL/Redis까지 실제 컨테이너로 띄워 통합 테스트 재현성을 확보했다." },
    { name: "pytest + ruff + mypy", category: "test", reason: "Python AI worker의 계약, Redis bus, callback, vision 유틸을 검증하기 위해 사용했다." }
  ],
  decisions: [
    {
      title: "GCS Signed URL 직접 업로드",
      decision: "백엔드는 업로드 URL과 메타데이터만 다루고 영상 바이너리는 클라이언트가 GCS에 직접 PUT한다.",
      reason: "영상이 수십~수백 MB라 WAS 대역폭과 스레드가 영상 트래픽에 묶이는 것을 피해야 했다.",
      alternatives: ["백엔드 multipart proxy", "업로드 전담 서비스 분리"],
      tradeOff: "서버 부하는 줄지만 GCS CORS, 만료 시간, object path 검증, 업로드 완료 후 메타데이터 정합을 신경 써야 한다.",
      verification: "GCS Signed URL double slash 회귀 테스트와 운영 upload path 검증을 수행한다."
    },
    {
      title: "Redis Streams 기반 AI dispatch",
      decision: "Kafka를 새로 도입하지 않고 Redis Streams로 AI 분석 작업 큐를 구성한다.",
      reason: "JWT 블랙리스트와 진행 버스에 Redis가 이미 필요했고, 1인 운영 부담상 신규 인프라를 줄이는 편이 맞았다.",
      alternatives: ["Kafka", "RabbitMQ", "HTTP direct call"],
      tradeOff: "운영 단순성은 얻지만 Kafka 수준의 생태계와 장기 보관/관측성은 약하다.",
      verification: "Spring -> Redis Stream -> AI worker -> Spring callback -> SSE E2E smoke를 통과시킨다."
    },
    {
      title: "MyBatis over JPA",
      decision: "ORM 영속성 컨텍스트보다 SQL 제어가 중요한 도메인이라 MyBatis를 선택한다.",
      reason: "추천, 통계, 차단, cursor pagination, pgvector 거리 정렬처럼 native SQL이 핵심인 API가 많았다.",
      alternatives: ["Spring Data JPA", "JPA + native query 혼용"],
      tradeOff: "SQL 명시성과 성능 제어는 좋아지지만 반복 mapping 코드와 mapper 테스트 부담이 생긴다.",
      verification: "Mapper/Integration 테스트와 SQL explain evidence로 주요 조회 성능을 확인한다."
    }
  ],
  problems: [
    {
      title: "추천 피드 tail latency와 signed URL 병목",
      problem: "추천 피드 성능 테스트에서 SQL 병목을 줄인 뒤에도 API p95가 목표보다 높게 남았다.",
      approach: "k6, SQL explain, presentation evidence를 분리해 DB와 API 레이어를 따로 해석했다.",
      cause: "추천 피드 응답마다 streamUrl과 thumbnailUrl signed URL을 반복 생성하는 비용이 컸다.",
      solution: "추천 피드에서는 streamUrl을 제거하고, 썸네일은 public GCS bucket URL로 제공했다. cursor page는 Redis snapshot으로 ranking SQL 재계산을 피했다.",
      result: "baseline 대비 current p95와 cursor page p95가 개선되었고, cursor aggregate p95는 약 9.8ms 수준으로 측정되었다."
    },
    {
      title: "AI worker callback 계약 정합",
      problem: "Spring과 Python 워커가 분석 결과 shape, snake_case/camelCase, dynamic/static 필드를 다르게 이해할 위험이 있었다.",
      approach: "Spring API 명세를 SSOT로 두고 워커 DTO와 callback body를 맞췄다.",
      cause: "두 런타임이 같은 도메인 결과를 서로 다른 타입 시스템과 naming convention으로 다뤘다.",
      solution: "top-level techniques, is_dynamic, dynamic_probability를 callback payload에 명시하고 Notion/API 명세와 테스트를 갱신했다.",
      result: "Spring targeted tests, AI pytest subset, local E2E에서 callback 저장과 조회 응답 정합을 검증했다."
    }
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
      "optical flow 기반 영상 단위 dynamic/static feature 추출"
    ],
    dataCharacteristics: [
      "클라이밍 영상은 촬영 각도, 루트, 동작 속도 차이가 크다.",
      "정적 자세에서도 keypoint jitter가 발생해 coordination false positive가 생길 수 있다.",
      "동작 라벨은 하이스텝, 플래깅, 훅, 락오프, 다이노, 코디네이션 중심으로 관리한다."
    ],
    selectedModelReason: "Frozen video encoder 실험은 기준을 넘지 못했고 새 오답 비용이 컸다. MVP에서는 설명 가능하고 디버깅 가능한 규칙 기반 판정에 flow RF 보정을 붙이는 방식이 더 현실적이었다.",
    resultDrivenImprovements: [
      "coordination one-hit false positive를 active frame ratio와 same-frame 동시 이동 조건으로 줄였다.",
      "flagging/hook 오탐을 rule_v3로 조정했다.",
      "flow RF는 dynamic/static 영상 단위 prior로 약한 dynamic segment만 보정하도록 제한했다."
    ]
  },
  metrics: [
    { label: "추천 피드 HTTP p95", before: "251.233ms", after: "122.642ms", note: "local-baseline 대비 current 측정. 같은 조건 반복 측정 결과로만 최종 문구 확정." },
    { label: "추천 피드 SQL execution", before: "181.086ms", after: "80.966ms", note: "temp blocks written 9,138 -> 0." },
    { label: "cursor aggregate p95", value: "9.794ms", note: "Redis snapshot cursor cache 적용 후 2~3페이지 호출 기준." },
    { label: "AI worker model version", value: "rule_v3+flow_rf_v2", note: "flow gate on일 때 top-level dynamicProbability와 isDynamic을 callback." }
  ],
  visuals: [
    { kind: "architecture", title: "Backend/AI Architecture", src: "/assets/projects/hola-climbing/architecture.svg", caption: "GCS direct upload, Redis Streams, AI worker, Spring callback, SSE 흐름", highlight: "Minjoun 담당: Spring backend, Redis dispatch, AI worker pipeline" },
    { kind: "erd", title: "ERD", src: "/assets/projects/hola-climbing/erd.png", caption: "회원, 영상, 암장, 분석, 추천, 기록 도메인 관계" },
    { kind: "ai-chart", title: "AI Flow Sample", src: "/assets/projects/hola-climbing/ai-flow-sample.png", caption: "Optical flow 기반 dynamic/static feature 시각 자료" },
    { kind: "performance", title: "Recommendation Performance Summary", src: "/assets/projects/hola-climbing/performance/01-after-summary-card.png", caption: "추천 피드 성능 테스트 요약" },
    { kind: "performance", title: "Cursor Cache Comparison", src: "/assets/projects/hola-climbing/performance/06-after-cursor-cache-comparison.png", caption: "snapshot 이후 cursor page 성능 비교" }
  ],
  retrospective: {
    learned: [
      "백엔드와 AI worker처럼 런타임이 다른 시스템은 메시지 큐와 결과 callback을 분리해야 안정적이다.",
      "큰 바이너리는 애플리케이션 서버를 우회시키는 설계가 운영 부담을 크게 줄인다.",
      "포트폴리오용 성능 주장은 raw evidence와 사람이 읽는 presentation evidence를 함께 남겨야 설득력이 생긴다."
    ],
    regrets: [
      "Kafka와 Redis Streams를 사전에 실측 비교하지 못했다.",
      "pgvector 인덱스 전략은 데이터가 더 쌓인 뒤 결정해야 해서 아직 확정하지 못했다.",
      "멀티 노드 STOMP/SSE fan-out은 현재 단일 노드 가정 밖의 과제로 남아 있다."
    ],
    improvements: [
      "성능 테스트는 같은 조건으로 3회 이상 반복 측정해 최종 수치로 고정한다.",
      "AI 모델은 post-MVP에서 fine-tuning 또는 재촬영 UX와 함께 재평가한다.",
      "발표용 아키텍처 도식에는 담당 영역을 명확히 하이라이트한다."
    ],
    collaboration: "프론트 담당자와 API 명세, OAuth callback, 영상 업로드 완료 후 메타데이터 등록, 분석 상태 vocabulary를 맞추며 협업했다."
  },
  star: [
    {
      title: "대용량 영상 업로드와 AI 분석 파이프라인",
      situation: "클라이밍 영상은 수십~수백 MB이고 AI 분석은 오래 걸리는 작업이라 단순 request/response로 처리하면 서버와 사용자 경험이 모두 흔들릴 수 있었다.",
      action: "GCS Signed URL로 영상 업로드를 서버에서 분리하고, Redis Streams + Pub/Sub + SSE로 분석 요청/진행률/결과 저장을 분리했다.",
      result: "서버는 메타데이터와 계약을 관리하고, 영상 바이너리와 장기 실행 AI 작업은 독립 흐름으로 처리하게 되었다.",
      learning: "운영 부담을 줄이는 설계는 기술을 더 붙이는 것보다 책임 경계를 정확히 나누는 데서 시작한다."
    }
  ],
  links: [
    { label: "GitHub Backend", url: "https://github.com/UncleSamsun/hola-climbing-server", external: true },
    { label: "GitHub AI", url: "https://github.com/UncleSamsun/hola-climbing-ai", external: true }
  ]
};
```

## Task 1: Scaffold Astro + React

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/env.d.ts`
- Move later: `CNAME`, `robots.txt`, `sitemap.xml`, `assets/*` into `public/`

- [ ] **Step 1: Create `package.json`**

Use this exact package shape:

```json
{
  "scripts": {
    "dev": "astro dev --host 127.0.0.1",
    "build": "astro check && astro build",
    "preview": "astro preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "check": "astro check && vitest run"
  },
  "dependencies": {
    "@astrojs/react": "^4.3.0",
    "astro": "^5.10.0",
    "lucide-react": "^0.468.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.4",
    "@playwright/test": "^1.53.0",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "typescript": "^5.8.3",
    "vitest": "^3.2.4"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run:

```bash
npm install
```

Expected:

- `package-lock.json` is created.
- `node_modules/` is not committed.

- [ ] **Step 3: Create `astro.config.mjs`**

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  site: "https://unclesamsun.github.io",
  output: "static",
});
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

- [ ] **Step 5: Create `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

- [ ] **Step 6: Build smoke**

Run:

```bash
npm run build
```

Expected at this point:

- It may fail if no page exists yet.
- If it fails only because pages are missing, proceed to Task 5.
- If it fails because dependency install failed, stop and fix package setup.

- [ ] **Step 7: Commit scaffold**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/env.d.ts
git commit -m "chore: scaffold astro react portfolio"
```

## Task 2: Vendor Portello Design System

**Files:**
- Create: `src/design-system/portello/**`
- Source: `/Users/minjoun/Downloads/Design System`

- [ ] **Step 1: Copy token files**

Run:

```bash
mkdir -p src/design-system/portello/tokens
cp "/Users/minjoun/Downloads/Design System/tokens/fonts.css" src/design-system/portello/tokens/fonts.css
cp "/Users/minjoun/Downloads/Design System/tokens/colors.css" src/design-system/portello/tokens/colors.css
cp "/Users/minjoun/Downloads/Design System/tokens/typography.css" src/design-system/portello/tokens/typography.css
cp "/Users/minjoun/Downloads/Design System/tokens/spacing.css" src/design-system/portello/tokens/spacing.css
cp "/Users/minjoun/Downloads/Design System/tokens/base.css" src/design-system/portello/tokens/base.css
```

- [ ] **Step 2: Create `src/design-system/portello/styles.css`**

```css
@import "./tokens/fonts.css";
@import "./tokens/colors.css";
@import "./tokens/typography.css";
@import "./tokens/spacing.css";
@import "./tokens/base.css";
```

- [ ] **Step 3: Convert Portello JSX primitives to TSX**

Copy these files from `/Users/minjoun/Downloads/Design System/components` and convert `import React from 'react';` to standard TSX. Keep behavior, remove CDN assumptions.

```text
components/core/Button.jsx -> src/design-system/portello/components/Button.tsx
components/core/Badge.jsx -> src/design-system/portello/components/Badge.tsx
components/core/Card.jsx -> src/design-system/portello/components/Card.tsx
components/display/CodeBlock.jsx -> src/design-system/portello/components/CodeBlock.tsx
components/display/Terminal.jsx -> src/design-system/portello/components/Terminal.tsx
components/navigation/FileTreeItem.jsx -> src/design-system/portello/components/FileTreeItem.tsx
components/navigation/StatusBarItem.jsx -> src/design-system/portello/components/StatusBarItem.tsx
components/navigation/Tab.jsx -> src/design-system/portello/components/Tab.tsx
```

Use `lucide-react` imports instead of `<i data-lucide>`.

- [ ] **Step 4: Create `src/design-system/portello/components/index.ts`**

```ts
export { Badge } from "./Badge";
export { Button } from "./Button";
export { Card } from "./Card";
export { CodeBlock } from "./CodeBlock";
export { FileTreeItem } from "./FileTreeItem";
export { StatusBarItem } from "./StatusBarItem";
export { Tab } from "./Tab";
export { Terminal } from "./Terminal";
```

- [ ] **Step 5: Add Portello README**

Create `src/design-system/portello/README.md` with these rules:

```md
# Portello Internal Design System

Portello is the IDE/terminal visual system used by this portfolio.

## Boundaries

- This folder contains reusable design tokens and primitive UI components.
- This folder must not contain Minjoun-specific project data.
- Portfolio-specific composition belongs in `src/components/portfolio`.
- Portfolio content belongs in `src/data`.

## Typography

- IDE chrome, file names, code blocks, terminal prompts: JetBrains Mono.
- Long Korean reading text: gothic/system Korean stack through `--font-korean`.

## Iconography

Production code uses `lucide-react`. The original design-system demo used Lucide CDN and Babel; those are not used here.
```

- [ ] **Step 6: Type check**

Run:

```bash
npm run build
```

Expected:

- Type errors in converted components are fixed before moving on.

- [ ] **Step 7: Commit design system vendor**

```bash
git add src/design-system/portello
git commit -m "feat: vendor portello design system"
```

## Task 3: Move Static Assets Into Public

**Files:**
- Create/modify: `public/CNAME`
- Create/modify: `public/robots.txt`
- Create/modify: `public/sitemap.xml`
- Create/modify: `public/assets/favicon.svg`
- Create/modify: `public/assets/og-image.svg`
- Create: `public/assets/projects/hola-climbing/**`

- [ ] **Step 1: Copy existing public assets**

Run:

```bash
mkdir -p public/assets
cp CNAME public/CNAME
cp robots.txt public/robots.txt
cp sitemap.xml public/sitemap.xml
cp assets/favicon.svg public/assets/favicon.svg
cp assets/og-image.svg public/assets/og-image.svg
```

- [ ] **Step 2: Copy Hola visual assets**

Run:

```bash
mkdir -p public/assets/projects/hola-climbing/performance
cp /Users/minjoun/Workspace/projects/Hola-Climbing/temp/climbing_app_architecture.svg public/assets/projects/hola-climbing/architecture.svg
cp /Users/minjoun/Workspace/projects/Hola-Climbing/erd/hola_climbing_erd.png public/assets/projects/hola-climbing/erd.png
cp /Users/minjoun/Workspace/projects/Hola-Climbing/hola_ind/flow_output/IMG_0041_flow.png public/assets/projects/hola-climbing/ai-flow-sample.png
cp /Users/minjoun/Documents/DevKnowledge/30_Decisions/Hola-Climbing/assets/recommendation-feed-performance/01-after-summary-card.png public/assets/projects/hola-climbing/performance/01-after-summary-card.png
cp /Users/minjoun/Documents/DevKnowledge/30_Decisions/Hola-Climbing/assets/recommendation-feed-performance/02-after-sql-bottleneck.png public/assets/projects/hola-climbing/performance/02-after-sql-bottleneck.png
cp /Users/minjoun/Documents/DevKnowledge/30_Decisions/Hola-Climbing/assets/recommendation-feed-performance/03-after-k6-result-interpretation.png public/assets/projects/hola-climbing/performance/03-after-k6-result-interpretation.png
cp /Users/minjoun/Documents/DevKnowledge/30_Decisions/Hola-Climbing/assets/recommendation-feed-performance/04-after-before-after-template.png public/assets/projects/hola-climbing/performance/04-after-before-after-template.png
cp /Users/minjoun/Documents/DevKnowledge/30_Decisions/Hola-Climbing/assets/recommendation-feed-performance/05-after-code-change-template.png public/assets/projects/hola-climbing/performance/05-after-code-change-template.png
cp /Users/minjoun/Documents/DevKnowledge/30_Decisions/Hola-Climbing/assets/recommendation-feed-performance/06-after-cursor-cache-comparison.png public/assets/projects/hola-climbing/performance/06-after-cursor-cache-comparison.png
```

- [ ] **Step 3: Verify asset paths**

Run:

```bash
find public/assets/projects/hola-climbing -maxdepth 3 -type f -print
```

Expected output includes:

```text
public/assets/projects/hola-climbing/architecture.svg
public/assets/projects/hola-climbing/erd.png
public/assets/projects/hola-climbing/ai-flow-sample.png
public/assets/projects/hola-climbing/performance/01-after-summary-card.png
public/assets/projects/hola-climbing/performance/06-after-cursor-cache-comparison.png
```

- [ ] **Step 4: Commit asset migration**

```bash
git add public
git commit -m "chore: move portfolio assets to public"
```

## Task 4: Define Data Schema And Helpers

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/profile.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/navigation.ts`
- Create: `src/lib/tech.ts`
- Create: `src/lib/portfolio.ts`
- Create: `tests/tech.test.ts`
- Create: `tests/portfolio-data.test.ts`

- [ ] **Step 1: Add `src/data/types.ts`**

Use the exact interfaces from the "Data Model" section above.

- [ ] **Step 2: Add `src/lib/tech.ts`**

```ts
import type { TechItem } from "@/data/types";

const visibleCategories = new Set(["backend", "ai", "data", "infra", "test", "docs"]);

export function getVisibleTechStack(items: TechItem[]): TechItem[] {
  return items.filter((item) => visibleCategories.has(item.category));
}

export function groupTechByCategory(items: TechItem[]): Record<string, TechItem[]> {
  return getVisibleTechStack(items).reduce<Record<string, TechItem[]>>((groups, item) => {
    groups[item.category] = groups[item.category] ?? [];
    groups[item.category].push(item);
    return groups;
  }, {});
}
```

- [ ] **Step 3: Add `tests/tech.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { getVisibleTechStack, groupTechByCategory } from "@/lib/tech";
import type { TechItem } from "@/data/types";

describe("tech helpers", () => {
  it("keeps only backend and AI portfolio categories", () => {
    const items = [
      { name: "Spring Boot", category: "backend" },
      { name: "MediaPipe Pose", category: "ai" },
      { name: "Vue 3", category: "frontend" as never },
    ] satisfies TechItem[];

    expect(getVisibleTechStack(items).map((item) => item.name)).toEqual([
      "Spring Boot",
      "MediaPipe Pose",
    ]);
  });

  it("groups visible technologies by category", () => {
    const grouped = groupTechByCategory([
      { name: "Spring Boot", category: "backend" },
      { name: "Redis Streams", category: "infra" },
    ]);

    expect(grouped.backend.map((item) => item.name)).toEqual(["Spring Boot"]);
    expect(grouped.infra.map((item) => item.name)).toEqual(["Redis Streams"]);
  });
});
```

- [ ] **Step 4: Add `src/lib/portfolio.ts`**

```ts
import { projects } from "@/data/projects";

export function getProjectsByPriority() {
  return [...projects].sort((a, b) => a.priority - b.priority);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}
```

- [ ] **Step 5: Add `tests/portfolio-data.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { getProjectBySlug, getProjectsByPriority } from "@/lib/portfolio";

describe("portfolio project data", () => {
  it("includes Hola Climbing as the first project", () => {
    const [first] = getProjectsByPriority();

    expect(first.slug).toBe("hola-climbing");
  });

  it("includes every required attachment checklist section", () => {
    for (const project of projects) {
      expect(project.common.purpose).not.toHaveLength(0);
      expect(project.common.goal).not.toHaveLength(0);
      expect(project.common.developmentIssue).not.toHaveLength(0);
      expect(project.common.results.length).toBeGreaterThan(0);
      expect(project.role.contribution).not.toHaveLength(0);
      expect(project.role.implementedFeatures.length).toBeGreaterThan(0);
      expect(project.decisions.length).toBeGreaterThan(0);
      expect(project.problems.length).toBeGreaterThan(0);
      expect(project.retrospective.learned.length).toBeGreaterThan(0);
      expect(project.retrospective.regrets.length).toBeGreaterThan(0);
      expect(project.star.length).toBeGreaterThan(0);
    }
  });

  it("resolves project by slug", () => {
    expect(getProjectBySlug("hola-climbing")?.name).toBe("Hola Climbing");
  });
});
```

- [ ] **Step 6: Create `src/data/profile.ts`**

Move profile, education, career, contact from current `assets/projects.js`. Keep Korean text and current email/GitHub. Use this export shape:

```ts
export const profile = {
  name: "김민준",
  role: "Backend Developer",
  email: "alswns5620@naver.com",
  phone: "010-9229-1802",
  github: "https://github.com/UncleSamsun",
  headline: "검증 가능한 구조와 안정적인 흐름을 만드는 백엔드 개발자",
  intro:
    "Java와 Spring Boot 기반 백엔드를 중심으로 인증, 데이터 처리, Redis, 테스트, 모니터링을 다룹니다. AI 파이프라인과 백엔드 시스템의 경계를 명확히 나누고, 운영에서 설명 가능한 구조를 만드는 데 집중합니다.",
};
```

- [ ] **Step 7: Create `src/data/projects.ts`**

Include `holaClimbingProject` from the baseline above and migrate the four existing projects from `assets/projects.js`.

For existing projects:

- Keep factual project name, period, team, summary, role, problem-solving, validation, results.
- Convert `stack` into `tech: TechItem[]`.
- Remove frontend-only stacks from visible `tech`.
- Add missing checklist fields by using existing overview/role/problem/validation text.
- Add at least one `StarStory` per project using Situation - Action - Result - Learning.

Minimum project order:

```ts
export const projects: PortfolioProject[] = [
  holaClimbingProject,
  cafeGamsugwangProject,
  jsonstoreProject,
  readAndShareProject,
  theLastSupperProject,
];
```

- [ ] **Step 8: Run tests**

```bash
npm test
```

Expected:

- `tech.test.ts` passes.
- `portfolio-data.test.ts` passes after all projects have required fields.

- [ ] **Step 9: Commit data layer**

```bash
git add src/data src/lib tests/tech.test.ts tests/portfolio-data.test.ts
git commit -m "feat: model backend ai portfolio data"
```

## Task 5: Build Astro Layout And Routes

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/pages/index.astro`
- Create: `src/pages/projects/[slug].astro`
- Create: `src/pages/projects/[...not-found].astro`
- Create: `src/styles/portfolio.css`

- [ ] **Step 1: Create `BaseLayout.astro`**

Responsibilities:

- import Portello CSS and portfolio CSS
- set Korean lang
- set title, description, canonical, favicon, OG image
- provide skip link

Required imports:

```astro
---
import "@/design-system/portello/styles.css";
import "@/styles/portfolio.css";

interface Props {
  title: string;
  description: string;
  canonical?: string;
}

const { title, description, canonical = "https://unclesamsun.github.io/" } = Astro.props;
---
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="author" content="김민준" />
    <meta name="theme-color" content="#1e1e2e" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="https://unclesamsun.github.io/assets/og-image.svg" />
    <link rel="canonical" href={canonical} />
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    <title>{title}</title>
  </head>
  <body>
    <a class="skip-link" href="#main">본문으로 바로가기</a>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Create `src/styles/portfolio.css`**

Must include gothic Korean body font stack:

```css
:root {
  --font-korean: "Pretendard", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", system-ui, sans-serif;
}

body {
  min-width: 320px;
  overflow-x: hidden;
}

.portfolio-reading,
.portfolio-reading p,
.portfolio-reading li {
  font-family: var(--font-korean);
  letter-spacing: 0;
  word-break: keep-all;
}

.skip-link {
  background: var(--accent);
  color: var(--accent-on);
  left: 12px;
  padding: 8px 12px;
  position: fixed;
  top: 12px;
  transform: translateY(-140%);
  transition: transform var(--dur-fast) var(--ease-standard);
  z-index: var(--z-modal);
}

.skip-link:focus {
  transform: translateY(0);
}
```

- [ ] **Step 3: Create `src/pages/index.astro`**

Use `IDEWindow` as a React island:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import { IDEWindow } from "@/components/portfolio/IDEWindow";
import { profile } from "@/data/profile";
import { getProjectsByPriority } from "@/lib/portfolio";

const projects = getProjectsByPriority();
---
<BaseLayout
  title="김민준 | Backend & AI Portfolio"
  description="백엔드와 AI 파이프라인을 연결하는 개발자 김민준의 포트폴리오"
>
  <main id="main">
    <IDEWindow client:load profile={profile} projects={projects} />
  </main>
</BaseLayout>
```

- [ ] **Step 4: Create `src/pages/projects/[slug].astro`**

Use static route generation:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import { ProjectDetail } from "@/components/portfolio/ProjectDetail";
import { getProjectBySlug, getProjectSlugs } from "@/lib/portfolio";

export function getStaticPaths() {
  return getProjectSlugs().map((slug) => ({ params: { slug } }));
}

const project = getProjectBySlug(Astro.params.slug ?? "");

if (!project) {
  return Astro.redirect("/");
}
---
<BaseLayout
  title={`${project.name} | 김민준 Portfolio`}
  description={project.summary}
  canonical={`https://unclesamsun.github.io/projects/${project.slug}/`}
>
  <main id="main">
    <ProjectDetail project={project} />
  </main>
</BaseLayout>
```

- [ ] **Step 5: Build route smoke**

```bash
npm run build
```

Expected:

- `dist/index.html` exists.
- `dist/projects/hola-climbing/index.html` exists.
- `dist/CNAME` exists.

- [ ] **Step 6: Commit routes**

```bash
git add src/layouts src/pages src/styles
git commit -m "feat: add astro portfolio routes"
```

## Task 6: Build Portfolio React Components

**Files:**
- Create: `src/components/portfolio/IDEWindow.tsx`
- Create: `src/components/portfolio/ActivityBar.tsx`
- Create: `src/components/portfolio/Explorer.tsx`
- Create: `src/components/portfolio/EditorTabs.tsx`
- Create: `src/components/portfolio/EditorPane.tsx`
- Create: `src/components/portfolio/TerminalPanel.tsx`
- Create: `src/components/portfolio/ProjectCard.tsx`
- Create: `src/components/portfolio/ProjectDetail.tsx`
- Create: `src/components/portfolio/ProjectEvidence.tsx`
- Create: `src/components/portfolio/ArchitectureDiagram.tsx`
- Create: `src/components/portfolio/CodeLikeSection.tsx`

- [ ] **Step 1: Implement `IDEWindow.tsx`**

Responsibilities:

- Hold active file state.
- Render VS Code-like title bar, activity bar, explorer, tabs, editor pane, terminal, status bar.
- Default active file: `README.md`.

Required file model:

```ts
const files = [
  { id: "README.md", folder: "ABOUT", label: "README.md", view: "about" },
  { id: "Projects/hola-climbing.md", folder: "PROJECTS", label: "hola-climbing.md", view: "project", slug: "hola-climbing" },
  { id: "Projects/cafe-gamsugwang.md", folder: "PROJECTS", label: "cafe-gamsugwang.md", view: "project", slug: "cafe-gamsugwang" },
  { id: "Projects/jsonstore.md", folder: "PROJECTS", label: "jsonstore.md", view: "project", slug: "jsonstore" },
  { id: "Projects/readandshare.md", folder: "PROJECTS", label: "readandshare.md", view: "project", slug: "readandshare" },
  { id: "Projects/the-last-supper.md", folder: "PROJECTS", label: "the-last-supper.md", view: "project", slug: "the-last-supper" },
  { id: "Contact.txt", folder: "CONTACT", label: "Contact.txt", view: "contact" },
];
```

- [ ] **Step 2: Implement `Explorer.tsx`**

The explorer must show:

```text
PORTFOLIO
  ABOUT
    README.md
  PROJECTS
    hola-climbing.md
    cafe-gamsugwang.md
    jsonstore.md
    readandshare.md
    the-last-supper.md
  CONTACT
    Contact.txt
```

Clicking a file changes active editor view.

- [ ] **Step 3: Implement `EditorPane.tsx`**

Map active view:

- `about`: render profile headline, backend/AI focus, project cards.
- `project`: render compact project detail with checklist tabs.
- `contact`: render code-like contact JSON and links.

Project compact view must include these headings:

```text
// PROJECT RESULT
// ROLE AND CONTRIBUTION
// TECHNICAL DECISIONS
// PROBLEM SOLVING
// AI PIPELINE
// EVIDENCE
// RETROSPECTIVE
```

Hide `// AI PIPELINE` if `project.ai` is absent.

- [ ] **Step 4: Implement `ProjectDetail.tsx`**

Standalone detail page must render all attachment checklist sections:

1. `Project.java` style summary block:
   - project name
   - period/team
   - purpose/goal
   - development issue
   - result/outcomes
2. `Role.md`:
   - role/contribution
   - implemented features
   - personal achievements
3. `TechDecision.md`:
   - stack
   - reason
   - alternatives
   - trade-off
   - verification
4. `Problems.md`:
   - problem
   - approach
   - cause
   - solution
   - result
5. `AI.md`:
   - only if AI details exist
   - model/input/output/preprocessing/data characteristics/why selected/improvements
6. `Evidence/`:
   - architecture, ERD, flowchart, AI chart, performance images
   - highlight Minjoun-owned backend/AI parts in captions
7. `Retrospective.md`:
   - learned
   - regrets
   - improvements
   - collaboration
8. `STAR.md`:
   - Situation - Action - Result - Learning

- [ ] **Step 5: Implement `TerminalPanel.tsx`**

Supported commands:

```text
help
ls
cat Contact.txt
open README.md
open Projects/hola-climbing.md
whoami
neofetch
clear
```

Unknown command response:

```text
command not found: {command}
try: help
```

- [ ] **Step 6: Add `src/lib/terminal.ts` and tests**

`src/lib/terminal.ts`:

```ts
export type TerminalResult =
  | { type: "output"; lines: string[] }
  | { type: "open"; fileId: string; lines: string[] }
  | { type: "clear" };

export function runTerminalCommand(command: string): TerminalResult {
  const normalized = command.trim();

  if (normalized === "help") {
    return { type: "output", lines: ["help, ls, cat Contact.txt, open <file>, whoami, neofetch, clear"] };
  }

  if (normalized === "ls") {
    return { type: "output", lines: ["README.md", "Projects/", "Contact.txt"] };
  }

  if (normalized === "cat Contact.txt") {
    return {
      type: "output",
      lines: [
        "Email  : alswns5620@naver.com",
        "GitHub : github.com/UncleSamsun",
        "Role   : Backend Developer",
      ],
    };
  }

  if (normalized === "whoami") {
    return { type: "output", lines: ["김민준 - Backend Developer"] };
  }

  if (normalized === "neofetch") {
    return {
      type: "output",
      lines: [
        "System : portfolio",
        "Stack  : Java / Spring / Redis / AI pipeline",
        "Focus  : reliable backend systems",
      ],
    };
  }

  if (normalized === "clear") {
    return { type: "clear" };
  }

  if (normalized.startsWith("open ")) {
    return { type: "open", fileId: normalized.slice(5), lines: [`opened ${normalized.slice(5)}`] };
  }

  return { type: "output", lines: [`command not found: ${normalized}`, "try: help"] };
}
```

`tests/terminal.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { runTerminalCommand } from "@/lib/terminal";

describe("terminal commands", () => {
  it("opens files", () => {
    expect(runTerminalCommand("open Projects/hola-climbing.md")).toEqual({
      type: "open",
      fileId: "Projects/hola-climbing.md",
      lines: ["opened Projects/hola-climbing.md"],
    });
  });

  it("returns a friendly message for unknown commands", () => {
    expect(runTerminalCommand("deploy")).toEqual({
      type: "output",
      lines: ["command not found: deploy", "try: help"],
    });
  });
});
```

- [ ] **Step 7: Run unit tests**

```bash
npm test
```

Expected:

- terminal tests pass.
- data tests still pass.

- [ ] **Step 8: Commit React components**

```bash
git add src/components/portfolio src/lib/terminal.ts tests/terminal.test.ts
git commit -m "feat: build ide portfolio shell"
```

## Task 7: Visual Design And Responsive Behavior

**Files:**
- Modify: `src/styles/portfolio.css`
- Modify: `src/components/portfolio/*.tsx`

- [ ] **Step 1: Apply layout rules**

Desktop:

- full viewport IDE window
- activity bar 48px
- sidebar 260px
- editor fills remaining width
- terminal docked bottom or bottom-right
- status bar 24px

Mobile:

- hide activity bar labels
- explorer collapses above editor or into top drawer
- project detail sections stack
- terminal becomes a compact collapsible panel

- [ ] **Step 2: Use gothic Korean reading text**

Apply `.portfolio-reading` to:

- project problem descriptions
- decision trade-offs
- retrospective paragraphs
- STAR story text

Keep JetBrains Mono for:

- file names
- tabs
- terminal
- code-like JSON snippets

- [ ] **Step 3: Add visual evidence sizing**

Rules:

- Architecture/ERD images use `max-width: 100%`.
- Evidence cards maintain `aspect-ratio` where possible.
- Captions do not overlap images.
- Long Korean captions wrap inside the card.

- [ ] **Step 4: Build and inspect**

```bash
npm run build
```

Expected:

- no CSS or TypeScript errors.

- [ ] **Step 5: Commit visual polish**

```bash
git add src/styles src/components/portfolio
git commit -m "style: apply portello portfolio layout"
```

## Task 8: Playwright Visual QA

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/smoke.spec.ts`

- [ ] **Step 1: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://127.0.0.1:4321",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
});
```

- [ ] **Step 2: Create `tests/smoke.spec.ts`**

```ts
import { expect, test } from "@playwright/test";

test("home renders IDE shell and Hola project", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("PROJECTS")).toBeVisible();
  await expect(page.getByText("hola-climbing.md")).toBeVisible();
  await expect(page.getByText("Backend Developer")).toBeVisible();
});

test("hola detail route renders backend and AI content", async ({ page }) => {
  await page.goto("/projects/hola-climbing/");
  await expect(page.getByText("Hola Climbing")).toBeVisible();
  await expect(page.getByText("AI PIPELINE")).toBeVisible();
  await expect(page.getByText("GCS Signed URL")).toBeVisible();
  await expect(page.getByText("Redis Streams")).toBeVisible();
});

test("frontend-only stacks are not shown as project tech badges", async ({ page }) => {
  await page.goto("/projects/hola-climbing/");
  await expect(page.getByText("Vue 3")).toHaveCount(0);
  await expect(page.getByText("Capacitor")).toHaveCount(0);
});
```

- [ ] **Step 3: Run Playwright**

```bash
npm run test:e2e
```

Expected:

- desktop and mobile projects pass.

- [ ] **Step 4: Manual screenshot review**

Open local dev server and verify:

- no text overlaps
- project cards do not resize awkwardly
- Korean long text wraps cleanly
- evidence images are legible
- mobile view does not trap content off-screen

- [ ] **Step 5: Commit QA**

```bash
git add playwright.config.ts tests/smoke.spec.ts
git commit -m "test: add portfolio smoke coverage"
```

## Task 9: Retire Legacy Static Site

**Files:**
- Remove after verification: `index.html`, `styles.css`, `script.js`, `assets/projects.js`, `projects/*/index.html`
- Keep or move: `README.md`

- [ ] **Step 1: Build final site**

```bash
npm run build
```

Expected:

- `dist/index.html`
- `dist/projects/hola-climbing/index.html`
- `dist/projects/cafe-gamsugwang/index.html`
- `dist/projects/jsonstore/index.html`
- `dist/projects/readandshare/index.html`
- `dist/projects/the-last-supper/index.html`

- [ ] **Step 2: Remove legacy files with git**

Use `git rm`, not `rm -rf`:

```bash
git rm index.html styles.css script.js assets/projects.js
git rm projects/cafe-gamsugwang/index.html
git rm projects/jsonstore/index.html
git rm projects/readandshare/index.html
git rm projects/the-last-supper/index.html
```

Keep `assets/favicon.svg` and `assets/og-image.svg` only if they remain referenced outside Astro. Otherwise remove legacy `assets/` after confirming `public/assets` has replacements.

- [ ] **Step 3: Update `README.md`**

Update README to say:

- site is built with Astro + React
- Portello design system is vendored under `src/design-system/portello`
- local dev: `npm install`, `npm run dev`
- build: `npm run build`
- preview: `npm run preview`
- GitHub Pages serves static build output

- [ ] **Step 4: Commit legacy removal**

```bash
git add README.md
git commit -m "chore: retire legacy static portfolio"
```

## Task 10: Final Verification

**Files:**
- No new files expected unless fixing issues.

- [ ] **Step 1: Run full local checks**

```bash
npm run check
npm run build
npm run test:e2e
```

Expected:

- `astro check` passes.
- Vitest passes.
- Playwright passes.
- Astro build completes.

- [ ] **Step 2: Preview static output**

Run:

```bash
npm run preview
```

Open:

- `http://127.0.0.1:4321/`
- `http://127.0.0.1:4321/projects/hola-climbing/`
- `http://127.0.0.1:4321/projects/cafe-gamsugwang/`
- `http://127.0.0.1:4321/projects/jsonstore/`
- `http://127.0.0.1:4321/projects/readandshare/`
- `http://127.0.0.1:4321/projects/the-last-supper/`

Verify:

- all direct routes load
- terminal commands work
- evidence images load
- body text uses gothic Korean font stack
- code/terminal text uses mono font
- frontend-only tech stacks are absent from visible tech badges

- [ ] **Step 3: Git status check**

```bash
git status --short
```

Expected:

- only intended files modified or untracked.
- existing unrelated `.DS_Store`, `.idea/git_toolbox_prj.xml`, `AGENTS.md`, `CLAUDE.md` remain untouched unless explicitly handled in a separate cleanup.

- [ ] **Step 4: Commit final fixes**

```bash
git add .
git commit -m "feat: rebuild portfolio with portello astro"
```

## Task 11: Vault And Portfolio Memory Follow-Up

**Files outside this repo:**
- Suggest or create: `/Users/minjoun/Documents/DevKnowledge/50_SessionLogs/2026-06-20-unclesamsun-portfolio-redesign.md`
- Suggest or create: `/Users/minjoun/Documents/DevKnowledge/30_Decisions/2026-06-20-portello-astro-portfolio-architecture.md`

- [ ] **Step 1: Write session log**

Session log should include:

- goal: rebuild portfolio around Portello design system
- verified: Astro + React plan, Hola inclusion, backend/AI-only tech rule, attachment checklist mapping
- changed files: design spec and implementation plan
- next TODOs: implement plan task-by-task

- [ ] **Step 2: Write decision record**

Decision record should include:

- context: Portello package contains React components and UI kit, not just CSS
- decision: Astro + React, Portello under `src/design-system/portello`
- alternatives: static site, Vite SPA, Astro + React
- consequences: better routing/SEO/static Pages output, more setup complexity

## Self-Review

- Spec coverage: the plan covers Astro + React, Portello vendoring, GitHub Pages static output, route preservation, data migration, backend/AI-only stack filtering, Hola Climbing inclusion, visual evidence, and checklist-driven project detail sections.
- Attachment coverage: common result checklist, personal role checklist, interview-prep sections, AI chart/model/input/output/preprocessing, architecture/ERD/flow captures, gothic Korean body font, and STAR troubleshooting are all mapped to data fields and UI sections.
- Placeholder scan: the plan avoids `TBD` and requires concrete fields for every project. Existing four project contents are migrated from the current repository, while Hola has a concrete baseline object.
- Type consistency: `PortfolioProject`, `TechItem`, `AiPortfolioDetail`, helpers, and tests use the same property names.
