"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Download, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { years } from "@/lib/certificaciones/programa"
import { areas, questions, scale, scoreDiagnostic, type Area } from "@/lib/certificaciones/diagnostico"

export function Diagnostico() {
  const [answers, setAnswers] = useState<number[]>([])
  const [step, setStep] = useState(0)
  const done = answers.length === questions.length && step >= questions.length

  // Guarda el resultado para adjuntarlo a la solicitud.
  useEffect(() => {
    if (!done) return
    const r = scoreDiagnostic(answers)
    try {
      window.sessionStorage.setItem("trv-diagnostico", `${r.level} (${r.total}/100) · recomienda Certificación ${areas[r.weakest].year}`)
    } catch {}
  }, [done, answers])

  function answer(value: number) {
    const next = [...answers]
    next[step] = value
    setAnswers(next)
    setStep(step + 1)
  }

  if (done) {
    const r = scoreDiagnostic(answers)
    const rec = areas[r.weakest]
    const yearInfo = years[rec.year - 1]

    return (
      <div className="royal-panel gold-border mx-auto max-w-2xl rounded-[2rem] border p-6 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Su resultado</p>
        <h2 className="mt-2 text-3xl md:text-4xl">{r.level}</h2>
        <p className="mt-1 text-muted-foreground">Índice general de liderazgo: <strong className="text-foreground">{r.total}/100</strong></p>

        <div className="mt-6 space-y-4">
          {(Object.keys(areas) as Area[]).map((a) => (
            <div key={a}>
              <div className="mb-1 flex justify-between text-sm">
                <span className={cn(a === r.weakest && "font-semibold text-primary")}>{areas[a].label}</span>
                <span className="tabular-nums text-muted-foreground">{r.byArea[a]}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <div className={cn("h-full rounded-full", a === r.weakest ? "bg-primary" : "bg-primary/45")} style={{ width: `${Math.max(r.byArea[a], 3)}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-background/40 p-5">
          <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">Recomendación</p>
          <p className="mt-1 text-xl font-semibold">{yearInfo.label}: {yearInfo.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">{rec.advice}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="flex-1 rounded-full">
            <Link href={`/certificaciones/solicitud?cert=${rec.year}`}>
              Solicitar propuesta y agendar <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-primary/40 bg-transparent">
            <a href={yearInfo.prospectus} target="_blank" rel="noreferrer"><Download className="mr-2 h-4 w-4" /> Propuesta PDF</a>
          </Button>
        </div>
        <button onClick={() => { setAnswers([]); setStep(0) }} className="mt-5 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <RotateCcw className="h-3.5 w-3.5" /> Repetir el diagnóstico
        </button>
      </div>
    )
  }

  const q = questions[step]
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs uppercase tracking-[0.16em] text-muted-foreground">
          <span>Pregunta {step + 1} de {questions.length}</span>
          <span>{areas[q.area].label}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / questions.length) * 100}%` }} />
        </div>
      </div>
      <div className="royal-panel gold-border rounded-[2rem] border p-6 md:p-10">
        <p className="text-sm text-muted-foreground">¿Qué tan cierta es esta afirmación en su iglesia?</p>
        <h2 className="mt-3 font-sans text-xl font-semibold leading-snug tracking-normal md:text-2xl">{q.text}</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {scale.map((s) => (
            <button
              key={s.value}
              onClick={() => answer(s.value)}
              className={cn(
                "min-h-[56px] rounded-xl border px-3 py-3 text-sm font-medium hover:border-primary hover:bg-primary/10",
                answers[step] === s.value ? "border-primary bg-primary/15" : "border-border",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Anterior
          </button>
        )}
      </div>
    </div>
  )
}
