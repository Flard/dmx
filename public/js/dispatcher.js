define(["backbone"], function(Backbone) {
    var dispatcher = {};
    _.extend(dispatcher, Backbone.Events);
    return dispatcher;
});