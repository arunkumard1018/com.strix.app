"use client";
import { createCustomers, getCustomers, updateCustomers } from "@/api/customers";
import { FormInput } from "@/components/reuse/input";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { appendCustomer, updateCustomer } from "@/store/slices/customersSlice";
import { RootState } from "@/store/store";
import { ApiResponse } from "@/types/api-responses";
import { Customers } from "@/types/model.definetions";
import { Field, Form, Formik } from "formik";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

export interface CustomersFormData {
    name: string;
    email: string;
    GSTIN: string;
    PAN: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
}
const CustomersFormSchema = Yup.object().shape({
    name: Yup.string().required("Name Required"),
    email: Yup.string().optional(),
    GSTIN: Yup.string().optional(),
    PAN: Yup.string().optional(),
    phone: Yup.number().integer("Phone Must Be Number").required("Phone Required"),
    street: Yup.string().required("Street Required"),
    city: Yup.string().required("City Required"),
    state: Yup.string().required("State Required"),
    postalCode: Yup.number()
        .transform((originalValue) =>
            /^\d+$/.test(originalValue) ? parseInt(originalValue, 10) : NaN
        )
        .required("Postal Code is required")
        .typeError("Postal Code must be a valid number")
        .integer("Postal Code must be an integer"),
});
interface FormProps {
    className?: string;
    type?: "Update" | "Create";
}
const initialDetails = {
    _id: "",
    name: "",
    email: "",
    GSTIN: "",
    PAN: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
};
export function CustomersSheet({
    className,
}: FormProps) {
    // const [loading, setLoading] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const activeBusinessId = useSelector((state: RootState) => state.authContext.activeBusiness._id);
    const router = useRouter();
    const [initialValues, setInitialValues] = useState(initialDetails);
    const searchParams = useSearchParams();
    const customerId = searchParams.get("customersId");
    const createCustomer = Boolean(searchParams.get("createCustomer"));
    const dispatch = useDispatch();
    const { toast } = useToast()

    useEffect(() => {
        const loadCustomersData = async () => {
            // setLoading(true);
            try {
                if (customerId) {
                    const response: ApiResponse<Customers> = await getCustomers(activeBusinessId, customerId);
                    const customer = response.result;
                    if (customer) {
                        setInitialValues({
                            _id: customer._id,
                            name: customer.name,
                            email: customer.email,
                            GSTIN: customer.GSTIN,
                            PAN: customer.PAN,
                            phone: String(customer.phone),
                            street: customer.address.street,
                            city: customer.address.city,
                            state: customer.address.state,
                            postalCode: String(customer.address.postalCode),
                        });
                        setIsSheetOpen(true)
                    }
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_error: unknown) {
            } finally {
                // setLoading(false);
            }
        };
        if (createCustomer) {
            setInitialValues(initialDetails)
            setIsSheetOpen(true);
        } else if (customerId === initialValues._id) {
            setIsSheetOpen(true)
        } else {
            loadCustomersData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerId, createCustomer])

    const handleClose = useCallback(() => {
        router.push("customers");
        setIsSheetOpen(false);
    }, [router]);

    const handleFormData = async (values: CustomersFormData) => {
        try {
            if (createCustomer) {
                const response: ApiResponse<Customers> = await createCustomers(values, activeBusinessId);
                if (response.result) dispatch(appendCustomer(response.result));
                handleClose()
                toast({
                    variant: "success",
                    title: "Customer Created Successfully!",
                    description: `Customer ${response.result?.name} created.`,
                    action: <ToastAction altText="Ok" >close</ToastAction>,
                })
            } else {
                const response: ApiResponse<Customers> = await updateCustomers(values, initialValues._id, activeBusinessId);
                if (response.result) {
                    dispatch(updateCustomer(response.result));
                }
                handleClose()
                toast({
                    variant: "success",
                    title: "Customer Updated Successfully!",
                    description: `Customer ${response.result?.name} Updated.`,
                    action: <ToastAction altText="Ok" >close</ToastAction>,
                })

            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error While Creating Customer!",
                description: `Customer ${(error as Error).message} created.`,
                action: <ToastAction altText="Ok" >close</ToastAction>,
            })
        }
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={() => {
            setIsSheetOpen(!isSheetOpen);
            router.push("customers")
        }}>
            <SheetContent className="border border-muted-foreground/30 sm:min-w-[30vw] overflow-scroll no-scrollbar shadow-none">
                <SheetHeader className="">

                    <div className="flex justify-between items-center">
                        <SheetTitle>{createCustomer ? "Create" : "Edit"} Customer</SheetTitle>
                        <SheetClose asChild className="cursor-pointer" onClick={handleClose}>
                            <X size={20} />
                        </SheetClose>
                    </div>
                    <SheetDescription />
                </SheetHeader>
                <div className="mt-5">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={CustomersFormSchema}
                        onSubmit={(values) => {
                            handleFormData(values);
                        }}
                    >
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className={cn("flex flex-col space-y-4 pb-10", className)}>
                                    <Field
                                        label="Customer Name"
                                        name="name"
                                        placeholder="John Doe"
                                        component={FormInput}
                                    />
                                    <div className="flex flex-row gap-4">
                                        <Field
                                            label="Email"
                                            name="email"
                                            placeholder="jhon@gmail.com"
                                            component={FormInput}
                                        />
                                        <Field
                                            label="Phone"
                                            name="phone"
                                            placeholder="+91 65865 87744"
                                            component={FormInput}
                                        />
                                    </div>
                                    <Field
                                        label="Address"
                                        name="street"
                                        placeholder="# 129 Street"
                                        component={FormInput}
                                    />
                                    <Field
                                        label="City"
                                        name="city"
                                        placeholder="CITY"
                                        component={FormInput}
                                    />
                                    <Field
                                        label="State"
                                        name="state"
                                        placeholder="Select State"
                                        component={FormInput}
                                    />
                                    <Field
                                        label="Postal Code"
                                        name="postalCode"
                                        errorMessageRequired
                                        placeholder="577885"
                                        component={FormInput}
                                    />
                                    <div className="flex flex-row gap-4">
                                        <Field
                                            label="GSTIN"
                                            name="GSTIN"
                                            placeholder="IUYXCF87GF6Y"
                                            component={FormInput}
                                        />
                                        <Field
                                            label="PAN"
                                            name="PAN"
                                            placeholder="IUYXCF87GF6Y"
                                            component={FormInput}
                                        />
                                    </div>
                                </div>
                                <SheetFooter>
                                    <div className="flex justify-end space-x-4">
                                        <SheetClose asChild>
                                            <Button
                                                variant="secondary"
                                                className="py-2 px-4 rounded-none border border-muted-foreground/30"
                                                type="button"
                                                onClick={handleClose}
                                            >
                                                Cancel
                                            </Button>
                                        </SheetClose>
                                        <Button
                                            type="submit"
                                            variant="default"
                                            className="py-2 px-4 rounded-none"
                                        >
                                            {createCustomer ? "Create" : "Save"}
                                        </Button>
                                    </div>
                                </SheetFooter>
                            </Form>
                        )}
                    </Formik>
                </div>
            </SheetContent>
        </Sheet>
    );
}
