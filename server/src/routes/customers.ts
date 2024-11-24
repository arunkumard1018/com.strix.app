import express from "express"
import { handleCreateCustomer, handleDeleteCustomer, handlegetAllcustomers, handlegetCustomer, handleUpdateCustomer } from "../controllers/customersController";

const customersRouter = express.Router({ mergeParams: true });

customersRouter.route("/")
    .get(handlegetAllcustomers)
    .post(handleCreateCustomer);
    
customersRouter.route("/:customersId")
    .get(handlegetCustomer)
    .put(handleUpdateCustomer)
    .delete(handleDeleteCustomer);


export { customersRouter }