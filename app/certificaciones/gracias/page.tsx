import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, Download, Facebook, PlayCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FunnelShell, Section } from "@/components/certificaciones/funnel-shell"
import { funnelConfig } from "@/lib/certificaciones/config"
import { years } from "@/lib/certificaciones/programa"

export const metadata: Metadata = {
  title: "¡Gracias! | Certificación TRV",
  robots: { index: false },
}

const nextSteps = [
  "Recibirá la invitación de Google Calendar con el enlace de Google Meet en su correo.",
  "Revise las propuestas de cada certificación y compártalas con su junta o equipo pastoral.",
  "En la reunión prepararemos juntos la propuesta final para su grupo.",
  "Al firmar la Hoja de Aceptación, registramos a los participantes para el próximo grupo.",
]

export default function GraciasPage() {
  return (
    <FunnelShell showCta={false}>
      <Section
        eyebrow="Todo listo"
        title={<>Gracias por invertir en <span className="gold-text">sus líderes</span></>}
        intro={`Nuestro equipo revisará su solicitud y le contactará en menos de 48 horas. Las inscripciones para el inicio de ${funnelConfig.startLabel} cierran el ${funnelConfig.admissionsDeadlineLabel}.`}
      >
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="royal-panel gold-border rounded-[1.75rem] border p-6 md:p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Próximos pasos</p>
            <ol className="space-y-4">
              {nextSteps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                  <span className="text-sm">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-[1.75rem] border border-border bg-card/60 p-6 md:p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Descargue las propuestas</p>
            <ul className="space-y-3">
              {years.map((y) => (
                <li key={y.year}>
                  <a href={y.prospectus} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-border p-3 hover:border-primary/60">
                    <Download className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm"><strong>{y.label}</strong> · {y.title}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button asChild variant="outline" className="flex-1 rounded-full bg-transparent">
                <Link href="/videos"><PlayCircle className="mr-2 h-4 w-4" /> Ver videos</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 rounded-full bg-transparent">
                <a href="https://www.facebook.com/Alfonso.Aponte.TRV/" target="_blank" rel="noreferrer"><Facebook className="mr-2 h-4 w-4" /> Facebook</a>
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-primary" /> ¿Aún no ha agendado?{" "}
          <Link href="/certificaciones/agendar" className="text-primary underline-offset-4 hover:underline">Elegir fecha ahora</Link>
        </p>
      </Section>
    </FunnelShell>
  )
}
