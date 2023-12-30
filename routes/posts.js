const mongoose = require('mongoose');
const users = require('./users');
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
const postSchema = mongoose.Schema({
    image : String,
    captionpost : String,
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model("cardModel",postSchema);