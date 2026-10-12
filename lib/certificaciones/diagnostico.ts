// Diagnóstico breve de liderazgo de la iglesia (inspirado en el IISE). Puntaje 1–4 por afirmación.

export type Area = "fundamentos" | "estrategia" | "cuidado"

export const areas: Record<Area, { label: string; year: 1 | 2 | 3; advice: string }> = {
  fundamentos: {
    label: "Fundamentos e identidad",
    year: 1,
    advice:
      "Su equipo necesita un mismo lenguaje bíblico de liderazgo: identidad, llamado, carácter y ministerio quíntuple. La Certificación 1 es el punto de partida ideal.",
  },
  estrategia: {
    label: "Estrategia y equipos",
    year: 2,
    advice:
      "El mayor espacio de crecimiento está en la visión, los equipos, la administración y el relevo. La Certificación 2 desarrolla estas competencias estratégicas.",
  },
  cuidado: {
    label: "Cuidado pastoral",
    year: 3,
    advice:
      "Su iglesia necesita personas preparadas para acompañar crisis, familias y heridas. La Certificación 3 forma consejeros pastorales con un marco ético y clínico.",
  },
}

export const questions: { text: string; area: Area }[] = [
  { text: "Nuestros líderes pueden explicar con claridad su llamado y el fundamento bíblico de su liderazgo.", area: "fundamentos" },
  { text: "Todo el equipo comparte un mismo lenguaje y una misma visión bíblica del liderazgo.", area: "fundamentos" },
  { text: "Nuestros líderes practican disciplinas espirituales de forma constante y sostenible.", area: "fundamentos" },
  { text: "Tenemos un plan estratégico escrito con metas medibles que el equipo conoce.", area: "estrategia" },
  { text: "Nuestros equipos ministeriales trabajan con confianza y resuelven los conflictos de forma saludable.", area: "estrategia" },
  { text: "Existe un proceso intencional de mentoría para formar el relevo de líderes.", area: "estrategia" },
  { text: "La administración y las finanzas se manejan con transparencia y rendición de cuentas.", area: "estrategia" },
  { text: "Contamos con personas preparadas para acompañar a alguien en crisis (duelo, ansiedad, riesgo suicida).", area: "cuidado" },
  { text: "Sabemos cuándo y cómo referir a un profesional de la salud mental.", area: "cuidado" },
  { text: "Tenemos protocolos claros ante casos de violencia doméstica o abuso espiritual.", area: "cuidado" },
]

export const scale = [
  { value: 1, label: "Nunca" },
  { value: 2, label: "A veces" },
  { value: 3, label: "Casi siempre" },
  { value: 4, label: "Siempre" },
]

export type DiagnosticResult = {
  total: number // 0–100
  byArea: Record<Area, number> // 0–100
  weakest: Area
  level: string
}

export function scoreDiagnostic(answers: number[]): DiagnosticResult {
  const sums: Record<Area, { s: number; n: number }> = {
    fundamentos: { s: 0, n: 0 },
    estrategia: { s: 0, n: 0 },
    cuidado: { s: 0, n: 0 },
  }
  questions.forEach((q, i) => {
    sums[q.area].s += answers[i]
    sums[q.area].n += 1
  })
  const pct = (s: number, n: number) => Math.round(((s - n) / (3 * n)) * 100)
  const byArea = {
    fundamentos: pct(sums.fundamentos.s, sums.fundamentos.n),
    estrategia: pct(sums.estrategia.s, sums.estrategia.n),
    cuidado: pct(sums.cuidado.s, sums.cuidado.n),
  }
  const total = pct(
    answers.reduce((a, b) => a + b, 0),
    answers.length,
  )
  const weakest = (Object.keys(byArea) as Area[]).reduce((a, b) => (byArea[b] < byArea[a] ? b : a))
  const level = total >= 75 ? "Liderazgo saludable" : total >= 50 ? "En desarrollo" : total >= 25 ? "Necesita fortalecimiento" : "Necesidad urgente de formación"
  return { total, byArea, weakest, level }
}
