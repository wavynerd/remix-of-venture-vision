import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ProjectsGrid from "@/components/ProjectsGrid";
import ForCompanies from "@/components/ForCompanies";
import DashboardCTA from "@/components/DashboardCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <StatsBar />
      <ProjectsGrid />
      <ForCompanies />
      <DashboardCTA />
    </div>
  );
};

export default Index;
