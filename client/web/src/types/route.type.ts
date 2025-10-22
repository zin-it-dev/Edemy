import type { ComponentType } from "react";

export type RouteType = {
    path: string;
    component: ComponentType<any>;
    layout?: null | undefined;
}