'use strict';

const express = require('express');
const morgan = require('morgan');
const { getAllItems, getItems, getItemById, getItemByName, getItemByCategory, getItemByBodyLocation } = require('./Handlers/ItemHandlers');
const { getCompanies, getCompanyById, getCompanyByName } = require('./Handlers/CompanyHandlers');
const { addedNewOrder, deleteOrder, getOrders, getOrderById } = require('./Handlers/OrdersHandlers')

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ITEM~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // get all items from database
  .get("/allItems", getAllItems)

  // get items from database based on queries
  .get("/items", getItems)

  // get item by name from database
  .get("/items/name/:itemName", getItemByName)

  // get item by id from database
  .get("/items/id/:itemId", getItemById)

  // get item by category from database
  .get("/items/category/:category", getItemByCategory)

  // get item by body-location from database
  .get("/items/location/:bodyLocation", getItemByBodyLocation)

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~COMPANY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // get companies from database
  .get("/companies", getCompanies)

  // get company by id from database
  .get("/company/id/:companyId", getCompanyById)

  // get company by name from database
  .get("/company/name/:companyName", getCompanyByName)


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ORDER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // get all the orders from database
  .get("/orders", getOrders)

  // get order by id from database
  .get("/order/:orderId", getOrderById)

  // get order by customer name from database
  .get("/order/:customerName", getOrderById)

  //post new order in orders database
  .post("/order", addedNewOrder)

  //post new order in orders database
  .delete("/order/:orderId", deleteOrder)

  //Invalid route
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));