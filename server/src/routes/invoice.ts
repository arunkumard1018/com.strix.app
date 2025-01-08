import express from "express";
import { handleCreateInvoices, handleDeleteInvoices, handleGetAllInvoices, handleGetInvoices, handleGetInvoiceView, handleUpdateInvoices, handleUpdatePaymentStatus } from "../controllers/invoiceController";

const invoiceRoute = express.Router({ mergeParams: true });

invoiceRoute.route("/")
    .get(handleGetAllInvoices)
    .post(handleCreateInvoices);

invoiceRoute.route("/:invoiceId")
    .put(handleUpdateInvoices)
    .get(handleGetInvoices)
    .delete(handleDeleteInvoices);

invoiceRoute.route("/:invoiceId/payment-status")
    .patch(handleUpdatePaymentStatus);

const invoiceViewRoute = express.Router({ mergeParams: true });
invoiceViewRoute.route("/:invoiceId")
    .get(handleGetInvoiceView);

export { invoiceRoute, invoiceViewRoute };

