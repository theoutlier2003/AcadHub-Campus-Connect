import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import { Providers } from "@/components/layout/providers"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"
import { BackToTop } from "@/components/layout/scroll-ui"
import { SITE } from "@/lib/constants/site"
import "./globals.css"

const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-plex-sans" })
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" })

export const metadata: Metadata = {
  title: { default: SITE.title, template: `%s · ${SITE.fullTitle}` },
  description: SITE.description,
  keywords: ["AcadHub", "Campus Connect", "IIIT Dharwad", "frugal innovation", "student collaboration", "goal-based groups"],
  authors: [{ name: "Siddharth Gautam" }],
  openGraph: { title: SITE.fullTitle, description: SITE.description, type: "website" },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plexSans.variable} ${plexMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <Providers>
          <Navbar />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  )
}
