define(["backbone", "underscore", "models/fixture", "tabletop", 'backbone-tabletop-sync', "dispatcher"], function(Backbone, _, FixtureModel, Tabletop, sync, dispatcher) {

    return Backbone.Collection.extend({

        model: FixtureModel,

        loadByKey: function(key) {
            var self = this;

            if (key == this.key) {
                // no reload needed
                return;
            }

            var sheet = 'Sheet1';
            var p = key.indexOf(':');
            if (p > 0) {
                sheet = key.substr(p+1);
                key = key.substr(0, p);
            }

            this.key = key;

            var storage = Tabletop.init( {
                key: key,
                wait: true
            } );

            this.tabletop = {
                instance: storage,
                sheet: sheet
            };
            this.fullKey = key+':'+sheet;

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