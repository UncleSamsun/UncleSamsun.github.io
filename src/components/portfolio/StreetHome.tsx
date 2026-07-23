import { useEffect, useMemo, useRef, useState } from "react";
import type { PortfolioProject } from "@/data/types";

interface StreetHomeProps {
  profile: {
    name: string;
    role: string;
    email: string;
    phone: string;
    github: string;
    skillGroups: { title: string; items: string[] }[];
  };
  projects: PortfolioProject[];
}

type WorldScene = "room" | "street" | "contact";
type RoomFocus = "intro" | "skills" | "door";
type TransitionPhase = "idle" | "leaving" | "entering";

const roomWorld = "/assets/home/minjoun-home-world.png";
const doorbellWorld = "/assets/home/minjoun-home-doorbell.png";
const projectStreetOrder = [
  "hola-climbing",
  "cafe-gamsugwang",
  "the-last-supper",
  "readandshare",
  "jsonstore",
];

const roomStops: RoomFocus[] = ["intro", "skills", "door"];
const roomSkillGroups = [
  { title: "Backend", items: ["Java", "Spring Boot", "Security", "Redis"] },
  { title: "AI / Data", items: ["Python", "FastAPI", "MediaPipe", "pgvector"] },
  { title: "Platform", items: ["Docker", "AWS", "GCS", "Prometheus"] },
  { title: "Quality", items: ["JUnit", "Testcontainers", "pytest", "Swagger"] },
] as const;

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function StreetHome({ profile, projects }: StreetHomeProps) {
  const [scene, setScene] = useState<WorldScene>("room");
  const [roomFocus, setRoomFocus] = useState<RoomFocus>("intro");
  const [streetShop, setStreetShop] = useState<string | null>(null);
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>("idle");
  const streetFrame = useRef<HTMLIFrameElement>(null);
  const transitionTimer = useRef<number | undefined>(undefined);
  const transitionLocked = useRef(false);
  const pendingTransition = useRef<{ scene: WorldScene; streetShop: string | null } | null>(null);

  const projectByStreetIndex = useMemo(
    () => projectStreetOrder.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean) as PortfolioProject[],
    [projects],
  );

  const transitionToScene = (nextScene: WorldScene, nextStreetShop: string | null = null) => {
    if (transitionLocked.current) {
      pendingTransition.current = { scene: nextScene, streetShop: nextStreetShop };
      return;
    }

    transitionLocked.current = true;
    setTransitionPhase("leaving");
    transitionTimer.current = window.setTimeout(() => {
      if (nextScene === "street") setStreetShop(nextStreetShop);
      setScene(nextScene);
      setTransitionPhase("entering");
      transitionTimer.current = window.setTimeout(() => {
        setTransitionPhase("idle");
        transitionLocked.current = false;
        const queuedTransition = pendingTransition.current;
        pendingTransition.current = null;
        if (queuedTransition) transitionToScene(queuedTransition.scene, queuedTransition.streetShop);
      }, 120);
    }, 280);
  };

  const enterStreet = () => transitionToScene("street");
  const enterContact = () => transitionToScene("contact");
  const returnRoom = () => {
    window.history.replaceState(window.history.state, "", "/");
    setRoomFocus("intro");
    transitionToScene("room");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedScene = params.get("scene");
    const requestedShop = params.get("shop");

    if (requestedScene === "street") {
      setStreetShop(requestedShop && projectStreetOrder.includes(requestedShop) ? requestedShop : null);
      setScene("street");
    }
    if (requestedScene === "contact") setScene("contact");
  }, []);

  useEffect(() => () => window.clearTimeout(transitionTimer.current), []);

  useEffect(() => {
    const onMessage = (event: MessageEvent<{ type?: string; index?: number }>) => {
      if (event.origin !== window.location.origin || !event.data?.type) return;

      if (event.data.type === "minjoun-street:enter") {
        const project = projectByStreetIndex[event.data.index ?? -1];
        if (project) {
          window.history.replaceState(window.history.state, "", `/?scene=street&shop=${project.slug}`);
          window.location.assign(`/projects/${project.slug}/?from=street`);
        }
      }

      if (event.data.type === "minjoun-street:leave") enterContact();
      if (event.data.type === "minjoun-street:return") returnRoom();
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [projectByStreetIndex]);

  useEffect(() => {
    if (scene !== "room") return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select")) return;

      const currentIndex = roomStops.indexOf(roomFocus);
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        setRoomFocus(roomStops[Math.min(currentIndex + 1, roomStops.length - 1)]);
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        setRoomFocus(roomStops[Math.max(currentIndex - 1, 0)]);
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (roomFocus === "door") enterStreet();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [roomFocus, scene]);

  useEffect(() => {
    if (scene !== "street") return;
    const focusStreet = window.setTimeout(() => streetFrame.current?.focus(), 80);
    return () => window.clearTimeout(focusStreet);
  }, [scene]);

  useEffect(() => {
    if (scene !== "contact") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "ArrowLeft") {
        event.preventDefault();
        transitionToScene("street", projectStreetOrder[projectStreetOrder.length - 1]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scene]);

  return (
    <div className={`portfolio-world portfolio-world--${scene} portfolio-world--phase-${transitionPhase} portfolio-world--focus-${roomFocus}`}>
      <h1 className="world-sr-only">김민준의 인터랙티브 포트폴리오</h1>
      <div className="world-transition-veil" aria-hidden="true" />

      {scene === "room" && (
        <section className="world-room" aria-label="김민준의 작업실">
          <div className="world-room-art" style={{ backgroundImage: `url(${roomWorld})` }} aria-hidden="true" />
          <div className="world-room-vignette" aria-hidden="true" />

          <button
            className="world-hotspot world-hotspot--desk"
            type="button"
            aria-label="소개 보기"
            onClick={() => setRoomFocus("intro")}
          />
          <button
            className="world-hotspot world-hotspot--shelf"
            type="button"
            aria-label="스킬 보기"
            onClick={() => setRoomFocus("skills")}
          />
          <button
            className="world-hotspot world-hotspot--door"
            type="button"
            aria-label="프로젝트 둘러보기"
            onClick={enterStreet}
          />

          <div className={`world-room-copy world-room-copy--intro${roomFocus === "intro" ? " is-visible" : ""}`}>
            <p>BACKEND DEVELOPER / {profile.name}</p>
            <h2>AI를 서비스로.</h2>
            <span>AI PIPELINES · BACKEND SYSTEMS</span>
          </div>

          <div className={`world-room-copy world-room-copy--skills${roomFocus === "skills" ? " is-visible" : ""}`}>
            <p>BOOKSHELF / SKILLS</p>
            <h2>직접 쓰는 기술.</h2>
            <dl>
              {roomSkillGroups.map((group) => (
                <div key={group.title}>
                  <dt>{group.title}</dt>
                  <dd>{group.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={`world-room-copy world-room-copy--door${roomFocus === "door" ? " is-visible" : ""}`}>
            <p>FRONT DOOR</p>
            <h2>프로젝트로.</h2>
            <button type="button" onClick={enterStreet}>거리로 나가기 <span aria-hidden="true">→</span></button>
          </div>
        </section>
      )}

      {scene === "street" && (
        <section className="world-street" aria-label="MINJOON ST. 프로젝트 거리">
          <iframe
            ref={streetFrame}
            className="world-street-frame"
            src={`/minjoun-street.html?world=1${streetShop ? `&shop=${encodeURIComponent(streetShop)}` : ""}`}
            title="MINJOON ST. 프로젝트 거리"
            tabIndex={0}
          />
          <nav className="world-sr-only" aria-label="프로젝트 바로가기">
            <a href="/">작업실로 돌아가기</a>
            {projectByStreetIndex.map((project) => <a key={project.slug} href={`/projects/${project.slug}/?from=street`}>{project.name}</a>)}
          </nav>
        </section>
      )}

      {scene === "contact" && (
        <section className="world-contact" aria-label="김민준의 집 앞">
          <div className="world-contact-art" style={{ backgroundImage: `url(${doorbellWorld})` }} aria-hidden="true" />
          <button
            className="world-hotspot world-hotspot--return-door"
            type="button"
            aria-label="문 안으로 들어가 작업실로 돌아가기"
            onClick={returnRoom}
          />
          <div className="world-contact-copy">
            <p>DOORBELL / CONTACT</p>
            <h2>연락하기.</h2>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={phoneHref(profile.phone)}>{profile.phone}</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
            <button type="button" onClick={() => transitionToScene("street", projectStreetOrder[projectStreetOrder.length - 1])}>거리로 돌아가기</button>
          </div>
          <p className="world-contact-hint">문 안으로 → 작업실 · ← / Esc → 거리</p>
        </section>
      )}
    </div>
  );
}
