import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, BookOpenCheck, CalendarCheck, Check, ClipboardCheck, Download, GraduationCap, MapPin, MonitorPlay, PlayCircle, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FunnelShell, Section } from "@/components/certificaciones/funnel-shell"
import { Malla } from "@/components/certificaciones/malla"
import { Calculadora, Countdown, Faq } from "@/components/certificaciones/interactivos"
import { funnelConfig } from "@/lib/certificaciones/config"
import {
  admissionRequirements,
  directorBio,
  graduateProfile,
  implementationSteps,
  included,
  integralCertification,
  modalities,
  pillars,
  programFacts,
  references,
  routes,
  sessionFlow,
  warningSigns,
  years,
} from "@/lib/certificaciones/programa"

export const metadata: Metadata = {
  title: "Certificaciones en Liderazgo, Ministerio y Consejería Pastoral | TRV",
  description:
    "Propuesta para iglesias, pastores y concilios: 3 certificaciones independientes de 12 meses y una Certificación Integral, con fundamento bíblico, presenciales en su iglesia, virtuales o híbridas. Agende una reunión de orientación.",
  openGraph: {
    title: "Líderes con Fundamento · TRV International Leadership Institute",
    description: "Una iglesia crece hasta donde crecen sus líderes. Solicite la propuesta para su iglesia.",
    images: ["/certificaciones/logo-escuela.jpg"],
    locale: "es_PR",
  },
}

const modalityIcons = [MapPin, MonitorPlay, PlayCircle]

export default function CertificacionPage() {
  return (
    <FunnelShell>
      {/* 1 · Hero */}
      <section className="container grid gap-10 pb-10 pt-12 md:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Inicio: {funnelConfig.startLabel} · Inscripciones abiertas
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl">
            Una iglesia crece hasta donde <span className="gold-text">crecen sus líderes</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Tres certificaciones independientes de 12 meses, y una Certificación Integral para quien complete las tres, que llevan a su
            equipo el carácter, el conocimiento y las competencias correctas, sobre un fundamento bíblico.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/certificaciones/solicitud">
                Solicitar la propuesta <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary/40 bg-transparent">
              <Link href="/certificaciones/diagnostico">Hacer el diagnóstico gratuito</Link>
            </Button>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {programFacts.map((f) => (
              <div key={f.label} className="border-l-2 border-primary/50 pl-3">
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-3xl font-semibold text-primary">{f.value}</dd>
                <dd className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="royal-panel gold-border relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full border">
          <Image
            src="/certificaciones/logo-escuela.jpg"
            alt="Sello de TRV International Leadership Institute, Dr. Alfonso Aponte"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 450px"
            className="object-cover"
          />
        </div>
      </section>

      {/* 2 · Problema */}
      <Section
        eyebrow="La realidad de hoy"
        title="5 señales de que su iglesia necesita formar a sus líderes"
        intro="La iglesia de hoy enfrenta desafíos que no existían hace 20 años: fatiga pastoral, crisis de salud mental, abuso espiritual y un creciente vacío de liderazgo saludable."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {warningSigns.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card/60 p-5">
              <span className="text-3xl font-semibold text-primary/70">{i + 1}</span>
              <h3 className="mt-2 font-sans text-base font-semibold tracking-normal">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-muted-foreground">
          <em>“Lo que has oído de mí… esto encarga a hombres fieles que sean idóneos para enseñar también a otros.”</em>{" "}
          <span className="text-primary">2 Timoteo 2:2</span>
        </p>
      </Section>

      {/* 3 · Las 3 certificaciones */}
      <Section
        id="certificaciones"
        eyebrow="La solución"
        title="Tres certificaciones, un mismo propósito"
        intro="Cada certificación es independiente: dura 12 meses y otorga su propio certificado oficial. Tome una, varias o las tres, y al completar las tres reciba la Certificación Integral."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {years.map((y) => (
            <article key={y.year} className="royal-panel gold-border flex flex-col rounded-[1.75rem] border p-6 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{y.label} · {y.focus}</p>
              <h3 className="mt-3 text-2xl">{y.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{y.emphasis}</p>
              <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-[0.16em]">¿Para quién es?</p>
              <ul className="flex-1 space-y-2 text-sm">
                {y.audience.map((a) => (
                  <li key={a} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{a}</li>
                ))}
              </ul>
              <p className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <GraduationCap className="h-4 w-4 shrink-0 text-primary" /> {y.certificate}
              </p>
            </article>
          ))}
        </div>

        {/* Rutas: independientes o las tres */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {routes.map((r, i) => (
            <div key={r.title} className="rounded-2xl border border-border bg-card/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Opción {i + 1}</p>
              <p className="mt-2 font-semibold">{r.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>

        {/* Certificación 4 · Integral */}
        <article className="royal-panel mt-6 grid gap-6 rounded-[1.75rem] border-2 border-primary/60 p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:p-8">
          <Award className="h-14 w-14 text-primary" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{integralCertification.label} · Certificación global</p>
            <h3 className="mt-2 text-2xl md:text-3xl">{integralCertification.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{integralCertification.text}</p>
          </div>
          <ul className="space-y-2 text-sm">
            {integralCertification.facts.map((f) => (
              <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>
            ))}
          </ul>
        </article>
      </Section>

      {/* 4 · Malla interactiva */}
      <Section
        id="malla"
        eyebrow="Malla curricular"
        title="Los 24 módulos, semana por semana"
        intro="Elija una certificación y toque cualquier módulo para ver su descripción, sus competencias y los temas de cada una de sus 6 semanas."
      >
        <Malla />
      </Section>

      {/* 5 · Perfil del egresado y pilares */}
      <Section eyebrow="Perfil del egresado" title="Ser, saber y hacer" intro="Un modelo por competencias, como el de la ATS y la AACC, adaptado al contexto iberoamericano.">
        <div className="grid gap-5 md:grid-cols-3">
          {graduateProfile.map((p) => (
            <div key={p.dimension} className="rounded-2xl border border-border bg-card/60 p-6">
              <h3 className="text-3xl text-primary">{p.dimension}</h3>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{p.subtitle}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-xl border border-border/70 p-4">
              <p className="font-semibold">Pilar {p.title.toLowerCase()}</p>
              <p className="text-sm text-muted-foreground">{p.authors}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 6 · Modalidad */}
      <Section eyebrow="Modalidad híbrida" title="En su iglesia, en línea o ambas" intro="El día y la hora que mejor le funcionen a su equipo. Una sesión semanal de 2 horas, con aprendizaje activo.">
        <div className="grid gap-5 md:grid-cols-3">
          {modalities.map((m, i) => {
            const Icon = modalityIcons[i]
            return (
              <div key={m.title} className="rounded-2xl border border-border bg-card/60 p-6">
                <Icon className="h-8 w-8 text-primary" />
                <h3 className="mt-3 font-sans text-lg font-semibold tracking-normal">{m.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
              </div>
            )
          })}
        </div>
        <div className="mx-auto mt-8 flex max-w-4xl overflow-hidden rounded-2xl border border-border text-center text-xs">
          {sessionFlow.map((s) => (
            <div key={s.title} style={{ flexGrow: s.minutes }} className="basis-0 border-r border-border p-3 last:border-r-0">
              <div className="font-semibold text-primary">{s.minutes}′</div>
              <div className="font-medium">{s.title}</div>
              <div className="hidden text-muted-foreground md:block">{s.text}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 7 · Inversión */}
      <Section
        id="inversion"
        eyebrow="Inversión"
        title="Formar a su equipo es más accesible de lo que piensa"
        intro={`Pago mensual por participante, que disminuye según el tamaño del grupo. Grupo mínimo de ${funnelConfig.minGroupSize}. Los concilios y redes pueden unir varias iglesias.`}
      >
        <Calculadora />
        <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 font-semibold">La inversión incluye</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {included.map((it) => (
                <li key={it} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{it}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-5 text-sm text-muted-foreground">
            <p className="mb-2 font-semibold text-foreground">Flexibilidad para la iglesia</p>
            La iglesia puede asumir la inversión como parte de su presupuesto de formación, compartirla con los participantes o
            establecer becas internas para líderes clave. La facturación puede consolidarse en un solo pago mensual. La propuesta tiene
            vigencia de {funnelConfig.proposalValidityDays} días.
          </div>
        </div>
      </Section>

      {/* 8 · Implementación y admisión */}
      <Section eyebrow="Cómo comenzamos" title="De la reunión de orientación al primer día de clases">
        <ol className="mx-auto grid max-w-5xl gap-4 md:grid-cols-5">
          {implementationSteps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-border bg-card/60 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
              <p className="mt-3 font-semibold">{s.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
        <details className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border p-5">
          <summary className="flex cursor-pointer items-center gap-2 font-semibold">
            <ClipboardCheck className="h-5 w-5 text-primary" /> Requisitos de admisión de cada participante
          </summary>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {admissionRequirements.map((r) => (
              <li key={r} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{r}</li>
            ))}
          </ul>
        </details>
      </Section>

      {/* 9 · Autoridad */}
      <Section eyebrow="Dirección académica" title="Formación con trayectoria">
        <div className="royal-panel gold-border mx-auto grid max-w-5xl gap-8 rounded-[2rem] border p-6 md:grid-cols-[220px_1fr] md:p-10">
          <div className="relative mx-auto aspect-[3/4] w-48 overflow-hidden rounded-2xl border border-primary/30 md:w-full">
            <Image src="/alfonso-portrait.jpg" alt={directorBio.name} fill className="object-cover" sizes="220px" />
          </div>
          <div>
            <h3 className="text-3xl">{directorBio.name}</h3>
            <p className="text-sm uppercase tracking-[0.16em] text-primary">{directorBio.role}</p>
            <p className="mt-4 text-muted-foreground">{directorBio.summary}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {directorBio.highlights.map((h) => (
                <li key={h} className="flex gap-2"><BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{h}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              En alianza académica con el <strong className="text-foreground">{funnelConfig.partner}</strong>. El diseño curricular integra los cursos de
              mayor demanda de:
            </p>
            <p className="mt-2 flex flex-wrap gap-2">
              {references.map((r) => (
                <span key={r} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{r}</span>
              ))}
            </p>
          </div>
        </div>
      </Section>

      {/* 10 · FAQ */}
      <Section eyebrow="Preguntas frecuentes" title="Lo que pastores y juntas nos preguntan">
        <Faq />
      </Section>

      {/* CTA final */}
      <section className="container">
        <div className="royal-panel gold-border mx-auto max-w-4xl rounded-[2rem] border px-6 py-12 text-center md:px-12">
          <Users className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 text-3xl md:text-5xl">No está llamado a hacerlo todo solo</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Coordine una reunión de orientación sin compromiso. Conversaremos sobre la visión de su iglesia y le ayudaremos a escoger
            la certificación que mejor responde a su realidad. Las inscripciones para el inicio de {funnelConfig.startLabel} cierran el{" "}
            {funnelConfig.admissionsDeadlineLabel}.
          </p>
          <div className="mt-6">
            <Countdown />
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/certificaciones/solicitud">
                <CalendarCheck className="mr-2 h-4 w-4" /> Solicitar propuesta y agendar
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary/40 bg-transparent">
              <a href="/certificaciones/prospecto-ano-1.pdf" target="_blank" rel="noreferrer">
                <Download className="mr-2 h-4 w-4" /> Descargar propuesta Certificación 1
              </a>
            </Button>
          </div>
        </div>
      </section>
    </FunnelShell>
  )
}
