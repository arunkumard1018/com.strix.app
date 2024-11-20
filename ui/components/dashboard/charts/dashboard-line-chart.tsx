"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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

export const description = "A multiple line chart"

// const chartData = [
//     { month: "January", desktop: 186, mobile: 80 },
//     { month: "February", desktop: 305, mobile: 200 },
//     { month: "March", desktop: 237, mobile: 120 },
//     { month: "April", desktop: 73, mobile: 190 },
//     { month: "May", desktop: 209, mobile: 130 },
//     { month: "June", desktop: 214, mobile: 140 },
//     { month: "July", desktop: 186, mobile: 80 },
//     { month: "August", desktop: 305, mobile: 200 },
//     { month: "September", desktop: 237, mobile: 120 },
//     { month: "October", desktop: 73, mobile: 190 },
//     { month: "November", desktop: 209, mobile: 130 },
//     { month: "December", desktop: 214, mobile: 140 },
// ]
const chartData = [
    { month: "January", desktop: 0, mobile: 0 },
    { month: "February", desktop: 0, mobile: 0 },
    { month: "March", desktop: 0, mobile: 0 },
    { month: "April", desktop: 0, mobile: 0 },
    { month: "May", desktop: 0, mobile: 0 },
    { month: "June", desktop: 0, mobile: 0 },
    { month: "July", desktop: 0, mobile: 0 },
    { month: "August", desktop: 0, mobile: 0 },
    { month: "September", desktop: 0, mobile: 0 },
    { month: "October", desktop: 0, mobile: 0 },
    { month: "November", desktop: 0, mobile: 0 },
    { month: "December", desktop: 0, mobile: 0 }
];

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function DashboardLineChart() {
    return (
        <Card className="rounded-none shadow-none">
            <CardHeader>
                <CardTitle>Total Revenue - 100$</CardTitle>
                <CardDescription>January - Dec 2024</CardDescription>
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
                            dataKey="desktop"
                            type="monotone"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="mobile"
                            type="monotone"
                            stroke="var(--color-mobile)"
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
                            Showing total visitors for the last 6 months
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
