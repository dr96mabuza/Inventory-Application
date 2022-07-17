#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Item = require("./models/item");
var Category = require("./models/category");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var items = [];
var categories = [];

function itemCreate(
  name,
  price,
  description,
  studio,
  num_in_stock,
  category,
  cb
) {
  itemdetail = {
    name: name,
    price: price,
    description: description,
    studio,
    num_in_stock: num_in_stock,
    category: category,
  };

  var item = new Item(itemdetail);

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Item: ${itemdetail}`);
    items.push(item);
    cb(null, item);
  });
}

function categoryCreate(name, description) {
  const category = new Category({ name: name, description: description });

  category.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Category: ${category}`);
    categories.push(category);
    cb(null, category);
  });
}

function createItems(cb) {
  async.series([
    function (callback) {
      itemCreate(
        "Call of Duty: MW3",
        1000,
        "2011, single/multiplayer first person shooter game. modern setting.",
        "ACTIVISION",
        1,
        [category[0]],
        callback
      );
    },
    function (callback) {
      itemCreate(
        `Assassins\'s Creed IV + Assassin\'s Creed Rouge`,
        1200,
        "2013, double disc, single/multiplayer first person, open world game. historical setting.",
        "UBISOFT",
        1,
        [categories[1]],
        callback
      );
    },
    function (callback) {
      itemCreate(
        `BATTLEFIELD 3: limited edition`,
        800,
        "2011, single/multiplayer first person shooter game, modern setting.",
        "DICE",
        1,
        [categories[0]],
        callback
      );
    },
    function (callback) {
      itemCreate(
        `Nedd for Speed: MOST WANTED`,
        1100,
        "2012, single player motor racing game, modern setting.",
        "CRITERION",
        2,
        [categories[2]],
        callback
      );
    },
    cb
  ]);
}

function createCategories(cb) {
  async.waterfall([
    function (callback) {
      categoryCreate("First person shooter", "", callback);
    },
    function (callback) {
      categoryCreate("Open World/ Historical", "", callback);
    },
    function (callback) {
      categoryCreate("Motorsport", "", callback);
    },
    cb
  ]);
}

async.series(
  [createCategories, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
