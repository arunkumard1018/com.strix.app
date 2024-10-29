import express from "express";
import { handleAddBusiness, handleGetAllBusiness, handleGetBusinessWithId, } from "../controllers/business-controller";

const businessRouter = express.Router();

businessRouter.route("/")
    .post(handleAddBusiness)
    .get(handleGetAllBusiness);

businessRouter.route("/:businessId")
    .get(handleGetBusinessWithId)

export { businessRouter };