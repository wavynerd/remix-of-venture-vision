import { TrendingUp, DollarSign, Award, Users } from "lucide-react";

const stats = [
  {
    icon: DollarSign,
    value: "$250M+",
    label: "Total Funding",
  },
  {
    icon: Award,
    value: "150+",
    label: "Emerging Market Projects",
  },
  {
    icon: Users,
    value: "500+",
    label: "Active Investors",
  },
  {
    icon: TrendingUp,
    value: "23%",
    label: "Avg. ROI",
  },
];

const StatsBar = () => {
  return (
    <section className="py-12 bg-secondary/50 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-3 group-hover:bg-accent/20 transition-colors">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
