import { Outlet } from "react-router";
import Navbar from "../ui/navbar";
import Footer from "../ui/footer";
import { Toaster } from "../ui/sonner";

const RootLayout = () => {
    return (
        <>
            <Navbar/>
            <main>
                <Outlet />
            </main>
            <Toaster />
            <Footer/>
        </>
    );
};

export default RootLayout;
