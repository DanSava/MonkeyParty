SettingVariables = new Mongo.Collection("settingVariables");
SettingVariables.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});

SettingVariablesSchema = new SimpleSchema({
    index:{
        type: String,
        label: "Index",
        autoValue:function () {
            return "000";
        }
    },
    nrTables:{
        type: Number,
        label: "Number of tabales",
    },
    nrSeatsPerTable:{
        type: Number,
        label: "Number of seats at a table",
        autoValue:function () {
            return 10;
        }
    },
    maxNrOfSeatsPerTable:{
        type: Number,
        label: "Maximum number of seats at a table",
        autoValue:function () {
            return 14;
        }
    },
    nrOfTablesPerRow:{
        type: Number,
        label: "Number of tabales per row",
        autoValue:function () {
            return 4;
        }
    },
});

SettingVariables.attachSchema( SettingVariablesSchema);
