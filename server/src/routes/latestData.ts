import express from "express";
import { handleInvoiceData, handleInvoiceStats, handleLatestInvoices } from "../controllers/invoiceController";
const latestDataRoute = express.Router({mergeParams:true});

latestDataRoute.route("/invoices")
    .get(handleLatestInvoices);
latestDataRoute.route("/stats/business/:businessId")
    .get(handleInvoiceStats);
latestDataRoute.route("/stats/:year/business/:businessId")
    .get(handleInvoiceData);

export { latestDataRoute }