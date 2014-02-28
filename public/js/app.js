define(["backbone", "views/toolbar", "dispatcher", "router", "collections/conflicts", "views/home", "collections/fixtures", "views/fixtureList", "views/conflictList", "views/patchView"],
    function(Backbone, toolbar, dispatcher, router, conflictCollection, homeView, fixtureCollection, fixtureList, conflictList, patchView) {

    var App = Backbone.View.extend({

        el: '#app',

        initialize: function(){

            var self = this;

            // Utilities
            this.router = new router();

            // Collections
            this.fixtures = new fixtureCollection();
            this.conflicts = new conflictCollection([], { fixtures: this.fixtures });

            // Views
            this.toolbar = new toolbar();
            this.homeView = new homeView();
            this.fixtureList = new fixtureList({ collection: this.fixtures });
            this.conflictList = new conflictList({ collection: this.conflicts });
            this.patchView = new patchView({ collection: this.fixtures });

            // Event handler
            dispatcher.on('project:load', function(key) { self.fixtures.loadByKey(key); });

            // Render
            this.render();

            // Start listening to the routing
            Backbone.history.start({pushState: false});
        },

        render: function() {

            this.$el.append(this.toolbar.render().el);
            this.$el.append(this.homeView.render().el);
            this.$el.append(this.fixtureList.render().el);
            this.$el.append(this.conflictList.render().el);
            this.$el.append(this.patchView.render().el);

        }
    });

    return App;
});