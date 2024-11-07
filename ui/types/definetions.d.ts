export interface AddressModel{
    street : string;
    city:string;
    state:string;
    postalCode: number;
}
export interface BusinessModel{
    name : string;
    catagory : string;
    GSTIN : string | undefined;
    stateCode : number | undefined;
    HSN : number | undefined;
    logo:string;
    address : AddressModel;
}