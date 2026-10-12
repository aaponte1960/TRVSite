import { NextResponse } from "next/server"
import { Resend } from "resend"

const FIELDS = [
  "perfil",
  "nombre",
  "rol",
  "email",
  "telefono",
  "iglesia",
  "ubicacion",
  "certificacion",
  "modalidad",
  "participantes",
  "inicio",
  "mensaje",
  "diagnostico",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const

type Lead = Record<(typeof FIELDS)[number], string> & { fecha: string }

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

async function saveToSheet(lead: Lead) {
  const url = process.env.SHEETS_WEBHOOK_URL
  if (!url) return false
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: process.env.SHEETS_WEBHOOK_SECRET || "", lead }),
    redirect: "follow",
  })
  if (!res.ok) throw new Error(`Google Sheets respondió ${res.status}`)
  const result = await res.json().catch(() => null)
  if (!result?.ok) throw new Error(`Google Sheets rechazó la solicitud: ${result?.error || "respuesta inválida"}`)
  return true
}

async function notifyByEmail(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false
  const resend = new Resend(apiKey)
  const senderEmail = process.env.CONTACT_SENDER_EMAIL || "onboarding@resend.dev"
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "trvinternacional@gmail.com"
  const rows = FIELDS.filter((f) => lead[f])
    .map(
      (f) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#718096;font-size:12px;text-transform:uppercase;vertical-align:top">${f}</td><td style="padding:6px 0;font-size:15px;color:#1a202c">${escapeHtml(lead[f])}</td></tr>`,
    )
    .join("")

  const { error } = await resend.emails.send({
    from: `Certificación TRV <${senderEmail}>`,
    to: receiverEmail,
    replyTo: lead.email,
    subject: `Nueva solicitud de propuesta: ${lead.iglesia || lead.nombre} (${lead.perfil})`,
    text: FIELDS.filter((f) => lead[f]).map((f) => `${f}: ${lead[f]}`).join("\n"),
    html: `<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:20px auto;padding:28px;border:1px solid #e2e8f0;border-radius:16px">
      <h2 style="color:#1b2a67;margin:0 0 4px">Nueva solicitud de propuesta</h2>
      <p style="color:#4a5568;margin:0 0 20px;font-size:14px">Funnel de Certificación · ${escapeHtml(lead.fecha)}</p>
      <table style="border-collapse:collapse;width:100%;border-left:4px solid #f1d16b;padding-left:12px">${rows}</table>
    </div>`,
  })
  if (error) throw new Error(error.message)
  return true
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 })
  }

  // Campo trampa: los bots lo llenan; respondemos éxito sin guardar.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ success: true })
  }

  const lead = Object.fromEntries(
    FIELDS.map((f) => [f, typeof body[f] === "string" ? (body[f] as string).trim().slice(0, 2000) : ""]),
  ) as Lead
  lead.fecha = new Date().toLocaleString("es-PR", { timeZone: "America/Puerto_Rico" })

  if (!lead.nombre || !lead.email || !lead.telefono) {
    return NextResponse.json({ error: "Nombre, correo y teléfono son requeridos." }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ error: "El correo electrónico no es válido." }, { status: 400 })
  }

  const [sheet, email] = await Promise.allSettled([saveToSheet(lead), notifyByEmail(lead)])
  const saved = [sheet, email].some((r) => r.status === "fulfilled" && r.value)
  for (const r of [sheet, email]) if (r.status === "rejected") console.error("Lead channel error:", r.reason)

  if (!saved) {
    console.error("Lead no guardado: ningún canal (Google Sheets ni Resend) pudo registrar la solicitud.", lead)
    return NextResponse.json(
      { error: "No pudimos registrar su solicitud en este momento. Escríbanos a dralfonsoaponte@gmail.com." },
      { status: 503 },
    )
  }

  return NextResponse.json({ success: true })
}
