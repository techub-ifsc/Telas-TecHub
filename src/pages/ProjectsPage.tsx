import { useState, useRef, useLayoutEffect, useEffect } from "react"
import React from "react"
import botaoXSvg from "@/imports/BotaoX.svg"
import { useNavigate } from "react-router"

const C = {
  bg: "#2D2F31",
  card: "#18191A",
  input: "#1E2022",
  border: "#404245",
  green: "#78DC50",
  greenDark: "#111",
  teal: "#308298",
  tagGray: "#E8EAEB",
  tagGrayText: "#111",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A4A8",
}

type ActiveTag = { id: number; label: string; type: "curso" | "fase" | "skill" }

const INITIAL_TAGS: ActiveTag[] = [
  { id: 1, label: "Ciência da computação", type: "curso" },
  { id: 2, label: "3ª Fase", type: "fase" },
  { id: 3, label: "4ª Fase", type: "fase" },
  { id: 4, label: "5ª Fase", type: "fase" },
  { id: 5, label: "6ª Fase", type: "fase" },
  { id: 6, label: "7ª Fase", type: "fase" },
  { id: 7, label: "Web", type: "skill" },
  { id: 8, label: "Front-end", type: "skill" },
  { id: 9, label: "Site", type: "skill" },
  { id: 10, label: "React", type: "skill" },
  { id: 11, label: "TypeScript", type: "skill" },
  { id: 12, label: "Node.js", type: "skill" },
  { id: 13, label: "Python", type: "skill" },
  { id: 14, label: "Docker", type: "skill" },
  { id: 15, label: "PostgreSQL", type: "skill" },
  { id: 16, label: "GraphQL", type: "skill" },
  { id: 17, label: "Next.js", type: "skill" },
  { id: 18, label: "Tailwind CSS", type: "skill" },
  { id: 19, label: "MongoDB", type: "skill" },
]

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "SiteWebBlue.com",
    user: "Usuário",
    course: "Ciência da Computação",
    fase: "4ª Fase",
    tags: ["Web", "Front-end"],
  },
  {
    id: 2,
    title: "AppMobile.dev",
    user: "Maria Silva",
    course: "Ciência da Computação",
    fase: "5ª Fase",
    tags: ["Web", "Front-end", "Site"],
  },
  {
    id: 3,
    title: "Dashboard Analytics",
    user: "João Costa",
    course: "Ciência da Computação",
    fase: "6ª Fase",
    tags: ["Front-end"],
  },
  {
    id: 4,
    title: "PortfólioTech.io",
    user: "Ana Ferreira",
    course: "Técnico em informática",
    fase: "3ª Fase",
    tags: ["Web", "Site"],
  },
  {
    id: 5,
    title: "EcoTrack API",
    user: "Lucas Andrade",
    course: "Ciência da Computação",
    fase: "7ª Fase",
    tags: ["Back-end", "Node.js", "PostgreSQL"],
  },
  {
    id: 6,
    title: "Finanças Pessoais",
    user: "Beatriz Lima",
    course: "Técnico em desenvolvimento de sistemas",
    fase: "2ª Fase",
    tags: ["Front-end", "React", "TypeScript"],
  },
  {
    id: 7,
    title: "TaskFlow Manager",
    user: "Gabriel Santos",
    course: "Ciência da Computação",
    fase: "5ª Fase",
    tags: ["Full Stack", "Next.js", "Tailwind CSS"],
  },
  {
    id: 8,
    title: "Guia Universitário",
    user: "Camila Rocha",
    course: "Técnico em informática para internet",
    fase: "3ª Fase",
    tags: ["Web", "HTML", "CSS", "JavaScript"],
  },
  {
    id: 9,
    title: "HealthPulse Mobile",
    user: "Felipe Martins",
    course: "Ciência da Computação",
    fase: "6ª Fase",
    tags: ["Mobile", "React Native", "Firebase"],
  },
  {
    id: 10,
    title: "CodeShare Platform",
    user: "Larissa Dias",
    course: "Técnico em desenvolvimento de sistemas",
    fase: "3ª Fase",
    tags: ["Web", "Python", "FastAPI"],
  },
  {
    id: 11,
    title: "Nexus ERP Acadêmico",
    user: "Matheus Oliveira",
    course: "Ciência da Computação",
    fase: "8ª Fase",
    tags: ["Back-end", "Java", "Spring Boot", "Docker"],
  },
  {
    id: 12,
    title: "PixelCraft Editor",
    user: "Juliana Mendes",
    course: "Técnico em informática para internet",
    fase: "4ª Fase",
    tags: ["Web", "Front-end", "TypeScript"],
  },
  {
    id: 13,
    title: "AgroSense IoT Dashboard",
    user: "Rafael Souza",
    course: "Ciência da Computação",
    fase: "7ª Fase",
    tags: ["Full Stack", "Vue.js", "WebSocket", "Python"],
  },
  {
    id: 14,
    title: "FastDelivery App",
    user: "Fernanda Costa",
    course: "Técnico em desenvolvimento de sistemas",
    fase: "2ª Fase",
    tags: ["Mobile", "Flutter", "REST API"],
  },
  {
    id: 15,
    title: "BiblioTech IFSC",
    user: "Thiago Barbosa",
    course: "Técnico em informática para internet",
    fase: "4ª Fase",
    tags: ["Web", "PHP", "Laravel", "MySQL"],
  },
  {
    id: 16,
    title: "VisionAI Classifier",
    user: "Carolina Nogueira",
    course: "Ciência da Computação",
    fase: "8ª Fase",
    tags: ["Machine Learning", "Python", "Data Science"],
  },
]

export function ProjectsPage() {
  const [search, setSearch] = useState("")
  const [activeTags, setActiveTags] = useState<ActiveTag[]>(INITIAL_TAGS)
  const [showAll, setShowAll] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(false)
  const pillsRef = useRef<HTMLDivElement>(null)
  const [searchFocused, setSearchFocused] = useState(false)
  const [cursoOpen, setCursoOpen] = useState(false)
  const [faseOpen, setFaseOpen] = useState(false)
  const [faseTooltip, setFaseTooltip] = useState(false)
  const [tagsOpen, setTagsOpen] = useState(false)
  const [tagSearch, setTagSearch] = useState("")
  const faseRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (faseRef.current && !faseRef.current.contains(e.target as Node)) setFaseOpen(false)
      if (tagsRef.current && !tagsRef.current.contains(e.target as Node)) setTagsOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const ALL_TECH_TAGS = [
    "React",
    "Vue.js",
    "Angular",
    "Next.js",
    "Nuxt.js",
    "Svelte",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Sass",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "NestJS",
    "Fastify",
    "Python",
    "Django",
    "Flask",
    "FastAPI",
    "Java",
    "Spring Boot",
    "Kotlin",
    "PHP",
    "Laravel",
    "Symfony",
    "C#",
    ".NET",
    "ASP.NET",
    "C",
    "C++",
    "Rust",
    "Go",
    "Ruby",
    "Ruby on Rails",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "SQLite",
    "Redis",
    "Firebase",
    "GraphQL",
    "REST API",
    "WebSocket",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud",
    "Git",
    "GitHub",
    "CI/CD",
    "React Native",
    "Flutter",
    "Ionic",
    "Three.js",
    "D3.js",
    "Chart.js",
    "Machine Learning",
    "Inteligência Artificial",
    "Data Science",
    "Web",
    "Front-end",
    "Back-end",
    "Full Stack",
    "Mobile",
    "Site",
  ]

  const filteredTechTags = ALL_TECH_TAGS.filter((t) =>
    t.toLowerCase().includes(tagSearch.toLowerCase()),
  )

  const addSkillTag = (tag: string) => {
    const exists = activeTags.find((t) => t.label === tag && t.type === "skill")
    if (!exists) {
      setActiveTags((prev) => [
        ...prev,
        { id: Date.now(), label: tag, type: "skill" },
      ])
    }
  }

  const CURSO_OPTIONS = [
    "Ciência da computação",
    "Técnico em informática para internet",
    "Técnico em desenvolvimento de sistemas",
  ]

  const FASE_POR_CURSO: Record<string, number> = {
    "Ciência da computação": 8,
    "Técnico em informática para internet": 4,
    "Técnico em desenvolvimento de sistemas": 3,
  }

  const selectCurso = (option: string) => {
    // Replace any existing curso and clear fases (they're course-specific)
    setActiveTags((prev) => [
      ...prev.filter((t) => t.type !== "curso" && t.type !== "fase"),
      { id: Date.now(), label: option, type: "curso" },
    ])
    setCursoOpen(false)
  }

  const selectedCurso =
    activeTags.find((t) => t.type === "curso")?.label ?? null
  const faseOptions = selectedCurso
    ? Array.from(
      { length: FASE_POR_CURSO[selectedCurso] ?? 0 },
      (_, i) => `${i + 1}ª Fase`,
    )
    : []

  const addFaseTag = (fase: string) => {
    const exists = activeTags.find((t) => t.label === fase && t.type === "fase")
    if (!exists) {
      setActiveTags((prev) => [
        ...prev,
        { id: Date.now(), label: fase, type: "fase" },
      ])
    }
  }

  const removeTag = (id: number) =>
    setActiveTags((prev) => prev.filter((t) => t.id !== id))
  const clearAll = () => {
    setActiveTags([])
    setShowAll(false)
  }

  const sortedTags = [
    ...activeTags.filter((t) => t.type === "curso"),
    ...activeTags.filter((t) => t.type === "fase"),
    ...activeTags.filter((t) => t.type === "skill"),
  ]

  useLayoutEffect(() => {
    if (showAll) return // keep hasOverflow true while expanded
    const el = pillsRef.current
    if (!el) return
    const check = () => setHasOverflow(el.scrollHeight > el.clientHeight + 2)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [activeTags, showAll])

  return (
    <main
      style={{
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#18191A",
        padding: "24px 24px 80px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#242424",
          borderRadius: 16,
          padding: "28px 28px 40px",
          minHeight: "calc(100vh - 108px)",
        }}
      >
        {/* Search bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: C.card,
              border: `1.5px solid ${searchFocused ? C.green : C.border}`,
              borderRadius: 8,
              padding: "10px 16px",
              width: "100%",
              maxWidth: 480,
              transition: "border-color 0.15s",
            }}
          >
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar projetos"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: C.textPrimary,
                fontSize: "0.9rem",
                flex: 1,
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        {/* Filter dropdowns row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          {/* Curso dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setCursoOpen((v) => !v)}
              style={{
                background: C.card,
                border: `1.5px solid ${cursoOpen ? C.green : C.border}`,
                borderRadius: 8,
                padding: "8px 16px",
                color: C.textPrimary,
                fontSize: "0.9375rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "inherit",
              }}
            >
              Curso
              <ChevronDown />
            </button>
            {cursoOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  background: "#1a1b1e",
                  borderRadius: 12,
                  padding: "8px 0",
                  zIndex: 100,
                  minWidth: 300,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                }}
              >
                {CURSO_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => selectCurso(opt)}
                    style={{
                      display: "block",
                      width: "100%",
                      background: "none",
                      border: "none",
                      padding: "12px 20px",
                      textAlign: "left",
                      color: C.textPrimary,
                      fontSize: "0.9375rem",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.06)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fase dropdown — disabled until a curso is selected */}
          <div
            ref={faseRef}
            style={{ position: "relative" }}
            onMouseEnter={() => !selectedCurso && setFaseTooltip(true)}
            onMouseLeave={() => setFaseTooltip(false)}
          >
            {faseTooltip && !selectedCurso && (
              <div
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#2a2b2e",
                  color: C.textSecondary,
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  padding: "8px 14px",
                  borderRadius: 8,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  zIndex: 200,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                }}
              >
                Selecione um curso primeiro
              </div>
            )}
            <button
              disabled={!selectedCurso}
              onClick={() => selectedCurso && setFaseOpen((v) => !v)}
              style={{
                background: C.card,
                border: `1.5px solid ${faseOpen ? C.green : C.border}`,
                borderRadius: 8,
                padding: "8px 16px",
                color: selectedCurso ? C.textPrimary : C.textSecondary,
                fontSize: "0.9375rem",
                fontWeight: 600,
                cursor: selectedCurso ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "inherit",
                opacity: selectedCurso ? 1 : 0.5,
              }}
            >
              Fase
              <ChevronDown />
            </button>
            {faseOpen && selectedCurso && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  background: "#1a1b1e",
                  borderRadius: 12,
                  padding: "8px 0",
                  zIndex: 100,
                  minWidth: 160,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                }}
              >
                {faseOptions.map((fase) => {
                  const already = activeTags.some(
                    (t) => t.label === fase && t.type === "fase",
                  )
                  return (
                    <button
                      key={fase}
                      onClick={() => addFaseTag(fase)}
                      style={{
                        display: "block",
                        width: "100%",
                        background: "none",
                        border: "none",
                        padding: "10px 20px",
                        textAlign: "left",
                        color: already ? C.textSecondary : C.textPrimary,
                        fontSize: "0.9375rem",
                        cursor: already ? "default" : "pointer",
                        fontFamily: "inherit",
                      }}
                      onMouseEnter={(e) => {
                        if (!already)
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.06)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none"
                      }}
                    >
                      {fase}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Tags searchable dropdown */}
          <div ref={tagsRef} style={{ position: "relative" }}>
            <button
              onClick={() => setTagsOpen((v) => !v)}
              style={{
                background: C.card,
                border: `1.5px solid ${tagsOpen ? C.green : C.border}`,
                borderRadius: 8,
                padding: "8px 16px",
                color: C.textPrimary,
                fontSize: "0.9375rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "inherit",
              }}
            >
              Tags
              <ChevronDown />
            </button>
            {tagsOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  background: "#1a1b1e",
                  borderRadius: 12,
                  zIndex: 100,
                  minWidth: 240,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                  overflow: "hidden",
                }}
              >
                {/* Search input */}
                <div
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: C.input,
                      borderRadius: 8,
                      padding: "7px 12px",
                      border: `1px solid ${C.border}`,
                    }}
                  >
                    <SearchIcon />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Buscar tecnologia..."
                      value={tagSearch}
                      onChange={(e) => setTagSearch(e.target.value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: C.textPrimary,
                        fontSize: "0.875rem",
                        flex: 1,
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                </div>
                {/* Options list */}
                <div style={{ maxHeight: 260, overflowY: "auto" }}>
                  {filteredTechTags.length === 0 ? (
                    <div
                      style={{
                        padding: "14px 20px",
                        color: C.textSecondary,
                        fontSize: "0.875rem",
                      }}
                    >
                      Nenhuma tecnologia encontrada
                    </div>
                  ) : (
                    filteredTechTags.map((tag) => {
                      const already = activeTags.some(
                        (t) => t.label === tag && t.type === "skill",
                      )
                      return (
                        <button
                          key={tag}
                          onClick={() => addSkillTag(tag)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            background: "none",
                            border: "none",
                            padding: "10px 20px",
                            textAlign: "left",
                            color: already ? C.textSecondary : C.textPrimary,
                            fontSize: "0.9rem",
                            cursor: already ? "default" : "pointer",
                            fontFamily: "inherit",
                            boxSizing: "border-box",
                          }}
                          onMouseEnter={(e) => {
                            if (!already)
                              e.currentTarget.style.background =
                                "rgba(255,255,255,0.06)"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "none"
                          }}
                        >
                          {tag}
                          {already && (
                            <span
                              style={{
                                color: C.green,
                                fontSize: "0.75rem",
                                fontWeight: 600,
                              }}
                            >
                              ✓
                            </span>
                          )}
                        </button>
                      )
                    })
                  )}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={clearAll}
            style={{
              background: "none",
              border: "none",
              color: C.textPrimary,
              fontSize: "0.875rem",
              cursor: "pointer",
              padding: "8px 4px",
              fontFamily: "inherit",
              fontVariantLigatures: "none",
            }}
          >
            Limpar filtros
          </button>

          {/* "Ver menos" — lives in the filter row, pushed right */}
          {showAll && hasOverflow && (
            <button
              onClick={() => setShowAll(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                borderRadius: 999,
                padding: "5px 14px",
                fontSize: "0.8rem",
                fontWeight: 600,
                background: "transparent",
                color: C.textPrimary,
                border: `1.5px solid ${C.textPrimary}`,
                cursor: "pointer",
                fontFamily: "inherit",
                marginLeft: "auto",
              }}
            >
              Ver menos
              <ChevronDown style={{ transform: "rotate(180deg)" }} />
            </button>
          )}
        </div>

        {/* Active filter tags row */}
        {activeTags.length > 0 && (
          <div style={{
            marginBottom: 15,
          }}>
            {/* Pills row — inline with "Ver mais" when collapsed */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div
                ref={pillsRef}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  alignItems: "center",
                  flex: showAll ? undefined : 1,
                  maxHeight: showAll ? undefined : "36px",
                  overflow: "hidden",
                  minWidth: 0,
                }}
              >
                {sortedTags.map((tag) => {
                  const isCurso = tag.type === "curso"
                  const isFase = tag.type === "fase"
                  return (
                    <span
                      key={tag.id}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        borderRadius: 999,
                        padding: "5px 12px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        background: isCurso ? C.teal : isFase ? C.tagGray : C.green,
                        color: isCurso ? "#fff" : C.tagGrayText,
                        border: "none",
                        flexShrink: 0,
                      }}
                    >
                      {tag.label}
                      <button
                        onClick={() => removeTag(tag.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "8px",
                          margin: "-9px -9px -9px -6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          lineHeight: 1,
                        }}
                      >
                        <img
                          src={botaoXSvg}
                          alt="remover"
                          style={{
                            width: 8.5,
                            height: 8.5,
                            display: "block",
                            filter: isCurso ? "invert(1)" : "none",
                          }}
                        />
                      </button>
                    </span>
                  )
                })}
              </div>

              {/* "Ver mais" — inline to the right when collapsed */}
              {!showAll && hasOverflow && (
                <button
                  onClick={() => setShowAll(true)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    borderRadius: 999,
                    padding: "5px 14px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    background: "transparent",
                    color: C.textPrimary,
                    border: `1.5px solid ${C.textPrimary}`,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    flexShrink: 0,
                  }}
                >
                  Ver mais
                  <ChevronDown />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Projects grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {MOCK_PROJECTS.filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase()),
          ).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {/* Pagination visual wrapper */}
        {(() => {
          const btnStyle: React.CSSProperties = {
            width: 36,
            height: 36,
            minWidth: 36,
            padding: "0 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            border: `1.5px solid ${C.border}`,
            background: C.input,
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.875rem",
            cursor: "pointer",
            fontFamily: "inherit",
          }

          const activeBtnStyle: React.CSSProperties = {
            ...btnStyle,
            border: `1.5px solid ${C.green}`,
            background: C.green,
            color: "#111",
            fontWeight: 700,
          }

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 40,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 20,
                  backgroundColor: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: "10px 18px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {/* Primeira página */}
                  <button style={btnStyle}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="11 17 6 12 11 7" />
                      <polyline points="18 17 13 12 18 7" />
                    </svg>
                  </button>

                  {/* Anterior */}
                  <button style={btnStyle}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                  </button>

                  {/* Página Ativa */}
                  <button style={activeBtnStyle}>1</button>

                  {/* Páginas Inativas */}
                  {[2, 3].map((num) => (
                    <button key={num} style={btnStyle}>
                      {num}
                    </button>
                  ))}

                  {/* Reticências */}
                  <span style={{ color: C.textSecondary, padding: "0 4px" }}>...</span>

                  {/* Última Página */}
                  <button style={btnStyle}>10</button>

                  {/* Próxima */}
                  <button style={btnStyle}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  {/* Última página */}
                  <button style={btnStyle}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="13 17 18 12 13 7" />
                      <polyline points="6 17 11 12 6 7" />
                    </svg>
                  </button>
                </div>

                {/* Texto descritivo */}
                <div style={{ color: C.textSecondary, fontSize: "0.875rem", whiteSpace: "nowrap" }}>
                  Mostrando <strong style={{ color: "#fff" }}>1-16</strong> de{" "}
                  <strong style={{ color: "#fff" }}>160</strong> projetos{" "}
                  <span style={{ margin: "0 4px", color: C.border }}>|</span> 16 por página
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    </main >
  )
}

function ProjectCard({ project }: { project: typeof MOCK_PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate("/projeto")}
      style={{
        background: C.card,
        border: `2px solid ${hovered ? C.green : "#3f3f3f"}`,
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.2s",
        transform: hovered ? "scale(1.03)" : "scale(1)",
      }}
    >
      {/* Thumbnail — locked to 16:9 */}
      <div
        style={{
          background: "#C9E2F5",
          aspectRatio: "16/9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px",
          boxSizing: "border-box",
        }}
      >
        <BrowserMockup />
      </div>

      {/* Card body */}
      <div
        style={{
          padding: "12px 14px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "0.9375rem",
            fontWeight: 700,
            color: "#fff",
            borderBottom: `1px solid #33363A`,
            paddingBottom: 8,
          }}
        >
          {project.title}
        </h3>

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <UserIcon />
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                color: "#fff",
                fontWeight: 500,
              }}
            >
              {project.user}
            </p>
            <p style={{ margin: 0, fontSize: "0.7rem", color: "#A0A4A8" }}>
              {project.course} • {project.fase}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                color: C.green,
                border: `1px solid ${C.green}`,
                borderRadius: 999,
                padding: "2px 10px",
                background: "transparent",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function BrowserMockup() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      }}
    >
      {/* Browser header */}
      <div
        style={{
          background: "#4A90D9",
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.6)",
            display: "block",
          }}
        />
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.6)",
            display: "block",
          }}
        />
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.6)",
            display: "block",
          }}
        />
      </div>
      {/* URL bar */}
      <div
        style={{
          background: "#f0f0f0",
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.6rem", color: "#555" }}>
          www.your-url.com
        </span>
      </div>
      {/* Content skeleton */}
      <div
        style={{
          padding: "8px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <span style={{ fontSize: "0.6rem", color: "#777" }}>Similar sites</span>
        {[80, 60, 70].map((w, i) => (
          <div
            key={i}
            style={{
              height: 6,
              background: "#ddd",
              borderRadius: 3,
              width: `${w}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="#A0A4A8" strokeWidth="2" />
      <line
        x1="16.5"
        y1="16.5"
        x2="21"
        y2="21"
        stroke="#A0A4A8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ChevronDown({ style }: { style?: React.CSSProperties } = {}) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={style}>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="#888" />
      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" fill="#888" />
    </svg>
  )
}

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage?: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage = 16,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, "...", currentPage, "...", totalPages]
  }

  const pages = getVisiblePages()

  return (
    <div style={styles.container}>
      <div style={styles.controlsGroup}>
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          style={{
            ...styles.navButton,
            ...(currentPage === 1 ? styles.disabledButton : {}),
          }}
          title="Primeira página"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="11 17 6 12 11 7" />
            <polyline points="18 17 13 12 18 7" />
          </svg>
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            ...styles.navButton,
            ...(currentPage === 1 ? styles.disabledButton : {}),
          }}
          title="Página anterior"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <div style={styles.pagesWrapper}>
          {pages.map((page, idx) => {
            if (page === "...") {
              return (
                <span key={`dots-${idx}`} style={styles.ellipsis}>
                  ...
                </span>
              )
            }

            const isCurrent = page === currentPage
            return (
              <button
                key={page}
                onClick={() => onPageChange(Number(page))}
                style={{
                  ...styles.pageButton,
                  ...(isCurrent ? styles.activePageButton : styles.idlePageButton),
                }}
              >
                {page}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            ...styles.navButton,
            ...(currentPage === totalPages ? styles.disabledButton : {}),
          }}
          title="Próxima página"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          style={{
            ...styles.navButton,
            ...(currentPage === totalPages ? styles.disabledButton : {}),
          }}
          title="Última página"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="13 17 18 12 13 7" />
            <polyline points="6 17 11 12 6 7" />
          </svg>
        </button>
      </div>

      <div style={styles.description}>
        Mostrando <span style={styles.highlight}>{startItem}-{endItem}</span> de{" "}
        <span style={styles.highlight}>{totalItems}</span> projetos{" "}
        <span style={styles.divider}>|</span> {itemsPerPage} por página
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 24,
    marginTop: 40,
    marginBottom: 20,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  controlsGroup: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  pagesWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  navButton: {
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    border: "1.5px solid #404245",
    background: "#1E2022",
    color: "#FFFFFF",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  pageButton: {
    minWidth: 36,
    height: 36,
    padding: "0 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    fontSize: "0.875rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.15s ease",
  },
  activePageButton: {
    background: "#78DC50",
    color: "#111111",
    border: "1.5px solid #78DC50",
  },
  idlePageButton: {
    background: "#1E2022",
    color: "#FFFFFF",
    border: "1.5px solid #404245",
  },
  disabledButton: {
    opacity: 0.35,
    cursor: "not-allowed",
    borderColor: "#303235",
  },
  ellipsis: {
    color: "#A0A4A8",
    padding: "0 4px",
    fontSize: "0.875rem",
    userSelect: "none",
  },
  description: {
    color: "#A0A4A8",
    fontSize: "0.875rem",
    userSelect: "none",
  },
  highlight: {
    color: "#FFFFFF",
    fontWeight: 600,
  },
  divider: {
    color: "#404245",
    margin: "0 4px",
  },
}