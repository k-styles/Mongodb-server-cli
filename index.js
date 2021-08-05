const mongoose = require('mongoose');
const uri = "mongodb+srv://styles:styles@test-cluster.dxivq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Map Global Promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to db
const db = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 30000,
    keepAlive: true
}, ()=>{
    console.log('Successfully connected to database ');
}, (err)=>{
    console.log('Not connected to database ', err);
});

// Import model
const Customer = require("./models/models");

// Add Customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.info('New Customer Added');
        db.close();
    });
}

// Find Customer
const findCustomer = (name) => {
    // Make case insensitive
    const search = new RegExp(name, 'i');
    Customer.find({$or: [{firstname: search}, {lastname: search}]})
    .then(customer => {
        console.info(customer);
        console.info(`${customer.length} matches`);
        db.close();
    });
}

// Export All Methods
module.exports = {
    addCustomer,
    findCustomer
}