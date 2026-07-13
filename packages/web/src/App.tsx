import { useRoutes } from "react-router";
import RootLayout from "@/components/layouts/root-layout";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";

const App = () => {
    const element = useRoutes([
        {
            path: "/",
            Component: RootLayout,
            children: [{ index: true, Component: Home }],
        },
        {
            path: "/dashboard",
            Component: DashboardLayout,
            children: [{ index: true, Component: Dashboard }],
        },
    ]);

    return element;
};

export default App;
