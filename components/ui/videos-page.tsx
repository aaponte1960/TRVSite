"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ChevronRight,
  Globe,
  Menu,
  Moon,
  Play,
  Sun,
  Video,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SocialConnect } from "@/components/ui/connect-with-us"
import { YouTubeVideo } from "@/lib/youtube"

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
    videos: {
      badge: "Media",
      title: "Watch the latest from the channel",
      description: "Explore messages, insights, and moments captured on video.",
      latest: "Latest Video",
      more: "More Videos",
      watchOnYoutube: "Watch on YouTube",
    },
    controls: {
      dark: "Dark",
      light: "Light",
      english: "English",
      spanish: "Spanish",
      facebook: "Facebook",
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
    videos: {
      badge: "Multimedia",
      title: "Mira lo último del canal",
      description: "Explora mensajes, reflexiones y momentos capturados en video.",
      latest: "Último Video",
      more: "Más Videos",
      watchOnYoutube: "Ver en YouTube",
    },
    controls: {
      dark: "Oscuro",
      light: "Claro",
      english: "Ingles",
      spanish: "Espanol",
      facebook: "Facebook",
    },
    footerLocation: "Puerto Rico",
    footerFacebook: "Perfil de Facebook",
  },
} as const

export function VideosPage({ videos }: { videos: YouTubeVideo[] }) {
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

  const latestVideo = videos[0]
  const remainingVideos = videos.slice(1)

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
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className={cn("absolute inset-0", isDark ? "bg-[radial-gradient(circle_at_top,rgba(247,201,83,0.15),transparent_22%)]" : "bg-[radial-gradient(circle_at_top,rgba(65,108,255,0.08),transparent_22%)]")} />
          <div className="container relative">
            
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <div className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em]", isDark ? "border-primary/30 bg-white/5 text-[#e4cf8d]" : "border-primary/20 bg-primary/5 text-[#4460b8]")}>
                <Video className="h-3.5 w-3.5" />
                {t.videos.badge}
              </div>
              <h1 className={cn("font-display text-4xl md:text-5xl lg:text-6xl", isDark ? "text-white" : "text-[#1b2a67]")}>{t.videos.title}</h1>
              <p className={cn("max-w-2xl text-lg leading-8", isDark ? "text-[#d8dcfb]" : "text-[#50608e]")}>{t.videos.description}</p>
            </div>

            {latestVideo && (
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="royal-panel gold-border flex flex-col gap-8 rounded-[2rem] border p-6 md:p-8 lg:flex-row mb-16 shadow-lg">
                <div className="lg:w-2/3 relative">
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
                <div className="lg:w-1/3 flex flex-col justify-center space-y-4">
                  <p className={cn("text-xs uppercase tracking-[0.28em]", isDark ? "text-[#e4cf8d]" : "text-[#4460b8]")}>{t.videos.latest}</p>
                  <h2 className={cn("font-display text-3xl md:text-4xl", isDark ? "text-white" : "text-[#1b2a67]")}>{latestVideo.title}</h2>
                  <p className={cn("text-sm", isDark ? "text-[#b6bde7]" : "text-[#7a88b1]")}>{new Date(latestVideo.pubDate).toLocaleDateString()}</p>
                  <Button asChild className="mt-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-fit">
                    <Link href={latestVideo.link} target="_blank" rel="noreferrer">
                      <Play className="mr-2 h-4 w-4" />
                      {t.videos.watchOnYoutube}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}

            {remainingVideos.length > 0 && (
              <div className="space-y-8">
                <h3 className={cn("font-display text-2xl md:text-3xl", isDark ? "text-white" : "text-[#1b2a67]")}>{t.videos.more}</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {remainingVideos.map((video, index) => (
                    <motion.div 
                      key={video.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn("group rounded-[1.5rem] border overflow-hidden flex flex-col transition-all hover:scale-[1.02]", isDark ? "border-white/10 bg-white/5 hover:border-primary/50" : "border-[#d9e3fb] bg-white/80 hover:border-primary/50")}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image src={video.thumbnail} alt={video.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-primary text-white rounded-full p-3 shadow-lg">
                            <Play className="h-6 w-6" />
                          </div>
                        </div>
                        <Link href={video.link} target="_blank" rel="noreferrer" className="absolute inset-0 z-10">
                          <span className="sr-only">Watch {video.title}</span>
                        </Link>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h4 className={cn("font-medium line-clamp-2 mb-2 flex-1", isDark ? "text-[#d8dcfb]" : "text-[#26438f]")}>{video.title}</h4>
                        <p className={cn("text-xs mt-auto", isDark ? "text-[#8b95c9]" : "text-[#7a88b1]")}>{new Date(video.pubDate).toLocaleDateString()}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
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
