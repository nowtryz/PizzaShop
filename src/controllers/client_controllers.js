import Client from '../models/Client'

const createClient = async (req,res) => {
    const newClient = new Client({
        name : req.body.name,
        surname : req.body.surname,
        email : req.body.email,
        pwd : req.body.pwd,
        loyaltyPoint : 0,
        orders : req.body.orders,
        bookings : req.body.bookings,
    })

    try {
        await newClient.save()
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json(err);  
    }
 
}
module.exports.createClient = createClient;

const readClients = async (req,res) => {
    try {
        Client.find({})
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json(err);   
    }
}

