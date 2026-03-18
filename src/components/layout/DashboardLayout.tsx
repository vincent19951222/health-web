import Header from "./Header";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    hideHeader?: boolean;
    pageTitle?: string;
    pageSubtitle?: string;
    headerActions?: React.ReactNode;
    contentClassName?: string;
}

export default function DashboardLayout({
    children,
    hideHeader = false,
    pageTitle,
    pageSubtitle,
    headerActions,
    contentClassName,
}: DashboardLayoutProps) {
    return (
        <div className="app-dashboard-shell">
            <Sidebar />
            <div className="main-content">
                {!hideHeader && (
                    <Header
                        pageTitle={pageTitle}
                        pageSubtitle={pageSubtitle}
                        actions={headerActions}
                    />
                )}
                <main className={`content ${contentClassName ?? ""}`.trim()}>
                    {children}
                </main>
            </div>
        </div>
    );
}
