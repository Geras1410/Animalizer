import FAQ from "../components/FAQ";
import Home from "../pages/Home";
import Editimage from '../pages/Editimage'
import Identification from "../pages/Identification";
import { Login } from "../pages/Login";
import PasswordRecovery from "../pages/PasswordRecovery";
import Register from "../pages/Register";
import User from "../pages/User";
import ViewImage from "../pages/ViewImage";
import { Route } from "../types";

const routes: Route[] = [
    {
        path: "/",
        component: Home,
        routeType: "PUBLIC"
    },
    {
        path: "/login",
        component: Login,
        routeType: "GUEST"
    },
    {
        path: "/register",
        component: Register,
        routeType: "GUEST"
    },
    {
        path: "/user",
        component: User,
        routeType: "PRIVATE"
    },{
        path: "faq",
        component: FAQ,
        routeType: "PUBLIC"
    },
    {
        path: "/recovery",
        component: PasswordRecovery,
        routeType: "GUEST"
    },
    {
        path: "/createxample",
        component: Identification,
        routeType: "PRIVATE"
    },
    {
        path: "/user/viewimage/:id",
        component: ViewImage,
        routeType: "PRIVATE"
    },
    {
        path: "/user/editimage/:id",
        component: Editimage,
        routeType: "PRIVATE"
    }
]

export default routes;