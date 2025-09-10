// EXTERNAL MODULES
const express=require('express')

// LOCAL MODULES
const cartController=require('../controllers/cartController');


// CREATING ROUTER
const cartRouter=express.Router();

// EXPORTING ROUTER
exports.cartRouter=cartRouter