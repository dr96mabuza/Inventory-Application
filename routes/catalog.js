const express = require("express");
const router = express.Router();

const item_Controller = require("../controllers/itemController");
const category_Controller = require("../controllers/categoryController");

// item Routes

// get home page
router.get("/", item_Controller.index);

// get create item
router.get("/item/create", item_Controller.item_create_get);

// post create item
router.post("/item/create", item_Controller.item_create_post);

// get delete item
router.get("/item/:id/delete", item_Controller.item_delete_get);

// post delete item
router.post("/item/:id/delete", item_Controller.item_delete_post);

// get update item
router.get("/item/:id/delete", item_Controller.item_update_get);

// post update item
router.post("/item/:id/delete", item_Controller.item_update_post);

// get one item
router.get("/item/:id", item_Controller.item_detail);

// get list of items
router.get("/item", item_Controller.item_list);

//category Routes

// get create category
router.get("/category/create", category_Controller.category_create_get);

// post create category
router.post("/category/create", category_Controller.category_create_post);

// get delete category
router.get("/category/:id/delete", category_Controller.category_delete_get);

// post delete category
router.post("/category/:id/delete", category_Controller.category_delete_post);

// get update category
router.get("/category/:id/delete", category_Controller.category_update_get);

// post update category
router.post("/category/:id/delete", category_Controller.category_update_post);

// get one category
router.get("/category/:id", category_Controller.category_detail);

// get list of categoriess
router.get("/category", category_Controller.category_list);

module.exports = router;
