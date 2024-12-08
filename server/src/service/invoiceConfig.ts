import { CreateInvoiceConfig, InvoiceConfigModel } from "../model/InvoiceConfig";

const createInvoiceConfig = async (invoiceConfigData: CreateInvoiceConfig) => {
    const config = new InvoiceConfigModel({
        ...invoiceConfigData
    })
    await config.save();
    return config;
}

const getInvoiceConfig = async (businessId: Id, usersId: Id) => {
    const config = await InvoiceConfigModel.findOne({ business: businessId, user: usersId },
        { __v: 0, createdAt: 0, updatedAt: 0, user: 0, business: 0, _id: 0 }
    );
    return config;
}

const updateInvoiceConfig = async (invoiceConfigData: CreateInvoiceConfig) => {
    const business: Id = invoiceConfigData.business;
    const userId: Id = invoiceConfigData.user;
    const updatedConfig = await InvoiceConfigModel.updateOne({ business: business, user: userId },
        { ...invoiceConfigData },
        { new: true, runValidators: true }
    );
    return updatedConfig;

}

const deleteInvoiceConfig = async (businessId: Id, usersId: Id) => {
    const status = await InvoiceConfigModel.deleteOne({ business: businessId, user: usersId });
    return status;
}

export {
    createInvoiceConfig,
    getInvoiceConfig,
    updateInvoiceConfig,
    deleteInvoiceConfig,
}