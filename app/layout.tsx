import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import CursorGlow from "@/components/cursor-glow"
import "./globals.css"
import "./portfolio.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Izah Sohail",
  description: "Software Engineer — Portfolio",
}

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${poppins.variable} site-bg`}>
        <CursorGlow />
        {children}
      </body>
    </html>
  )
}
