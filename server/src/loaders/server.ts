import 'express-async-errors'
import {StatusCodes} from "http-status-codes/build/cjs";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import apiRouter from "../routes";
import logger from "./logger";

export default express()

// used to fetch the data from forms on HTTP POST, and PUT
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))

// Use the morgan logging
    .use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// Routes
    .use('/api/v1/', apiRouter)

// Catch internal server error
    .use(async (error : Error, req, res, next) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        logger.error(error.message)
        next()
    })

// Ressource not found
    .use((req, res) => {
        logger.error('HTTP 404: ask for:  ' + req.protocol + '://' + req.get('host') + req.originalUrl);
        res.status(404).json({
            msg:'Unavailable address'
        });
    })
