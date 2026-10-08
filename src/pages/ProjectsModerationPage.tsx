import { useMemo, useState } from "react"

type DeadlineStatus = "safe" | "warning" | "expired"

type Project = {
  title: string
  author: string
  course: string
  phase: string
  submittedAt: string
  submittedOrder: number
  deadline: string
  deadlineStatus: DeadlineStatus
  tags: string[]
  cover: string
  url: string
  avatar: string
}

const projects: Project[] = [
  {
    title: "SiteWebBlue.com",
    author: "Matheus Oliveira",
    course: "Ciência da Computação",
    phase: "4ª Fase",
    submittedAt: "25/09/2026 10:00h",
    submittedOrder: 1,
    deadline: "Prazo expirado",
    deadlineStatus: "expired",
    tags: ["Web", "Front-end", "React"],
    cover: "#CFE4FA",
    url: "techub.ifsc/sitewebblue.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=85",
  },
  {
    title: "AppMobile.dev",
    author: "Maria Silva",
    course: "Ciência da Computação",
    phase: "5ª Fase",
    submittedAt: "02/10/2026 14:15h",
    submittedOrder: 2,
    deadline: "Prazo restante: 1 dia",
    deadlineStatus: "warning",
    tags: ["Mobile", "React Native", "Firebase"],
    cover: "#E1D8FA",
    url: "techub.ifsc/appmobile.dev",
    avatar:
      "https://images.unsplash.com/photo-1662850886700-4ec19bd30d11?auto=format&fit=crop&w=120&h=120&q=85",
  },
  {
    title: "Dashboard Analytics",
    author: "João Costa",
    course: "Ciência da Computação",
    phase: "6ª Fase",
    submittedAt: "05/10/2026 09:30h",
    submittedOrder: 3,
    deadline: "Prazo restante: 4 dias",
    deadlineStatus: "safe",
    tags: ["Front-end", "React", "Data Science"],
    cover: "#D5F3E9",
    url: "techub.ifsc/dashboard-analytics",
    avatar:
      "https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?auto=format&fit=crop&w=120&h=120&q=85",
  },
  {
    title: "PortfólioTech.io",
    author: "Ana Ferreira",
    course: "Técnico em Informática para Internet",
    phase: "3ª Fase",
    submittedAt: "07/10/2026 11:45h",
    submittedOrder: 4,
    deadline: "Prazo restante: 6 dias",
    deadlineStatus: "safe",
    tags: ["Web", "HTML", "CSS"],
    cover: "#FCE3D2",
    url: "techub.ifsc/portfoliotech.io",
    avatar:
      "https://images.unsplash.com/photo-1630939687530-241d630735df?auto=format&fit=crop&w=120&h=120&q=85",
  },
]

const deadlineStyles: Record<DeadlineStatus, {
  background: string
  color: string
}> = {
  safe: { background: "#70D84C", color: "#111111" },
  warning: { background: "#FFB300", color: "#111111" },
  expired: { background: "#E53935", color: "#FFFFFF" },
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <circle
        cx="11"
        cy="11"
        r="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m16 16 4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15">
      <circle
        cx="12"
        cy="12"
        r="8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 7.5V12l3 2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15">
      <path d="M12 3.5 21 20H3L12 3.5Z" fill="currentColor" />
      <path
        d="M12 9v5"
        stroke="#E53935"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle cx="12" cy="17" r="1" fill="#E53935" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path
        d="m7 9.5 5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div
      className="moderation-preview"
      style={{ backgroundColor: project.cover }}
      aria-hidden="true"
    >
      <div className="moderation-browser">
        <div className="moderation-browser-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="moderation-browser-url">{project.url}</div>
        <div className="moderation-browser-content">
          <span>{project.title}</span>
          <i />
          <i />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const statusStyle = deadlineStyles[project.deadlineStatus]

  return (
    <article className="moderation-card">
      <ProjectPreview project={project} />

      <div className="moderation-card-body">
        <h2>{project.title}</h2>

        <div className="moderation-author">
          <span className="moderation-avatar">
            <img alt={`Foto de ${project.author}`} src={project.avatar} />
          </span>
          <div>
            <strong>{project.author} (Estudante)</strong>
            <span>
              {project.course} <b>•</b> {project.phase}
            </span>
          </div>
        </div>

        <p className="moderation-submitted">
          Submetido em: <strong>{project.submittedAt}</strong>
        </p>

        <div
          className="moderation-deadline"
          style={{
            backgroundColor: statusStyle.background,
            color: statusStyle.color,
          }}
        >
          {project.deadlineStatus === "expired" ? (
            <WarningIcon />
          ) : (
            <ClockIcon />
          )}
          <strong>{project.deadline}</strong>
        </div>

        <div className="moderation-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="moderation-review-notice">
        <strong>Avaliar projeto</strong>
        <ArrowRightIcon />
      </div>
    </article>
  )
}

const moderationStyles = `
.moderation-page,
.moderation-page * {
  box-sizing: border-box;
}

.moderation-page {
  min-height: calc(100vh - 60px);
  padding: 34px 24px 48px;
  background: #18191a;
  color: #ffffff;
}

.moderation-panel {
  width: min(100%, 1440px);
  margin: 0 auto;
  padding: 34px 28px 30px;
  border: 1px solid #24272a;
  border-radius: 16px;
  background: #1d1f20;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.16);
}

.moderation-heading {
  text-align: center;
}

.moderation-heading h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
}

.moderation-heading p {
  margin: 10px auto 0;
  color: #b0b3b8;
  font-size: 0.95rem;
  line-height: 1.5;
}

.moderation-heading > strong {
  display: block;
  margin-top: 9px;
  font-size: 1rem;
  font-weight: 700;
}

.moderation-controls {
  display: grid;
  grid-template-columns: minmax(240px, 360px) minmax(260px, 360px);
  justify-content: center;
  gap: 14px;
  margin: 18px auto 24px;
}

.moderation-search,
.moderation-sort {
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  border: 1px solid #33363a;
  border-radius: 8px;
  background: #181a1b;
  color: #a0a4a8;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.moderation-search:focus-within,
.moderation-sort:focus-within {
  border-color: #70d84c;
  box-shadow: 0 0 0 3px rgba(112, 216, 76, 0.13);
}

.moderation-search {
  gap: 10px;
  padding: 0 13px;
}

.moderation-search input,
.moderation-sort select {
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ffffff;
  font: inherit;
  font-size: 0.875rem;
}

.moderation-search input::placeholder {
  color: #7f848a;
}

.moderation-search input::-webkit-search-cancel-button {
  filter: invert(1);
}

.moderation-sort select {
  position: relative;
  z-index: 1;
  padding: 0 42px 0 14px;
  appearance: none;
  cursor: pointer;
}

.moderation-sort svg {
  position: absolute;
  right: 13px;
  pointer-events: none;
}

.moderation-sort option {
  background: #222426;
}

.moderation-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.moderation-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #33363a;
  border-radius: 15px;
  background: #222426;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.17);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.moderation-card:hover {
  border-color: #85ce5a;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transform: translateY(-3px);
}

.moderation-preview {
  height: 170px;
  padding: 24px 16px;
}

.moderation-browser {
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(27, 44, 55, 0.08);
}

.moderation-browser-bar {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 24px;
  padding: 0 9px;
  background: #5794c3;
}

.moderation-browser-bar span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.62);
}

.moderation-browser-url {
  overflow: hidden;
  height: 20px;
  padding: 5px 10px;
  background: #e9edf1;
  color: #6c747b;
  font-size: 0.52rem;
  white-space: nowrap;
}

.moderation-browser-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  color: #484d52;
  font-size: 0.62rem;
}

.moderation-browser-content span {
  margin-bottom: 10px;
}

.moderation-browser-content i {
  display: block;
  width: 80%;
  height: 4px;
  margin-bottom: 6px;
  border-radius: 99px;
  background: #d9dcdf;
}

.moderation-browser-content i:last-child {
  width: 64%;
}

.moderation-card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  text-align: center;
}

.moderation-card-body h2 {
  width: 100%;
  overflow: hidden;
  margin: 0 0 13px;
  padding-bottom: 13px;
  border-bottom: 1px solid #33363a;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.moderation-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.moderation-avatar {
  display: grid;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: #33363a;
  color: #c6c9cc;
}

.moderation-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.moderation-author > div {
  min-width: 0;
  text-align: center;
}

.moderation-author strong,
.moderation-author span {
  display: block;
}

.moderation-author strong {
  overflow: hidden;
  font-size: 0.84rem;
  font-weight: 700;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.moderation-author span {
  overflow: hidden;
  color: #a0a4a8;
  font-size: 0.7rem;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.moderation-author b {
  margin: 0 3px;
  color: #73777d;
}

.moderation-submitted {
  margin: 13px 0 8px;
  color: #d6d8da;
  font-size: 0.76rem;
}

.moderation-submitted strong {
  color: #ffffff;
  font-weight: 500;
}

.moderation-deadline {
  display: flex;
  width: fit-content;
  max-width: 100%;
  align-items: center;
  gap: 6px;
  padding: 5px 9px;
  border-radius: 999px;
  font-size: 0.75rem;
  line-height: 1;
}

.moderation-deadline strong {
  overflow: hidden;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.moderation-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin: 10px 0 14px;
}

.moderation-tags span {
  padding: 4px 8px;
  border: 1px solid #5a8f49;
  border-radius: 999px;
  color: #bdc5ba;
  font-size: 0.68rem;
  line-height: 1;
}

.moderation-review-notice {
  display: flex;
  width: 100%;
  min-height: 64px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: auto;
  padding: 14px 16px;
  border-top: 1px solid #33363a;
  background: #1f2123;
  color: #85ce5a;
  font-size: 1rem;
  letter-spacing: -0.01em;
}

.moderation-review-notice strong {
  font-weight: 700;
}

.moderation-card:hover .moderation-review-notice {
  background: #222526;
}

.moderation-empty {
  padding: 70px 24px;
  border: 1px dashed #33363a;
  border-radius: 14px;
  color: #a0a4a8;
  text-align: center;
}

@media (max-width: 1100px) {
  .moderation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .moderation-page {
    padding: 20px 14px 32px;
  }

  .moderation-panel {
    padding: 28px 16px 18px;
  }

  .moderation-heading h1 {
    font-size: 2rem;
  }

  .moderation-controls,
  .moderation-grid {
    grid-template-columns: 1fr;
  }

  .moderation-controls {
    gap: 10px;
  }

  .moderation-preview {
    height: 190px;
  }
}
`

export function ProjectsModerationPage() {
  const [search, setSearch] = useState("")
  const [sortOrder, setSortOrder] = useState("oldest")

  const visibleProjects = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR")
    const filtered = projects.filter((project) =>
      `${project.title} ${project.author}`
        .toLocaleLowerCase("pt-BR")
        .includes(term),
    )

    return [...filtered].sort((a, b) =>
      sortOrder === "oldest"
        ? a.submittedOrder - b.submittedOrder
        : b.submittedOrder - a.submittedOrder,
    )
  }, [search, sortOrder])

  return (
    <main className="moderation-page">
      <style>{moderationStyles}</style>
      <section className="moderation-panel">
        <header className="moderation-heading">
          <h1>Moderação de Projetos</h1>
          <p>
            Fila de projetos aguardando avaliação institucional. Prazo de
            referência: 7 dias.
          </p>
          <strong>12 projetos aguardando análise</strong>
        </header>

        <div className="moderation-controls">
          <label className="moderation-search">
            <SearchIcon />
            <input
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar projetos ou autores"
              type="search"
              value={search}
            />
          </label>

          <label className="moderation-sort">
            <select
              aria-label="Ordenar projetos"
              onChange={(event) => setSortOrder(event.target.value)}
              value={sortOrder}
            >
              <option value="oldest">Ordenar por: Mais antigos</option>
              <option value="newest">Ordenar por: Mais recentes</option>
            </select>
            <ChevronIcon />
          </label>
        </div>

        {visibleProjects.length > 0 ? (
          <div className="moderation-grid">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        ) : (
          <div className="moderation-empty">
            Nenhum projeto ou autor encontrado.
          </div>
        )}
      </section>
    </main>
  )
}
