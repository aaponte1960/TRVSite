"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  Check,
  ChevronRight,
  Facebook,
  Globe,
  Loader2,
  Mail,
  Menu,
  Moon,
  Scale,
  Shield,
  Sparkles,
  Sun,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { SocialConnect } from "@/components/ui/connect-with-us"
import { MobileSheet, sheetItem } from "@/components/ui/mobile-sheet"
import { MobileCtaBar } from "@/components/ui/mobile-cta-bar"

type Theme = "dark" | "light"
type Language = "en" | "es"

// Strong ease-out: instant response, long graceful settle
const EASE_OUT = [0.23, 1, 0.32, 1] as const

const fadeIn = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

const inView = { once: true, margin: "-80px" } as const

const numerals = ["I", "II", "III", "IV", "V", "VI"]

const copy = {
  en: {
    officialPresence: "Official Presence",
    nav: {
      about: "About",
      profile: "Profile",
      values: "Values",
      presence: "Offerings",
      videos: "Videos",
      contact: "Contact",
    },
    controls: {
      dark: "Dark",
      light: "Light",
      english: "English",
      spanish: "Spanish",
      facebook: "Facebook",
      email: "Email Directly",
      contactNow: "Contact Now",
      visitFacebook: "Visit Facebook",
      sendMessage: "Send Message",
      sending: "Sending...",
      successMessage: "Message sent successfully!",
      errorMessage: "Something went wrong. Please try again.",
    },
    hero: {
      badge: "Distinguished identity",
      title: "",
      highlight: "Dr. Alfonso Aponte",
      description: "",
      cards: [
        "EDUCATION WITH INTEGRITY",
        "ETHICAL EDUCATION",
        "PURPOSEFUL EDUCATION",
      ],
      facts: {
        location: "Location",
        locationValue: "Puerto Rico",
        channel: "Contact",
        channelValue: "Facebook + Email",
        style: "Style",
        styleValue: "Formal, refined, distinguished",
      },
    },
    profile: {
      badge: "Profile",
      title: "A visual language built around heritage, dignity, and clarity",
      body1:
        "The crest carries a ceremonial feeling: deep blue, polished gold, and a strong central emblem. The site follows that same direction so every section feels connected to Alfonso's established identity.",
      body2:
        "Instead of a casual startup aesthetic, the experience now leans toward a more formal public presence with elegant typography, framed surfaces, and stronger visual hierarchy.",
    },
    values: {
      badge: "Values",
      title: "The qualities this presence should communicate",
      description:
        "Every card, color, and interaction is tuned to feel more grounded, more official, and more aligned with the crest.",
      items: [
        {
          title: "Integrity",
          description:
            "We form leaders and ministers who choose to do the right thing both in public and in private, living with transparency and authenticity under the gaze of God and the testimony of their communities.",
        },
        {
          title: "Ethics",
          description:
            "We instill solid moral principles based on the word of God, guiding our students to exercise leadership and ministry aligned with biblical principles.",
        },
        {
          title: "Purpose",
          description:
            "We accompany each student in discovering their unique talents and life's meaning, responding with faith and vocation to the calling that God has for their future.",
        },
      ],
    },
    presence: {
      badge: "Offerings",
      title: "Programs that form competent ministers and leaders to expand the Kingdom of God",
      body1:
        "To form competent, integral, and committed leaders, ministers, and pastoral counselors through a progressive academic process that integrates biblical foundation, character development, organizational competencies, ministerial skills, and clinical-pastoral skills, enabling them to exercise a transforming ministry.",
      body2: "",
      notesTitle: "Certifications",
      notes: [
        "Certification in Leadership and Ministry",
        "Certification in Clinical Pastoral Counseling",
        "Certification in Support for Victims of Spiritual Abuse",
        "Leadership Development Workshops",
      ],
    },
    contact: {
      badge: "Contact",
      title: "Get in touch with Dr. Alfonso Aponte",
      description: "",
      labels: {
        email: "Email",
        facebook: "Facebook",
        location: "Location",
      },
      formTitle: "Send a message",
      formDescription: "",
      placeholders: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email address",
        message: "Write your message",
      },
    },
    latestVideo: {
      badge: "Latest Update",
      title: "Recent from the channel",
      description: "Watch the latest message and insights from Dr. Alfonso Aponte.",
      viewAll: "View All Videos",
    },
    footerLocation: "Puerto Rico",
    footerFacebook: "Facebook Profile",
  },
  es: {
    officialPresence: "Presencia Oficial",
    nav: {
      about: "Sobre Mí",
      profile: "Perfil",
      values: "Valores",
      presence: "Ofrecimientos",
      videos: "Videos",
      contact: "Contacto",
    },
    controls: {
      dark: "Oscuro",
      light: "Claro",
      english: "Ingles",
      spanish: "Espanol",
      facebook: "Facebook",
      email: "Escribir por Email",
      contactNow: "Contactar Ahora",
      visitFacebook: "Ver Facebook",
      sendMessage: "Enviar Mensaje",
      sending: "Enviando...",
      successMessage: "¡Mensaje enviado con éxito!",
      errorMessage: "Ocurrió un error. Por favor inténtalo de nuevo.",
    },
    hero: {
      badge: "Identidad distinguida",
      title: "",
      highlight: "Dr. Alfonso Aponte",
      description: "",
      cards: [
        "EDUCACIÓN CON INTEGRIDAD",
        "EDUCACIÓN ÉTICA",
        "EDUCACIÓN CON PROPÓSITO",
      ],
      facts: {
        location: "Ubicacion",
        locationValue: "Puerto Rico",
        channel: "Contacto",
        channelValue: "Facebook + Email",
        style: "Estilo",
        styleValue: "Formal, refinado, distinguido",
      },
    },
    profile: {
      badge: "Perfil",
      title: "Un lenguaje visual construido sobre herencia, dignidad y claridad",
      body1:
        "El escudo transmite una sensacion ceremonial: azul profundo, dorado pulido y un emblema central fuerte. El sitio sigue esa misma direccion para que cada seccion se sienta conectada a la identidad establecida de Alfonso.",
      body2:
        "En lugar de una estetica casual de startup, la experiencia ahora se inclina hacia una presencia publica mas formal con tipografia elegante, superficies enmarcadas y una jerarquia visual mas clara.",
    },
    values: {
      badge: "Valores",
      title: "Las cualidades que esta presencia debe comunicar",
      description:
        "Cada tarjeta, color e interaccion esta ajustada para sentirse mas sobria, mas oficial y mas alineada con el escudo.",
      items: [
        {
          title: "Integridad",
          description:
            "Formamos Líderes y ministros que eligen hacer lo correcto tanto en público como en la intimidad, viviendo con transparencia y autenticidad bajo la mirada de Dios y el testimonio de sus comunidades.",
        },
        {
          title: "Ética",
          description:
            "Inculcamos principios morales sólidos basados en la palabra de Dios, guiando a nuestros estudiantes a ejercer el liderazgo y el ministerio alineados a los principios bíblicos.",
        },
        {
          title: "Propósito",
          description:
            "Acompañamos a cada alumno a descubrir sus talentos únicos y el sentido de su vida, respondiendo con fe y vocación al llamado que Dios tiene para su futuro.",
        },
      ],
    },
    presence: {
      badge: "Ofrecimientos",
      title: "Programas que crean ministros y líderes competentes para expandir el Reino de Dios",
      body1:
        "Formar líderes, ministros y consejeros pastorales competentes, íntegros y comprometidos, mediante un proceso académico progresivo que integra fundamento bíblico, desarrollo del carácter, competencias organizacionales, habilidades ministeriales y destrezas clínico-pastorales, habilitándolos para ejercer un ministerio transformador.",
      body2: "",
      notesTitle: "Certificaciones",
      notes: [
        "Certificación en Liderazgo y Ministerio",
        "Certificación en Consejería Pastoral Clínica",
        "Certificación en Apoyo a Víctimas de Abuso Espiritual",
        "Talleres de Desarrollo de Liderazgo",
      ],
    },
    contact: {
      badge: "Contacto",
      title: "Ponte en contacto con el Dr. Alfonso Aponte",
      description: "",
      labels: {
        email: "Email",
        facebook: "Facebook",
        location: "Ubicacion",
      },
      formTitle: "Enviar un mensaje",
      formDescription: "",
      placeholders: {
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo electronico",
        message: "Escribe tu mensaje",
      },
    },
    latestVideo: {
      badge: "Última Actualización",
      title: "Reciente del canal",
      description: "Mira el último mensaje y reflexiones del Dr. Alfonso Aponte.",
      viewAll: "Ver Todos los Videos",
    },
    footerLocation: "Puerto Rico",
    footerFacebook: "Perfil de Facebook",
  },
} as const
// Details taken from the institute's crest
const extras = {
  en: {
    institute: "TRV International Leadership Institute",
    est: "Est. MMXXI",
    motto: "Authority & Leadership",
    menu: "Menu",
    barSubtitle: "Leadership Institute",
    contactShort: "Contact",
    appearance: "Appearance",
    language: "Language",
    sendAnother: "Send another message",
  },
  es: {
    institute: "TRV International Leadership Institute",
    est: "Est. MMXXI",
    motto: "Autoridad y Liderazgo",
    menu: "Menú",
    barSubtitle: "Instituto de Liderazgo",
    contactShort: "Contactar",
    appearance: "Apariencia",
    language: "Idioma",
    sendAnother: "Enviar otro mensaje",
  },
} as const

import { YouTubeVideo } from "@/lib/youtube"

const pillarIcons = [Shield, Scale, Users]

function Eyebrow({ numeral, children, isDark, center }: { numeral: string; children: React.ReactNode; isDark: boolean; center?: boolean }) {
  return (
    <div className={cn("eyebrow", isDark ? "text-[#e4cf8d]" : "text-[#4460b8]")}>
      <span className="eyebrow-rule" aria-hidden />
      <span className="eyebrow-numeral">{numeral}.</span>
      <span>{children}</span>
      {center && <span className="eyebrow-rule reverse" aria-hidden />}
    </div>
  )
}

function Ornament() {
  return (
    <div className="ornament py-2" aria-hidden>
      <span className="font-display text-lg">✦</span>
    </div>
  )
}

function Segmented<T extends string>({
  id,
  value,
  onChange,
  options,
  isDark,
}: {
  id: string
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string; icon?: React.ReactNode }[]
  isDark: boolean
}) {
  return (
    <div className={cn("flex items-center gap-1 rounded-full border p-1", isDark ? "border-white/10 bg-white/5" : "border-[#d9e3fb] bg-[#f8fbff]")}>
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            className={cn(
              "pressable relative flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.18em]",
              active ? "text-primary-foreground" : isDark ? "text-[#cfd8ff]" : "text-[#4460b8]",
            )}
          >
            {active && (
              <motion.span
                layoutId={`${id}-pill`}
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {option.icon}
              {option.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function DesignAgency({ latestVideo }: { latestVideo?: YouTubeVideo | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState<Theme>("dark")
  const [language, setLanguage] = useState<Language>("en")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const reduceMotion = useReducedMotion()

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const sealY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90])
  const sealScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.94])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.firstName || !formData.email || !formData.message) return
    setFormStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setFormStatus("success")
        setFormData({ firstName: "", lastName: "", email: "", message: "" })
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      setFormStatus("error")
    }
  }

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("alfonso-theme") as Theme | null
    const savedLanguage = window.localStorage.getItem("alfonso-language") as Language | null

    if (savedTheme) setTheme(savedTheme)
    if (savedLanguage) setLanguage(savedLanguage)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem("alfonso-theme", theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#07104e" : "#faf8f2")
  }, [theme])

  useEffect(() => {
    window.localStorage.setItem("alfonso-language", language)
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    // Only re-render when crossing the threshold, not on every scroll frame
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  // Close the sheet first, then scroll — the body is scroll-locked while it's open
  const goToSection = (e: React.MouseEvent, id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    setIsMenuOpen(false)
    requestAnimationFrame(() => target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }))
  }

  const t = copy[language]
  const x = extras[language]
  const navigation = [
    { id: "about", label: t.nav.about, href: "/about" },
    { id: "values", label: t.nav.values },
    { id: "presence", label: t.nav.presence },
    { id: "videos", label: t.nav.videos, href: "/videos" },
    { id: "certificaciones", label: language === "es" ? "Certificaciones" : "Certifications", href: "/certificaciones" },
    { id: "contact", label: t.nav.contact },
  ]
  const isDark = theme === "dark"
  const heading = isDark ? "text-white" : "text-[#1b2a67]"
  const body = isDark ? "text-[#d8dcfb]" : "text-[#50608e]"
  const field = cn(
    "h-12 rounded-full px-5 transition-[border-color,box-shadow] duration-200 focus-visible:ring-0 focus-visible:ring-offset-0",
    isDark
      ? "border-white/15 bg-white/5 text-white placeholder:text-[#b6bde7] focus-visible:border-[#f7c953]/70 focus-visible:shadow-[0_0_0_4px_rgba(247,201,83,0.14)]"
      : "border-[#d9e3fb] bg-white text-[#1b2a67] placeholder:text-[#7a88b1] focus-visible:border-[#2448b8]/60 focus-visible:shadow-[0_0_0_4px_rgba(36,72,184,0.12)]",
  )
  const themeOptions = [
    { value: "dark" as Theme, label: t.controls.dark, icon: <Moon className="h-3.5 w-3.5" /> },
    { value: "light" as Theme, label: t.controls.light, icon: <Sun className="h-3.5 w-3.5" /> },
  ]
  const languageOptions = [
    { value: "en" as Language, label: t.controls.english },
    { value: "es" as Language, label: t.controls.spanish },
  ]
  const contactNumeral = numerals[latestVideo ? 3 : 2]
  const heroWords = t.hero.highlight.split(" ")

  return (
    <MotionConfig reducedMotion="user">
    <div
      className={cn(
        "flex min-h-screen flex-col text-foreground transition-colors duration-300",
        isDark
          ? "bg-gradient-to-br from-background via-background to-[#112080]"
          : "bg-gradient-to-br from-background via-background to-[#eef3ff]",
      )}
    >
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className={cn(
          "sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-300",
          isDark
            ? cn("border-white/10", isScrolled ? "bg-[#07104e]/80 shadow-2xl shadow-black/30" : "bg-[#07104e]/55")
            : cn("border-[#dae2f8]", isScrolled ? "bg-white/85 shadow-xl shadow-slate-200/70" : "bg-white/60"),
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
          <Link href="/" className="pressable flex min-w-0 items-center gap-3">
            <div
              className={cn(
                "relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border shadow-lg md:h-12 md:w-12",
                isDark
                  ? "border-[#f1d16b]/40 bg-[#13258f] shadow-black/25"
                  : "border-[#b9c8ef] bg-white shadow-blue-100/70",
              )}
            >
              <Image src="/alfonso-aponte-brand.jpg" alt="Dr. Alfonso Aponte crest" fill className="object-cover" sizes="48px" />
            </div>
            <div className="min-w-0 leading-tight xl:hidden">
              <p className={cn("truncate font-display text-lg font-semibold", heading)}>Dr. Alfonso Aponte</p>
              <p className={cn("truncate text-[0.6rem] uppercase tracking-[0.28em]", isDark ? "text-[#e4cf8d]" : "text-[#4460b8]")}>{x.est}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-4 xl:flex 2xl:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href || `#${item.id}`}
                className={cn(
                  "relative whitespace-nowrap text-sm font-medium uppercase tracking-[0.12em] 2xl:tracking-[0.18em]",
                  "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-[var(--ease-out)] hover:after:scale-x-100",
                  isDark ? "text-[#d4d9ff] hover:text-primary" : "text-[#3550a8] hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <Segmented id="theme" value={theme} onChange={setTheme} options={themeOptions} isDark={isDark} />
            <Segmented id="lang" value={language} onChange={setLanguage} options={languageOptions} isDark={isDark} />

            <Button asChild variant="outline" size="sm" className="hidden rounded-full border-primary/40 bg-transparent text-primary hover:bg-primary/10 min-[1440px]:inline-flex">
              <Link href="https://www.facebook.com/Alfonso.Aponte.TRV/" target="_blank" rel="noreferrer">
                {t.controls.facebook}
              </Link>
            </Button>
          </div>

          <button
            className={cn(
              "pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-full border xl:hidden",
              isDark ? "border-white/15 bg-white/5 text-white" : "border-[#d9e3fb] bg-white/80 text-[#26438f]",
            )}
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">{x.menu}</span>
          </button>
        </div>
      </motion.header>

      <MobileSheet open={isMenuOpen} onClose={closeMenu} isDark={isDark} label={x.menu}>
        <motion.div variants={sheetItem} className="flex items-center gap-3 pb-2">
          <div className={cn("relative h-12 w-12 overflow-hidden rounded-2xl border", isDark ? "border-[#f1d16b]/40" : "border-[#b9c8ef]")}>
            <Image src="/alfonso-aponte-brand.jpg" alt="" fill className="object-cover" sizes="48px" />
          </div>
          <div className="leading-tight">
            <p className={cn("font-display text-xl font-semibold", heading)}>Dr. Alfonso Aponte</p>
            <p className={cn("text-[0.62rem] uppercase tracking-[0.26em]", isDark ? "text-[#e4cf8d]" : "text-[#4460b8]")}>{x.institute}</p>
          </div>
        </motion.div>

        {navigation.map((item, index) => (
          <motion.div key={item.id} variants={sheetItem}>
            <Link
              href={item.href || `#${item.id}`}
              onClick={(e) => (item.href ? closeMenu() : goToSection(e, item.id))}
              className={cn(
                "pressable flex min-h-[3.5rem] items-center gap-4 rounded-2xl border px-4 text-sm uppercase tracking-[0.18em]",
                isDark ? "border-white/10 bg-white/5 text-white active:bg-white/10" : "border-[#d9e3fb] bg-[#f8fbff] text-[#26438f] active:bg-[#eef3ff]",
              )}
            >
              <span className={cn("w-6 font-display text-base italic normal-case tracking-normal", isDark ? "text-[#e4cf8d]" : "text-[#4460b8]")}>{numerals[index]}</span>
              <span className="flex-1">{item.label}</span>
              <ChevronRight className="h-4 w-4 text-primary" />
            </Link>
          </motion.div>
        ))}

        <motion.div variants={sheetItem} className="grid gap-2 pt-2">
          <Segmented id="sheet-theme" value={theme} onChange={setTheme} options={themeOptions} isDark={isDark} />
          <Segmented id="sheet-lang" value={language} onChange={setLanguage} options={languageOptions.map((o) => ({ ...o, icon: <Globe className="h-3.5 w-3.5" /> }))} isDark={isDark} />
        </motion.div>

        <motion.div variants={sheetItem} className="pt-2">
          <Link
            href="#contact"
            onClick={(e) => goToSection(e, "contact")}
            className="cta-gold pressable flex h-14 w-full items-center justify-center gap-2 rounded-full text-base font-semibold"
          >
            {t.controls.contactNow}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </MobileSheet>

      <main className="flex-1">
        <section id="hero" ref={heroRef} className="relative overflow-hidden py-8 md:py-24 xl:py-28">
          <div className={cn("absolute inset-0", isDark ? "bg-[radial-gradient(circle_at_top,rgba(247,201,83,0.22),transparent_22%),radial-gradient(circle_at_20%_30%,rgba(83,121,255,0.2),transparent_24%)]" : "bg-[radial-gradient(circle_at_top,rgba(65,108,255,0.12),transparent_22%),radial-gradient(circle_at_20%_30%,rgba(83,121,255,0.1),transparent_24%)]")} />
          <div className="container relative">
            <div className="royal-panel gold-border grid overflow-hidden rounded-[2rem] border px-5 py-8 md:px-10 md:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
              <motion.div
                style={{ y: sealY, scale: sealScale }}
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: EASE_OUT }}
                className="mb-8 lg:order-2 lg:mb-0"
              >
                <div className="relative mx-auto max-w-[300px] sm:max-w-[420px] lg:max-w-[560px]">
                  <div className={cn("absolute -inset-6 rounded-full blur-3xl", isDark ? "bg-[radial-gradient(circle,rgba(249,215,111,0.28),transparent_60%)]" : "bg-[radial-gradient(circle,rgba(76,114,255,0.18),transparent_60%)]")} />
                  <div className={cn("relative overflow-hidden rounded-[2.25rem] border p-3 md:p-4", isDark ? "border-primary/35 bg-[#091251] shadow-[0_30px_80px_rgba(0,0,0,0.45)]" : "border-[#cdd9fa] bg-white shadow-[0_30px_80px_rgba(36,59,130,0.14)]")}>
                    <div className={cn("relative aspect-square overflow-hidden rounded-[1.8rem] border", isDark ? "border-primary/25" : "border-[#d6e0fb]")}>
                      <Image src="/alfonso-aponte-brand.jpg" alt="Dr. Alfonso Aponte brand mark" fill priority className="object-cover" sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 560px" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-7 text-center lg:order-1 lg:text-left">
                <motion.div variants={itemFadeIn} className="flex justify-center lg:justify-start">
                  <div className={cn("eyebrow flex-wrap justify-center", isDark ? "text-[#e4cf8d]" : "text-[#4460b8]")}>
                    <span className="eyebrow-rule hidden sm:block" aria-hidden />
                    <span>{x.institute}</span>
                  </div>
                </motion.div>

                <div className="space-y-4">
                  <h1 className={cn("mx-auto max-w-3xl font-display text-[3.25rem] font-semibold leading-[0.95] sm:text-6xl lg:mx-0 xl:text-7xl", heading)}>
                    {t.hero.title}{" "}
                    {heroWords.map((word, i) => (
                      <motion.span
                        key={word + i}
                        className="mr-[0.22em] inline-block text-[#ffd700] last:mr-0"
                        style={isDark ? undefined : { color: "hsl(var(--primary))" }}
                        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: EASE_OUT }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>
                  <motion.p variants={itemFadeIn} className={cn("font-display text-2xl italic md:text-3xl", isDark ? "text-[#e9dcae]" : "text-[#4460b8]")}>
                    {x.motto}
                  </motion.p>
                  {t.hero.description && (
                    <p className={cn("max-w-2xl text-lg leading-8 md:text-xl", body)}>{t.hero.description}</p>
                  )}
                </div>

                <motion.div id="hero-cta" variants={itemFadeIn} className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <Link
                    href="#contact"
                    className="cta-gold cta-sheen pressable group inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-semibold"
                  >
                    {t.controls.contactNow}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/Alfonso.Aponte.TRV/"
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "pressable inline-flex h-14 items-center justify-center gap-2 rounded-full border px-8 text-base font-medium backdrop-blur",
                      isDark ? "border-primary/40 bg-white/5 text-primary hover:bg-primary/10" : "border-[#c9d6f6] bg-white/70 text-primary hover:bg-primary/5",
                    )}
                  >
                    <Facebook className="h-4 w-4" />
                    {t.controls.visitFacebook}
                  </Link>
                </motion.div>

                <motion.div variants={staggerContainer} className="grid gap-3 sm:grid-cols-3">
                  {t.hero.cards.map((item, i) => (
                    <motion.div
                      key={item}
                      variants={itemFadeIn}
                      className={cn(
                        "hover-lift pressable flex min-h-[84px] items-center gap-4 rounded-2xl border border-primary/25 p-4 text-left sm:flex-col sm:justify-center sm:gap-1 sm:text-center",
                        isDark
                          ? "bg-white/5 text-[#d4d9ff] shadow-[0_0_15px_rgba(247,201,83,0.06)]"
                          : "bg-white/80 text-[#4a5f99]",
                      )}
                    >
                      <span className={cn("font-display text-2xl italic leading-none", isDark ? "text-[#e4cf8d]/70" : "text-primary/60")}>{numerals[i]}</span>
                      <span className={cn("text-sm font-bold tracking-wider", isDark ? "gold-text" : "text-primary")}>{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <Ornament />

        <section id="values" className="py-12 md:py-16">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={staggerContainer} className="flex flex-col items-center gap-5 text-center">
              <motion.div variants={itemFadeIn}>
                <Eyebrow numeral="I" isDark={isDark} center>{t.values.badge}</Eyebrow>
              </motion.div>
              <motion.h2 variants={itemFadeIn} className={cn("max-w-3xl font-display text-4xl md:text-5xl", heading)}>{t.values.title}</motion.h2>
              <motion.p variants={itemFadeIn} className={cn("max-w-3xl text-lg leading-8", body)}>{t.values.description}</motion.p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={inView} className="mt-10 grid gap-4 md:grid-cols-3">
              {t.values.items.map((pillar, index) => {
                const Icon = pillarIcons[index]
                return (
                  <motion.div key={pillar.title} variants={itemFadeIn} className="royal-panel gold-border hover-lift group relative overflow-hidden rounded-[1.75rem] border p-6 transition-transform duration-300 ease-[var(--ease-out)]">
                    <span className={cn("pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] italic leading-none opacity-[0.06]", heading)} aria-hidden>
                      {numerals[index]}
                    </span>
                    <div className={cn("mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border", isDark ? "border-primary/25 bg-primary/10" : "border-primary/15 bg-primary/5")}>
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className={cn("font-display text-3xl", heading)}>{pillar.title}</h3>
                    <div className="mt-3 h-px w-10 bg-gradient-to-r from-primary to-transparent" />
                    <p className={cn("mt-4 text-base leading-7", body)}>{pillar.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        <section id="presence" className="py-12 md:py-16">
          <div className="container">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={fadeIn} className="royal-panel gold-border rounded-[2rem] border p-7 md:p-10">
                <Eyebrow numeral="II" isDark={isDark}>{t.presence.badge}</Eyebrow>
                <h2 className={cn("mt-5 font-display text-4xl md:text-5xl", heading)}>{t.presence.title}</h2>
                <div className={cn("mt-6 space-y-4 text-base leading-8 md:text-lg", body)}>
                  <p>{t.presence.body1}</p>
                  {t.presence.body2 && <p>{t.presence.body2}</p>}
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={fadeIn} className="royal-panel gold-border rounded-[2rem] border p-7 md:p-10">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <p className={cn("text-xs uppercase tracking-[0.28em]", isDark ? "text-[#e4cf8d]" : "text-[#4460b8]")}>{t.presence.notesTitle}</p>
                </div>
                <motion.ol variants={staggerContainer} initial="hidden" whileInView="visible" viewport={inView} className={cn("mt-6 space-y-3 text-base leading-7", body)}>
                  {t.presence.notes.map((item, index) => (
                    <motion.li
                      key={index}
                      variants={itemFadeIn}
                      className={cn("flex items-center gap-4 rounded-2xl border px-4 py-4", isDark ? "border-white/10 bg-white/5" : "border-[#d9e3fb] bg-white/80")}
                    >
                      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-display text-base italic", isDark ? "border-primary/30 text-[#e4cf8d]" : "border-primary/20 text-primary")}>
                        {numerals[index]}
                      </span>
                      <span className={cn("font-medium", isDark ? "text-white" : "text-[#1b2a67]")}>{item}</span>
                    </motion.li>
                  ))}
                </motion.ol>
              </motion.div>
            </div>
          </div>
        </section>

        {latestVideo && (
          <section id="latest-video" className="py-12 md:py-16">
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={fadeIn} className="royal-panel gold-border flex flex-col gap-8 rounded-[2rem] border px-6 py-10 md:px-10 lg:flex-row lg:items-center">
                <div className="lg:w-1/2 space-y-6">
                  <Eyebrow numeral="III" isDark={isDark}>{t.latestVideo.badge}</Eyebrow>
                  <h2 className={cn("font-display text-4xl md:text-5xl", heading)}>{t.latestVideo.title}</h2>
                  <p className={cn("text-lg leading-8", body)}>{t.latestVideo.description}</p>
                  <Link href="/videos" className="cta-gold pressable inline-flex h-12 items-center gap-2 rounded-full px-8 font-semibold">
                    {t.latestVideo.viewAll}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="lg:w-1/2 relative">
                  <div className={cn("overflow-hidden rounded-[1.5rem] border aspect-video shadow-2xl", isDark ? "border-primary/35 shadow-black/40" : "border-[#cdd9fa] shadow-blue-100/40")}>
                    <iframe
                      src={`https://www.youtube.com/embed/${latestVideo.id}`}
                      title={latestVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        <Ornament />

        <section id="contact" className="py-12 md:py-20">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={fadeIn} className="royal-panel gold-border grid gap-8 rounded-[2rem] border px-5 py-8 md:px-10 md:py-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-6">
                <Eyebrow numeral={contactNumeral} isDark={isDark}>{t.contact.badge}</Eyebrow>
                <h2 className={cn("font-display text-4xl md:text-5xl", heading)}>{t.contact.title}</h2>
                {t.contact.description && (
                  <p className={cn("max-w-xl text-lg leading-8", body)}>{t.contact.description}</p>
                )}

                <Link href="mailto:dralfonsoaponte@gmail.com" className={cn("pressable hover-lift flex items-center gap-4 rounded-[1.5rem] border p-4 hover:border-primary/35", isDark ? "border-white/10 bg-white/5" : "border-[#d9e3fb] bg-white/80")}>
                  <div className={cn("rounded-2xl border p-3", isDark ? "border-primary/25 bg-primary/10" : "border-primary/15 bg-primary/5")}>
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-lg font-medium", heading)}>Email</p>
                    <p className={cn("truncate text-sm", body)}>dralfonsoaponte@gmail.com</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-primary" />
                </Link>
              </div>

              <div className={cn("rounded-[1.8rem] border p-5 shadow-inner md:p-6", isDark ? "border-primary/20 bg-[#0b165f]/80 shadow-black/20" : "border-[#d9e3fb] bg-[#f8fbff] shadow-blue-100/50")}>
                <h3 className={cn("font-display text-3xl", heading)}>{t.contact.formTitle}</h3>
                {t.contact.formDescription && (
                  <p className={cn("mt-2 text-sm leading-6", body)}>{t.contact.formDescription}</p>
                )}
                <AnimatePresence mode="wait" initial={false}>
                  {formStatus === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                      className={cn("mt-6 flex flex-col items-center rounded-2xl border p-8 text-center", isDark ? "border-emerald-500/35 bg-emerald-500/10 text-emerald-300" : "border-emerald-200 bg-emerald-50 text-emerald-800")}
                    >
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", duration: 0.6, bounce: 0.35, delay: 0.1 }}
                        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      >
                        <Check className="h-7 w-7" strokeWidth={3} />
                      </motion.div>
                      <p className="text-lg font-medium">{t.controls.successMessage}</p>
                      <Button onClick={() => setFormStatus("idle")} className="mt-5 h-11 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                        {x.sendAnother}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      onSubmit={handleFormSubmit}
                      className="mt-6 space-y-4"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                          required
                          autoComplete="given-name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder={t.contact.placeholders.firstName}
                          className={field}
                        />
                        <Input
                          autoComplete="family-name"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder={t.contact.placeholders.lastName}
                          className={field}
                        />
                      </div>
                      <Input
                        required
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.placeholders.email}
                        className={field}
                      />
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t.contact.placeholders.message}
                        className={cn(field, "h-auto min-h-[150px] rounded-[1.5rem] py-4")}
                      />
                      <button
                        disabled={formStatus === "loading"}
                        type="submit"
                        className="cta-gold pressable relative flex h-14 w-full items-center justify-center rounded-full text-base font-semibold disabled:cursor-wait"
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={formStatus === "loading" ? "loading" : "idle"}
                            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                            transition={{ duration: 0.2, ease: EASE_OUT }}
                            className="flex items-center gap-2"
                          >
                            {formStatus === "loading" ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {t.controls.sending}
                              </>
                            ) : (
                              <>
                                {t.controls.sendMessage}
                                <ArrowRight className="h-4 w-4" />
                              </>
                            )}
                          </motion.span>
                        </AnimatePresence>
                      </button>
                      <AnimatePresence>
                        {formStatus === "error" && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            role="alert"
                            className={cn("text-center text-sm font-medium", isDark ? "text-rose-400" : "text-rose-600")}
                          >
                            {t.controls.errorMessage}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <SocialConnect isDark={isDark} />

      <footer className={cn("border-t transition-colors duration-300", isDark ? "border-white/10 bg-[#050c3b]" : "border-[#d9e3fb] bg-white/80")}>
        <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("relative h-12 w-12 overflow-hidden rounded-2xl border", isDark ? "border-[#f1d16b]/40" : "border-[#b9c8ef]")}>
              <Image src="/alfonso-aponte-brand.jpg" alt="Dr. Alfonso Aponte crest" fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <p className={cn("font-display text-2xl", heading)}>Dr. Alfonso Aponte</p>
              <p className={cn("text-xs uppercase tracking-[0.3em]", isDark ? "text-[#d8c57e]" : "text-[#4667c9]")}>{t.footerLocation} · {x.est}</p>
            </div>
          </div>

          <div className={cn("flex flex-col gap-3 text-sm md:items-end", body)}>
            <Link href="mailto:dralfonsoaponte@gmail.com" className="hover:text-primary">
              dralfonsoaponte@gmail.com
            </Link>
            <Link href="https://www.facebook.com/Alfonso.Aponte.TRV/" target="_blank" rel="noreferrer" className="hover:text-primary">
              {t.footerFacebook}
            </Link>
          </div>
        </div>
      </footer>

      <MobileCtaBar
        isDark={isDark}
        hidden={isMenuOpen}
        label={x.contactShort}
        title="Dr. Alfonso Aponte"
        subtitle={x.barSubtitle}
        href="#contact"
        afterId="hero-cta"
        targetId="contact"
      />
    </div>
    </MotionConfig>
  )
}
