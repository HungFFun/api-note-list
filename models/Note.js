const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

// create models
const NoteSchema = new Schema({
  title: {
    type: String,
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },
  listWord: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: word,
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
