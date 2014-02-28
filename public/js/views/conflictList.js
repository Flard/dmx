define(["backbone", "handlebars", "hbs!templates/conflictList", "dispatcher"], function(Backbone, Handlebars, template, dispatcher) {
    return Backbone.View.extend({

        template: template,

        initialize: function() {

            var self = this;

            this.render();
            this.collection.on('reset', function() {
                self.render();
            });

            dispatcher.on('conflictList:show', this.show);
            dispatcher.on('mainview:change', _.bind(function(view) { (view == 'conflicts') ? this.show() : this.hide() }, this));

        },

        show: function() {
            this.$el.show();
        },

        hide: function() {
            this.$el.hide();
        },

        render: function() {

            this.el.innerHTML = this.template({

                conflicts: this.collection.toJSON('template')

            });

            return this;

        }

    });
});