import express from "express";
import { handleInvoiceStats, handleLatestInvoices } from "../controllers/invoice-controller";
const latestDataRoute = express.Router({mergeParams:true});

latestDataRoute.route("/invoices")
    .get(handleLatestInvoices);
latestDataRoute.route("/stats/business/:businessId")
    .get(handleInvoiceStats);

export { latestDataRoute }