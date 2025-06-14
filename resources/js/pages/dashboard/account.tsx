import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps, Account, User } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"
import { DataTable } from "@/components/dashboard/data-table"
import { SectionCards } from "@/components/dashboard/section-cards"
import * as React from "react"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
export default function Dashboard() {
    const { user, account } = usePage<PageProps<{ account: Account, user: User }>>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col bg-gray-50 dark:bg-gray-900">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <SectionCards
                            user={user} account={account} />
                        <div className="px-4 lg:px-6">
                            <ChartAreaInteractive />
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg mx-4 lg:mx-6 shadow-sm">
                            <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Extrato</h2>
                                <p className="text-sm text-muted-foreground">Suas últimas transações</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
