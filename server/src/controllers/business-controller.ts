import { Request, Response } from "express";
import mongoose from "mongoose";
import { ResponseEntity } from "../lib/ApiResponse";
import logger from "../lib/logConfig";
import { HttpStatusCode } from "../lib/status-codes";
import { Business, CreateBusiness } from "../model/business";
import { businessSchema } from "../schemas/businessShema";
import { createBusiness, deleteBusinessWithID, getAllBusinessForUser, getBusinessWithId, updateBusiness, } from "../service/business";

const handleAddBusiness = async (req: Request, res: Response) => {
    const userId = req.authContext.userId;
    try {
        const { error } = businessSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.error(error.stack)
            res.status(HttpStatusCode.BAD_REQUEST)
                .json(ResponseEntity("error", "Validation Error", undefined, error.message.split('.')));
            return;
        }
        const business: CreateBusiness = req.body;
        business.owner = userId;
        const createdBusiness = await createBusiness(business);
        res.status(HttpStatusCode.CREATED).json(ResponseEntity("success", "Business Created", createdBusiness))
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(ResponseEntity("error", "Error While Creating Business", undefined, (error as Error).message));
    }
}

const handleUpdateBusiness = async (req: Request, res: Response) => {
    const userId = req.authContext.userId;
    const { businessId }: Id = req.params;
    try {
        const { error } = businessSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.error(error.stack)
            res.status(HttpStatusCode.BAD_REQUEST)
                .json(ResponseEntity("error", "Validation Error", undefined, error.message.split('.')));
            return;
        }
        const business: CreateBusiness = req.body;
        business.owner = userId;
        const updatedBusiness = await updateBusiness(businessId, business);
        res.status(HttpStatusCode.CREATED).json(ResponseEntity("success", "Business Updated", updatedBusiness))
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(ResponseEntity("error", "Error While Creating Business", undefined, (error as Error).message));
    }
}

const handleGetAllBusiness = async (req: Request, res: Response) => {
    const userId = req.authContext.userId;
    try {
        const business = await getAllBusinessForUser(userId);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "All business", business));
    } catch (error) {
        console.error(error)
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Error While Fetching Buisiness", undefined, (error as Error).message));
    }

}

const handleGetBusinessWithId = async (req: Request, res: Response) => {
    try {
        const userId: mongoose.Types.ObjectId = req.authContext.userId;
        const { businessId } = req.params;
        const business: Business | any = await getBusinessWithId(businessId, userId);
        if (!business) {
            res.status(HttpStatusCode.NOT_FOUND).json(ResponseEntity("error", "Resource Not Found", undefined, `Business with id ${businessId} not found.`));
            return;
        }
        // Convert Mongoose document to plain JavaScript object
        const businessObj = business.toObject ? business.toObject() : business;

        // Delete the `owner` field from the object
        delete businessObj.owner;

        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Business Details", businessObj))
    } catch (error) {
        logger.error(error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("success", (error as Error).name, undefined, (error as Error).message))
    }
}

const handleDeleteBusiness = async (req: Request, res: Response) => {
    const { businessId }: Id = req.params;
    const userId: Id = req.authContext.userId;
    try {
        const response = await deleteBusinessWithID(businessId, userId);
        if(response.deletedCount === 0) {
            res.status(HttpStatusCode.NOT_FOUND).json(ResponseEntity("error", "Business Not Found", undefined,`Unable to Delete business with id ${businessId}`));
            return;
        }
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Business Deleted", response))
    } catch (error) {
        const message = (error as Error).message;
        logger.error(message);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Error While Deleting Business", undefined, message))
    }
}
export { handleAddBusiness, handleDeleteBusiness, handleGetAllBusiness, handleGetBusinessWithId, handleUpdateBusiness };

