export interface AddressModel {
    street: string;
    city: string;
    state: string;
    postalCode: number;
}
export interface BusinessModel {
    name: string;
    catagory: string;
    phone: number,
    invoicePrefix: string,
    GSTIN: string | undefined;
    stateCode: number | undefined;
    HSN: number | undefined;
    logo: string;
    address: AddressModel;
}
export interface BusinessData {
    _id: string;
    name: string;
    catagory: string;
    phone: number,
    invoicePrefix: string,
    GSTIN: string | undefined;
    stateCode: number | undefined;
    HSN: number | undefined;
    logo: string;
    address: AddressModel;
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