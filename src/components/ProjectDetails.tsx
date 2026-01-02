import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Users, DollarSign, Calendar, MessageSquare, UserCircle } from "lucide-react";

interface ProjectDetailsProps {
  project: {
    name: string;
    industry: string;
    stage: string;
    raised: string;
    valuation: string;
    growth: string;
    investors: number;
    description: string;
    yearEstablished: number;
    team: Array<{ name: string; role: string }>;
    comments: Array<{ author: string; text: string; date: string }>;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectDetails = ({ project, open, onOpenChange }: ProjectDetailsProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{project.industry}</Badge>
            <Badge variant="outline" className="border-accent/30 text-accent">
              {project.stage}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground">{project.description}</p>

          <Separator />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                <DollarSign className="w-3 h-3" />
                <span>Raised</span>
              </div>
              <div className="text-lg font-semibold">{project.raised}</div>
            </div>
            
            <div>
              <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                <TrendingUp className="w-3 h-3" />
                <span>Growth</span>
              </div>
              <div className="text-lg font-semibold text-success">{project.growth}</div>
            </div>

            <div>
              <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                <DollarSign className="w-3 h-3" />
                <span>Valuation</span>
              </div>
              <div className="text-lg font-semibold">{project.valuation}</div>
            </div>

            <div>
              <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                <Users className="w-3 h-3" />
                <span>Investors</span>
              </div>
              <div className="text-lg font-semibold">{project.investors}</div>
            </div>

            <div>
              <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                <Calendar className="w-3 h-3" />
                <span>Established</span>
              </div>
              <div className="text-lg font-semibold">{project.yearEstablished}</div>
            </div>
          </div>

          <Separator />

          {/* Team Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <UserCircle className="w-5 h-5" />
              Team
            </h3>
            <div className="space-y-3">
              {project.team.map((member, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <UserCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
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
              Investor Comments
            </h3>
            <div className="space-y-3">
              {project.comments.map((comment, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.text}</p>
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
