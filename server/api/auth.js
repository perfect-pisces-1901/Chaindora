const router = require("express").Router();
const User = require("../db/models/User");

module.exports = router;

router.get("/me", (req, res, next) => {
  if (!req.session.userId) {
    userNotFound(next);
  } else {
    User.findById(req.session.userId)
      .then(user => (user ? res.json(user) : userNotFound(next)))
      .catch(next);
  }
});

// router.put("/login", (req, res, next) => {
//   User.findOne({
//     where: {
//       email: req.body.email,
//       password: req.body.password
//     }
//   })
//     .then(user => {
//       if (user) {
//         req.session.userId = user.id;
//         res.json(user);
//       } else {
//         console.log(req.body.email, "$$$$$$");
//         console.log(req.body.password, "****");
//         const err = new Error("Incorrect email or password!");
//         err.status = 401;
//         next(err);
//       }
//     })
//     .catch(next);
// });

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    console.log(req.body.email, "$$$$$$$$");
    if (!user) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password for user:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});
