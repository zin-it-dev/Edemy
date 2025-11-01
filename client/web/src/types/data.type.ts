import type { ComponentType } from "react";

export type MenuType = {
    path: string;
    name: string;
    icon: ComponentType<any>;
}

export type FeatureType = {
    title: string;
    icon: ComponentType<any>;
    description: string;
    benefit: string;
}