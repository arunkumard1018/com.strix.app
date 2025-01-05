import { Request, Response } from "express";
import { DuplicateInvoiceNumberError, InvoiceNotFoundError } from "../errors";
import { ResponseEntity } from "../lib/ApiResponse";
import logger from "../lib/logConfig";
import { HttpStatusCode } from "../lib/status-codes";
import { InvoiceSchema } from "../schemas/Invoices";
import { createInvoice, deleteInvoice, getAllInvoicesInfo, getInvoiceDetails, getInvoiceView, getLatestInvoices, updateInvoice, updatePaymentStatus } from "../services/invoiceService";
import { getInvoiceStats, getMonthlyInvoiceStats, getRevenueData } from "../services/InvoiceStatsService";

interface SearchFilters {
    invoiceNumber?: string;
    customerName?: string;
    customerCity?: string;
}

const handleCreateInvoices = async (req: Request, res: Response) => {
    const { businessId } = req.params;
    const userId = req.authContext.userId;

    try {
        // Validate request body
        const { error } = InvoiceSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.error(error.stack);
            res.status(HttpStatusCode.BAD_REQUEST)
                .json(ResponseEntity("error", "Validation Error", undefined, error.message.split('.')));
            return;
        }
        // Prepare invoice data
        const invoiceData = {
            ...req.body,
            user: userId,
            business: businessId
        };
        // Create invoice and handle invoice number logic in service
        const createdInvoice = await createInvoice(invoiceData, businessId);

        res.status(HttpStatusCode.CREATED)
            .json(ResponseEntity("success", "Invoice Created Successfully!", createdInvoice));

    } catch (error) {
        if (error instanceof DuplicateInvoiceNumberError) {
            logger.error('Duplicate invoice number error:', error.stack);
            res.status(HttpStatusCode.CONFLICT)
                .json(ResponseEntity("error", "Duplicate Invoice Number", undefined, error.message));
            return;
        }
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error('Error in handleCreateInvoices:', error instanceof Error ? error.stack : error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(ResponseEntity("error", "Error While Creating Invoice", undefined, message));
    }
};

const handleUpdateInvoices = async (req: Request, res: Response) => {
    const { businessId, invoiceId } = req.params;
    const userId = req.authContext.userId;

    try {
        const { error } = InvoiceSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.error(error.stack);
            res.status(HttpStatusCode.BAD_REQUEST)
                .json(ResponseEntity("error", "Validation Error", undefined, error.message.split('.')));
            return;
        }

        const invoiceData = {
            ...req.body,
            user: userId,
            business: businessId
        };

        const updatedInvoice = await updateInvoice(invoiceData, invoiceId, userId);
        res.status(HttpStatusCode.OK)
            .json(ResponseEntity("success", "Invoice Updated Successfully!", updatedInvoice));

    } catch (error) {
        if (error instanceof DuplicateInvoiceNumberError) {
            logger.error('Duplicate invoice number error:', error.stack);
            res.status(HttpStatusCode.CONFLICT)
                .json(ResponseEntity("error", "Duplicate Invoice Number", undefined, error.message));
            return;
        }
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error('Error in handleUpdateInvoices:', error instanceof Error ? error.stack : error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(ResponseEntity("error", "Error While Updating Invoice", undefined, message));
    }
};

const handleDeleteInvoices = async (req: Request, res: Response) => {
    const { invoiceId, businessId } = req.params;
    const userId = req.authContext.userId;
    try {
        const deletedInvoice = await deleteInvoice(invoiceId, userId, businessId);
        if (!deletedInvoice.invoiceDetails?.invoicePrefix || !deletedInvoice.invoiceDetails?.invoiceNo) {
            throw new Error("Invalid invoice: missing invoice details");
        }
        const responseData = {
            invoiceId: deletedInvoice._id,
            invoiceNumber: `${deletedInvoice.invoiceDetails.invoicePrefix}${deletedInvoice.invoiceDetails.invoiceNo}`
        };
        res.status(HttpStatusCode.OK)
            .json(ResponseEntity("success", "Invoice Deleted Successfully!", responseData));

    } catch (error) {
        if (error instanceof InvoiceNotFoundError) {
            logger.error('Invoice not found:', error.stack);
            res.status(HttpStatusCode.NOT_FOUND)
                .json(ResponseEntity("error", "Invoice Not Found", undefined, error.message));
            return;
        }

        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error('Error in handleDeleteInvoices:', error instanceof Error ? error.stack : error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(ResponseEntity("error", "Error While Deleting Invoice", undefined, message));
    }
};

const handleGetInvoices = async (req: Request, res: Response) => {
    const { businessId, invoiceId } = req.params;
    const userId = req.authContext.userId;

    try {
        const invoice = await getInvoiceDetails(invoiceId, userId, businessId);
        res.status(HttpStatusCode.OK)
            .json(ResponseEntity("success", "Invoice Details Retrieved Successfully!", invoice));

    } catch (error) {
        if (error instanceof InvoiceNotFoundError) {
            logger.error('Invoice not found:', error.stack);
            res.status(HttpStatusCode.NOT_FOUND)
                .json(ResponseEntity("error", "Invoice Not Found", undefined, error.message));
            return;
        }

        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error('Error in handleGetInvoices:', error instanceof Error ? error.stack : error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(ResponseEntity("error", "Error While Retrieving Invoice", undefined, message));
    }
};

const handleGetAllInvoices = async (req: Request, res: Response) => {
    const { businessId } = req.params;
    const userId = req.authContext.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Extract search parameters
    const search: SearchFilters = {};
    if (req.query.invoiceNumber) search.invoiceNumber = req.query.invoiceNumber as string;
    if (req.query.customerName) search.customerName = req.query.customerName as string;
    if (req.query.customerCity) search.customerCity = req.query.customerCity as string;

    try {
        const result = await getAllInvoicesInfo(
            businessId,
            userId,
            page,
            limit,
            Object.keys(search).length > 0 ? search : undefined
        );

        res.status(HttpStatusCode.OK)
            .json(ResponseEntity("success", "Invoices Retrieved Successfully!", result));

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error('Error in handleGetAllInvoices:', error instanceof Error ? error.stack : error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(ResponseEntity("error", "Error While Retrieving Invoices", undefined, message));
    }
};

const handleLatestInvoices = async (req: Request, res: Response) => {
    const { businessId } = req.params;
    const userId = req.authContext.userId;

    try {
        const latestInvoices = await getLatestInvoices(userId, businessId);
        res.status(HttpStatusCode.OK)
            .json(ResponseEntity("success", "Latest Paid Invoices Retrieved Successfully!", latestInvoices));

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error('Error in handleLatestInvoices:', error instanceof Error ? error.stack : error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(ResponseEntity("error", "Error While Retrieving Latest Invoices", undefined, message));
    }
};

const handleMonthlyInvoiceData = async (req: Request, res: Response) => {
    const { businessId, year } = req.params;
    const userId = req.authContext.userId;
    logger.info(`Accessing Business stats for ${businessId} by user ${req.authContext.userEmail}`);
    try {
        const invoiceData = await getMonthlyInvoiceStats(businessId, userId, Number(year));
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Invoice Data!", invoiceData));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error('Error in handleInvoiceData:', error instanceof Error ? error.stack : error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error while fetching Invoice Statistics!", undefined, message));
    }
}

const handleInvoiceStats = async (req: Request, res: Response) => {
    const { businessId } = req.params;
    const userId = req.authContext.userId;
    logger.info(`Accessing invoice stats for ${businessId} by user ${req.authContext.userEmail}`);

    try {
        const stats = await getInvoiceStats(businessId, userId);
        res.status(HttpStatusCode.OK)
            .json(ResponseEntity("success", "Invoice Statistics Retrieved Successfully!", stats));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error('Error in handleInvoiceStats:', error instanceof Error ? error.stack : error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(ResponseEntity("error", "Error While Retrieving Invoice Statistics", undefined, message));
    }
};

const handleRevenueData = async (req: Request, res: Response) => {
    const { businessId } = req.params;
    const userId = req.authContext.userId;
    logger.info(`Accessing revenue data for ${businessId} by user ${req.authContext.userEmail}`);
    try {
        const revenueData = await getRevenueData(businessId, userId);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Revenue Data!", revenueData));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error('Error in handleRevenueData:', error instanceof Error ? error.stack : error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error While Retrieving Revenue Data", undefined, message));
    }
}

const handleGetInvoiceView = async (req: Request, res: Response) => {
    const { invoiceId } = req.params;

    try {
        const invoice = await getInvoiceView(invoiceId);
        res.status(HttpStatusCode.OK)
            .json(ResponseEntity("success", "Invoice Retrieved Successfully!", invoice));

    } catch (error) {
        if (error instanceof InvoiceNotFoundError) {
            logger.error('Invoice not found:', error.stack);
            res.status(HttpStatusCode.NOT_FOUND)
                .json(ResponseEntity("error", "Invoice Not Found", undefined, error.message));
            return;
        }
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error('Error in handleGetInvoiceView:', error instanceof Error ? error.stack : error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(ResponseEntity("error", "Error While Retrieving Invoice", undefined, message));
    }
};

const handleUpdatePaymentStatus = async (req: Request, res: Response) => {
    const { businessId, invoiceId } = req.params;
    const { paymentStatus } = req.body;
    const userId = req.authContext.userId;
    try {
        const updatedInvoice = await updatePaymentStatus(businessId, invoiceId, paymentStatus, userId);
        if (!updatedInvoice) {
            throw new Error("Invoice not found");
        }
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Payment Status Updated Successfully!", updatedInvoice.additionalInfo?.paymentStatus));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error('Error in handleUpdatePaymentStatus:', error instanceof Error ? error.stack : error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error While Updating Payment Status", undefined, message));
    }
}

export {
    handleCreateInvoices,
    handleDeleteInvoices,
    handleGetAllInvoices,
    handleGetInvoices,
    handleGetInvoiceView,
    handleInvoiceStats,
    handleLatestInvoices,
    handleMonthlyInvoiceData,
    handleUpdateInvoices,
    handleUpdatePaymentStatus,
    handleRevenueData,
};

