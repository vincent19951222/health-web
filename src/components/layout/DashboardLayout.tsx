import "@/styles/dashboard.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
    children,
    hideHeader = false,
}: {
    children: React.ReactNode;
    hideHeader?: boolean;
}) {
    return (
        <>
            <Sidebar />
            <div className="main-content">
                {!hideHeader && <Header />}
                <main className="content">
                    {children}
                </main>
            </div>
        </>
    );
}
