/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) =>{
  //setting default values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';

    let errorSources : TErrorSources = [{
      path: '',
      message: 'Something went wrong',
    }]

    const handleZodError = (err:ZodError) =>{
      const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) =>{
        return {
          path: issue?.path[issue.path.length - 1],
          message: issue?.message,
        }
      })

      return {
        statusCode,
        message: "Validation Error",
        errorSources
      }
    }

    if(err instanceof ZodError){
      const simplifiedError = handleZodError(err)
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    }
  
    //ultimate return
    return res.status(statusCode).json({
      success: false,
      message: message,
      errorSources,
      stack: config.NODE_ENV === 'development'? err?.stack : null
    })
  }

  export default globalErrorHandler;


  /**
  Error Pattern
  ------------
  success,
  message,
  errorSources: [
    path: '',
    message: ''
  ],
  stack

   */