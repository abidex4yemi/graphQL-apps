const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String
});

userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      return next();
    });
  });
});

userSchema.method("comparePassword", function(providedPassword, cb) {
  bcrypt.compare(providedPassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
});

mongoose.model("user", userSchema);
