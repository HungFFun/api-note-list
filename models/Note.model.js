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
  work: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: work,
    },
  ],
  color: {
    type: String,
    default: "#FFFFFF",
  },
  pin: {
    type: Boolean,
    default: false,
  },
});
NoteSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("note", NoteSchema, "notes");
