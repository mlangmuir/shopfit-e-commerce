// import mongo client from mongodb
const { MongoClient } = require("mongodb");
require("dotenv").config();

// get mongo uri from .env
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// get companies function
const getCompanies = async (req, res) => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
try{
    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("e-commerce-project");

    // find all the companies from companies databse
    const companies = await db.collection("companies").find().toArray();
    // send data
    res.status(200).send({status: 200, data: companies})
}catch(err){
    console.log("error", err)
    // send error message
    res.status(404).send({status: 404, message: err})
}
    // close the connection to the database server
    client.close();
};

// get company by id function
const getCompanyById = async (req, res) => {
    // get company id from req params
    const companyId = Number(req.params.companyId);
    let result;

    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("e-commerce-project");

    // find company by id from companies database
    result = await db.collection("companies").findOne({"_id": companyId});

    result !== null ?
    // send data
    res.status(200).send({status: 200, data: result}) :
    // send error message
    res.status(404).send({status: 404, companyId, message: "Invalid company id"})

    // close the connection to the database server
    client.close();
};

// get company by name function
const getCompanyByName = async (req, res) => {
    // get company name from req params
    const getCompanyName = req.params.companyName;
    const companyName = getCompanyName.charAt(0).toUpperCase() +
    getCompanyName.slice(1).toLowerCase();

    let result;

    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("e-commerce-project");

    // find company by name from companies database
    result = await db.collection("companies").findOne({"name": companyName});

    result !== null ?
    // send data
    res.status(200).send({status: 200, data: result}) :
    // send error message
    res.status(404).send({status: 404, getCompanyName, message: "Invalid company name"})

    // close the connection to the database server
    client.close();
};


module.exports = {getCompanies, getCompanyById, getCompanyByName}