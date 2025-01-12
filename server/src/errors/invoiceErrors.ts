export class DuplicateInvoiceNumberError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DuplicateInvoiceNumberError';
    }
}

export class InvoiceNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvoiceNotFoundError';
    }
}