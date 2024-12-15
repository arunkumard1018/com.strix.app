"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { Customers } from "@/types/definetions"

// const customers = [
//     {
//         value: "next.js",
//         label: "Next.js",
//     },
//     {
//         value: "sveltekit",
//         label: "SvelteKit",
//     },
//     {
//         value: "nuxt.js",
//         label: "Nuxt.js",
//     },
//     {
//         value: "remix",
//         label: "Remix",
//     },
//     {
//         value: "astro",
//         label: "Astro",
//     },
// ]

export function ComboboxDemo({ onSelectCustomer }: { onSelectCustomer: (customers: Customers) => void }) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    // Select customers from Redux state
    const customers = useSelector((state: RootState) => state.customers);

    // Transform customers for combobox (id as key, name as value)
    const customerOptions = customers.map((customer) => ({
        value: customer._id,
        label: customer.name,
        details: customer,
    }));

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between rounded-none"
                >
                    {value
                        ? customerOptions.find((option) => option.value === value)?.label
                        : "Select Customer"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-full p-0 rounded-none">
                <Command>
                    <CommandInput placeholder="Search Customer..." />
                    <CommandList>
                        <CommandEmpty>No customer found.</CommandEmpty>
                        <CommandGroup>
                            {customerOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        const selectedCustomer = customerOptions.find(
                                            (opt) => opt.value === currentValue
                                        );
                                        if (selectedCustomer) {
                                            setValue(currentValue);
                                            onSelectCustomer(selectedCustomer.details);
                                        }
                                        setOpen(false);
                                    }}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
