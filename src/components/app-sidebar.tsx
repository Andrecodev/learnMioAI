"use client"

import { useState } from "react"
import { useTranslations } from 'next-intl'
import { useAuth } from '@/contexts/auth-context'
import {
  Home,
  BookOpen,
  Brain,
  Users,
  BarChart3,
  Calendar,
  Settings,
  User,
  Award,
  MessageSquare,
  ChevronDown,
  LogOut,
} from "lucide-react"
import { ThemeToggle } from './theme-toggle'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getUserDisplayName, getUserEmail } from "@/lib/user-utils"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/ui/user-avatar"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const menuItems = [
  {
    titleKey: "dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    titleKey: "learning",
    icon: BookOpen,
    items: [
      {
        titleKey: "aiTutor",
        url: "/lessons/ai-tutor",
        icon: Brain,
      },
      {
        titleKey: "interactiveLessons",
        url: "/lessons/interactive",
        icon: BookOpen,
      },
      {
        titleKey: "vocabularyBuilder",
        url: "/lessons/vocabulary",
        icon: Award,
      },
    ],
  },
  {
    titleKey: "liveTutoring",
    url: "/tutoring",
    icon: Users,
  },
  {
    titleKey: "analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    titleKey: "schedule",
    url: "/schedule",
    icon: Calendar,
  },
  {
    titleKey: "community",
    url: "/community",
    icon: MessageSquare,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<string[]>(["learning"])
  const tNav = useTranslations('nav')
  const t = useTranslations('sidebar')
  const { logout, user } = useAuth()

  // Get user data
  const userName = getUserDisplayName(user);
  const userEmail = getUserEmail(user);

  const toggleItem = (key: string) => {
    setOpenItems((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]))
  }

  const handleLogout = async () => {
    try {
      console.log("🚪 AppSidebar: Logging out user")
      await logout()
      console.log("✅ AppSidebar: Logout successful")
    } catch (error) {
      console.error("❌ AppSidebar: Logout failed:", error)
    }
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="flex items-center gap-2 px-3 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            E
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold text-gray-900 dark:text-gray-100">{t('brand')}</span>
            <span className="truncate text-xs text-gray-600 dark:text-gray-400">{t('brandTagline')}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 bg-white dark:bg-gray-950">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-gray-700 dark:text-gray-300">{t('mainNavigation')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  {item.items ? (
                    <Collapsible open={openItems.includes(item.titleKey)} onOpenChange={() => toggleItem(item.titleKey)}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full">
        <item.icon />
        <span>{tNav(item.titleKey)}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.titleKey}>
                              <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                <Link href={subItem.url}>
          <subItem.icon />
          <span>{tNav(subItem.titleKey)}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
      <item.icon />
      <span>{tNav(item.titleKey)}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className="px-2 text-gray-700 dark:text-gray-300">{t('quickStats')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 py-1 space-y-2">
              <div className="flex items-center justify-between text-sm py-1">
                <span className="text-gray-600 dark:text-gray-400 truncate text-xs">{t('currentLevel')}</span>
                <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary">B2</Badge>
              </div>
              <div className="flex items-center justify-between text-sm py-1">
                <span className="text-gray-600 dark:text-gray-400 truncate text-xs">{t('streak')}</span>
                <span className="font-medium text-xs text-gray-900 dark:text-gray-100">28 days</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1">
                <span className="text-gray-600 dark:text-gray-400 truncate text-xs">{t('thisWeek')}</span>
                <span className="font-medium text-xs text-gray-900 dark:text-gray-100">12 lessons</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800 data-[state=open]:text-gray-900 dark:data-[state=open]:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 group-data-[collapsible=icon]:!p-2 group-data-[collapsible=icon]:!size-8"
                >
                  <UserAvatar user={user} size="sm" className="rounded-lg group-data-[collapsible=icon]:!size-6" />
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold text-xs md:text-sm text-gray-900 dark:text-gray-100">{userName}</span>
                    <span className="truncate text-xs opacity-60 text-gray-600 dark:text-gray-400">{userEmail}</span>
                  </div>
                  <ChevronDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden text-gray-600 dark:text-gray-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    {t('profileSettings')}
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  {t('preferences')}
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <ThemeToggle />
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-600 dark:text-red-400 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {tNav('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
