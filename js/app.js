window.EventManager = function(){}, window.$e = EventManager;

extend( EventManager ).with( {
  handle: function( node, event ){
    if( typeof node.dataset.action !== "undefined" ){
      if( typeof this[ node.dataset.action ] === "function" ){
        this[ node.dataset.action ].apply( this, [ node, event ] );
      } else { throw new Error(`Error handling 'on-event': Eventmanager.${node.dataset.action} is undefined`); }
    } else { throw new Error(`Error handling 'on-event': 'data-action' is undefined`); }
  },
  load: function( node, event ){
    ( node.dataset.target ? $d.one(node.dataset.target) : node ).load( node.dataset.href, node.dataset.evalJs );
  }
}, true );

$d.on("click", "[data-on='click']", function( event ) {
  $e.handle.apply( $e, [ this, event ] );
} );

document.addEventListener( "DOMContentLoaded", function( event ) {
  // setTimeout( (e) => {
    $d.one("body").load( "/html/main.html", true );
  // }, 1000 );
} )
