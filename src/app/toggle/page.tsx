import { Italic } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleOutline() {
  return (
    <Toggle variant="default" aria-label="Toggle italic">
      <Italic />Italic
    </Toggle>
  )
}
