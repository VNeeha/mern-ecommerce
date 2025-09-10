exports.errorHandler=(req,res,next)=>{
    res.status(404).json({message:"PAGE NOT FOUND"})
}