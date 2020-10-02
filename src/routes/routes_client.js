//Access the router on Express
const router = require('express').Router();

//Access the controllers
import client_controllers from  '../controllers/client_controllers';

//CREATE
router.post("/api/clients", (req, res) => {

    client_controllers.createClient(req, res);

});

export default router
