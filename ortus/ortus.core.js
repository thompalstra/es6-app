( function() {
  window.ortus = function( arg ){
    if( typeof arg === "function" ){
      window.ortus.on( "ready", arg );
    }
  }, window.$o = ortus;

  window.doc = document,
    window.$d = document;

  window.win = window,
    window.$w = window;

  window.extend = function(){
    return {
      list: arguments,
      with: function( data, prop ){
        for( let i = 0; i < this.list.length; i++ ){
          for( let d in data ){
            ( ( this.list[i].prototype && prop !== true )  ? this.list[i].prototype : this.list[i] )[d] = data[d];
          }
        }
      }
    }
  }

  extend( ortus ).with( {
    events: [],
    widgets: {},
    on: function( eventType, callable ){
      if( typeof this.events[ eventType ] === "undefined" ){ this.events[ eventType ] = []; }

      this.events[ eventType ].push( callable );
    },
    do: function( eventType, options ){
      if( typeof options === "undefined" ){
        options = { cancelable: true, bubbles: true };
      } else if( typeof options === "boolean" ){
        options = { cancelable: options, bubbles: options };
      }
      var event = new CustomEvent( eventType, options );
      this.dispatchEvent( event );
      return event;
    },
    dispatchEvent: function( event ){
      if( typeof this.events[ event.type ] === "undefined" ){ return; }

      for( let i = 0; i < this.events[ event.type ].length; i++ ){
        this.events[ event.type ][ i ].call( this, event );
        if( event.defaultPrevented ){ break; }
      }
    }
  }, true );
  extend( Node ).with( {
    find: function( querySelector ){
      return this.querySelectorAll( querySelector );
    },
    one: function( querySelector ){
      return this.querySelector( querySelector );
    },
    on: function( eventTypes, b, c, d ){
      eventTypes.split( " " ).forEach( ( eventType ) => {
        if( typeof b === "function" ){
          this.addEventListener( eventType, b );
        } else if( typeof b === "string" && typeof c === "function" ){
          this.addEventListener( eventType, ( originalEvent ) => {
            var closest;
            if( originalEvent.target.matches( b ) ){
              c.call( originalEvent.target, originalEvent );
            } else if( ( closest = originalEvent.target.closest( b ) ) ){
              c.call( closest, originalEvent );
            }
          } )
        }

      } );
    },
    do: function( eventType, options ){
      if( typeof options === "boolean" ){ options = { cancelable: options, bubbles: options }; }
      var event = new CustomEvent( eventType, options );
      this.dispatchEvent( event );
      return event;
    }
  } );

  document.addEventListener( "DOMContentLoaded", ( event ) => {
    $o.do( "ready" );
  } )
} )();
