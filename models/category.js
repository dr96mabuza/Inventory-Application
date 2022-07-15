const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  num_of_items: { type: Number, required: true },
  description: { type: String, required: true },
});

CategorySchema.virtual("url").get(() => {
  return `/category/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
