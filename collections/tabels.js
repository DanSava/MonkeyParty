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

TablesSchema = SimpleSchema({
    name:{
        type: String,
        label: "Name",
    },
    desc: {
        type: String,
        label: "Description",
    },
    author:{
        type: String,
        label: "author",
        autoValue:function () {
            return this.userId;
        }
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function () {
            return new Date();
        }
    }
});

Tables.attachSchema( TablesSchema);
