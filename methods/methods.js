Meteor.methods({
    addRemoveTable: function (increment) {
        SettingVariables.update ({index: "000"}, {$inc: {nrTables: increment} });
    }
});
