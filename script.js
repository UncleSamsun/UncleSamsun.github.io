import { getProject, hardwareProjects, profile, projects } from "/assets/projects.js";

const body = document.body;
const year = document.querySelector("[data-year]");
const menuButton = document.querySelector("[data-menu]");
const nav = document.querySelector(".site-nav");

if (year) {
  year.textContent = new Date().getFullYear();
}

menuButton?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
});

nav?.addEventListener("click", () => {
  body.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "메뉴 열기");
});

if (body.dataset.page === "home") {
  renderHome();
}

if (body.dataset.page === "project") {
  renderProject();
}

function renderHome() {
  setText("[data-profile-name]", profile.name);
  setText("[data-profile-headline]", profile.headline);
  setText("[data-profile-intro]", profile.intro);

  const profileLinks = document.querySelector("[data-profile-links]");
  if (profileLinks) {
    profileLinks.innerHTML = [
      linkButton("GitHub", profile.github, true),
      profile.blog ? linkButton("Blog", profile.blog, true) : "",
      linkButton("Email", `mailto:${profile.email}`, false),
    ].join("");
  }

  const aboutList = document.querySelector("[data-about-list]");
  if (aboutList) {
    aboutList.innerHTML = profile.about.map((item) => `<p>${escapeHtml(item)}</p>`).join("");
  }

  const skills = document.querySelector("[data-skills]");
  if (skills) {
    skills.innerHTML = renderSkillGroups(profile.skillGroups ?? [{ title: "Skills", items: profile.skills }]);
  }

  const cards = document.querySelector("[data-project-cards]");
  if (cards) {
    cards.innerHTML = projects.map(projectCard).join("");
  }

  const hardware = document.querySelector("[data-hardware-projects]");
  if (hardware) {
    hardware.innerHTML = hardwareProjects
      .map(
        (project) => `
          <article class="compact-card">
            <span>${escapeHtml(project.period)}</span>
            <h3>${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(project.description)}</p>
          </article>
        `
      )
      .join("");
  }

  const history = document.querySelector("[data-history]");
  if (history) {
    const items = [...profile.education, ...profile.career];
    history.innerHTML = items
      .map(
        (item) => `
          <article class="timeline-item">
            <span>${escapeHtml(item.period)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
          </article>
        `
      )
      .join("");
  }

  const contact = document.querySelector("[data-contact]");
  if (contact) {
    contact.innerHTML = [
      contactLink("Email", profile.email, `mailto:${profile.email}`),
      contactLink("GitHub", "github.com/UncleSamsun", profile.github),
      contactLink("Phone", profile.phone, `tel:${profile.phone.replaceAll("-", "")}`),
    ].join("");
  }
}

function renderProject() {
  const slug = body.dataset.projectSlug;
  const project = getProject(slug);
  const target = document.querySelector("[data-project-detail]");

  if (!target || !project) {
    return;
  }

  document.title = `${project.name} | ${profile.name}`;

  target.innerHTML = `
    <section class="project-hero">
      <div class="container">
        <a class="back-link" href="/#projects">← 프로젝트 목록</a>
        <p class="eyebrow">${escapeHtml(project.label)}</p>
        <h1>${escapeHtml(project.name)}</h1>
        <p class="hero-lead">${escapeHtml(project.summary)}</p>
        <div class="project-meta">
          <span>${escapeHtml(project.period)}</span>
          <span>${escapeHtml(project.team)}</span>
        </div>
        <div class="link-row">${project.links.map((link) => linkButton(link.label, link.url, true)).join("")}</div>
      </div>
    </section>

    <section class="section">
      <div class="container detail-layout">
        <aside class="detail-aside">
          <h2>기술 스택</h2>
          ${renderSkillGroups(groupStack(project.stack))}
        </aside>

        <div class="detail-main">
          ${detailSection("개요", `<p>${escapeHtml(project.overview)}</p>`)}
          ${detailSection("역할", `<p>${escapeHtml(project.role)}</p>`)}
          ${detailSection("기능", list(project.features))}
          ${detailSection("구조", `<p>${escapeHtml(project.architecture)}</p>`)}
          ${detailSection("문제 해결", problemList(project.problemSolving))}
          ${project.validation ? detailSection("검증", problemList(project.validation)) : ""}
          ${detailSection("성과", list(project.results))}
        </div>
      </div>
    </section>
  `;
}

function projectCard(project) {
  const topSkills = project.stack.slice(0, 5);
  return `
    <article class="project-card">
      <div class="project-card-top">
        <span>${escapeHtml(project.label)}</span>
        <span>${escapeHtml(project.period)}</span>
      </div>
      <h3>${escapeHtml(project.name)}</h3>
      <p>${escapeHtml(project.summary)}</p>
      <div class="tag-cloud compact">${topSkills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}</div>
      <a class="text-button" href="/projects/${project.slug}/">상세 보기</a>
    </article>
  `;
}

function detailSection(title, content) {
  return `
    <section class="detail-section" aria-labelledby="${slugify(title)}">
      <h2 id="${slugify(title)}">${escapeHtml(title)}</h2>
      ${content}
    </section>
  `;
}

function problemList(items) {
  return items
    .map(
      (item) => `
        <article class="problem-item">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `
    )
    .join("");
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderSkillGroups(groups) {
  return `
    <div class="skill-groups">
      ${groups
        .filter((group) => group.items.length > 0)
        .map(
          (group) => `
            <article class="skill-group">
              <h3>${escapeHtml(group.title)}</h3>
              <div class="tag-cloud compact">${group.items.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}</div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function groupStack(stack) {
  const groups = [
    { title: "Backend", items: [] },
    { title: "Data", items: [] },
    { title: "AI / Crawling", items: [] },
    { title: "Infra", items: [] },
    { title: "Test / Docs", items: [] },
    { title: "Frontend", items: [] },
    { title: "Etc", items: [] },
  ];

  stack.forEach((skill) => {
    getStackGroup(groups, skill).items.push(skill);
  });

  return groups.filter((group) => group.items.length > 0);
}

function getStackGroup(groups, skill) {
  const value = skill.toLowerCase();

  if (includesAny(value, ["junit", "mockito", "swagger", "test"])) {
    return groups[4];
  }

  if (includesAny(value, ["java", "spring", "security", "jpa", "querydsl", "jwt", "websocket", "actuator", "python", "fastapi"])) {
    return groups[0];
  }

  if (includesAny(value, ["mysql", "h2", "redis", "elasticsearch", "firebase"])) {
    return groups[1];
  }

  if (includesAny(value, ["selenium", "kiwi", "sbert", "tf-idf"])) {
    return groups[2];
  }

  if (includesAny(value, ["docker", "aws", "github actions", "gradle"])) {
    return groups[3];
  }

  if (includesAny(value, ["react", "typescript", "vite"])) {
    return groups[5];
  }

  return groups[6];
}

function includesAny(value, keywords) {
  return keywords.some((keyword) => value.includes(keyword));
}

function linkButton(label, url, external) {
  const rel = external ? ' target="_blank" rel="noreferrer"' : "";
  return `<a class="button" href="${escapeAttribute(url)}"${rel}>${escapeHtml(label)}</a>`;
}

function contactLink(label, value, href) {
  return `
    <a class="contact-card" href="${escapeAttribute(href)}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </a>
  `;
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}

function slugify(value) {
  return value.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
