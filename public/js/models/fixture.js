define(["backbone", "underscore", "util/formatting"], function(Backbone, _, formatting) {
    return Backbone.Model.extend({

        parse: function(data) {
            data['address'] = parseInt(data['address']);
            data['channels'] = parseInt(data['channels']);
            return data;
        },

        getUniverseAddress: function() {
            return formatting.formatDmxAddress(this.get('universe'), this.get('address'));
        },

        toJSON: function(options) {

            var vars = _.clone(this.attributes);
            if (options === 'template') {
                vars['universe_address'] = this.getUniverseAddress();
            }
            return vars;
        },

        getAddresses: function() {
            var list = [],
                start = this.get('address'),
                end = start + this.get('channels');
            for(var a=start;a<end;a++) {
                list.push(a);
            }
            return list;
        }

    });
});