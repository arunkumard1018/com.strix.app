import { Request, Response } from "express";
import { customersSchema } from "../schemas/CustomersSchema";
import logger from "../lib/logConfig";
import { HttpStatusCode } from "../lib/status-codes";
import { ResponseEntity } from "../lib/ApiResponse";
import { CreateCustomers } from "../model/customers";
import { createCustomer, deleteCustomer, getAllCustomersForBusiness, getCustomer, updateCustomers } from "../service/customers";

const handleCreateCustomer = async (req: Request, res: Response) => {
    const userId: Id = req.authContext.userId;
    const { businessId }: Id = req.params;
    try {
        const { error } = customersSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.error(error.stack)
            res.status(HttpStatusCode.BAD_REQUEST)
                .json(ResponseEntity("error", "Validation Error", undefined, error.message.split('.')));
            return;
        }
        const customer: CreateCustomers = req.body;
        customer.business = businessId;
        customer.user = userId;
        const createdCustomer = await createCustomer(userId, customer);
        res.status(HttpStatusCode.CREATED).json(ResponseEntity("success", "Customer Created Successfully!", createdCustomer));
    } catch (error) {
        const message = (error as Error).message;
        logger.error(message)
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error while Creating Customer!", undefined, message));
    }
}

const handleUpdateCustomer = async (req: Request, res: Response) => {
    const userId: Id = req.authContext.userId;
    const { businessId, customersId }: Id = req.params;
    try {
        const { error } = customersSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.error(error.stack)
            res.status(HttpStatusCode.BAD_REQUEST)
                .json(ResponseEntity("error", "Validation Error", undefined, error.message.split('.')));
            return;
        }
        const customer: CreateCustomers = req.body;
        customer.business = businessId;
        customer.user = userId;
        const updatedCustomer = await updateCustomers(userId,customersId, customer);
        res.status(HttpStatusCode.CREATED).json(ResponseEntity("success", "Customer Updated Successfully!", updatedCustomer));
    } catch (error) {
        const message = (error as Error).message;
        logger.error(message)
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error while Updating Customer!", undefined, message));
    }
}

const handlegetCustomer = async (req: Request, res: Response) => {
    const { businessId, customersId }: Id = req.params;
    const userId: Id = req.authContext.userId;
    try {
        const customerInfo = await getCustomer(userId, customersId);
        if (!customerInfo) {
            res.status(HttpStatusCode.NOT_FOUND).json(ResponseEntity("error", "Customers Details Not Found"))
            return;
        }
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Customers Deails", customerInfo))
    } catch (error) {
        const message = (error as Error).message;
        logger.error(message)
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error While Fetching Cutsomers Details", undefined, message));
    }
}

const handlegetAllcustomers = async (req: Request, res: Response) => {
    const { businessId }: Id = req.params;
    const userId = req.authContext.userId;
    try {
        const customers = await getAllCustomersForBusiness(userId, businessId);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Customers Details", customers))
    } catch (error) {
        const message = (error as Error).message;
        logger.error(message);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("success", "Customers Details", undefined, message))
    }
}

const handleDeleteCustomer = async (req: Request, res: Response) => {
    const userId: Id = req.authContext.userId;
    const { businessId, customersId }: Id = req.params;
    try {
        const deletedCustomersRes = await deleteCustomer(userId, customersId, businessId);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Customer Deleted Successfully!", deletedCustomersRes));
    } catch (error) {
        const message = (error as Error).message;
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Unable to Delete Customer", undefined, message))
    }
}

export { handleCreateCustomer, handleUpdateCustomer, handlegetCustomer, handlegetAllcustomers, handleDeleteCustomer }