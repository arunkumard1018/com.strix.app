import { CreateCustomers, CustomersModel } from "../model/customers";

/**
 * 
 * @param userID 
 * @param customersData 
 * @returns newely Created Customer Object
 */
const createCustomer = async (userID: Id, customersData: CreateCustomers) => {
    const customers = new CustomersModel({
        ...customersData,
    });
    await customers.save();
    return customers;
}

const updateCustomers = async (userId: Id, customersId: Id, customersData: CreateCustomers) => {
    const customer = await CustomersModel.updateOne({ _id: customersId, user: userId, business: customersData.business },
        { ...customersData },
        { new: true, runValidators: true });
    return customer;
}


/**
 * 
 * @param userId of the Customer
 * @param businessId of Customer
 * @returns List [] of Customers
 */
const getAllCustomersForBusiness = async (userId: Id, businessId: Id) => {
    return CustomersModel.find({ business: businessId, user: userId }, { createdAt: 0, updatedAt: 0, user: 0, __v: 0 });
}

const getCustomer = async (userId: Id, customersId: Id) => {
    return CustomersModel.findOne({ _id: customersId, user: userId }, { createdAt: 0, updatedAt: 0, __v: 0, user: 0 })
}

const deleteCustomer = async (userId: Id, customersId: Id, businessId: Id) => {
    const deletedCustomerInfo = await CustomersModel.deleteOne(
        { _id: customersId, user: userId, business: businessId }
    );
    return deletedCustomerInfo;
}
export { createCustomer, deleteCustomer, getAllCustomersForBusiness, getCustomer, updateCustomers };

