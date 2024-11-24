"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker() {
    const [date, setDate] = React.useState<Date>()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[150px] justify-start text-left font-normal rounded-none",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>{date}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
interface YearPickerProps {
    onYearChange: (year: number) => void // Callback to send selected year to parent
}

export function YearPicker({ onYearChange }: YearPickerProps) {
    const [year, setYear] = React.useState<number>(new Date().getFullYear());
    const [isPickerOpen, setIsPickerOpen] = React.useState(false)
    const togglePicker = () => {
        setIsPickerOpen((prev) => !prev)
    }

    // const closePicker = () => {
    //     setIsPickerOpen(false)
    // }

    const handleYearSelect = (selectedYear: number) => {
        setYear(selectedYear)
        onYearChange(selectedYear)
        togglePicker();
    }
    const renderYears = () => {
        const currentYear = new Date().getFullYear()
        const startYear = currentYear - 5 // Display last 50 years
        const endYear = currentYear + 5 // Display next 10 years
        const years = []
        for (let i = startYear; i <= endYear; i++) {
            years.push(
                <button
                    key={i}
                    onClick={() => handleYearSelect(i)}
                    className={cn(
                        "py-1 text-sm font-medium ",
                        i === year && "border "
                    )}
                >
                    {i}
                </button>
            )
        }
        return years
    }
    return (
        <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[150px] justify-start text-left font-normal rounded-none",
                        !year && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {year || <span>Select Year</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-4 grid grid-cols-4 gap-2 rounded-none" align="start">
                {renderYears()}
            </PopoverContent>
        </Popover>
    )
}