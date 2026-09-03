import { useState } from "react"
import { useNavigate } from "react-router"
import frameEtiqueta from "@/imports/Etiqueta.png"
import lupaImg from "@/imports/lupa.png"
import botaoX from "@/imports/botaoX.png"
import botaoXBranco from "@/imports/botaoXBranco.png"
import linkImg from "@/imports/Link.png"
import boldImg from "@/imports/B.png"
import italicImg from "@/imports/I.png"
import listaImg from "@/imports/Lista.png"
import maisImg from "@/imports/Mais.png"

const C = {
  bg: "#18191A",
  card: "#222426",
  input: "#1E2022",
  inputBorder: "#33363A",
  green: "#78DC50",
  greenDark: "#0f0f0f",
  border: "#2D2F33",
  textPrimary: "#FFFFFF",
  label: "#9A9EA4",
  placeholder: "#60646C",
  helper: "#60646C",
  required: "#E53935",
}

const inputBase: React.CSSProperties = {
  background: C.input,
  border: `1.5px solid ${C.inputBorder}`,
  borderRadius: 8,
  padding: "10px 14px",
  fontSize: "0.9rem",
  color: C.textPrimary,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.15s",
}

const MOCK_COLLABORATORS = [
  { id: 1, name: "Antoni Ferraz", color: "#3a5a8a" },
  { id: 2, name: "Gabriela Rodrigues", color: "#8a3a5a" },
  { id: 3, name: "Marcio Zunique", color: "#555" },
  { id: 4, name: "Lucas Mendes", color: "#4a7a5a" },
]

const STATUS_OPTIONS = [
  "Em design",
  "Em desenvolvimento",
  "Concluído",
  "Pausado",
]

export function NewProjectPage() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState(["Web", "Front-end"])
  const [collaboratorInput, setCollaboratorInput] = useState("")
  const [collaborators] = useState(MOCK_COLLABORATORS)
  const [github, setGithub] = useState("")
  const [liveUrl, setLiveUrl] = useState("")
  const [status, setStatus] = useState("Em design")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const removeTag = (tag: string) =>
    setTags((prev) => prev.filter((t) => t !== tag))

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags((prev) => [...prev, tagInput.trim()])
      setTagInput("")
    }
  }

  const focusStyle = (field: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focusedField === field ? C.green : C.inputBorder,
  })

  return (
    <main
      style={{
        minHeight: "calc(100vh - 60px)",
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 24px 80px",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 800,
          color: C.textPrimary,
          letterSpacing: "-0.03em",
          marginBottom: 28,
          textAlign: "center",
        }}
      >
        Novo projeto
      </h1>

      {/* Form card */}
      <div
        style={{
          background: C.card,
          borderRadius: 18,
          width: "100%",
          maxWidth: 600,
          padding: "28px 28px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* Título */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label
            style={{ fontSize: "0.875rem", fontWeight: 600, color: C.label }}
          >
            Título <span style={{ color: C.required }}>*</span>
          </label>
          <input
            type="text"
            maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setFocusedField("title")}
            onBlur={() => setFocusedField(null)}
            style={focusStyle("title")}
          />
          <span
            style={{ fontSize: "0.75rem", color: C.helper, textAlign: "right" }}
          >
            {title.length}/100
          </span>
        </div>

        {/* Descrição */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label
            style={{ fontSize: "0.875rem", fontWeight: 600, color: C.label }}
          >
            Descrição do projeto
          </label>
          {/* Toolbar */}
          <div
            style={{
              background: C.input,
              border: `1.5px solid ${
                focusedField === "desc" ? C.green : C.inputBorder
              }`,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 6,
                padding: "8px 10px",
                borderBottom: `1px solid ${C.inputBorder}`,
              }}
            >
              <button
                title="Negrito"
                style={{
                  width: 30,
                  height: 30,
                  background: C.green,
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={boldImg}
                  alt="Negrito"
                  style={{ width: 16, height: 16, objectFit: "contain" }}
                />
              </button>
              <button
                title="Itálico"
                style={{
                  width: 30,
                  height: 30,
                  background: C.green,
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={italicImg}
                  alt="Itálico"
                  style={{ width: 16, height: 16, objectFit: "contain" }}
                />
              </button>
              <button
                title="Lista"
                style={{
                  width: 30,
                  height: 30,
                  background: C.green,
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={listaImg}
                  alt="Lista"
                  style={{ width: 16, height: 16, objectFit: "contain" }}
                />
              </button>
              <button
                title="Link"
                style={{
                  width: 30,
                  height: 30,
                  background: C.green,
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={linkImg}
                  alt="Link"
                  style={{ width: 16, height: 16, objectFit: "contain" }}
                />
              </button>
            </div>
            <textarea
              maxLength={3000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => setFocusedField("desc")}
              onBlur={() => setFocusedField(null)}
              rows={6}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 14px",
                fontSize: "0.9rem",
                color: C.textPrimary,
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>
          <span
            style={{ fontSize: "0.75rem", color: C.helper, textAlign: "right" }}
          >
            {description.length}/3000
          </span>
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            paddingBottom: 30,
          }}
        >
          <label
            style={{ fontSize: "0.875rem", fontWeight: 600, color: C.label }}
          >
            Tags
          </label>
          <div
            style={{
              background: C.input,
              border: `1.5px solid ${
                focusedField === "tags" ? C.green : C.inputBorder
              }`,
              borderRadius: 8,
              overflow: "hidden",
              transition: "border-color 0.15s",
            }}
          >
            {/* Linha de busca do input (com borda inferior separadora) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                borderBottom:
                  tags.length > 0 ? `1px solid ${C.inputBorder}` : "none",
              }}
            >
              <img
                src={frameEtiqueta}
                alt="tag"
                style={{
                  width: 16,
                  height: 16,
                  objectFit: "contain",
                  opacity: 0.6,
                  flexShrink: 0,
                }}
              />
              <input
                type="text"
                placeholder="Digite para buscar tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onFocus={() => setFocusedField("tags")}
                onBlur={() => setFocusedField(null)}
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

            {/* Área inferior de tags dentro do mesmo bloco */}
            {tags.length > 0 && (
              <div
                style={{
                  padding: "10px 14px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: C.green,
                      color: C.greenDark,
                      borderRadius: 999,
                      padding: "4px 12px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={botaoX}
                        alt="remover"
                        style={{
                          width: 10,
                          height: 10,
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Colaboradores */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            paddingBottom: 30,
          }}
        >
          <label
            style={{ fontSize: "0.875rem", fontWeight: 600, color: C.label }}
          >
            Colaboradores
          </label>
          <div
            style={{
              background: C.input,
              border: `1.5px solid ${
                focusedField === "collab" ? C.green : C.inputBorder
              }`,
              borderRadius: 8,
              overflow: "hidden",
              transition: "border-color 0.15s",
            }}
          >
            {/* Linha de busca */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                borderBottom:
                  collaborators.length > 0
                    ? `1px solid ${C.inputBorder}`
                    : "none",
              }}
            >
              <img
                src={lupaImg}
                alt="buscar"
                style={{
                  width: 16,
                  height: 16,
                  objectFit: "contain",
                  opacity: 0.6,
                  flexShrink: 0,
                }}
              />
              <input
                type="text"
                placeholder="Pesquisar colaborador"
                value={collaboratorInput}
                onChange={(e) => setCollaboratorInput(e.target.value)}
                onFocus={() => setFocusedField("collab")}
                onBlur={() => setFocusedField(null)}
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

            {/* Collaborator cards integrados */}
            {collaborators.length > 0 && (
              <div
                style={{
                  padding: "14px 14px 14px",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 10,
                }}
              >
                {collaborators.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      background: "#2a2b2e",
                      border: `1px solid ${C.border}`,
                      borderRadius: 12,
                      padding: "12px 8px 12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      position: "relative",
                      boxSizing: "border-box",
                    }}
                  >
                    <button
                      //onClick={onRemove}
                      title="Remover"
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "transparent",
                        border: `1.5px solid #59595a`,
                        backgroundColor: "#212122",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: c.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.3rem",
                        color: "#fff",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {c.name.charAt(0)}
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: C.textPrimary,
                        textAlign: "center",
                        lineHeight: 1.35,
                        wordBreak: "break-word",
                        fontWeight: 500,
                      }}
                    >
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rules */}
          <ul
            style={{
              margin: 0,
              padding: "0 0 0 5px",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {[
              "• O rascunho salvo fica visível para você e os colaboradores.",
              "• Os colaboradores também podem editar o projeto.",
              "• Só o dono pode excluir o projeto.",
            ].map((rule) => (
              <li key={rule} style={{ fontSize: "0.78rem", color: C.placeholder, fontWeight: 700 }}>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Links externos */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            paddingBottom: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <GithubIcon />
            <input
              type="url"
              placeholder="https://github.com/usuario/repositorio"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              onFocus={() => setFocusedField("github")}
              onBlur={() => setFocusedField(null)}
              style={{
                ...focusStyle("github"),
                borderColor:
                  focusedField === "github" ? C.green : C.inputBorder,
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ExternalLinkIcon />
            <input
              type="url"
              placeholder="Link para demonstração"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              onFocus={() => setFocusedField("live")}
              onBlur={() => setFocusedField(null)}
              style={{
                ...focusStyle("live"),
                borderColor: focusedField === "live" ? C.green : C.inputBorder,
              }}
            />
          </div>
        </div>

        {/* Upload midia area */}
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
          }}
          style={{
            border: `2px dashed ${dragOver ? C.green : C.inputBorder}`,
            borderRadius: 12,
            background: dragOver ? "rgba(120,220,80,0.05)" : C.input,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            gap: 10,
            cursor: "pointer",
            transition: "border-color 0.15s, background 0.15s",
            paddingBottom: 30,
          }}
        >
          <img
            src={maisImg}
            alt="Adicionar"
            style={{ width: 48, height: 48, objectFit: "contain" }}
          />
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                margin: 0,
                color: C.textPrimary,
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              Adicionar&nbsp; fotos / vídeos
            </p>
            <p
              style={{ margin: "4px 0 0", color: C.helper, fontSize: "0.8rem" }}
            >
              Ou arraste e solte arquivos aqui
            </p>
          </div>
        </div>

        {/* Status */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
            paddingTop: 30,
          }}
        >
          <label
            style={{ fontSize: "0.875rem", fontWeight: 600, color: C.label }}
          >
            Status
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              width: "100%",
            }}
          >
            {STATUS_OPTIONS.map((s) => {
              const active = status === s
              return (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  style={{
                    background: "transparent",
                    border: `1.5px solid ${active ? C.green : C.inputBorder}`,
                    borderRadius: 10,
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                    color: C.textPrimary,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    fontFamily: "inherit",
                    transition: "border-color 0.15s",
                  }}
                >
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      border: `2px solid ${active ? C.green : C.label}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {active && (
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: C.green,
                          display: "block",
                        }}
                      />
                    )}
                  </span>
                  {s}
                </button>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            marginTop: 8,
            width: "100%",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              width: 180, // ajuste a largura fixa que preferir
              flexShrink: 0,
              background: "#ffffff",
              color: "#111",
              border: "none",
              borderRadius: 8,
              padding: "12px 10px",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Salvar rascunho
          </button>

          <button
            style={{
              width: 180, // mesma largura fixa aqui
              flexShrink: 0,
              background: C.green,
              color: C.greenDark,
              border: "none",
              borderRadius: 8,
              padding: "12px 10px",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Enviar para revisão
          </button>
        </div>
      </div>
    </main>
  )
}

function GithubIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
        fill={C.label}
      />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
        stroke={C.label}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 3h6v6M10 14L21 3"
        stroke={C.label}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
