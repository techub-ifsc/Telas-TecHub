import { useState } from 'react';

const assetPathPrefix = "../imports/assets";
const imgIcon = `${assetPathPrefix}/54ce4.svg`;
const imgIcon1 = `${assetPathPrefix}/637ad.svg`;
const imgIcon2 = `${assetPathPrefix}/4ef9e.svg`;

const initialBio =
  'Olá! Sou Antoni Ferraz, estudante de Ciência da Computação no IFSc Lages, atualmente na 8ª fase do curso. Apaixonado por tecnologia desde cedo, encontrei no desenvolvimento web minha principal área de interesse e atuação.\n\nTenho experiência prática com React, Node.js e PostgreSQL, desenvolvendo aplicações web completas — do planejamento ao deploy. Também me interesse por testes de software, tendo trabalhado com ferramentas de automação e QA em projetos colaborativos.';

export function ProfileEdit() {
  const [editHover, setEditHover] = useState(false);
  const [bio, setBio] = useState(initialBio);
  const [interests, setInterests] = useState([
    'React',
    'Node.js',
    'Python',
    'PostgreSQL',
    'CSS',
    'HTML',
    'Git',
    'Figma',
    'Agile',
  ]);
  const [newInterest, setNewInterest] = useState('');
  const [showInterestDropdown, setShowInterestDropdown] = useState(false);

  const allTechAreas = [
    // Linguagens
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Dart', 'Scala', 'R', 'MATLAB', 'Lua', 'Perl', 'Haskell', 'Elixir', 'Clojure', 'F#', 'Assembly',
    // Frontend
    'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'HTML', 'CSS', 'Sass/SCSS', 'Tailwind CSS', 'Bootstrap', 'jQuery', 'Three.js', 'WebGL', 'WebAssembly',
    // Backend
    'Node.js', 'Express.js', 'NestJS', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'Laravel', 'Rails', 'ASP.NET', 'Fiber', 'Gin', 'Phoenix',
    // Mobile
    'React Native', 'Flutter', 'Android', 'iOS', 'Expo', 'Ionic',
    // Banco de dados
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Cassandra', 'DynamoDB', 'Firebase', 'Supabase', 'Elasticsearch', 'Neo4j', 'InfluxDB',
    // DevOps / Cloud
    'Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Azure', 'Terraform', 'Ansible', 'Jenkins', 'GitHub Actions', 'CI/CD', 'Linux', 'Nginx', 'Apache',
    // IA / ML
    'Machine Learning', 'Deep Learning', 'Inteligência Artificial', 'NLP', 'Computer Vision', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Keras', 'LangChain', 'LLMs',
    // Dados
    'Data Science', 'Big Data', 'Data Engineering', 'Apache Spark', 'Hadoop', 'Kafka', 'Airflow', 'dbt', 'Power BI', 'Tableau', 'Looker',
    // Segurança
    'Cybersecurity', 'Pentest', 'Ethical Hacking', 'Criptografia', 'OWASP', 'Segurança de Redes', 'Forense Digital',
    // Design / UX
    'UI/UX Design', 'Figma', 'Design System', 'Acessibilidade', 'Prototipação', 'User Research',
    // Metodologias / Práticas
    'Agile', 'Scrum', 'Kanban', 'TDD', 'DDD', 'Clean Code', 'SOLID', 'Microserviços', 'Arquitetura de Software', 'API REST', 'GraphQL', 'gRPC', 'WebSockets',
    // Ferramentas
    'Git', 'GitHub', 'GitLab', 'Jira', 'Notion', 'VS Code', 'Vim', 'Postman',
    // Outros
    'Blockchain', 'Web3', 'IoT', 'Embedded Systems', 'Computação Quântica', 'Realidade Virtual', 'Realidade Aumentada', 'Jogos', 'Unity', 'Unreal Engine', 'Robótica',
  ];

  const filteredTechAreas = allTechAreas.filter(
    (area) =>
      area.toLowerCase().includes(newInterest.toLowerCase()) &&
      !interests.some((i) => i.toLowerCase() === area.toLowerCase())
  );
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [course, setCourse] = useState('');

  const courseLabels: Record<string, string> = {
    'ciencia-computacao': 'Ciência da Computação',
    'engenharia-software': 'Engenharia de Software',
    'sistemas-informacao': 'Sistemas de Informação',
    'analise-desenvolvimento-sistemas': 'Análise e Desenvolvimento de Sistemas',
  };

  const addInterest = (value?: string) => {
    const interest = (value ?? newInterest).trim();
    if (!interest || interests.some((item) => item.toLowerCase() === interest.toLowerCase())) return;

    setInterests((current) => [...current, interest]);
    setNewInterest('');
    setShowInterestDropdown(false);
  };

  return (
    <div className="bg-[#0f0f12] min-h-screen w-full flex flex-col">

      {/* Main Content */}
      <div className="flex-1 w-full max-w-[1551px] mx-auto px-8 py-10">
        <div className="flex gap-8 items-stretch">
          {/* Left column */}
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            {/* HeroCard */}
            <div className="bg-[#1e1e22] border border-[#2a2a30] rounded-[21px] overflow-hidden relative">
              <div
                className="h-[175px] relative overflow-hidden"
                style={{ backgroundImage: "linear-gradient(170deg, rgb(10, 25, 47) 0%, rgb(15, 45, 79) 50%, rgb(15, 76, 129) 100%)" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1484 172.38' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -19.272 -165.92 0 742.02 0)'><stop stop-color='rgba(56,189,248,0.08)' offset='0'/><stop stop-color='rgba(56,189,248,0)' offset='0.7'/></radialGradient></defs></svg>\")",
                  }}
                />
                <label
                  className="absolute bottom-5 right-5 z-10 size-[50px] bg-[#0f0f12] border-[3px] border-[#85ce5a] rounded-[16px] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#18181c] hover:border-[#a3e635] hover:scale-105"
                  aria-label="Alterar banner do perfil"
                >
                  <input className="sr-only" type="file" accept="image/*" />
                  <svg
                    aria-hidden="true"
                    className="size-7 text-[#85ce5a]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.5 6 10 4h4l1.5 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12.5" r="3.25" stroke="currentColor" strokeWidth="2.2" />
                  </svg>
                </label>
              </div>

              {/* Cancel edit button */}
              <button
                type="button"
                onClick={() => alert('Edição cancelada')}
                onMouseEnter={() => setEditHover(true)}
                onMouseLeave={() => setEditHover(false)}
                style={{
                  position: 'absolute',
                  top: '191px',
                  right: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transform: editHover ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'transform 0.2s ease, opacity 0.2s ease',
                  opacity: editHover ? 0.6 : 1,
                  background: 'transparent',
                  border: 0,
                }}
                className="cursor-pointer"
              >
                <p style={{
                  fontFamily: "'Inter:Medium'",
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '21px',
                  color: 'white',
                }}>Cancelar Edição</p>
                <span className="text-white text-[22px] leading-none" aria-hidden="true">×</span>
              </button>

              {/* Profile section */}
              <div className="flex flex-col items-center pb-8 -mt-[80px] relative">
                <label
                  className="p-[6px] rounded-full mb-4 cursor-pointer group"
                  style={{ backgroundImage: "linear-gradient(135deg, rgb(163, 230, 53) 0%, rgb(56, 189, 248) 100%)" }}
                  aria-label="Escolher nova foto de perfil"
                >
                  <input className="sr-only" type="file" accept="image/*" />
                  <div className="size-[162px] rounded-full overflow-hidden bg-[#0f0f12] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#18181c]">
                    <svg
                      aria-hidden="true"
                      className="size-14 text-[#85ce5a] transition-transform duration-200 group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.5 6 10 4h4l1.5 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12.5" r="3.5" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                  </div>
                </label>
                <input
                  type="text"
                  defaultValue="Antoni Ferraz"
                  aria-label="Nome"
                  className="w-[360px] max-w-[80%] bg-[#242429] border border-[#3a3a42] rounded-[10px] px-4 py-2 outline-none font-['Inter:Bold'] font-bold text-white text-[28px] leading-[38px] tracking-[-0.8px] text-center focus:border-[#85ce5a] transition-colors duration-200"
                />
                <p className="mt-2 font-['Inter:Regular'] font-normal text-[#d4d4d8] text-[18px] leading-[27px]">
                  {course ? courseLabels[course] : 'Ciência da Computação'}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <p className="font-['JetBrains_Mono:Medium'] font-medium text-[#85ce5a] text-[20px] leading-[27px]">/p/</p>
                  <input
                    type="text"
                    defaultValue="antoni-ferraz"
                    aria-label="Endereço do perfil"
                    className="w-[220px] bg-[#242429] border border-[#3a3a42] rounded-[10px] px-3 py-2 outline-none font-['JetBrains_Mono:Medium'] font-medium text-[#85ce5a] text-[16px] focus:border-[#85ce5a] transition-colors duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-[#1e1e22] border border-[#2a2a30] rounded-[18px] p-8 flex-1 flex flex-col">
              <p className="font-['Inter:Bold'] font-bold text-white text-[24px] leading-[38px]">Bio</p>
              <div className="mt-5 bg-[#242429] border border-[#3a3a42] rounded-[13px] p-4 pb-9 focus-within:border-[#85ce5a] transition-colors duration-200 relative flex-1">
                <textarea
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  maxLength={500}
                  className="w-full h-full min-h-[210px] resize-none bg-transparent outline-none font-['Inter:Regular'] font-normal text-[#d4d4d8] text-[18px] leading-[30px]"
                  aria-label="Bio ou apresentação"
                />
                <p className="absolute right-4 bottom-3 font-['Inter:Regular'] font-normal text-[#71717a] text-[14px] leading-[20px]">
                  {bio.length}/500
                </p>
              </div>
            </div>

          </div>

          {/* Right sidebar */}
          <div className="w-[411px] flex-shrink-0 flex flex-col gap-5">
            {/* Áreas de interesse */}
            <div className="bg-[#1e1e22] border border-[#2a2a30] rounded-[19px] p-8">
              <p className="font-['Inter:Bold'] font-bold text-white text-[24px] leading-[38px] text-center w-full">Áreas de interesse</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {interests.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => setInterests((current) => current.filter((item) => item !== tag))}
                    className="bg-[#85ce5a] flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors duration-200 hover:bg-[#a3e635]"
                    aria-label={`Remover ${tag}`}
                  >
                    <p className="font-['Inter:Bold'] font-bold text-[#0f0f12] text-[16px] leading-[22px]">{tag}</p>
                    <span className="font-['Inter:Bold'] font-bold text-[#0f0f12] text-[18px] leading-none" aria-hidden="true">×</span>
                  </button>
                ))}
              </div>
              <div className="mt-5 relative">
                <div className="flex items-center gap-2 bg-[#242429] border border-[#3a3a42] rounded-[12px] px-4 py-3 focus-within:border-[#85ce5a] transition-colors duration-200">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(event) => {
                      setNewInterest(event.target.value);
                      setShowInterestDropdown(true);
                    }}
                    onFocus={() => setShowInterestDropdown(true)}
                    onBlur={() => setTimeout(() => setShowInterestDropdown(false), 150)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') addInterest();
                      if (event.key === 'Escape') setShowInterestDropdown(false);
                    }}
                    placeholder="Adicionar interesse"
                    className="min-w-0 flex-1 bg-transparent outline-none font-['Inter:Regular'] text-white placeholder:text-[#71717a] text-[15px]"
                  />
                  <button
                    type="button"
                    onClick={() => addInterest()}
                    className="text-[#85ce5a] font-['Inter:Bold'] font-bold text-[20px] leading-none cursor-pointer hover:text-[#a3e635] transition-colors"
                    aria-label="Adicionar interesse"
                  >
                    +
                  </button>
                </div>
                {showInterestDropdown && filteredTechAreas.length > 0 && (
                  <div className="absolute z-50 left-0 right-0 mt-1 bg-[#1a1a1f] border border-[#3a3a42] rounded-[12px] max-h-[220px] overflow-y-auto shadow-xl">
                    {filteredTechAreas.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onMouseDown={() => addInterest(area)}
                        className="w-full text-left px-4 py-2 font-['Inter:Regular'] text-[#d4d4d8] text-[14px] hover:bg-[#242429] hover:text-white transition-colors duration-150 first:rounded-t-[12px] last:rounded-b-[12px]"
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Links úteis & contato */}
            <div className="bg-[#1e1e22] border border-[#2a2a30] rounded-[19px] p-8">
              <p className="font-['Inter:Bold'] font-bold text-white text-[24px] leading-[38px] text-center w-full">Links úteis &amp; contato</p>
              <div className="mt-5 flex flex-col gap-3">
                <label className="flex items-center gap-3">
                  <span className="w-[92px] flex-shrink-0 flex items-center gap-3">
                    <span className="size-[22px] relative flex-shrink-0">
                      <img alt="" className="absolute inset-0 size-full" src={imgIcon} />
                    </span>
                    <span className="font-['Inter:Medium'] font-medium text-[#a1a1aa] text-[16px] leading-[22px]">GitHub</span>
                  </span>
                  <input
                    type="url"
                    placeholder="https://github.com/seu-usuario"
                    className="min-w-0 flex-1 bg-[#242429] border border-[#3a3a42] rounded-[10px] px-3 py-2 outline-none font-['Inter:Regular'] text-white placeholder:text-[#71717a] text-[14px] focus:border-[#85ce5a] transition-colors duration-200"
                  />
                </label>
                <label className="flex items-center gap-3">
                  <span className="w-[92px] flex-shrink-0 flex items-center gap-3">
                    <span className="size-[22px] relative flex-shrink-0">
                      <img alt="" className="absolute inset-0 size-full" src={imgIcon1} />
                    </span>
                    <span className="font-['Inter:Medium'] font-medium text-[#a1a1aa] text-[16px] leading-[22px]">LinkedIn</span>
                  </span>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/seu-usuario"
                    className="min-w-0 flex-1 bg-[#242429] border border-[#3a3a42] rounded-[10px] px-3 py-2 outline-none font-['Inter:Regular'] text-white placeholder:text-[#71717a] text-[14px] focus:border-[#85ce5a] transition-colors duration-200"
                  />
                </label>
                <label className="flex items-center gap-3">
                  <span className="w-[92px] flex-shrink-0 flex items-center gap-3">
                    <span className="size-[22px] relative flex-shrink-0">
                      <img alt="" className="absolute inset-0 size-full" src={imgIcon2} />
                    </span>
                    <span className="font-['Inter:Medium'] font-medium text-[#a1a1aa] text-[16px] leading-[22px]">Portfólio</span>
                  </span>
                  <label className="min-w-0 flex-1 flex items-center gap-2 bg-[#242429] border border-dashed border-[#3a3a42] rounded-[10px] px-3 py-2 cursor-pointer hover:border-[#85ce5a] transition-colors duration-200 group">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.zip"
                      className="sr-only"
                      onChange={(e) => setPortfolioFile(e.target.files?.[0] ?? null)}
                    />
                    <svg className="size-4 flex-shrink-0 text-[#71717a] group-hover:text-[#85ce5a] transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
                    </svg>
                    <span className="font-['Inter:Regular'] text-[14px] truncate" style={{ color: portfolioFile ? '#d4d4d8' : '#71717a' }}>
                      {portfolioFile ? portfolioFile.name : 'Enviar arquivo (PDF, DOC, ZIP)'}
                    </span>
                  </label>
                </label>
              </div>
            </div>

            {/* Situação acadêmica */}
            <div className="bg-[#1e1e22] border border-[#2a2a30] rounded-[19px] p-8">
              <p className="font-['Inter:Bold'] font-bold text-white text-[24px] leading-[38px] text-center w-full">Situação acadêmica</p>
              <div className="mt-5 flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                  <span className="font-['Inter:Medium'] font-medium text-[#a1a1aa] text-[15px] leading-[21px]">Curso</span>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full bg-[#242429] border border-[#3a3a42] rounded-[10px] px-3 py-2 outline-none font-['Inter:Regular'] text-white text-[15px] cursor-pointer focus:border-[#85ce5a] transition-colors duration-200"
                  >
                    <option value="" disabled>Escolha o curso</option>
                    <option value="ciencia-computacao">Ciência da Computação</option>
                    <option value="engenharia-software">Engenharia de Software</option>
                    <option value="sistemas-informacao">Sistemas de Informação</option>
                    <option value="analise-desenvolvimento-sistemas">Análise e Desenvolvimento de Sistemas</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-['Inter:Medium'] font-medium text-[#a1a1aa] text-[15px] leading-[21px]">Previsão de conclusão</span>
                  <span className="flex gap-2">
                    <input
                      type="number"
                      min="2025"
                      max="2100"
                      placeholder="Ano"
                      className="min-w-0 flex-1 bg-[#242429] border border-[#3a3a42] rounded-[10px] px-3 py-2 outline-none font-['Inter:Regular'] text-white placeholder:text-[#71717a] text-[15px] focus:border-[#85ce5a] transition-colors duration-200"
                    />
                    <input
                      type="number"
                      min="1"
                      max="2"
                      placeholder="Semestre"
                      className="min-w-0 flex-1 bg-[#242429] border border-[#3a3a42] rounded-[10px] px-3 py-2 outline-none font-['Inter:Regular'] text-white placeholder:text-[#71717a] text-[15px] focus:border-[#85ce5a] transition-colors duration-200"
                    />
                  </span>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-['Inter:Medium'] font-medium text-[#a1a1aa] text-[15px] leading-[21px]">Vínculo acadêmico</span>
                  <select
                    defaultValue=""
                    className="w-full bg-[#242429] border border-[#3a3a42] rounded-[10px] px-3 py-2 outline-none font-['Inter:Regular'] text-white text-[14px] cursor-pointer focus:border-[#85ce5a] transition-colors duration-200"
                  >
                    <option value="" disabled>Vínculo (Selecione um Status)</option>
                    <option value="em-formacao">Em formação</option>
                    <option value="formado">Formado</option>
                    <option value="egresso">Egresso</option>
                    <option value="matriculado">Matriculado</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => alert('Alterações salvas')}
            className="bg-[#85ce5a] hover:bg-[#a3e635] px-5 py-3 rounded-[10px] cursor-pointer font-['Inter:Bold'] font-bold text-[#0f0f12] text-[16px] leading-[21px] transition-colors duration-200"
          >
            Salvar alterações
          </button>
          <button
            type="button"
            onClick={() => setBio(initialBio)}
            className="bg-[#3a3a42] hover:bg-[#474750] px-5 py-3 rounded-[10px] cursor-pointer font-['Inter:Medium'] font-medium text-white text-[16px] leading-[21px] transition-colors duration-200"
          >
            Cancelar alterações
          </button>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-4 border-t border-[#1e1e26] w-full py-8">
        <p className="font-['Inter:Regular'] font-normal text-[#52525b] text-[16px] leading-[21px] text-center">Copyright © 2026 — IFSC Lages</p>
      </div>
    </div>
  );
}
