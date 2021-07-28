const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const WordSchema = new Schema({
  titleWord: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});
WordSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("word".WordSchema, "words");
