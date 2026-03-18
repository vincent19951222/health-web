import AIAssistantCard from "./AIAssistantCard";
import ChartsAndActions from "./ChartsAndActions";
import HealthWorkbench from "./HealthWorkbench";

export default function DashboardHome() {
    return (
        <div className="dashboard-home">
            <AIAssistantCard />
            <HealthWorkbench />
            <ChartsAndActions />
        </div>
    );
}
