import express from "express";
import { handleCreateInvoiceConfig, handleGetInvoiceConfigWithBusinessWithId } from "../controllers/invoiceConfigController";

const invoiceConfigRoute = express.Router({ mergeParams: true });

invoiceConfigRoute.route("/")
    .get(handleCreateInvoiceConfig)
    .post(handleGetInvoiceConfigWithBusinessWithId);

// invoiceRoute.route("/:invoiceId")
//     .put(handleUpdateInvoices)
//     .get(handleGetInvoices)
//     .delete(handleDeleteInvoices);

export { invoiceConfigRoute };
