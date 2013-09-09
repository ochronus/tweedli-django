var ThingModel = Backbone.Model.extend({

   defaults: {
      order: 0,
      title: ''
   }

});

var ThingCollection = Backbone.Collection.extend({

   model: ThingModel,
   comparator: 'order'

});

var ThingItem = Backbone.View.extend({

   template:  $('#post-item-template')[0].innerHTML,


   render: function () {

      this.$el.html( Mustache.render(this.template, {name: this.model.get('title'), id: this.model.id}));

      return this;
   }

});

var ThingList = Backbone.View.extend({

   tagName: 'ul',

   itemView: ThingItem,

   _listItems: null,
   _listIsSyncing: false,

   orderAttr: 'order',

   render: function () {

      this._listItems = {};

      this.listenTo( this.collection, 'sync reset', this.listSync );

      this.listSync();

      return this;
   },

   events: {
      'sortupdate'                           :  'handleSortComplete'
   },

   /**
   * Respond to the Sortable's update event.
   *
   * Iterate over each view in the list and use its position relative to
   * its siblings to set the ordering attribute on the associated model
   *
   * This does not appear to trigger a resort on the collection so
   * explicitly do this so downstream processing is working with the
   * right order of the models.
   *
   */

   handleSortComplete: function () {

      var oatr = this.orderAttr;

      _.each( this._listItems, function ( v ) {
            v.model.set(oatr, v.$el.index());
         });

      this.collection.sort({silent: true});
      this.listSetup();

      this.trigger('sorted');
   },


   /**
   * Configure the UI.
   *
   * Ensure the Sortable widget is initialized on the list.
   *
   */

   listSetup: function () {

      var $ods = this.$('li');

      if ( $ods.length == 1 ) {
         if ( this.$el.data('ui-sortable') )
            this.$el.sortable('destroy');
      } else {
         this.$el.sortable({
             containment: 'parent',
             tolerance: 'pointer',
             placeholder: "ui-state-highlight",
             handle: ".sort-handle"
         });
      }

   },

   /**
   * Respond to collection resets or syncs and rebuid the list
   *
   */

   listSync: function () {

      var list = this.collection.models

      this._listIsSyncing = true;

      _.invoke( this._listItems, 'remove' );
      this._listItems = {};

      for ( var m in list )
         this.listAdd( list[m] );

      this._listIsSyncing = false;

      this.listSetup();

   },

   /**
   * Respond to collection add event by adding a new view to the list
   * and binding it to the model being added
   *
   */

   listAdd: function ( model ) {

      var v;

      if ( !this._listItems[model.cid] ) {
         v = this._listItems[model.cid] = new this.itemView({ model: model });
         this.$el.append(v.render().$el);
      }

      if ( !this._listIsSyncing )
         this.listSetup();
   },

   /**
   * Respond to collection remove event by removing the view associated
   * to the model from the list
   *
   */

   listRemove: function ( model ) {

      if ( this._listItems[model.cid] ) {
         this._listItems[model.cid].remove();
         delete this._listItems[model.cid];
      }

      if ( !this._listIsSyncing )
         this.listSetup();

   },

   /**
   * Chain onto Backbone.View.remove and ensure all the child views
   * in the list are removed.
   *
   */

   remove: function () {

      _.invoke( this._listItems, 'remove' );

   }

});


Mustache.tags = ['<%=', '%>'];

function prettyPrintData(data) {
   console.log( JSON.stringify(data.toJSON()).replace(/{/g, '\n\t{').slice(0, -1)+'\n]' );
}

$(function() {

   var things = new ThingCollection([
         { id: 12345, order: 0, title: 'Item 1' },
         { id: 7777, order: 1, title: 'Item 2' },
         { id: 99345, order: 2, title: 'Item 3' },

      ]);

   var list = new ThingList({ collection: things });

   $('#post-list').append( list.render().$el );

   list.on('sorted', function () {
         prettyPrintData(things);
      });

   prettyPrintData(things);
});
