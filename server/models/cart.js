// EXTERNAL MODULE
const mongoose=require('mongoose')

// LOCAL MODULES
const Product=require('./product')

// CREATING SCHEMA
const cartSchema=mongoose.Scheme({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            default:1
        }
    }]
})

// CREATING MODEL FROM SCHEMA
module.exports=mongoose.model('Cart',cartSchema);