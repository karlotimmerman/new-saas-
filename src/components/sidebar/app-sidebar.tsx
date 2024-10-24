"use client"

import * as React from "react"
import * as Icons from "lucide-react"
import { Command } from "lucide-react"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/sidebar/Sidebar"
import { usePathname } from "next/navigation"

interface NavItem {
  title: string
  url: string
  icon: keyof typeof Icons
  items?: NavItem[]
}

interface NavConfig {
  main: NavItem[]
  secondary: NavItem[]
}

// Define a type for the project icon
type ProjectIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [navConfig, setNavConfig] = React.useState<NavConfig | null>(null)
  const [projects, setProjects] = React.useState<{
    name: string
    url: string
    icon: ProjectIcon
  }[]>([])
  const [organization, setOrganization] = React.useState({
    name: '',
    plan: '',
  })

  // Fetch navigation config
  React.useEffect(() => {
    fetch('/api/navigation/main')
      .then(res => res.json())
      .then(setNavConfig)
      .catch(console.error)
  }, [])

  // Fetch organization data
  React.useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => {
        setOrganization({
          name: data.organization?.name || 'My Organization',
          plan: data.organization?.plan || 'Enterprise',
        })
      })
      .catch(console.error)
  }, [])

  // Fetch projects
  React.useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(setProjects)
      .catch(console.error)
  }, [])

  // Update active states based on current path
  const navMainWithActive = React.useMemo(() => {
    if (!navConfig) return []
    
    return navConfig.main.map(item => ({
      ...item,
      isActive: pathname.startsWith(item.url),
      items: item.items?.map(subItem => ({
        ...subItem,
        isActive: pathname === subItem.url || pathname.startsWith(subItem.url + '/'),
      })),
      isOpen: item.url === "/@admin" && pathname.startsWith("/@admin"),
    }))
  }, [pathname, navConfig])

  if (!navConfig) return null

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/protected/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {organization.name || 'Loading...'}
                  </span>
                  <span className="truncate text-xs capitalize">
                    {organization.plan || 'Enterprise'}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithActive} />
        <NavProjects projects={projects} />
        <NavSecondary items={navConfig.secondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
