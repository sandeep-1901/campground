const path = require('path');
const mongoose = require('mongoose');
const campground = require('../models/campground');
const cities = require('./cities');
const { places , descriptors } = require('./seedHelpers');



main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/campground');
    console.log("connected")

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};

const sample = array =>array[Math.floor(array.length * Math.random())];
const seedDb = async () => {
    await campground.deleteMany({})

    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(1000 * Math.random())
        const price = Math.floor(Math.random()*500)+10
        const camp = new campground({ location: `${cities[random1000].city},${cities[random1000].state} `,
        title:`${sample(descriptors)} ${sample(places)}`,
        image:`https://source.unsplash.com/collections/483251`,
        description:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore totam, expedita commodi numquam nihil rem blanditiis. Provident ea quos dolore, minus aliquid facere porro. Provident voluptate culpa debitis aut voluptatibus?`,
        price
    })
        
        await camp.save();
    }
}


seedDb().then(()=>{mongoose.connection.close;});