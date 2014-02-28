define(["backbone", "handlebars", "hbs!templates/fixtureList", "dispatcher"], function(Backbone, Handlebars, template, dispatcher) {
    return Backbone.View.extend({

        template: template,

        initialize: function() {

            var self = this;

            this.render();

            this.collection.on('change', function() {
                self.render();
            });

            dispatcher.on('fixtureList:show', this.show);
            dispatcher.on('mainview:change', _.bind(function(view) { (view == 'channels') ? this.show() : this.hide() }, this));

        },

        show: function() {
            this.$el.show();
        },

        hide: function() {
            this.$el.hide();
        },

        render: function() {

            this.el.innerHTML = this.template({

                fixtures: this.collection.toJSON('template')

            });

            return this;

        }

    });
});