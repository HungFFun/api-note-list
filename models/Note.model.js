const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const user = require("./User.model");
const work = require("./Work.model");

// create models
const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },
  color: {
    type: String,
    default: "#FFFFFF",
  },
  pin: {
    type: Boolean,
    default: false,
  },
  storage: {
    type: Boolean,
    default: false,
  },
  trash: {
    type: Boolean,
    default: false,
  },
});
NoteSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("note", NoteSchema, "notes");
