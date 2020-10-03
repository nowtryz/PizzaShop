import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import apiRouter from "../routes/apiRouter";
import logger from "./logger";

const app = express()

//used to fetch the data from forms on HTTP POST, and PUT
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//Use the morgan logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// Routes
app.use('/api/v1/', apiRouter)

// Ressource not found
app.use((req, res) => {
    logger.error('HTTP 404: ask for:  ' + req.protocol + '://' + req.get('host') + req.originalUrl);
    res.status(404).json({
        msg:'Unavailable address'
    });
})

export default app
