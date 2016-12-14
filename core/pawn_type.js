var Turkish_Chess = Turkish_Chess || {};

module.exports = ( function (self) {
    "use strict";

    self.PawnType = {
        WHITE: 1,
        BLACK: 2,
        Q_WHITE: 3,
        Q_BLACK: 4,

        key: function (value) {
            return Object.keys(this)[Object.keys(this).map(function (key) {
                return self.key;
            }).indexOf(value)];
        }

    };

    return self;
}(Turkish_Chess || {}));