// EXTERNAL MODULE
const mongoose=require('mongoose')

// CREATING SCHEMA
const productSchema=mongoose.Scheme({
    name:{
        type:String,
        required:true
    },
    description:String,
    category:{
        type:String,
        required:true,
        enum:['clothing','groceries','books','electronics','accessories']
    },
    price:{
        type:Number,
        required:true
    },

    stock:{
        type:Number,
        required:true,
        default:0
    },
    imageURL:{
        type:String,
        required:true
    },
    timeStamps:true
})

// CREATING MODEL FROM SCHEMA
module.exports=mongoose.model('Product',productSchema);