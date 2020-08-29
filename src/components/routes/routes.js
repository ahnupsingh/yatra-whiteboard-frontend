import React from "react";
import { canAccess } from "../../misc";
import { HomePage } from "../pages/HomePage";
import { RoutePage } from "../pages/RoutePage";
import { Login, Signup } from "../auth";
import { UsersList, UserForm, UserProfile, UserDetails } from "../users";
import { BoardList, BoardDetails } from "../boards";
import { TextEditor, CanvasEditor, LandingPage } from "../pages";
import { ResetLocal } from "../commons/Reset";

const user_permissions = [
    ["user-list", "post"],
    ["user-detail", "get"],
];

const routes = [
    {
        path: "/home",
        title: "Home",
        icon: "home",
        exact: true,
        accessible: true,
        component: HomePage,
    },
    {
        path: "/",
        icon: "Landing",
        exact: true,
        accessible: true,
        component: LandingPage,
    },

    {
        path: "/profile",
        exact: true,
        accessible: true,
        component: UserProfile,
    },
    {
        path: "/signup",
        component: Signup,
        accessible: true,
        exact: true,
    },

    {
        path: "/login",
        component: Login,
        accessible: true,
        exact: true,
    },

    {
        path: "/my-boards",
        component: BoardList,
        accessible: true,
        exact: true,
    },

    {
        path: "/board/:idx",
        component: BoardDetails,
        accessible: true,
        exact: true,
    },

    {
        path: "/reset",
        component: ResetLocal,
        accessible: true,
        exact: true,
    },

    // User Routes

    {
        rootPath: "#",
        path: "#user",
        icon: "users",
        title: "User",
        accessible: canAccess([["admin", true]]),
        exact: true,
        routes: [
            {
                path: "/user",
                title: "All Users",
                icon: "users",
                component: UsersList,
                accessible: canAccess([["admin", true]]),
                exact: true,
            },

            {
                path: "/user/:idx",
                icon: "file alternate",
                component: UserDetails,
                accessible: canAccess([["admin", true]]),
                exact: true,
            },

            {
                path: "/users/new",
                icon: "file alternate",
                component: UserForm,
                accessible: canAccess([["admin", true]]),
                exact: true,
            },

            {
                path: "/user/:idx/edit",
                icon: "file alternate",
                component: UserForm,
                accessible: canAccess([["admin", true]]),
                exact: true,
            },
        ],
    },

    // Editor Routes

    {
        rootPath: "#",
        path: "#user",
        icon: "terminal",
        title: "Editor",
        accessible: true,
        exact: true,
        routes: [
            {
                path: "/user",
                title: "Text editor",
                icon: "file alternate",
                component: TextEditor,
                accessible: true,
                exact: true,
            },

            {
                path: "/user/:idx",
                icon: "paint brush",
                component: CanvasEditor,
                title: "Canvas",
                accessible: true,
                exact: true,
            },
        ],
    },

    {
        rootPath: "#",
        path: "#local",
        icon: "language",
        title: "Insert Your Language",
        accessible: true,
        exact: true,
        routes: [
            {
                path: "#nepali",
                title: "Nepali",
                icon: "flag",
                accessible: true,
                exact: true,
            },
        ],
    },
];

export { routes };
