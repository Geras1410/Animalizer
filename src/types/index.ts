export type User ={
    email: string,
    token: string | null,
    isAuth: boolean
}

export type Example ={
    id: string,
    errors: {},
    content: string,
    FPred: string,
    SPred: string,
    TPred: string,
    Base64: string
}

export type RouteType = "PRIVATE" | "PUBLIC" | "GUEST"

export type Route = {
    path: string,
    component: any,
    routeType: RouteType
};