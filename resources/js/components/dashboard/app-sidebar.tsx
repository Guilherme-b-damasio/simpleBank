"use client"

import type * as React from "react"
import {
  BanknoteIcon,
  CreditCardIcon,
  HomeIcon,
  QrCodeIcon,
  SendIcon,
  SettingsIcon,
  TrendingUpIcon,
  WalletIcon,
  HelpCircleIcon,
  PhoneIcon,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Carlos Silva",
    email: "carlos@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  navMain: [
    {
      title: "Início",
      url: "#",
      icon: HomeIcon,
    },
    {
      title: "PIX",
      url: "#",
      icon: QrCodeIcon,
    },
    {
      title: "Transferir",
      url: "#",
      icon: SendIcon,
    },
    {
      title: "Cartões",
      url: "#",
      icon: CreditCardIcon,
    },
    {
      title: "Investimentos",
      url: "#",
      icon: TrendingUpIcon,
    },
    {
      title: "Empréstimos",
      url: "#",
      icon: BanknoteIcon,
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Ajuda",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Suporte",
      url: "#",
      icon: PhoneIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <WalletIcon className="h-5 w-5 text-purple-600" />
                <span className="text-base font-semibold text-purple-600">NuBank Digital</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
