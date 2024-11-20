"use client"

import { TrendingUp } from "lucide-react"
import * as React from "react"
import { Cell, Label, Pie, PieChart } from "recharts"

import { getInvoiceStats } from "@/api/latestData"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { addInvoicesStats } from "@/store/slices/latestDataSlice"
import { RootState } from "@/store/store"
import { ApiResponse } from "@/types/api-responses"
import { useDispatch, useSelector } from "react-redux"
import { InvoiceStats } from "@/types/invoices"

export const description = "A donut chart with text"

// Chart configuration object with label and color mapping
const chartConfig = {
    totalPaid: {
        label: "Paid",
        color: "hsl(var(--chart-1))",
    },
    totalProcessing: {
        label: "Processing",
        color: "hsl(var(--chart-2))",
    },
    totalDue: {
        label: "Due",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig

export function InvoicePieChart() {
    const storeState = useSelector((state: RootState) => state);
    const stats = useSelector((state: RootState) => state.latestData.invoiceStats);
    const dispatch = useDispatch();
    const chartData = React.useMemo(() => {
        const data = [
            {
                browser: "totalPaid",
                visitors: stats.totalPaid,
                fill: chartConfig.totalPaid.color,
            },
            {
                browser: "totalProcessing",
                visitors: stats.totalProcessing,
                fill: chartConfig.totalProcessing.color,
            },
            {
                browser: "totalDue",
                visitors: stats.totalDue,
                fill: chartConfig.totalDue.color,
            },
        ]
        return data
    }, [stats])
    const allZero = chartData.every(item => item.visitors === 0)
    const totalInvoices = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [chartData])
    const activeBusinessId = storeState.authContext.activeBusiness._id;
    React.useEffect(() => {
        const loadStats = async () => {
            try {
                const response: ApiResponse<InvoiceStats> = await getInvoiceStats(activeBusinessId);
                if (response.result !== undefined) dispatch(addInvoicesStats(response.result));
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_error:unknown) {
            }
        }
        loadStats();
    }, [activeBusinessId, dispatch]);

    return (
        <Card className="flex flex-col rounded-none shadow-none">
            <CardHeader className="items-center pb-0">
                <CardTitle>Invoice Details</CardTitle>
                <CardDescription>{storeState.authContext.activeBusiness.name}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {allZero ? <div className="flex justify-center items-center p-4 text-center text-muted-foreground">
                    {/* <p>No data available for this period.</p> */}
                    <DummyPieChart />
                </div> :
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart >
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="visitors"
                                nameKey="browser"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {totalInvoices.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Invoices
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>}
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total Invoices Details
                </div>
            </CardFooter>
        </Card>
    )
}

const DummyPieChart = () => {
    return (
        <PieChart width={200} height={200}>
            <Pie
                data={[{ name: 'Dummy', value: 0.1 }]} // Single dummy slice
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                fill="#e0e0e0" // Light grey to indicate a dummy chart
                isAnimationActive={false} // Optional: Disable animation for the dummy chart
            >
                <Cell fill="#e0e0e0" />
            </Pie>
        </PieChart>
    );
};
