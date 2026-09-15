import { useState } from "react";
import { useNavigate } from "react-router";

const C = {
  bg: "#18191A",
  card: "#222426",
  input: "#1E2022",
  inputBorder: "#33363A",
  green: "#78DC50",
  greenDark: "#111",
  border: "#2D2F33",
  textPrimary: "#FFFFFF",
  label: "#9A9EA4",
  placeholder: "#60646C",
  helper: "#9fa0a1",
};

const inputStyle = (focused: boolean): React.CSSProperties => ({
  background: C.input,
  border: `1.5px solid ${focused ? C.green : C.inputBorder}`,
  borderRadius: 9,
  padding: "12px 14px",
  fontSize: "0.9375rem",
  color: C.textPrimary,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
  fontFamily: "inherit",
});

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <main
      style={{
        minHeight: "calc(100vh - 64px)",
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "25px 24px 80px",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 800,
          color: C.textPrimary,
          letterSpacing: "-0.03em",
          marginBottom: 36,
          textAlign: "center",
        }}
      >
        Acessar plataforma
      </h1>

      {/* Form card */}
      <div
        style={{
          background: C.card,
          borderRadius: 18,
          width: "100%",
          maxWidth: 560,
          padding: "32px 36px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <label style={{ fontSize: "0.9rem", fontWeight: 600, color: C.label }}>
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            style={inputStyle(focused === "email")}
          />
        </div>

        {/* Password */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <label style={{ fontSize: "0.9rem", fontWeight: 600, color: C.label }}>
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocused("password")}
            onBlur={() => setFocused(null)}
            style={inputStyle(focused === "password")}
          />
        </div>

        {/* Forgot password */}
        <div style={{ textAlign: "right", marginTop: -6 }}>
          <a
            href="#"
            style={{
              color: C.textPrimary,
              fontSize: "0.875rem",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Esqueceu a senha?
          </a>
        </div>

        {/* Submit + footer */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 4 }}>
          <button
            style={{
              background: C.green,
              color: C.greenDark,
              border: "none",
              borderRadius: 10,
              padding: "13px 0",
              width: "30%",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Entrar
          </button>

          <p style={{ color: C.helper, fontSize: "0.9rem", margin: 0, textAlign: "center" }}>
            Ainda não possui uma conta?{" "}
            <button
              onClick={() => navigate("/cadastro")}
              style={{
                background: "none",
                border: "none",
                color: C.textPrimary,
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
                textDecoration: "underline",
                padding: 0,
                fontFamily: "inherit",
              }}
            >
              Criar conta
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}