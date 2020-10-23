import {RequestHandler} from "express";
import {StatusCodes} from "http-status-codes/build/es";


const tryCatchRequest =  <A,B,C,D>(requestHandler: RequestHandler<A,B,C,D>) : RequestHandler<A,B | Error,C,D> => (
    async (req, res, next) => {
        try {
            await requestHandler(req, res, next)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        }
    }
)

export default tryCatchRequest
