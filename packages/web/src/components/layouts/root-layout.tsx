import { Outlet } from "react-router";
import Navbar from "../ui/navbar";

const RootLayout = () => {
    return (
        <>
            <Navbar/>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
