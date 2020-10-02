import Client from '../models/Client'

export const createClient = async (req,res) => {
    const newClient = new Client({
        ...req.body,
        loyaltyPoint: 0,
    })

    try {
        await newClient.save()
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json(error);  
    }
 
}

//Read Clients
export const readClients = async (req,res) => {
    try {
        const clients = await Client.find({})
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json(error);   
    }
}

export const readClient = async (req,res) => {
    try {
        const client = await Client.findById(req.params.id)
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json(error);
    }
}
export const editClient = async (req,res)=> {
    try {
        const newClient = await Client.findOneAndReplace({_id: req.params.id}, req.body)
        res.status(200).json(newClient)
    } catch (error) {
        res.status(500).json(error);
    }

}
export const readClientOrders = async (req,res)=>{
    try {
        const client = await Client
            .findById(req.params.id)
            .select('orders')
            .populate('orders')
        res.status(200).json(client.orders)
    } catch (error) {
        res.status(500).json(error);
    }
}
export const deleteClient = async (req,res)=>{
    try {
        await Client.findByIdAndDelete(req.params.id)
        res.status(204);
    } catch (error) {
        res.status(500).json(error);     
    }
}
export const readClientBooking = async (req,res)=>{
    try {
        const client =  await (await Client
            .findById(req.body.id))
            .select('booking')
            .populate('booking')
            res.status(200).json(client.booking)
    } catch (error) {
        res.status(500).json(error); 
    }
}