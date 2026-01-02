import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  name: string;
  industry: string;
  stage: string;
  raised: string;
  valuation: string;
  growth: string;
  investors: number;
  description: string;
  onClick: () => void;
}

const ProjectCard = ({ 
  name, 
  industry, 
  stage, 
  raised, 
  valuation, 
  growth, 
  investors,
  description,
  onClick
}: ProjectCardProps) => {
  return (
    <Card 
      className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-border bg-card overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            {industry}
          </Badge>
          <Badge variant="outline" className="border-accent/30 text-accent">
            {stage}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
              <DollarSign className="w-3 h-3" />
              <span>Raised</span>
            </div>
            <div className="text-lg font-semibold text-card-foreground">{raised}</div>
          </div>
          
          <div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
              <TrendingUp className="w-3 h-3" />
              <span>Growth</span>
            </div>
            <div className="text-lg font-semibold text-success">{growth}</div>
          </div>

          <div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
              <DollarSign className="w-3 h-3" />
              <span>Valuation</span>
            </div>
            <div className="text-lg font-semibold text-card-foreground">{valuation}</div>
          </div>

          <div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
              <Users className="w-3 h-3" />
              <span>Investors</span>
            </div>
            <div className="text-lg font-semibold text-card-foreground">{investors}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
