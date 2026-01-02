import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-investment.jpg";
import MembershipForm from "./MembershipForm";

const Hero = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState<"investor" | "investee">("investor");

  const handleInvestorClick = () => {
    setFormType("investor");
    setFormOpen(true);
  };

  const handleInvesteeClick = () => {
    setFormType("investee");
    setFormOpen(true);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Investment platform visualization" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm mb-6">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">Trusted by 500+ Investors</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Discover Emerging Market
            <span className="block text-accent">Investment Opportunities</span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Access a curated portfolio of high-potential ventures. Every project undergoes rigorous due diligence before reaching your dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold group"
              onClick={handleInvestorClick}
            >
              Explore Investment Deals
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 backdrop-blur-sm"
              onClick={handleInvesteeClick}
            >
              Get Your Venture Funded
            </Button>
          </div>
        </div>
      </div>

      <MembershipForm 
        open={formOpen} 
        onOpenChange={setFormOpen}
        defaultInterestType={formType}
        title={formType === "investor" ? "Apply as Investor" : "Apply for Funding"}
      />
    </section>
  );
};

export default Hero;
