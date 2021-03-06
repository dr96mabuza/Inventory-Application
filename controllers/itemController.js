const Item = require("../models/item");
const Category = require("../models/category");

const async = require("async");
const category = require("../models/category");

exports.index = function (req, res) {
  async.parallel(
    {
      item_count(callback) {
        Item.countDocuments({}, callback);
      },
      category_count(callback) {
        Category.countDocuments({}, callback);
      },
    },
    function (err, results) {
      res.render("index", {
        title: "Inventory Home",
        error: err,
        data: results,
      });
    }
  );
};

//display list of all items
exports.item_list = (req, res, next) => {
  Item.find({}, "studio")
    .sort({ name: 1 })
    .populate("name")
    .exec(function (err, item_list) {
      if (err) {
        return next(err);
      }
      res.render("item_list", { title: "Item List", item_list: item_list });
    });
};

//detailed page of specific item
exports.item_detail = (req, res, next) => {
  async.parallel(
    {
      item(callback) {
        Item.findById(req.params.id)
          .populate("name")
          .populate("studio")
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("item_detail", { title: results.name });
    }
  );
};

//display item create form on GET
exports.item_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Item create GET");
};

//handle Item create on POST
exports.item_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Item create POST");
};

//Display item delete form on GET
exports.item_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Item delete GET");
};

//Handle item delete on POST
exports.item_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
};

//Display Item update form on GET
exports.item_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Item update GET");
};

//handle item update on POST
exports.item_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Item update POST");
};
