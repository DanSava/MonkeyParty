Tables = new Mongo.Collection("tables");

Tables.allow({
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

TablesSchema = new SimpleSchema({
    owner: {
        type: String,
        label: "Owner",
        autoValue:function () {
            return this.userId;
        }
    },
    name:{
        type: String,
        label: "Name",
    },
    desc: {
        type: String,
        label: "Description",
    },
    nrSeats: {
        type: Number,
        label: "Number of seats",
    }
});

Tables.attachSchema(TablesSchema);
