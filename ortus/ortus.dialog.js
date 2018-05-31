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
    create: function( options ){
      this.collection.title = this.element.appendChild( document.createElement( "div" ) );
      this.collection.title.className = "title";
      this.collection.content = this.element.appendChild( document.createElement( "div" ) );
      this.collection.content.className = "content";
      this.collection.actions = this.element.appendChild( document.createElement( "div" ) );
      this.collection.actions.className = "actions";
    },
    registerEventListeners: function(){
      this.element.addEventListener( "dismiss", function( event ) {
        this.parent.dismiss();
      } );
      this.element.addEventListener( "confirm", function( event ) {
        this.parent.dismiss();
      } );
    },
    buttons: function( opt ){
      if( typeof opt === "undefined" ){
        this.buttons = opt;
      } else {
        opt.forEach( ( option ) => {
          var btn = this.collection.actions.appendChild( document.createElement( "button" ) );
          btn.innerHTML = option.label;
          btn.dataset[ "action" ] = option.action;
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
    }
  } );
  extend(
    ortus.widgets.dialog.AlertDialog
  ).with( {
    collection: {},
    buttons: {},
    create: function( options ){
      this.collection.title = this.element.appendChild( document.createElement( "div" ) );
      this.collection.title.className = "title";
      this.collection.content = this.element.appendChild( document.createElement( "div" ) );
      this.collection.content.className = "content";
      this.collection.actions = this.element.appendChild( document.createElement( "div" ) );
      this.collection.actions.className = "actions";

      var btnConfirm = this.collection.actions.appendChild( document.createElement( "button" ) );
      btnConfirm.innerHTML = "Confirm";
      btnConfirm.dataset[ "action" ] = "confirm";
      btnConfirm.addEventListener( "click", function( event ) {
        this.parent.element.dispatchEvent( new CustomEvent( "confirm", {
          cancelable: true,
          bubbles: true
        } ) )
      }.bind( {
        parent: this,
        element: btnConfirm
      } ) );
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
    create: function( options ){
      this.collection.title = this.element.appendChild( document.createElement( "div" ) );
      this.collection.title.className = "title";
      this.collection.content = this.element.appendChild( document.createElement( "div" ) );
      this.collection.content.className = "content";
      this.collection.actions = this.element.appendChild( document.createElement( "div" ) );
      this.collection.actions.className = "actions";
    },
    registerEventListeners: function(){
      this.element.addEventListener( "dismiss", function( event ) {
        this.parent.dismiss();
      } );
      this.element.addEventListener( "confirm", function( event ) {
        this.parent.dismiss();
      } );
    },
    collection: {},
    buttons: {},
    buttons: function( opt ){
      if( typeof opt === "undefined" ){
        this.buttons = opt;
      } else {
        opt.forEach( ( option ) => {
          var btn = this.collection.actions.appendChild( document.createElement( "button" ) );
          btn.innerHTML = option.label;
          btn.dataset[ "action" ] = option.action;
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
    }
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
    dismiss: function( timeInMs ){
      this.element["style"]["transition"] = timeInMs + "ms";
      this.element.classList.remove("show");
      this.timeout = setTimeout( function( event ) {
        // this.element.remove();
      }, timeInMs );
    },
    show: function(  ){

    },
    hide: function(  ){

    }
  } );

  console.log( ortus.widgets.dialog.Dialog.dismiss );

})()
