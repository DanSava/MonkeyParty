if(Meteor.isClient){
    Meteor.subscribe("allSeats");
    Meteor.subscribe("tables");

    selectedSeats = [];
    myTakenSelectedSeats = [];

    validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    countSelectedSeats = function(){
        return selectedSeats.length;
    };

    isSeatSelected = function(seat){
        for(var i=0; i<selectedSeats.length; i++) {
                if (selectedSeats[i].seat === seat.seat && selectedSeats[i].tableId === seat.tableId) return true;
        }
        return false;
    };

    isInMyTakenSelectedSeats = function (seat) {
        for(var i=0; i<myTakenSelectedSeats.length; i++) {
                if (myTakenSelectedSeats[i].seat === seat.seat && myTakenSelectedSeats[i].tableId === seat.tableId) return true;
        }
        return false;
    };

    removeSeatFromSelection = function (seat){
        for(var i=0; i<selectedSeats.length; i++) {
            if (selectedSeats[i].seat === seat.seat && selectedSeats[i].tableId === seat.tableId) {
                selectedSeats.splice(i, 1);
            }
        }
    };

    removeSeatFromMyTakenSelectedSeats = function (seat) {
        for(var i=0; i<myTakenSelectedSeats.length; i++) {
            if (myTakenSelectedSeats[i].seat === seat.seat && myTakenSelectedSeats[i].tableId === seat.tableId) {
                myTakenSelectedSeats.splice(i, 1);
            }
        }
    };

    addSelectedSeat = function(seat){
        var maxSelectedSeatCount = 5 - countMyTakenSeats();
        if (countSelectedSeats() < maxSelectedSeatCount) {
            if (!isSeatSelected(seat)){
                selectedSeats.push(seat);
            }
            else{
                removeSeatFromSelection(seat);
            }
        }
        else {
            if (isSeatSelected(seat)){
                removeSeatFromSelection(seat);
            }
        }
        return selectedSeats.length;
    };

    AdminAddSelectedSeat = function(seat){
        if (!isSeatSelected(seat)){
            selectedSeats.push(seat);
        }
        else{
            removeSeatFromSelection(seat);
        }
        return selectedSeats.length;
    };

    addSeatToMyTakenSelectedSeats = function(seat){
        if (!isInMyTakenSelectedSeats(seat)) {
            myTakenSelectedSeats.push(seat);
            Session.set('takenSelectedSeats', myTakenSelectedSeats);
        }
        else{
            removeSeatFromMyTakenSelectedSeats(seat);
            Session.set('takenSelectedSeats', myTakenSelectedSeats);
        }
        return myTakenSelectedSeats.length;
    };
    AdminAddSeatToMyTakenSelectedSeats = function(seat){
        if (!isInMyTakenSelectedSeats(seat)) {
            myTakenSelectedSeats.push(seat);
            Session.set('takenSelectedSeats', myTakenSelectedSeats);
        }
        else{
            removeSeatFromMyTakenSelectedSeats(seat);
            Session.set('takenSelectedSeats', myTakenSelectedSeats);
        }
        return myTakenSelectedSeats.length;
    };

    initContext = function() { //var doesn't work here
      canvas = document.getElementById("canvas");
      if (canvas){
          context = canvas.getContext('2d');
          canvas.width = width ;
          canvas.height = height;
      }
      // Start the setup of the table
      tables = [];
      var noTablesPerRow = 4;
      tables = tableUtils.setupTables(noTablesPerRow, width, height);
    };

    update = function() {
        if (typeof context !== 'undefined' && typeof width !== 'undefined' && typeof height !== 'undefined'){
            context.clearRect(0, 0, width, height);
            utils.drawTables(tables, context);
        }
        requestAnimationFrame(update);
    };

    getClickedTable = function (x, y) {
          var tableObj = null;
          tables.forEach(function(el, index, array) {
          if (el.isMouseOver(x, y)) {
              tableObj = {'tableId': el.id, 'tableName':el.name};
            }
      });
          return tableObj;
    };

    getClickedSeat = function(x, y) {
      var foundSeat = null;
      tables.forEach(function(el, index, array) {
              var seat = el.getClickedSeat(x, y);
              if (seat !== null) {
                  foundSeat = {'tableId': el.id, 'seat': seat.seatNo, 'tableName': el.name};
              }
      });
      return foundSeat;
  };

  getTakenSeats = function() {
      var takenSeats = {};
      var seats = Seats.find().fetch();
      if (typeof seats !== 'undefined') {
          seats.forEach(function(el, index, array) {
              var obj = {
                  'name':el.name,
                  'seat':el.seat,
                  'table':el.table
              };
              takenSeats[el.seatKey] = obj;
           });
      }
      return takenSeats;
  };

  getMyTakenSeats =  function () {
      var takenSeats = {};
      var seats = Seats.find({'owner':Meteor.userId()}).fetch();
      if (typeof seats !== 'undefined') {
          seats.forEach(function(el, index, array) {
              var obj = {
                  'name':el.name,
                  'seat':el.seat,
                  'table':el.table
              };
              takenSeats[el.seatKey] = obj;
           });
      }
      return takenSeats;
  };

  countMyTakenSeats = function () {
      return Seats.find({'owner':Meteor.userId()}).count();
  };

  isThisSeatTaken = function (seat) {
      return (seat.tableId + '_' + seat.seat in takenSeats);
  };

  isMyTakenSeat = function (seat) {
      return (seat.tableId + '_' + seat.seat in myTakenSeats);
  };

  countGuestsAtTable = function(tableId){
      // tableNumber will become talbeId
      return Seats.find({table:tableId}).count();
  };
  resetSelections = function() {
    myTakenSelectedSeats = [];
    selectedSeats = [];
    Session.set('selectedTable', null);
  };
  guestsAtTable = function (table_id) {
      return Seats.find({table:table_id}).fetch();
  };
  isSuperUser = function(){
    return Roles.userIsInRole(Meteor.user(),'super');
  };
}
