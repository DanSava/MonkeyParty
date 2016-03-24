Template.HomeLayout.events({
    "click #addTable": function(event, template){
        Meteor.call("addRemoveTable", 1);
    },
    "click #removeTable": function(event, template){
        Meteor.call("addRemoveTable", -1);
    }
});
Template.HomeLayout.helpers({

});

if(Meteor.isClient){
    initContext = function() { //var doesn't work here
      canvas = document.getElementById("canvas");
      context = canvas.getContext('2d');
      width = canvas.width ;
      height = canvas.height;

      return context;
    };

    update = function() {
        if (context){
            context.clearRect(0, 0, width, height);
            utils.drawTables(tables, context);
            requestAnimationFrame(update);
        }
    };

    test = function (){
        if(SettingVariables){
            return SettingVariables.findOne();
        }
        else {
            return null;
        }
    };

    refresh = function() {
        settingsInfo = test();
        noTables = settingsInfo.nrTables;
        noSeatsPerTabel = settingsInfo.nrSeatsPerTable;
        maxNrOfSeatsPerTable = settingsInfo.maxNrOfSeatsPerTable;
        noTablesPerRow = settingsInfo.nrOfTablesPerRow;
        console.log(noTables, noTablesPerRow);
        context = initContext();

        // Start the setup of the table
        tables = tableUtils.setupTables(noTables, noTablesPerRow, width, height);
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
}

Template.PickYourSeat.rendered = function(){
    console.log('rendering now....');
    if(Meteor.userId()){
        var query = SettingVariables.find({index: "000"});
        console.log(query);
        var handle = query.observeChanges({
          changed: function () {
              refresh();
          }
        });

        refresh();
        update();

        canvas.addEventListener("mousedown", function(event) {
            var selectedSeat = null;
            var selectedTable = getClickedTable(event.offsetX, event.offsetY);
            Session.set('selectedTable', selectedTable);
            if (!selectedTable) {
                selectedSeat = getClickedSeat(event.offsetX, event.offsetY);
                Session.set('selectedSeat', selectedSeat);
            }
            else {
                Session.set('selectedSeat', null);
            }
            console.log(selectedSeat, selectedTable);
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
    }
};
