const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const posts = require('./posts');
mongoose.connect("mongodb+srv://coderocket:Aditya89@actionrush.c3zd5wk.mongodb.net/?retryWrites=true&w=majority");
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
  profileimg : String,
  posts:[{
    type : mongoose.Schema.Types.ObjectId,
    ref: "cardModel"
  }]
});

userSchema.plugin(plm)

module.exports = mongoose.model("user",userSchema);
