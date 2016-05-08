Meteor.methods({
    addTable: function (table) {
        if (table !== null) {
            Tables.insert(table);
        }
    },
    removeTable: function (table) {
        if (table !== null) {
            Tables.remove({_id:table.tableId});
        }
    },
    updateTableName : function(table){
        if (table) {
            return Tables.update({_id:table.tableId}, {$set:{name: table.tableName} });
        }
    },
    checkPassword: function (txt){
        return txt === 'dsgg0309';
    },
    isUserSeated: function (id){
        // need to restrict the search also on the user.profile.name
        var currentUserSeat = Seats.findOne({"owner":Meteor.userId(), "plusOne":false});
        if (typeof currentUserSeat !== 'undefined') {
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
    removeGuest: function (selectedSeats) {
      if (Roles.userIsInRole(Meteor.user(),'super')) {
        selectedSeats.forEach(function(el, index, array) {
            var key = el.tableId + "_" + el.seat;
            Seats.remove({seatKey:key});
         });
      }
      else {
        selectedSeats.forEach(function(el, index, array) {
            var key = el.tableId + "_" + el.seat;
            Seats.remove({owner:Meteor.userId(), seatKey:key});
         });

      }
    }
});
