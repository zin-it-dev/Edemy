import type { ComponentType } from "react";

export type MenuType = {
    path: string;
    name: string;
    icon: ComponentType<any>;
}