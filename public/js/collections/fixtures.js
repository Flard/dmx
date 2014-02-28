define(["backbone", "underscore", "models/fixture", "tabletop", 'backbone-tabletop-sync', "dispatcher"], function(Backbone, _, FixtureModel, Tabletop, sync, dispatcher) {

    return Backbone.Collection.extend({

        model: FixtureModel,

        loadByKey: function(key) {
            var self = this;

            if (key == this.key) {
                // no reload needed
                return;
            }

            this.key = key;

            var storage = Tabletop.init( {
                key: key,
                wait: true
            } );

            this.tabletop = {
                instance: storage,
                sheet: 'Sheet1'
            };

            this.sync = Backbone.tabletopSync;

            this.fetch({
                success: function() {
                    self.trigger('change');
                    dispatcher.trigger('sheet:loaded', self);
                }
            });
        }

    });

});