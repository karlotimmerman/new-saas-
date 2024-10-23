"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Share, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ProjectItem } from "@/types/navigation"

async function getProjects(): Promise<ProjectItem[]> {
  try {
    const response = await fetch('/api/projects')
    return await response.json()
  } catch (error) {
    console.error('Failed to load projects:', error)
    return []
  }
}

export function NavProjects() {
  const pathname = usePathname()
  const [projects, setProjects] = React.useState<ProjectItem[]>([])

  React.useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Projects
        </h2>
        <div className="space-y-1">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <div key={project.name} className="flex items-center">
                <Button
                  asChild
                  variant={pathname === project.url ? "secondary" : "ghost"}
                  className={cn(
                    "flex-1 justify-start",
                    pathname === project.url && "bg-muted font-medium"
                  )}
                >
                  <Link href={project.url}>
                    <Icon className="mr-2 h-4 w-4" />
                    {project.name}
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="px-2">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem>
                      <Share className="mr-2 h-4 w-4" />
                      Share Project
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
