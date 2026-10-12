import type { Metadata } from "next"

import { FunnelShell, Section } from "@/components/certificaciones/funnel-shell"
import { Diagnostico } from "@/components/certificaciones/diagnostico"

export const metadata: Metadata = {
  title: "Diagnóstico de Liderazgo de su Iglesia | TRV",
  description: "10 preguntas, 2 minutos: descubra qué certificación responde mejor a la necesidad de liderazgo de su iglesia.",
}

export default function DiagnosticoPage() {
  return (
    <FunnelShell>
      <Section
        eyebrow="Diagnóstico gratuito · 2 minutos"
        title="¿Qué tan saludable es el liderazgo de su iglesia?"
        intro="Responda 10 afirmaciones con honestidad. Al final verá su índice por área y la certificación recomendada."
      >
        <Diagnostico />
      </Section>
    </FunnelShell>
  )
}
