"use client"

import { getInvoiceData } from "@/api/latestData";
import { YearPicker } from "@/components/reuse/DateSelector";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";
import { RootState } from "@/store/store";
import { ApiResponse } from "@/types/api-responses";
import { InvoiceData, MonthlyData } from "@/types/invoices";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

export const description = "Revenue Chart For Business"

const initialChartData: MonthlyData[] = [
    { month: "January", invoices: 0, PAID: 0, revenue: 0, processingAndDue: 0 },
    { month: "February", invoices: 0, PAID: 0, revenue: 0, processingAndDue: 0 },
    { month: "March", invoices: 0, PAID: 0, revenue: 0, processingAndDue: 0 },
    { month: "April", invoices: 0, PAID: 0, revenue: 0, processingAndDue: 0 },
    { month: "May", invoices: 0, PAID: 0, revenue: 0, processingAndDue: 0 },
    { month: "June", invoices: 0, PAID: 0, revenue: 0, processingAndDue: 0 },
    { month: "July", invoices: 0, PAID: 0, revenue: 0, processingAndDue: 0 },
    { month: "August", invoices: 0, PAID: 0, revenue: 0, processingAndDue: 0 },
    { month: "September", invoices: 0, PAID: 0, revenue: 0, processingAndDue: 0 },
    { month: "October", invoices: 0, PAID: 0, revenue: 0, processingAndDue: 0 },
    { month: "November", invoices: 0, PAID: 0, revenue: 0, processingAndDue: 0 },
    { month: "December", invoices: 0, PAID: 0, revenue: 0, processingAndDue: 0 },
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
    processingAndDue: {
        label: "Not Paid",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;


export function DashboardLineChart() {
    const [revenue, setRevenue] = useState<InvoiceData>({
        data: initialChartData,
        invoicedAmount: 0,
        paidAmount: 0,
        outstandingAmount: 0,
    });
    const Activebusiness = useSelector((state: RootState) => state.authContext.activeBusiness._id);
    const currentYear = new Date().getFullYear()
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    const [trendingPercentage, setTrendingPercentage] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: ApiResponse<InvoiceData> = await getInvoiceData(selectedYear, Activebusiness);
                console.log("response", response);
                if (response.result && response.result.data.length !== 0) {
                    const updatedData = initialChartData.map((item) => {
                        const matchingData = response.result?.data.find((d) => d.month === item.month);
                        return {
                            ...item,
                            invoices: matchingData?.invoices || 0,
                            PAID: matchingData?.PAID || 0,
                            revenue: matchingData?.revenue || 0,
                            processingAndDue: matchingData?.invoices ? (matchingData.invoices - matchingData.PAID) : 0,
                        };
                    });

                    // Calculate percentage change for the latest month
                    const currentMonthIndex = new Date().getMonth(); // 0-indexed
                    const currentMonthRevenue = updatedData[currentMonthIndex]?.revenue || 0;
                    const previousMonthRevenue = currentMonthIndex > 0
                        ? updatedData[currentMonthIndex - 1]?.revenue || 0
                        : 0;

                    let percentageChange = 0;
                    if (previousMonthRevenue === 0) {
                        percentageChange = currentMonthRevenue > 0 ? 100 : 0; // 100% increase if current revenue exists
                    } else {
                        percentageChange = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
                    }
                    setRevenue({
                        data: updatedData,
                        invoicedAmount: response.result?.invoicedAmount || 0,
                        paidAmount: response.result?.paidAmount || 0,
                        outstandingAmount: response.result?.outstandingAmount || 0,
                    });

                    setTrendingPercentage(percentageChange);
                } else {
                    setRevenue({
                        data: initialChartData,
                        invoicedAmount: 0,
                        paidAmount: 0,
                        outstandingAmount: 0,
                    });
                    setTrendingPercentage(0);
                }

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error: unknown) {
                setRevenue({
                    data: initialChartData,
                    invoicedAmount: 0,
                    paidAmount: 0,
                    outstandingAmount: 0,
                });
            }
        };
        fetchData();
    }, [Activebusiness, selectedYear]);

    const handleYearChange = (year: number) => {
        console.log("Selected Year:", year)
        setSelectedYear(year)
    }
    return (
        <div className="flex flex-col gap-4">
            <RevenueSummaryCards
                invoicedAmount={revenue.invoicedAmount}
                paidAmount={revenue.paidAmount}
                outstandingAmount={revenue.outstandingAmount}
                revenue={revenue}
            />

            <Card className="rounded-none shadow-none">
                <CardHeader className="space-y-4">
                    <CardDescription>
                        <span><YearPicker onYearChange={handleYearChange} /></span>
                    </CardDescription>
                    <CardTitle>Invoiced Amount - {formatCurrency(revenue.invoicedAmount)}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="md:h-[40vh] md:w-full">
                        <LineChart
                            accessibilityLayer
                            data={revenue.data}
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
                            <Line
                                dataKey="processingAndDue"
                                type="monotone"
                                stroke="var(--color-processingAndDue)"
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
                                {/* Trending up by {trendingPercentage} this month <TrendingUp className="h-4 w-4" /> */}
                                {trendingPercentage > 0 ? (
                                    <>
                                        Trending up by {trendingPercentage.toFixed(1)}% this month <TrendingUp className="h-4 w-4 text-green-500" />
                                    </>
                                ) : trendingPercentage < 0 ? (
                                    <>
                                        Trending down by {Math.abs(trendingPercentage).toFixed(1)}% this month <TrendingDown className="h-4 w-4 text-red-500" />
                                    </>
                                ) : (
                                    <>No change this month</>
                                )}
                            </div>
                            <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                Showing total revenue and invoices for the year {selectedYear}
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}


interface RevenueSummaryCardsProps {
    invoicedAmount: number;
    paidAmount: number;
    outstandingAmount: number;
    revenue: InvoiceData;
}

export function RevenueSummaryCards({ invoicedAmount, paidAmount, outstandingAmount, revenue }: RevenueSummaryCardsProps) {
    const paymentScore = invoicedAmount > 0 
        ? Math.round((paidAmount / invoicedAmount) * 100) 
        : 0;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <Card className="rounded-none shadow-none w-full ">
                <CardHeader className="py-4">
                    <CardTitle>{formatCurrency(invoicedAmount)}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                    <p className="font-medium">Invoiced</p>
                    <p className="text-muted-foreground text-xs">
                        {revenue.data.reduce((sum, month) => sum + month.invoices, 0) || 'No'} Invoices
                    </p>
                </CardContent>
            </Card>
            <Card className="rounded-none shadow-none w-full">
                <CardHeader className="py-4">
                    <CardTitle>{formatCurrency(paidAmount)}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                    <p className="font-medium">Paid</p>
                    <p className="text-muted-foreground text-xs">
                        {revenue.data.reduce((sum, month) => sum + month.PAID, 0) || 'No'} Invoices
                    </p>
                </CardContent>
            </Card>
            <Card className="rounded-none shadow-none w-full">
                <CardHeader className="py-4">
                    <CardTitle>{formatCurrency(outstandingAmount)}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                    <p className="font-medium">Outstanding</p>
                    <p className="text-muted-foreground text-xs">
                        {revenue.data.reduce((sum, month) => sum + (month.invoices - month.PAID), 0) || 'No'} Invoices
                    </p>
                </CardContent>
            </Card>
            <Card className="rounded-none shadow-none w-full">
                <CardHeader className="py-4">
                    <CardTitle>Payment Score</CardTitle>
                </CardHeader>
                <CardContent className="py-2 space-y-1">
                    <p className="text-2xl font-bold">{paymentScore}%</p>
                    <div className="flex gap-0.5 w-full">
                        {[...Array(20)].map((_, index) => (
                            <div
                                key={index}
                                className={`flex-1 h-2 transition-all duration-500 ${
                                    index < (paymentScore / 5)
                                        ? 'bg-green-500'
                                        : 'bg-green-200'
                                }`}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}