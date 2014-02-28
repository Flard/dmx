define(["underscore"], function(_) {

    return {
        padString: function(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        },

        formatDmxAddress: function(universe, address) {
            return universe+this.padString(address, 3);
        }
    }
});