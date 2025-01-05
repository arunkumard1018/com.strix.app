"use client"

import { getCustomersList } from "@/api/customers"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { setCustomers } from "@/store/slices/customersSlice"
import { RootState } from "@/store/store"
import { ApiResponse } from "@/types/api-responses"
import { Customers } from "@/types/model.definetions"
import { Check, ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export function ComboboxDemo({ onSelectCustomer }: { onSelectCustomer: (customers: Customers) => void }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    const businessId = useSelector((state: RootState) => state.authContext.activeBusiness._id);
    const customers = useSelector((state: RootState) => state.customers);
    const router = useRouter()
    useEffect(() => {
        const loadCustomers = async (Id: string) => {
            try {
                const customers: ApiResponse<Customers[]> = await getCustomersList(Id);
                if (customers.result) {
                    dispatch(setCustomers(customers.result));
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_error: unknown) {
            }
        };
        if (customers.length === 0) loadCustomers(businessId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [businessId]);

    const customerOptions = customers.map((customer) => ({
        value: customer._id,
        label: customer.name,
        details: customer,
    }));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleShortCut = () => {
        router.push("/dashboard/customers?createCustomer=true")
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[320px] justify-between rounded-none"
                >
                    {value
                        ? customerOptions.find((option) => option.value === value)?.label
                        : "Select Customer"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[320px] p-0 rounded-none">
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
                        {/* <CommandShortcut onClick={handleShortCut}>
                            <CommandItem className="px-3"><Plus/> Create Customer</CommandItem>
                        </CommandShortcut> */}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
