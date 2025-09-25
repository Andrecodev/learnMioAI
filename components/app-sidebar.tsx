"use client"

import { useState } from "react"
import { useTranslations } from 'next-intl'
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

  const toggleItem = (key: string) => {
    setOpenItems((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]))
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">E</div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{t('brand')}</span>
            <span className="truncate text-xs text-muted-foreground">{t('brandTagline')}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
    <SidebarGroup>
    <SidebarGroupLabel>{t('mainNavigation')}</SidebarGroupLabel>
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

        <SidebarGroup>
          <SidebarGroupLabel>{t('quickStats')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-3 py-2 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('currentLevel')}</span>
                <Badge variant="secondary">B2</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('streak')}</span>
                <span className="font-medium">28 days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('thisWeek')}</span>
                <span className="font-medium">12 lessons</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Alex Johnson" />
                    <AvatarFallback className="rounded-lg">AJ</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{t('userName')}</span>
                    <span className="truncate text-xs">{t('userEmail')}</span>
                  </div>
                  <ChevronDown className="ml-auto size-4" />
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
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  {t('preferences')}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ThemeToggle />
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 dark:text-red-400">
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
