import mongoose from "mongoose";
import { Invoice } from "../types/invoice";
import { InvoiceModel } from "../model/Invoice";

const createInvoice = async (invoiceSchema: Invoice,businessId : Id) => {
        const invoiceModel = new InvoiceModel({...invoiceSchema});
        await invoiceModel.save();
        return invoiceModel;
}

const updateInvoice = async (invoiceSchema: Invoice, InvoiceId: Id, usersId: Id) => {
    const updatedInvoice = await InvoiceModel.findOneAndUpdate({_id:InvoiceId, user:usersId},{...invoiceSchema});
    return updatedInvoice;
}

const deleteInvoice = async (InvoiceId: Id, usersId: Id) => {
    const deletedInvoice = await InvoiceModel.findOneAndDelete({_id:InvoiceId, user:usersId});
    return deletedInvoice;
}

const getAllInvoicesForBusiness = async (businessId: Id, usersId: Id) => {
    const invoiceDetails = await InvoiceModel.find({business:businessId, user:usersId});
    return invoiceDetails;
}

const getInvoiceDetails = async (businessId:Id, InvoiceId : Id, usersId : Id) => {
    const invoice = await InvoiceModel.findOne({_id:InvoiceId,user:usersId,business:businessId});
    return invoice;
}

export {createInvoice, updateInvoice, deleteInvoice, getInvoiceDetails, getAllInvoicesForBusiness}