////////////////////////////////////////////////////////////////////////////////
//ListWithPeopleAtTable
////////////////////////////////////////////////////////////////////////////////
Template.ListWithPeopleAtTable.helpers({
    guestsSeatingAtTable: function (){
        if(!Session.equals('selectedTable', null)){
            selectedTableId = Session.get('selectedTable').tableId;
            return guestsAtTable(selectedTableId);
        }
    },
    selectedTableName: function () {
        selTable = Session.get('selectedTable');
        if (selTable) {
            return Tables.findOne({_id:selTable.tableId}).name;
        }
    },
    formatDate:  function (date) {
      return moment(date).fromNow();
    }
});

////////////////////////////////////////////////////////////////////////////////
//GuestList
////////////////////////////////////////////////////////////////////////////////
Template.GuestList.helpers({
    guestsByTable: function() {
        var guestsbytable = [];
        var tablesList = Tables.find().fetch();
        for (var i =0; i < tablesList.length; i++) {
            if (countGuestsAtTable(tablesList[i]._id) > 0) {
                var table = {
                    'name': tablesList[i].name,
                    'seats': guestsAtTable(tablesList[i]._id),
                };
                guestsbytable.push(table);
            }
        }
        return guestsbytable;
    },
    formatDate:  function (date) {
      return moment(date).fromNow();
    }
});

////////////////////////////////////////////////////////////////////////////////
//AdminMenu
////////////////////////////////////////////////////////////////////////////////
Template.AdminMenu.events({
    "click #addTable": function(event, template){
        var table = {
            'name':"Table Name",
            'desc': "Table Description",
            'nrSeats': 10
        };
        Meteor.call("addTable", table);
    },
    "click #removeTable": function(event, template) {
        var selTable =  Session.get('selectedTable');
        if (selTable) {
          resetSelections();
          Meteor.call("removeTable", selTable);
        }
    },
    "click #editTableName": function(event, template) {
        var selTable =  Session.get('selectedTable');
        if (selTable) {
            $('#addTableDlg').modal('show');
        }
    },
    "click #adminRemoveGuest": function(event, template) {
      Meteor.call("removeGuest", myTakenSelectedSeats, function(error, result){
          if(error){
              console.log("error", error);
          }
          if(result){

          }
      });
      myTakenSelectedSeats = [];
    },
    "click #adminAddGuest": function(event, template) {
      Session.set('CSFErrors', []); // reseting the error message if preveiouse error messages were present.
      Session.set('isUserSeated', false);
      Session.set("currnetUserSeat", null);

      if(selectedSeats.length > 0) {
          Session.set("clickedSeats", selectedSeats);
          $('#confirmSelectionDlg').modal('show');
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
        if(selectedSeats.length > 0) {
            Session.set("clickedSeats", selectedSeats);
            $('#confirmSelectionDlg').modal('show');
        }
    },
    'click #confirmClearSelection': function (evt, tmp){
        Meteor.call("removeGuest", myTakenSelectedSeats, function(error, result){
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
         Session.set('tableList',getAllTables());
         if(typeof canvas !== 'undefined') {
             initContext(Session.get('tableList'));
         }
         updateCanvas();
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
    height = 0.4 * width;
    initContext(getAllTables());
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
                  if (Roles.userIsInRole(Meteor.user(),'super')){
                      AdminAddSelectedSeat(selectedSeat);
                  }
                  else {
                    addSelectedSeat(selectedSeat);
                  }
                }
                else if (myTakenSeat){
                    addSeatToMyTakenSelectedSeats(selectedSeat);
                }
                else if (Roles.userIsInRole(Meteor.user(),'super')) {
                  AdminAddSeatToMyTakenSelectedSeats(selectedSeat);
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
        height = 0.4 * width;
        initContext(getAllTables());
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
    loginBntLbl: function( ){
      if (Meteor.user()) {
          return "Log Out ";
      }
      return "Join the Party";
    }
});

Template.HomeBigHeaderImage.events({
  'click #loginBtn' : function (evt, tmp) {
    if (Meteor.user()){
      Meteor.logout();
    } else {
      $('#notSoFastDlg').modal( {
          onApprove : function() {}
        }).modal('show');
    }
  },
  'click #langEng' : function (evt, tmp) {
    Session.set('language', 'eng');
  },
  'click #langRo' : function (evt, tmp) {
    Session.set('language', 'ro');
  },
  'click #langSp' : function (evt, tmp) {
    Session.set('language', 'sp');
  },
  'click #langNl' : function (evt, tmp) {
    Session.set('language', 'nl');
  }
});

Template.HomeBigHeaderImage.rendered = function(){
  this.$('.languagedropdown').dropdown();
};

////////////////////////////////////////////////////////////////////////////////
//HomeContent
////////////////////////////////////////////////////////////////////////////////
Template.HomeContent.helpers({
    nrGuests: function(){
        return Seats.find().count();
    }
});
