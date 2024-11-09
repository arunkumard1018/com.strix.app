import express from "express"

const customersRouter = express.Router();

customersRouter.route("/")
    .get()
    .post();
    
customersRouter.route("/:customersId")
    .get()
    .put()
    .delete();

export { customersRouter }