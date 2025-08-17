import type React from "react"
import { DM_Sans, Geist } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${geist.variable} antialiased`}>
      <head>
        <title>Cheatsheets Completos - HTML5, CSS3, Acessibilidade e Segurança Web</title>
        <meta
          name="description"
          content="Plataforma completa com cheatsheets de HTML5, CSS3, Acessibilidade WCAG e Segurança Web. Exemplos interativos, boas práticas e código copiável."
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
