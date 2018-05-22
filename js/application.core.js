let application = function() {

}, app = application, $a = application;

let doc = document,
  $d = doc;

let win = window,
  $w = win;

let extend = function(){
  return {
    list: arguments,
    with: function( object, forceProperty ){
      for( let i = 0; i < this.list.length; i++ ){
        Object.keys( object ).forEach( ( key ) => {
           ( typeof this.list[i].prototype == "object" && forceProperty !== true ? this.list[i].prototype : this.list[i] )[ key ] = object[ key ];
        } );
      }
    }
  };
}

extend( application ).with( {
  typeof: function( arg, type ){
    switch( type ){
      case Array:
        return ( Array.isArray( arg ) );
      break;
      case Boolean:
        return ( typeof arg === "boolean" );
      break;
      case Function:
        return ( typeof arg === "function" );
      break;
      case Object:
        return ( typeof arg === "object" && arg !== null && !Array.isArray( arg ) );
      break;
      case String:
        return ( typeof arg === "string" );
      break;
    }
  },
  isArray: function( arg ){
    return $a.typeof( arg, Array );
  },
  isBool: function( arg ){
    return $a.typeof( arg, Boolean );
  },
  isFunction: function( arg ){
    return $a.typeof( arg, Function );
  },
  isObject: function( arg ){
    return $a.typeof( arg, Object );
  },
  isString: function( arg ){
    return $a.typeof( arg, String );
  },
  flatten: function( item, flattenArrays ){
    var output = {};
    Object.keys( item ).forEach( ( key ) => {
  		if ( Object.isObject( item[ key ] ) || ( flattenArrays === true && Array.isArray( item[ key ] ) ) ) {
  			var flatItem = this.flatten(item[key]);
        Object.keys( flatItem ).forEach( ( fkey ) => {
  				output[key + '.' + fkey] = flatItem[fkey];
  			} );
  		} else {
  			output[key] = item[key];
  		}
  	} );
  	return output;
  },
  template: function( template, item ){
    item = this.flatten( item );
    Object.keys( item ).forEach( ( key ) => {
      template = template.replace( new RegExp( "{" + key + "}", 'g' ), item[ key ] );
    } );
    return template;
  },
  do: function( eventType, opt ){
    if( typeof opt === "boolean" ){ opt = { cancelable: opt, bubbles: opt } }

    var customEvent = new CustomEvent( eventType, opt );
    this.dispatchEvent( customEvent );
  },
  on: function( eventTypes, b ){
    eventTypes.split( " " ).forEach( ( eventType ) => {
      this.addEventListener( eventType, b );
    } );
  },
  dispatchEvent: function( event ){
    var eventType = event.type;
    if( typeof this.events[ eventType ] != "undefined" && this.typeof( this.events[ eventType ], Array ) ){
      this.events[ eventType ].forEach( ( callable ) => {
        callable.call( this, event );
      } )
    }
  },
  addEventListener: function( eventType, callable ){
    if( typeof this.events[ eventType ] == "undefined" ){
      this.events[ eventType ] = [];
    }
    this.events[ eventType ].push( callable );
  },
  events: []
}, ( forceProperty = true ) );

if( typeof Array.isArray === "undefined" ) { Array.isArray = $a.isArray; }
if( typeof String.isString === "undefined" ) { String.isString = $a.isString; }
if( typeof Object.isObject === "undefined" ) { Object.isObject = $a.isObject; }
if( typeof Boolean.isBool === "undefined" ) { Boolean.isBool  = $a.isBool; }
if( typeof Function.isFunction === "undefined" ) { Function.isFunction  = $a.isFunction; }

extend( Element, Node, Document ).with( {
  one: function( querySelector ){
    if( String.isString( querySelector ) ){
      return this.querySelector( querySelector );
    } else {
      throw new Error( "Invalid selector." );
    }
  },
  find: function( querySelector ){
    if( String.isString( querySelector ) ){
      return this.querySelectorAll( querySelector );
    } else {
      throw new Error( "Invalid selector." );
    }
  },
  on: function( eventTypes, b, c, d ){
    eventTypes.split( " " ).forEach( ( eventType ) => {
      if( $a.typeof( b, Function ) ){
        this.addEventListener( eventType, b );
      } else if( $a.typeof( b, String ) && $a.typeof( c, Function ) ){
        this.addEventListener( eventType, ( originalEvent ) => {
          if( originalEvent.target.matches( b ) ){
            c.call( originalEvent.target, originalEvent );
          } else if( d !== false && ( closest = originalEvent.target.closest( b ) ) ){
            c.call( closest, originalEvent );
          }
        } );
      }
    } );
  },
  do: function( eventType, opt ){
    if( typeof opt === "boolean" ){ opt = { cancelable: opt, bubbles: opt } }
    var customEvent = new CustomEvent( eventType, opt );
    this.dispatchEvent( customEvent );
  },
  create: function( html ){
    var el = document.createElement( "div" );
    el.innerHTML = html;
    return el.children[0];
  },
  load: function( url ){
    return fetch( url, {
      method: "GET",
      cache: false,
      mode: "no-cors",
      origin: "same-origin"
    } )
    .then( response => response.text() )
    .then( ( response ) => {
      var tmp = new DOMParser().parseFromString(response, 'text/html');
      this.innerHTML = tmp.head.innerHTML + tmp.body.innerHTML;

      this.querySelectorAll( "script" ).forEach( ( script ) => {
        var ns = document.createElement( "script" );
        ns.innerHTML = script.innerHTML;
        script.parentNode.replaceChild( ns, script );
      } );
    } );
  }
} );

$d.on( "DOMContentLoaded", ( originalEvent ) => {
  $a.do( "ready", true );
} );
