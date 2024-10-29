import * as express from 'express';

interface authContext {
    userId:  mongoose.Schema.Types.ObjectId;
    userEmail: string;
}

declare global {
    namespace Express {
        interface Request {
            authContext: authContext;
        }
    }
}

declare global {
    type Id = mongoose.Schema.Types.ObjectId;
}