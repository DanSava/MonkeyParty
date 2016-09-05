////////////////////////////////////////////////////////////////////////////////
//GuestList
////////////////////////////////////////////////////////////////////////////////
Template.GuestList.helpers({
    guestsByTable: function() {
        var guestsbytable = [];
        var tablesList = getAllTables();
        for (var i =0; i < tablesList.length; i++) {
            if (countGuestsAtTable(tablesList[i]._id) > 0) {
                var table = {
                    'name': tablesList[i].name,
                    'seats': guestsAtTable(tablesList[i]._id),
                    'id': tablesList[i]._id
                };
                guestsbytable.push(table);
            }
        }
        return guestsbytable;
    },
    formatDate:  function (date) {
      return moment(date).fromNow();
    },
    isTableSelected: function(id) {
        if(!Session.equals('selectedTable', null)){
            if (id === Session.get('selectedTable').tableId){
                return "blue";
            }
        }
        return "green";
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
    "click #addEmptySeat": function(event, template) {
        var selTable =  Session.get('selectedTable');
        if (selTable) {
          Meteor.call("addTableSeat", selTable);
        }
    },
    "click #removeEmptySeat": function(event, template) {
        var selTable =  Session.get('selectedTable');
        if (selTable) {
            Meteor.call("removeTableSeat", selTable);
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
//PickYourSeat
////////////////////////////////////////////////////////////////////////////////
 Template.PickYourSeat.helpers({
     initSettings: function () {
         takenSeats = getTakenSeats();
         myTakenSeats = getMyTakenSeats();
         Session.set('tableList',getAllTables());

         if(typeof canvas !== 'undefined') {
             initContext(Session.get('tableList'));
              Session.set('takenSeatsSession', getTakenSeats());
         }
         updateCanvas();
     },
     isTableSelected: function  () {
         return !Session.equals('selectedTable', null);
     }
 });

Template.PickYourSeat.rendered = function(){
    width = $('.canvas_element').width() - 20;
    $('.canvas_element').on('tap', function(evt){
      console.log(evt);
      console.log(evt.clientX, evt.clientY);
    });

    var interactionHelperFucntion = function (event){
      var posX = 0;
      var posY = 0;
      if (event.type === "mousedown"){
          posX = event.offsetX;
          posY = event.offsetY;
      }
      else if (event.type === "touchstart") {
          posX = event.touches['0'].screenX;
          posY = event.touches['0'].screenY;
      }
      okCancelButtons.forEach(function(el, index, array) {
        if (el.checkClick(posX, posY) && el.btnType === 1) {
          confirmSelectionAction();
        }
        else if (el.checkClick(posX, posY) && el.btnType === 0) {
          cancelSelectionAction();
        }
      });
      var selectedSeat = null;
      var selectedTable = getClickedTable(posX, posY);
      Session.set('selectedTable', selectedTable);
      if (!selectedTable) {
          selectedSeat = getClickedSeat(posX, posY);

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
    }
    height = 0.4 * width;

    initContext(getAllTables());

    canvas.addEventListener("touchstart", function(event) {
      interactionHelperFucntion(event)
    });

    canvas.addEventListener("mousedown", function(event) {
      interactionHelperFucntion(event);
    });

    canvas.addEventListener("mousemove", function(event) {
        document.body.style.cursor = "default";
        tables.forEach(function(el, index, array) {
            if (el.checkMouseOver(event.offsetX, event.offsetY)) {
              document.body.style.cursor = "pointer";
          }
      });
        okCancelButtons.forEach(function(el, index, array) {
          el.checkMouseOver(event.offsetX, event.offsetY);
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
         $('#notSoFastDlg').modal('show');
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
