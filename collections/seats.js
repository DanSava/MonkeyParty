Seats = new Mongo.Collection("seats");


SeatsSchema = new SimpleSchema({
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
    },
    table: {
        type:String,
        label: "table",
    }
});

Seats.attachSchema( SeatsSchema);
