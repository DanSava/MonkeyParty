if (Meteor.isServer) {
  Meteor.startup(function () {
    // Check if there is an admin
    if (Meteor.users.find({ "emails.address" : "admin@home.com" }).count() < 1) {
      var user_id = Accounts.createUser({
        email: "admin@home.com",
        password: 'dsgg1109',
        username: 'Admin',
        profile: {name:'Super User'}
      });
        Meteor.users.update({_id:user_id}, {$set:{'emails.0.verified': true}});
        Roles.addUsersToRoles(user_id, 'super');
    }
    if (SettingVariables.find().count() === 0) {
        var newRecord = {
            'nrTables':1,
            'nrSeatsPerTable':10,
            'maxNrOfSeatsPerTable':14,
            'nrOfTablesPerRow':4
        };
        SettingVariables.insert(newRecord);
    }
    // else {
    //     var x = SettingVariables.findOne();
    //     SettingVariables.remove({_id:x._id});
    // }


  });
  Meteor.publish("settingVariables", function(){
      return SettingVariables.find();
  });
  Meteor.publish("tables", function(){
      return Tables.find();
  });
}
