const { getDb } = require('../db');

// get items function
const getAllItems = async (req, res) => {
    const db = await getDb();

    // get all items from database
    let data = await db.collection("items").find({}).toArray();

    (data.length > 0) ?
        // send data
        res.status(200).send({ status: 200, data: data }) :
        // send error message
        res.status(404).send({ status: 404, message: "Not found" })
};

// get items function
const getItems = async (req, res) => {

    const db = await getDb();

    const filters = [];

    // key value pair with key being param sent by FE and value being used by BE for filtering
    const priceMap = {
        '25': { $lt: 25 },
        '25-50': { $gte: 25, $lt: 50 },
        '50-100': { $gte: 50, $lt: 100 },
        '100-200': { $gte: 100, $lt: 200 },
        '200-300': { $gte: 200, $lt: 300 },
        '300': { $gte: 300 },
    }
    const name = req.query.name || '';
    const price = req.query.price || '';
    const splitPrice = Array.isArray(price) === false ? [price] : price;
    const priceFilters = [];
    splitPrice.filter(item => !!item).forEach((item) => {
        priceFilters.push({ sortPrice: priceMap[item] });
    })
    if (priceFilters.length > 0) {
        filters.push({ $or: priceFilters });
    }

    // uses query params sent by frontend and pushes string into array to be used as filters
    const body_location = req.query.body_location || '';
    const splitBodyLocation = Array.isArray(body_location) === false ? [body_location] : body_location;
    const bodyLocationFilters = [];
    splitBodyLocation.filter(item => !!item).forEach((item) => {
        bodyLocationFilters.push({ "body_location": item });
    })
    if (bodyLocationFilters.length > 0) {
        filters.push({ $or: bodyLocationFilters });
    }

    const companyId = req.query.companyId || '';
    if (companyId) {
        filters.push({ companyId: Number(companyId) });
    }

    const category = req.query.category || '';
    const splitCategory = Array.isArray(category) === false ? [category] : category;
    const categoryFilters = [];
    splitCategory.forEach((item) => {
        if (item) {
            categoryFilters.push({ "category": item });
        }
    })
    if (categoryFilters.length > 0) {
        filters.push({ $or: categoryFilters });
    }

    const numInStock = Number(req.query.numInStock || '0');
    if (numInStock) {
        filters.push({ numInStock: { $gt: 0 } });
    }

    // setting page limit, page numbers and sorting type and direction
    const limit = req.query.limit || 15;
    const page = req.query.page || 1;
    const sortKey = req.query.sortKey || 'sortPrice';
    const sortDirection = req.query.sortDirection || 1;
    const findFilters = filters.length > 0 ? { $and: filters } : {};
    const findName = name ? { sortName: { $regex: RegExp(name.toLowerCase()) } } : {};
    const find = { ...findFilters, ...findName };

    // gets items collection from DB (only filtered ones as defined in "find" variable and determines sorting, page # and limit)
    let data = await db.collection("items")
        .find(find)
        .sort({
            [sortKey]: sortDirection
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();

    // countDocuments method counts # of items coming from DB based on filters applied in "find" variable
    const itemCount = await db.collection("items").countDocuments(find);
    // using distinct to return names of all categories and body locations
    const categories = await db.collection('items').distinct('category');
    const bodyLocations = await db.collection('items').distinct('body_location');

    res.status(200).send({
        page,
        pageCount: Math.ceil(itemCount / limit),
        itemCount,
        sortKey,
        sortDirection,
        categories,
        bodyLocations,
        data,
    })
}

// get item by name function
const getItemByName = async (req, res) => {
    const db = await getDb();

    // get item id from req params
    const itemName = req.params.itemName;



    // find item by name from items database
    const result = await db.collection("items").findOne({ "name": itemName });

    result !== null ?
        // send data
        res.status(200).send({ status: 200, data: result }) :
        // send error message
        res.status(404).send({ status: 404, itemName, message: "Invalid item name" })

    // close the connection to the database server
    client.close();
};

// get item by id function
const getItemById = async (req, res) => {
    const db = await getDb();

    // get item id from req params
    const itemId = Number(req.params.itemId);

    // getting item by id from database and store it in result
    const result = await db.collection("items").findOne({ "_id": itemId });

    // if result is null, show error otherwise show result's data
    result !== null ?
        res.status(200).send({ status: 200, data: result }) :
        res.status(404).send({ status: 404, itemId, message: "Invalid item id" })
};

// get item by category function
const getItemByCategory = async (req, res) => {
    const db = await getDb();

    // get category from req params
    const category = req.params.category;

    // find item by category from items database

    const data = await db.collection("items").find({ category: category }).toArray();

    (data.length > 0) ?
        // send data
        res.status(200).send({ status: 200, data: data, itemCount: itemCount, pageCount: pageCount }) :
        // send error message
        res.status(404).send({ status: 404, category, message: "Invalid category" })
};

// get item by body location function
const getItemByBodyLocation = async (req, res) => {
    const db = await getDb();

    // get body location from req params
    const getBodyLocation = req.params.bodyLocation;
    const bodyLocation = getBodyLocation.charAt(0).toUpperCase() +
        getBodyLocation.slice(1).toLowerCase();

    // find item by body location from items database
    const result = await db.collection("items").find({ "body_location": bodyLocation }).toArray();

    (result.length > 0) ?
        // send data
        res.status(200).send({ status: 200, data: result }) :
        // send error message
        res.status(404).send({ status: 404, getBodyLocation, message: "Invalid location" })
};


module.exports = { getAllItems, getItems, getItemByName, getItemById, getItemByCategory, getItemByBodyLocation }