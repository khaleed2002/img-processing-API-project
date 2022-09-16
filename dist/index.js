"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resize_1 = __importDefault(require("./routes/resize/resize"));
var app = (0, express_1.default)();
var port = 3000;
app.get('/', function (req, res) {
    res.send("<h1 style='text-align:center;padding:10px;margin:10px'>Home Page</h1>\n    <p style='font-size: 20px;\n    font-weight: bold;'>use /resize?fileName=(image name)&height=(for example 100)&width=(for example 100)</p>\n    <p style='font-size: 20px;\n    font-weight: bold;'>Then press enter</p>\n    ");
});
app.use('/resize', resize_1.default);
app.listen(port, function () {
    return console.log("listening on port: http://localhost:".concat(port));
});
exports.default = app;
