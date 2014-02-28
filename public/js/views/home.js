define(["backbone", "underscore", "handlebars", "hbs!templates/home", "dispatcher"], function(Backbone, _, Handlebars, template, dispatcher) {
    return Backbone.View.extend({

        template: template,

        events: {
            'click .js-load': 'loadProject'
        },

        initialize: function() {

            //this.render();

            dispatcher.on('home:show', this.show);
            dispatcher.on('mainview:change', _.bind(function(view) { (view == 'home') ? this.show() : this.hide() }, this));
        },

        render: function() {

            this.el.innerHTML = this.template();

            return this;

        },

        show: function() {
            this.$el.show();
        },

        hide: function() {
            this.$el.hide();
        },

        loadProject: function() {
            var key = this.$el.find('input[type=text]').val();
            //TODO: Clean URL
            //dispatcher.trigger('project::loadKey', key);
            window.location = '#0AoBMpdNsbHMGdG0wVUp5enVoMUZCYVFnTm5TS3ZHUlE';
        }

    });
});