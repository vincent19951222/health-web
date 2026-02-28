import AIAssistantCard from "@/components/dashboard/AIAssistantCard";
import MetricsOverview from "@/components/dashboard/MetricsOverview";
import TodayGoals from "@/components/dashboard/TodayGoals";
import ChartsAndActions from "@/components/dashboard/ChartsAndActions";

export default function DashboardPage() {
    return (
        <>
            <AIAssistantCard />
            <MetricsOverview />
            <TodayGoals />
            <ChartsAndActions />
        </>
    );
}
