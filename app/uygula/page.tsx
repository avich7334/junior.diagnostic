import { Wizard } from "@/components/wizard"
import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = { title: "Run" }

export default function RunPage() {
  return (
    <Suspense fallback={<p className="text-sm text-[#c5d2e4]">Loading…</p>}>
      <Wizard />
    </Suspense>
  )
}
