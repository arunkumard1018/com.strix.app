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

interface DatePickerProps {
    value?: Date;
    onChange?: (date: Date) => void;
    className?: string;
}

export function DatePicker({ value, onChange, className }: DatePickerProps) {
    const [date, setDate] = React.useState<Date | undefined>(value || new Date());
    const [isPickerOpen, setIsPickerOpen] = React.useState(false)
    const togglePicker = () => {
        setIsPickerOpen((prev) => !prev)
    }
    const handleDateChange = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate);
            if (onChange) {
                const istDate = new Date(selectedDate.getTime() + (5.5 * 60 * 60 * 1000)); // Adding 5.5 hours
                console.log("Date Selected  : ", istDate)
                onChange(istDate);
            }
        }
    };

    return (
        <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"calander"}
                    className={cn(
                        "w-full justify-start items-center text-left font-normal rounded-none",
                        !date && "text-muted-foreground", className
                    )}
                >
                    {date ? format(date, "dd-MM-yyyy") : <span>Select Date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 rounded-none" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onDayClick={togglePicker}
                    onSelect={handleDateChange}
                    initialFocus

                />
            </PopoverContent>
        </Popover>
    );
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