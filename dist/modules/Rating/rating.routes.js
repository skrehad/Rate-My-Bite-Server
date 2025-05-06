"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const rating_controller_1 = require("./rating.controller");
const router = express_1.default.Router();
router.get("/", rating_controller_1.ratingController.getAllRating);
router.get("/:ratingId", rating_controller_1.ratingController.getSingleRating);
router.post("/", rating_controller_1.ratingController.createRatingIntoDB);
exports.ratingRoutes = router;
