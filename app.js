const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Review = require('./models/review');
const campground = require('./models/campground');
const methodoverride = require('method-override');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catcherror');
const ExpressError = require('./utils/ExpressError');
const joi = require('joi');
const { error } = require('console');
const review = require('./models/review');
const camproute = require('./routes/campground')

const app = express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/campground');
  console.log("connected")

 
}






app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride('_method'));
app.engine('ejs', ejsMate);


// const validate = (req,res,next)=>{
//   const campgroundSchema = joi.object({
//     campground:joi.object({
//       title:joi.string().required(),
//       price:joi.number().required().min(0),
//       description:joi.string().required(),
//       image:joi.string().required(),
//       location:joi.string().required()
      

//     }).required()
//   })
//   const result = campgroundSchema.validate(req.body);
 
//   if(error){
//     console.log(error)
//     throw new ExpressError( "error" ,400)
   
//   }else{
//     next();
//   }
  

// }

app.get('/', (req, res) => {
  console.log('working')
  res.render('home')
})

app.use('/campground',camproute);





// app.get('/campround',async (req,res)=>{
//     const camp = new campground({title:"my backyard"})
//     await camp.save();
//     console.log('working')
//     res.send(camp)
// })




// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })


// app.use(logErrors);

// function logErrors (err, req, res, next) {

//   res.send("laura ")
// }


app.all('*', (req, res, next) => {
  next(new ExpressError('page not found', 404))
})



app.use((err, req, res, next) => {
  const{ statuscode = 500,message = 'something went wrong'} = err;
  if(!err.message)err.message = "something went wrong"
  res.status(statuscode).render('campground/err',{ err });
})


app.listen(3002, () => { console.log('listining on port 3002') });