import "reflect-metadata";
import { NextFunction, Request, Response } from 'express';
import { celebrate, errors } from "celebrate";
import 'express-async-errors';
import './database'
import * as bodyParser from "body-parser";
import uploadConfig from "./config/upload";

import routes from "./routes";
import AppError from "./errors/AppError";
import express = require("express");
import cors = require("cors");


const app = express()

//app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use('/files',express.static(uploadConfig.directory))
app.use(routes)
app.use(errors())

app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
      }
  
      console.log(error);
  
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    },
  );
  
app.listen(8000, () => {
    console.log('Server started on port 8000! 🏆');
}
    )
