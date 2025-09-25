import type React from "react"
import { SidebarProvider } from "@/src/types/components/ui/sidebar"
import { AppSidebar } from "@/src/types/components/app-sidebar"
import { AuthGuard } from "@/src/types/components/auth-guard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">{children}</main>
      </SidebarProvider>
    </AuthGuard>
  )
}
