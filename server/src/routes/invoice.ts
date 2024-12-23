import express from "express";
import { handleCreateInvoices, handleDeleteInvoices, handleGetAllInvoices, handleGetInvoices, handleUpdateInvoices } from "../controllers/invoiceController";

const invoiceRoute = express.Router({ mergeParams: true });

invoiceRoute.route("/")
    .get(handleGetAllInvoices)
    .post(handleCreateInvoices);

invoiceRoute.route("/:invoiceId")
    .put(handleUpdateInvoices)
    .get(handleGetInvoices)
    .delete(handleDeleteInvoices);

export { invoiceRoute };

