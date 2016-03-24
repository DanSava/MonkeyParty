if (Meteor.isClient) {
  window.onload = function() {
        canvas = document.getElementById("canvas");
        console.log(canvas);
  		context = canvas.getContext("2d");
  		width = canvas.width ;
  		height = canvas.height;
  		tables = [];

  	// Number of tables
  	function setupTables(noTables, NoTablesPerRow){
  		tables = [];
  		width = canvas.width;
  		height = canvas.height;
  		var tableRadius = height * 2 / 28,
  			no_table_rows = Math.ceil(noTables /NoTablesPerRow),
  			prevHight = height / (no_table_rows * 2),
  			prevWidth = width / (NoTablesPerRow * 2);

  			// Init the tables
  			for (i = 0; i < no_table_rows; i++) {
  				for (j = 0; j < NoTablesPerRow; j++){
                    if (i * NoTablesPerRow + j + 1 <= noTables){
                        tables.push(table.create(prevWidth, prevHight, tableRadius, 10));
                    }
  					prevWidth += width * (1/NoTablesPerRow);
  				}
  				prevHight += height / no_table_rows;
  				prevWidth = width/(NoTablesPerRow * 2);
  		    }
  	}

  	function getClickedTable(x, y) {
  			var tableObj = null;
  			tables.forEach(function(el, index, array) {
            if (el.isMouseOver(event.clientX, event.clientY)){
  						tableObj = {'table' : el, 'tableNo': index};
  		      }
        });
  			return tableObj;
  	}
  	function getClickedSeat(x, y) {
  		var seatInfo = null;
  		tables.forEach(function(el, index, array) {
  					var seat = el.getClickedSeat(x, y);
  					if (seat !== null) {
  						seatInfo =  {'table': el, 'tableNo': index, 'seat': seat};
  					}
  		});
  		return seatInfo;
  	}

  	setupTables(14,4);
  	update();

  	canvas.addEventListener("mousedown", function(event) {
  		console.log(getClickedSeat(event.offsetX, event.offsetY));
        console.log(event.offsetX, event.offsetY);
        console.log(event);

  	});

  	canvas.addEventListener("mousemove", function(event) {
        document.body.style.cursor = "default";
  		tables.forEach(function(el, index, array) {
            if (el.checkMouseOver(event.offsetX, event.offsetY)){
              document.body.style.cursor = "pointer";
              console.log('Mouse click over table:', index);
  		  }
          });
  	});
  	window.addEventListener("resize", function (event) {
  		setupTables(14, 4);
  	} );


  	function update() {
  		context.clearRect(0, 0, width, height);
   		utils.drawTables(tables, context);
  		requestAnimationFrame(update);
  	}
    };

}

Template.Test.helpers({
  formValue: function () {
    return Session.get("formValue");
  }
});

Template.Test.events({
    'click .openModal': function () {
        $('#modalView')
          .modal({
            onDeny    : function(){
              console.log('canceled');
              return false;
            },
            onApprove : function() {
              var modalInputValue = $('#modalInputValue').val();
              Session.set("formValue", modalInputValue);
              console.log(modalInputValue);
            }
          }).modal('show');
      },
      'click .cashmere': function () {
          console.log("click registered!");
      }
});
Template.Test.rendered = function(){
  this.$('.test').popup({
      inline   : true,
      hoverable: true,
      position : 'bottom left',
      delay: {
        show: 300,
        hide: 800
      }
  });
  this.$('.ui.embed').embed();
};
