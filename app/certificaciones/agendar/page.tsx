import type { Metadata } from "next"

import { FunnelShell, Section } from "@/components/certificaciones/funnel-shell"
import { Agendar } from "@/components/certificaciones/agendar"

export const metadata: Metadata = {
  title: "Agendar reunión de orientación | Certificación TRV",
  robots: { index: false },
}

export default function AgendarPage() {
  return (
    <FunnelShell showCta={false}>
      <Section eyebrow="Paso 2 de 2 · Reunión de orientación" title="Elija la fecha de su reunión">
        <Agendar />
      </Section>
    </FunnelShell>
  )
}
