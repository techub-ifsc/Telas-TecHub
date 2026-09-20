import { useState } from "react"
import { Outlet, Link, useNavigate } from "react-router"

const C = {
  bg: "#1b1c1e",
  navBg: "#17181a",
  border: "#282a2d",
  green: "#7ee753",
  greenDark: "#111213",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A4AB",
}

export function Root() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        backgroundColor: C.bg,
        color: C.textPrimary,
        minHeight: "100vh",
      }}
    >
      {/* Header Full Width */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: C.navBg,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "0 32px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          {/* Logo + Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.15rem",
              }}
            >
              <span
                style={{
                  color: C.green,
                  fontFamily: "monospace",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                }}
              >
                &lt;/&gt;
              </span>
              <span>Techub</span>
            </Link>

            <nav
              style={{ display: "flex", gap: 10 }}
              className="hidden md:flex"
            >
              {[
                ["Início", "/"],
                ["Projetos", "/projetos"],
                ["Criadores", "/alunos"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  to={href}
                  style={{
                    color: "#E0E2E6",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#E0E2E6")
                  }
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Botões Direita */}
          <div
            style={{ display: "flex", gap: 12, alignItems: "center" }}
            className="hidden md:flex"
          >
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "transparent",
                color: "#FFFFFF",
                border: "1px solid #FFFFFF",
                borderRadius: 6,
                padding: "6px 18px",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
              }}
            >
              Entrar
            </button>
            <button
              onClick={() => navigate("/cadastro")}
              style={{
                background: C.green,
                color: C.greenDark,
                border: "none",
                borderRadius: 6,
                padding: "7px 18px",
                fontSize: "0.875rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Criar conta
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
            }}
            aria-label="Menu"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 22,
                    height: 2,
                    background: "#fff",
                    borderRadius: 2,
                  }}
                />
              ))}
            </div>
          </button>
        </div>

        {mobileOpen && (
          <div
            style={{
              borderTop: `1px solid ${C.border}`,
              padding: "16px 24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: C.navBg,
            }}
          >
            {[
              ["Início", "/"],
              ["Projetos", "/projetos"],
              ["Criadores", "#"],
            ].map(([label, href]) => (
              <Link
                key={label}
                to={href}
                style={{
                  color: C.textSecondary,
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            ))}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: 8,
              }}
            >
              <button
                onClick={() => {
                  navigate("/cadastro")
                  setMobileOpen(false)
                }}
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid #fff",
                  borderRadius: 6,
                  padding: "8px",
                  fontWeight: 600,
                }}
              >
                Entrar
              </button>
              <button
                onClick={() => {
                  navigate("/login")
                  setMobileOpen(false)
                }}
                style={{
                  background: C.green,
                  color: C.greenDark,
                  border: "none",
                  borderRadius: 6,
                  padding: "8px",
                  fontWeight: 700,
                }}
              >
                Criar conta
              </button>
            </div>
          </div>
        )}
      </header>

      <Outlet />
    </div>
  )
}
