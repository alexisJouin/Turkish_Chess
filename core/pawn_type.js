var Turkish_Chess = Turkish_Chess || {};

module.exports = ( function (self) {
    "use strict";

    self.PawnType = {
        WHITE: 0,
        BLACK: 1,
        Q_WHITE: 2,
        Q_BLACK: 3,

        key: function (value) {
            return Object.keys(this)[Object.keys(this).map(function (key) {
                return self.key;
            }).indexOf(value)];
        }

    };

    return self;
}(Turkish_Chess || {}));