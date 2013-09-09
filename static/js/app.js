Application = {};
Application.Collection = {};
Application.Model = {};
Application.View = {};

Application.Model.Item = Backbone.Model.extend();


Application.View.Item = Backbone.View.extend({
    template: $('#post-item-template')[0].innerHTML,
    events: {
        'drop' : 'drop'
    },
    drop: function(event, index) {
        console.log('sort stop detected');
        this.$el.trigger('update-sort', [this.model, index]);
    },
    render: function() {
        $(this.el).html(Mustache.render(this.template, {id: this.model.id}));
        return this;
    }
});

Application.Collection.Items = Backbone.Collection.extend({
    model: Application.Model.Item,
    comparator: function(model) {
        return model.get('ordinal');
    }
});

Application.View.Items = Backbone.View.extend({
    el: '#post-list',
    events: {
        'update-sort': 'updateSort'
    },
    render: function() {
        this.$el.children().remove();
        this.collection.each(this.appendModelView, this);
        return this;
    },
    appendModelView: function(model) {
        this.$el.append(new Application.View.Item({model: model}).render().el);
    },
    updateSort: function(event, model, position) {
        console.log('Sort updated');
        this.collection.remove(model);

        this.collection.each(function (model, index) {
            var ordinal = index;
            if (index >= position)
                ordinal += 1;
            model.set('ordinal', ordinal);
        });

        model.set('ordinal', position);
        this.collection.add(model, {at: position});

        // to update ordinals on server:
        var ids = this.collection.pluck('id');
        $('#post-data').html('post ids to server: ' + ids.join(', '));

        this.render();

    }
});

Mustache.tags = ['<%=', '%>'];

var Instance = {};
Instance.collection = new Application.Collection.Items();
Instance.collection.add(new Application.Model.Item({id: 1234, name: 'a', ordinal: 0}));
Instance.collection.add(new Application.Model.Item({id: 2345, name: 'b', ordinal: 1}));
Instance.collection.add(new Application.Model.Item({id: 3456, name: 'c', ordinal: 2}));

Instance.collectionView = new Application.View.Items({
    collection: Instance.collection
});

Instance.collectionView.render();

$(document).ready(function() {
        $("ul.timeline").sortable({
			items: "li.post",
			placeholder: "ui-state-highlight",
			handle: ".sort-handle",
            stop: function(event, ui) {
                console.log('at stop. Triggering drop on item #' + ui.item.index());
                console.log(ui.item);
                ui.item.trigger('drop', ui.item.index());
            }
		});
});
