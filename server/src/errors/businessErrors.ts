export class BusinessNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BusinessNotFoundError';
    }
}