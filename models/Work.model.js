const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const WorkSchema = mongoose.Schema({
  titleWork: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});
WorkSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("work", WorkSchema, "works");
