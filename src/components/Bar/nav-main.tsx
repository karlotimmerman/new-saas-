"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { handleError } from "@/lib/errors"  // Add this import
import { Button } from "@/components/ui/button"
import * as Icons from "lucide-react"
import type { NavItem } from "@/types/navigation"

// This will be populated by the update-nav script
const getNavConfig = async (): Promise<NavItem[]> => {
  try {
    const response = await fetch('/api/navigation/main')
    const data = await response.json()
    return data
  } catch (error) {
    handleError(error)  // Use the error handling
    return []
  }
}

export function NavMain() {
  const pathname = usePathname()
  const [items, setItems] = React.useState<NavItem[]>([])

  React.useEffect(() => {
    getNavConfig().then(setItems)
  }, [])

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Platform
        </h2>
        <div className="space-y-1">
          {items.map((item) => {
            const Icon = Icons[item.icon] as LucideIcon
            return (
              <div key={item.title}>
                <Button
                  asChild
                  variant={pathname === item.url ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === item.url && "bg-muted font-medium"
                  )}
                >
                  <Link href={item.url}>
                    <Icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
                {item.items?.length > 0 && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.items.map((subItem) => (
                      <Button
                        key={subItem.title}
                        asChild
                        variant={pathname === subItem.url ? "secondary" : "ghost"}
                        size="sm"
                        className={cn(
                          "w-full justify-start",
                          pathname === subItem.url && "bg-muted font-medium"
                        )}
                      >
                        <Link href={subItem.url}>
                          {subItem.title}
                        </Link>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}