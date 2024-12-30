// ... existing code ...

import mongoose from "mongoose";
import logger from "../lib/logConfig";
import { InvoiceModel } from "../model/Invoice";

const getYearlyInvoiceStats = async (businessId: Id, userId: Id, year: number) => {
    logger.debug(`Fetching yearly invoice stats for business: ${businessId}, user: ${userId}, year: ${year}`);
    try {
        const startDate = new Date(year, 0, 1); // January 1st of the year
        const endDate = new Date(year, 11, 31); // December 31st of the year

        const count = await InvoiceModel.countDocuments({
            user: mongoose.Types.ObjectId.createFromHexString(userId),
            business: mongoose.Types.ObjectId.createFromHexString(businessId),
        });
        logger.debug(`Found ${count} documents for business: ${businessId}, user: ${userId}`);

        const result = await InvoiceModel.aggregate([
            {
                $match: {
                    user: mongoose.Types.ObjectId.createFromHexString(userId),
                    business: mongoose.Types.ObjectId.createFromHexString(businessId),
                    'invoiceDetails.invoiceDate': {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$invoiceDetails.invoiceDate' },
                    invoices: { $sum: 1 },
                    PAID: {
                        $sum: {
                            $cond: [
                                { $eq: ['$additionalInfo.paymentStatus', 'Paid'] },
                                1,
                                0
                            ]
                        }
                    },
                    DUE: {
                        $sum: {
                            $cond: [
                                { $eq: ['$additionalInfo.paymentStatus', 'Due'] },
                                1,
                                0
                            ]
                        }
                    },
                    PROCESSING: {
                        $sum: {
                            $cond: [
                                { $eq: ['$additionalInfo.paymentStatus', 'Processing'] },
                                1,
                                0
                            ]
                        }
                    },
                    invoicedAmount: { $sum: '$invoiceSummary.invoiceAmount' },
                    paidAmount: {
                        $sum: {
                            $cond: [
                                { $eq: ['$additionalInfo.paymentStatus', 'Paid'] },
                                '$invoiceSummary.invoiceAmount',
                                0
                            ]
                        }
                    }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        logger.debug(`Result: ${result}`);
        // Array of all months
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Create data for all months, even those with no invoices
        const data = months.map((month, index) => {
            const monthData = result.find(item => item._id === index + 1);
            return {
                month,
                invoices: monthData?.invoices || 0,
                PAID: monthData?.PAID || 0,
                DUE: monthData?.DUE || 0,
                PROCESSING: monthData?.PROCESSING || 0,
                invoicedAmount: monthData?.invoicedAmount || 0,
                paidAmount: monthData?.paidAmount || 0,
                outstandingAmount: (monthData?.invoicedAmount || 0) - (monthData?.paidAmount || 0)
            };
        });

        // Calculate totals
        const invoicedAmount = data.reduce((acc, item) => acc + item.invoicedAmount, 0);
        const paidAmount = data.reduce((acc, item) => acc + item.paidAmount, 0);
        const outstandingAmount = invoicedAmount - paidAmount;

        logger.debug(`Successfully retrieved yearly stats with invoiced amount: ${invoicedAmount}, paid amount: ${paidAmount}`);
        return { 
            data, 
            invoicedAmount,
            paidAmount,
            outstandingAmount
        };

    } catch (error: unknown) {
        logger.error(`Error in getYearlyInvoiceStats: ${error instanceof Error ? error.stack : error}`);
        throw error;
    }
};

const getInvoiceStats = async (businessId: Id, userId: Id) => {
    logger.debug(`Getting invoice stats for business: ${businessId} and user: ${userId}`);

    try {
        const stats = await InvoiceModel.aggregate([
            {
                $match: {
                    business: new mongoose.Types.ObjectId(businessId),
                    user: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $group: {
                    _id: null,
                    totalInvoices: { $sum: 1 },
                    paidInvoices: {
                        $sum: {
                            $cond: [{ $eq: ['$additionalInfo.paymentStatus', 'Paid'] }, 1, 0]
                        }
                    },
                    processingInvoices: {
                        $sum: {
                            $cond: [{ $eq: ['$additionalInfo.paymentStatus', 'Processing'] }, 1, 0]
                        }
                    },
                    dueInvoices: {
                        $sum: {
                            $cond: [{ $eq: ['$additionalInfo.paymentStatus', 'Due'] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        const defaultStats = {
            totalInvoices: 0,
            paidInvoices: 0,
            processingInvoices: 0,
            dueInvoices: 0
        };

        const invoiceStats = stats.length > 0 ? stats[0] : defaultStats;
        delete invoiceStats?._id;

        logger.debug(`Successfully retrieved invoice stats: ${JSON.stringify(invoiceStats)}`);
        return invoiceStats;

    } catch (error: unknown) {
        logger.error(`Error in getInvoiceStats: ${error instanceof Error ? error.stack : error}`);
        throw error;
    }
};


// Update the exports section
export {
    getYearlyInvoiceStats,
    getInvoiceStats,
};