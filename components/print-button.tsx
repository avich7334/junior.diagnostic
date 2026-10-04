"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

export function PrintButton({ label = "Print" }: { label?: string }) {
  return (
    <Button type="button" className="h-10 px-4" onClick={() => window.print()}>
      <Printer />
      {label}
    </Button>
  )
}
