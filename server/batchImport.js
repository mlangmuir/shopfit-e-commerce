const companies = require("./data/companies.json");
const items = require("./data/items.json");


const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const batchImport = async () => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
    let result;

  try{
    // connect to the client
    await client.connect();
  
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("e-commerce-project");
    console.log("connected!");

    result = await db.collection("items").insertMany(items);
  }catch (err){
    console.log(err)
  }


    // close the connection to the database server
    client.close();
    console.log("disconnected!");

    return result;
  };

  const batchUpdate = async () => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
    let result;

  try{
    // connect to the client
    await client.connect();
  
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("e-commerce-project");
    console.log("connected!");
  
    result = await db.collection("items").find().forEach(function(item) {
      const sortPrice = Number(item.price.slice(1, 7).trim().replace(",",""));
      const sortName = item.name.toLowerCase().trim();
      const sortCompanyId = item.companyId.toString();
      db.collection("items").updateOne({
          "_id": item._id
      }, {
          "$set": {
              "sortPrice": sortPrice,
              "sortName": sortName,
              "sortCompanyId": sortCompanyId
          }
      });
  })

  // close the connection to the database server
  client.close();
  console.log("disconnected!");

  }catch (err){
    console.log(err)
  }

    return result;
  };

  // batchUpdate();
  // batchImport();
