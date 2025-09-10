// EXTERNAL MODULES
const express=require('express')

// LOCAL MODULES
const authController=require('../controllers/authController');

// CREATING ROUTER
const authRouter=express.Router();

// EXPORTING ROUTER
exports.authRouter=authRouter
