window.EventManager = function(){}, window.$e = EventManager;

let device = localStorage.getItem( "device" );

window.startTime = new Date();

window.timeouts = {};
window.intervals = {};

window.device = new ( function(){

  this.update = function(){
    localStorage.setItem( "device", JSON.stringify( this ) );
  }

  this.setAccessibility = function(){
    var template = "\
      html, body{\
        font-size: {fontSize}\
      }\
    ";
    $d.one( "style#template" ).innerHTML = $o.template( template, window.device.accessibility );
  }

  if( localStorage.getItem( "device" ) ){
    var data = JSON.parse( localStorage.getItem( "device" ) );

    for( var i in data ){
      this[ i ] = data[ i ];
    }
  } else {
    this.settings = {
      isDeveloper: false
    };
    this.accessibility = {
      fontSize: "24px"
    };
    this.update();
  }

  this.interval = function( name, callable, time ){
    if( callable === null || typeof window.intervals[ name ] == "number" ){
      clearInterval( window.intervals[ name ] );
      delete window.intervals[ name ];
    }

    if( typeof callable === "function" ){
      window.intervals[ name ] = setInterval( function( e ) {
        callable.call( name, e );
      }.bind( name ), time );
    }
  }
} );

extend( EventManager ).with( {
  handle: function( target, dataSet ){

    var action = dataSet.action;
    var params = dataSet.params;

    if( typeof this[ action ] === "function" ){
      this[ action ].apply( this, params );
    } else if( typeof target[ action ] === "function" ){
      this[ action ].apply( target, params );
    } else {
      throw new Error( `Undefined function ${action} in EventManager` );
    }
  },
  load: function( href, target, evalJs ){
    var target = target ? $d.one( target ) : this;
    target.load( href, evalJs );
  },
  setActiveMenuItem: function( querySelector ){
    var menuItem = $d.one(querySelector);
    menuItem.classList.add("active");
    menuItem.siblings(".active").forEach( ( node ) => {
      node.classList.remove("active");
    } );
  },
  toggle: function( target ){
    var target = $d.one( target );
    target.toggle();
  }
}, true );

$d.on("click", "[data-on='click']", function( event ) {
  event.preventDefault();
  $e.handle.apply( $e, [ this, JSON.parse( this.dataset.params ) ] );
} );

$d.on( "input", "input[type='range'].range.range-default", function ( event ) {
  this.setAttribute( "value", this.value );
} )

document.addEventListener( "DOMContentLoaded", function( event ) {
  window.device.setAccessibility();
  $d.one("body").load( "/html/main.html", true )
    .then( function( res ) {
    } )
} );
document.on( "ajax.loading", function( event ) {
} );
document.on( "ajax.loaded", function( event ) {
} );
