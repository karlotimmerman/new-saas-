import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { type NavItem } from "@/types/navigation"

const CONFIG_PATH = path.join(process.cwd(), "src/config/navigation/main.json")

export async function GET() {
  try {
    const configFile = await fs.readFile(CONFIG_PATH, "utf-8")
    const config = JSON.parse(configFile) as NavItem[]
    
    return NextResponse.json(config)
  } catch (error) {
    console.error("Error loading main navigation config:", error)
    
    // Fallback navigation if config file doesn't exist
    const fallbackNav: NavItem[] = [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: "LayoutDashboard"
      }
    ]
    
    return NextResponse.json(fallbackNav)
  }
}