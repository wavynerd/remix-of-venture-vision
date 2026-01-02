import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, TrendingUp, Users, CheckCircle } from "lucide-react";
import MembershipForm from "./MembershipForm";

const benefits = [
  {
    icon: TrendingUp,
    title: "Access Capital",
    description: "Connect with verified investors actively seeking opportunities"
  },
  {
    icon: Users,
    title: "Expert Network",
    description: "Get introduced to strategic partners and advisors"
  },
  {
    icon: CheckCircle,
    title: "Credibility Boost",
    description: "Our vetting process validates your venture for investors"
  }
];

const ForCompanies = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="py-20 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent font-semibold text-sm mb-4">
              For Companies
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Looking for Capital Investment?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Submit your venture for review and get in front of hundreds of qualified investors ready to fund your growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-background border border-border hover:border-accent/30 transition-colors">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent mb-4">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-2 border-primary/20 rounded-2xl p-8">
            <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Submit Your Venture for Review
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Our team reviews every submission to ensure quality and fit. Get verified and gain access to our investor network.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              onClick={() => setFormOpen(true)}
            >
              Apply for Membership
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              <span className="font-semibold">Membership required</span> • Due diligence process takes 5-7 business days
            </p>
          </div>
        </div>
      </div>

      <MembershipForm 
        open={formOpen} 
        onOpenChange={setFormOpen}
        defaultInterestType="investee"
        title="Apply for Membership"
      />
    </section>
  );
};

export default ForCompanies;
