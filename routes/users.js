const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/ActionRush");
const userSchema = mongoose.Schema({
  username  : String,
  password  : String,
  name      : String,
  joined    :[String],
  activities: [{
    sport : String,
    distraveled: Number,
    duration : Number,
    height : Number,
    steps : Number,
    image : String,
    caption : String 
}],
  profileimg : String
});

userSchema.plugin(plm)

module.exports = mongoose.model("user",userSchema);
