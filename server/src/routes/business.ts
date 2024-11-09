import express from "express";
import { handleAddBusiness, handleDeleteBusiness, handleGetAllBusiness, handleGetBusinessWithId, handleUpdateBusiness, } from "../controllers/business-controller";

const businessRouter = express.Router();

businessRouter.route("/")
    .post(handleAddBusiness)
    .get(handleGetAllBusiness);

businessRouter.route("/:businessId")
    .get(handleGetBusinessWithId)
    .put(handleUpdateBusiness)
    .delete(handleDeleteBusiness);

export { businessRouter };