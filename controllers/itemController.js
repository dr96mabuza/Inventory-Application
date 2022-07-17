const Item = require("../models/item");

exports.index = function (req, res) {
  res.send("NOT IMPLEMENTED: Site Home Page");
};

//display list of all items
exports.item_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Item list");
};

//detailed page of specific item
exports.item_detail = (req, res) => {
  res.send("NOT IMPLEMENTED: Item detail");
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
