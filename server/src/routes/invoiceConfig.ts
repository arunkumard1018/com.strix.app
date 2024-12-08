import express from "express";
import { handleCreateInvoiceConfig, handleDeleteInvoiceConfig, handleGetInvoiceConfigWithBusinessWithId, handleUpdateInvoiceConfig } from "../controllers/invoiceConfigController";

const invoiceConfigRoute = express.Router({ mergeParams: true });

invoiceConfigRoute.route("/")
    .post(handleCreateInvoiceConfig)
    .get(handleGetInvoiceConfigWithBusinessWithId)
    .put(handleUpdateInvoiceConfig)
    .delete(handleDeleteInvoiceConfig);

export { invoiceConfigRoute };
