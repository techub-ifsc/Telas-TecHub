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
  required: "#E53935",
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

export function SignUpPage() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<"criador" | "visitante">("criador");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <main
      style={{
        minHeight: "calc(100vh - 64px)",
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "52px 24px 80px",
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
        Nova conta
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
        {/* Account type selector */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <span style={{ color: C.textPrimary, fontWeight: 600, fontSize: "0.9375rem" }}>
            Selecione o tipo da conta
          </span>
          <div
            style={{
              display: "flex",
              background: "#1a1e1a",
              borderRadius: 10,
              padding: 3,
              gap: 3,
              border: `1px solid ${C.border}`,
            }}
          >
            {(["criador", "visitante"] as const).map((type) => {
              const active = accountType === type;
              return (
                <button
                  key={type}
                  onClick={() => setAccountType(type)}
                  style={{
                    background: active ? C.green : "transparent",
                    color: active ? C.greenDark : C.helper,
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 28px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.15s, color 0.15s",
                    textTransform: "capitalize",
                  }}
                >
                  {type === "criador" ? "Criador" : "Visitante"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Username */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <label style={{ fontSize: "0.9rem", fontWeight: 600, color: C.label }}>
            Nome de usuário <span style={{ color: C.required }}>*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setFocused("username")}
            onBlur={() => setFocused(null)}
            style={inputStyle(focused === "username")}
          />
        </div>

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <label style={{ fontSize: "0.9rem", fontWeight: 600, color: C.label }}>
            {accountType === "criador" ? "E-mail institucional do IFSC" : "E-mail"}{" "}
            <span style={{ color: C.required }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            placeholder={accountType === "criador" ? "aluno@ifsc.edu.br" : ""}
            style={inputStyle(focused === "email")}
          />
        </div>

        {/* Password */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <label style={{ fontSize: "0.9rem", fontWeight: 600, color: C.label }}>
            Senha <span style={{ color: C.required }}>*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocused("password")}
            onBlur={() => setFocused(null)}
            style={inputStyle(focused === "password")}
          />
          <span style={{ fontSize: "0.78rem", color: C.helper, marginTop: 1 }}>
            Mínimo de 8 caracteres, contendo pelo menos uma letra e um número.
          </span>
        </div>

        {/* Confirm password */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <label style={{ fontSize: "0.9rem", fontWeight: 600, color: C.label }}>
            Confirmar senha <span style={{ color: C.required }}>*</span>
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onFocus={() => setFocused("confirm")}
            onBlur={() => setFocused(null)}
            style={inputStyle(focused === "confirm")}
          />
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
            Criar conta
          </button>

          <p style={{ color: C.helper, fontSize: "0.9rem", margin: 0, textAlign: "center" }}>
            Já possui uma conta?{" "}
            <button
              onClick={() => navigate("/")}
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
              Entrar
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
