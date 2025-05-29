import { AppSidebar } from "../../components/app-sidebar"
import { ChartAreaInteractive } from "../../components/dashboard/chart-area-interactive"
import { DataTable } from "../../components/dashboard/data-table"
import { SectionCards } from "../../components/dashboard/section-cards"
import { SiteHeader } from "../../components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import data from "./data.json"

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />


            </SidebarInset>
        </SidebarProvider>
    )
}
