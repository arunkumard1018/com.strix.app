export interface AddressModel {
    street: string;
    city: string;
    state: string;
    postalCode: number;
}
export interface BusinessModel {
    name: string;
    catagory: string;
    phone: number;
    invoicePrefix: string;
    logo: string;
    city: string;
}


export interface Customers {
    _id:string;
    name: string;
    email: string;
    phone: number;
    GSTIN: string;
    PAN: string;
    business: string;
    address:AddressModel;
}
