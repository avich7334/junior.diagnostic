"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Guide" },
  { href: "/kitapcik", label: "Booklet" },
  { href: "/anahtar", label: "Key" },
  { href: "/teacher", label: "Teacher" },
  { href: "/sozlu", label: "Oral" },
  { href: "/form", label: "Interview" },
  { href: "/uygula", label: "Run" },
  { href: "/sinif", label: "Class" },
]

export function Header() {
  const pathname = usePathname()
  return (
    <header className="no-print sticky top-0 z-40 border-b border-[#2c4a73] bg-[#17345c]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0 font-serif text-lg tracking-tight whitespace-nowrap text-[#f4efe6]">
          <span className="sm:hidden">A1 check</span>
          <span className="hidden sm:inline">Junior A1 check</span>
        </Link>
        <nav className="flex flex-wrap gap-1 text-sm sm:ml-auto sm:flex-nowrap">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5",
                  active ? "bg-[#f4efe6] text-[#17345c]" : "text-[#d5deea] hover:bg-[#244272]"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
