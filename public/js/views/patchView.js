define(["backbone", "handlebars", "hbs!templates/patchView", "dispatcher"], function(Backbone, Handlebars, template, dispatcher) {
    return Backbone.View.extend({

        template: template,

        initialize: function() {

            var self = this;

            this.render();

            this.collection.on('change', function() {
                self.render();
            });

            dispatcher.on('fixtureList:show', this.show);
            dispatcher.on('mainview:change', _.bind(function(view) { (view == 'patch') ? this.show() : this.hide() }, this));

        },

        show: function() {
            this.$el.show();
        },

        hide: function() {
            this.$el.hide();
        },

        render: function() {

            var universes = {};

            this.collection.each(function (model) {

                var universe = model.get('universe'),
                    addressList = model.getAddresses(),
                    description = model.get('description');

                if (!universes[universe]) {
                    universes[universe] = { name: universe, addresses: new Array(512)};
                }

                _.each(addressList, function(address) {
                    if (!!universes[universe]['addresses'][address-1]) {
                        universes[universe]['addresses'][address-1] = { address: address, text: 'Conflict', cellClass: 'conflict' };
                    } else {
                        console.log(address);
                        universes[universe]['addresses'][address-1] = { address: address, text: description, cellClass: 'used' };
                    }
                });

            });

            universes = _.values(universes);

            this.el.innerHTML = this.template({

                universes: universes

            });

            return this;

        }

    });
});