var mongoose                = require("mongoose");
    passportLocalMongose    = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongose);

module.exports = mongoose.model("User", UserSchema);