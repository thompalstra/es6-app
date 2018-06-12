window.EventManager = function(){}, window.$e = EventManager;

extend( EventManager ).with( {
  handle: function( node, dataSet ){

    var action = dataSet.action;
    var params = dataSet.params;


    if( typeof node[ action ] === "function" ){
        node[ action ].apply( node, params );
    } else { throw new Error(`Error handling 'on-event': Eventmanager.${action} is undefined`); };
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
  }
}, true );

$d.on("click", "[data-on='click']", function( event ) {
  event.preventDefault();
  var set = JSON.parse( this.dataset.params );
  $e.handle.apply( $e, [ $e, JSON.parse( this.dataset.params ) ] );
} );

document.addEventListener( "DOMContentLoaded", function( event ) {
  $d.one("body").load( "/html/main.html", true )
    .then( function( res ) {
    } )
} );
document.on( "ajax.loading", function( event ) {
} );
document.on( "ajax.loaded", function( event ) {
} );
