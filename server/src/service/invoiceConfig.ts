import { CreateInvoiceConfig, InvoiceConfigModel } from "../model/InvoiceConfig";

const createInvoiceConfig = async (invoiceConfigData: CreateInvoiceConfig) => {
    const config = new InvoiceConfigModel({
        ...invoiceConfigData
    })
    await config.save();
    return config;
}

const getInvoiceConfig = async (businessId: Id, usersId: Id) => {
    const config = await InvoiceConfigModel.findOne({ business: businessId, user: usersId });
    return config;
}
export { createInvoiceConfig, getInvoiceConfig }