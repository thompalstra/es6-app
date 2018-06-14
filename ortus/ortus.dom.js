( function() {
  extend( HTMLCollection ).with( {
    forEach: function( callable ){
      for( let i = 0; i < this.length; i++ ){
        callable.apply( this[i], [ this[i], i ] );
      }
    }
  } );

  extend( Object ).with( {
    flatten: function( obj ){
      var output = {};
      for( var i in obj ){
        if( obj.hasOwnProperty( i ) ){
          if( typeof obj[ i ] === "object" ){
            var fl = Object.flatten( obj[ i ] );
              for( var x in fl ){
                if( fl.hasOwnProperty( x ) ){
                  output[ i + "." + x ] = fl[ x ];
                }
              }
          } else {
            output[ i ] = obj[ i ];
          }
        }
      }
      return output;
    }
  } );

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
    },
    siblings: function( querySelector ){
      var siblings = [];
      this.parentNode.children.forEach( ( node, index ) => {
        if( node !== this ){
          if( typeof querySelector === "string" ){
            if( node.matches( querySelector ) ){
              siblings.push( node );
            }
          } else {
            siblings.push( node );
          }
        }
      } );
      return siblings;
    }
  } );

  extend( HTMLInputElement ).with( {
    toggle: function(){
      if( this.type == "checkbox" ){
        this.checked = !this.checked;
        this.do( "change" );
      }
    }
  } );

} )();
