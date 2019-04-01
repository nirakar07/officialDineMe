var express = require("express");
var router  = express.Router();
var Profile = require("../models/profile");

var User = require("../models/user");
var middleware = require("../middleware");

var { isLoggedIn, checkUserProfile,  isAdmin, isSafe } = middleware; // destructuring assignment

// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//INDEX - show all profiles
router.get("/", function(req, res){
  if(req.query.search && req.xhr) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all profiles from DB
      Profile.find({name: regex}, function(err, allProfiles){
         if(err){
            console.log(err);
         } else {
            res.status(200).json(allProfiles);
         }
      });
  } else {
      // Get all profiles from DB
      Profile.find({}, function(err, allProfiles){
         if(err){
             console.log(err);
         } else {
            if(req.xhr) {
              res.json(allProfiles);
            } else {
                var bool = false;
            //     Profile.findById().exec(function (err, story) {
            //   if (err) return console.log(err); 
            //     if (story === null) bool = true;
            console.log(req.user);
              res.render("profiles/index",{profiles: allProfiles, page: 'profiles', user: req.user});
                // });
            }
        
         }
      });
  }
});

// CREATE - add new profile to DB
router.post("/", isLoggedIn, function(req, res){
  // get data from form and add to profiles array
  var name = req.body.name;
  var gender = req.body.gender;
  var desc = req.body.description;
  var interest = req.body.interest;
  var dtf = req.body.dtf;
  var image = req.body.image;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var year = req.body.year;

    var newProfile = {name: name, image: image, gender: gender, description: desc, year: year, interest: interest, dtf: dtf, author:author};
    // Create a new Profile and save to DB
    Profile.create(newProfile, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to profiles page
            console.log(newlyCreated);
            res.redirect("/profiles");
        }
  });
});


//NEW - show form to create new profile
router.get("/new", isLoggedIn, function(req, res){
   res.render("profiles/new"); 
});




// EDIT - shows edit form for a profile
router.get("/:id/edit", isLoggedIn, checkUserProfile, function(req, res){
  //render edit template with that profile
  res.render("profiles/edit", {profile: req.profile});
});

// PUT - updates profile in the database
router.put("/:id", function(req, res){
 
    var newData = {name: req.body.name, gender: req.body.gender, image: req.body.image, description: req.body.description, year: req.body.year, interest: req.body.interest, dtf: req.body.dtf};
    Profile.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, profile){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/profiles/" + profile._id);
        }
  });
});



module.exports = router;
