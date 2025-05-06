"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const category_route_1 = require("../modules/category/category.route");
const post_route_1 = require("../modules/post/post.route");
const admin_route_1 = require("../modules/admin/admin.route");
const user_route_1 = require("../modules/user/user.route");
const rating_routes_1 = require("../modules/Rating/rating.routes");
const vote_route_1 = require("../modules/Vote/vote.route");
const subscribe_route_1 = require("../modules/subscribe/subscribe.route");
const comment_routes_1 = require("../modules/comment/comment.routes");
const revenue_route_1 = require("../modules/revenue/revenue.route");
const route = (0, express_1.Router)();
const modules = [
    { path: "/auth", route: auth_route_1.authRoute },
    { path: "/category", route: category_route_1.categoryRoute },
    { path: "/post", route: post_route_1.postRoute },
    { path: "/admin", route: admin_route_1.adminRoute },
    { path: "/user", route: user_route_1.userRoute },
    { path: "/rating", route: rating_routes_1.ratingRoutes },
    { path: "/vote", route: vote_route_1.voteRoutes },
    { path: "/subscription", route: subscribe_route_1.subscribeRoute },
    { path: "/comments", route: comment_routes_1.commentRoutes },
    { path: "/revenue", route: revenue_route_1.revenueRoute },
];
modules.forEach((module) => {
    route.use(module.path, module.route);
});
exports.default = route;
