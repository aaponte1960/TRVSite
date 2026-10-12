import type { Metadata } from "next"
import { Suspense } from "react"

import { FunnelShell, Section } from "@/components/certificaciones/funnel-shell"
import { SolicitudForm } from "@/components/certificaciones/solicitud-form"

export const metadata: Metadata = {
  title: "Solicitar propuesta | Certificación TRV",
  description: "Solicite la propuesta de certificación para su iglesia, concilio o ministerio y agende una reunión de orientación.",
}

export default function SolicitudPage() {
  return (
    <FunnelShell showCta={false}>
      <Section
        eyebrow="Paso 1 de 2 · Solicitud"
        title="Solicite la propuesta para su iglesia"
        intro="Cuéntenos sobre usted y su equipo. En el siguiente paso elegirá la fecha y la hora de su reunión de orientación (30 minutos por Google Meet)."
      >
        <Suspense fallback={<div className="mx-auto h-[900px] max-w-3xl rounded-[2rem] border border-border" />}>
          <SolicitudForm />
        </Suspense>
      </Section>
    </FunnelShell>
  )
}
