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
        type: Number,
        label: "Table Number"
    },
    plusOne: {
        type: Boolean,
        label: "Is a plus one"
    },
    seatKey: {
        type: String,
        label: "The seat key tableNo_seatNo"
    },
});

Seats.attachSchema( SeatsSchema);
