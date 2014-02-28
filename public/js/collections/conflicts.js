define(["backbone", "underscore", "models/conflict", "dispatcher"], function(Backbone, _, ConflictModel, dispatcher) {

    return Backbone.Collection.extend({

        model: ConflictModel,

        initialize: function(models, options) {

            this.fixtures = options.fixtures;

            options.fixtures.on('change', function() {
                // TODO: Debounce
                this.validate();
            }, this);

        },

        validate: function() {

            var usage = {};
            var conflicts = [];
            var knownConflicts = [];

            this.fixtures.each(function(model) {
                var universe = model.get('universe'),
                    startAddress   = model.get('address'),
                    channels = model.get('channels');

                if (!usage[universe]) {
                    usage[universe] = {};
                }

                for(var address=startAddress;address<(startAddress+channels);address++) {

                    if (!usage[universe][address]) {

                        usage[universe][address] = [model];

                    } else {

                        _.each(usage[universe][address], function(conflictingModel) {
                            var conflictId = model.cid+'-'+conflictingModel.cid;

                            if (_.indexOf(knownConflicts, conflictId) >= 0) {
                                // known conflict
                                return;
                            }

                            var conflict = new ConflictModel({
                                id: conflictId,
                                universe: universe,
                                addresses: _.intersection(model.getAddresses(), conflictingModel.getAddresses()),
                                model1: model,
                                model2: conflictingModel
                            });
                            conflicts.push(conflict);
                            knownConflicts.push(conflictId);

                        });
                        usage[universe][address].push(model);

                    }
                }
            });

            this.reset(conflicts);
            dispatcher.trigger('conflicts:updated', this);
        }


    });

});