define(["backbone", "dispatcher"], function(Backbone, dispatcher) {

    return Backbone.Router.extend({

        routes: {
            "":                 "home",
            ":key":             "showFixtures",
            ":key/conflicts":   "showConflicts",
            ":key/patch":       "showPatch"
        },

        home: function() {

            console.log('router:home');
            dispatcher.trigger('mainview:change', 'home');

        },

        showFixtures: function(key) {

            console.log('router:showFixtures');
            dispatcher.trigger('mainview:change', 'channels');
            dispatcher.trigger('project:load', key);

        },

        showConflicts: function(key) {
            console.log('router:showConflicts');
            dispatcher.trigger('mainview:change', 'conflicts');
            dispatcher.trigger('project:load', key);
        },

        showPatch: function(key) {
            console.log('router:showPatch');
            dispatcher.trigger('mainview:change', 'patch');
            dispatcher.trigger('project:load', key);
        }

    });

});