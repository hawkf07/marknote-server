"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res, next) => {
    res.send({ message: "root" });
});
app.listen(6000, () => {
    console.log("listening on port", 6000);
});
//# sourceMappingURL=index.js.map