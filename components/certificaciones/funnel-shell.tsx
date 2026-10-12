"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CalendarCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { funnelConfig } from "@/lib/certificaciones/config"

export function FunnelShell({
  children,
  showCta = true,
}: {
  children: React.ReactNode
  showCta?: boolean
}) {
  // Respeta el tema elegido en el sitio principal (misma clave de localStorage).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("alfonso-theme")
      if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved
    } catch {}
  }, [])

  return (
    <div className="min-h-screen" lang="es">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-3 md:h-20">
          <Link href="/certificaciones" className="flex min-w-0 items-center gap-3">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-primary/40 md:h-12 md:w-12">
              <Image src="/certificaciones/logo-escuela.jpg" alt="Sello de TRV International Leadership Institute" fill className="object-cover" sizes="48px" priority />
            </span>
            <span className="hidden min-w-0 leading-tight sm:block">
              <span className="block truncate text-sm font-semibold uppercase tracking-[0.16em] text-primary">TRV International</span>
              <span className="block truncate text-xs text-muted-foreground">Leadership Institute</span>
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/" className="hidden items-center gap-1 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary md:flex">
              <ArrowLeft className="h-3.5 w-3.5" /> Sitio principal
            </Link>
            {showCta && (
              <Button asChild size="sm" className="ml-2 rounded-full px-4">
                <Link href="/certificaciones/solicitud">
                  <CalendarCheck className="mr-2 h-4 w-4" /> Solicitar propuesta
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-20 border-t border-border/60">
        <div className="container flex flex-col gap-3 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {funnelConfig.institute} · En alianza con el {funnelConfig.partner}
          </p>
          <p className="flex flex-wrap gap-4">
            <Link href="/certificaciones" className="hover:text-primary">Programa</Link>
            <Link href="/certificaciones/diagnostico" className="hover:text-primary">Diagnóstico</Link>
            <a href={`mailto:${funnelConfig.contactEmail}`} className="hover:text-primary">{funnelConfig.contactEmail}</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  className,
  children,
}: {
  id?: string
  eyebrow?: string
  title: React.ReactNode
  intro?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn("container scroll-mt-24 py-14 md:py-20", className)}>
      <div className="mx-auto mb-10 max-w-3xl text-center">
        {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">{eyebrow}</p>}
        <h2 className="text-3xl md:text-5xl">{title}</h2>
        {intro && <p className="mt-4 text-base text-muted-foreground md:text-lg">{intro}</p>}
      </div>
      {children}
    </section>
  )
}
