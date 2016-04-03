Template.AdminMenu.events({
    "click #addTable": function(event, template){
        Meteor.call("addRemoveTable", 1);
    },
    "click #removeTable": function(event, template){
        Meteor.call("addRemoveTable", -1);
    }
});
Template.UserMenu.helpers({
    selectionMade: function () {
        // Does not work like this is called only once when the page is loaded for the first time. is not updating when a selection is mande
        console.log( 'called ');
       if (typeof selectedSeats !== 'undefined' && selectedSeats.length > 0){
           return '';
       }
       return 'disabled';
    }
});

Template.PickYourSeat.helpers({
    initSettings: function () {
        settingsInfo = SettingVariables.find().fetch()[0];
        takenSeats = getTakenSeats();
        myTakenSeats = getMyTakenSeats();

        if (typeof settingsInfo !== 'undefined'){
            noTables = settingsInfo.nrTables;
            noSeatsPerTabel = settingsInfo.nrSeatsPerTable;
            maxNrOfSeatsPerTable = settingsInfo.maxNrOfSeatsPerTable;
            noTablesPerRow = settingsInfo.nrOfTablesPerRow;
        }
        if(typeof canvas !== 'undefined') {
            initContext();
        }
        update();
        return SettingVariables.find();
    },
    isTableSelected: function  () {
        console.log(Session.get('selectedTable'));
        return !Session.equals('selectedTable', null);
    }
});
Template.ListWithPeopleAtTable.helpers({
    guestsSeatingAtTable: function (){
        if(!Session.equals('selectedTable', null)){
            selectedTableNo = Session.get('selectedTable').tableNo;
            return Seats.find({table:selectedTableNo});
        }
    }
});
Template.UserMenu.events({
    'click #confirmSelectionBtn': function (event, template) {
        Session.set('CSFErrors', []); // reseting the error message if preveiouse error messages were present.
        Meteor.call("isUserSeated", Meteor.userId(), function(error, result){
            if(error){
                console.log("error", error);
                Session.set('isUserSeated', false);
            }
            Session.set('isUserSeated', true);
            if (result){
                console.log(result);
                // Session.set("currnetUserSeat", something);
            }
            else{
                Session.set('isUserSeated', false);
                Session.set("currnetUserSeat", null);
            }
        });
        if(selectedSeats.length > 0){
            Session.set("clickedSeats", selectedSeats);
            $('#confirmSelectionDlg').modal('show');
        }
        else{
            alert('Please selecte a seat first');
        }
    },
    'click #clearSelectionBtn': function (evt, tmp){
        Meteor.call("clearSeats", myTakenSelectedSeats, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){

            }
        });
        myTakenSelectedSeats = [];
    },
    'click #showAllGuestsBtn': function (evt, tmp){
        Session.set('listAllGuests', !Session.get('listAllGuests'));
    }
 });


Template.PickYourSeat.rendered = function(){
    width = $('.test111').width() - 20;
    height = 0.6 * width;
    initContext();
    canvas.addEventListener("mousedown", function(event) {
        var selectedSeat = null;
        var selectedTable = getClickedTable(event.offsetX, event.offsetY);
        Session.set('selectedTable', selectedTable);
        if (!selectedTable) {
            selectedSeat = getClickedSeat(event.offsetX, event.offsetY);
            if (selectedSeat) {
                var isSeatTaken = isThisSeatTaken(selectedSeat);
                var myTakenSeat = isMyTakenSeat(selectedSeat);
                if (!isSeatTaken) {
                    addSelectedSeat(selectedSeat);
                }
                else if (myTakenSeat){
                    addSeatToMyTakenSelectedSeats(selectedSeat);
                }
            }
        }
        console.log(selectedSeats, selectedTable);
    });

    canvas.addEventListener("mousemove", function(event) {
        document.body.style.cursor = "default";
        tables.forEach(function(el, index, array) {
            if (el.checkMouseOver(event.offsetX, event.offsetY)) {
              document.body.style.cursor = "pointer";
            //   console.log('Mouse click over table:', index + 1);
          }
      });
    });

    window.addEventListener('resize', function(event, tmp) {
        width = $('.test111').width() - 20;
        height = 0.6 * width;
        initContext();
        // console.log(' resize detected!', window.innerWidth, window.innerHeight);
    });
};

Template.NotSoFastDlg.events({
    'keypress .invitationPass': function(evnt, tmp) {
        console.log('here');
         var pass = tmp.find('#invitationPass').value;
         if (evnt.keyCode === 13 && pass !== '') {
             console.log('pass check after enter');
             Meteor.call("checkPassword", pass, function(error, result){
                 if(error){
                     console.log("error", error);
                 }
                 if(result){
                     console.log();
                      $('#loginModal').modal('show');
                 }
             });
         }
     }
 });
 Template.HomeLayout.events({
 'click #joinThePartyBtn': function () {
     if (!Meteor.user()){
         $('#notSoFastDlg').modal(
         {
             onApprove : function() {}
           }).modal('show');
       }
     }
 });
Template.HomeBigHeaderImage.helpers({
    joinThePartyBtnLbl : function(){
        if (Meteor.user()) {
            return "Welcome " + Meteor.user().profile.name;
        }
        return "Join the Party";
    }
});
Template.HomeContent.helpers({
    nrGuests: function(){
        return Seats.find().count();
    }
});
Template.GuestList.helpers({
    listAllGuests: function() {
        return Session.get('listAllGuests');
    },
    guestsByTable: function(){
        var guestsbytable = [];
        if (Session.get('listAllGuests')){
            for (var i =0; i < noTables; i++){
                if (countGuestsAtTable(i) > 0) {
                    guestsbytable.push(Seats.find({table:i}));
                }
            }
        }
        return guestsbytable;
    }

});
