Meteor.methods({
    addRemoveTable: function (increment) {
        SettingVariables.update ({index: "000"}, {$inc: {nrTables: increment} });
    },
    checkPassword: function (txt){
        return txt === 'xxx';
    },
    isUserSeated: function (id){
        // need to restrict the search also on the user.profile.name
        var currentUserSeat = Seats.findOne({"owner":Meteor.userId(), "plusOne":false});
        if (typeof currentUserSeat !== 'undefined'){
            return currentUserSeat;
        }
        return false;
    },
    addGuest: function(guest) {
        return Seats.insert(guest);
    },
    getTakenSeats: function() {
        var takenSeats = [];
        var seats = Seats.find().fetch();
        if (typeof seats !== 'undefined') {
            seats.forEach(function(el, index, array) {
                var obj = {
                    'name':el.name,
                    'seat':el.seat,
                    'table':el.table,
                    'key':el.seatKey,
                };
                takenSeats.push(obj);
             });
        }
        return takenSeats > 0 ;
    },
    getMyTakenSeats: function () {
        var takenSeats = [];
        var seats = Seats.find({'owner':Meteor.userId()}).fetch();
        if (typeof seats !== 'undefined') {
            seats.forEach(function(el, index, array) {
                var obj = {
                    'name':el.name,
                    'seat':el.seat,
                    'table':el.table,
                    'key':el.seatKey,
                };
                takenSeats.push(obj);
             });
        }
        return takenSeats.length > 0;
    },
    clearSeats: function (selectedSeats) {
        selectedSeats.forEach(function(el, index, array) {
            var key = el.tableNo + "_" + el.seat;
            Seats.remove({owner:Meteor.userId(), seatKey:key});
         });


    }
});
