// import mongo client from mongodb
const { MongoClient } = require("mongodb");

// import uuid
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

// get mongo uri from .env file
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// get orders function
const getOrders = async (req, res) => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
try{
    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("e-commerce-project");

    // find all the items from items database
    const orders = await db.collection("orders").find().toArray();
    // send data
    res.status(200).send({status: 200, data: orders})
}catch(err){
    console.log("error", err)
    // send error message
    res.status(404).send({status: 404, message: err})
}
    // close the connection to the database server
    client.close();
};

// get order by id function
const getOrderById = async (req, res) => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // get order id from  req parans
    const orderId = req.params.orderId;
try{
    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("e-commerce-project");

    // find all the items from items database
    const order = await db.collection("orders").findOne({_id: orderId});
    // send data
    res.status(200).send({status: 200, data: order})
}catch(err){
    console.log("error", err)
    // send error message
    res.status(404).send({status: 404, orderId, message: "Invalid order ID"})
}
    // close the connection to the database server
    client.close();
};

// add new order function
const addedNewOrder = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    let result;

    // connect to the client
    await client.connect();
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("e-commerce-project");

    try{
        result = await db.collection("orders").insertOne({ _id: uuidv4() ,
            // get order and customer information from req body
            // and add order in orders database
            order: req.body.order,
            givenName: req.body.givenName,
            surname: req.body.surname,
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            phone: req.body.phone,
            email: req.body.email,
            postal: req.body.postal,
            cardNumber: req.body.cardNumber,
            nameOnCard: req.body.nameOnCard,
            expiry: req.body.expiry,
            ccv: req.body.ccv,
        });

        // send error
        }catch{(err) => 
            console.log(err)
        }

        // update quantity
        const order = req.body.order;

        try{
            for(let i=0; i<order.length; i++){
            // get item name from req body
            const itemName = order[i].itemName;
            // find item by name and store it in stock
            const stock = await db.collection("items").findOne({"name": itemName})

            // update stock in items database by item name
            await db.collection("items").updateOne({ "name": itemName}, 
            {$set: {"numInStock": (stock.numInStock)-order[i].quantity}}
            );
            }

            // send new order added message
            res.status(201).json({ status: 201 , message: `new order added` })
        }catch{
            // send error message
            res.status(404).json({ status: 404, message: `Item Not Found` });
        }

     // close the connection to the database server
    client.close();
    return result;
};

// delete order function
const deleteOrder = async(req, res) => {
    // get order id from  req parans
    const orderId = req.params.orderId;
    // get order id from req body
    const itemName = req.body.itemName;

    const client = new MongoClient(MONGO_URI, options);
    let result;

    // connect to the client
    await client.connect();
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("e-commerce-project");

    // find order by id
    const order = await db.collection("orders").findOne({_id: orderId})
    
    if(order !== null){
        // delete order from orders database by order id
        await db.collection("orders").deleteOne({ _id: orderId});
    // send order delete message
    
    // store orders array in orderInfo
    const orderInfo = order.order;
    
    try{
        // loop over orders stored in orders database
        for(let i=0; i<orderInfo.length; i++){
            // get item name from req body
            const itemName = orderInfo[i].itemName;
            
            // find item by name and store it in stock
            const stock = await db.collection("items").findOne({"name": itemName})
        
            // update stock in items database by item name
            await db.collection("items").updateOne({ "name": itemName}, 
            {$set: {"numInStock": (stock.numInStock)+orderInfo[i].quantity}}
            );
        }
        
    }catch(err){
        // send error if invalid order it 
        console.log(err)
    }
    res.status(201).json({ status: 201 , message: `order deleted` })
    }else{
        // send error if invalid order id
        res.status(404).json({ status: 404, orderId, message: `Invalid order id` });
    }
    
     // close the connection to the database server
    client.close();
    return result;
};

// export all the functions
module.exports = {addedNewOrder, deleteOrder, getOrders, getOrderById}