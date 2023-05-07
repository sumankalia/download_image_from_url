const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
