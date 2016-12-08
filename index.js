"use strict";
var Screenshot = (function () {
    function Screenshot(config, callback) {
        if (callback === void 0) { callback = null; }
        require("./platforms/" + process.platform + ".js")(config, function (error) {
            if (callback !== null)
                callback(error);
        });
    }
    return Screenshot;
}());
exports.Screenshot = Screenshot;
//# sourceMappingURL=index.js.map