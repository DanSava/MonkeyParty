if (Meteor.isClient) {
utils = {
  distance: function(p0, p1) {
    var dx = p1.x - p0.x,
      dy = p1.y - p0.y;
      return Math.sqrt(dx * dx + dy * dy);
  },
  paritcleDistance: function(p0, p1) {
    var dx = p1.x - p0.x,
      dy = p1.y - p0.y;
      return Math.sqrt(dx * dx + dy * dy);
  },

  distanceXY: function(x0, y0, x1, y1) {
    var dx = x0 - x1,
      dy = y0 - y1;
      return Math.sqrt(dx * dx + dy * dy);
  },
  circleCollision: function (c0, c1) {
    return utils.distance(c0, c1) <= c0.radius + c1.radius;
  },
  particleCollisionTest: function (p0, p1) {
    return utils.paritcleDistance(p0, p1) <= p0.radius + p1.radius;
  },
  pointCircelCollision: function (p, c) {
    return utils.distance(p, c) <= c.radius;
  },
  ///
  /// Particle Utils
  ///
  boundParticleToRect: function(particle, width, height) {
    if (particle.x - particle.radius > width) {
      particle.x = (- particle.radius);
    }
    if (particle.x + particle.radius < 0) {
      particle.x = (width + particle.radius );
    }
    if (particle.y - particle.radius  > height) {
      particle.y = ( - particle.radius);
    }

    if (particle.y + particle.radius  < 0) {
      particle.y = (height + particle.radius );
    }
  },
   drawParticle: function(part, context, color) {
    part.update();
    context.beginPath();
    context.arc(part.x, part.y, part.radius , 0, Math.PI * 2, false);
    if (color) {
      context.fillStyle = color;
      context.fill();
      context.fillStyle = 'black';
    }
    else{
      context.fill();
    }
  },
  drawParticles: function (particles, context) {
    particles.forEach(function(el, index, array) {
      utils.drawParticle(el, context);
    });
  },
  drawSeat: function(seat, tableId, seatIdx, context){
      context.save();
      context.beginPath();
      var isSeatSelected = false;
      var isThisSeatTakeByMeAndSelected = false;

      var isSeatTaken = (tableId + '_' + seatIdx in takenSeats);
      var myTakenSeat = (tableId + '_' + seatIdx in myTakenSeats);

      for(var j=0; j<myTakenSelectedSeats.length; j++) {
          if (myTakenSelectedSeats[j].seat === seatIdx && myTakenSelectedSeats[j].tableId === tableId) {
                isThisSeatTakeByMeAndSelected = true;
          }
      }
      for(var i=0; i<selectedSeats.length; i++) {
          if (selectedSeats[i].seat === seatIdx && selectedSeats[i].tableId === tableId) {
                isSeatSelected = true;
          }
      }

      if (seat.mouseOver && !isSeatSelected && !isSeatTaken){
          context.shadowColor = '#999';
          context.shadowBlur = 1;
          context.shadowOffsetX = 5;
          context.shadowOffsetY = 5;
      }
      else if (seat.mouseOver && myTakenSeat) {
          context.shadowColor = '#999';
          context.shadowBlur = 1;
          context.shadowOffsetX = 5;
          context.shadowOffsetY = 5;
      }

      context.arc(seat.particle.x, seat.particle.y, seat.particle.radius, 0, Math.PI * 2, false);
      if (isSeatSelected && !isSeatTaken){
          context.fillStyle = '#0066ff';
          context.fill();
      }
      else if (isThisSeatTakeByMeAndSelected) {
          context.fillStyle = '#00ccff';
          context.fill();
      }
      else if (isSeatTaken && !myTakenSeat){
          context.fillStyle = '#e60000';
          context.fill();
      }
      else if (myTakenSeat) {
          context.fillStyle = '#e6e600';
          context.fill();
      }
      else{
          context.fillStyle = '#269900';
          context.fill();
      }
      context.restore();

  },
  drawSeats:function(seats, tableId, context) {
      seats.forEach(function(el, index, array) {
        utils.drawSeat(el, tableId, index, context);
      });
  },
  drawTable: function (table, context){
      var part = table.particle;
      context.save();
      // draw the big table
      context.beginPath();
      context.arc(part.x, part.y, part.radius , 0, Math.PI * 2, false);
      context.font = 'bold 20pt Calibri';

      if (table.mouseOver) {
          context.lineWidth = 5;
          context.stroke() ;
        }
        var selectedTable = Session.get("selectedTable");
        var isTableSelected = selectedTable && selectedTable.tableId === table.id;
        if (isTableSelected){
            context.lineWidth = 5;
            context.stroke() ;
        }
        else{
            context.lineWidth = 3;
            context.stroke() ;
        }
      context.restore();

      //draw the table seats
      utils.drawSeats(table.seats, table.id, context);

  },
  drawTables: function (tables, context){
      tables.forEach(function(el, index, array) {
        utils.drawTable(el, context);
      });
  },

  bounceParticleInRect: function (p, width, height, bounce) {
    bounce = bounce || -1;
    if (p.x + p.radius > width) {
      p.x = width - p.radius;
      p.vx = p.vx * bounce;
    }
    if (p.x - p.radius < 0) {
      p.x = p.radius;
      p.vx = (p.vx * bounce);
    }
    if (p.y + p.radius > height) {
      p.y = (height - p.radius);
      p.vy = (p.vy * bounce);
    }
    if (p.y - p.radius < 0) {
      p.y = (p.radius);
      p.vy = (p.vy * bounce);
    }
  }
};
// =====================================================
// =====================================================
// =====================================================

particle = {
      gravity: 0,
      mass: 1,
      radius: 0,
      friction: 1,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,

      create : function (x, y, speed, direction, grav, radius) {
        var obj = Object.create(this);
        obj.x = x;
        obj.y = y;
        obj.vx = Math.cos(direction) * speed;
        obj.vy = Math.sin(direction) * speed;
        obj.gravity =  grav || 0;
        obj.radius = radius || 0;
        return obj;
      },

      update: function () {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
      },

      accelerate: function(ax, ay) {
        this.vx += ax;
        this.vy += ay;
      },

      angleTo: function (p2) {
          return Math.atan2(p2.y - this.y,
                p2.x - this.x);
      },
      distanceTo: function (p2){
        var dx = p2.x - this.x,
            dy = p2.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
      },

      gravitateTo: function(p2) {
        var dx = p2.x - this.x,
            dy = p2.y - this.y,
            distSQ = dx * dx + dy * dy,
            dist = Math.sqrt(distSQ),
            force = p2.mass / distSQ,
            angle = this.angleTo(p2);
            this.vx += dx / dist * force;
            this.vy += dy / dist * force;
      },

      isOutOfWinRect: function (width, height) {
        if (this.x - this.radius > width ||
            this.y - this.radius > height ||
            this.x + this.radius < 0 ||
            this.y + this.radius < 0 ){

            return true;
          }
      }
     };
 // =====================================================
 // SEAT
 // =====================================================
     seat = {
       particle : null,
       mouseOver: false,

       create : function (x, y, radius) {
         var obj = Object.create(this);
         obj.particle = particle.create(x, y, 0, 0, 0, radius);
         return obj;
       },
       checkMouseOver: function (x, y){
           var p = {'x':x,
                    'y':y};
           var c = {'x':this.particle.x,
                    'y':this.particle.y,
                    'radius':this.particle.radius};
             if (utils.pointCircelCollision(p, c)) {
                 this.mouseOver = true;
             }
             else {
                 this.mouseOver = false;
             }
           return this.mouseOver;
       },
       isMouseOver: function (x, y) {
         var p = {'x':x,
                  'y':y};
         var c = {'x':this.particle.x,
                  'y':this.particle.y,
                  'radius':this.particle.radius};
         return utils.pointCircelCollision(p, c);
       },

       update : function () {
       },
     };
// =====================================================
// Table Js
// =====================================================
     table = {
       particle : null,
       nrSeats: 0,
       seats:[],
       mouseOver: false,
       id:'',
       name:'',

       create : function (x, y, radius, nrSeats, id, name) {
         var obj = Object.create(this);
         obj.particle = particle.create(x, y, 0, 0, 0, radius);
         // add the seats to the table
         obj.seats = [];
         obj.id = id;
         obj.name = name;
         var slice = Math.PI * 2 / nrSeats;
         for (var i = 0; i < nrSeats; i += 1) {
             angle = i * slice;
             xs = x + Math.cos(angle) * (radius * 1.25);
             ys = y + Math.sin(angle) * (radius * 1.25);
             obj.seats.push(seat.create(xs, ys, radius * 0.25));
       }
         return obj;
       },
       checkMouseOver: function(x, y){
           var p = {'x':x,
                    'y':y};
           var c = {'x':this.particle.x,
                    'y':this.particle.y,
                    'radius':this.particle.radius};
             if (utils.pointCircelCollision(p, c)) {
                 this.mouseOver = true;
             }
             else {
                 this.mouseOver = false;
                 this.seats.forEach(function(el, index, array) {
                         el.checkMouseOver(x, y);
                  });
             }
           return this.mouseOver;
       },
       isMouseOver: function (x, y) {
         var p = {'x':x,
                  'y':y};
         var c = {'x':this.particle.x,
                  'y':this.particle.y,
                  'radius':this.particle.radius};
         return utils.pointCircelCollision(p, c);
       },
       getClickedSeat: function (x, y) {
         var seat = null;
         this.seats.forEach(function(el, index, array) {
             if (el.isMouseOver(x, y)) {
               seat = {'seatNo': index};
             }
          });
          return seat;
       },
       update : function () {
       },

     };

tableUtils = {
setupTables: function(NoTablesPerRow, width, height, tableList){
   var tables = [];
   var tableRadius = height * 2 / 28,
    // Will need to be by user id later when commercial product is developed.
       noTables = tableList.length,
       no_table_rows = Math.ceil(tableList.length /NoTablesPerRow),
       prevHight = height / (no_table_rows * 2),
       prevWidth = width / (NoTablesPerRow * 2);
       // Init the tables
       for (i = 0; i < no_table_rows; i++) {
           for (j = 0; j < NoTablesPerRow; j++) {
               if (i * NoTablesPerRow + j + 1 <= noTables) {
                   var idx = i * NoTablesPerRow  + j;
                   tables.push(table.create(prevWidth, prevHight, tableRadius, tableList[idx].nrSeats, tableList[idx]._id, tableList[idx].name));
               }
               prevWidth += width * (1/NoTablesPerRow);
           }
           prevHight += height / no_table_rows;
           prevWidth = width/(NoTablesPerRow * 2);
       }
   return tables;
}
};
}
