( function() {
  extend( ortus ).with( {
    helpers: {
      decodeUrl: function( url  ){
        var obj = {};
        if( url.indexOf( "?" ) > -1 ){
          obj[0] = url.substring( 0, url.indexOf( "?" ) );
          url.substring( url.indexOf( "?" ) + 1, url.length ).split( "&" ).forEach( ( param ) => {
            var split = param.split( "=" );
            obj[ split[0] ] = split[1];
          } )
        } else {
          obj[0] = url;
        }
        return obj;
      },
      encodeUrl: function( object ){
        var url = object[0];
        delete object[0];
        var query = [];
        Object.keys( object ).forEach( ( key ) => {
          query.push( `${key}=${object[key]}` );
        } );

        if( query.length > 0 ){ url = url + "?" + query.join("&"); }

        return url;
      },
      url: function( url, key, value ){
        var decodedUrl = this.decodeUrl( url );
        if( typeof value === "undefined" ){
          return decodedUrl[ key ] || null;
        } else if( value === null ) {
          delete decodedUrl[ key ];
          return this.encodeUrl( decodedUrl );
        } else {
          decodedUrl[ key ] = value;
          return this.encodeUrl( decodedUrl );
        }
      }
    },
    post: function( url, query, options ){
      options.method = "POST";
      return fetch( ortus.helpers.encodeUrl( Object.assign( query , { 0: url } ) ), options );
    },
    get: function( url, query, options ){
      options.method = "GET";
      return fetch( ortus.helpers.encodeUrl( Object.assign( query , { 0: url } ) ), options );
    },
    json: function( url, query, options ){
      return fetch( ortus.helpers.encodeUrl( Object.assign( query , { 0: url } ) ), options ).then( response => response.json() );
    },
  }, true );
  extend( Node ).with( {
    load: function( url, evalJs ){
      fetch( url )
      .then( response => response.text() )
      .then( ( response ) => {
        this.innerHTML = response;

        if( Boolean( evalJs ) === true ){
          this.querySelectorAll( "script" ).forEach( ( script ) => {
            var newScript = this.appendChild( document.createElement( "script" ) );
            newScript.innerHTML = script.innerHTML;
            script.remove();
          } );
        }
      } );
    }
  } )
} )();
