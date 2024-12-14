"use client";
import { FormInput } from "@/components/reuse/input";
import { Button } from "@/components/ui/button";
import {
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Field, Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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
const initialValues = {
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
    type = "Create",
}: FormProps) {
    const [loading, setloading] = useState(false);
    const router = useRouter()
    const searchParams = useSearchParams();
    const customerId = searchParams.get("customersId");
    const createCustomer = searchParams.get("createCustomer");
    console.log("CID", customerId);
    console.log("CCCD", createCustomer);

    const handleClose = () => {
        router.push('customers');
    };

    return (
        <SheetContent className="bg-custome-sheet border border-muted-foreground/30 sm:min-w-[30vw] overflow-scroll no-scrollbar shadow-none">
            <SheetHeader className="">
                <SheetTitle>{type} Customer</SheetTitle>
                <SheetDescription>
                    {createCustomer === "true"
                        ? "Fill out the form to create a new customer."
                        : "Make changes to the customer details here. Click save when you're done."}
                </SheetDescription>
                <div className="text-xl font-bold">
                    {createCustomer ? "Create" : `edit ${customerId}`}
                </div>
            </SheetHeader>
            <div className="mt-5">
                <Formik
                    initialValues={initialValues}
                    validationSchema={CustomersFormSchema}
                    onSubmit={async (values) => {
                        setloading(true);
                        try {
                            console.log(values)
                            // await handleFormData(values);
                        } finally {
                            setloading(false);
                        }
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
                                        disabled={loading}
                                        className="py-2 px-4 rounded-none"
                                    >
                                        {loading
                                            ? `${type.slice(0, -1)}ing Customer...`
                                            : `${type}`}
                                    </Button>
                                </div>
                            </SheetFooter>
                        </Form>
                    )}
                </Formik>
            </div>
        </SheetContent>
    );
}
