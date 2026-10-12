"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CalendarClock, Check, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { funnelConfig } from "@/lib/certificaciones/config"

const agenda = [
  "La visión de su iglesia y la necesidad de liderazgo actual.",
  "Qué certificación (1, 2, 3 o las tres) responde mejor a su realidad.",
  "Modalidad, horario y número de participantes.",
  "La inversión exacta para su grupo y las opciones de pago.",
]

export function Agendar() {
  const [name, setName] = useState("")

  useEffect(() => {
    try {
      const lead = JSON.parse(window.sessionStorage.getItem("trv-lead") || "{}")
      if (typeof lead.nombre === "string") setName(lead.nombre.split(" ")[0])
    } catch {}
  }, [])

  return (
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_320px]">
      <div className="overflow-hidden rounded-[1.5rem] border border-border bg-white">
        {funnelConfig.bookingUrl ? (
          <iframe
            src={funnelConfig.bookingUrl}
            title="Agenda de citas: Reunión de orientación TRV"
            className="h-[720px] w-full border-0"
            loading="lazy"
          />
        ) : (
          <div className="flex h-[420px] flex-col items-center justify-center gap-4 bg-card p-8 text-center text-card-foreground">
            <CalendarClock className="h-10 w-10 text-primary" />
            <p className="max-w-md text-muted-foreground">
              El calendario de citas se está configurando. Recibimos su solicitud y le escribiremos en menos de 48 horas para coordinar la reunión.
            </p>
            <Button asChild variant="outline" className="rounded-full">
              <a href={`mailto:${funnelConfig.contactEmail}?subject=Reunión de orientación: Certificación TRV`}>
                <Mail className="mr-2 h-4 w-4" /> Escribir al equipo
              </a>
            </Button>
          </div>
        )}
      </div>

      <aside className="royal-panel gold-border h-fit rounded-[1.5rem] border p-6">
        <p className="text-lg font-semibold">{name ? `¡Gracias, ${name}!` : "¡Solicitud recibida!"}</p>
        <p className="mt-1 text-sm text-muted-foreground">Elija la fecha y la hora que mejor le funcionen. La reunión dura 30 minutos por Google Meet y no conlleva compromiso.</p>
        <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">En la reunión conversaremos</p>
        <ul className="space-y-2 text-sm">
          {agenda.map((a) => (
            <li key={a} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{a}</li>
          ))}
        </ul>
        <Button asChild className="mt-6 w-full rounded-full">
          <Link href="/certificaciones/gracias">Ya agendé mi reunión</Link>
        </Button>
        <Link href="/certificaciones/gracias" className="mt-3 block text-center text-xs text-muted-foreground hover:text-primary">
          Prefiero que me contacten primero
        </Link>
      </aside>
    </div>
  )
}
