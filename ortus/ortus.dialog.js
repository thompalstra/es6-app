(function(){
  extend( ortus.widgets ).with( {
    dialog: {
      Dialog: function( element, options ) {
        this.element = element;
        this.element.parent = this;

        this.create( options );
        this.registerEventListeners();
      },
      AlertDialog: function( element, options ){
        this.element = element;
        this.element.parent = this;

        this.create( options );
        this.registerEventListeners();
      },
      ConfirmDialog: function( element, options ){
        this.element = element;
        this.element.parent = this;

        this.create( options );
        this.registerEventListeners();
      }
    }
  }, true );

  extend(
    ortus.widgets.dialog.Dialog
  ).with( {
    collection: {},
    buttons: {},
    options: {},
    create: function( options ){
      this.preset( options );

      this.element.innerHTML = "";
      this.element.className = "dialog default-dialog";

      this.baseElements();

      if( this["options"]["backdrop"] !== false ){
        this.backdrop = ( this.element.parentNode.lastChild == this.element ) ?
          this.element.parentNode.appendChild( document.createElement( "div" ) ) :
          this.element.parentNode.insertBefore( document.createElement( "div" ), this.element.nextSibling );

        this.backdrop.parent = this;
        this.backdrop.className = "backdrop";

        this.backdrop.addEventListener( "click", function( event ) {
          this.parent.dismiss();
        } );
      }
    },
    registerEventListeners: function(){
      this.element.addEventListener( "dismiss", function( event ) {
        this.parent.dismiss();
      } );
      this.element.addEventListener( "confirm", function( event ) {
        this.parent.dismiss();
      } );
    }
  } );
  extend(
    ortus.widgets.dialog.AlertDialog
  ).with( {
    collection: {},
    buttons: {},
    options: {},
    create: function( options ){
      this.preset( options );

      this.element.innerHTML = "";
      this.element.className = "dialog alert-dialog";

      this.baseElements();

      if( this["options"]["backdrop"] !== false ){
        this.backdrop = ( this.element.parentNode.lastChild == this.element ) ?
          this.element.parentNode.appendChild( document.createElement( "div" ) ) :
          this.element.parentNode.insertBefore( document.createElement( "div" ), this.element.nextSibling );

        this.backdrop.parent = this;
        this.backdrop.className = "backdrop";

        this.backdrop.addEventListener( "click", function( event ) {
          this.parent.element.removeAttribute( "animate" );
          setTimeout( function(e){
            this.parent.element.setAttribute( "animate", "required" );
          }.bind( { parent: this.parent, element: this.element } ), 1 );
        }.bind( { parent: this, element: this.backdrop } ) );
      }
    },
    registerEventListeners: function(){
      this.element.addEventListener( "confirm", function( event ) {
        this.parent.dismiss();
      } );
    }
  } );
  extend(
    ortus.widgets.dialog.ConfirmDialog
  ).with( {
    collection: {},
    buttons: {},
    options: {},
    create: function( options ){
      this.preset( options );

      this.element.innerHTML = "";
      this.element.className = "dialog confirm-dialog";

      this.baseElements();

      if( this["options"]["backdrop"] !== false ){
        this.backdrop = ( this.element.parentNode.lastChild == this.element ) ?
          this.element.parentNode.appendChild( document.createElement( "div" ) ) :
          this.element.parentNode.insertBefore( document.createElement( "div" ), this.element.nextSibling );

        this.backdrop.parent = this;
        this.backdrop.className = "backdrop";

        this.backdrop.addEventListener( "click", function( event ) {
          this.parent.dismiss();
        } );
      }
    },
    registerEventListeners: function(){
      this.element.addEventListener( "dismiss", function( event ) {
        this.parent.dismiss();
      } );
      this.element.addEventListener( "confirm", function( event ) {
        this.parent.dismiss();
      } );
    },
  } );
  extend(
    ortus.widgets.dialog.Dialog,
    ortus.widgets.dialog.AlertDialog,
    ortus.widgets.dialog.ConfirmDialog
  ).with( {
    title: function( value ){
      if( typeof value === "undefined" ){
        return this.collection.title.innerHTML;
      } else {
        this.collection.title.innerHTML = value;
      }
      return this;
    },
    content: function( value ){
      if( typeof value === "undefined" ){
        return this.collection.content.innerHTML;
      } else {
        this.collection.content.innerHTML = value;
      }
      return this;
    },
    preset: function( options ){
      if( typeof options !== "undefined" ){ this.options = options; }
      if( this.timeout ){ clearTimeout( this.timeout ); }
    },
    baseElements: function(){
      this.collection.title = this.element.appendChild( document.createElement( "div" ) );
      this.collection.title.className = "title component";
      this.collection.content = this.element.appendChild( document.createElement( "div" ) );
      this.collection.content.className = "content component";
      this.collection.actions = this.element.appendChild( document.createElement( "div" ) );
      this.collection.actions.className = "actions component";
    },
    buttons: function( opt ){

      if( this instanceof ortus.widgets.dialog.AlertDialog ){
        opt = [
          { label: "Ok", action: "confirm" }
        ];
      }

      if( typeof opt === "undefined" ){
        this.buttons = opt;
      } else {
        opt.forEach( ( option ) => {
          var btn = this.collection.actions.appendChild( document.createElement( "button" ) );
          btn.innerHTML = option.label;
          btn.dataset[ "action" ] = option.action;

          btn.className = ( typeof option["className"] !== "undefined" ) ?
            options.className :
            "button button-text info";

          btn.addEventListener( "click", function( event ) {
            this.parent.element.dispatchEvent( new CustomEvent( this.element.dataset["action"], {
              cancelable: true,
              bubbles: true
            } ) );
          }.bind( {
            element: btn,
            parent: this
          } ) );
        } );
      }
      return this;
    },
    dismiss: function( timeInMs ){
      if( typeof timeInMs === "undefined" ){ timeInMs = 500; }
      this.element.classList.add("dismissing");

      this.timeout = setTimeout( function( event ) {
        this.element.classList.remove("show");
        this.element.innerHTML = "";

        if( this.backdrop ){
            this.backdrop.remove();
        }

        clearTimeout( this.timeout );
      }.bind( this ), timeInMs );
    },
    show: function( timeInMs  ){
      if( typeof timeInMs === "undefined" ){ timeInMs = 500; }

      setTimeout( ( e ) => {
        this.element.classList.add("show");
      }, 1 );
    },
    hide: function( timeInMs ){
      if( typeof timeInMs === "undefined" ){ timeInMs = 500; }
      this.element.classList.remove("show");
      if( $d.find(".dialog.show").length == 0 ){
        document.body.classList.remove("data-active-backdrop");
      }
    }
  } );


  if( typeof window["Dialog"] === "undefined" ){
    window.Dialog = ortus.widgets.dialog.Dialog;
  }
  if( typeof window["ConfirmDialog"] === "undefined" ){
    window.ConfirmDialog = ortus.widgets.dialog.ConfirmDialog;
  }
  if( typeof window["AlertDialog"] === "undefined" ){
    window.AlertDialog = ortus.widgets.dialog.AlertDialog;
  }

})();
