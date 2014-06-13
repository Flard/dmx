define(["backbone", "handlebars", "hbs!templates/toolbar", "dispatcher"], function(Backbone, Handlebars, template, dispatcher) {
    return Backbone.View.extend({

        template: template,

        initialize: function() {

            dispatcher.on('conflicts:updated', this.updateWarningCount, this);
            dispatcher.on('sheet:loaded', this.afterSheetLoaded, this);
            dispatcher.on('mainview:change', this.onMainViewChange, this);

            this.render();
        },

        onMainViewChange: function(view) {
            this.$el.find('li').removeClass('active');
            this.$el.find('li.nav-'+view).addClass('active');
        },

        afterSheetLoaded: function(fixtures) {
            var key = fixtures.fullKey;

            this.$el.find('.nav-channels').removeClass('disabled').find('a').attr('href', '#'+key);
            this.$el.find('.nav-conflicts').removeClass('disabled').find('a').attr('href', '#'+key+'/conflicts');
            this.$el.find('.nav-patch').removeClass('disabled').find('a').attr('href', '#'+key+'/patch');
            this.$el.find('.nav-export').removeClass('disabled').find('a').attr('href', '#'+key+'/export');
        },

        render: function() {

            this.el.innerHTML = this.template();

            return this;

        },

        updateWarningCount: function(conflicts) {
            this.$el.find('.js-conflicts').text(conflicts.length);
        }

    });
});