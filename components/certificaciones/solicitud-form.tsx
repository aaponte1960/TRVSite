"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Loader2, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { funnelConfig } from "@/lib/certificaciones/config"
import { audiences, years, type AudienceId } from "@/lib/certificaciones/programa"

const fieldClass = "h-11 rounded-xl bg-background/60"
const labelClass = "mb-1.5 block text-sm font-medium"

export function SolicitudForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [audience, setAudience] = useState<AudienceId>("pastor")
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle")
  const [error, setError] = useState("")
  const [diagnostic, setDiagnostic] = useState("")
  const isGroup = audience !== "individual"
  const presetYear = params.get("cert")
  const presetPeople = params.get("participantes")

  useEffect(() => {
    try {
      setDiagnostic(window.sessionStorage.getItem("trv-diagnostico") || "")
    } catch {}
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    setError("")
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    const utm = Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_content"].map((k) => [k, params.get(k) || ""]),
    )
    try {
      const res = await fetch("/api/certificaciones/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, perfil: audience, diagnostico: diagnostic, ...utm }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || "No pudimos enviar su solicitud.")
      try {
        window.sessionStorage.setItem("trv-lead", JSON.stringify({ nombre: data.nombre, iglesia: data.iglesia }))
      } catch {}
      router.push("/certificaciones/agendar")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Ocurrió un error. Intente nuevamente.")
    }
  }

  return (
    <form onSubmit={onSubmit} className="royal-panel gold-border mx-auto max-w-3xl rounded-[2rem] border p-6 md:p-10">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">1 · ¿Quién es usted?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {audiences.map((a) => (
            <label
              key={a.id}
              className={cn(
                "flex cursor-pointer flex-col rounded-xl border p-4 transition-colors",
                audience === a.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50",
              )}
            >
              <input type="radio" name="perfil_radio" value={a.id} checked={audience === a.id} onChange={() => setAudience(a.id)} className="sr-only" />
              <span className="font-semibold">{a.label}</span>
              <span className="text-sm text-muted-foreground">{a.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8 grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">2 · Sus datos</legend>
        <div>
          <label htmlFor="nombre" className={labelClass}>Nombre completo *</label>
          <Input id="nombre" name="nombre" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="rol" className={labelClass}>Rol o posición</label>
          <Input id="rol" name="rol" placeholder={isGroup ? "Pastor principal, tesorero, obispo…" : "Líder de jóvenes, diácono…"} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Correo electrónico *</label>
          <Input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="telefono" className={labelClass}>WhatsApp / teléfono *</label>
          <Input id="telefono" name="telefono" type="tel" required autoComplete="tel" placeholder="+1 787…" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="iglesia" className={labelClass}>{audience === "concilio" ? "Concilio o red" : "Iglesia u organización"}{isGroup ? " *" : ""}</label>
          <Input id="iglesia" name="iglesia" required={isGroup} autoComplete="organization" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="ubicacion" className={labelClass}>Ciudad y país</label>
          <Input id="ubicacion" name="ubicacion" placeholder="Bayamón, Puerto Rico" className={fieldClass} />
        </div>
      </fieldset>

      <fieldset className="mt-8 grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">3 · Su interés</legend>
        <div>
          <label htmlFor="certificacion" className={labelClass}>Certificación de interés</label>
          <select id="certificacion" name="certificacion" defaultValue={presetYear ? `Certificación ${presetYear}` : "Certificación 1"} className={cn(fieldClass, "w-full border border-input px-3 text-sm")}>
            {years.map((y) => (
              <option key={y.year} value={y.label}>{y.label}: {y.title}</option>
            ))}
            <option value="Las tres certificaciones">Las tres certificaciones (incluye la Certificación Integral)</option>
            <option value="No estoy seguro">No estoy seguro: quiero orientación</option>
          </select>
        </div>
        <div>
          <label htmlFor="modalidad" className={labelClass}>Modalidad preferida</label>
          <select id="modalidad" name="modalidad" defaultValue="Híbrida" className={cn(fieldClass, "w-full border border-input px-3 text-sm")}>
            <option>Presencial en nuestras instalaciones</option>
            <option>Virtual sincrónica</option>
            <option>Híbrida</option>
          </select>
        </div>
        {isGroup && (
          <div>
            <label htmlFor="participantes" className={labelClass}>Número aproximado de participantes</label>
            <Input id="participantes" name="participantes" type="number" min={1} defaultValue={presetPeople || ""} placeholder={`Mínimo ${funnelConfig.minGroupSize} por grupo`} className={fieldClass} />
          </div>
        )}
        <div>
          <label htmlFor="inicio" className={labelClass}>¿Cuándo desean comenzar?</label>
          <select id="inicio" name="inicio" defaultValue={`Inicio de ${funnelConfig.startLabel}`} className={cn(fieldClass, "w-full border border-input px-3 text-sm")}>
            <option>Inicio de {funnelConfig.startLabel}</option>
            <option>Próximos 3–6 meses</option>
            <option>Solo estoy explorando</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="mensaje" className={labelClass}>¿Qué necesidad de liderazgo tiene hoy su iglesia o ministerio?</label>
          <Textarea id="mensaje" name="mensaje" rows={3} className="rounded-xl bg-background/60" />
        </div>
        {/* Campo trampa contra bots */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      </fieldset>

      {diagnostic && (
        <p className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm">
          Adjuntaremos el resultado de su diagnóstico: <strong>{diagnostic}</strong>
        </p>
      )}

      {status === "error" && <p role="alert" className="mt-6 rounded-xl border border-destructive/50 bg-destructive/10 p-3 text-sm">{error}</p>}

      <Button type="submit" size="lg" disabled={status === "sending"} className="mt-8 h-12 w-full rounded-full text-base">
        {status === "sending" ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando…</>
        ) : (
          <>Enviar y elegir fecha para la reunión <ArrowRight className="ml-2 h-4 w-4" /></>
        )}
      </Button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <Lock className="h-3 w-3" /> Sus datos solo se usan para preparar su propuesta. Sin compromiso.
      </p>
    </form>
  )
}
