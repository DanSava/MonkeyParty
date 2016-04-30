Seats = new Mongo.Collection("seats");

Seats.allow({
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

SeatsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
    },
    owner: {
        type: String,
        label: "Owner",
        autoValue:function () {
            return this.userId;
        }
    },
    seat: {
        type: Number,
        label: "Seat Number"
    },
    table: {
        type: String,
        label: "Table id"
    },
    plusOne: {
        type: Boolean,
        label: "Is a plus one"
    },
    seatKey: {
        type: String,
        label: "The seat key tableId_seatNo"
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            return new Date();
        }
    }
});

Seats.attachSchema( SeatsSchema);
