"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        placeholder="Search for deals, restaurants, shops..."
        className="pl-10 bg-muted/50 border-border focus:bg-background"
      />
    </div>
  )
}
