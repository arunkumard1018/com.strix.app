import express from "express";
import {
    handleCreateInvoiceConfig,
    handleDeleteInvoiceConfig,
    handleGetActiveInvoicePrefix,
    handleGetInvoiceConfigWithBusinessWithId,
    handleUpdateInvoiceConfig
} from "../controllers/invoiceConfigController";

const invoiceConfigRoute = express.Router({ mergeParams: true });

invoiceConfigRoute.route("/")
    .post(handleCreateInvoiceConfig)
    .get(handleGetInvoiceConfigWithBusinessWithId)
    .put(handleUpdateInvoiceConfig)
    .delete(handleDeleteInvoiceConfig);
invoiceConfigRoute.route("/active-prefix").get(handleGetActiveInvoicePrefix)
export { invoiceConfigRoute };

