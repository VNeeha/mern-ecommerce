// EXTERNAL MODULES
const express=require('express')


// LOCAL MODULES
const adminController=require('../controllers/adminController');


// CREATING ROUTER
const adminRouter=express.Router();

// EXPORTING ROUTER
exports.adminRouter=adminRouter