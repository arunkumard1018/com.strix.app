import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { FieldArray, FormikProps } from 'formik'
import React from 'react'
import { InvoiceTransportProductRow } from './InvoiceTransportProductRow'
import { InvoiceProductRow } from './invoice-products-row'
import { InvoiceFormData } from '../../types'


interface TransportFieldArrayProps {
    formik: FormikProps<InvoiceFormData>;
}
const TransportProductFieldArray: React.FC<TransportFieldArrayProps> = ({ formik }) => {
    const initialValues = {
        date: new Date(),
        vehicleNo: "",
        source: "",
        destination: "",
        price: 0,
        cgst: 0,
        sgst: 0,
        totalAmount: 0,
    }
    return (
        <FieldArray name="invoiceProductsTransport">
            {({ remove, push }) => (
                <div>
                    {/* Table Header */}
                    <table className="table-auto w-full">
                        <TransportHeader />
                        <tbody>
                            {formik.values.invoiceProductsTransport.map((_, idx) => (
                                <InvoiceTransportProductRow
                                    formik={formik}
                                    key={idx}
                                    idx={idx}
                                    handleChange={formik.handleChange}
                                    removeRow={remove}
                                />
                            ))}
                            <tr className="bg-muted">
                                <td colSpan={6} className="">
                                    <AddRowBtn onClick={() => push(initialValues)} />
                                </td>
                                <td className="">Gross</td>
                                <td className="text-right">{formatCurrency(formik.values.invoicesummary.invoiceAmount)}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </FieldArray>
    )
}

interface ProductsFieldArrayProps {
    formik: FormikProps<InvoiceFormData>;
}
const ProductsFieldArray: React.FC<ProductsFieldArrayProps> = ({ formik }) => {
    const initialValues = {
        sku: "",
        description: "",
        price: 280000,
        qty: 1,
        cgst: 0,
        sgst: 0,
        totalAmount: 0
    }
    return (
        <FieldArray name="invoiceProducts">
            {({ remove, push }) => (
                <div>
                    {/* Table Header */}
                    <table className="table-auto w-full">
                        <ProductsHeader />
                        <tbody>
                            {formik.values.invoiceProducts.map((_, idx) => (
                                <InvoiceProductRow
                                    key={idx}
                                    idx={idx}
                                    formik={formik}
                                    handleChange={formik.handleChange}
                                    removeRow={remove}
                                />
                            ))}
                            <tr className="bg-muted">
                                <td colSpan={5} className="">
                                    <AddRowBtn onClick={() => push(initialValues)} />
                                </td>
                                <td className="">Gross</td>
                                <td className="text-right">{formatCurrency(formik.values.invoicesummary.invoiceAmount)}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </FieldArray>
    )
}


const AddRowBtn = ({ ...props }) => {
    return (
        <div className="py-1 px-1 " {...props}>
            <Button
                type="button"
                variant="outline"
                size={"sm"}
                className="rounded-none"
            >
                <PlusCircledIcon className="" /> Add
            </Button>
        </div>
    )
}

const TransportHeader = () => {
    return (
        <thead className="text-left text-sm bg-muted py-10">
            <tr>
                <th className="w-[10%]  px-2">Date</th> {/* ~16% */}
                <th className="w-[16%]  px-2">Vehicle No</th> {/* ~16% */}
                <th className="w-1/6  px-2">Source</th> {/* ~16% */}
                <th className="w-1/6  px-2">Destination</th> {/* ~16% */}
                <th className="w-[15%]  px-2">Price</th> {/* ~16% */}
                <th className="w-1/12  px-2">CGST</th> {/* Small width */}
                <th className="w-1/12  px-2">SGST</th> {/* Small width */}
                <th className="w-1/6  px-2 text-center">Amount</th> {/* ~16% */}
                <th className="w-fit  text-center"></th> {/* Fit for icon */}
            </tr>
        </thead>
    )
}
const ProductsHeader = () => {
    return (
        <thead className="text-left text-sm bg-muted py-10">
            <tr>
                <th className="w-1/12  text-sm px-2 py-2 ">Id</th> {/* ~16% */}
                <th className="w-2/5  px-2 ">Description</th> {/* ~40% */}
                <th className="w-1/6  px-2">Price</th> {/* ~16% */}
                <th className="w-1/12  px-2">QTY</th> {/* Small width */}
                <th className="w-1/12  px-2">CGST</th> {/* Small width */}
                <th className="w-1/12  px-2">SGST</th> {/* Small width */}
                <th className="w-1/6  px-2 text-center">Amount</th> {/* ~16% */}
                <th className="w-fit  text-center"></th> {/* Fit for icon */}
            </tr>
        </thead>
    )
}

export { ProductsFieldArray, TransportProductFieldArray }

