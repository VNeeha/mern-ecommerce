// EXTERNAL MODULES
const express=require('express')
require('dotenv').config();
const mongoose=require('mongoose')

// LOCAL MODULES
const authRouter=require('./routes/authRouter');
const adminRouter=require('./routes/adminRouter');
const shopRouter=require('./routes/shopRouter');
const profileRouter=require('./routes/profileRouter');
const cartRouter=require('./routes/cartRouter');
const errorController=require('./controllers/errorController')

// CORE MODULES


// CONSTANTS FROM ENV
const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL


// CREATING SERVER
const app=express();


// MIDDLEWARE FOR HANDLING DIFFERENT TYPE INCOMING DATA
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// ROUTING
app.use('/api/auth',authRouter);
app.use('/api/shop',shopRouter);
app.use('/api/admin',adminRouter);
app.use('/api/cart',cartRouter);
app.use('/api/profile',profileRouter);

// UNDEFINED PATH HANDLER
app.use(errorController.errorHandler)

// CONNECTING TO DATABASE AND DEFINING PORT FRO SERVER TO LISTEN
mongoose.connect(MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running at port:http://localhost:${PORT}`)
    })
})
.catch((err)=>{
    console.log("Error while connecting to database",err)
})