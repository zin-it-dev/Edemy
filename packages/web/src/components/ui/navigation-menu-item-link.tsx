import { Link } from "react-router";

import {
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export type NavigationItem = {
    title: string;
    to: string;
};

export default function NavigationMenuItemLink({ title, to }: NavigationItem) {
    return (
        <NavigationMenuItem>
            <NavigationMenuLink
                render={<Link to={to}>{title}</Link>}
                className={navigationMenuTriggerStyle()}
            />
        </NavigationMenuItem>
    );
}
