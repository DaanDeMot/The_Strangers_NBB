"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BedrijfProps = exports.Bedrijf = void 0;
var Bedrijf = /** @class */ (function () {
    function Bedrijf(referenceNumber, name, depositDate, address, eigenVermogen, schulden, bedrijfswinst) {
        this.referenceNumber = referenceNumber;
        this.name = name;
        this.depositDate = depositDate;
        this.address = address;
        this.eigenVermogen = eigenVermogen;
        this.schulden = schulden;
        this.bedrijfswinst = bedrijfswinst;
    }
    return Bedrijf;
}());
exports.Bedrijf = Bedrijf;
var BedrijfProps = /** @class */ (function () {
    function BedrijfProps(eigenVermogen, schulden, bedrijfswinst) {
        this.eigenVermogen = eigenVermogen;
        this.schulden = schulden;
        this.bedrijfswinst = bedrijfswinst;
    }
    return BedrijfProps;
}());
exports.BedrijfProps = BedrijfProps;
