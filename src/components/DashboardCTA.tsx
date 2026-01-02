import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Shield, Zap } from "lucide-react";
import MembershipForm from "./MembershipForm";

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track performance metrics and portfolio growth"
  },
  {
    icon: Shield,
    title: "Verified Due Diligence",
    description: "Every venture undergoes rigorous vetting process"
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "Connect with founders and make decisions faster"
  }
];

const DashboardCTA = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              Access Your Investment Dashboard
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Get comprehensive insights, detailed analytics, and exclusive deal flow in one powerful platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 text-accent mb-4 backdrop-blur-sm">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-primary-foreground/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 group"
              onClick={() => setFormOpen(true)}
            >
              Access Dashboard
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-primary-foreground/70 mt-4">
              Join 500+ investors already using the platform
            </p>
          </div>
        </div>
      </div>

      <MembershipForm 
        open={formOpen} 
        onOpenChange={setFormOpen}
        defaultInterestType="investor"
        title="Access Dashboard"
      />
    </section>
  );
};

export default DashboardCTA;
