import mongoose from "mongoose";
import logger from "../lib/logConfig";
import { InvoiceModel } from "../model/Invoice";
import { InvoiceConfigModel } from "../model/InvoiceConfig";
import { DuplicateInvoiceNumberError, InvoiceNotFoundError } from "../errors";

const createInvoice = async (invoiceSchema: Invoice, businessId: Id) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    logger.debug(`Starting invoice creation for business: ${businessId}`);

    try {
        // Get current invoice config
        logger.debug(`Fetching invoice config for business: ${businessId}`);
        const invoiceConfig = await InvoiceConfigModel.findOne({ 
            business: businessId 
        }).session(session);


        if (!invoiceConfig || !invoiceConfig.invoiceDetails?.invoiceNo || !invoiceConfig.invoiceDetails?.invoicePrefix) {
            logger.debug(`Invalid invoice config found: ${JSON.stringify(invoiceConfig)}`);
            throw new Error("Invalid invoice configuration: missing invoice number or prefix");
        }

        const userEnteredNo = invoiceSchema.invoiceDetails.invoiceNo;
        const configAvailableNo = invoiceConfig.invoiceDetails.invoiceNo;
        const prefix = invoiceConfig.invoiceDetails.invoicePrefix;
        
        logger.debug(`Invoice numbers - User entered: ${userEnteredNo}, Config available: ${configAvailableNo}, Prefix: ${prefix}`);

        // Case 1: User entered number >= available number
        if (userEnteredNo >= configAvailableNo) {
            logger.debug(`Creating invoice with number >= available number: ${userEnteredNo}`);
            // Create invoice
            const invoiceModel = new InvoiceModel({ ...invoiceSchema });
            await invoiceModel.save({ session });

            // Update config with next available number
            invoiceConfig.invoiceDetails.invoiceNo = userEnteredNo + 1;
            await invoiceConfig.save({ session });

            await session.commitTransaction();
            logger.debug(`Successfully created invoice with number: ${prefix}${userEnteredNo}`);
            return invoiceModel;
        }

        // Case 2: User entered number < available number
        // Check if invoice number with prefix already exists
        logger.debug(`Checking for existing invoice with number: ${prefix}${userEnteredNo}`);
        const existingInvoice = await InvoiceModel.findOne({
            'invoiceDetails.invoicePrefix': prefix,
            'invoiceDetails.invoiceNo': userEnteredNo,
            business: businessId
        }).session(session);

        if (existingInvoice) {
            logger.debug(`Found existing invoice with number: ${prefix}${userEnteredNo}`);
            throw new DuplicateInvoiceNumberError(`Invoice number ${prefix}${userEnteredNo} already exists`);
        }

        // Create invoice without updating config
        logger.debug(`Creating invoice with number < available number: ${userEnteredNo}`);
        const invoiceModel = new InvoiceModel({ ...invoiceSchema });
        await invoiceModel.save({ session });

        await session.commitTransaction();
        logger.debug(`Successfully created invoice with number: ${prefix}${userEnteredNo}`);
        return invoiceModel;

    } catch (error: unknown) {
        await session.abortTransaction();
        logger.error(`Error in createInvoice: ${error instanceof Error ? error.stack : error}`);
        throw error;
    } finally {
        session.endSession();
        logger.debug(`Ended invoice creation session`);
    }
}

const updateInvoice = async (invoiceSchema: Invoice, invoiceId: Id, userId: Id) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    logger.debug(`Starting invoice update for invoice: ${invoiceId}`);

    try {
        // Get existing invoice
        const existingInvoice = await InvoiceModel.findOne({ 
            _id: invoiceId, 
            user: userId 
        }).session(session);

        if (!existingInvoice) {
            throw new Error("Invoice not found");
        }

        if (!existingInvoice.invoiceDetails?.invoiceNo) {
            throw new Error("Invalid invoice: missing invoice number");
        }

        // If invoice number is being changed, validate it
        if (existingInvoice.invoiceDetails.invoiceNo !== invoiceSchema.invoiceDetails.invoiceNo) {
            logger.debug(`Invoice number change detected: ${existingInvoice.invoiceDetails.invoiceNo} -> ${invoiceSchema.invoiceDetails.invoiceNo}`);
            
            // Get invoice config
            const invoiceConfig = await InvoiceConfigModel.findOne({ 
                business: invoiceSchema.business 
            }).session(session);

            if (!invoiceConfig?.invoiceDetails?.invoiceNo || !invoiceConfig.invoiceDetails.invoicePrefix) {
                throw new Error("Invalid invoice configuration");
            }

            const newInvoiceNo = invoiceSchema.invoiceDetails.invoiceNo;
            const prefix = invoiceConfig.invoiceDetails.invoicePrefix;

            // Check for duplicate invoice number
            const duplicateInvoice = await InvoiceModel.findOne({
                _id: { $ne: invoiceId }, // Exclude current invoice
                'invoiceDetails.invoicePrefix': prefix,
                'invoiceDetails.invoiceNo': newInvoiceNo,
                business: invoiceSchema.business
            }).session(session);

            if (duplicateInvoice) {
                throw new DuplicateInvoiceNumberError(`Invoice number ${prefix}${newInvoiceNo} already exists`);
            }

            // Update config's next number if necessary
            if (newInvoiceNo >= invoiceConfig.invoiceDetails.invoiceNo) {
                invoiceConfig.invoiceDetails.invoiceNo = newInvoiceNo + 1;
                await invoiceConfig.save({ session });
            }
        }

        // Update invoice
        const updatedInvoice = await InvoiceModel.findOneAndUpdate(
            { _id: invoiceId, user: userId },
            { ...invoiceSchema },
            { new: true, runValidators: true, session }
        );

        await session.commitTransaction();
        logger.debug(`Successfully updated invoice: ${invoiceId}`);
        return updatedInvoice;

    } catch (error: unknown) {
        await session.abortTransaction();
        logger.error(`Error in updateInvoice: ${error instanceof Error ? error.stack : error}`);
        throw error;
    } finally {
        session.endSession();
        logger.debug('Ended invoice update session');
    }
};

const deleteInvoice = async (invoiceId: Id, userId: Id, businessId: Id) => {
    logger.debug(`Starting invoice deletion for invoice: ${invoiceId} in business: ${businessId}`);
    
    try {
        const deletedInvoice = await InvoiceModel.findOneAndDelete({ 
            _id: invoiceId, 
            user: userId,
            business: businessId
        });

        if (!deletedInvoice) {
            throw new InvoiceNotFoundError(`Invoice with id ${invoiceId} not found`);
        }

        logger.debug(`Successfully deleted invoice: ${invoiceId}`);
        return deletedInvoice;

    } catch (error: unknown) {
        logger.error(`Error in deleteInvoice: ${error instanceof Error ? error.stack : error}`);
        throw error;
    }
};

const getInvoiceDetails = async (invoiceId: Id, userId: Id, businessId: Id) => {
    logger.debug(`Retrieving invoice details for invoice: ${invoiceId} in business: ${businessId}`);
    
    try {
        const invoice = await InvoiceModel.findOne({ 
            _id: invoiceId, 
            user: userId,
            business: businessId
        });

        if (!invoice) {
            throw new InvoiceNotFoundError(`Invoice with id ${invoiceId} not found`);
        }

        logger.debug(`Successfully retrieved invoice: ${invoiceId}`);
        return invoice;

    } catch (error: unknown) {
        logger.error(`Error in getInvoiceDetails: ${error instanceof Error ? error.stack : error}`);
        throw error;
    }
};

const getAllInvoicesInfo = async (businessId: Id, userId: Id) => {
    logger.debug(`Retrieving all invoices info for business: ${businessId} and user: ${userId}`);
    
    try {
        const invoices = await InvoiceModel.find(
            { 
                business: businessId, 
                user: userId 
            },
            {
                'invoiceDetails.invoicePrefix': 1,
                'invoiceDetails.invoiceNo': 1,
                'invoiceDetails.invoiceDate': 1,
                'invoiceDetails.dueDate': 1,
                'invoiceFrom.name': 1,
                'invoiceFrom.city': 1,
                'invoiceTo.name': 1,
                'invoiceTo.city': 1,
                'additionlInfo.paymentStatus': 1,
                'additionlInfo.paymentMethod': 1,
                'invoicesummary': 1
            }
        ).sort({ 'invoiceDetails.invoiceDate': -1 }); // Sort by invoice date, newest first

        logger.debug(`Successfully retrieved ${invoices.length} invoices`);
        return invoices;

    } catch (error: unknown) {
        logger.error(`Error in getAllInvoicesInfo: ${error instanceof Error ? error.stack : error}`);
        throw error;
    }
};

const getLatestInvoices = async (userId: Id) => {
    logger.debug(`Fetching latest 5 invoices for user: ${userId}`);
    
    try {
        const latestInvoices = await InvoiceModel.find(
            { 
                user: userId,
                'additionlInfo.paymentStatus': 'Paid' // Only fetch paid invoices
            },
            {
                'invoiceDetails.invoicePrefix': 1,
                'invoiceDetails.invoiceNo': 1,
                'invoiceDetails.invoiceDate': 1,
                'invoiceTo.name': 1,
                'additionlInfo.paymentMethod': 1,
                'invoicesummary': 1
            }
        )
        .sort({ 'invoiceDetails.invoiceDate': -1 }) // Sort by date, newest first
        .limit(5); // Limit to 5 results

        // Transform the data to include combined invoice number
        const formattedInvoices = latestInvoices.map(invoice => ({
            _id: invoice._id,
            invoiceNumber: `${invoice.invoiceDetails?.invoicePrefix ?? ''}${invoice.invoiceDetails?.invoiceNo ?? ''}`,
            customerName: invoice.invoiceTo?.name ?? '',
            invoiceDate: invoice.invoiceDetails?.invoiceDate,
            paymentMethod: invoice.additionlInfo?.paymentMethod ?? '',
            invoiceAmount: invoice.invoicesummary?.invoiceAmount ?? 0
        }));

        logger.debug(`Successfully retrieved ${formattedInvoices.length} latest invoices`);
        return formattedInvoices;

    } catch (error: unknown) {
        logger.error(`Error in getLatestInvoices: ${error instanceof Error ? error.stack : error}`);
        throw error;
    }
};

export {
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceDetails,
    getAllInvoicesInfo,
    getLatestInvoices
};
