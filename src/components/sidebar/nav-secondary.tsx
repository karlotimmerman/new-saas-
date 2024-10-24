"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import * as Icons from "lucide-react"
import type { NavItem } from "@/types/navigation"

const getSecondaryNavConfig = async (): Promise<NavItem[]> => {
  try {
    const response = await fetch('/api/navigation/secondary')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to load secondary navigation config:', error)
    return []
  }
}

interface NavSecondaryProps {
  className?: string
}

export function NavSecondary({ className }: NavSecondaryProps) {
  const pathname = usePathname()
  const [items, setItems] = React.useState<NavItem[]>([])

  React.useEffect(() => {
    getSecondaryNavConfig().then(setItems)
  }, [])

  return (
    <div className={cn("px-3 py-2", className)}>
      {items.map((item) => {
        const Icon = Icons[item.icon] as LucideIcon
        return (
          <Button
            key={item.title}
            asChild
            variant={pathname === item.url ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "w-full justify-start mb-1",
              pathname === item.url && "bg-muted font-medium"
            )}
          >
            <Link href={item.url}>
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}