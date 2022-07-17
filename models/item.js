const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 50, minLength: 5 },
  price: { type: Number, required: true, min: 1 },
  description: { type: String, required: true },
  studio: {type: String, required: true},
  num_in_stock: { type: Number, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

ItemSchema.virtual("url").get(() => {
  return `/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
