"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
var Address = /** @class */ (function () {
    function Address(city, postalCode, street, number) {
        this.city = city;
        this.number = number;
        this.postalCode = postalCode;
        this.street = street;
    }
    return Address;
}());
exports.Address = Address;
