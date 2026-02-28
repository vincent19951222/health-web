import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Sidebar />
            <div className="main-content">
                <Header />
                <main className="content">
                    {children}
                </main>
            </div>
        </>
    );
}
