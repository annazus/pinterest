// code to run on server at startup
Slingshot.fileRestrictions("pinterest-uploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
  maxSize: null //10 * 1024 * 1024 // 10 MB (use null for unlimited).
});

if (Meteor.isServer)
  Slingshot.createDirective("pinterest-uploads", Slingshot.S3Storage, {
    bucket: "appliedar-pinterest",
    region: "us-west-2",
    // acl: "public-read",

    authorize: function() {
      //Deny uploads if user is not logged in.
      if (!this.userId) {
        var message = "Please login before posting files";
        throw new Meteor.Error("Login Required", message);
      }
      // if (!metaContext.id) throw new Meteor.Error("id required", "id required");

      return true;
    },

    key: function(file, metaContext) {
      //Store file into a directory by the user's username.
      var user = Meteor.users.findOne(this.userId);
      console.log(metaContext.id);
      return metaContext.id + file.name;
      // return metaContext.id;
    }
    //   allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  });
