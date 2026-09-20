import React from "react"

const COLORS = {
  bg: "#1E1E1E",
  card: "#222426",
  border: "#33363A",
  green: "#70D84C",
  greenHover: "#7FE550",
  textPrimary: "#FFFFFF",
  textSecondary: "#B0B3B8",
  textOnGreen: "#111111",
}

const avatars = {
  antoni:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
  gabriela:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
  sergio:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        backgroundColor: COLORS.green,
        color: COLORS.textOnGreen,
        fontWeight: 500,
        fontSize: "13px",
        padding: "5px 14px",
        borderRadius: "50px",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  )
}

function Card({
  children,
  style,
  title,
  collapsible = false,
  peekHeight,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
  title?: string
  collapsible?: boolean
  peekHeight?: string
}) {
  const [expanded, setExpanded] = React.useState(false)
  const isCollapsible = collapsible && peekHeight

  return (
    <div
      style={{
        backgroundColor: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: "14px",
        overflow: "hidden",
      }}
    >
      {/* Title header with optional toggle button */}
      {title && (
        <div style={{ padding: "14px 24px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: COLORS.textPrimary, fontWeight: 700, fontSize: "16px" }}>{title}</span>
          {isCollapsible && (
            <button
              onClick={() => setExpanded((v) => !v)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "7px 18px",
                backgroundColor: expanded ? "transparent" : COLORS.green,
                color: expanded ? COLORS.green : COLORS.textOnGreen,
                border: `1.5px solid ${COLORS.green}`,
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                transition: "background-color 0.2s, color 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!expanded) e.currentTarget.style.backgroundColor = COLORS.greenHover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = expanded ? "transparent" : COLORS.green
              }}
            >
              {expanded ? "Ver menos" : "Ver mais"}
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: "transform 0.3s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Content with peek */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            maxHeight: isCollapsible && !expanded ? peekHeight : "4000px",
            overflow: "hidden",
            transition: "max-height 0.45s ease",
          }}
        >
          <div style={{ padding: "24px 28px", ...style }}>
            {children}
          </div>
        </div>

        {/* Fade when collapsed */}
        {isCollapsible && !expanded && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "80px",
              background: `linear-gradient(to bottom, transparent, ${COLORS.card})`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  )
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        color: COLORS.textSecondary,
        fontSize: "14px",
        fontWeight: 600,
        textAlign: "center",
        marginBottom: "18px",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </h3>
  )
}

function LinkButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "transparent",
        border: `1.5px solid ${COLORS.green}`,
        borderRadius: "8px",
        padding: "11px 16px",
        color: COLORS.green,
        fontSize: "14px",
        fontWeight: 500,
        cursor: "pointer",
        transition: "background-color 0.15s",
        fontFamily: "Inter, sans-serif",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "rgba(112,216,76,0.08)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      {icon}
      {label}
    </button>
  )
}

function IconExternalLink() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function BrowserMockup() {
  return (
    <div
      style={{
        backgroundColor: "#d6eaf8",
        borderRadius: "8px",
        overflow: "hidden",
        height: "100%",
        minHeight: "180px",
      }}
    >
      <div
        style={{
          backgroundColor: "#5b9bd5",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#ff6b6b",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#ffd93d",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#6bcb77",
            display: "inline-block",
          }}
        />
      </div>
      <div style={{ padding: "16px" }}>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "4px",
            padding: "6px 10px",
            fontSize: "11px",
            color: "#555",
            marginBottom: "12px",
          }}
        >
          www.your-url.com
        </div>
        <div style={{ fontSize: "11px", color: "#555", marginBottom: "8px" }}>
          Similar sites
        </div>
        <div
          style={{
            backgroundColor: "#b0c4de",
            borderRadius: "3px",
            height: "8px",
            marginBottom: "6px",
            width: "80%",
          }}
        />
        <div
          style={{
            backgroundColor: "#b0c4de",
            borderRadius: "3px",
            height: "8px",
            marginBottom: "6px",
            width: "60%",
          }}
        />
        <div
          style={{
            backgroundColor: "#b0c4de",
            borderRadius: "3px",
            height: "8px",
            width: "70%",
          }}
        />
      </div>
    </div>
  )
}

function ScreenshotMockup() {
  return (
    <div
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        height: "100%",
        minHeight: "180px",
        backgroundColor: "#2a2a2a",
      }}
    >
      <div
        style={{
          backgroundColor: "#3a3a3a",
          padding: "6px 10px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#ff6b6b",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#ffd93d",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#6bcb77",
              display: "inline-block",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#555",
            borderRadius: "3px",
            height: "12px",
          }}
        />
      </div>
      <div style={{ padding: "12px", display: "flex", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "10px",
              color: "#ccc",
              marginBottom: "6px",
              fontWeight: 600,
            }}
          >
            Specific Image
          </div>
          <div
            style={{
              fontSize: "9px",
              color: "#aaa",
              marginBottom: "8px",
              lineHeight: "1.4",
            }}
          >
            Get a specific image by adding /id/{"{id}"} to the start of the url.
          </div>
          <div
            style={{
              fontSize: "9px",
              color: "#70D84C",
              textDecoration: "underline",
              marginBottom: "8px",
            }}
          >
            https://picsum.photos/id/0/5000/3333
          </div>
          <div style={{ fontSize: "9px", color: "#aaa" }}>
            You can find a list of all the images here.
          </div>
        </div>
        <div
          style={{
            width: "80px",
            borderRadius: "4px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1518882174711-1de40238921b?w=120&h=90&fit=crop&auto=format"
            alt="Dog photo"
            style={{ width: "100%", height: "80px", objectFit: "cover" }}
          />
        </div>
      </div>
      <div style={{ padding: "4px 12px 10px", fontSize: "9px", color: "#aaa" }}>
        Static Random Image
      </div>
    </div>
  )
}

function VideoPlayer() {
  return (
    <div
      style={{
        backgroundColor: "#000",
        borderRadius: "8px",
        height: "100%",
        minHeight: "180px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: "22px solid transparent",
          borderBottom: "22px solid transparent",
          borderLeft: "38px solid rgba(255,255,255,0.9)",
          marginLeft: "6px",
        }}
      />
    </div>
  )
}

type MediaKind = "browser" | "screenshot" | "video"

const GALLERY_ITEMS: MediaKind[] = [
  "browser", "screenshot", "video",
  "video", "browser", "screenshot",
  "screenshot", "video", "browser",
]

function MediaItem({ kind, scale = 1 }: { kind: MediaKind; scale?: number }) {
  if (kind === "browser") return <BrowserMockup />
  if (kind === "screenshot") return <ScreenshotMockup />
  return <VideoPlayer />
}

function MediaLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: {
  items: MediaKind[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onGoTo: (i: number) => void
}) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose, onPrev, onNext])

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "16px",
          overflow: "hidden",
          width: "min(1100px, 90vw)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: `1px solid ${COLORS.border}` }}>
          <span style={{ color: COLORS.textSecondary, fontSize: "13px" }}>
            {index + 1} / {items.length}
          </span>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: COLORS.textSecondary, cursor: "pointer", padding: "4px", display: "flex", lineHeight: 1 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Media + arrows */}
        <div style={{ display: "flex", alignItems: "center", gap: "0", background: "#111" }}>
          <button
            onClick={onPrev}
            style={{ flexShrink: 0, width: "56px", alignSelf: "stretch", background: "none", border: "none", color: COLORS.green, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(112,216,76,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          <div style={{ flex: 1, aspectRatio: "16/9" }}>
            <MediaItem kind={items[index]} />
          </div>

          <button
            onClick={onNext}
            style={{ flexShrink: 0, width: "56px", alignSelf: "stretch", background: "none", border: "none", color: COLORS.green, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(112,216,76,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* Thumbnail strip */}
        <div style={{ display: "flex", gap: "8px", padding: "12px 16px", overflowX: "auto", scrollbarWidth: "none" as const, borderTop: `1px solid ${COLORS.border}` }}>
          {items.map((kind, i) => (
            <button
              key={i}
              onClick={() => onGoTo(i)}
              style={{ flexShrink: 0, width: "100px", aspectRatio: "16/9", borderRadius: "6px", overflow: "hidden", border: `2px solid ${i === index ? COLORS.green : "transparent"}`, cursor: "pointer", padding: 0, backgroundColor: "transparent" }}
            >
              <MediaItem kind={kind} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectDetailsPage() {
  const [lightboxIdx, setLightboxIdx] = React.useState<number | null>(null)

  const openLightbox = (i: number) => setLightboxIdx(i)
  const closeLightbox = () => setLightboxIdx(null)
  const prevItem = () => setLightboxIdx((i) => i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)
  const nextItem = () => setLightboxIdx((i) => i === null ? null : (i + 1) % GALLERY_ITEMS.length)

  return (
    <div
      style={{
        backgroundColor: COLORS.bg,
        minHeight: "1080px",
        width: "1920px",
        padding: "48px 80px",
        fontFamily: "Inter, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            color: COLORS.textPrimary,
            fontSize: "40px",
            fontWeight: 700,
            margin: "0 0 16px 0",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          SiteWebBlue.com - Sistema de Gestão Acadêmica
        </h1>

        {/* Metadata row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <Tag>Concluído</Tag>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {[
              "Ciência da computação",
              "8ª Fase",
              "Data de criação: 10/09/2026",
              "Última atualização: 14/09/2026",
            ].map((item, i, arr) => (
              <div
                key={item}
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <span style={{ color: COLORS.textSecondary, fontSize: "15px" }}>
                  {item}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ color: COLORS.border, fontSize: "18px" }}>
                    |
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          borderTop: `1px solid ${COLORS.border}`,
          marginBottom: "28px",
        }}
      />

      {/* Main layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Description card */}
          <Card title="Sobre" collapsible peekHeight="260px">
            <p style={{ color: COLORS.textSecondary, fontSize: "15px", lineHeight: "1.7", margin: "0 0 16px 0" }}>
              O SiteWebBlue é uma plataforma web voltada para a centralização e acompanhamento de rotinas acadêmicas no ambiente universitário.
            </p>
            <p style={{ color: COLORS.textSecondary, fontSize: "15px", lineHeight: "1.7", margin: "0 0 16px 0" }}>
              O sistema foi desenvolvido para resolver a fragmentação de avisos, materiais de aula e cronogramas, oferecendo um canal único e intuitivo tanto para estudantes quanto para o corpo docente.
            </p>
            <p style={{ color: COLORS.textSecondary, fontSize: "15px", lineHeight: "1.7", margin: "0 0 16px 0" }}>
              A plataforma integra ferramentas de comunicação assíncrona, permitindo que professores publiquem materiais de aula, exercícios e avisos de forma estruturada, enquanto estudantes acompanham seu desempenho em tempo real através de dashboards personalizados.
            </p>
            <p style={{ color: COLORS.textSecondary, fontSize: "15px", margin: "0 0 10px 0" }}>
              Principais funcionalidades:
            </p>
            <ul style={{ color: COLORS.textSecondary, fontSize: "15px", lineHeight: "1.8", margin: "0 0 16px 0", paddingLeft: "22px" }}>
              <li>Painel centralizado para consulta de notas, frequências e prazos de entregas.</li>
              <li>Espaço para envio de trabalhos e feedback direto de orientadores.</li>
              <li>Notificações em tempo real sobre atualizações de horários e eventos do campus.</li>
              <li>Interface moderna e responsiva focada em acessibilidade e rapidez de navegação.</li>
              <li>Calendário acadêmico integrado com sincronização de eventos e provas.</li>
              <li>Repositório de materiais organizados por disciplina e período letivo.</li>
              <li>Sistema de mensagens internas entre alunos e professores.</li>
            </ul>
            <p style={{ color: COLORS.textSecondary, fontSize: "15px", lineHeight: "1.7", margin: "0 0 10px 0" }}>
              Arquitetura técnica:
            </p>
            <ul style={{ color: COLORS.textSecondary, fontSize: "15px", lineHeight: "1.8", margin: 0, paddingLeft: "22px" }}>
              <li>Frontend: HTML5, CSS3 com design system próprio e JavaScript ES6+.</li>
              <li>Backend: Node.js com Express.js e autenticação JWT.</li>
              <li>Banco de dados: PostgreSQL com ORM Sequelize e migrações versionadas.</li>
              <li>Hospedagem: deploy contínuo via GitHub Actions na plataforma Railway.</li>
            </ul>
          </Card>

          {/* Media gallery card */}
          <Card title="Galeria de Mídia" collapsible peekHeight="560px" style={{ padding: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
              {GALLERY_ITEMS.map((kind, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  style={{ aspectRatio: "16/9", borderRadius: "8px", overflow: "hidden", border: "2px solid transparent", cursor: "pointer", padding: 0, backgroundColor: "transparent", transition: "border-color 0.15s, transform 0.15s", display: "block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.green; e.currentTarget.style.transform = "scale(1.02)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "scale(1)" }}
                >
                  <MediaItem kind={kind} />
                </button>
              ))}
            </div>
          </Card>

          {lightboxIdx !== null && (
            <MediaLightbox
              items={GALLERY_ITEMS}
              index={lightboxIdx}
              onClose={closeLightbox}
              onPrev={prevItem}
              onNext={nextItem}
              onGoTo={setLightboxIdx}
            />
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Technologies */}
          <Card style={{ padding: "22px 20px" }}>
            <SidebarTitle>Tecnologias</SidebarTitle>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                justifyContent: "center",
              }}
            >
              {["HTML", "CSS", "Node.js", "PostgreSQL"].map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </Card>

          {/* Collaborators */}
          <Card style={{ padding: "22px 20px" }}>
            <SidebarTitle>Colaboradores</SidebarTitle>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {[
                {
                  name: "Antoni Ferraz",
                  avatar: avatars.antoni,
                  isAuthor: true,
                },
                {
                  name: "Gabriela Rodrigues",
                  avatar: avatars.gabriela,
                  isAuthor: false,
                },
                {
                  name: "Sérgio Tanque",
                  avatar: avatars.sergio,
                  isAuthor: false,
                },
              ].map(({ name, avatar, isAuthor }) => (
                <div
                  key={name}
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  <img
                    src={avatar}
                    alt={name}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      color: COLORS.textPrimary,
                      fontWeight: 700,
                      fontSize: "15px",
                      flex: 1,
                    }}
                  >
                    {name}
                  </span>
                  {isAuthor && (
                    <span
                      style={{
                        backgroundColor: COLORS.green,
                        color: COLORS.textOnGreen,
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: "50px",
                      }}
                    >
                      Autor
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Links */}
          <Card style={{ padding: "22px 20px" }}>
            <SidebarTitle>Links úteis</SidebarTitle>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <LinkButton icon={<IconExternalLink />} label="Versão Online" />
              <LinkButton icon={<IconGitHub />} label="Repositório GitHub" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
