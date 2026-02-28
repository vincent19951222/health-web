import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dashboard-container">
            <style dangerouslySetInnerHTML={{
                __html: `
                .dashboard-container { display: flex; flex-direction: column; min-height: 100vh; padding-left: 240px; }
                @media (max-width: 768px) { .dashboard-container { padding-left: 64px; } }
            `}} />
            <Sidebar />
            <div className="flex-1 flex flex-col w-full transition-all duration-300">
                <Header />
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
