import AIAssistantCard from "./AIAssistantCard";
import ChartsAndActions from "./ChartsAndActions";
import MetricsOverview from "./MetricsOverview";
import TodayGoals from "./TodayGoals";

export default function DashboardHome() {
    return (
        <div className="dashboard-home">
            <AIAssistantCard />
            <MetricsOverview />
            <TodayGoals />
            <ChartsAndActions />
        </div>
    );
}
