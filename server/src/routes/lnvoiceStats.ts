import express from "express";
import { handleInvoiceData, handleInvoiceStats, handleLatestInvoices } from "../controllers/invoiceController";
const invoiceStatsRoute = express.Router({ mergeParams: true });

invoiceStatsRoute.route("/invoices")
    .get(handleInvoiceStats);
invoiceStatsRoute.route("/latest/invoices")
    .get(handleLatestInvoices);
invoiceStatsRoute.route("/:year")
    .get(handleInvoiceData);

export { invoiceStatsRoute };
