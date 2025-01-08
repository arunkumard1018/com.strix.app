"use client"

import { TrendingUp } from "lucide-react"
import * as React from "react"
import { Cell, Label, Pie, PieChart } from "recharts"

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
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"


const chartConfig = {
    totalPaid: {
        label: "Paid",

        color: "hsl(var(--chart-2))",
    },
    totalProcessing: {
        label: "Processing",
        color: "hsl(var(--chart-1))",
    },
    totalDue: {
        label: "Due",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig

export function InvoicePieChart() {
    const activeBusiness = useSelector((state: RootState) => state.authContext.activeBusiness);
    const stats = useSelector((state: RootState) => state.latestData.revenue);
    const chartData = React.useMemo(() => {
        const data = [
            {
                browser: "totalPaid",
                visitors: stats.totalPaidInvoices,
                fill: chartConfig.totalPaid.color,
            },
            {
                browser: "totalProcessing",
                visitors: stats.totalProcessingInvoices,
                fill: chartConfig.totalProcessing.color,
            },
            {
                browser: "totalDue",
                visitors: stats.totalDueInvoices,
                fill: chartConfig.totalDue.color,
            },
        ]
        return data
    }, [stats])
    const allZero = chartData.every(item => item.visitors === 0)
    const totalInvoices = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [chartData])

    return (
        <Card className="flex flex-col rounded-none shadow-none">
            <CardHeader className="items-center pb-0">
                <CardTitle>Invoice Details</CardTitle>
                <CardDescription>{activeBusiness.name}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {allZero ? <div className="flex justify-center items-center p-4 text-center text-muted-foreground">
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
    const dummyData = [
        { name: 'Paid', value: 1, fill: chartConfig.totalPaid.color },
        { name: 'Processing', value: 1, fill: chartConfig.totalProcessing.color },
        { name: 'Due', value: 1, fill: chartConfig.totalDue.color }
    ];

    return (
        <PieChart width={200} height={200}>
            <Pie
                data={dummyData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                innerRadius={60}
                isAnimationActive={false}
            >
                {dummyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <Label
                    content={() => (
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            <tspan
                                x="50%"
                                y="50%"
                                className="fill-foreground text-3xl font-bold"
                            >
                                0
                            </tspan>
                            <tspan
                                x="50%"
                                y="62%"
                                className="fill-muted-foreground"
                            >
                                Invoices
                            </tspan>
                        </text>
                    )}
                />
            </Pie>
        </PieChart>
    );
};
