const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({});

module.exports = mongoose.model("Item", ItemSchema);
