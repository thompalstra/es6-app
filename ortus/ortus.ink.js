( function() {
  extend( Node ).with( {
    getRealPos: function( originalEvent ){

      var pos = { x: 0, y: 0 };

      if( typeof originalEvent["offsetX"] === "undefined" && typeof originalEvent["offsetY"] === "undefined" ){
        pos = {
          x: originalEvent.touches[0].clientX - this.offsetLeft,
          y: originalEvent.touches[0].clientY - this.offsetTop
        };
      } else {
        pos = {
          x: originalEvent.offsetX,
          y: originalEvent.offsetY
        };
      }

      if( originalEvent.target != this ){

        var n = originalEvent.target;
        while( n ){
          if( n !== this ){
            pos.x = ( pos.x - n.offsetLeft );
            pos.y = ( pos.y - n.offsetTop );
            n = n.parentNode
          } else {
            n = false;
          }

        }
      }
      return pos;
    }
  } );


  $d.on( "mousedown touchstart", ".paper", function( event ) {
    if( this.ink ){
      this.ink.remove();
    }
    
    this.ink = this.appendChild( document.createElement( "div" ) );
    this.ink.className = "ink";

    var s = Math.max( this.offsetHeight, this.offsetWidth );

    var pos = this.getRealPos( event );

    var x = pos.x - ( s / 2 );
    var y = pos.y - ( s / 2 );

    this.ink["style"]["height"] = `${s}px`;
    this.ink["style"]["width"] = `${s}px`;
    this.ink["style"]["top"] = `${y}px`;
    this.ink["style"]["left"] = `${x}px`;

    this.ink["style"]["transition"] = "5000ms";
    this.ink["style"]["transform"] = "scale(2)";
    this.ink["style"]["opacity"] = "1";

  } );
  $d.on( "mouseout mouseup touchend", ".paper", function( event ) {
    if( this.ink ){
      this.ink["style"]["transition"] = "";
      this.ink["style"]["opacity"] = "0";
    }
  } );
} )();
