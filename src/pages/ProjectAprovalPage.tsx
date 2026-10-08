import { useMemo, useState } from "react"

type DeadlineStatus = "safe" | "warning" | "expired"
type SortOrder = "oldest" | "newest"

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
    submittedAt: "20/09/2026 10:00h",
    submittedOrder: 1,
    deadline: "Prazo restante: 1 dia",
    deadlineStatus: "warning",
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
    submittedAt: "23/09/2026 14:15h",
    submittedOrder: 2,
    deadline: "Prazo restante: 3 dias",
    deadlineStatus: "safe",
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
    submittedAt: "27/09/2026 09:30h",
    submittedOrder: 3,
    deadline: "Prazo expirado",
    deadlineStatus: "expired",
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
    submittedAt: "30/09/2026 11:45h",
    submittedOrder: 4,
    deadline: "Prazo restante: 5 dias",
    deadlineStatus: "safe",
    tags: ["Web", "HTML", "CSS"],
    cover: "#FCE3D2",
    url: "techub.ifsc/portfoliotech.io",
    avatar:
      "https://images.unsplash.com/photo-1630939687530-241d630735df?auto=format&fit=crop&w=120&h=120&q=85",
  },
]

const deadlineStyles: Record<
  DeadlineStatus,
  { background: string; color: string }
> = {
  safe: {
    background: "#70D84C",
    color: "#111111",
  },
  warning: {
    background: "#FFB300",
    color: "#111111",
  },
  expired: {
    background: "#E53935",
    color: "#FFFFFF",
  },
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
    >
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
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="15"
      height="15"
    >
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
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="15"
      height="15"
    >
      <path
        d="M12 3.5 21 20H3L12 3.5Z"
        fill="currentColor"
      />
      <path
        d="M12 9v5"
        stroke="#E53935"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="17"
        r="1"
        fill="#E53935"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
    >
      <path
        d="m5 12.5 4.2 4.2L19 7"
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
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
    >
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

        <div className="moderation-browser-url">
          {project.url}
        </div>

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
            <img
              alt={`Foto de ${project.author}`}
              src={project.avatar}
            />
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

        <button
          className="moderation-review-button"
          type="button"
        >
          <CheckIcon />
          Avaliar
        </button>
      </div>
    </article>
  )
}

export function ModerationPage() {
  const [search, setSearch] = useState("")
  const [sortOrder, setSortOrder] =
    useState<SortOrder>("oldest")

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
      <section className="moderation-panel">
        <header className="moderation-heading">
          <h1>Moderação de Projetos</h1>

          <p>
            Fila de projetos aguardando avaliação institucional.
            Prazo de referência: 7 dias.
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
              onChange={(event) =>
                setSortOrder(event.target.value as SortOrder)
              }
              value={sortOrder}
            >
              <option value="oldest">
                Ordenar por: Mais antigos (FIFO)
              </option>

              <option value="newest">
                Ordenar por: Mais recentes
              </option>
            </select>

            <ChevronIcon />
          </label>
        </div>

        {visibleProjects.length > 0 ? (
          <div className="moderation-grid">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
              />
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