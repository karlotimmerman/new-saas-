"use client"

import { useRouter } from "next/navigation"
import { LogOut, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"  // Fixed import path
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import type { UserNavItem } from "@/types/navigation"

export function NavUser() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = React.useState<UserNavItem | null>(null)

  React.useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(setUser)
      .catch(error => {
        console.error('Failed to load user profile:', error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user profile"
        })
      })
  }, [toast])

  if (!user) return null

  return (
    <div className="px-3 py-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-start px-2">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {
            toast({
              title: "Logging out...",
              duration: 2000,
            })
            router.push('/logout')
          }}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
