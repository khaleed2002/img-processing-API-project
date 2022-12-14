"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImg = exports.fileExist = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = __importDefault(require("fs"));
var folderPath = path_1.default.resolve(__dirname, '..', '..', '..');
var route = express_1.default.Router();
function fileExist(path) {
    try {
        if (fs_1.default.existsSync(path)) {
            return true;
        }
        else
            return false;
    }
    catch (err) {
        return false;
    }
}
exports.fileExist = fileExist;
function resizeImg(source, width, height) {
    return __awaiter(this, void 0, void 0, function () {
        var thumbPath, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    thumbPath = path_1.default.join(folderPath, 'imgThumb', path_1.default.parse(source).name + "_thumb_".concat(width, "_").concat(height, ".jpg"));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, sharp_1.default)(source).resize(width, height).toFile(thumbPath)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, thumbPath];
            }
        });
    });
}
exports.resizeImg = resizeImg;
route.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var width, height, imgPath, thumbPath, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                width = Number(req.query.width), height = Number(req.query.height);
                imgPath = path_1.default.join(folderPath, 'imgs', "".concat(req.query.filename, ".jpg"));
                //check if image name is valid
                if (!fileExist(imgPath)) {
                    return [2 /*return*/, res.send("<h1 style='color:red;font-weight:bold;'>Image you selected is not found,<h1><p>add it first to imgs folder</p>")];
                }
                //check if user enter both width & height
                if (req.query.width === undefined || req.query.height === undefined) {
                    return [2 /*return*/, res.send("<h1 style='color:red;font-weight:bold;'>wrong parameters. Enter both width and height<h1>")];
                }
                //check if width and height are given and it's numbers
                if (isNaN(width) && isNaN(height)) {
                    return [2 /*return*/, res.send("<h1 style='color:red;font-weight:bold;'>width and height parameters should be numbers<h1>")];
                }
                else if (isNaN(width)) {
                    return [2 /*return*/, res.send("<h1 style='color:red;font-weight:bold;'>width parameter should be a number<h1>")];
                }
                else if (isNaN(height)) {
                    return [2 /*return*/, res.send("<h1 style='color:red;font-weight:bold;'>height parameter should be a number<h1>")];
                }
                thumbPath = path_1.default.join(folderPath, 'imgThumb', path_1.default.parse(imgPath).name + "_thumb_".concat(width, "_").concat(height, ".jpg"));
                if (!fileExist(thumbPath)) return [3 /*break*/, 1];
                return [2 /*return*/, res.sendFile(thumbPath)];
            case 1:
                console.log('new image created in thumb folder: ', path_1.default.parse(imgPath).name + "_thumb_".concat(width, "_").concat(height, ".jpg"));
                _b = (_a = res).sendFile;
                return [4 /*yield*/, resizeImg(imgPath, width, height)];
            case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
exports.default = route;
