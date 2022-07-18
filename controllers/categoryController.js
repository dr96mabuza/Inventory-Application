const Category = require("../models/category");

//display list of all categoriess
exports.category_list = (req, res) => {
  Category.find({}, "name")
    .sort({ name: 1 })
    .populate("description")
    .exec(function (err, category_list) {
      if (err) {
        return next(err);
      }
      res.render("category_list", {
        title: "Category List",
        category_list: category_list,
      });
    });
};

//detailed page of specific category
exports.category_detail = (req, res) => {
  res.send("NOT IMPLEMENTED: category detail");
};

//display category create form on GET
exports.category_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: category create GET");
};

//handle category create on POST
exports.category_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: category create POST");
};

//Display category delete form on GET
exports.category_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: category delete GET");
};

//Handle category delete on POST
exports.category_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: category delete POST");
};

//Display category update form on GET
exports.category_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: category update GET");
};

//handle category update on POST
exports.category_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: category update POST");
};
