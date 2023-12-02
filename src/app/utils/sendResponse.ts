import { Response } from "express";

const sendResponse =<T> (res: Response, data: {
    statusCode: number;
    success: boolean;
    message?: string;
    data: T 

}) =>{
    res.json(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data
    })
}

export default sendResponse;          //it would not use