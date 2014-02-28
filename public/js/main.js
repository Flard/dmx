//the require library is configuring paths
require.config({
    paths: {
        //tries to load jQuery from Google's CDN first and falls back
        //to load locally
        "jquery": ["http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
            "/libs/jquery/jquery"],
        "underscore": "/libs/underscore/underscore",
        "handlebars": '/libs/handlebars/handlebars',
        "hbs": '/libs/require-handlebars-plugin/hbs',
        "backbone": "/libs/backbone/backbone",
        "tabletop": "/libs/tabletop/src/tabletop",
        "backbone-tabletop-sync": "/libs/tabletop/src/backbone.tabletopSync"
    },
    shim: {
        underscore: {
            exports: '_'
        },

        handlebars: {
            exports: 'Handlebars'
        },

        "backbone": {
            //loads dependencies first
            deps: ["jquery", "underscore"],
            //custom export name, this would be lowercase otherwise
            exports: "Backbone"
        },

        "tabletop": {
            exports: "Tabletop"
        },

        "backbone-tabletop-sync": {
            deps: ["tabletop", "backbone"],
            exports: "Backbone.tabletopSync"
        }
    },
    hbs: { // optional
        helpers: true,            // default: true
        i18n: false,              // default: false
        templateExtension: 'hbs', // default: 'hbs'
        partialsUrl: ''           // default: ''
    },
    //how long the it tries to load a script before giving up, the default is 7
    waitSeconds: 10
});
//requiring the scripts in the first argument and then passing the library namespaces into a callback
//you should be able to console log all of the callback arguments
require(['jquery', 'underscore', 'backbone', 'app'], function(jquery, _, Backbone, App){
    new App();
});