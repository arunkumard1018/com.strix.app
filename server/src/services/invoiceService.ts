import mongoose from "mongoose";
import { InvoiceNotFoundError } from "../errors";
import logger from "../lib/logConfig";
import { InvoiceModel } from "../model/Invoice";
import { validateInvoiceNumber } from '../utils/invoiceValidator';
import { createOrUpdateInvoiceConfig } from './invoiceConfigService';

const createInvoice = async (invoiceSchema: Invoice, businessId: Id) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    logger.debug(`Starting invoice creation for business: ${businessId}`);

    try {
        // Handle invoice config creation/updates using centralized function
        const invoiceConfig = await createOrUpdateInvoiceConfig(invoiceSchema, businessId, session);
        
        // Validate invoice number uniqueness
        const userEnteredNo = invoiceSchema.invoiceDetails.invoiceNo;
        const prefix = invoiceConfig?.invoiceDetails?.invoicePrefix ?? 'INV';
        await validateInvoiceNumber(userEnteredNo, prefix, businessId, session);

        // Create invoice
        const invoiceModel = new InvoiceModel({
            ...invoiceSchema,
            createdAt: new Date(),
            updatedAt: new Date()
        });
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
        logger.debug('Ended invoice creation session');
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

        // Handle invoice config updates using centralized function
        const invoiceConfig = await createOrUpdateInvoiceConfig(invoiceSchema, invoiceSchema.business, session);
        
        const userEnteredNo = invoiceSchema.invoiceDetails.invoiceNo;
        const prefix = invoiceConfig?.invoiceDetails?.invoicePrefix ?? 'INV';

        // If invoice number is being changed, validate it
        if (existingInvoice.invoiceDetails?.invoiceNo !== userEnteredNo) {
            logger.debug(`Invoice number change detected: ${existingInvoice.invoiceDetails?.invoiceNo} -> ${userEnteredNo}`);
            await validateInvoiceNumber(userEnteredNo, prefix, invoiceSchema.business, session, invoiceId);
        }

        // Update invoice
        const updatedInvoice = await InvoiceModel.findOneAndUpdate(
            { _id: invoiceId, user: userId },
            { 
                ...invoiceSchema,
                updatedAt: new Date()
            },
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

interface SearchFilters {
    invoiceNumber?: string;
    customerName?: string;
    customerCity?: string;
}
const getAllInvoicesInfo = async (
    businessId: Id, 
    userId: Id, 
    page = 1, 
    limit = 10,
    search?: SearchFilters
) => {
    logger.debug(`Retrieving invoices for business: ${businessId}, user: ${userId}, page: ${page}, limit: ${limit}, search:`, search);
    
    try {
        // Build search query
        const baseQuery = { 
            business: businessId, 
            user: userId 
        };

        if (search) {
            const searchQuery: any = { ...baseQuery };
            
            if (search.invoiceNumber) {
                // Match various invoice number patterns:
                // Examples: INV-001, inv/001, ABC123, INV_001, etc.
                const match = search.invoiceNumber.match(/^([A-Za-z-/_]*)?(\d+)$/i);
                if (match) {
                    const [, prefix, number] = match;
                    if (prefix) {
                        // If prefix exists, search with case-insensitive regex
                        searchQuery['invoiceDetails.invoicePrefix'] = new RegExp('^' + prefix.replace(/[-\/_]/g, '[-\\/_]'), 'i');
                    }
                    searchQuery['invoiceDetails.invoiceNo'] = parseInt(number);
                } else {
                    // If no clear number part or just searching for prefix
                    searchQuery['$or'] = [
                        { 'invoiceDetails.invoicePrefix': new RegExp(search.invoiceNumber, 'i') },
                        { 'invoiceDetails.invoiceNo': isNaN(parseInt(search.invoiceNumber)) ? null : parseInt(search.invoiceNumber) }
                    ];
                }
            }

            if (search.customerName) {
                searchQuery['invoiceTo.name'] = new RegExp(search.customerName, 'i');
            }

            if (search.customerCity) {
                searchQuery['invoiceTo.city'] = new RegExp(search.customerCity, 'i');
            }

            Object.assign(baseQuery, searchQuery);
        }

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Get total count for pagination
        const totalCount = await InvoiceModel.countDocuments(baseQuery);

        // Get paginated invoices
        const invoices = await InvoiceModel.find(
            baseQuery,
            {
                'invoiceDetails.invoicePrefix': 1,
                'invoiceDetails.invoiceNo': 1,
                'invoiceDetails.invoiceDate': 1,
                'invoiceDetails.dueDate': 1,
                'invoiceFrom.name': 1,
                'invoiceFrom.city': 1,
                'invoiceTo.name': 1,
                'invoiceTo.city': 1,
                'additionalInfo.paymentStatus': 1,
                'additionalInfo.paymentMethod': 1,
                'invoiceSummary': 1
            }
        )
        .sort({ 'invoiceDetails.invoiceDate': -1 })
        .skip(skip)
        .limit(limit);

        const totalPages = Math.ceil(totalCount / limit);

        logger.debug(`Retrieved ${invoices.length} invoices (page ${page}/${totalPages})`);
        return {
            invoices,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: totalCount,
                itemsPerPage: limit
            }
        };

    } catch (error: unknown) {
        logger.error(`Error in getAllInvoicesInfo: ${error instanceof Error ? error.stack : error}`);
        throw error;
    }
};

const getLatestInvoices = async (userId: Id, businessId: Id) => {
    logger.debug(`Fetching latest 5 invoices for user: ${userId}`);
    
    try {
        const latestInvoices = await InvoiceModel.find(
            { 
                user: userId,
                business: businessId,
                // 'additionalInfo.paymentStatus': 'Paid' // Only fetch paid invoices
            },
            {
                'invoiceDetails.invoicePrefix': 1,
                'invoiceDetails.invoiceNo': 1,
                'invoiceDetails.invoiceDate': 1,
                'invoiceTo.name': 1,
                'additionalInfo.paymentMethod': 1,
                'additionalInfo.paymentStatus': 1,
                'invoiceSummary': 1
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
            paymentMethod: invoice.additionalInfo?.paymentMethod ?? '',
            paymentStatus: invoice.additionalInfo?.paymentStatus ?? '',
            invoiceAmount: invoice.invoiceSummary?.invoiceAmount ?? 0
        }));

        logger.debug(`Successfully retrieved ${formattedInvoices.length} latest invoices`);
        return formattedInvoices;

    } catch (error: unknown) {
        logger.error(`Error in getLatestInvoices: ${error instanceof Error ? error.stack : error}`);
        throw error;
    }
};

const getInvoiceView = async (invoiceId: Id) => {
    logger.debug(`Retrieving invoice view for invoice: ${invoiceId}`);
    
    try {
        const invoice = await InvoiceModel.findOne({ 
            _id: invoiceId,
        });

        if (!invoice) {
            throw new InvoiceNotFoundError(`Invoice with id ${invoiceId} not found`);
        }

        logger.debug(`Successfully retrieved invoice view: ${invoiceId}`);
        return invoice;

    } catch (error: unknown) {
        logger.error(`Error in getInvoiceView: ${error instanceof Error ? error.stack : error}`);
        throw error;
    }
};

export {
    createInvoice, deleteInvoice, getAllInvoicesInfo, getInvoiceDetails, getLatestInvoices, updateInvoice, getInvoiceView
};

