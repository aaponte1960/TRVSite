"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Download } from "lucide-react"

import { cn } from "@/lib/utils"
import { modules } from "@/lib/certificaciones/modulos"
import { years } from "@/lib/certificaciones/programa"

export function Malla() {
  const [year, setYear] = useState<1 | 2 | 3>(1)
  const [open, setOpen] = useState<string | null>(null)
  const info = years[year - 1]
  const yearModules = modules.filter((m) => m.year === year)

  return (
    <div className="mx-auto max-w-5xl">
      <div role="tablist" aria-label="Certificaciones" className="mb-8 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card/60 p-1.5">
        {years.map((y) => (
          <button
            key={y.year}
            role="tab"
            aria-selected={year === y.year}
            onClick={() => {
              setYear(y.year)
              setOpen(null)
            }}
            className={cn(
              "rounded-xl px-2 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] md:text-sm",
              year === y.year ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="hidden sm:inline">Certificación </span><span className="sm:hidden">Cert. </span>{y.year}
            <span className="mt-0.5 block text-[10px] font-normal normal-case tracking-normal opacity-80 md:text-xs">{y.area}</span>
          </button>
        ))}
      </div>

      <div className="royal-panel gold-border mb-6 flex flex-col gap-4 rounded-2xl border p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <h3 className="text-2xl md:text-3xl">{info.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {info.emphasis} · 12 meses · 8 módulos · 96 h contacto · Evaluación final: {info.finalEval.toLowerCase()}
          </p>
        </div>
        <a
          href={info.prospectus}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-primary/40 px-4 py-2 text-sm text-primary hover:bg-primary/10 md:self-auto"
        >
          <Download className="h-4 w-4" /> Propuesta {info.label} (PDF)
        </a>
      </div>

      {(["A", "B"] as const).map((sem, i) => (
        <div key={sem} className="mb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Semestre {sem} · {info.semesters[i]}
          </p>
          <div className="grid gap-3">
            {yearModules
              .filter((m) => m.semester === sem)
              .map((m) => {
                const isOpen = open === m.code
                return (
                  <div key={m.code} className="overflow-hidden rounded-2xl border border-border bg-card/70">
                    <button
                      onClick={() => setOpen(isOpen ? null : m.code)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 p-4 text-left md:p-5"
                    >
                      <span className="shrink-0 rounded-lg bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">{m.code}</span>
                      <span className="flex-1 font-medium leading-snug">{m.title}</span>
                      <ChevronDown className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="grid gap-6 border-t border-border px-4 pb-5 pt-4 md:grid-cols-2 md:px-5">
                            <div>
                              <p className="text-sm text-muted-foreground">{m.description}</p>
                              <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Competencias</p>
                              <ul className="space-y-1.5 text-sm">
                                {m.competencies.map((c) => (
                                  <li key={c} className="flex gap-2"><span className="text-primary">✓</span>{c}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Contenido por semana</p>
                              <ol className="space-y-2 text-sm">
                                {m.weeks.map((w, idx) => (
                                  <li key={w} className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/40 text-xs text-primary">{idx + 1}</span>
                                    <span className="text-muted-foreground">{w}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}
