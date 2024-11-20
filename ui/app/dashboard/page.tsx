"use client"

import { DashboardLineChart } from "@/components/dashboard/charts/dashboard-line-chart"
import { InvoicePieChart } from "@/components/dashboard/charts/pie-chart"
import { LatestInvoicesTable } from "@/components/dashboard/page/latest-invoice"
import { LatestTransactions } from "@/components/dashboard/page/latestTransactions"

export default function Page() {
  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:mx-4">
        <div className="  flex-1 " >
          <DashboardLineChart />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="p-2 bg-card text-card-foreground rounded-none border" >
            <p className="px-2 font-bold text-2xl py-2 ">Latest Invoices</p>
            <LatestInvoicesTable />
          </div>
          <div className="p-2 bg-card text-card-foreground rounded-none border" >
            <p className="px-2 font-bold text-2xl py-2 ">Latest Transactions</p>
            <LatestTransactions />
          </div>
          <div className="" ><InvoicePieChart /></div>
        </div>
      </div>
    </div>
  )
}



{/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */ }