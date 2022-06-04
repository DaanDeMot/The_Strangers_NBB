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
var express = require('express');
var app = express();
var ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
var path = require('path');
app.use(express.static(path.join(__dirname, 'views')));
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var AdresClasse_1 = require("./assets/AdresClasse");
var BedrijfClasse_1 = require("./assets/BedrijfClasse");
var BedrijfClasse_2 = require("./assets/BedrijfClasse");
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://User1:Admin1@cluster0.vns4g.mongodb.net/NationaleBankBelgie?retryWrites=true&w=majority";
var client = new MongoClient(uri, { useUnifiedTopology: true });
var DATABASE = "NationaleBankBelgie";
var COLLECTION = "Geschiedenis";
var doDBCalls = function () { return __awaiter(void 0, void 0, void 0, function () {
    var exc_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("-------- Connecting to DB ------------");
                return [4 /*yield*/, client.connect()];
            case 1:
                _a.sent();
                console.log('-----------Connected-------------------');
                return [3 /*break*/, 3];
            case 2:
                exc_1 = _a.sent();
                console.log("Connection Failed");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
doDBCalls();
var DetailAPIInput = (function (number) { return __awaiter(void 0, void 0, void 0, function () {
    var res, BedrijfPropsOutput, BedrijfPropsOutput_1, detailOutput, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, (0, cross_fetch_1.default)('https://ws.uat2.cbso.nbb.be/authentic/deposit/' + number + '/accountingData', {
                        headers: {
                            'Accept': 'application/x.jsonxbrl',
                            'NBB-CBSO-Subscription-Key': 'de631b01365f42c49905b547f272af74',
                            'X-Request-Id': ''
                        }
                    })];
            case 1:
                res = _a.sent();
                if (!(res.status >= 400)) return [3 /*break*/, 2];
                BedrijfPropsOutput = new BedrijfClasse_2.BedrijfProps("Onbestaande", "Onbestaande", "Onbestaande");
                return [2 /*return*/, (BedrijfPropsOutput)];
            case 2:
                BedrijfPropsOutput_1 = new BedrijfClasse_2.BedrijfProps("", "", "");
                return [4 /*yield*/, res.json()];
            case 3:
                detailOutput = _a.sent();
                Object.entries(detailOutput.Rubrics).forEach(function (entry) {
                    var code = entry[1].Code;
                    var period = entry[1].Period;
                    if (code == "10/15" && period == "N") {
                        var vermogen = entry[1].Value;
                        BedrijfPropsOutput_1.eigenVermogen = vermogen;
                    }
                    if (code == "17/49" && period == "N") {
                        var schulden = entry[1].Value;
                        BedrijfPropsOutput_1.schulden = schulden;
                    }
                    if (code == "9901" && period == "N") {
                        var bedrijfswinst = entry[1].Value;
                        BedrijfPropsOutput_1.bedrijfswinst = bedrijfswinst;
                    }
                });
                return [2 /*return*/, (BedrijfPropsOutput_1)];
            case 4:
                ;
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
var generalAPIInput = (function (number) { return __awaiter(void 0, void 0, void 0, function () {
    var res, financialData, bedrijf_1, generalData, eigenVermogen, schulden, bedrijfswinst, bedrijf_1, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, (0, cross_fetch_1.default)('https://ws.uat2.cbso.nbb.be/authentic/legalEntity/' + number + '/references', {
                        headers: {
                            'Accept': 'application/json',
                            'NBB-CBSO-Subscription-Key': 'de631b01365f42c49905b547f272af74',
                            'X-Request-Id': ''
                        }
                    })];
            case 1:
                res = _a.sent();
                financialData = void 0;
                if (!(res.status >= 400)) return [3 /*break*/, 2];
                bedrijf_1 = new BedrijfClasse_1.Bedrijf("Onbestaande", "Onbestaande", "Onbestaande", new AdresClasse_1.Address("", "", "Onbestaande", ""), "Onbestaande", "Onbestaande", "Onbestaande");
                return [2 /*return*/, bedrijf_1];
            case 2: return [4 /*yield*/, res.json()];
            case 3:
                generalData = _a.sent();
                return [4 /*yield*/, DetailAPIInput(generalData[0].ReferenceNumber)];
            case 4:
                financialData = _a.sent();
                eigenVermogen = financialData === null || financialData === void 0 ? void 0 : financialData.eigenVermogen;
                schulden = financialData === null || financialData === void 0 ? void 0 : financialData.schulden;
                bedrijfswinst = financialData === null || financialData === void 0 ? void 0 : financialData.bedrijfswinst;
                bedrijf_1 = new BedrijfClasse_1.Bedrijf(generalData[0].ReferenceNumber, generalData[0].EnterpriseName, generalData[0].DepositDate, new AdresClasse_1.Address(generalData[0].Address.City, generalData[0].Address.PostalCode, generalData[0].Address.Street, generalData[0].Address.Number), eigenVermogen, schulden, bedrijfswinst);
                return [2 /*return*/, bedrijf_1];
            case 5:
                ;
                return [3 /*break*/, 7];
            case 6:
                err_2 = _a.sent();
                console.error(err_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
var storeInDb = (function (data, data_2) { return __awaiter(void 0, void 0, void 0, function () {
    var currentTime, exc_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentTime = new Date().toDateString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!((data === null || data === void 0 ? void 0 : data.name) != "Onbestaande")) return [3 /*break*/, 3];
                if (!(data != undefined)) return [3 /*break*/, 3];
                data.opzoekDatum = currentTime;
                return [4 /*yield*/, client.db(DATABASE).collection(COLLECTION).insertOne(data)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!((data_2 === null || data_2 === void 0 ? void 0 : data_2.name) != "Onbestaande")) return [3 /*break*/, 5];
                if (!(data_2 != undefined)) return [3 /*break*/, 5];
                data_2.opzoekDatum = currentTime;
                return [4 /*yield*/, client.db(DATABASE).collection(COLLECTION).insertOne(data_2)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                exc_2 = _a.sent();
                console.log(exc_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/bedrijfOutput/:x/:y', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var x, y, data, data_2, _a, _b, _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                x = req.params.x;
                y = req.params.y;
                return [4 /*yield*/, generalAPIInput(x)];
            case 1:
                data = _e.sent();
                return [4 /*yield*/, generalAPIInput(y)];
            case 2:
                data_2 = _e.sent();
                storeInDb(data, data_2);
                _b = (_a = res).render;
                _c = ['bedrijfOutput'];
                _d = {};
                return [4 /*yield*/, data];
            case 3:
                _d.bedrijfOutput = _e.sent();
                return [4 /*yield*/, data_2];
            case 4:
                _b.apply(_a, _c.concat([(_d.bedrijfOutput_2 = _e.sent(), _d)]));
                return [2 /*return*/];
        }
    });
}); });
var renderBedrijven = function (res) { return __awaiter(void 0, void 0, void 0, function () {
    var cursorAll, bedrijvenAll;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.db(DATABASE).collection(COLLECTION).find({})];
            case 1:
                cursorAll = _a.sent();
                return [4 /*yield*/, cursorAll.toArray()];
            case 2:
                bedrijvenAll = _a.sent();
                res.render('history', { bedrijven: bedrijvenAll });
                return [2 /*return*/];
        }
    });
}); };
app.get('/history', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            renderBedrijven(res);
        }
        catch (exc) {
            console.log(exc);
        }
        return [2 /*return*/];
    });
}); });
app.get('/history/:x', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var x, bedrijfX;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                x = req.params.x;
                return [4 /*yield*/, client.db(DATABASE).collection(COLLECTION).findOne({ referenceNumber: x })];
            case 1:
                bedrijfX = _a.sent();
                res.render('history_detail', { bedrijf: bedrijfX });
                return [2 /*return*/];
        }
    });
}); });
app.listen(app.get('port'), function () { return console.log('[server] http://localhost:' + app.get('port')); });
