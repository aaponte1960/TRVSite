"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatUSD, funnelConfig, priceOrTbd, tierFor } from "@/lib/certificaciones/config"
import { faqs } from "@/lib/certificaciones/programa"

export function Calculadora() {
  const [people, setPeople] = useState(25)
  const tier = tierFor(people)
  const monthly = tier.monthly * people
  const yearly = monthly * funnelConfig.monthsPerYear

  return (
    <div className="royal-panel gold-border mx-auto max-w-4xl rounded-[2rem] border p-6 md:p-10">
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <label htmlFor="participantes" className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Participantes de su iglesia o red
          </label>
          <div className="mt-2 flex items-baseline gap-3">
            <output htmlFor="participantes" className="font-[family-name:var(--font-display)] text-6xl text-primary">{people}</output>
            <span className="text-muted-foreground">líderes</span>
          </div>
          <input
            id="participantes"
            type="range"
            min={funnelConfig.minGroupSize}
            max={200}
            step={1}
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            className="mt-4 w-full accent-[hsl(var(--primary))]"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>{funnelConfig.minGroupSize}</span>
            <span>200</span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
            {funnelConfig.priceTiers.map((t) => (
              <div
                key={t.min}
                className={cn(
                  "rounded-xl border p-3",
                  t === tier ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground",
                )}
              >
                <div className="text-lg font-semibold">{formatUSD(t.monthly)}</div>
                <div>{t.max === Infinity ? `${t.min}+` : `${t.min}–${t.max}`} personas</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background/40 p-6">
          <p className="text-sm text-muted-foreground">Por persona</p>
          <p className="text-2xl font-semibold">{formatUSD(tier.monthly)}<span className="text-base font-normal text-muted-foreground"> / mes</span></p>
          <hr className="my-4 border-border" />
          <p className="text-sm text-muted-foreground">Inversión mensual del grupo</p>
          <p className="text-3xl font-semibold text-primary">{formatUSD(monthly)}</p>
          <p className="mt-3 text-sm text-muted-foreground">Total por certificación (12 meses)</p>
          <p className="text-xl font-semibold">{formatUSD(yearly)}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            Matrícula: {priceOrTbd(funnelConfig.enrollmentFee)} · Líder individual: {priceOrTbd(funnelConfig.individualMonthly)}
          </p>
          <Button asChild className="mt-5 w-full rounded-full">
            <Link href={`/certificaciones/solicitud?participantes=${people}`}>Solicitar propuesta para {people} líderes</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card/60">
      {faqs.map((f, i) => (
        <div key={f.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium"
          >
            {f.q}
            <ChevronDown className={cn("h-5 w-5 shrink-0 text-primary transition-transform", open === i && "rotate-180")} />
          </button>
          {open === i && <p className="px-5 pb-5 text-muted-foreground">{f.a}</p>}
        </div>
      ))}
    </div>
  )
}

function remaining(deadline: string) {
  const ms = new Date(deadline).getTime() - Date.now()
  if (ms <= 0) return null
  const days = Math.floor(ms / 86_400_000)
  const hours = Math.floor((ms % 86_400_000) / 3_600_000)
  const minutes = Math.floor((ms % 3_600_000) / 60_000)
  return { days, hours, minutes }
}

export function Countdown() {
  const [left, setLeft] = useState<ReturnType<typeof remaining> | undefined>(undefined)
  useEffect(() => {
    const tick = () => setLeft(remaining(funnelConfig.admissionsDeadline))
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  if (left === undefined) return <div className="h-[76px]" aria-hidden />
  if (left === null)
    return <p className="text-muted-foreground">Inscripciones abiertas para el próximo grupo. Solicite la fecha de inicio disponible.</p>

  return (
    <div className="flex justify-center gap-3" aria-label="Tiempo restante para el cierre de admisiones">
      {[
        { v: left.days, l: "días" },
        { v: left.hours, l: "horas" },
        { v: left.minutes, l: "min" },
      ].map((x) => (
        <div key={x.l} className="w-20 rounded-xl border border-primary/30 bg-background/40 py-3 text-center">
          <div className="text-2xl font-semibold text-primary tabular-nums">{x.v}</div>
          <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{x.l}</div>
        </div>
      ))}
    </div>
  )
}
