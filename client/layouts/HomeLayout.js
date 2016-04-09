////////////////////////////////////////////////////////////////////////////////
//ListWithPeopleAtTable
////////////////////////////////////////////////////////////////////////////////
Template.ListWithPeopleAtTable.helpers({
    guestsSeatingAtTable: function (){
        if(!Session.equals('selectedTable', null)){
            selectedTableId = Session.get('selectedTable').tableId;
            return Seats.find({table:selectedTableId});
        }
    },
    selectedTableName: function () {
        selTable = Session.get('selectedTable');
        if (selTable) {
            return selTable.tableName;
        }
    }
});


////////////////////////////////////////////////////////////////////////////////
//AdminMenu
////////////////////////////////////////////////////////////////////////////////
Template.AdminMenu.events({
    "click #addTable": function(event, template){
        var table = {
            'name':"xx",
            'desc': "xxx",
            'nrSeats': 10
        };
        Meteor.call("addTable", table);
    },
    "click #removeTable": function(event, template) {
        var selTable =  Session.get('selectedTable');
        if (selTable) {
            Meteor.call("removeTable", selTable);
            resetSelections();
        }
    },
    "click #editTableName": function(event, template) {
        var selTable =  Session.get('selectedTable');
        if (selTable) {
            $('#addTableDlg').modal('show');
        }
    },

});


////////////////////////////////////////////////////////////////////////////////
//UserMenu
////////////////////////////////////////////////////////////////////////////////
Template.UserMenu.helpers({
    remainingInvitations: function() {
        // Retrurn the number guests that can be added by the current user.
        return 5 - countMyTakenSeats();
    },
    takenSeatsSelected: function() {
        var x = Session.get('takenSelectedSeats');
        return x.length > 0;
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
            if (result){
                Session.set('isUserSeated', true);
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
    'click #confirmClearSelection': function (evt, tmp){
        Meteor.call("clearSeats", myTakenSelectedSeats, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){

            }
        });
        myTakenSelectedSeats = [];
        tmp.$('#clearSelectionBtn').popup('hide');
        Session.set('takenSelectedSeats', []);
    },
 });

////////////////////////////////////////////////////////////////////////////////
//PickYourSeat
////////////////////////////////////////////////////////////////////////////////
 Template.PickYourSeat.helpers({
     initSettings: function () {
         takenSeats = getTakenSeats();
         myTakenSeats = getMyTakenSeats();

         if(typeof canvas !== 'undefined') {
             initContext();
         }
         update();
         return Tables.find().count();
     },
     isTableSelected: function  () {
         return !Session.equals('selectedTable', null);
     }
 });

Template.PickYourSeat.rendered = function(){
    this.$('#confirmSelectionBtn').popup({
        position : 'top left',
        delay: {
          show: 800,
        }
    });
    this.$('#clearSelectionBtn').popup({
        position : 'bottom right',
        inline   : true,
        hoverable: true,
        delay: {
          show: 300,
          hide: 100
        }
    });

    width = $('.canvas_element').width() - 20;
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
    });

    canvas.addEventListener("mousemove", function(event) {
        document.body.style.cursor = "default";
        tables.forEach(function(el, index, array) {
            if (el.checkMouseOver(event.offsetX, event.offsetY)) {
              document.body.style.cursor = "pointer";
          }
      });
    });

    window.addEventListener('resize', function(event, tmp) {
        width = $('.canvas_element').width() - 20;
        height = 0.6 * width;
        initContext();
        // console.log(' resize detected!', window.innerWidth, window.innerHeight);
    });
 };


////////////////////////////////////////////////////////////////////////////////
//NotSoFastDlg
////////////////////////////////////////////////////////////////////////////////
Template.NotSoFastDlg.events({
    'keypress .invitationPass': function(evnt, tmp) {
         var pass = tmp.find('#invitationPass').value;
         if (evnt.keyCode === 13 && pass !== '') {
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
    },
    'click #checkPassBtn': function (evnt, tmp) {
        var pass = tmp.find('#invitationPass').value;
        Meteor.call("checkPassword", pass, function(error, result) {
            if(error){
                console.log("error", error);
            }
            if(result){
                 $('#loginModal').modal('show');
            }
        });
    }
 });

 ////////////////////////////////////////////////////////////////////////////////
 //HomeLayout
 ////////////////////////////////////////////////////////////////////////////////
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

 ////////////////////////////////////////////////////////////////////////////////
 //HomeBigHeaderImage
 ////////////////////////////////////////////////////////////////////////////////
Template.HomeBigHeaderImage.helpers({
    joinThePartyBtnLbl : function(){
        if (Meteor.user()) {
            return "Welcome " + Meteor.user().profile.name;
        }
        return "Join the Party";
    }
});

////////////////////////////////////////////////////////////////////////////////
//HomeContent
////////////////////////////////////////////////////////////////////////////////
Template.HomeContent.helpers({
    nrGuests: function(){
        return Seats.find().count();
    }
});

////////////////////////////////////////////////////////////////////////////////
//GuestList
////////////////////////////////////////////////////////////////////////////////
Template.GuestList.helpers({
    guestsByTable: function(){
        var guestsbytable = [];
        var tablesList = Tables.find().fetch();
        for (var i =0; i < tablesList.length; i++){
            if (countGuestsAtTable(tablesList[i]._id) > 0) {
                guestsbytable.push(Seats.find({table:tablesList[i]._id}));
            }
        }
        return guestsbytable;
    },
    selectedTableName: function () {
        selTable = Session.get('selectedTable');
        if (selTable) {
            return selTable.tableName;
        }
    }
});
