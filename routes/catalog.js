const express = require("express");
const router = express.Router();

const item_Controller = require("../controllers/itemController");
const category_Controller = require("../controllers/categoryController");

// item Routes

// get home page
router.get("/", item_Controller.index);

// get create item
router.get("/item/create", item_Controller.item_delete_get);
