// EXTERNAL MODULES
const express=require('express')

// LOCAL MODULES
const profileController=require('../controllers/profileController');


// CREATING ROUTER
const profileRouter=express.Router();

// EXPORTING ROUTER
exports.profileRouter=profileRouter