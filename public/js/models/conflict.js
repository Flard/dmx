define(["backbone", "underscore", "util/formatting"], function(Backbone, _, formatting) {
    return Backbone.Model.extend({

        toJSON: function(options) {

            var vars = _.clone(this.attributes);
            if (options === 'template') {
                var addresses = [];
                var universe = this.get('universe');
                _.each(this.get('addresses'), function(address) {
                    addresses.push(formatting.formatDmxAddress(universe, address));
                })
                vars['universe_addresses'] = addresses;

                vars['model1'] = vars['model1'].toJSON(options);
                vars['model2'] = vars['model2'].toJSON(options);
            }
            return vars;
        }

    });
});