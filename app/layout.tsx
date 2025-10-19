import type React from "react"
import type { Metadata } from "next"
import { Poppins, Montserrat } from "next/font/google"
import "./globals.css"
import { NotificationProvider } from "@/components/notification-provider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Flashy - Descuentos en Santiago",
  description: "Descubre ofertas increíbles cerca de ti en Santiago de Chile",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${montserrat.variable} antialiased`}>
      <body className="font-sans">
        <NotificationProvider offers={[]}>{children}</NotificationProvider>
      </body>
    </html>
  )
}
