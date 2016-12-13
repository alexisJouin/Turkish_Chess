var Turkish_Chess = Turkish_Chess || {};

module.exports = ( function (self) {
    "use strict";

    self.Player = function () {
        var name = "toto";

        this.getName = function () {
            return name;
        };
    };

    return self;
}(Turkish_Chess || {}));