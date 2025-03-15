import { NextFunction, Request, Response } from "express";
import ApiError from "../errorHandler/errorHandler";

const errorMiddleware = (
    err: ApiError | Error,
    req: Request,          
    res: Response,         
    next: NextFunction     
  ): void => {
    console.log(`Error: ${err.message} - ${err instanceof ApiError ? err.status : 500}, point : ${err instanceof ApiError ? err.point : `???`}`)

    if (err instanceof ApiError){
        res.status(err.status).json({message: err.message});
    } else { 
        res.status(500).json({message: 'Unexpected error'});
    }
};


export default errorMiddleware