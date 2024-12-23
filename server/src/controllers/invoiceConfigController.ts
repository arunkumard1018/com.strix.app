import { Request, Response } from "express";
import { HttpStatusCode } from "../lib/status-codes";
import { ResponseEntity } from "../lib/ApiResponse";
import logger from "../lib/logConfig";
import invoiceConfigJoiSchema from "../schemas/InvoiceConfigSchema";
import { CreateInvoiceConfig, InvoiceConfig } from "../model/InvoiceConfig";
import { createInvoiceConfig, deleteInvoiceConfig, getInvoiceConfig, updateInvoiceConfig } from "../services/invoiceConfigService";

const handleCreateInvoiceConfig = async (req: Request, res: Response) => {
    const userId: Id = req.authContext.userId;
    const { businessId }: Id = req.params;
    try {
        const { error } = invoiceConfigJoiSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.error(error.stack)
            res.status(HttpStatusCode.BAD_REQUEST)
                .json(ResponseEntity("error", "Validation Error", undefined, error.message.split('.')));
            return;
        }
        const config: CreateInvoiceConfig = req.body;
        config.business = businessId;
        config.user = userId;
        const createdCustomer = await createInvoiceConfig(config);
        res.status(HttpStatusCode.CREATED).json(ResponseEntity("success", "Invoice Config Created Successfully!", createdCustomer));
    } catch (error) {
        const message = (error as Error).message;
        logger.error(message);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error while Creating InvoiceConfig!", undefined, message));
    }
}

const handleGetInvoiceConfigWithBusinessWithId = async (req: Request, res: Response) => {
    try {
        const userId: Id = req.authContext.userId;
        const { businessId } = req.params;
        const config: InvoiceConfig | any = await getInvoiceConfig(businessId, userId);
        if (!config) {
            res.status(HttpStatusCode.NOT_FOUND).json(ResponseEntity("error", "Resource Not Found", undefined, `Business with id ${businessId} not found.`));
            return;
        }
        // Convert Mongoose document to plain JavaScript object
        const configObj = config.toObject ? config.toObject() : config;
        // Delete the `owner` field from the object
        delete configObj.user;
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Invoice Config Details", configObj))
    } catch (error) {
        logger.error(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", (error as Error).name, undefined, (error as Error).message))
    }
}

const handleUpdateInvoiceConfig = async (req: Request, res: Response) => {
    const userId: Id = req.authContext.userId;
    const { businessId }: Id = req.params;
    try {
        const { error } = invoiceConfigJoiSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.error(error.stack)
            res.status(HttpStatusCode.BAD_REQUEST)
                .json(ResponseEntity("error", "Validation Error", undefined, error.message.split('.')));
            return;
        }
        const config: CreateInvoiceConfig = req.body;
        config.business = businessId;
        config.user = userId;
        const createdCustomer = await updateInvoiceConfig(config);
        res.status(HttpStatusCode.CREATED).json(ResponseEntity("success", "Invoice Config Updated Successfully!", createdCustomer));
    } catch (error) {
        const message = (error as Error).message;
        logger.error(message);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error while updating InvoiceConfig!", undefined, message));
    }
}

const handleDeleteInvoiceConfig = async (req: Request, res: Response) => {
    try {
        const userId: Id = req.authContext.userId;
        const { businessId } = req.params;
        const config = await deleteInvoiceConfig(businessId, userId);
        if (config.deletedCount === 0 ) {
            res.status(HttpStatusCode.NOT_FOUND).json(ResponseEntity("error", "Error While Deleting", undefined, `Resource Not Found`));
            return;
        }
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Invoice Config Details", config))
    } catch (error) {
        logger.error(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", (error as Error).name, undefined, (error as Error).message))
    }
}

export {
    handleCreateInvoiceConfig,
    handleGetInvoiceConfigWithBusinessWithId,
    handleUpdateInvoiceConfig,
    handleDeleteInvoiceConfig,
}