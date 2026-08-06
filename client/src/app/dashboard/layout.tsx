import React from "react";
import SignedOutRedirect from "@/components/features/auth/signed-out-redirect";
import Sidebar from "@/components/shared/sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SignedOutRedirect>
            <div className='flex'>
                <Sidebar />
                <main className='flex-1'>{children}</main>
            </div>
        </SignedOutRedirect>
    );
}
