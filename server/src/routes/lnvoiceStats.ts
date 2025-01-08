import express from "express";
import { handleMonthlyInvoiceData, handleInvoiceStats, handleLatestInvoices, handleRevenueData } from "../controllers/invoiceController";
const invoiceStatsRoute = express.Router({ mergeParams: true });

invoiceStatsRoute.route("/invoices")
    .get(handleInvoiceStats);
invoiceStatsRoute.route("/revenue")
    .get(handleRevenueData);
invoiceStatsRoute.route("/latest/invoices")
    .get(handleLatestInvoices);
invoiceStatsRoute.route("/:year")
    .get(handleMonthlyInvoiceData);

export { invoiceStatsRoute };
