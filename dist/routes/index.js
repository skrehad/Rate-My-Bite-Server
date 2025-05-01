"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const category_route_1 = require("../modules/category/category.route");
const post_route_1 = require("../modules/post/post.route");
const admin_route_1 = require("../modules/admin/admin.route");
const route = (0, express_1.Router)();
const modules = [
    { path: "/auth", route: auth_route_1.authRoute },
    { path: "/category", route: category_route_1.categoryRoute },
    { path: "/post", route: post_route_1.postRoute },
    { path: "/admin", route: admin_route_1.adminRoute },
];
modules.forEach((module) => {
    route.use(module.path, module.route);
});
exports.default = route;
