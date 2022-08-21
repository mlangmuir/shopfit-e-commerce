require("dotenv").config();
const { MongoClient } = require("mongodb");

// get mongo uri from .env file
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let client = null;

const getDb = async () => {
    if (!client) {
        // creates a new client
        client = new MongoClient(MONGO_URI, options);
        await client.connect();

        await client.db("e-commerce-project").collection('items').createIndex({
            sortPrice: 1,
            sortName: 1,
            body_location: 1,
            category: 1,
            sortCompanyId: 1,
            numInStock: 1,

        }, {
            name: 'filters',
            unique: false,
            background: true
        })
    }
    return client.db("e-commerce-project");
}

module.exports = { getDb }