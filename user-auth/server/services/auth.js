const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = mongoose.model("user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      // If error while searching for user
      if (err) {
        return done(err);
      }

      // No user with provided email
      if (!user) {
        return done(null, false, "Invalid Credentials");
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (isMatch) {
          return done(null, user);
        }

        return done(null, false, "Invalid Credentials");
      });
    });
  })
);

const signup = ({ email, password, req }) => {
  if (!email && !password) {
    throw new Error("You must provide email and password");
  }
  const user = new User({ email, password });

  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        throw new Error("Email already exist");
      }

      return user.save();
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        req.logIn(user, err => {
          if (err) {
            reject(err);
          }

          resolve(user);
        });
      });
    });
};

const login = ({ email, password, req }) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (err, user) => {
      if (!user) {
        reject("Invalid credentials");
      }

      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
};

module.exports = {
  signup,
  login
};
