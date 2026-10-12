"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface MobileCtaBarProps {
  isDark: boolean
  hidden?: boolean
  label: string
  title: string
  subtitle: string
  href: string
  /** Section the bar appears after (e.g. the hero) */
  afterId: string
  /** Section where the bar steps aside because the CTA is already on screen */
  targetId: string
}

export function MobileCtaBar({ isDark, hidden, label, title, subtitle, href, afterId, targetId }: MobileCtaBarProps) {
  const [pastHero, setPastHero] = useState(false)
  const [atTarget, setAtTarget] = useState(false)

  useEffect(() => {
    const after = document.getElementById(afterId)
    const target = document.getElementById(targetId)
    if (!after || !target) return

    const heroObserver = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    const targetObserver = new IntersectionObserver(
      // Stays hidden once the visitor has reached or passed the target
      ([entry]) => setAtTarget(entry.isIntersecting || entry.boundingClientRect.top < 0),
      { rootMargin: "0px 0px -35% 0px" },
    )
    heroObserver.observe(after)
    targetObserver.observe(target)
    return () => {
      heroObserver.disconnect()
      targetObserver.disconnect()
    }
  }, [afterId, targetId])

  const visible = pastHero && !atTarget && !hidden

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "safe-bottom pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 md:hidden",
        // CSS transition (not keyframes) so rapid scroll toggles retarget smoothly
        "transition-[transform,opacity]",
        visible
          ? "translate-y-0 opacity-100 duration-500 ease-[var(--ease-drawer)]"
          : "translate-y-[calc(100%+1.5rem)] opacity-0 duration-300 ease-[var(--ease-out)]",
      )}
    >
      <div
        className={cn(
          "pointer-events-auto flex items-center gap-3 rounded-[1.6rem] border p-2 pl-4 min-[390px]:pl-2.5 backdrop-blur-2xl backdrop-saturate-150",
          isDark
            ? "border-[#f7c953]/25 bg-[#0a1458]/80 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.6)]"
            : "border-[#d9e3fb] bg-white/85 shadow-[0_18px_50px_-12px_rgba(36,59,130,0.3)]",
        )}
      >
        <div className={cn("relative hidden h-10 w-10 shrink-0 overflow-hidden rounded-xl border min-[390px]:block", isDark ? "border-[#f1d16b]/40" : "border-[#b9c8ef]")}>
          <Image src="/alfonso-aponte-brand.jpg" alt="" fill className="object-cover" sizes="40px" />
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <p className={cn("truncate font-display text-[1.05rem] font-semibold", isDark ? "text-white" : "text-[#1b2a67]")}>{title}</p>
          <p className={cn("truncate text-[0.62rem] uppercase tracking-[0.22em]", isDark ? "text-[#e4cf8d]" : "text-[#4460b8]")}>{subtitle}</p>
        </div>
        <Link
          href={href}
          tabIndex={visible ? 0 : -1}
          className="cta-gold cta-sheen pressable inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full px-5 text-sm font-semibold"
        >
          {label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
