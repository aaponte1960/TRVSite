"use client"

import { useEffect, type ReactNode } from "react"
import { AnimatePresence, motion, type PanInfo, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

// iOS sheet curve (Ionic) — fast start, long settle
const SHEET_EASE = [0.32, 0.72, 0, 1] as const

interface MobileSheetProps {
  open: boolean
  onClose: () => void
  isDark: boolean
  label: string
  children: ReactNode
}

export function MobileSheet({ open, onClose, isDark, label, children }: MobileSheetProps) {
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  // A quick flick dismisses, no need to drag past a threshold
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 500) onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <motion.div
            className={cn("absolute inset-0 backdrop-blur-sm", isDark ? "bg-[#020624]/60" : "bg-[#1b2a67]/25")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={cn(
              "safe-bottom absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto rounded-t-[2rem] border-t px-5 pt-3 shadow-[0_-20px_60px_rgba(0,0,0,0.35)]",
              isDark ? "royal-panel gold-border" : "border-[#d9e3fb] bg-white",
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0, transition: { duration: 0.5, ease: SHEET_EASE } }}
            exit={{ y: "100%", transition: { duration: 0.28, ease: SHEET_EASE } }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 0.7 }}
            onDragEnd={handleDragEnd}
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-current opacity-20" aria-hidden />
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } } }}
              className="grid gap-3 pb-4"
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export const sheetItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] } },
}
