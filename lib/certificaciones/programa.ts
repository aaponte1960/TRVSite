// Contenido de las certificaciones (fuente: Programa_Integral_3_Anos_TRV.docx y propuestas por certificación).

export type Module = {
  code: string
  title: string
  description: string
  competencies: string[]
  weeks: string[]
  year: 1 | 2 | 3
  semester: "A" | "B"
}

export const programFacts = [
  { value: "3", label: "certificaciones independientes" },
  { value: "24", label: "módulos" },
  { value: "288", label: "horas contacto" },
  { value: "+1", label: "certificación integral" },
]

export const years = [
  {
    year: 1 as const,
    label: "Certificación 1",
    area: "Liderazgo y Ministerio",
    title: "Fundamentos del Liderazgo y Ministerio Cristiano",
    emphasis: "Identidad, llamado, carácter y ministerio quíntuple",
    focus: "Formación del ser",
    finalEval: "Examen integrador escrito y oral",
    semesters: [
      "Liderazgo bíblico, identidad y formación espiritual",
      "Modelos de liderazgo, ministerio quíntuple e iglesia",
    ],
    audience: [
      "Líderes emergentes, servidores y miembros con llamado al liderazgo.",
      "Líderes de departamentos, ministerios, células y grupos pequeños.",
      "Diáconos, ancianos, ministros licenciados y candidatos al ministerio.",
      "Pastores asociados y equipos pastorales que desean un lenguaje común de liderazgo.",
    ],
    certificate: "Certificado en Fundamentos del Liderazgo y Ministerio Cristiano",
    prospectus: "/certificaciones/prospecto-ano-1.pdf",
  },
  {
    year: 2 as const,
    label: "Certificación 2",
    area: "Liderazgo y Ministerio",
    title: "Desarrollo Ministerial y Liderazgo Estratégico",
    emphasis: "Iglesia con propósito, equipos, estrategia, administración e integridad",
    focus: "Aplicación y estrategia",
    finalEval: "Proyecto ministerial aplicado con presentación pública",
    semesters: [
      "Inteligencia emocional, administración y mentoría",
      "Liderazgo transformacional, ética e integración",
    ],
    audience: [
      "Pastores, copastores y equipos pastorales.",
      "Juntas, consejos de ancianos, administradores y tesoreros de la iglesia.",
      "Directores de ministerios y líderes de equipos de trabajo.",
      "Egresados de la Certificación 1 y líderes con experiencia que desean avanzar a un nivel estratégico.",
    ],
    certificate: "Certificado en Desarrollo Ministerial y Liderazgo Estratégico",
    prospectus: "/certificaciones/prospecto-ano-2.pdf",
  },
  {
    year: 3 as const,
    label: "Certificación 3",
    area: "Consejería Pastoral",
    title: "Consejería Pastoral Integral",
    emphasis: "Competencias clínico-pastorales, crisis, familia y abuso espiritual",
    focus: "Práctica clínico-pastoral",
    finalEval: "Proyecto Integrador (40–60 páginas) y defensa pública",
    semesters: [
      "Fundamentos, ética, evaluación e intervención en crisis",
      "Psicopatología, sanidad, familia y proyecto integrador",
    ],
    audience: [
      "Pastores y ministros que realizan consejería en su congregación.",
      "Equipos de consejería, cuidado pastoral, visitación y restauración.",
      "Líderes de ministerios de matrimonios, familias, jóvenes y damas/caballeros.",
      "Egresados de las Certificaciones 1 y 2 y líderes que desean especializarse en el cuidado de las personas.",
    ],
    certificate: "Certificado en Consejería Pastoral Integral",
    prospectus: "/certificaciones/prospecto-ano-3.pdf",
  },
]

export const integralCertification = {
  label: "Certificación 4",
  title: "Certificación Integral en Liderazgo, Ministerio y Consejería Pastoral",
  text: "La certificación global del programa. Se otorga a quien completa las Certificaciones 1, 2 y 3 y presenta y defiende públicamente su Proyecto Integrador ante el comité académico.",
  facts: ["Certificaciones 1 + 2 + 3", "24 módulos · 288 horas contacto", "Proyecto Integrador y defensa pública"],
}

export const routes = [
  { title: "Una certificación", text: "Elija la que responde a su necesidad actual: 12 meses, 8 módulos y su propio certificado." },
  { title: "Dos o tres certificaciones", text: "Avance a su ritmo, una certificación tras otra, en el orden que mejor sirva a su equipo." },
  { title: "Las tres + Certificación Integral", text: "Complete las tres y reciba además la Certificación 4, el título integral del programa." },
]

export const warningSigns = [
  { title: "Todo depende del pastor", text: "Las decisiones, la enseñanza y el cuidado recaen sobre una sola persona." },
  { title: "Los voluntarios se agotan", text: "Servidores con buena voluntad, pero sin formación, se cansan o se van." },
  { title: "Conflictos que se repiten", text: "Los mismos problemas de equipo vuelven porque nadie tiene las herramientas." },
  { title: "No hay relevo", text: "No existe un proceso intencional para formar y multiplicar líderes." },
  { title: "Personas en crisis", text: "Llegan casos de ansiedad, duelo o abuso y nadie sabe cómo acompañarlos." },
]

export const graduateProfile = [
  {
    dimension: "Ser",
    subtitle: "Formación del carácter",
    items: [
      "Identidad cristiana firme anclada en su llamado.",
      "Integridad ética en lo público y lo privado.",
      "Madurez emocional y espiritual con autocuidado sostenible.",
    ],
  },
  {
    dimension: "Saber",
    subtitle: "Conocimiento",
    items: [
      "Teología bíblica del liderazgo, el ministerio y la eclesiología.",
      "Teorías clásicas y contemporáneas del liderazgo organizacional.",
      "Fundamentos clínicos y éticos de la consejería pastoral.",
    ],
  },
  {
    dimension: "Hacer",
    subtitle: "Competencias",
    items: [
      "Predicar, enseñar y comunicar con eficacia.",
      "Liderar equipos, gestionar el cambio y planificar estratégicamente.",
      "Intervenir pastoralmente en crisis, abuso y violencia doméstica.",
    ],
  },
]

export const pillars = [
  { title: "Bíblico-teológico", authors: "Stott, Blackaby, Peterson, Sanders, Justo L. González" },
  { title: "Liderazgo organizacional", authors: "Collins, Bass, Lencioni, Kotter, Maxwell, Covey" },
  { title: "Psicológico y formativo", authors: "Goleman, Rogers, Worthington, Seligman" },
  { title: "Formación espiritual", authors: "Foster, Willard, Scazzero, Nouwen" },
  { title: "Consejería pastoral", authors: "Clinton & Ohlschlager, McMinn, Roberts, Gottman" },
  { title: "Misional y cultural", authors: "Hirsch, Frost, Elmer, Newbigin, Bolsinger" },
]

export const references = [
  "Fuller Theological Seminary",
  "Dallas Theological Seminary",
  "Gordon-Conwell",
  "Regent University",
  "Moody Bible Institute",
  "SETECA",
  "FLET",
]

export const modalities = [
  { title: "Presencial", text: "En las instalaciones de su iglesia o en la sede, con práctica supervisada y dinámicas grupales." },
  { title: "Virtual en vivo", text: "Clases por Zoom o Google Meet, ideal para equipos dispersos y redes de iglesias." },
  { title: "Asincrónico 24/7", text: "Videos, lecturas digitales, foros y actividades en la plataforma institucional." },
]

export const sessionFlow = [
  { minutes: 15, title: "Apertura espiritual", text: "Devocional, oración y repaso." },
  { minutes: 45, title: "Exposición", text: "Contenido teórico del módulo." },
  { minutes: 30, title: "Discusión", text: "Casos, estudio bíblico y trabajo en grupo." },
  { minutes: 20, title: "Aplicación", text: "Ejercicios, role play y propuestas." },
  { minutes: 10, title: "Cierre", text: "Síntesis y asignaciones." },
]

export const included = [
  "96 horas contacto de instrucción por certificación (presencial, virtual o híbrida).",
  "Manuales y materiales digitales de cada módulo.",
  "Acceso a la plataforma asincrónica (videos, lecturas, foros y actividades).",
  "Instrumentos de autodiagnóstico y evaluación desarrollados por TRV.",
  "Acompañamiento y mentoría durante el proceso formativo.",
  "Evaluación integradora y certificado oficial al completar cada certificación.",
]

export const implementationSteps = [
  { title: "Reunión de orientación", text: "Conversamos con el pastor y su equipo sobre la visión, las necesidades y el perfil de los participantes." },
  { title: "Aceptación de la propuesta", text: "La iglesia firma la Hoja de Aceptación: participantes, modalidad y fecha de inicio." },
  { title: "Registro de participantes", text: "Cada participante completa su solicitud de admisión y el compromiso con el código de ética." },
  { title: "Orientación e inicio", text: "Sesión de bienvenida, acceso a la plataforma y calendario oficial del grupo." },
  { title: "Seguimiento", text: "Informes periódicos al liderazgo de la iglesia sobre asistencia y avance del grupo." },
]

export const admissionRequirements = [
  "18 años o más y diploma de escuela superior o equivalente.",
  "Testimonio de fe cristiana y membresía activa en una congregación.",
  "Carta de recomendación pastoral o de un líder ministerial.",
  "Ensayo de 500 palabras sobre su llamado y expectativas.",
  "Entrevista personal con el comité académico.",
  "Compromiso escrito con el código de ética estudiantil.",
]

export const faqs = [
  {
    q: "¿Tenemos que tomar las tres certificaciones?",
    a: "No. Las Certificaciones 1, 2 y 3 son independientes: cada una dura 12 meses y otorga su propio certificado oficial. Su iglesia puede tomar solo la que necesita, varias o las tres. Quien complete las tres recibe además la Certificación 4: la Certificación Integral en Liderazgo, Ministerio y Consejería Pastoral.",
  },
  {
    q: "¿Cómo puede la iglesia cubrir la inversión?",
    a: "Cada iglesia decide: puede asumirla como parte de su presupuesto de formación, compartirla con los participantes o establecer becas internas para líderes clave. La facturación puede consolidarse en un solo pago mensual a nombre de la iglesia.",
  },
  {
    q: "Somos una iglesia pequeña, con menos de 10 líderes. ¿Podemos participar?",
    a: "Sí. Concilios, redes y grupos de iglesias pueden unir participantes de varias congregaciones para formar un grupo y alcanzar una tarifa más favorable. Los líderes individuales también pueden solicitar información.",
  },
  {
    q: "¿La consejería pastoral sustituye a un psicólogo?",
    a: "No. La Certificación 3 forma consejeros pastorales competentes y enseña con claridad sus límites, los criterios para derivar a profesionales de la salud mental y el marco ético y legal, incluidos los deberes de reporte en Puerto Rico.",
  },
  {
    q: "¿Dónde y cuándo serían las clases?",
    a: "Presenciales en su iglesia, virtuales en vivo o en formato híbrido, en el día y la hora que mejor le funcionen a su equipo. Cada sesión semanal dura dos horas.",
  },
  {
    q: "¿Qué respaldo académico tiene el programa?",
    a: "Es dirigido por el Dr. Alfonso Aponte Matta en alianza con el Instituto Europeo Emanuel. Su diseño integra los cursos de mayor demanda de seminarios como Fuller, Dallas, Gordon-Conwell, SETECA y FLET, adaptados al contexto iberoamericano.",
  },
  {
    q: "¿Cómo se evalúa a los participantes?",
    a: "Participación (15 %), reportes de lectura (20 %), ejercicios prácticos (20 %), proyecto de módulo (25 %) y examen integrador (20 %). Cada certificación culmina con una evaluación integradora.",
  },
]

export const directorBio = {
  name: "Dr. Alfonso Aponte Matta",
  role: "Apóstol · Director Académico y facilitador principal",
  summary:
    "Con más de 30 años como ministro y consultor de empresas y del gobierno, ha ayudado a desarrollar a cientos de ministros, líderes y empresarios en Puerto Rico, Estados Unidos, Argentina, Perú, Chile, Honduras, Colombia y países de África.",
  highlights: [
    "Fundador de la Iglesia Tabernáculo de Restauración y Victoria y de TRV Group.",
    "Creador del taller Iglesia Saludable y del Índice Integral de Salud Eclesial (IISE).",
    "Creador del programa RESET de recuperación del abuso espiritual.",
    "Autor de El Éxito no es un Accidente y productor del podcast “A la Manera de Jesús”.",
  ],
}

export const audiences = [
  { id: "pastor", label: "Pastor / iglesia", hint: "Quiero formar a los líderes de mi congregación." },
  { id: "junta", label: "Junta o administración", hint: "Evaluamos la inversión en formación." },
  { id: "concilio", label: "Concilio o red", hint: "Represento a varias iglesias." },
  { id: "individual", label: "Líder individual", hint: "Quiero inscribirme por mi cuenta." },
] as const

export type AudienceId = (typeof audiences)[number]["id"]
