if(Meteor.isClient){
    Meteor.subscribe("settingVariables");
    Meteor.subscribe("allSeats");
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
                if (selectedSeats[i].seat === seat.seat && selectedSeats[i].tableNo === seat.tableNo) return true;
        }
        return false;
    };
    isInMyTakenSelectedSeats = function (seat) {
        for(var i=0; i<myTakenSelectedSeats.length; i++) {
                if (myTakenSelectedSeats[i].seat === seat.seat && myTakenSelectedSeats[i].tableNo === seat.tableNo) return true;
        }
        return false;
    };

    removeSeatFromSelection = function (seat){
        for(var i=0; i<selectedSeats.length; i++) {
                if (selectedSeats[i].seat === seat.seat && selectedSeats[i].tableNo === seat.tableNo) {
                    selectedSeats.splice(i, 1);
                }
        }
    };
    removeSeatFromMyTakenSelectedSeats = function (seat) {
        for(var i=0; i<myTakenSelectedSeats.length; i++) {
                if (myTakenSelectedSeats[i].seat === seat.seat && myTakenSelectedSeats[i].tableNo === seat.tableNo) {
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
    addSeatToMyTakenSelectedSeats = function(seat){
        if (!isInMyTakenSelectedSeats(seat)){
            myTakenSelectedSeats.push(seat);
        }
        else{
            removeSeatFromMyTakenSelectedSeats(seat);
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
      if (typeof noTables !== 'undefined' && typeof noTablesPerRow !== 'undefined'){
          tables = tableUtils.setupTables(noTables, noTablesPerRow, width, height);
      }
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
               tableObj = {'tableNo': index};
            }
      });
          return tableObj;
    };

    getClickedSeat = function(x, y) {
      var seatInfo = null;
      tables.forEach(function(el, index, array) {
              var seat = el.getClickedSeat(x, y);
              if (seat !== null) {
                  seatInfo =  {'tableNo': index, 'seat': seat.seatNo};
              }
      });
      return seatInfo;
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
      return (seat.tableNo + '_' + seat.seat in takenSeats);
  };
  isMyTakenSeat = function (seat) {
      return (seat.tableNo + '_' + seat.seat in myTakenSeats);
  };
  countGuestsAtTable = function(tableNumber){
      return Seats.find({table:tableNumber}).count();
  };
}
