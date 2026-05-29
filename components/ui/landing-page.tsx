"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ChevronRight,
  Facebook,
  Globe,
  Mail,
  MapPin,
  Menu,
  Moon,
  Scale,
  Shield,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { SocialConnect } from "@/components/ui/connect-with-us"

type Theme = "dark" | "light"
type Language = "en" | "es"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
}

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

import { YouTubeVideo } from "@/lib/youtube"

const pillarIcons = [Shield, Scale, Users]

export function DesignAgency({ latestVideo }: { latestVideo?: YouTubeVideo | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [theme, setTheme] = useState<Theme>("dark")
  const [language, setLanguage] = useState<Language>("en")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.firstName || !formData.email || !formData.message) return
    setFormStatus("loading")

    try {
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "meedprze"
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
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
  }, [theme])

  useEffect(() => {
    window.localStorage.setItem("alfonso-language", language)
  }, [language])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const t = copy[language]
  const navigation = [
    { id: "about", label: t.nav.about, href: "/about" },
    { id: "values", label: t.nav.values },
    { id: "presence", label: t.nav.presence },
    { id: "videos", label: t.nav.videos, href: "/videos" },
    { id: "contact", label: t.nav.contact },
  ]
  const isDark = theme === "dark"

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col text-foreground transition-colors duration-300",
        isDark
          ? "bg-gradient-to-br from-background via-background to-[#112080]"
          : "bg-gradient-to-br from-background via-background to-[#eef3ff]",
      )}
    >
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45 }}
        className={cn(
          "sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300",
          isDark
            ? `border-white/10 bg-[#07104e]/75 ${scrollY > 40 ? "shadow-2xl shadow-black/30" : ""}`
            : `border-[#dae2f8] bg-white/75 ${scrollY > 40 ? "shadow-xl shadow-slate-200/70" : ""}`,
        )}
      >
        <div className="container flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div
              className={cn(
                "relative h-12 w-12 overflow-hidden rounded-2xl border shadow-lg",
                isDark
                  ? "border-[#f1d16b]/40 bg-[#13258f] shadow-black/25"
                  : "border-[#b9c8ef] bg-white shadow-blue-100/70",
              )}
            >
              <Image src="/alfonso-aponte-brand.jpg" alt="Dr. Alfonso Aponte crest" fill className="object-cover" sizes="48px" />
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href || `#${item.id}`}
                className={cn(
                  "text-sm font-medium uppercase tracking-[0.18em] transition-colors",
                  isDark ? "text-[#d4d9ff] hover:text-primary" : "text-[#3550a8] hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <div
              className={cn(
                "flex items-center gap-1 rounded-full border p-1",
                isDark ? "border-white/10 bg-white/5" : "border-[#d9e3fb] bg-[#f8fbff]",
              )}
            >
              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.18em]",
                  theme === "dark"
                    ? "bg-primary text-primary-foreground"
                    : isDark
                      ? "text-[#cfd8ff]"
                      : "text-[#4460b8]",
                )}
              >
                <Moon className="h-3.5 w-3.5" />
                {t.controls.dark}
              </button>
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.18em]",
                  theme === "light"
                    ? "bg-primary text-primary-foreground"
                    : isDark
                      ? "text-[#cfd8ff]"
                      : "text-[#4460b8]",
                )}
              >
                <Sun className="h-3.5 w-3.5" />
                {t.controls.light}
              </button>
            </div>

            <div
              className={cn(
                "flex items-center gap-1 rounded-full border p-1",
                isDark ? "border-white/10 bg-white/5" : "border-[#d9e3fb] bg-[#f8fbff]",
              )}
            >
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.18em]",
                  language === "en"
                    ? "bg-primary text-primary-foreground"
                    : isDark
                      ? "text-[#cfd8ff]"
                      : "text-[#4460b8]",
                )}
              >
                {t.controls.english}
              </button>
              <button
                onClick={() => setLanguage("es")}
                className={cn(
                  "rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.18em]",
                  language === "es"
                    ? "bg-primary text-primary-foreground"
                    : isDark
                      ? "text-[#cfd8ff]"
                      : "text-[#4460b8]",
                )}
              >
                {t.controls.spanish}
              </button>
            </div>

            <Button asChild variant="outline" size="sm" className="rounded-full border-primary/40 bg-transparent text-primary hover:bg-primary/10">
              <Link href="https://www.facebook.com/Alfonso.Aponte.TRV/" target="_blank" rel="noreferrer">
                {t.controls.facebook}
              </Link>
            </Button>
          </div>

          <button className={cn("md:hidden", isDark ? "text-white" : "text-[#26438f]")} onClick={() => setIsMenuOpen((v) => !v)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </motion.header>

      {isMenuOpen && (
        <div className={cn("border-b md:hidden", isDark ? "border-white/10 bg-[#091359]" : "border-[#d9e3fb] bg-white/95")}>
          <div className="container grid gap-3 py-6">
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant={theme === "dark" ? "default" : "outline"} className="rounded-full" onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-3.5 w-3.5" />
                {t.controls.dark}
              </Button>
              <Button size="sm" variant={theme === "light" ? "default" : "outline"} className="rounded-full" onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-3.5 w-3.5" />
                {t.controls.light}
              </Button>
              <Button size="sm" variant={language === "en" ? "default" : "outline"} className="rounded-full" onClick={() => setLanguage("en")}>
                <Globe className="mr-2 h-3.5 w-3.5" />
                {t.controls.english}
              </Button>
              <Button size="sm" variant={language === "es" ? "default" : "outline"} className="rounded-full" onClick={() => setLanguage("es")}>
                <Globe className="mr-2 h-3.5 w-3.5" />
                {t.controls.spanish}
              </Button>
            </div>

            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href || `#${item.id}`}
                className={cn(
                  "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm uppercase tracking-[0.18em]",
                  isDark ? "border-white/10 bg-white/5 text-white" : "border-[#d9e3fb] bg-[#f8fbff] text-[#26438f]",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
                <ChevronRight className="h-4 w-4 text-primary" />
              </Link>
            ))}
          </div>
        </div>
      )}

      <main className="flex-1">
        <section className="relative overflow-hidden py-16 md:py-24 xl:py-28">
          <div className={cn("absolute inset-0", isDark ? "bg-[radial-gradient(circle_at_top,rgba(247,201,83,0.22),transparent_22%),radial-gradient(circle_at_20%_30%,rgba(83,121,255,0.2),transparent_24%)]" : "bg-[radial-gradient(circle_at_top,rgba(65,108,255,0.12),transparent_22%),radial-gradient(circle_at_20%_30%,rgba(83,121,255,0.1),transparent_24%)]")} />
          <div className="container relative">
            <div className="royal-panel gold-border grid overflow-hidden rounded-[2rem] border px-6 py-8 md:px-10 md:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="space-y-6">


                <div className="space-y-4">
                  <h1 className={cn("max-w-3xl font-display text-5xl font-semibold leading-[0.95] sm:text-6xl xl:text-7xl", isDark ? "text-white" : "text-[#1b2a67]")}>
                    {t.hero.title} <span className="text-[#ffd700] whitespace-nowrap">{t.hero.highlight}</span>
                  </h1>
                  <p className={cn("max-w-2xl text-lg leading-8 md:text-xl", isDark ? "text-[#d7dcff]" : "text-[#50608e]")}>
                    {t.hero.description}
                  </p>
                </div>

                <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90">
                    <Link href="mailto:dralfonsoaponte@gmail.com">
                      {t.controls.contactNow}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full border-primary/40 bg-transparent px-8 text-primary hover:bg-primary/10">
                    <Link href="https://www.facebook.com/Alfonso.Aponte.TRV/" target="_blank" rel="noreferrer">
                      {t.controls.visitFacebook}
                    </Link>
                  </Button>
                </motion.div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {t.hero.cards.map((item) => (
                    <div
                      key={item}
                      className={cn(
                        "rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.03]",
                        isDark 
                          ? "border-white/10 bg-white/5 text-[#d4d9ff]" 
                          : "border-[#d9e3fb] bg-white/80 text-[#4a5f99]",
                        "flex items-center justify-center text-center font-bold tracking-wider border-primary/25 shadow-[0_0_15px_rgba(247,201,83,0.06)] min-h-[90px]"
                      )}
                    >
                      <span className={cn(isDark ? "gold-text text-base" : "text-primary text-base")}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95, x: 30 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-10 lg:mt-0">
                <div className="relative mx-auto max-w-[560px]">
                  <div className={cn("absolute inset-0 rounded-[2.25rem] blur-3xl", isDark ? "bg-[radial-gradient(circle,rgba(249,215,111,0.25),transparent_58%)]" : "bg-[radial-gradient(circle,rgba(76,114,255,0.18),transparent_58%)]")} />
                  <div className={cn("relative overflow-hidden rounded-[2.25rem] border p-4", isDark ? "border-primary/35 bg-[#091251] shadow-[0_30px_80px_rgba(0,0,0,0.45)]" : "border-[#cdd9fa] bg-white shadow-[0_30px_80px_rgba(36,59,130,0.14)]")}>
                    <div className={cn("relative aspect-[4/4] overflow-hidden rounded-[1.8rem] border", isDark ? "border-primary/25" : "border-[#d6e0fb]")}>
                      <Image src="/alfonso-aponte-brand.jpg" alt="Dr. Alfonso Aponte brand mark" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 560px" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>



        <section id="values" className="py-10 md:py-16">
          <div className="container">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className={cn("inline-flex rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em]", isDark ? "border-primary/30 bg-white/5 text-[#e4cf8d]" : "border-primary/20 bg-primary/5 text-[#4460b8]")}>
                {t.values.badge}
              </div>
              <h2 className={cn("font-display text-4xl md:text-5xl", isDark ? "text-white" : "text-[#1b2a67]")}>{t.values.title}</h2>
              <p className={cn("max-w-3xl text-lg leading-8", isDark ? "text-[#d8dcfb]" : "text-[#50608e]")}>{t.values.description}</p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10 grid gap-4 md:grid-cols-3">
              {t.values.items.map((pillar, index) => {
                const Icon = pillarIcons[index]
                return (
                  <motion.div key={pillar.title} variants={itemFadeIn} whileHover={{ y: -8 }} className="royal-panel gold-border rounded-[1.75rem] border p-6">
                    <div className={cn("mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border", isDark ? "border-primary/25 bg-primary/10" : "border-primary/15 bg-primary/5")}>
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className={cn("font-display text-2xl", isDark ? "text-white" : "text-[#1b2a67]")}>{pillar.title}</h3>
                    <p className={cn("mt-3 text-base leading-7", isDark ? "text-[#d8dcfb]" : "text-[#50608e]")}>{pillar.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        <section id="presence" className="py-10 md:py-16">
          <div className="container">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="royal-panel gold-border rounded-[2rem] border p-8 md:p-10">
                <div className={cn("inline-flex rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em]", isDark ? "border-primary/30 bg-white/5 text-[#e4cf8d]" : "border-primary/20 bg-primary/5 text-[#4460b8]")}>
                  {t.presence.badge}
                </div>
                <h2 className={cn("mt-5 font-display text-4xl md:text-5xl", isDark ? "text-white" : "text-[#1b2a67]")}>{t.presence.title}</h2>
                <div className={cn("mt-6 space-y-4 text-base leading-8 md:text-lg", isDark ? "text-[#d8dcfb]" : "text-[#50608e]")}>
                  <p>{t.presence.body1}</p>
                  {t.presence.body2 && <p>{t.presence.body2}</p>}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="royal-panel gold-border rounded-[2rem] border p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <p className={cn("text-xs uppercase tracking-[0.28em]", isDark ? "text-[#e4cf8d]" : "text-[#4460b8]")}>{t.presence.notesTitle}</p>
                </div>
                <ul className={cn("mt-6 space-y-4 text-base leading-7", isDark ? "text-[#d8dcfb]" : "text-[#50608e]")}>
                  {t.presence.notes.map((item, index) => (
                    <li key={index} className={cn("rounded-2xl border px-4 py-4", isDark ? "border-white/10 bg-white/5" : "border-[#d9e3fb] bg-white/80")}>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {latestVideo && (
          <section id="latest-video" className="py-10 md:py-16">
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="royal-panel gold-border flex flex-col gap-8 rounded-[2rem] border px-6 py-10 md:px-10 lg:flex-row lg:items-center">
                <div className="lg:w-1/2 space-y-6">
                  <div className={cn("inline-flex rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em]", isDark ? "border-primary/30 bg-white/5 text-[#e4cf8d]" : "border-primary/20 bg-primary/5 text-[#4460b8]")}>
                    {t.latestVideo.badge}
                  </div>
                  <h2 className={cn("font-display text-4xl md:text-5xl", isDark ? "text-white" : "text-[#1b2a67]")}>{t.latestVideo.title}</h2>
                  <p className={cn("text-lg leading-8", isDark ? "text-[#d8dcfb]" : "text-[#50608e]")}>{t.latestVideo.description}</p>
                  <Button asChild size="lg" className="mt-2 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90">
                    <Link href="/videos">
                      {t.latestVideo.viewAll}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
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

        <section id="contact" className="py-12 md:py-20">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="royal-panel gold-border grid gap-8 rounded-[2rem] border px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-6">
                <div className={cn("inline-flex rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em]", isDark ? "border-primary/30 bg-white/5 text-[#e4cf8d]" : "border-primary/20 bg-primary/5 text-[#4460b8]")}>
                  {t.contact.badge}
                </div>
                <h2 className={cn("font-display text-4xl md:text-5xl", isDark ? "text-white" : "text-[#1b2a67]")}>{t.contact.title}</h2>
                {t.contact.description && (
                  <p className={cn("max-w-xl text-lg leading-8", isDark ? "text-[#d8dcfb]" : "text-[#50608e]")}>{t.contact.description}</p>
                )}

                <div className="space-y-4">
                  <Link href="mailto:dralfonsoaponte@gmail.com" className={cn("flex items-center gap-4 rounded-[1.5rem] border p-4 hover:border-primary/35", isDark ? "border-white/10 bg-white/5" : "border-[#d9e3fb] bg-white/80")}>
                    <div className={cn("rounded-2xl border p-3", isDark ? "border-primary/25 bg-primary/10" : "border-primary/15 bg-primary/5")}>
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className={cn("text-lg font-medium", isDark ? "text-white" : "text-[#1b2a67]")}>Email</p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className={cn("rounded-[1.8rem] border p-6 shadow-inner", isDark ? "border-primary/20 bg-[#0b165f]/80 shadow-black/20" : "border-[#d9e3fb] bg-[#f8fbff] shadow-blue-100/50")}>
                <h3 className={cn("font-display text-3xl", isDark ? "text-white" : "text-[#1b2a67]")}>{t.contact.formTitle}</h3>
                {t.contact.formDescription && (
                  <p className={cn("mt-2 text-sm leading-6", isDark ? "text-[#d8dcfb]" : "text-[#50608e]")}>{t.contact.formDescription}</p>
                )}
                {formStatus === "success" ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={cn("mt-6 rounded-2xl border p-6 text-center shadow-md", isDark ? "border-emerald-500/35 bg-emerald-500/10 text-emerald-300" : "border-emerald-200 bg-emerald-50 text-emerald-800")}>
                    <p className="text-lg font-medium">{t.controls.successMessage}</p>
                    <Button onClick={() => setFormStatus("idle")} className="mt-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                      {language === "es" ? "Enviar otro mensaje" : "Send another message"}
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder={t.contact.placeholders.firstName}
                        className={cn("rounded-full", isDark ? "border-white/15 bg-white/5 text-white placeholder:text-[#b6bde7]" : "border-[#d9e3fb] bg-white text-[#1b2a67] placeholder:text-[#7a88b1]")}
                      />
                      <Input
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder={t.contact.placeholders.lastName}
                        className={cn("rounded-full", isDark ? "border-white/15 bg-white/5 text-white placeholder:text-[#b6bde7]" : "border-[#d9e3fb] bg-white text-[#1b2a67] placeholder:text-[#7a88b1]")}
                      />
                    </div>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.placeholders.email}
                      className={cn("rounded-full", isDark ? "border-white/15 bg-white/5 text-white placeholder:text-[#b6bde7]" : "border-[#d9e3fb] bg-white text-[#1b2a67] placeholder:text-[#7a88b1]")}
                    />
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.placeholders.message}
                      className={cn("min-h-[150px] rounded-[1.5rem]", isDark ? "border-white/15 bg-white/5 text-white placeholder:text-[#b6bde7]" : "border-[#d9e3fb] bg-white text-[#1b2a67] placeholder:text-[#7a88b1]")}
                    />
                    <Button
                      disabled={formStatus === "loading"}
                      type="submit"
                      className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    >
                      {formStatus === "loading" ? t.controls.sending : t.controls.sendMessage}
                    </Button>
                    {formStatus === "error" && (
                      <p className={cn("mt-2 text-center text-sm font-medium", isDark ? "text-rose-400" : "text-rose-600")}>
                        {t.controls.errorMessage}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <SocialConnect isDark={isDark} />

      <footer className={cn("border-t transition-colors duration-300", isDark ? "border-white/10 bg-[#050c3b]" : "border-[#d9e3fb] bg-white/80")}>
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("relative h-12 w-12 overflow-hidden rounded-2xl border", isDark ? "border-[#f1d16b]/40" : "border-[#b9c8ef]")}>
              <Image src="/alfonso-aponte-brand.jpg" alt="Dr. Alfonso Aponte crest" fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <p className={cn("font-display text-2xl", isDark ? "text-white" : "text-[#1b2a67]")}>Dr. Alfonso Aponte</p>
              <p className={cn("text-xs uppercase tracking-[0.3em]", isDark ? "text-[#d8c57e]" : "text-[#4667c9]")}>{t.footerLocation}</p>
            </div>
          </div>

          <div className={cn("flex flex-col gap-3 text-sm md:items-end", isDark ? "text-[#d8dcfb]" : "text-[#50608e]")}>
            <Link href="mailto:dralfonsoaponte@gmail.com" className="hover:text-primary">
              dralfonsoaponte@gmail.com
            </Link>
            <Link href="https://www.facebook.com/Alfonso.Aponte.TRV/" target="_blank" rel="noreferrer" className="hover:text-primary">
              {t.footerFacebook}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
