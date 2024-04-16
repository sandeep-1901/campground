const mongoose =require('mongoose');
const schema = mongoose.Schema;


const reviewSchema = new schema({
   
   review:String,
   rating:Number,
})


module.exports =mongoose.model("Review",reviewSchema);