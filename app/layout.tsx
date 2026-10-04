import type { Metadata } from "next"
import { Fraunces, Nunito } from "next/font/google"
import { Header } from "@/components/header"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
})

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
})

export const metadata: Metadata = {
  title: {
    default: "Junior A1 check",
    template: "%s · Junior A1 check",
  },
  description:
    "A vocabulary and speaking check for A1 learners aged 9–10. The teacher runs it. Errors, gaps, and the next lesson come out of it.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full bg-[#17345c] font-sans text-[#f4efe6] antialiased">
        <Header />
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
        <footer className="no-print mx-auto max-w-6xl px-4 pb-10 text-xs text-[#c5d2e4] sm:px-6">
          Results stay in this browser. They are not written to a server. This is not a Cambridge past paper. The items were written for this check.
        </footer>
      </body>
    </html>
  )
}
