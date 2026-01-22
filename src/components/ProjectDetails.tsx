import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Target, MessageSquare, UserCircle, Sparkles, Leaf, TrendingUp } from "lucide-react";

interface ProjectDetailsProps {
  project: {
    name: string;
    sector: string;
    stage: string;
    capitalRequired: string;
    highlights: string[];
    impact: string[];
    description: string;
    kpi?: string;
    detailedImpact?: string;
    team: Array<{ name: string; role: string }>;
    comments: Array<{ author: string; text: string; date: string }>;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectDetails = ({ project, open, onOpenChange }: ProjectDetailsProps) => {
  if (!project) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl leading-tight">{project.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={getSectorColor(project.sector)}>
              {project.sector}
            </Badge>
            <Badge variant="outline" className={getStageColor(project.stage)}>
              {project.stage}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{project.description}</p>

          <Separator />

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Capital Required */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-5 border border-primary/20">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium uppercase tracking-wide">Capital Required</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{project.capitalRequired}</div>
              {project.kpi && (
                <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>{project.kpi}</span>
                </div>
              )}
            </div>

            {/* Highlights */}
            <div className="bg-secondary/30 rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium uppercase tracking-wide">Key Highlights</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.highlights.map((highlight, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-secondary text-sm text-secondary-foreground font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Section */}
          <div className="bg-emerald-500/5 rounded-xl p-5 border border-emerald-500/20">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
              <Leaf className="w-4 h-4 text-emerald-500" />
              <span className="font-medium uppercase tracking-wide">Impact & ESG Alignment</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.impact.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-500/10 text-sm text-emerald-700 dark:text-emerald-400 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
            {project.detailedImpact && (
              <p className="text-sm text-muted-foreground leading-relaxed">{project.detailedImpact}</p>
            )}
          </div>

          <Separator />

          {/* Team Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <UserCircle className="w-5 h-5" />
              Team
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {project.team.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <UserCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">{member.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Comments Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Investor Insights
            </h3>
            <div className="space-y-3">
              {project.comments.map((comment, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-foreground">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetails;
