import { useState, useRef, useEffect } from "react";
import botaoXSvg from "@/imports/BotaoX.svg";

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
};

const CURSO_OPTIONS = [
  "Ciência da computação",
  "Técnico em informática para internet",
  "Técnico em desenvolvimento de sistemas",
];

const FASE_POR_CURSO: Record<string, number> = {
  "Ciência da computação": 8,
  "Técnico em informática para internet": 4,
  "Técnico em desenvolvimento de sistemas": 3,
};

const STUDENTS = [
  {
    name: "Antoni Ferraz",
    course: "Ciência da computação",
    phase: "8ª Fase",
    skills: ["Web", "Front-end"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format",
    coverBg: "linear-gradient(135deg, #1a3a6a 0%, #2460b0 40%, #1a3a6a 100%)",
    coverPattern: true,
  },
  {
    name: "Gabriela Rodrigues",
    course: "Ciência da computação",
    phase: "5ª Fase",
    skills: ["Web", "Front-end"],
    avatar: "https://images.unsplash.com/photo-1515138692129-197a2c608cfd?w=120&h=120&fit=crop&auto=format",
    coverBg: "#8B1A1A",
    coverPattern: false,
  },
  {
    name: "Marcio Zurique",
    course: "Ciência da computação",
    phase: "3ª Fase",
    skills: ["Web", "Front-end"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format",
    coverBg: "#111214",
    coverPattern: false,
  },
  {
    name: "Sérgio Tanque",
    course: "Ciência da computação",
    phase: "7ª Fase",
    skills: ["Web", "Front-end"],
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&auto=format",
    coverBg: "url('https://images.unsplash.com/photo-1590928485882-e0432a4a46ae?w=400&h=120&fit=crop&auto=format')",
    coverPattern: false,
  },
  {
    name: "Lucas Mendes",
    course: "Sistemas de Informação",
    phase: "4ª Fase",
    skills: ["Back-end", "Node.js"],
    avatar: "https://images.unsplash.com/photo-1658797505545-9c7b6be1ab9d?w=120&h=120&fit=crop&auto=format",
    coverBg: "linear-gradient(135deg, #1a3a6a 0%, #2460b0 40%, #1a3a6a 100%)",
    coverPattern: true,
  },
  {
    name: "Fernanda Costa",
    course: "Engenharia de Software",
    phase: "6ª Fase",
    skills: ["Mobile", "React Native"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format",
    coverBg: "#2A1A4A",
    coverPattern: false,
  },
  {
    name: "Rafael Souza",
    course: "Ciência da computação",
    phase: "7ª Fase",
    skills: ["DevOps", "Cloud"],
    avatar: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=120&h=120&fit=crop&auto=format",
    coverBg: "#1A2A1A",
    coverPattern: false,
  },
  {
    name: "Marina Oliveira",
    course: "Sistemas de Informação",
    phase: "8ª Fase",
    skills: ["Data Science", "Python"],
    avatar: "https://images.unsplash.com/photo-1658797508731-cf8961a3b414?w=120&h=120&fit=crop&auto=format",
    coverBg: "#111214",
    coverPattern: false,
  },
];

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
  );
}

function CoverBg({ bg, pattern }: { bg: string; pattern: boolean }) {
  return (
    <div
      style={{
        height: "100%",
        background: bg,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {pattern && (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }} viewBox="0 0 300 120" preserveAspectRatio="xMidYMid slice">
          <polygon points="0,0 60,0 30,60" fill="#fff" />
          <polygon points="60,0 120,0 90,60 30,60" fill="#fff" opacity="0.5" />
          <polygon points="120,0 180,0 150,60 90,60" fill="#fff" />
          <polygon points="180,0 240,0 210,60 150,60" fill="#fff" opacity="0.5" />
          <polygon points="240,0 300,0 270,60 210,60" fill="#fff" />
          <polygon points="0,60 60,60 30,120 0,120" fill="#fff" opacity="0.5" />
          <polygon points="60,60 120,60 90,120 30,120" fill="#fff" />
          <polygon points="120,60 180,60 150,120 90,120" fill="#fff" opacity="0.5" />
          <polygon points="180,60 240,60 210,120 150,120" fill="#fff" />
          <polygon points="240,60 300,60 270,120 210,120" fill="#fff" opacity="0.5" />
        </svg>
      )}
    </div>
  );
}

function StudentCard({ student }: { student: typeof STUDENTS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: C.card,
        border: `2px solid ${hovered ? C.green : "#3f3f3f"}`,
        borderRadius: "14px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        transition: "border-color 0.2s, transform 0.2s",
        transform: hovered ? "scale(1.03)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: "140px", position: "relative", flexShrink: 0 }}>
        <CoverBg bg={student.coverBg} pattern={student.coverPattern} />
        <div style={{ position: "absolute", bottom: "-64px", left: "50%", transform: "translateX(-50%)" }}>
          <img
            src={student.avatar}
            alt={student.name}
            style={{ width: 128, height: 128, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.green}`, display: "block" }}
          />
        </div>
      </div>

      <div style={{ paddingTop: "76px", padding: "76px 20px 20px", textAlign: "center", display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
        <p style={{ color: C.textPrimary, fontWeight: 700, fontSize: "17px", margin: 0 }}>{student.name}</p>
        <p style={{ color: C.textSecondary, fontSize: "13px", margin: 0 }}>{student.course}</p>
        <p style={{ color: C.textSecondary, fontSize: "13px", margin: "0 0 10px 0" }}>{student.phase}</p>

        <p style={{ color: "#555", fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px 0" }}>
          Skills de Domínio:
        </p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center", marginBottom: "16px" }}>
          {student.skills.map((s) => (
            <span
              key={s}
              style={{ border: `1.5px solid ${C.green}`, color: C.green, fontSize: "12px", fontWeight: 500, padding: "3px 12px", borderRadius: "50px", backgroundColor: "transparent" }}
            >
              {s}
            </span>
          ))}
        </div>

        <div style={{ marginTop: "auto" }}>
          <button
            style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: `1.5px solid ${C.green}`, color: C.green, backgroundColor: "transparent", padding: "7px 20px", borderRadius: "50px", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "background-color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(120,220,80,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

export function CreatorsPage() {
  const [search, setSearch] = useState("");
  const [cursoOpen, setCursoOpen] = useState(false);
  const [faseOpen, setFaseOpen] = useState(false);
  const [faseTooltip, setFaseTooltip] = useState(false);

  const [selectedCurso, setSelectedCurso] = useState<string | null>(null);
  const [activePhases, setActivePhases] = useState<string[]>([]);

  const cursoRef = useRef<HTMLDivElement>(null);
  const faseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cursoRef.current && !cursoRef.current.contains(e.target as Node)) {
        setCursoOpen(false);
      }
      if (faseRef.current && !faseRef.current.contains(e.target as Node)) {
        setFaseOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectCurso = (option: string) => {
    if (selectedCurso === option) {
      setSelectedCurso(null);
      setActivePhases([]);
    } else {
      setSelectedCurso(option);
      setActivePhases([]);
    }
    setCursoOpen(false);
  };

  const togglePhase = (fase: string) => {
    setActivePhases((prev) =>
      prev.includes(fase) ? prev.filter((p) => p !== fase) : [...prev, fase]
    );
  };

  const removeCurso = () => {
    setSelectedCurso(null);
    setActivePhases([]);
  };

  const removePhase = (fase: string) => {
    setActivePhases((prev) => prev.filter((p) => p !== fase));
  };

  const clearAll = () => {
    setSelectedCurso(null);
    setActivePhases([]);
    setCursoOpen(false);
    setFaseOpen(false);
  };

  const faseOptions = selectedCurso
    ? Array.from(
        { length: FASE_POR_CURSO[selectedCurso] ?? 0 },
        (_, i) => `${i + 1}ª Fase`
      )
    : [];

  const hasActiveFilters = Boolean(selectedCurso) || activePhases.length > 0;

  const filtered = STUDENTS.filter((s) => {
    const matchName = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCourse = !selectedCurso || s.course === selectedCurso;
    const matchPhase = activePhases.length === 0 || activePhases.includes(s.phase);
    return matchName && matchCourse && matchPhase;
  });

  return (
    <div style={{ backgroundColor: "#18191A", minHeight: "100vh", padding: "24px 24px 80px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div
        style={{ backgroundColor: "#242424", borderRadius: 16, padding: "28px 28px 40px", minHeight: "calc(100vh - 108px)" }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: C.card,
              border: `1.5px solid ${C.border}`,
              borderRadius: 8,
              padding: "10px 16px",
              width: "100%",
              maxWidth: 480,
              boxSizing: "border-box",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#A0A4A8" strokeWidth="2" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#A0A4A8" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Buscar alunos por nome"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div ref={cursoRef} style={{ position: "relative" }}>
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
              <ChevronDown style={{ transform: cursoOpen ? "rotate(180deg)" : "none" }} />
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
                      (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
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
              <ChevronDown style={{ transform: faseOpen ? "rotate(180deg)" : "none" }} />
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
                  const already = activePhases.includes(fase);
                  return (
                    <button
                      key={fase}
                      onClick={() => togglePhase(fase)}
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
                            "rgba(255,255,255,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                      }}
                    >
                      {fase}
                    </button>
                  );
                })}
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
        </div>

        {hasActiveFilters && (
          <div style={{ marginBottom: 15 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              {selectedCurso && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    borderRadius: 999,
                    padding: "5px 12px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    background: C.teal,
                    color: "#fff",
                    border: "none",
                    flexShrink: 0,
                  }}
                >
                  {selectedCurso}
                  <button
                    onClick={removeCurso}
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
                        filter: "invert(1)",
                      }}
                    />
                  </button>
                </span>
              )}

              {activePhases.map((fase) => (
                <span
                  key={fase}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    borderRadius: 999,
                    padding: "5px 12px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    background: C.tagGray,
                    color: C.tagGrayText,
                    border: "none",
                    flexShrink: 0,
                  }}
                >
                  {fase}
                  <button
                    onClick={() => removePhase(fase)}
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
                      }}
                    />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {filtered.map((s) => (
            <StudentCard key={s.name} student={s} />
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", color: C.textSecondary, padding: "60px 0", fontSize: "15px" }}>
              Nenhum aluno encontrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}