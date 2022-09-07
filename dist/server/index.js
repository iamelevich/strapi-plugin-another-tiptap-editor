"use strict";
exports.__esModule = true;
var register_1 = require("./register");
var bootstrap_1 = require("./bootstrap");
var destroy_1 = require("./destroy");
var config_1 = require("./config");
var controllers_1 = require("./controllers");
var routes_1 = require("./routes");
exports["default"] = {
    register: register_1["default"],
    bootstrap: bootstrap_1["default"],
    destroy: destroy_1["default"],
    config: config_1["default"],
    controllers: controllers_1["default"],
    routes: routes_1["default"]
};
