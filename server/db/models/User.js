const Sequelize = require("sequelize");
const db = require("../db");
const crypto = require("crypto");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isArtist: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isListener: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://www.sterlitech.com/static/version1550744966/frontend/SCI/sterlitech/en_US/Mageplaza_Blog/media/images/no-artist-image.jpg"
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("password");
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    }
  }
});

module.exports = User;

/* INSTANCE METHODS */

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

/* HOOKS */

const setSaltAndPassword = user => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword);
});
