"use client"

import { getInvoiceData } from "@/api/latestData";
import { YearPicker } from "@/components/reuse/DateSelector";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";
import { RootState } from "@/store/store";
import { ApiResponse } from "@/types/api-responses";
import { InvoiceData, MonthlyData } from "@/types/invoices";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

export const description = "Revenue Chart For Business"

const initialChartData: MonthlyData[] = [
    { month: "January", invoices: 0, PAID: 0, revenue: 0 },
    { month: "February", invoices: 0, PAID: 0, revenue: 0 },
    { month: "March", invoices: 0, PAID: 0, revenue: 0 },
    { month: "April", invoices: 0, PAID: 0, revenue: 0 },
    { month: "May", invoices: 0, PAID: 0, revenue: 0 },
    { month: "June", invoices: 0, PAID: 0, revenue: 0 },
    { month: "July", invoices: 0, PAID: 0, revenue: 0 },
    { month: "August", invoices: 0, PAID: 0, revenue: 0 },
    { month: "September", invoices: 0, PAID: 0, revenue: 0 },
    { month: "October", invoices: 0, PAID: 0, revenue: 0 },
    { month: "November", invoices: 0, PAID: 0, revenue: 0 },
    { month: "December", invoices: 0, PAID: 0, revenue: 0 },
];

const chartConfig = {
    invoices: {
        label: "Invoices",
        color: "hsl(var(--chart-1))",
    },
    PAID: {
        label: "PAID",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function DashboardLineChart() {
    const [chartData, setChartData] = useState<MonthlyData[]>(initialChartData);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const Activebusiness = useSelector((state: RootState) => state.authContext.activeBusiness._id);
    const currentYear = new Date().getFullYear()
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: ApiResponse<InvoiceData> = await getInvoiceData(selectedYear, Activebusiness);
                if (response.result && response.result.data.length !== 0) {
                    const updatedData = initialChartData.map((item) => {
                        const matchingData = response.result?.data.find((d) => d.month === item.month);
                        return {
                            ...item,    
                            invoices: matchingData?.invoices || 0,
                            PAID: matchingData?.PAID || 0,
                            revenue: matchingData?.revenue || 0,
                        };
                    });
                    setChartData(updatedData);
                } else {
                    setChartData(initialChartData); 
                }
        
                setTotalRevenue(response.result?.totalRevenue || 0);
            } catch (error:unknown) {
                console.log(error)
                setChartData(initialChartData); // Reset to initial in case of error
            }
        };
        fetchData();
    }, [Activebusiness, selectedYear]);

    const handleYearChange = (year: number) => {
        console.log("Selected Year:", year)
        setSelectedYear(year)
    }
    return (
        <Card className="rounded-none shadow-none">
            <CardHeader className="space-y-4">
                <CardDescription>
                    <span><YearPicker onYearChange={handleYearChange} /></span>
                </CardDescription>
                <CardTitle>Total Revenue - {formatCurrency(totalRevenue)}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="md:h-[40vh] md:w-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                            dataKey="invoices"
                            type="monotone"
                            stroke="var(--color-invoices)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="PAID"
                            type="monotone"
                            stroke="var(--color-PAID)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Showing total revenue and invoices for the year {selectedYear}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}