( function() {
  extend( Node ).with( {
    addClass: function( className ){
      this.classList.add( className );
    },
    removeClass: function( className ){
      this.classList.remove( className );
    },
    hasClass: function( className ){
      return this.classList.contains( className );
    },
    attr: function( key, value ){
      if( value === null ){
        this.removeAttribute( key );
      } else if( typeof key === "object" ){
        for( let i in key ){
          this.setAttribute( i, key[i] );
        }
      } else if( typeof value === "undefined" ){
        return this.getAttribute( key );
      } else {
        return this.setAttribute( key, value );
      }
    },
    css: function( key, value ){
      if( value === null ){
        this.style[ key ] = "";
      } else if( typeof key === "object" ){
        for( var i in key ){
          this["style"][ i ] = key[ i ];
        }
      } else if( typeof value === "undefined" ){
        return this.style[ key ];
      } else {
        this.style[ key ] = value;
      }
    },
    show: function(){
      this["style"]["display"] = "";
    },
    hide: function(){
      this["style"]["display"] = "none";
    }
  } );
} )();
