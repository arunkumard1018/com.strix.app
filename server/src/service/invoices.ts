import { InvoiceModel } from "../model/Invoice";
import { Invoice } from "../types/invoice";

const createInvoice = async (invoiceSchema: Invoice, businessId: Id) => {
    const invoiceModel = new InvoiceModel({ ...invoiceSchema });
    await invoiceModel.save();
    return invoiceModel;
}

const updateInvoice = async (invoiceSchema: Invoice, InvoiceId: Id, usersId: Id) => {
    const updatedInvoice = await InvoiceModel.findOneAndUpdate({ _id: InvoiceId, user: usersId },
        { ...invoiceSchema },
        { new: true, runValidators: true });
    return updatedInvoice;
}

const deleteInvoice = async (InvoiceId: Id, usersId: Id) => {
    const deletedInvoice = await InvoiceModel.findOneAndDelete({ _id: InvoiceId, user: usersId });
    return deletedInvoice;
}

const getAllInvoicesForBusiness = async (businessId: Id, usersId: Id) => {
    const invoiceDetails = await InvoiceModel.find({ business: businessId, user: usersId },
        { _id: 1, invoiceNo: 1, invoiceDate: 1, paymentMethod: 1, paymentStatus: 1, invoiceAmount: 1 })
        .populate("invoiceTo", "name address.city").lean();
    return invoiceDetails.map(invoice => {
        return {
            ...invoice,
            invoiceTo: {
                name: invoice.invoiceTo?.name,
                address: {
                    city: invoice.invoiceTo?.address?.city
                }
            }
        };
    });
}

const getInvoiceDetails = async (businessId: Id, InvoiceId: Id, usersId: Id) => {
    const invoice = await InvoiceModel.findOne({ _id: InvoiceId, user: usersId, business: businessId });
    return invoice;
}

export { createInvoice, deleteInvoice, getAllInvoicesForBusiness, getInvoiceDetails, updateInvoice };
