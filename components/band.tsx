import { bandLabel } from "@/lib/scoring"
import type { Band } from "@/lib/types"
import { cn } from "@/lib/utils"

const tone: Record<Band, string> = {
  gap: "bg-[#f8e6e1] text-[#8d3426]",
  developing: "bg-[#f8efd8] text-[#8a5a12]",
  secure: "bg-[#e5f2ec] text-[#1e5c48]",
  unobserved: "bg-[#eeeae2] text-[#5c6570]",
}

export function BandPill({ band, className }: { band: Band; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tone[band],
        className
      )}
    >
      {bandLabel[band]}
    </span>
  )
}

const triTone = {
  both: "bg-[#f8e6e1] text-[#8d3426]",
  speaking: "bg-[#f8efd8] text-[#8a5a12]",
  paper: "bg-[#efe6d6] text-[#243652]",
  clear: "bg-[#e5f2ec] text-[#1e5c48]",
  "no-evidence": "bg-[#eeeae2] text-[#5c6570]",
} as const

const triLabel = {
  both: "Both",
  speaking: "Speech only",
  paper: "Paper only",
  clear: "No problem",
  "no-evidence": "No evidence",
} as const

export function TriPill({
  state,
}: {
  state: keyof typeof triTone
}) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold", triTone[state])}>
      {triLabel[state]}
    </span>
  )
}
