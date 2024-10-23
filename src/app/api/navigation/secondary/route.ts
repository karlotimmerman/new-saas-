import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { type NavItem } from "@/types/navigation"

const CONFIG_PATH = path.join(process.cwd(), "src/config/navigation/secondary.json")

export async function GET() {
  try {
    const configFile = await fs.readFile(CONFIG_PATH, "utf-8")
    const config = JSON.parse(configFile) as NavItem[]
    
    return NextResponse.json(config)
  } catch (error) {
    console.error("Error loading secondary navigation config:", error)
    
    // Fallback navigation
    const fallbackNav: NavItem[] = [
      {
        title: "Support",
        url: "/support",
        icon: "LifeBuoy"
      },
      {
        title: "Documentation",
        url: "/docs",
        icon: "BookOpen"
      }
    ]
    
    return NextResponse.json(fallbackNav)
  }
}