#! /usr/bin/env node

console.log(
  "This script populates some test items and categories to my database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
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

function categoryCreate(name, description, cb) {
  const category = new Category({ name: name, description: description });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Category: ${category}`);
    categories.push(category);
    cb(null, category);
  });
}

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
    studio: studio,
    num_in_stock: num_in_stock,
    category: category,
  };

  const item = new Item(itemdetail);

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

function createItems(cb) {
  async.series(
    [
      function (callback) {
        itemCreate(
          "Call of Duty: MW3",
          1000,
          "2011, single/multiplayer first person shooter game. modern setting.",
          "ACTIVISION",
          1,
          [categories[0]],
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
          "BATTLEFIELD 3: limited edition",
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
    ],
    cb
  );
}

function createCategories(cb) {
  async.parallel(
    [
      function (callback) {
        categoryCreate(
          "First person shooter",
          `a type of video game whose gameplay involves shooting enemies and other targets and in which a player views the action as though through the eyes of the character they are controlling.
        \"blast through hordes of aliens in this sci-fi first-person shooter\"`,
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Action Adventure/Historical",
          "An action adventure game can be defined as a game with a mix of elements from an action game and an adventure game, especially crucial elements like puzzles.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Racing",
          "Racing games are a video game genre in which the player participates in a racing competition. They may be based on anything from real-world racing leagues to fantastical settings. They are distributed along a spectrum between more realistic racing simulations and more fantastical arcade-style racing games",
          callback
        );
      },
    ],
    cb
  );
}

async.parallel(
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
