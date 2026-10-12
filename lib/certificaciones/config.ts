// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DEL FUNNEL DE CERTIFICACIÓN: edite aquí precios, fechas y enlaces.
// ─────────────────────────────────────────────────────────────────────────────

export const funnelConfig = {
  institute: "TRV International Leadership Institute",
  partner: "Instituto Europeo Emanuel",
  director: "Dr. Alfonso Aponte Matta",
  contactEmail: "dralfonsoaponte@gmail.com",

  // Próximo inicio de clases y cierre de inscripciones (formato ISO, hora de Puerto Rico).
  startLabel: "enero de 2027",
  admissionsDeadline: "2026-12-15T23:59:00-04:00",
  admissionsDeadlineLabel: "15 de diciembre de 2026",
  proposalValidityDays: 60,

  // Inversión mensual por persona según tamaño del grupo (de las propuestas oficiales).
  minGroupSize: 10,
  priceTiers: [
    { min: 10, max: 50, monthly: 50 },
    { min: 51, max: 100, monthly: 40 },
    { min: 101, max: Infinity, monthly: 35 },
  ],
  monthsPerYear: 12,

  // [POR DEFINIR]: use null mientras no exista el dato; la página mostrará "Por definir".
  enrollmentFee: null as number | null,
  individualMonthly: null as number | null,

  // Agenda de citas de Google Calendar (Compartir → Insertar en el sitio web → copiar URL).
  // Calendario de trvinternacional@gmail.com; NEXT_PUBLIC_BOOKING_URL lo reemplaza si se define.
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ||
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0-SbO4tpe-DeEhcZVOkJ2svH_V4uFicpjLEFVSytPTSID07W3fK0GLWpGspTVHhqtQkTbqZD2J?gv=true",
}

export function tierFor(participants: number) {
  return (
    funnelConfig.priceTiers.find((t) => participants >= t.min && participants <= t.max) ??
    funnelConfig.priceTiers[0]
  )
}

export function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function priceOrTbd(value: number | null) {
  return value === null ? "Por definir" : formatUSD(value)
}
