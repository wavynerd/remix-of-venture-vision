import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ArrowUpRight, Target, Sparkles, Leaf } from "lucide-react";

interface ProjectCardProps {
  name: string;
  sector: string;
  stage: string;
  capitalRequired: string;
  highlights: string[];
  impact: string[];
  description: string;
  kpi?: string;
  onClick: () => void;
}

const ProjectCard = ({
  name,
  sector,
  stage,
  capitalRequired,
  highlights,
  impact,
  description,
  kpi,
  onClick
}: ProjectCardProps) => {
  // Determine accent color based on sector
  const getSectorColor = (sector: string) => {
    if (sector.includes("Recycling") || sector.includes("Sustainability")) return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30";
    if (sector.includes("Healthcare") || sector.includes("Pharmaceutical")) return "bg-blue-500/10 text-blue-600 border-blue-500/30";
    if (sector.includes("Fintech")) return "bg-violet-500/10 text-violet-600 border-violet-500/30";
    if (sector.includes("Natural Gas") || sector.includes("LNG")) return "bg-amber-500/10 text-amber-600 border-amber-500/30";
    if (sector.includes("Power") || sector.includes("Utility")) return "bg-orange-500/10 text-orange-600 border-orange-500/30";
    return "bg-primary/10 text-primary border-primary/30";
  };

  const getStageColor = (stage: string) => {
    if (stage.includes("Expansion") || stage.includes("Scaling")) return "bg-green-500/10 text-green-600 border-green-500/30";
    if (stage.includes("Growth")) return "bg-blue-500/10 text-blue-600 border-blue-500/30";
    if (stage.includes("Development") || stage.includes("Start-up")) return "bg-purple-500/10 text-purple-600 border-purple-500/30";
    if (stage.includes("Brownfield")) return "bg-amber-500/10 text-amber-600 border-amber-500/30";
    return "bg-accent/10 text-accent border-accent/30";
  };

  return (
    <Card
      className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-border bg-card overflow-hidden cursor-pointer hover:-translate-y-1 relative"
      onClick={onClick}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-2">
            <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 flex-shrink-0" />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className={`${getSectorColor(sector)} text-xs font-medium`}>
            {sector}
          </Badge>
          <Badge variant="outline" className={`${getStageColor(stage)} text-xs font-medium`}>
            {stage}
          </Badge>
        </div>

        {/* Capital Required - Prominent Display */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 mb-4 border border-primary/20">
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="font-medium uppercase tracking-wide">Capital Required</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{capitalRequired}</div>
          {kpi && (
            <div className="text-xs text-muted-foreground mt-1 font-medium">{kpi}</div>
          )}
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
            <Sparkles className="w-3 h-3" />
            <span className="font-medium uppercase tracking-wide">Key Highlights</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {highlights.slice(0, 3).map((highlight, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-1 rounded-md bg-secondary/50 text-xs text-secondary-foreground font-medium"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
            <Leaf className="w-3 h-3" />
            <span className="font-medium uppercase tracking-wide">Impact</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {impact.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-500/10 text-xs text-emerald-700 dark:text-emerald-400 font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
