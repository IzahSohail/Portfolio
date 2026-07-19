import type React from "react"
import type { Metadata } from "next"
import { Delius, Poppins, Quicksand } from "next/font/google"
import "./globals.css"
import "./portfolio.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
})

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["500", "600", "700"],
})

const delius = Delius({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-delius",
})

export const metadata: Metadata = {
  title: "Izah Sohail",
  description: "Software Engineer — Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${quicksand.variable} ${delius.variable} site-bg`}>
        <div className="ambient-glow ambient-glow--main" aria-hidden />
        <div className="ambient-glow ambient-glow--teal" aria-hidden />
        {children}
      </body>
    </html>
  )
}
