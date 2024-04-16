const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catcherror');
const ExpressError = require('../utils/ExpressError');
const joi = require('joi');
const { error } = require('console');
const review = require('../models/review');
const Campground = require('../models/campground');
const campground = require('../models/campground');
const Review = require('../models/review');



router.get('/', async (req, res) => {
  
    const campground = await Campground.find({})
    res.render('campground/index', { campground })
  });
  
  router.get('/new', (req, res) => {
    res.render('campground/new');
  });
  
  
  
  router.get('/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campground/edit', { campground })
  }));
  
  
  router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    console.log(campground)
    res.render('campground/show', { campground })
  }));
  
  router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campground/${campground._id}`)
  }));
  
  
  router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const del = await Campground.findByIdAndDelete(id);
    res.redirect('/campground')
  }))
  
  router.post('/', catchAsync(async (req, res) => {
    // if(!req.body.campground) throw new ExpressError('invalid data', 404);
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campground/${campground._id}`)
  }));
  
  
  router.post('/:id/reviews',catchAsync(async(req,res)=>{
    console.log(req.body)
    const campground =await Campground.findById(req.params.id);
   const review = new Review(req.body.review);
   campground.reviews.push(review);
   await review.save();
   await campground.save();
   res.redirect(`/campground/${campground._id}`);
  
  }))
 


  module.exports =router;