const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});
UserSchema.index(
  {
    email: 1,
  },
  {
    unique: true,
  }
);
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("user", UserSchema, "users");
