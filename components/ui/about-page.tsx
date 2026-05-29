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
    about: {
      badge: "About Me",
      title: "Dr. Alfonso Aponte",
      p1: "Dr. Alfonso Aponte-Matta was born in New York on September 18, 1960. He returned to Puerto Rico at a very early age, being raised in the city of Cataño, where he came to know God and began his development as a leader and minister of the Gospel.",
      p2: "His beginnings in the church were as a Sunday school teacher, musician, and assistant pastor. He was a conciliar leader, holding the position of General Secretary for several years.",
      p3: "With over 30 years as a minister, corporate and government consultant, he has helped develop hundreds of ministers, leaders, and entrepreneurs in several countries, including Africa, Argentina, Peru, Chile, Honduras, Colombia, the United States, and Puerto Rico.",
      p4: "He has been married to Rosa Medero for over 40 years, and is the father of three daughters: Laura, Natalia, and Elaine.",
      p5: "He was the founder of the Tabernáculo de Restauración Church, TRV Group, an organizational and business consulting and training company.",
      p6: "Currently, he directs TRV International Leadership Institute."
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
    about: {
      badge: "Sobre Mí",
      title: "Dr. Alfonso Aponte",
      p1: "El Dr. Alfonso Aponte-Matta, nació en Nueva York el 18 de septiembre de 1960. Regresó a Puerto Rico a muy temprana edad siendo criado en la ciudad de Cataño, en donde conoció a Dios y comenzó su desarrollo como líder y ministro del Evangelio.",
      p2: "Sus inicios en la iglesia fueron como maestro de escuela dominical, músico y asistente de pastor. Fue líder conciliar, ocupando la posición de Secretario General por varios años.",
      p3: "Con más de 30 años como ministro, consultor de empresas y del gobierno, ha ayudado a desarrollar cientos de ministros, líderes y empresarios en varios países, incluyendo países de África, Argentina, Perú, Chile, Honduras, Colombia, Estados Unidos y Puerto Rico.",
      p4: "Está casado con Rosa Medero por más de 40 años, y es padre de tres hijas: Laura, Natalia y Elaine.",
      p5: "Fue el fundador de la Iglesia Tabernáculo de Restauración, TRV Group, una empresa de consultoria y adiestramiento organizacional y empresarial.",
      p6: "Actualmente dirige TRV International Leadership Institute."
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
    footerLocation: "Puerto Rico",
    footerFacebook: "Perfil de Facebook",
  },
} as const

const pillarIcons = [Shield, Scale, Users]

export function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [theme, setTheme] = useState<Theme>("dark")
  const [language, setLanguage] = useState<Language>("en")

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
    { id: "values", label: t.nav.values, href: "/#values" },
    { id: "presence", label: t.nav.presence, href: "/#presence" },
    { id: "videos", label: t.nav.videos, href: "/videos" },
    { id: "contact", label: t.nav.contact, href: "/#contact" },
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
            <div className="royal-panel gold-border grid overflow-hidden rounded-[2rem] border px-6 py-8 md:px-10 md:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                <div className="space-y-4">
                  <h1 className={cn("max-w-3xl font-display text-4xl font-semibold leading-[1.1] sm:text-5xl", isDark ? "text-white" : "text-[#1b2a67]")}>
                    {t.about.title}
                  </h1>
                </div>

                <div className={cn("space-y-4 text-base leading-7 md:text-lg md:leading-8", isDark ? "text-[#d7dcff]" : "text-[#50608e]")}>
                  <p>{t.about.p1}</p>
                  <p>{t.about.p2}</p>
                  <p>{t.about.p3}</p>
                  <p>{t.about.p4}</p>
                  <p>{t.about.p5}</p>
                  <p>{t.about.p6}</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.7 }} className="mt-10 lg:mt-0">
                <div className="relative mx-auto max-w-[560px]">
                  <div className={cn("absolute inset-0 rounded-[2.25rem] blur-3xl", isDark ? "bg-[radial-gradient(circle,rgba(249,215,111,0.25),transparent_58%)]" : "bg-[radial-gradient(circle,rgba(76,114,255,0.18),transparent_58%)]")} />
                  <div className={cn("relative overflow-hidden rounded-[2.25rem] border p-4", isDark ? "border-primary/35 bg-[#091251] shadow-[0_30px_80px_rgba(0,0,0,0.45)]" : "border-[#cdd9fa] bg-white shadow-[0_30px_80px_rgba(36,59,130,0.14)]")}>
                    <div className={cn("relative aspect-[3/4] overflow-hidden rounded-[1.8rem] border", isDark ? "border-primary/25" : "border-[#d6e0fb]")}>
                      <Image src="/alfonso-portrait.jpg" alt={t.about.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 560px" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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
