"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Enums
var SeatChoice;
(function (SeatChoice) {
    SeatChoice[SeatChoice["AISLE"] = 0] = "AISLE";
    SeatChoice["MIDDLE_AISLE"] = "middle_aisle";
    SeatChoice[SeatChoice["MIDDLE_WINDOW"] = 14] = "MIDDLE_WINDOW";
    SeatChoice[SeatChoice["WINDOW"] = 15] = "WINDOW";
})(SeatChoice || (SeatChoice = {}));
var selectSeat = SeatChoice.AISLE;
var selectSeat1 = SeatChoice.MIDDLE_WINDOW;
var selectSeat2 = SeatChoice.MIDDLE_AISLE;
console.log(selectSeat, selectSeat1, selectSeat2);
