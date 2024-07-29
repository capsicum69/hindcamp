const mongoose = require('mongoose');
const Campground = require('../models/campground');
const Review = require('../models/review');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
  await Campground.deleteMany({});
  await Review.deleteMany({});
  for (let i = 0; i < cities.length; i++) {
    const price = Math.floor(Math.random() * 10000) + 2000;
    const camp = new Campground({
      author: '66a78130be4c5e50c04cd02b',
      location: `${cities[i].city}, ${cities[i].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [cities[i].longitude, cities[i].latitude],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dwlpoufjg/image/upload/v1722254776/HindCamp/gehzmqeelf6pikbipdkb.jpg',
          filename: 'HindCamp/gehzmqeelf6pikbipdkb',
        },
        {
          url: 'https://res.cloudinary.com/dwlpoufjg/image/upload/v1722254777/HindCamp/zmzrrbjcaj85qpibvb76.jpg',
          filename: 'HindCamp/zmzrrbjcaj85qpibvb76',
        },
        {
          url: 'https://res.cloudinary.com/dwlpoufjg/image/upload/v1722254777/HindCamp/qkiwjxdapfeoxqblyps0.jpg',
          filename: 'HindCamp/qkiwjxdapfeoxqblyps0',
        }
      ],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus numquam voluptate exercitationem harum quisquam possimus dolores delectus optio ex? Illo ad error accusantium veritatis provident totam enim! Quo, velit eveniet.',
      price
    });
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});
