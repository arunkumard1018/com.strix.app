import mongoose from "mongoose";
import logger from "../lib/logConfig";
import { InvoiceModel } from "../model/Invoice";
import { Invoice } from "../types/invoice";

const createInvoice = async (invoiceSchema: Invoice, businessId: Id) => {
    const invoiceModel = new InvoiceModel({ ...invoiceSchema });
    await invoiceModel.save();
    return invoiceModel;
}

const updateInvoice = async (invoiceSchema: Invoice, InvoiceId: Id, usersId: Id) => {
    const updatedInvoice = await InvoiceModel.findOneAndUpdate({ _id: InvoiceId, user: usersId },
        { ...invoiceSchema },
        { new: true, runValidators: true });
    return updatedInvoice;
}

const deleteInvoice = async (InvoiceId: Id, usersId: Id) => {
    const deletedInvoice = await InvoiceModel.findOneAndDelete({ _id: InvoiceId, user: usersId });
    return deletedInvoice;
}

const getAllInvoicesForBusiness = async (businessId: Id, usersId: Id) => {
    const invoiceDetails = await InvoiceModel.find({ business: businessId, user: usersId },
        { _id: 1, invoiceNo: 1, invoiceDate: 1, paymentMethod: 1, paymentStatus: 1, invoiceAmount: 1 })
        .populate("invoiceTo", "name address.city").lean();
    return invoiceDetails.map(invoice => {
        return {
            ...invoice,
            invoiceTo: {
                name: invoice.invoiceTo?.name,
                address: {
                    city: invoice.invoiceTo?.address?.city
                }
            }
        };
    });
}

const getInvoiceDetails = async (businessId: Id, InvoiceId: Id, usersId: Id) => {
    const invoice = await InvoiceModel.findOne({ _id: InvoiceId, user: usersId, business: businessId });
    return invoice;
}

/**
 * Fetch the latest 5 invoices.
 * @returns A promise that resolves to an array of the latest 5 invoices.
 */
const getLatestInvoices = async (userId: string) => {
    // Query to fetch the latest 5 invoices sorted by creation time
    const latestInvoices = await InvoiceModel.find({ user: userId },
        { _id: 1, invoiceNo: 1, invoiceDate: 1, paymentMethod: 1, paymentStatus: 1, invoiceAmount: 1 })
        .populate("invoiceTo", "name address.city").lean()
        .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
        .limit(5); // Limit the results to 5 documents
    return latestInvoices;
};

const getInvoiceStatsByBusinessAndUserId = async (businessId: Id, userId: Id) => {
    try {
        // Validate userId and businessId
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(businessId)) {
            throw new Error("Invalid userId or businessId");
        }

        const stats = await InvoiceModel.aggregate([
            {
                $match: {
                    business: mongoose.Types.ObjectId.createFromHexString(businessId),
                    user: mongoose.Types.ObjectId.createFromHexString(userId),
                },
            },
            {
                $group: {
                    _id: null, // No grouping by specific field; we want totals for all invoices in this business and user
                    totalInvoices: { $sum: 1 }, // Total count of invoices
                    totalPaid: {
                        $sum: { $cond: [{ $eq: ["$paymentStatus", "PAID"] }, 1, 0] },
                    },
                    totalProcessing: {
                        $sum: { $cond: [{ $eq: ["$paymentStatus", "PROCESSING"] }, 1, 0] },
                    },
                    totalDue: {
                        $sum: { $cond: [{ $eq: ["$paymentStatus", "DUE"] }, 1, 0] },
                    },
                    totalPaidAmount: {
                        $sum: {
                            $cond: [{ $eq: ["$paymentStatus", "PAID"] }, "$invoiceAmount", 0],
                        },
                    },
                    totalProcessingAmount: {
                        $sum: {
                            $cond: [{ $eq: ["$paymentStatus", "PROCESSING"] }, "$invoiceAmount", 0],
                        },
                    },
                    totalDueAmount: {
                        $sum: {
                            $cond: [{ $eq: ["$paymentStatus", "DUE"] }, "$invoiceAmount", 0],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0, // Exclude `_id` from the output
                },
            },
        ]);
        return stats[0] || {
            totalInvoices: 0,
            totalPaid: 0,
            totalProcessing: 0,
            totalDue: 0,
            totalPaidAmount: 0,
            totalProcessingAmount: 0,
            totalDueAmount: 0,
        }; // Return a default structure if no data is found
    } catch (error) {
        logger.error("Error fetching invoice stats:", error);
        throw error;
    }
};


async function getInvoiceData(year: number, userId: string, businessId: string) {
    try {
        // Validate userId and businessId
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(businessId)) {
            throw new Error("Invalid userId or businessId");
        }

        const result = await InvoiceModel.aggregate([
            // Match invoices for the specific year, user, and business
            {
                $match: {
                    user: mongoose.Types.ObjectId.createFromHexString(userId),
                    business: mongoose.Types.ObjectId.createFromHexString(businessId),
                    invoiceDate: {
                        $gte: new Date(`${year}-01-01`),
                        $lt: new Date(`${year + 1}-01-01`),
                    },
                },
            },
            // Add a "month" field
            {
                $addFields: {
                    month: { $month: "$invoiceDate" }, // Extract the month from invoiceDate
                },
            },
            // Group by month
            {
                $group: {
                    _id: "$month",
                    invoices: { $sum: 1 }, // Total invoices in the month
                    PAID: { $sum: { $cond: [{ $eq: ["$paymentStatus", "PAID"] }, 1, 0] } }, // Count "PAID" invoices
                    revenue: { $sum: "$invoiceAmount" }, // Sum of invoice amounts
                },
            },
            // Sort by month
            {
                $sort: { _id: 1 },
            },
        ]);

        // Transform the result into the desired format
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const data = result.map((item) => ({
            month: months[item._id - 1], // Convert month number to name
            invoices: item.invoices,
            PAID: item.PAID,
            revenue: item.revenue,
        }));

        // Calculate total revenue
        const totalRevenue = data.reduce((acc, item) => acc + item.revenue, 0);

        return { data, totalRevenue };
    } catch (error) {
        logger.error("Error fetching authorized user invoice data:", error);
        throw error;
    }
}

export {
    createInvoice,
    deleteInvoice,
    getAllInvoicesForBusiness,
    getInvoiceDetails,
    updateInvoice,
    getLatestInvoices,
    getInvoiceStatsByBusinessAndUserId,
    getInvoiceData,
};
