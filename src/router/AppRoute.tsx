import { Navigate } from "react-router-dom";
import { RouteType } from "../types";
import { useAuthState } from "../context/authContext";

interface AppRouteProps {
    component: React.ComponentType<any>
    routeType:  RouteType,
    path: string
}

const AppRoute = ({ component: Component, routeType }: AppRouteProps) => {
    const user = useAuthState();

    switch (routeType) {
        case "PRIVATE":
            return user.isAuth ? <Component /> : <Navigate to="/login" />;
        case "PUBLIC":
            return <Component />;
        case "GUEST":
            return !user.isAuth ? <Component /> : <Navigate to="/user" />;
        default:
            return null;
    }
};

export default AppRoute;