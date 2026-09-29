import { useNavigate } from "react-router";
import { useState } from "react"


const profilePhoto =
  "https://images.unsplash.com/photo-1565120130276-dfbd9a7a3ad7?crop=faces&fit=crop&fm=jpg&q=85&w=640&h=640"

function Icon({
  name,
  className = "size-full",
}: {
  name: "copy" | "edit" | "github" | "linkedin" | "link"
  className?: string
}) {
  const paths = {
    copy: (
      <>
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    github: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.5S18 0 15 1.8a13.4 13.4 0 0 0-7 0C5 0 3.8.5 3.8.5A5 5 0 0 0 3.7 4a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />
        <path d="M8 19c-3 .9-3-1.5-4-2" />
      </>
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    link: (
      <>
        <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
        <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      {paths[name]}
    </svg>
  )
}

type FilterTab = "todos" | "autor" | "colaborador"

const projects = [
  {
    img: "https://images.unsplash.com/photo-1540397106260-e24a507a08ea?fit=crop&fm=jpg&q=80&w=800&h=480",
    title: "Projeto node",
    desc: "API REST construída com Node.js e Express para gerenciamento de tarefas colaborativas.",
    tags: ["Node.js", "Back-end", "API"],
    role: "autor",
  },
  {
    img: "https://images.unsplash.com/photo-1675869940341-d495d49010b5?fit=crop&fm=jpg&q=80&w=800&h=480",
    title: "Projeto mocita",
    desc: "Plataforma web de agendamento com interface responsiva e integração de pagamentos.",
    tags: ["React", "Front-end", "Web"],
    role: "autor",
  },
  {
    img: "https://images.unsplash.com/photo-1582138825658-fb952c08b282?fit=crop&fm=jpg&q=80&w=800&h=480",
    title: "Transporter",
    desc: "Sistema de rastreamento de entregas em tempo real com painel administrativo.",
    tags: ["React", "PostgreSQL", "Maps"],
    role: "colaborador",
  },
  {
    img: "https://images.unsplash.com/photo-1630332458839-5ece43363621?fit=crop&fm=jpg&q=80&w=800&h=480",
    title: "Projeto eithub",
    desc: "Hub de projetos universitários conectando alunos e professores do IFSc.",
    tags: ["React", "Node.js", "Web"],
    role: "colaborador",
  },
]

export function Profile() {
  const [activeTab, setActiveTab] = useState<FilterTab>("autor")
  const [editHover, setEditHover] = useState(false)
  const navigate = useNavigate();

  const filtered = projects.filter((p) => {
    if (activeTab === "todos") return true
    if (activeTab === "autor") return p.role === "autor"
    return p.role === "colaborador"
  })

  return (
    <div className="bg-[#0f0f12] min-h-screen w-full flex flex-col">
      {/* Main Content */}
      <div className="flex-1 w-full max-w-[1551px] mx-auto px-8 py-10">
        <div className="flex gap-8 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            {/* HeroCard */}
            <div className="bg-[#1e1e22] border border-[#2a2a30] rounded-[21px] overflow-hidden relative">
              <div
                className="h-[175px] relative overflow-hidden"
                style={{
                  backgroundImage:
                    "linear-gradient(170deg, rgb(10, 25, 47) 0%, rgb(15, 45, 79) 50%, rgb(15, 76, 129) 100%)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1484 172.38' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -19.272 -165.92 0 742.02 0)'><stop stop-color='rgba(56,189,248,0.08)' offset='0'/><stop stop-color='rgba(56,189,248,0)' offset='0.7'/></radialGradient></defs></svg>\")",
                  }}
                />
              </div>

              {/* Edit button */}
              <div
                onClick={() => /*navigate("/perfil/editar")*/ console.log("Edit profile clicked")}
                onMouseEnter={() => setEditHover(true)}
                onMouseLeave={() => setEditHover(false)}
                style={{
                  position: "absolute",
                  top: "191px",
                  right: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  userSelect: "none",
                  transform: editHover ? "translateY(-2px)" : "translateY(0)",
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                  opacity: editHover ? 0.6 : 1,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter:Medium'",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "21px",
                    color: "white",
                  }}
                >
                  Editar
                </p>
                <div
                  style={{
                    width: "17px",
                    height: "17px",
                    position: "relative",
                  }}
                >
                  <Icon name="edit" />
                </div>
              </div>

              {/* Profile section */}
              <div className="flex flex-col items-center pb-8 -mt-[80px] relative">
                <div
                  className="p-[6px] rounded-full mb-4"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgb(163, 230, 53) 0%, rgb(56, 189, 248) 100%)",
                  }}
                >
                  <div className="size-[162px] rounded-full overflow-hidden bg-[#0f0f12]">
                    <img
                      alt="Antoni Ferraz"
                      className="size-full object-cover"
                      src={profilePhoto}
                    />
                  </div>
                </div>
                <p className="font-['Inter:Bold'] font-bold text-white text-[32px] leading-[43px] tracking-[-0.8px] text-center">
                  Antoni Ferraz
                </p>
                <p className="font-['Inter:Regular'] font-normal text-[#a1a1aa] text-[18px] leading-[27px] text-center mt-1">
                  Ciência da Computação
                </p>
                <div className="mt-4 bg-[#242429] border border-[#2a2a30] flex items-center gap-[10px] px-5 py-[10px] rounded-[13px] cursor-pointer">
                  <p className="font-['JetBrains_Mono:Medium'] font-medium text-[#85ce5a] text-[20px] leading-[27px]">
                    /p/antoni-ferraz
                  </p>
                  <div className="size-5 relative">
                    <Icon name="copy" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-[#1e1e22] border border-[#2a2a30] rounded-[18px] p-8">
              <p className="font-['Inter:Bold'] font-bold text-white text-[24px] leading-[38px]">
                Bio / Apresentação
              </p>
              <div className="mt-5 flex flex-col gap-4">
                <p className="font-['Inter:Regular'] font-normal text-[#a1a1aa] text-[18px] leading-[30px]">
                  Olá! Sou Antoni Ferraz, estudante de Ciência da Computação no
                  IFSc Lages, atualmente na 8ª fase do curso. Apaixonado por
                  tecnologia desde cedo, encontrei no desenvolvimento web minha
                  principal área de interesse e atuação.
                </p>
                <p className="font-['Inter:Regular'] font-normal text-[#a1a1aa] text-[18px] leading-[30px]">
                  Tenho experiência prática com React, Node.js e PostgreSQL,
                  desenvolvendo aplicações web completas — do planejamento ao
                  deploy. Também me interesse por testes de software, tendo
                  trabalhado com ferramentas de automação e QA em projetos
                  colaborativos.
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <p className="font-['Inter:Regular'] font-normal text-[#a1a1aa] text-[16px] leading-[21px]">
                  472/500
                </p>
              </div>
            </div>

            {/* Projects Section */}
            <div className="bg-[#1e1e22] border border-[#2a2a30] rounded-[18px] p-8">
              <p className="font-['Inter:Bold'] font-bold text-white text-[24px] leading-[38px]">
                Projetos
              </p>
              <div className="flex gap-2 mt-5">
                {([
                  ["todos", "Todos"],
                  ["autor", "Como autor"],
                  ["colaborador", "Como colaborador"],
                ] as [FilterTab, string][]).map(([tab, label]) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-[10px] cursor-pointer transition-all duration-200 ${activeTab === tab
                        ? "bg-[#85ce5a]"
                        : "bg-[#242429] border border-[#2a2a30] hover:border-[#85ce5a]"
                      }`}
                  >
                    <p
                      className={`font-['Inter:Medium'] font-medium text-[16px] leading-[21px] ${activeTab === tab ? "text-[#0f0f12]" : "text-[#a1a1aa]"
                        }`}
                    >
                      {label}
                    </p>
                  </button>
                ))}
              </div>
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((project) => (
                  <div
                    key={project.title}
                    className="bg-[#242429] border-2 border-[#474747] rounded-[15px] overflow-hidden flex flex-col cursor-pointer transition-all duration-200 hover:border-[#85ce5a] hover:scale-[1.03]"
                  >
                    <div className="bg-[#0f0f12] h-[180px] overflow-hidden">
                      <img
                        alt=""
                        className="w-full h-full object-cover opacity-80"
                        src={project.img}
                      />
                    </div>
                    <div className="p-5 flex flex-col gap-[10px]">
                      <p className="font-['Inter:Semi_Bold'] font-semibold text-white text-[18px] leading-[26px]">
                        {project.title}
                      </p>
                      <p className="font-['Inter:Regular'] font-normal text-[#a1a1aa] text-[15px] leading-[25px]">
                        {project.desc}
                      </p>
                      <div className="flex gap-1 flex-wrap pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#85ce5a] px-[10px] py-[2px] rounded-full"
                          >
                            <p className="font-['Inter:Bold'] font-bold text-[#0f0f12] text-[12px] leading-[19px]">
                              {tag}
                            </p>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-[411px] flex-shrink-0 flex flex-col gap-5">
            {/* Áreas de interesse */}
            <div className="bg-[#1e1e22] border border-[#2a2a30] rounded-[19px] p-8">
              <p className="font-['Inter:Bold'] font-bold text-white text-[24px] leading-[38px] text-center w-full">
                Áreas de interesse
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "React",
                  "Node.js",
                  "Python",
                  "PostgreSQL",
                  "CSS",
                  "HTML",
                  "Git",
                  "Figma",
                  "Agile",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#85ce5a] px-4 py-2 rounded-full"
                  >
                    <p className="font-['Inter:Bold'] font-bold text-[#0f0f12] text-[16px] leading-[22px]">
                      {tag}
                    </p>
                  </span>
                ))}
              </div>
            </div>

            {/* Links úteis & contato */}
            <div className="bg-[#1e1e22] border border-[#2a2a30] rounded-[19px] p-8">
              <p className="font-['Inter:Bold'] font-bold text-white text-[24px] leading-[38px] text-center w-full">
                Links úteis &amp; contato
              </p>
              <div className="mt-5 flex flex-col gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="size-[22px] relative flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1">
                    <Icon name="github" />
                  </div>
                  <p className="font-['Inter:Regular'] font-normal text-[#a1a1aa] text-[19px] leading-[27px] group-hover:text-white transition-colors duration-200">
                    GitHub
                  </p>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="size-[22px] relative flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1">
                    <Icon name="linkedin" />
                  </div>
                  <p className="font-['Inter:Regular'] font-normal text-[#a1a1aa] text-[19px] leading-[27px] group-hover:text-white transition-colors duration-200">
                    Linkedin
                  </p>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="size-[22px] relative flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1">
                    <Icon name="link" />
                  </div>
                  <p className="font-['Inter:Regular'] font-normal text-[#a1a1aa] text-[19px] leading-[27px] group-hover:text-white transition-colors duration-200">
                    portfólio/curriculum
                  </p>
                </a>
              </div>
            </div>

            {/* Situação acadêmica */}
            <div className="bg-[#1e1e22] border border-[#2a2a30] rounded-[19px] p-8">
              <p className="font-['Inter:Bold'] font-bold text-white text-[24px] leading-[38px] text-center w-full">
                Situação acadêmica
              </p>
              <div className="mt-5 flex flex-col items-center gap-1">
                <p className="font-['Inter:Bold'] font-bold text-[#a1a1aa] text-[21px] leading-[33px] text-center">
                  Ciência da Computação
                </p>
                <p className="font-['Inter:Regular'] font-normal text-[#a1a1aa] text-[16px] leading-[22px] text-center">
                  📅 Previsão de conclusão:
                </p>
                <p className="font-['Inter:Medium'] font-medium text-white text-[19px] leading-[27px] text-center mt-1 mb-2">
                  2026/2
                </p>
                <div className="bg-[#85ce5a] flex items-center gap-2 px-5 py-2 rounded-full">
                  <div className="size-2 rounded-full bg-[#0f0f12] opacity-70" />
                  <p className="font-['Inter:Bold'] font-bold text-[#0f0f12] text-[16px] leading-[22px]">
                    Em formação
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 border-t border-[#1e1e26] w-full py-8">
        <p className="font-['Inter:Regular'] font-normal text-[#52525b] text-[16px] leading-[21px] text-center">
          Copyright © 2026 — IFSC Lages
        </p>
      </div>
    </div>
  )
}
