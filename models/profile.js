var mongoose = require("mongoose");

var profileSchema = new mongoose.Schema({
   Time: String,
   Year: String,
   interest: String,
   createdAt: { type: Date, default: Date.now },
   q1: String,
   q2: String,
   q3: String, 
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Profile", profileSchema);

