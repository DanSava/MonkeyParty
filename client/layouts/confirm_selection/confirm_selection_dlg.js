
function resetSelection(){
    seatkeys = [];
    guestSeats = [];
    Session.set("clickedSeats", []);
    selectedSeats = [];
}
function clearCSFErros(){
    CSFErrors = [];
    Session.set('CSFErrors', CSFErrors);
}

function validateCSF(selectionData) {
    CSFErrors = [];
    if(seatkeys.length > 0){
        seatkeys.forEach(function(el, index, array) {
            if (selectionData[el.key] === '') {
                CSFErrors.push('Please enter a guest name for table ' + el.tableName + ' seat ' + el.seat);
            }
         });
    }
    Session.set("CSFErrors", CSFErrors);
    return CSFErrors.length === 0 ;
}

Template.ConfirmSelectionDialog.helpers({
    seats: function(){
        var clickedSeats = Session.get("clickedSeats");
        var isUserSeated = Session.get("isUserSeated");
        guestSeats = [];
        var currentUserSeat = Session.get("currnetUserSeat");
        if(typeof clickedSeats !== 'undefined' && isSuperUser()) {
          guestSeats = clickedSeats;
        }
        else if (typeof clickedSeats !== 'undefined' && clickedSeats.length > 0 && !isUserSeated ) {
            Session.set('currnetUserSeat', clickedSeats[0]);
            guestSeats = clickedSeats.slice(1, clickedSeats.length);
        }
        else{
            guestSeats = clickedSeats;
        }
        seatkeys = [];
        guestSeats.forEach(function(el, index, array) {
            var seatInfo = {
                'seat':el.seat + 1,
                'table': el.tableId,
                'key': el.tableId  + '_' + el.seat,
                'tableName': el.tableName,
            };
            seatkeys.push(seatInfo);
         });

        return seatkeys;
    },
    isCurrentUserSeatingVisible : function() {
        if(isSuperUser()) {
          return false;
        }
        var isUserSeated = Session.get("isUserSeated");
        if(typeof isUserSeated !== 'undefined'){
            return !Session.get("isUserSeated");
        }
        return true;
    },
    currentUserName : function () {
        return Meteor.user().profile.name;
    },
    currentUserTable : function () {
        var currentUserSeat = Session.get('currnetUserSeat');
        if (currentUserSeat){

            return currentUserSeat.tableName;
        }
    },
    currentUserSeat : function () {
        var currentUserSeat = Session.get('currnetUserSeat');
        if (currentUserSeat){
            return currentUserSeat.seat + 1; // might want to check when table names are added to return the table name
        }
    },
    CSFErrors: function (){
        return Session.get("CSFErrors");
    },
    CSFErrorsPresent: function() {
        var errs = Session.get("CSFErrors");
        if(typeof errs !== 'undefined'){
            return errs.length > 0;
        }
        else {
         return false;
        }
    }
});
Template.ConfirmSelectionDialog.events({
    "click #submitBtn": function(event, template){
        var selectionData = {};
        clearCSFErros();
        var isUserSeated = Session.get("isUserSeated");
        var currentUserSeat = Session.get('currnetUserSeat');
        if(seatkeys.length > 0) {
            seatkeys.forEach(function(el, index, array) {
                selectionData[el.key] = $('#' + el.key).val();
             });
            if (validateCSF(selectionData)) {
                // Adding the current user first if needed
                if(!isUserSeated && !isSuperUser()) {
                    var guest = {
                        'name': Meteor.user().profile.name,
                        'seat':currentUserSeat.seat,
                        'table':currentUserSeat.tableId,
                        'plusOne': false,
                        'seatKey':currentUserSeat.tableId +'_' + currentUserSeat.seat
                    };
                    Meteor.call("addGuest", guest, function(error, result){
                        if(error){
                            CSFErrors.push(err.reason);
                            Session.set('CSFErrors', CSFErrors);
                        }
                    });
                }
                seatkeys.forEach(function(el, index, array) {
                    var guest = {
                        'name': selectionData[el.key],
                        'seat':el.seat - 1,
                        'table':el.table,
                        'plusOne': true,
                        'seatKey':el.key
                    };
                    Meteor.call("addGuest", guest, function(error, result){
                        if(error){
                            CSFErrors.push(err.reason);
                            Session.set('CSFErrors', CSFErrors);
                        }
                    });

                 });
            }
            if (CSFErrors.length === 0) {
                $('#confirmSelectionDlg').modal('hide');
                resetSelection();
            }
        }
        else{
            if(!isUserSeated) {
                var currentUserGuest = {
                    'name': Meteor.user().profile.name,
                    'seat':currentUserSeat.seat,
                    'table':currentUserSeat.tableId,
                    'plusOne': false,
                    'seatKey':currentUserSeat.tableId +'_' + currentUserSeat.seat
                };
                Meteor.call("addGuest", currentUserGuest, function(error, result){
                    if(error){
                        CSFErrors.push(err.reason);
                        Session.set('CSFErrors', CSFErrors);
                    }
                });
            }
            if (CSFErrors.length === 0) {
                $('#confirmSelectionDlg').modal('hide');
                resetSelection();
            }
        }
    }
});
