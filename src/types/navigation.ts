import { type LucideIcon } from "lucide-react"

export interface NavItem {
  title: string
  url: string
  icon: keyof typeof import("lucide-react")
  items?: NavSubItem[]
}

export interface NavSubItem {
  title: string
  url: string
}

export interface ProjectItem {
  name: string
  url: string
  icon: LucideIcon
}

export interface UserNavItem {
  name: string
  email: string
  avatar: string
}