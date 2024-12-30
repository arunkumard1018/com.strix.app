import { Metadata } from 'next'
import DashboardClientLayout from './dashboard-client'

export const metadata: Metadata = {
    title: 'StrixInvoice-Dashboard',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DashboardClientLayout>{children}</DashboardClientLayout>
}