import { Request, Response } from "express";
import { ResponseEntity } from "../lib/ApiResponse";
import logger from "../lib/logConfig";
import { HttpStatusCode } from "../lib/status-codes";
import { invoiceSchema } from "../schemas/Invoices";
import { Invoice } from "../types/invoice";
import {
    createInvoice,
    deleteInvoice,
    getAllInvoicesForBusiness,
    getInvoiceData,
    getInvoiceDetails,
    getInvoiceStatsByBusinessAndUserId,
    getLatestInvoices,
    updateInvoice
} from "../service/invoices";

const handleCreateInvoices = async (req: Request, res: Response) => {
    const { businessId }: Id = req.params;
    const userId: Id = req.authContext.userId;
    try {
        const { error } = invoiceSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.error(error.stack)
            res.status(HttpStatusCode.BAD_REQUEST)
                .json(ResponseEntity("error", "Validation Error", undefined, error.message.split('.')));
            return;
        }
        const invoiceData: Invoice = req.body;
        invoiceData.user = userId;
        invoiceData.business = businessId;
        const createdInvoice = await createInvoice(invoiceData, businessId);
        res.status(HttpStatusCode.CREATED).json(ResponseEntity("success", "Invoices Created Successfully!", createdInvoice))
    } catch (error) {
        const message = (error as Error).message;
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error While Creating Invoices!", undefined, message));
    }
}

const handleUpdateInvoices = async (req: Request, res: Response) => {
    const { businessId, invoiceId }: Id = req.params;
    const userId: Id = req.authContext.userId;
    try {
        const { error } = invoiceSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.error(error.stack)
            res.status(HttpStatusCode.BAD_REQUEST)
                .json(ResponseEntity("error", "Validation Error", undefined, error.message.split('.')));
            return;
        }
        const invoiceData: Invoice = req.body;
        invoiceData.user = userId;
        invoiceData.business = businessId;
        const updatedInvoice = await updateInvoice(invoiceData, invoiceId, userId);
        res.status(HttpStatusCode.ACCEPTED).json(ResponseEntity("success", "Invoices Updated Successfully!", updatedInvoice))
    } catch (error) {
        const message = (error as Error).message;
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error While Updating Invoices!", undefined, message));
    }
}

const handleGetInvoices = async (req: Request, res: Response) => {
    const { businessId, invoiceId }: Id = req.params;
    const userId: Id = req.authContext.userId;
    try {
        const invoice = await getInvoiceDetails(businessId, invoiceId, userId);
        if (!invoice) {
            res.status(HttpStatusCode.NOT_FOUND).json(ResponseEntity("error", "Invoice Details not found!", undefined, `Invoice with id ${invoiceId} Not found`));
        }
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Invoice Details!", invoice))
    } catch (error) {
        const message = (error as Error).message;
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error While Fetching Invoices!", undefined, message));
    }
}

const handleGetAllInvoices = async (req: Request, res: Response) => {
    const { businessId }: Id = req.params;
    const userId: Id = req.authContext.userId;
    try {
        const invoices = await getAllInvoicesForBusiness(businessId, userId);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Invoices Details!", invoices))
    } catch (error) {
        const message = (error as Error).message;
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error While Fetching Invoices Details!", undefined, message));
    }
}

const handleDeleteInvoices = async (req: Request, res: Response) => {
    const { businessId, invoiceId }: Id = req.params;
    const userId: Id = req.authContext.userId;
    try {
        const deletedInvoice = await deleteInvoice(invoiceId, userId);
        if (!deletedInvoice) {
            res.status(HttpStatusCode.NOT_FOUND).json(ResponseEntity("error", "Error While Deleting Invoice!", undefined, `Invoice with ${invoiceId} not found!`))
        }
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Invoices Deleted Successfully!", deleteInvoice))
    } catch (error) {
        const message = (error as Error).message;
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error While Deleting Invoices!", undefined, message));
    }
}

const handleLatestInvoices = async (req: Request, res: Response) => {
    const userId = req.authContext.userId;
    try {
        const latestInvoices = await getLatestInvoices(userId);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Latest Five Invoices!", latestInvoices));
    } catch (error) {
        const message = (error as Error).message;
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error While Fetching Latest Invoices!", undefined, message));
    }
}

const handleInvoiceStats = async (req: Request, res: Response) => {
    const { businessId }: Id = req.params;
    const userId: Id = req.authContext.userId;
    logger.info(`Accessing Business stats for ${businessId} by user ${req.authContext.userEmail}`)
    try {
        const stats = await getInvoiceStatsByBusinessAndUserId(businessId, userId);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Business Statistics!", stats));
    } catch (error) {
        const message = (error as Error).message;
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error while fetching Business Statistics!", undefined, message));
    }
}
const handleInvoiceData = async (req: Request, res: Response) => {
    const {year, businessId}: Id = req.params;
    const userId: Id = req.authContext.userId;
    logger.info(`Accessing Business stats for ${businessId} by user ${req.authContext.userEmail}`)
    try {
        const invoiceData = await getInvoiceData(Number(year), userId, businessId);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Invoice Data!", invoiceData));
    } catch (error) {
        const message = (error as Error).message;
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error while fetching Invoice Statistics!", undefined, message));
    }
}

export {
    handleCreateInvoices,
    handleDeleteInvoices,
    handleGetAllInvoices,
    handleGetInvoices,
    handleUpdateInvoices,
    handleLatestInvoices,
    handleInvoiceStats,
    handleInvoiceData,
};
